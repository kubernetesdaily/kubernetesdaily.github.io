import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to entries.js
const entriesFile = path.join('src', 'data', 'entries.js');

// Read the file content
fs.readFile(entriesFile, 'utf8', (err, fileContent) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Extract the entries array using regex
  const match = fileContent.match(/export const entries = \[([\s\S]*)\];/);
  if (!match) {
    console.error('Could not find entries array in file');
    return;
  }

  // Parse the entries
  let entriesStr = match[1];
  
  // Split the entries by objects - looking for '},{' pattern
  const entriesParts = entriesStr.split(/\},[\s\n]*\{/g);
  
  const uniqueEntries = [];
  const seenTitles = new Set();
  let duplicateCount = 0;
  
  // Process each entry
  entriesParts.forEach((part, index) => {
    // Clean up the part
    let cleanPart = part;
    if (index === 0) {
      cleanPart = part.trim();
    } else if (index === entriesParts.length - 1) {
      cleanPart = part.trim();
    } else {
      cleanPart = part.trim();
    }
    
    // Extract title
    const titleMatch = cleanPart.match(/title:\s*["']([^"']*)["']/);
    if (!titleMatch) {
      uniqueEntries.push(cleanPart);
      return;
    }
    
    const title = titleMatch[1];
    
    if (!seenTitles.has(title)) {
      seenTitles.add(title);
      uniqueEntries.push(cleanPart);
    } else {
      duplicateCount++;
      console.log(`Found duplicate: ${title}`);
    }
  });
  
  console.log(`Found ${duplicateCount} duplicates.`);
  
  // Reconstruct the entries array
  const newEntriesStr = uniqueEntries.join('},\n  {');
  const newFileContent = 
    fileContent.substring(0, match.index) + 
    'export const entries = [\n  {' + 
    newEntriesStr + 
    '}\n];' + 
    fileContent.substring(match.index + match[0].length);
  
  // Write the result back to file
  fs.writeFile(entriesFile, newFileContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log(`Successfully removed ${duplicateCount} duplicate entries.`);
  });
}); 