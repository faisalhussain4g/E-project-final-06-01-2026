// ======================= Units Data =======================

// Start Units Data Section

const conversionData = {
    length: {
        base: 'meter',
        units: {
            millimeter: { factor: 1000, display: 'Millimeters' },
            meter: { factor: 1, display: 'Meters' },
            kilometer: { factor: 0.001, display: 'Kilometers' },
            inch: { factor: 39.3701, display: 'Inches' },
            foot: { factor: 3.28084, display: 'Feet' },
            yard: { factor: 1.09361, display: 'Yards' },
            mile: { factor: 0.000621371, display: 'Miles' }
        },
        pairs: [
            ['inch', 'millimeter'],
            ['foot', 'meter'],
            ['yard', 'meter'],
            ['mile', 'kilometer']
        ]
    },
    area: {
        base: 'squareMeter',
        units: {
            squareMillimeter: { factor: 1000000, display: 'Square Millimeters' },
            squareMeter: { factor: 1, display: 'Square Meters' },
            hectare: { factor: 0.0001, display: 'Hectares' },
            squareKilometer: { factor: 0.000001, display: 'Square Kilometers' },
            squareInch: { factor: 1550.003, display: 'Square Inches' },
            squareFoot: { factor: 10.7639, display: 'Square Feet' },
            squareYard: { factor: 1.19599, display: 'Square Yards' },
            acre: { factor: 0.000247105, display: 'Acres' },
            squareMile: { factor: 0.000000386102, display: 'Square Miles' }
        },
        pairs: [
            ['squareInch', 'squareMillimeter'],
            ['squareFoot', 'squareMeter'],
            ['squareYard', 'squareMeter'],
            ['acre', 'hectare'],
            ['squareMile', 'squareKilometer']
        ]
    },
    volume: {
        base: 'liter',
        units: {
            milliliter: { factor: 1000, display: 'Milliliters' },
            liter: { factor: 1, display: 'Liters' },
            fluidOunceUS: { factor: 33.814, display: 'Fluid Ounces (US)' },
            gallonUS: { factor: 0.264172, display: 'Gallons (US)' },
            cubicMeter: { factor: 0.001, display: 'Cubic Meters' },
            cubicFoot: { factor: 0.0353147, display: 'Cubic Feet' },
            cubicYard: { factor: 0.00130795, display: 'Cubic Yards' }
        },
        pairs: [
            ['fluidOunceUS', 'milliliter'],
            ['gallonUS', 'liter'],
            ['cubicFoot', 'cubicMeter'],
            ['cubicYard', 'cubicMeter']
        ]
    },
    mass: {
        base: 'kilogram',
        units: {
            gram: { factor: 1000, display: 'Grams' },
            kilogram: { factor: 1, display: 'Kilograms' },
            tonne: { factor: 0.001, display: 'Metric Tonnes' },
            ounce: { factor: 35.274, display: 'Ounces' },
            pound: { factor: 2.20462, display: 'Pounds' },
            shortTon: { factor: 0.00110231, display: 'Short Tons (2000 lb)' }
        },
        pairs: [
            ['ounce', 'gram'],
            ['pound', 'kilogram'],
            ['shortTon', 'tonne']
        ]
    }
};
// End Units Data Section

// ======================= Currency Data =======================

// Start Currency Data Section

const currencies = [
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "AFN", name: "Afghan Afghani" },
    { code: "ALL", name: "Albanian Lek" },
    { code: "AMD", name: "Armenian Dram" },
    { code: "INR", name: "Indian Rupee" },
    { code: "USD", name: "United States Dollar" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" }

    // Add remaining currencies here...
];
// End Currency Data Section

// ======================= Populate Function =======================

// Start Populate Function Section

