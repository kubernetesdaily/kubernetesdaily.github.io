#!/usr/bin/env python3
"""Check catalog, generated pages, local guide links, RSS and sitemap. No tutorial commands run."""
import json
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
SITE = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / '_site'
SLUGS = ['kubernetes-architecture-guide', 'statefulsets-guide',
         'networkpolicy-security-guide', 'helm-production-checklist',
         'image-signing-security-guide']


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.h1 = 0
        self.links = []
        self.canonical = []
        self.ids = set()
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.h1 += tag == 'h1'
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical.append(attrs.get('href'))


def exported(path):
    result = SITE / unquote(path).lstrip('/')
    return result / 'index.html' if result.is_dir() else result


def check():
    posts = json.loads((ROOT / 'priv/static/kubedaily/data/blog.json').read_text())['blogs']
    ids = [p['id'] for p in posts]
    assert len(ids) == len(set(ids)), 'duplicate catalog IDs'
    listing = Page((SITE / 'blog/index.html').read_text())
    feed = ET.parse(SITE / 'rss.xml')
    feed_links = {x.text for x in feed.findall('.//item/link')}
    sitemap = ET.parse(SITE / 'sitemap.xml')
    sitemap_links = {x.text for x in sitemap.findall('.//{*}loc')}
    assert len(feed.findall('.//item')) == len(posts)
    for slug in SLUGS:
        post = next(p for p in posts if p['id'] == slug)
        assert post['file'] == f'/blog/{slug}.md'
        path = f'/blog/{slug}/'
        url = f'https://kubedaily.com{path}'
        assert path in listing.links, f'{slug}: absent from blog listing'
        assert url in feed_links and url in sitemap_links, f'{slug}: absent from feeds'
        page = Page(exported(path).read_text())
        assert page.h1 == 1 and page.canonical == [url], f'{slug}: heading/canonical'
        for link in page.links:
            target = urlsplit(link)
            if target.scheme or target.netloc:
                continue
            if not target.path:
                if target.fragment:
                    assert unquote(target.fragment) in page.ids, (slug, link)
                continue
            if not target.path.startswith('/'):
                continue
            file = exported(target.path)
            assert file.is_file(), (slug, link, 'missing local target')
            if target.fragment and file.suffix == '.html':
                assert unquote(target.fragment) in Page(file.read_text()).ids, (slug, link)
        print(f'PASS {path}')
    for url in sitemap_links:
        assert exported(urlsplit(url).path).is_file(), url
    print(f'PASS: {len(posts)} catalog posts; {len(sitemap_links)} sitemap URLs resolve')


if __name__ == '__main__':
    check()
