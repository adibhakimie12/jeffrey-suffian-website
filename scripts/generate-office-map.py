from pathlib import Path
import xml.etree.ElementTree as E
import math, html

# Real OSM geometry; Google business listing verifies the office pin.
LAT, LON = 3.126508, 101.6432902
SCALE = 1.12  # SVG pixels per metre
root = E.parse('docs/office-map-source.osm').getroot()
nodes = {n.get('id'): (float(n.get('lat')), float(n.get('lon'))) for n in root.findall('node')}
def xy(lat, lon):
    return (400 + (lon-LON)*111320*math.cos(math.radians(LAT))*SCALE, 270-(lat-LAT)*111320*SCALE)
def path(points):
    return 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x,y in points)
ways=[]
for w in root.findall('way'):
    tags={t.get('k'):t.get('v') for t in w.findall('tag')}
    pts=[xy(*nodes[n.get('ref')]) for n in w.findall('nd') if n.get('ref') in nodes]
    if len(pts)>1: ways.append((tags,pts,w.get('id')))
svg=['''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800" height="500" viewBox="0 0 800 500">
<title>Jeffrey Suffian office at Phileo Damansara 1, Petaling Jaya</title>
<desc>Actual OpenStreetMap road and building geometry. Office pin verified against Google Maps at 3.126508, 101.6432902. North is up.</desc>
<defs><filter id="shadow" x="-30%" y="-50%" width="160%" height="220%"><feDropShadow dx="0" dy="5" stdDeviation="9" flood-color="#473e2d" flood-opacity=".15"/></filter></defs>
<rect width="800" height="500" fill="#f4f1e9"/>
<g stroke-linejoin="round" stroke-linecap="round">''']
for t,p,i in ways:
    if t.get('landuse') in ['forest','grass','recreation_ground'] or t.get('leisure') in ['park','golf_course'] or t.get('natural') in ['wood','scrub']:
        svg.append(f'<path d="{path(p)}Z" fill="#e7e9df"/>')
for t,p,i in ways:
    if 'building' in t:
        svg.append(f'<path d="{path(p)}Z" fill="#e4e0d7" stroke="#d7d2c8" stroke-width="1"/>')
for t,p,i in ways:
    if 'waterway' in t:
        svg.append(f'<path d="{path(p)}" fill="none" stroke="#cddbdd" stroke-width="3"/>')
widths={'motorway':15,'motorway_link':9,'primary':12,'primary_link':8,'secondary':10,'tertiary':8,'residential':6,'service':4,'unclassified':5,'living_street':5}
roads=[(t,p,i) for t,p,i in ways if t.get('highway') in widths]
for border in [True,False]:
    for t,p,i in roads:
        width=widths[t['highway']] + (2 if border else 0)
        color='#d2cdc3' if border else ('#ebe4d4' if t['highway'].startswith('motorway') else '#fffdf8')
        svg.append(f'<path d="{path(p)}" fill="none" stroke="{color}" stroke-width="{width}"/>')
svg.append('</g>')
# Label real road paths, selecting visible segments away from the office callout.
for name in ['Jalan 16/11','Damansara Link','Jalan 16/13','Jalan 16/12']:
    candidates=[]
    for t,p,i in roads:
        if t.get('name')!=name: continue
        visible=[v for v in p if 45<v[0]<755 and 40<v[1]<460]
        length=sum(math.dist(a,b) for a,b in zip(visible,visible[1:]))
        if len(visible)>1 and length>65: candidates.append((length,visible,i))
    if not candidates: continue
    _,p,i=max(candidates)
    if p[-1][0]<p[0][0]: p=list(reversed(p))
    lengths=[math.dist(a,b) for a,b in zip(p,p[1:])]
    half=sum(lengths)/2
    for a,b,length in zip(p,p[1:],lengths):
        if half<=length:
            ratio=half/length
            x,y=a[0]+ratio*(b[0]-a[0]),a[1]+ratio*(b[1]-a[1])
            angle=math.degrees(math.atan2(b[1]-a[1],b[0]-a[0]))
            break
        half-=length
    svg.append(f'<text transform="translate({x:.1f} {y:.1f}) rotate({angle:.1f})" dy="-7" text-anchor="middle" fill="#797369" stroke="#f4f1e9" stroke-width="3" paint-order="stroke" font-family="Arial,sans-serif" font-size="15" letter-spacing=".6">{html.escape(name.upper())}</text>')
svg.append('''<g font-family="Arial,sans-serif">
<g transform="translate(743 37)" fill="#817c72"><path d="M0 3 L-6 20 L0 16 L6 20Z"/><text x="0" y="-5" text-anchor="middle" font-size="12" font-weight="700">N</text></g>
<ellipse cx="400" cy="274" rx="19" ry="6" fill="#b51e23" opacity=".13"/>
<circle cx="400" cy="270" r="34" fill="#b51e23" opacity=".06"/>
<path d="M400 270 C396 264 380 245 380 233 A20 20 0 0 1 420 233 C420 245 404 264 400 270Z" fill="#b51e23" stroke="#fffdf8" stroke-width="3" filter="url(#shadow)"/>
<circle cx="400" cy="233" r="7" fill="#fffdf8"/>
<g filter="url(#shadow)"><rect x="267" y="143" width="266" height="62" rx="12" fill="#fffdf8" stroke="#ddd5c6"/></g>
<text x="400" y="169" text-anchor="middle" fill="#292722" font-family="Georgia,serif" font-size="22">Jeffrey Suffian</text>
<text x="400" y="189" text-anchor="middle" fill="#817c72" font-size="12" letter-spacing=".7">BLOK E · PHILEO DAMANSARA 1</text>
<g transform="translate(40 459)" stroke="#827c70" stroke-width="2"><path d="M0 -5 V0 H112 V-5" fill="none"/><text x="56" y="-10" text-anchor="middle" fill="#827c70" stroke="none" font-size="11">100 m</text></g>
</g></svg>''')
out=Path('public/assets/office-location-map.svg')
out.write_text('\n'.join(svg),encoding='utf-8')
print(f'{out}: {out.stat().st_size} bytes; {len(roads)} real road segments; pin {LAT}, {LON}')
