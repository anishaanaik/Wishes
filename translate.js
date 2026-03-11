// ============================================
// GLOBAL LANGUAGE TOGGLE — Kannada ↔ English
// ============================================

const LANG_STORAGE_KEY = 'anniversary_lang';

// Load Noto Serif Kannada font from Google Fonts (once)
(function loadKannadaFont() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+Kannada:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
}());

// Translations for elements that contain embedded HTML (e.g. <br> tags)
const HTML_TRANSLATIONS = {
    '.surprise-message': {
        en: `Dear Mom and Dad,<br><br>
            Your love for each other is the reason our family feels so warm and complete.<br>
            Thank you for teaching me what true love, patience, and commitment look like.<br>
            I am forever grateful to be your child.<br>
            Happy Wedding Anniversary to the most wonderful parents. ❤️`,
        kn: `ಪ್ರಿಯ ಅಮ್ಮ ಮತ್ತು ಅಪ್ಪ,<br><br>
            ನಿಮ್ಮ ನಡುವಿನ ಪ್ರೀತಿಯೇ ನಮ್ಮ ಕುಟುಂಬ ಇಷ್ಟು ಬೆಚ್ಚಗಿರುವ ಮತ್ತು ಪರಿಪೂರ್ಣವಾಗಿರುವ ಕಾರಣ.<br>
            ನಿಜವಾದ ಪ್ರೀತಿ, ತಾಳ್ಮೆ ಮತ್ತು ಬದ್ಧತೆ ಹೇಗಿರುತ್ತದೆ ಎಂದು ತೋರಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.<br>
            ನಿಮ್ಮ ಮಗಳಾಗಿರಲು ನಾನು ಎಂದಿಗೂ ಕೃತಜ್ಞಳಾಗಿರುತ್ತೇನೆ.<br>
            ಅದ್ಭುತ ಪೋಷಕರಿಗೆ ಶುಭ ವಿವಾಹ ವಾರ್ಷಿಕೋತ್ಸವ. ❤️`
    }
};

/** Returns current language: 'en' or 'kn' */
function getCurrentLang() {
    return localStorage.getItem(LANG_STORAGE_KEY) || 'en';
}

/** Apply translation to all tagged elements on the current page */
function applyTranslation(lang) {
    // 1. Plain-text elements tagged with data-en / data-kn
    document.querySelectorAll('[data-en]').forEach(el => {
        const value = lang === 'kn' ? el.dataset.kn : el.dataset.en;
        if (value !== undefined) el.textContent = value;
    });

    // 2. HTML-content elements (e.g. surprise message with <br> tags)
    Object.entries(HTML_TRANSLATIONS).forEach(([selector, texts]) => {
        document.querySelectorAll(selector).forEach(el => {
            el.innerHTML = lang === 'kn' ? texts.kn : texts.en;
        });
    });

    // 3. If the typed letter is already rendered on message.html, update it
    const originalLetter = document.getElementById('original-letter');
    const typedLetter = document.getElementById('typed-letter');
    if (originalLetter && typedLetter && typedLetter.children.length > 0) {
        const srcParas = originalLetter.querySelectorAll('[data-en]');
        const typedParas = typedLetter.querySelectorAll('p');
        typedParas.forEach((p, i) => {
            if (srcParas[i]) {
                p.textContent = lang === 'kn' ? srcParas[i].dataset.kn : srcParas[i].dataset.en;
            }
        });
    }

    // 4. Update the button label
    const label = document.getElementById('lang-label');
    if (label) label.textContent = lang === 'kn' ? 'English' : 'ಕನ್ನಡ';

    // 5. Toggle lang-kn class on <html> for font switching
    document.documentElement.classList.toggle('lang-kn', lang === 'kn');

    localStorage.setItem(LANG_STORAGE_KEY, lang);
}

/** Toggle between English and Kannada */
function toggleLanguage() {
    applyTranslation(getCurrentLang() === 'en' ? 'kn' : 'en');
}

/** Inject the floating translate button into <body> */
function injectTranslateButton() {
    const btn = document.createElement('button');
    btn.className = 'translate-toggle';
    btn.id = 'translate-btn';
    btn.setAttribute('aria-label', 'Toggle language between English and Kannada');
    const currentLang = getCurrentLang();
    btn.innerHTML = `<span>🌐</span><span id="lang-label">${currentLang === 'kn' ? 'English' : 'ಕನ್ನಡ'}</span>`;
    btn.addEventListener('click', toggleLanguage);
    document.body.appendChild(btn);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    injectTranslateButton();
    applyTranslation(getCurrentLang());
});