function populate(category) {
    if (category === 'temperature') return; // handled separately

    if (category === 'currency') return; // currency is handled separately

    const data = conversionData[category];
    const from = document.getElementById(category + 'From');
    const to = document.getElementById(category + 'To');
    const table = document.getElementById(category + 'Table');

    Object.keys(data.units).forEach(key => {
        const display = data.units[key].display;
        const opt1 = document.createElement('option');
        opt1.value = key;
        opt1.textContent = display;
        from.appendChild(opt1);

        const opt2 = opt1.cloneNode(true);
        to.appendChild(opt2);
    });

    // Ensure default selections are different (avoid same unit in both boxes on load)
    if (from.options.length > 0) from.selectedIndex = 0;
    if (to.options.length > 1) to.selectedIndex = 1;
    else if (to.options.length > 0) to.selectedIndex = 0;

    // Populate table with pairs

    data.pairs.forEach(pair => {
        const [fromUnit, toUnit] = pair;
        const factor = (data.units[toUnit].factor / data.units[fromUnit].factor).toFixed(6);
        const row = document.createElement('tr');
        row.innerHTML = `<td>${data.units[fromUnit].display}</td><td>${data.units[toUnit].display}</td><td>${factor}</td>`;
        table.appendChild(row);
    });
}
// End Populate Function Section

// ======================= Convert Function =======================

// Start Convert Function Section

function convert(category) {
    let value, from, to, resultDiv;

    if (category === 'temperature') {
        value = parseFloat(document.getElementById('tempValue').value);
        from = document.getElementById('tempFrom').value;
        to = document.getElementById('tempTo').value;
        resultDiv = document.getElementById('tempResult');
        let result;

        if (from === to) result = value;
        else if (from === 'fahrenheit' && to === 'celsius') result = (value - 32) * 5 / 9;
        else if (from === 'celsius' && to === 'fahrenheit') result = value * 9 / 5 + 32;

        resultDiv.textContent = `${value} °${from.charAt(0).toUpperCase()} = ${result.toFixed(2)} °${to.charAt(0).toUpperCase()}`;
        resultDiv.style.display = 'block';
        return;
    }

    if (category === 'currency') {
        return; // currency handled separately by its own UI
    }

    value = parseFloat(document.getElementById(category + 'Value').value);
    from = document.getElementById(category + 'From').value;
    to = document.getElementById(category + 'To').value;
    resultDiv = document.getElementById(category + 'Result');

    if (isNaN(value)) {
        resultDiv.textContent = 'Invalid value';
        resultDiv.style.display = 'block';
        return;
    }

    const data = conversionData[category];
    const baseValue = value / data.units[from].factor;
    const result = baseValue * data.units[to].factor;
    resultDiv.textContent = `${value} ${data.units[from].display} = ${result.toFixed(2)} ${data.units[to].display}`;
    resultDiv.style.display = 'block';
}
// End Convert Function Section

// ======================= Clear Fields =======================

// Start Clear Fields Section

function clearFields(category) {
    if (category === 'temperature') {
        document.getElementById('tempValue').value = '';
        document.getElementById('tempResult').style.display = 'none';
    } else if (category === 'currency') {
        const amt = document.getElementById('amount');
        const res = document.getElementById('result');
        if (amt) amt.value = '';
        if (res) res.style.display = 'none';
    } else {
        document.getElementById(category + 'Value').value = '';
        document.getElementById(category + 'Result').style.display = 'none';
    }
}
// End Clear Fields Section

// ======================= Convert Currency =======================

// Start Convert Currency Section

// Currency list with full names (195+ countries)

