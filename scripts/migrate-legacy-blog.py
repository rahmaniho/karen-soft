"""One-time content importer. Run with Python + beautifulsoup4; no HTML/scripts shipped."""
from pathlib import Path
from bs4 import BeautifulSoup
import json, re
root = Path(__file__).resolve().parents[1]
posts = {}
for path in sorted((root/'legacy/blog').glob('*.html')):
    if path.stem in ('index','archive'): continue
    soup=BeautifulSoup(path.read_text(), 'html.parser')
    content=soup.select_one('.article-container, .article-content') or soup.find('main')
    title=content.find('h1') or soup.find('h1')
    # Remove navigational/author chrome, not editorial body.
    for el in content.select('script, style, .meta, .tags, .author-box, .continue-reading, .back-link'):
        el.decompose()
    sections=[]; current={'heading':'مقدمه','blocks':[]}; started=False
    for el in content.find_all(['h1','h2','h3','h4','p','ul','ol','video','img','div','span','blockquote']):
        if el.name=='h1': started=True; continue
        if not started: continue
        text=re.sub(r'\[reference:\d+\]', '',el.get_text(' ',strip=True))
        if text in ('مقالات مرتبط','درباره نویسنده'): break
        if el.find_parent(['p','ul','ol','video']): continue
        if el.name=='h2':
            if current['blocks']: sections.append(current)
            current={'heading':text,'blocks':[]}
        elif el.name in ('h3','h4','p') and text:
            current['blocks'].append({'type':'heading' if el.name!='p' else 'paragraph','text':text})
        elif el.name in ('ul','ol'):
            current['blocks'].append({'type':'list','items':[li.get_text(' ',strip=True) for li in el.find_all('li',recursive=False)]})
        elif el.name=='blockquote' and not el.find('p') and text:
            current['blocks'].append({'type':'quote','text':text})
        elif el.name in ('div','span') and any(c in el.get('class',[]) for c in ('challenge-item','security-tip','benefit-item','tool-tag')) and text:
            current['blocks'].append({'type':'paragraph','text':text})
        elif el.name=='video':
            source=el.find('source'); src=el.get('src') or (source.get('src') if source else None)
            if src: current['blocks'].append({'type':'video','src':src,'text':'ویدیوی همراه مقاله؛ منبع نسخه اصلی'})
        elif el.name=='img':
            src=el.get('src',''); local='/images/'+src.split('/images/')[-1] if '/images/' in src else src
            if (root/'public'/local.lstrip('/')).is_file(): current['blocks'].append({'type':'image','src':local,'text':el.get('alt','')})
    if current['blocks']: sections.append(current)
    posts['/blog/'+path.name]={'title':title.get_text(' ',strip=True),'sections':sections}
(root/'lib/legacy-blog.json').write_text(json.dumps(posts,ensure_ascii=False,indent=2)+'\n')
print(f'Imported {len(posts)} articles, {sum(len(p["sections"]) for p in posts.values())} sections')
