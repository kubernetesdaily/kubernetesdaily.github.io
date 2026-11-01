#!/usr/bin/env node

/**
 * High-Resolution Draw.io Diagram Compiler for KubeDaily
 * Converts multi-page or single-page .drawio files into:
 *  1. Standalone, responsive, vector-crisp SVG files
 *  2. High-DPI raster PNG images (2x resolution)
 *
 * Powered by local Playwright Chromium + official diagrams.net GraphViewer engine.
 */

const fs = require('fs');
const path = require('path');

// Locate local playwright in assets/node_modules/playwright
const playwrightPath = path.resolve(__dirname, '../assets/node_modules/playwright');
const { chromium } = require(playwrightPath);

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/^[0-9]+\s*[·\-–]\s*/, '') // Remove numeric prefixes like "01 · "
        .replace(/\s+/g, '-')              // Replace spaces with -
        .replace(/[^\w\-]+/g, '')          // Remove all non-word chars
        .replace(/\-\-+/g, '-');           // Replace multiple - with single -
}

function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        input: 'priv/static/kubedaily/diagrams/kubernetes-threat-model.drawio',
        outDir: 'priv/static/kubedaily/images',
        scale: 2,
        prefix: 'k8s-threat-model-'
    };

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--input' || args[i] === '-i') {
            options.input = args[++i];
        } else if (args[i] === '--out-dir' || args[i] === '-o') {
            options.outDir = args[++i];
        } else if (args[i] === '--scale' || args[i] === '-s') {
            options.scale = parseFloat(args[++i]) || 2;
        } else if (args[i] === '--prefix' || args[i] === '-p') {
            options.prefix = args[++i];
        } else if (!args[i].startsWith('-')) {
            options.input = args[i];
        }
    }
    return options;
}

// Robust diagram splitter that avoids regex backtracking on huge files
function extractDiagrams(fileContent) {
    const diagrams = [];
    let startIdx = 0;

    while (true) {
        const dStart = fileContent.indexOf('<diagram', startIdx);
        if (dStart === -1) break;

        const tagClose = fileContent.indexOf('>', dStart);
        if (tagClose === -1) break;

        const tagHeader = fileContent.substring(dStart, tagClose + 1);
        const dEnd = fileContent.indexOf('</diagram>', tagClose);
        if (dEnd === -1) break;

        const fullDiagram = fileContent.substring(dStart, dEnd + 10);
        
        const idMatch = tagHeader.match(/id="([^"]*)"/);
        const nameMatch = tagHeader.match(/name="([^"]*)"/);

        const id = idMatch ? idMatch[1] : `page-${diagrams.length + 1}`;
        const name = nameMatch ? nameMatch[1] : id;

        diagrams.push({
            id,
            name,
            rawXml: fullDiagram,
            index: diagrams.length
        });

        startIdx = dEnd + 10;
    }

    if (diagrams.length === 0) {
        diagrams.push({
            id: 'page-1',
            name: 'Diagram',
            rawXml: `<diagram id="page-1" name="Diagram">${fileContent}</diagram>`,
            index: 0
        });
    }

    return diagrams;
}