const currencyList = {
    "USD": "United States Dollar", "EUR": "Euro", "GBP": "British Pound", "INR": "Indian Rupee",
    "JPY": "Japanese Yen", "AUD": "Australian Dollar", "CAD": "Canadian Dollar", "CHF": "Swiss Franc",
    "CNY": "Chinese Yuan", "PKR": "Pakistani Rupee", "SAR": "Saudi Riyal", "AED": "United Arab Emirates Dirham",
    "AFN": "Afghan Afghani", "ALL": "Albanian Lek", "AMD": "Armenian Dram", "ARS": "Argentine Peso",
    "AZN": "Azerbaijani Manat", "BDT": "Bangladeshi Taka", "BHD": "Bahraini Dinar", "BIF": "Burundian Franc",
    "BMD": "Bermudan Dollar", "BND": "Brunei Dollar", "BOB": "Bolivian Boliviano", "BRL": "Brazilian Real",
    "BSD": "Bahamian Dollar", "BWP": "Botswanan Pula", "BYN": "Belarusian Ruble", "BZD": "Belize Dollar",
    "CDF": "Congolese Franc", "CLP": "Chilean Peso", "COP": "Colombian Peso", "CRC": "Costa Rican Colón",
    "CUP": "Cuban Peso", "CVE": "Cape Verdean Escudo", "CZK": "Czech Koruna", "DJF": "Djiboutian Franc",
    "DKK": "Danish Krone", "DOP": "Dominican Peso", "DZD": "Algerian Dinar", "EGP": "Egyptian Pound",
    "ERN": "Eritrean Nakfa", "ETB": "Ethiopian Birr", "FJD": "Fijian Dollar", "GEL": "Georgian Lari",
    "GHS": "Ghanaian Cedi", "GMD": "Gambian Dalasi", "GNF": "Guinean Franc", "GTQ": "Guatemalan Quetzal",
    "GYD": "Guyanaese Dollar", "HKD": "Hong Kong Dollar", "HNL": "Honduran Lempira", "HRK": "Croatian Kuna",
    "HTG": "Haitian Gourde", "HUF": "Hungarian Forint", "IDR": "Indonesian Rupiah", "ILS": "Israeli New Shekel",
    "IQD": "Iraqi Dinar", "IRR": "Iranian Rial", "ISK": "Icelandic Króna", "JMD": "Jamaican Dollar",
    "JOD": "Jordanian Dinar", "KES": "Kenyan Shilling", "KGS": "Kyrgystani Som", "KHR": "Cambodian Riel",
    "KMF": "Comorian Franc", "KRW": "South Korean Won", "KWD": "Kuwaiti Dinar", "KYD": "Cayman Islands Dollar",
    "KZT": "Kazakhstani Tenge", "LAK": "Laotian Kip", "LBP": "Lebanese Pound", "LKR": "Sri Lankan Rupee",
    "LRD": "Liberian Dollar", "LSL": "Lesotho Loti", "LYD": "Libyan Dinar", "MAD": "Moroccan Dirham",
    "MDL": "Moldovan Leu", "MGA": "Malagasy Ariary", "MKD": "Macedonian Denar", "MMK": "Myanmar Kyat",
    "MNT": "Mongolian Tugrik", "MOP": "Macanese Pataca", "MRU": "Mauritanian Ouguiya", "MUR": "Mauritian Rupee",
    "MVR": "Maldivian Rufiyaa", "MWK": "Malawian Kwacha", "MXN": "Mexican Peso", "MYR": "Malaysian Ringgit",
    "MZN": "Mozambican Metical", "NAD": "Namibian Dollar", "NGN": "Nigerian Naira", "NIO": "Nicaraguan Córdoba",
    "NOK": "Norwegian Krone", "NPR": "Nepalese Rupee", "NZD": "New Zealand Dollar", "OMR": "Omani Rial",
    "PAB": "Panamanian Balboa", "PEN": "Peruvian Sol", "PGK": "Papua New Guinean Kina", "PHP": "Philippine Peso",
    "PLN": "Polish Zloty", "PYG": "Paraguayan Guarani", "QAR": "Qatari Rial", "RON": "Romanian Leu",
    "RSD": "Serbian Dinar", "RUB": "Russian Ruble", "RWF": "Rwandan Franc", "SDG": "Sudanese Pound",
    "SEK": "Swedish Krona", "SGD": "Singapore Dollar", "SLL": "Sierra Leonean Leone", "SOS": "Somali Shilling",
    "SRD": "Surinamese Dollar", "SYP": "Syrian Pound", "SZL": "Eswatini Lilangeni", "THB": "Thai Baht",
    "TJS": "Tajikistani Somoni", "TMT": "Turkmenistani Manat", "TND": "Tunisian Dinar", "TOP": "Tongan Pa'anga",
    "TRY": "Turkish Lira", "TTD": "Trinidad & Tobago Dollar", "TWD": "New Taiwan Dollar", "TZS": "Tanzanian Shilling",
    "UAH": "Ukrainian Hryvnia", "UGX": "Ugandan Shilling", "UYU": "Uruguayan Peso", "UZS": "Uzbekistan Som",
    "VES": "Venezuelan Bolívar", "VND": "Vietnamese Dong", "VUV": "Vanuatu Vatu", "WST": "Samoan Tala",
    "XAF": "Central African CFA Franc", "XOF": "West African CFA Franc", "YER": "Yemeni Rial",
    "ZAR": "South African Rand", "ZMW": "Zambian Kwacha", "ZWL": "Zimbabwean Dollar"
};

