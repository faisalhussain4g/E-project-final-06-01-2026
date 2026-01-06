import os
import re

STANDARD_NAV = '''    <nav>
        <ul>
            <li><a href="../index.html#home">Home</a></li>
            <li class="dropdown"><a href="../index.html#length">Length ▾</a>
                <ul class="dropdown-menu">
                    <li><a href="length.html">Length</a></li>
                    <li><a href="length-millimeter.html">Millimeter (mm)</a></li>
                    <li><a href="length-centimeter.html">Centimeter (cm)</a></li>
                    <li><a href="length-meter.html">Meter (m)</a></li>
                    <li><a href="length-kilometer.html">Kilometer (km)</a></li>
                    <li><a href="length-inch.html">Inch (in)</a></li>
                    <li><a href="length-foot.html">Foot (ft)</a></li>
                    <li><a href="length-yard.html">Yard (yd)</a></li>
                    <li><a href="length-mile.html">Mile (mi)</a></li>
                </ul>
            </li>
            <li class="dropdown"><a href="../index.html#area">Area ▾</a>
                <ul class="dropdown-menu">
                    <li><a href="area.html">Area</a></li>
                    <li><a href="area-square-millimeter.html">Square Millimeter (mm²)</a></li>
                    <li><a href="area-square-meter.html">Square Meter (m²)</a></li>
                    <li><a href="area-hectare.html">Hectare (ha)</a></li>
                    <li><a href="area-square-kilometer.html">Square Kilometer (km²)</a></li>
                    <li><a href="area-square-inch.html">Square Inch (in²)</a></li>
                    <li><a href="area-square-foot.html">Square Foot (ft²)</a></li>
                    <li><a href="area-square-yard.html">Square Yard (yd²)</a></li>
                    <li><a href="area-acre.html">Acre</a></li>
                    <li><a href="area-square-mile.html">Square Mile (mi²)</a></li>
                </ul>
            </li>
            <li class="dropdown"><a href="../index.html#volume">Volume ▾</a>
                <ul class="dropdown-menu">
                    <li><a href="vol.html">Volume</a></li>
                    <li><a href="vol-milliliter.html">Milliliter (mL)</a></li>
                    <li><a href="vol-liter.html">Liter (L)</a></li>
                    <li><a href="vol-fluid-ounce-us.html">Fluid Ounce (US)</a></li>
                    <li><a href="vol-gallon-us.html">Gallon (US)</a></li>
                    <li><a href="vol-cubic-meter.html">Cubic Meter (m³)</a></li>
                    <li><a href="vol-cubic-foot.html">Cubic Foot (ft³)</a></li>
                    <li><a href="vol-cubic-yard.html">Cubic Yard (yd³)</a></li>
                </ul>
            </li>
            <li class="dropdown"><a href="../index.html#mass">Mass ▾</a>
                <ul class="dropdown-menu">
                    <li><a href="mass.html">Mass</a></li>
                    <li><a href="mass-gram.html">Gram (g)</a></li>
                    <li><a href="mass-kilogram.html">Kilogram (kg)</a></li>
                    <li><a href="mass-tonne.html">Tonne (t)</a></li>
                    <li><a href="mass-ounce.html">Ounce (oz)</a></li>
                    <li><a href="mass-pound.html">Pound (lb)</a></li>
                    <li><a href="mass-short-ton.html">Short Ton</a></li>
                </ul>
            </li>
            <li class="dropdown"><a href="../index.html#temperature">Temperature ▾</a>
                <ul class="dropdown-menu">
                    <li><a href="temp.html">Temperature</a></li>
                    <li><a href="temp-celsius.html">Celsius (°C)</a></li>
                    <li><a href="temp-fahrenheit.html">Fahrenheit (°F)</a></li>
                    <li><a href="temp-kelvin.html">Kelvin (K)</a></li>
                </ul>
            </li>
            <li><a href="../index.html#currency">Currency</a></li>
            <li><a href="../index.html#history">History & Info</a></li>
            <li><a href="../index.html#articles">Articles</a></li>
            <li><a href="../index.html#faqs">FAQs</a></li>
        </ul>
    </nav>

    <style>
        nav ul { list-style:none; margin:0; padding:0; display:flex; gap:10px; flex-wrap:wrap; }
        nav li { position:relative; }
        .dropdown-menu { display:none; position:absolute; left:0; top:100%; background:#fff; padding:8px; border:1px solid #ddd; min-width:180px; z-index:50; }
        .dropdown-menu li { margin:0; }
        .dropdown-menu a { display:block; padding:4px 8px; color:#333; text-decoration:none; }
        .dropdown:hover .dropdown-menu, .dropdown.open .dropdown-menu { display:block; }
        .dropdown:focus-within .dropdown-menu { display:block; }
        .h1 { text-align:center; font-size:2rem; margin:1rem 0; }
        h2 { margin-top:1.5rem; }
    </style>
'''


def update_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Backup original
    bak = path + '.bak'
    if not os.path.exists(bak):
        with open(bak, 'w', encoding='utf-8') as f:
            f.write(content)

    nav_re = re.compile(r'<nav[\s\S]*?</nav>', re.I)
    if nav_re.search(content):
        new_content = nav_re.sub(STANDARD_NAV, content, count=1)
    else:
        # If no <nav>, insert before first <main> or before first <header> or after <body>
        insert_pos = None
        m = re.search(r'<main', content, re.I)
        if m:
            insert_pos = m.start()
        else:
            m = re.search(r'<header', content, re.I)
            if m:
                insert_pos = m.start()
        if insert_pos is None:
            m = re.search(r'<body[^>]*>', content, re.I)
            if m:
                insert_pos = m.end()
        if insert_pos is None:
            new_content = STANDARD_NAV + '\n' + content
        else:
            new_content = content[:insert_pos] + STANDARD_NAV + content[insert_pos:]

    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)


def main():
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    subdir = os.path.join(base, 'Sub Pages')
    if not os.path.isdir(subdir):
        print('Sub Pages directory not found:', subdir)
        return

    html_files = [f for f in os.listdir(subdir) if f.lower().endswith('.html')]
    for fn in html_files:
        path = os.path.join(subdir, fn)
        try:
            update_file(path)
            print('Updated:', fn)
        except Exception as e:
            print('Failed:', fn, e)


if __name__ == '__main__':
    main()