async function compile() {
    const opts = parseArgs();
    const inputPath = path.resolve(opts.input);

    if (!fs.existsSync(inputPath)) {
        console.error(JSON.stringify({ error: `Input file not found: ${inputPath}` }));
        process.exit(1);
    }

    const outDirPath = path.resolve(opts.outDir);
    fs.mkdirSync(outDirPath, { recursive: true });

    const viewerJsPath = path.resolve(__dirname, '../priv/static/kubedaily/js/viewer-static.min.js');
    if (!fs.existsSync(viewerJsPath)) {
        console.error(JSON.stringify({ error: `Viewer script not found: ${viewerJsPath}` }));
        process.exit(1);
    }
    const viewerJs = fs.readFileSync(viewerJsPath, 'utf8');
    const fileContent = fs.readFileSync(inputPath, 'utf8');

    const diagrams = extractDiagrams(fileContent);

    const customNameMap = {
        'overview': 'cluster',
        'attackpaths': 'attack-chains'
    };

    const browser = await chromium.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: true
    });

    const results = [];

    for (const diag of diagrams) {
        const slug = customNameMap[diag.id] || slugify(diag.name);
        const baseFilename = `${opts.prefix}${slug}`;
        const singleDiagramXml = `<?xml version="1.0" encoding="UTF-8"?><mxfile host="app.diagrams.net">${diag.rawXml}</mxfile>`;

        // Initial viewport; Playwright will adjust or screenshot the full SVG
        const page = await browser.newPage({
            viewport: { width: 3800, height: 2600 },
            deviceScaleFactor: opts.scale
        });

        await page.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#ffffff;"></body></html>`);

        // Inject diagram safely into DOM
        await page.evaluate(({ viewerCode, diagXml }) => {
            const div = document.createElement('div');
            div.id = 'diagram-target';
            div.className = 'mxgraph';
            div.style.cssText = 'border:none;background:#ffffff;';
            div.setAttribute('data-mxgraph', JSON.stringify({
                highlight: 'none',
                target: '_blank',
                lightbox: false,
                nav: false,
                resize: true,
                xml: diagXml
            }));
            document.body.appendChild(div);

            const script = document.createElement('script');
            script.textContent = viewerCode;
            document.body.appendChild(script);
        }, { viewerCode: viewerJs, diagXml: singleDiagramXml });

        await page.waitForSelector('svg', { state: 'attached', timeout: 10000 });

        // Normalize SVG attributes for standalone vector embedding
        const svgData = await page.evaluate(() => {
            const svg = document.querySelector('svg');
            if (!svg) return null;

            const minW = Math.ceil(parseFloat(svg.style.minWidth)) || 3200;
            const minH = Math.ceil(parseFloat(svg.style.minHeight)) || 2000;

            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
            svg.setAttribute('version', '1.1');
            svg.setAttribute('width', `${minW}`);
            svg.setAttribute('height', `${minH}`);
            svg.setAttribute('viewBox', `0 0 ${minW} ${minH}`);
            svg.style.backgroundColor = '#ffffff';

            return {
                width: minW,
                height: minH,
                outerHTML: svg.outerHTML
            };
        });

        // Write standalone SVG
        const svgFileName = `${baseFilename}.svg`;
        const svgFilePath = path.join(outDirPath, svgFileName);
        fs.writeFileSync(svgFilePath, svgData.outerHTML, 'utf8');

        // Write crisp PNG screenshot of the SVG element
        const pngFileName = `${baseFilename}.png`;
        const pngFilePath = path.join(outDirPath, pngFileName);
        const svgHandle = await page.$('svg');
        if (svgHandle) {
            await svgHandle.screenshot({
                path: pngFilePath,
                omitBackground: false
            });
        }

        const svgStat = fs.statSync(svgFilePath);
        const pngStat = fs.existsSync(pngFilePath) ? fs.statSync(pngFilePath) : { size: 0 };

        results.push({
            index: diag.index,
            id: diag.id,
            name: diag.name,
            slug: slug,
            width: svgData.width,
            height: svgData.height,
            svg: path.relative(process.cwd(), svgFilePath),
            svgSize: svgStat.size,
            png: path.relative(process.cwd(), pngFilePath),
            pngSize: pngStat.size
        });

        await page.close();
    }

    await browser.close();

    // Output structured JSON result for Mix task consumption
    console.log(JSON.stringify({
        status: 'ok',
        input: path.relative(process.cwd(), inputPath),
        outDir: path.relative(process.cwd(), outDirPath),
        diagrams: results
    }, null, 2));
}

compile().catch(err => {
    console.error(JSON.stringify({ error: err.message, stack: err.stack }));
    process.exit(1);
});