let rates = {};
let baseCurrency = 'USD';

const fromInput = document.getElementById('fromCurrency');
const toInput = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const lastUpdateSpan = document.getElementById('lastUpdate');

// Populate dropdowns (A-Z sorted)
function populateCurrencies() {
    const sortedCodes = Object.keys(currencyList).sort();
        // place USD first and PKR second so USD appears above and PKR below
        const first = 'USD';
        const second = 'PKR';
        const firstIdx = sortedCodes.indexOf(first);
        if (firstIdx > -1) {
            sortedCodes.splice(firstIdx, 1);
            sortedCodes.unshift(first);
        }
        const secondIdx = sortedCodes.indexOf(second);
        if (secondIdx > -1) {
            // remove second wherever it is now and insert at index 1
            sortedCodes.splice(secondIdx, 1);
            // avoid duplicating if second === first
            if (sortedCodes[0] !== second) sortedCodes.splice(1, 0, second);
        }

    // populate datalists for searchable inputs
    const fromList = document.getElementById('fromList');
    const toList = document.getElementById('toList');
    sortedCodes.forEach(code => {
        const name = currencyList[code];
        const opt = document.createElement('option');
        opt.value = `${code} - ${name}`;
        fromList.appendChild(opt);
        toList.appendChild(opt.cloneNode(true));
    });

    // set defaults: from = USD (top), to = PKR (below)
    if (currencyList['USD']) fromInput.value = `USD - ${currencyList['USD']}`;
    if (currencyList['PKR']) toInput.value = `PKR - ${currencyList['PKR']}`;
}

// Fetch latest rates
async function fetchRates() {
    try {
        resultDiv.textContent = "Fetching latest rates...";
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency.toLowerCase()}.min.json`);
        const data = await response.json();
        rates = data[baseCurrency.toLowerCase()];

        convertCurrency();
        lastUpdateSpan.textContent = new Date().toLocaleTimeString();
    } catch (error) {
        resultDiv.textContent = "Error: Unable to load rates. Check your internet.";
    }
}

// Convert currency
function convertCurrency() {
    const amount = parseFloat(amountInput.value) || 0;
    const from = resolveCurrencyCode(fromInput.value);
    const to = resolveCurrencyCode(toInput.value);

    if (rates && rates[to.toLowerCase()]) {
        const converted = amount * rates[to.toLowerCase()];
        resultDiv.innerHTML = `
            <strong style="color:#667eea">${amount.toLocaleString()}</strong> ${from} = 
            <strong style="color:#667eea">${converted.toFixed(2)}</strong> ${to}
        `;
    }
}

// Helper: resolve a user-entered value (from datalist/input) to a 3-letter currency code.
function resolveCurrencyCode(inputValue) {
    if (!inputValue) return '';
    const v = inputValue.trim();
    // if value looks like "USD - United States Dollar", take the part before ' - '
    if (v.indexOf(' - ') > -1) return v.split(' - ')[0].toUpperCase();
    const up = v.toUpperCase();
    // direct code match
    if (currencyList[up]) return up;
    // try to match by starting substring against "CODE - Name" entries
    for (const code of Object.keys(currencyList)) {
        const display = `${code} - ${currencyList[code]}`.toUpperCase();
        if (display.indexOf(up) === 0 || currencyList[code].toUpperCase().indexOf(up) === 0) return code;
    }
    return up;
}

// Swap
function swapCurrencies() {
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;

    // update base/rates and conversion
    updateBaseAndConvert();
}

// Update base currency and fetch new rates if needed
async function updateBaseAndConvert() {
    const fromCode = resolveCurrencyCode(fromInput.value);
    if (fromCode !== baseCurrency) {
        baseCurrency = fromCode;
        await fetchRates();
    } else {
        convertCurrency();
    }
}

// Initialize

// End Convert Currency Section

// ======================= FAQ Toggle =======================

// Start FAQ Toggle Section

// FAQ accordion with smooth animation and arrow rotation
document.querySelectorAll('.faq').forEach(f => {
    const header = f.querySelector('h3');
    const content = f.querySelector('p');
    if (!header || !content) return;
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'false');
    content.setAttribute('aria-hidden', 'true');

    function closeOtherFaqs() {
        document.querySelectorAll('.faq').forEach(other => {
            if (other === f) return;
            if (other.classList.contains('active')) {
                other.classList.remove('active');
                const h = other.querySelector('h3');
                if (h) h.setAttribute('aria-expanded', 'false');
                const c = other.querySelector('p');
                if (c) c.setAttribute('aria-hidden', 'true');
            }
        });
    }

    function toggle() {
        const opening = !f.classList.contains('active');
        if (opening) closeOtherFaqs();
        f.classList.toggle('active');
        header.setAttribute('aria-expanded', String(opening));
        content.setAttribute('aria-hidden', String(!opening));
    }

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    });
});

// End FAQ Toggle Section

// ======================= Mobile Nav Toggle =======================

function setupNavToggle() {
    document.querySelectorAll('nav').forEach(nav => {
        if (nav.querySelector('.nav-toggle')) return; // already added

        const btn = document.createElement('button');
        btn.className = 'nav-toggle';
        btn.setAttribute('aria-label', 'Toggle navigation');
        btn.innerHTML = '<i class="fas fa-bars"></i>';
        nav.insertBefore(btn, nav.firstChild);

        const ul = nav.querySelector('ul');

        btn.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
            if (nav.classList.contains('nav-open')) btn.innerHTML = '<i class="fas fa-times"></i>';
            else btn.innerHTML = '<i class="fas fa-bars"></i>';
        });

        // Close nav when a link is clicked (mobile)
        if (ul) {
            ul.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', () => {
                    nav.classList.remove('nav-open');
                    btn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
    });
}

// End Mobile Nav Toggle

// ======================= Mutual Exclusion for Selects =======================

// Ensure when a unit is selected in one select, it's removed from the paired select
// Restore options from original lists when selection changes so options fully disappear
function setupMutualExclusion(category) {
    if (category === 'temperature' || category === 'currency') return;
    const from = document.getElementById(category + 'From');
    const to = document.getElementById(category + 'To');
    if (!from || !to) return;

    // capture originals
    const origFrom = Array.from(from.options).map(o => ({ value: o.value, text: o.text }));
    const origTo = Array.from(to.options).map(o => ({ value: o.value, text: o.text }));

    function rebuild(select, originals, excludeValue) {
        const prev = select.value;
        select.innerHTML = '';
        originals.forEach(opt => {
            if (opt.value === excludeValue) return;
            const el = document.createElement('option');
            el.value = opt.value;
            el.textContent = opt.text;
            select.appendChild(el);
        });
        // restore previous if still present
        if (Array.from(select.options).some(o => o.value === prev)) select.value = prev;
    }

    function sync() {
        const f = from.value;
        const t = to.value;

        // rebuild each select excluding the other's current value
        rebuild(to, origTo, f);
        rebuild(from, origFrom, t);

        // if current selection removed, pick first available
        if (!Array.from(from.options).some(o => o.value === f)) {
            from.selectedIndex = 0;
        }
        if (!Array.from(to.options).some(o => o.value === t)) {
            to.selectedIndex = 0;
        }
    }

    from.addEventListener('change', sync);
    to.addEventListener('change', sync);

    // initial sync in case defaults conflict
    sync();
}

// End Mutual Exclusion

// ======================= Initialize =======================

// Start Initialize Section

window.onload = () => {
    Object.keys(conversionData).forEach(populate);
    // Setup mutual exclusion so the same unit cannot be selected in both boxes
    Object.keys(conversionData).forEach(setupMutualExclusion);
    // Initialize currency UI after DOM ready
    populateCurrencies();
    fetchRates();

    // Setup mobile nav toggles on every page
    setupNavToggle();

    // Event listeners for currency inputs
    if (amountInput) amountInput.addEventListener('input', convertCurrency);
    if (fromInput) {
        fromInput.addEventListener('change', updateBaseAndConvert);
        fromInput.addEventListener('input', convertCurrency);
    }
    if (toInput) {
        toInput.addEventListener('change', convertCurrency);
        toInput.addEventListener('input', convertCurrency);
    }
    // setup scroll reveal animations across pages
    setupScrollReveal();
};

// Scroll reveal: observe common page blocks and add reveal-active when visible
function setupScrollReveal() {
    const selectors = [
        'h1,h2,h3,p,section', '.container', '.container .row', '.converter-box', '.currency-container', '.converter-grid > div', '.faq', '.faq h3',
        '.input-group', 'header', 'footer', 'img', '.image-gallery img', '.converter-left', '.converter-right', '.card', '.card-body', '.card-title', '.card-text', '.back-link', '.footer-container'
    ];
    const els = document.querySelectorAll(selectors.join(','));
    const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -10% 0px' };
    // track last scroll position to detect scroll direction
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Reveal when entering viewport; once revealed it stays visible (unobserve so it won't hide)
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                if (!el.style.transitionDelay) {
                    const idx = el.dataset.revealIndex ? Number(el.dataset.revealIndex) : 0;
                    const delay = el.dataset.revealDelay ? Number(el.dataset.revealDelay) : Math.min(300, idx * 40);
                    el.style.transitionDelay = `${delay}ms`;
                }
                el.classList.add('reveal-active');
                // keep visible permanently; stop observing so it won't be toggled off
                io.unobserve(el);
            }
        });
    }, observerOptions);

    els.forEach((el, i) => {
        // avoid adding on very small images/icons
        if (el.tagName === 'IMG' && (el.width && el.width < 30)) return;
        // default reveal style
        el.classList.add('reveal');
        // for text elements, animate from the right
        const tag = el.tagName ? el.tagName.toUpperCase() : '';
        if (['H1','H2','H3','P','SPAN','A','LI','BLOCKQUOTE'].includes(tag) || el.classList.contains('subtitle') || el.classList.contains('faq')) {
            el.classList.add('reveal-right');
        }
        if (!el.dataset.revealIndex) el.dataset.revealIndex = i;
        io.observe(el);
    });

    // fallback: in case some content loads later (images/text), re-run add/observe after small delay
    setTimeout(() => {
        document.querySelectorAll(selectors.join(',')).forEach((el) => {
            if (!el.classList.contains('reveal')) el.classList.add('reveal');
            io.observe(el);
        });
    }, 600);
}

// (custom dropdown enhancement removed - using native selects)
// End Initialize Section

// Currency history and chart removed — using native select and no history UI

// Inject standardized navbar + heading CSS into subpages (runs on page load)
(function injectStandardNav(){
    try {
        const path = location.pathname || location.href;
        if (!(path.indexOf('/Sub Pages/') !== -1 || path.indexOf('Sub%20Pages') !== -1)) return;

        const navHtml = `    <nav>
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
    </nav>`;

        const styleHtml = `<style>
        nav ul { list-style:none; margin:0; padding:0; display:flex; gap:10px; flex-wrap:wrap; }
        nav li { position:relative; }
        .dropdown-menu { display:none; position:absolute; left:0; top:100%; background:#fff; padding:8px; border:1px solid #ddd; min-width:180px; z-index:50; }
        .dropdown-menu li { margin:0; }
        .dropdown-menu a { display:block; padding:4px 8px; color:#333; text-decoration:none; }
        .dropdown:hover .dropdown-menu, .dropdown.open .dropdown-menu { display:block; }
        .dropdown:focus-within .dropdown-menu { display:block; }
        .h1 { text-align:center; font-size:2rem; margin:1rem 0; }
        h2 { margin-top:1.5rem; }
    </style>`;

        const existingNav = document.querySelector('nav');
        if (existingNav) {
            existingNav.outerHTML = navHtml + styleHtml;
        } else {
            document.body.insertAdjacentHTML('afterbegin', navHtml + styleHtml);
        }
    } catch (e) {
        console.error('injectStandardNav error', e);
    }
})();
