import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));

const FONTS =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500" +
  "&family=Jost:wght@300;400;500&display=swap";

const PHONE = "+420 123 456 789";
const PHONE_HREF = "tel:+420123456789";
const MAIL = "info@vitaeclinic.cz";

const u = (id, w) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMG = {
  heroDog: u("photo-1558788353-f76d92427f16", 1400),
  clinic: u("photo-1770836037289-e00e5f351d11", 1100),
  examDog: u("photo-1516734212186-a967f81ad0d7", 1200),
  teamHero: u("photo-1760448904758-3a88fd0073b9", 1400),
  twoDogs: u("photo-1548199973-03cce0bbc87b", 1200),
  catBed: u("photo-1573865526739-10659fec78a5", 1100),
  catSofa: u("photo-1518791841217-8f162f1e1131", 1100),
  catHeld: u("photo-1450778869180-41d0601e046e", 1100),
  catGinger: u("photo-1574158622682-e40e69881006", 1100),
  catBlack: u("photo-1478098711619-5ab0b478d6e6", 1100),
  kitten: u("photo-1529778873920-4da4926a72c2", 500),
  husky: u("photo-1568572933382-74d440642117", 1200),
  dogBlanket: u("photo-1520087619250-584c0cbd35e8", 1100),
  puppySleep: u("photo-1560807707-8cc77767d783", 1100),
  dogSmall: u("photo-1527526029430-319f10814151", 900),
  retriever: u("photo-1507146426996-ef05306b995a", 900),
  surgery: u("photo-1551601651-2a8555f1a136", 1100),
  dogTongue: u("photo-1518717758536-85ae29035b6d", 1100),
  lounge: u("photo-1566665797739-1674de7a421a", 1100),
  room: u("photo-1521783988139-89397d761dce", 1100),
  vet1: u("photo-1559839734-2b71ea197ec2", 700),
  vet2: u("photo-1612349317150-e413f6a5b16d", 700),
  vet3: u("photo-1594824476967-48c8b964273f", 700),
  vet4: "https://images.unsplash.com/photo-1758691463582-11aea602cd4a?auto=format&fit=crop&crop=faces&w=700&h=875&q=80",
};

const svg = (body, extra = "") =>
  `<svg viewBox="0 0 24 24" aria-hidden="true"${extra}>${body}</svg>`;

const ICON = {
  shield: svg('<path d="M12 3 5 6v5.6c0 4.6 2.9 7.8 7 9.4 4.1-1.6 7-4.8 7-9.4V6z"/><path d="M12 15s-3-1.9-3-4a1.8 1.8 0 0 1 3-1.2A1.8 1.8 0 0 1 15 11c0 2.1-3 4-3 4z"/>'),
  stetho: svg('<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M6 3H4.5M14 3h1.5"/><circle cx="18.5" cy="15.5" r="2.5"/><path d="M18.5 13v-1.2a5.8 5.8 0 0 0-5.8-5.8"/><path d="M10 13v1.5A4.5 4.5 0 0 0 14.5 19H16"/>'),
  scalpel: svg('<path d="M4 20 9.5 14.5"/><path d="M10.5 13.5 19 5a2 2 0 0 0-2.8-2.8L8 11.5z"/><path d="m8 11.5 4.5 4.5"/>'),
  tooth: svg('<path d="M7.6 3.5c1.5 0 2.3.8 4.4.8s2.9-.8 4.4-.8c2 0 3.1 1.6 3.1 4 0 2-.7 3.4-1.3 5.2-.5 1.6-.6 3.3-1 5-.3 1.4-.8 2.3-1.7 2.3-1.2 0-1.4-1.4-1.6-3-.2-1.5-.5-2.6-1.9-2.6s-1.7 1.1-1.9 2.6c-.2 1.6-.4 3-1.6 3-.9 0-1.4-.9-1.7-2.3-.4-1.7-.5-3.4-1-5-.6-1.8-1.3-3.2-1.3-5.2 0-2.4 1.1-4 3.1-4z"/>'),
  micro: svg('<path d="M9 4.5 7 8"/><path d="m12.5 6.6-3.4 6"/><path d="M7.4 10.2 11 12.3"/><path d="M5 20h14"/><path d="M8 20a6 6 0 0 0 9-5.2"/><path d="M6.5 16.5h5"/>'),
  derm: svg('<circle cx="12" cy="12" r="8.2"/><path d="M8 13.4c1.3 1.5 2.6 2.2 4 2.2s2.7-.7 4-2.2"/><path d="M9.2 9.6h.01M14.8 9.6h.01"/>'),
  scale: svg('<path d="M12 4.5v15M4.5 19.5h15M8 7.5h8"/><path d="M8 7.5 5 14h6zM16 7.5 13 14h6z"/>'),
  paw: svg('<circle cx="7" cy="9.5" r="1.9"/><circle cx="11.6" cy="7.2" r="1.9"/><circle cx="16.4" cy="9.1" r="1.9"/><path d="M8.3 16.4c0-2.4 1.7-4.1 3.9-4.1s3.9 1.7 3.9 4.1c0 2.1-1.9 3.3-3.9 3.3s-3.9-1.2-3.9-3.3z"/>'),
  chat: svg('<path d="M20 13.5A3.5 3.5 0 0 1 16.5 17H9l-4.5 3.2V7.5A3.5 3.5 0 0 1 8 4h8.5A3.5 3.5 0 0 1 20 7.5z"/><path d="M8.5 10.5h7M8.5 13.5h4"/>'),
  heart: svg('<path d="M12 20.2S4.4 15.6 4.4 10.2A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.6 2.6c0 5.4-7.6 10-7.6 10z"/>'),
  clock: svg('<circle cx="12" cy="12" r="8.2"/><path d="M12 7.4V12l3.1 2"/>'),
  phone: svg('<path d="M7.2 3.5h2.9l1.5 4-2.2 1.6a12.4 12.4 0 0 0 5.9 5.9l1.6-2.2 4 1.5v2.9a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 3.7 5.7a2 2 0 0 1 2-2.2z"/>'),
  mail: svg('<rect x="3.2" y="5.4" width="17.6" height="13.2" rx="2.4"/><path d="m4.2 7.2 7.8 5.6 7.8-5.6"/>'),
  pin: svg('<path d="M12 21.2s7-6.3 7-11.1a7 7 0 1 0-14 0C5 14.9 12 21.2 12 21.2z"/><circle cx="12" cy="10" r="2.4"/>'),
  calendar: svg('<rect x="3.4" y="5.2" width="17.2" height="15.4" rx="2.4"/><path d="M3.4 10h17.2M8.4 3.4v3.4M15.6 3.4v3.4"/>'),
  car: svg('<path d="M4 14.5 6.4 9.2h11.2L20 14.5"/><path d="M3.4 14.5h17.2v3.2H3.4z"/><circle cx="7.2" cy="17.7" r="1.5"/><circle cx="16.8" cy="17.7" r="1.5"/>'),
  users: svg('<circle cx="9" cy="8.6" r="3.2"/><path d="M3.6 19.4a5.4 5.4 0 0 1 10.8 0"/><path d="M16 5.8a3.2 3.2 0 0 1 0 6"/><path d="M17.4 14.6a5.4 5.4 0 0 1 3 4.8"/>'),
  tools: svg('<path d="M14.2 6.6a3.6 3.6 0 0 1 4.9 4.6l-8 8-4.8 1.4 1.4-4.8z"/><path d="m13 8 3.4 3.4"/>'),
  alert: svg('<circle cx="12" cy="12" r="8.2"/><path d="M12 7.6v5M12 16.2h.01"/>'),
  bandage: svg('<rect x="2.6" y="8.4" width="18.8" height="7.2" rx="3.6" transform="rotate(-24 12 12)"/><path d="M10.8 10.8h.01M13.2 13.2h.01M12.6 10.2h.01M11.4 13.8h.01"/>'),
  collar: svg('<circle cx="12" cy="12" r="7.4"/><circle cx="12" cy="12" r="3"/><path d="M12 15v4"/>'),
  pill: svg('<rect x="3" y="8.6" width="18" height="6.8" rx="3.4" transform="rotate(-38 12 12)"/><path d="m9.2 9.2 5.6 5.6"/>'),
  eye: svg('<path d="M2.8 12S6 6.6 12 6.6 21.2 12 21.2 12 18 17.4 12 17.4 2.8 12 2.8 12z"/><circle cx="12" cy="12" r="2.6"/>'),
  ig: svg('<rect x="4" y="4" width="16" height="16" rx="4.6"/><circle cx="12" cy="12" r="3.4"/><path d="M16.8 7.2h.01"/>'),
  fb: svg('<path d="M14.6 7.6h2V4.4h-2.3c-2.3 0-3.7 1.5-3.7 3.9v1.9H8.4v3.2h2.2v7h3.3v-7h2.3l.4-3.2h-2.7V8.6c0-.7.3-1 .7-1z"/>'),
  map: svg('<path d="M9 4.4 3.6 6.6v13l5.4-2.2 6 2.2 5.4-2.2v-13L15 6.6z"/><path d="M9 4.4v13M15 6.6v13"/>'),
  lotus: svg('<path d="M12 4.5c1.8 2.1 2.7 4.2 2.7 6.3s-.9 4.2-2.7 6.3c-1.8-2.1-2.7-4.2-2.7-6.3s.9-4.2 2.7-6.3z"/><path d="M9.3 10.5C7.2 9.4 5.3 9.3 3.6 10.2c0 2.4 1 4.3 3 5.6 1.6 1 3.5 1.5 5.4 1.5"/><path d="M14.7 10.5c2.1-1.1 4-1.2 5.7-.3 0 2.4-1 4.3-3 5.6-1.6 1-3.5 1.5-5.4 1.5"/>'),
  doc: svg('<path d="M6.4 3.4h7l4.2 4.2v13H6.4z"/><path d="M13.2 3.4v4.4h4.4"/><path d="M9 12.4h6M9 15.8h4.2"/>'),
};

const PAW_SOLID = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6.6" cy="9.4" r="2.1"/><circle cx="11.4" cy="6.9" r="2.1"/><circle cx="16.6" cy="9" r="2.1"/><circle cx="20" cy="13.4" r="1.7"/><path d="M8 16.6c0-2.6 1.8-4.5 4.2-4.5s4.2 1.9 4.2 4.5c0 2.3-2 3.6-4.2 3.6S8 18.9 8 16.6z"/></svg>`;

/* ------------------------------------------------------------------ */
/* shell                                                               */
/* ------------------------------------------------------------------ */

const NAV_PRESENT = [
  ["index.html", "Domů"],
  ["sluzby/index.html", "Služby"],
  ["tym.html", "Tým"],
  ["cenik.html", "Ceník"],
  ["pohotovost.html", "Pohotovost"],
  ["galerie.html", "Galerie"],
  ["recenze.html", "Recenze"],
  ["kontakt.html", "Kontakt"],
];

const NAV_REQUEST = [
  ["index.html", "Domů"],
  ["sluzby/index.html", "Služby"],
  ["tym.html", "Tým"],
  ["cenik.html", "Ceník"],
  ["pohotovost.html", "Pohotovost"],
  ["po-zakroku/index.html", "Po zákroku"],
  ["galerie.html", "Galerie"],
  ["recenze.html", "Recenze"],
  ["kontakt.html", "Kontakt"],
];

function page({ variant, title, current, main, scripts = "", bodyClass = "", footerInner = "" }) {
  const base = `/design-4/${variant}/`;
  const items = variant === "zadost" ? NAV_REQUEST : NAV_PRESENT;
  const ctaHref = variant === "zadost" ? `${base}zadost.html` : PHONE_HREF;
  const ctaLabel = variant === "zadost" ? "Rezervovat návštěvu" : "Objednat návštěvu";
  const nav = items
    .map(
      ([href, label]) =>
        `<a href="${base}${href}"${current === href ? ' class="is-current"' : ""}>${label}</a>`
    )
    .join("\n          ");
  const footNote =
    variant === "zadost"
      ? "VITAE Veterinary Clinic · web + žádost o termín"
      : "VITAE Veterinary Clinic · prezenční web";

  return `<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="${FONTS}" rel="stylesheet" />
    <link rel="stylesheet" href="/design-4/theme.css" />
  </head>
  <body${bodyClass ? ` class="${bodyClass}"` : ""}>
    <header class="vt-header" id="header">
      <div class="container">
        <a class="vt-brand" href="${base}index.html">
          <b>VITAE</b>
          <span>Veterinary Clinic</span>
        </a>
        <nav class="vt-nav" id="nav">
          ${nav}
        </nav>
        <a class="vt-cta" href="${ctaHref}">${ctaLabel}</a>
        <button class="nav-toggle" id="navToggle" type="button" aria-label="Menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <main>
${main}
    </main>

    <footer class="site-footer${footerInner ? " site-footer--home" : ""}">
      <div class="container">
        ${
          footerInner ||
          `<span>VITAE</span>
        <span>${footNote}</span>`
        }
      </div>
    </footer>

    <script src="/shared/site.js"></script>
    <script src="/design-4/vitae.js"></script>${scripts}
  </body>
</html>
`;
}

/* ------------------------------------------------------------------ */
/* shared blocks                                                       */
/* ------------------------------------------------------------------ */

const bookHref = (variant) =>
  variant === "zadost" ? `/design-4/${variant}/zadost.html` : PHONE_HREF;

function contactPanel(variant) {
  const base = `/design-4/${variant}/`;
  return `<div class="home-contact-panel reveal">
            <span class="home-contact-art" aria-hidden="true"></span>
            <span class="home-contact-corners" aria-hidden="true"></span>
            <div class="home-contact-grid">
              <div class="home-contact-col">
                <p class="home-contact-brand"><b>VITAE</b><span>Veterinary Clinic</span></p>
                <div class="home-contact-address">
                  <p class="home-contact-k">Adresa</p>
                  <p class="home-contact-v">Ulice 12<br />110 00 Praha</p>
                  <a class="home-contact-way" href="${base}kontakt.html">Jak se k nám dostanete →</a>
                </div>
                <div class="home-contact-pair">
                  <div class="home-contact-pair-item">
                    <p class="home-contact-k">Telefon</p>
                    <p class="home-contact-v"><a href="${PHONE_HREF}">${PHONE}</a></p>
                  </div>
                  <div class="home-contact-pair-item">
                    <p class="home-contact-k">E-mail</p>
                    <p class="home-contact-v"><a href="mailto:${MAIL}">${MAIL}</a></p>
                  </div>
                </div>
                <p class="home-contact-ask">
                  <span>Máte otázku?</span>
                  <a href="${base}kontakt.html">Rádi vám poradíme. →</a>
                </p>
                <div class="home-contact-do">
                  <div class="home-contact-do-item">
                    <span class="home-contact-do-ring">${ICON.calendar}</span>
                    <span class="home-contact-do-text"><b>Objednejte se</b><span>rychle a pohodlně online</span></span>
                  </div>
                  <div class="home-contact-do-item">
                    <span class="home-contact-do-ring">${ICON.chat}</span>
                    <span class="home-contact-do-text"><b>Zeptejte se</b><span>na cokoliv, rádi poradíme</span></span>
                  </div>
                  <div class="home-contact-do-item">
                    <span class="home-contact-do-ring">${ICON.doc}</span>
                    <span class="home-contact-do-text"><b>Sdílejte výsledky</b><span>online nebo e-mailem</span></span>
                  </div>
                </div>
              </div>
              <div class="home-contact-hours">
                <h3>Ordinační hodiny</h3>
                <p>Po–Pá 8:00–18:00<br />So 9:00–12:00</p>
                <div class="home-contact-extras">
                  <div class="home-contact-extras-item">
                    <span class="home-contact-extras-ring">${ICON.paw}</span>
                    <span class="home-contact-extras-text"><b>Akutní péče</b><span>Po telefonické<br />domluvě</span></span>
                  </div>
                  <div class="home-contact-extras-item">
                    <span class="home-contact-extras-ring">${ICON.car}</span>
                    <span class="home-contact-extras-text"><b>Parkování</b><span>Přímo u kliniky</span></span>
                  </div>
                  <div class="home-contact-extras-item">
                    <span class="home-contact-extras-ring">${ICON.calendar}</span>
                    <span class="home-contact-extras-text"><b>Objednání</b><span>Online nebo<br />telefonicky</span></span>
                  </div>
                </div>
                <p class="actions">${btn(bookHref(variant), "Rezervovat návštěvu")}</p>
                <p class="home-contact-note">Ozveme se vám s potvrzením termínu.</p>
                <div class="home-contact-map">
                  <p class="home-contact-map-label">Najdete nás</p>
                  <div class="home-contact-map-art" aria-hidden="true">
                    <svg viewBox="0 0 320 148" fill="none">
                      <rect width="320" height="148" fill="#2a0912"/>
                      <path d="M-10 92h340" stroke="#e6c79a" stroke-opacity=".2"/>
                      <path d="M-10 54h340" stroke="#e6c79a" stroke-opacity=".26"/>
                      <path d="M-8 118 C70 108, 130 128, 210 112 C260 102, 300 116, 340 108" stroke="#f2dcc3" stroke-opacity=".18" stroke-width="6" stroke-linecap="round"/>
                      <path d="M48 -8v164" stroke="#e6c79a" stroke-opacity=".2"/>
                      <path d="M118 -8v164" stroke="#e6c79a" stroke-opacity=".28"/>
                      <path d="M186 -8v164" stroke="#e6c79a" stroke-opacity=".22"/>
                      <path d="M252 -8v164" stroke="#e6c79a" stroke-opacity=".26"/>
                      <path d="M-10 28h340" stroke="#e6c79a" stroke-opacity=".16"/>
                      <path d="M82 20h96" stroke="#e6c79a" stroke-opacity=".4"/>
                      <path d="M154 20v72" stroke="#e6c79a" stroke-opacity=".4"/>
                      <circle cx="160" cy="64" r="11" fill="#3c0e1b" stroke="#e6c79a" stroke-opacity=".7"/>
                      <circle cx="160" cy="64" r="3.2" fill="#e6c79a"/>
                      <text x="160" y="92" text-anchor="middle" fill="#f9e9d8" font-family="Cormorant Garamond, Georgia, serif" font-size="11" letter-spacing="2.4">VITAE</text>
                      <text x="160" y="104" text-anchor="middle" fill="#e6c79a" font-family="Jost, sans-serif" font-size="5.5" letter-spacing="1.6">VETERINARY CLINIC</text>
                    </svg>
                  </div>
                  <a class="home-contact-route" href="https://www.google.com/maps" target="_blank" rel="noopener">Otevřít v mapách →</a>
                </div>
              </div>
            </div>
          </div>`;
}

function hero({ image, kicker, title, subhead, lead, actions = "", leaf = true, klass = "" }) {
  return `      <section class="hero${klass ? ` ${klass}` : ""}">
        <div class="hero-media" style="background-image: url('${image}')"></div>${
          leaf ? `\n        <span class="leaf leaf--br"></span>` : ""
        }
        <div class="container">
          <div class="hero-copy reveal">
            <span class="kicker">${kicker}</span>
            <h1 class="display">${title}</h1>
            <p class="subhead">${subhead}</p>
            <p class="lead">${lead}</p>${actions ? `\n            <p class="actions">${actions}</p>` : ""}
          </div>
        </div>
      </section>`;
}

const btn = (href, label, mod = "peach") =>
  `<a class="btn btn--${mod}" href="${href}">${label}</a>`;

/* ------------------------------------------------------------------ */
/* 1 — home                                                            */
/* ------------------------------------------------------------------ */

function home(variant) {
  const base = `/design-4/${variant}/`;
  const strip = [
    [ICON.shield, "Bezpečí", "Šetrná a bezpečná péče"],
    [ICON.micro, "Moderní vybavení", "Přesná diagnostika"],
    [ICON.stetho, "Zkušený tým", "S láskou ke zvířatům"],
    [ICON.scalpel, "Široké spektrum služeb", "Od prevence po zákroky"],
    [ICON.tooth, "Péče o celého mazlíčka", "Zdraví, výživa i chování"],
    [ICON.heart, "Dlouhodobá podpora", "Jsme tu i po návštěvě"],
  ]
    .map(
      ([ic, label, note]) =>
        `<div><span class="icon-ring">${ic}</span><b>${label}</b><span class="home-care-note">${note}</span></div>`
    )
    .join("\n            ");

  return `      <section class="hero hero--home">
        <div class="hero-media" style="background-image: url('${IMG.heroDog}')"></div>
        <div class="container">
          <div class="hero-copy reveal">
            <p class="wordmark">VITAE</p>
            <span class="wordmark-sub">Veterinary Clinic</span>
            <h1 class="hero-headline">Pro delší a šťastnější život</h1>
            <p class="hero-note">Moderní veterinární péče s osobním přístupem.</p>
            <p class="actions">${btn(bookHref(variant), "Objednat návštěvu")}</p>
          </div>
        </div>
        <div class="container">
          <div class="icon-strip reveal">
            ${strip}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="split split--wide-left reveal">
            <div class="shot shot--arch">
              <img src="${IMG.catHeld}" alt="Péče o zvíře" />
            </div>
            <div>
              <h2 class="caps-title">Soucit. Odbornost.<br />Zdravější zítřek.</h2>
              <p class="lead">
                Poskytujeme komplexní veterinární péči psům a kočkám — moderní
                medicínu, pokročilou diagnostiku a šetrný, individuální přístup
                ke každému pacientovi.
              </p>
              <p class="actions">${btn(`${base}sluzby/index.html`, "Naše služby")}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section home-quote">
        <div class="container">
          <div class="quote-panel reveal">
            <span class="paw">${PAW_SOLID}</span>
            <p>
              Protože si zaslouží víc než jen ošetření.<br />
              Zaslouží si <em>péči na celý život.</em>
            </p>
          </div>
        </div>
      </section>

      <section class="home-contact">
        <div class="container">
          <h2 class="caps-title">Jsme tu pro vás.</h2>
          <p class="lead home-contact-lead">
            Potřebujete poradit, objednat svého mazlíčka nebo se jen ujistit, že je vše v pořádku?
            Ozvěte se nám. Rádi vám pomůžeme.
          </p>
          <div class="home-contact-trust">
            <div>${ICON.paw}<b>Péče s respektem</b><span>ke každému pacientovi</span></div>
            <div>${ICON.heart}<b>Individuální přístup</b><span>a moderní medicína</span></div>
            <div>${ICON.lotus}<b>Klidné prostředí</b><span>pro vás i vaše mazlíčky</span></div>
          </div>
          ${contactPanel(variant)}
        </div>
      </section>`;
}

/* ------------------------------------------------------------------ */
/* 2 — services                                                        */
/* ------------------------------------------------------------------ */

const SERVICES = [
  [ICON.shield, "Preventivní péče", "Očkování, preventivní prohlídky, odčervení.", "ockovani.html"],
  [ICON.stetho, "Interní medicína", "Diagnostika a léčba vnitřních onemocnění.", null],
  [ICON.scalpel, "Chirurgie", "Měkké tkáně, plánované zákroky a šití ran.", "kastrace.html"],
  [ICON.tooth, "Dentální péče", "Čištění zubů, dentální RTG, zdraví dutiny ústní.", "zuby.html"],
  [ICON.micro, "Diagnostika", "Laboratoř, ultrazvuk, RTG, čipování.", "cipovani.html"],
  [ICON.derm, "Dermatologie", "Kůže, uši a problémy se srstí.", null],
  [ICON.scale, "Výživa a hmotnost", "Individuální plány krmení pro zdravější život.", null],
  [ICON.paw, "Akutní péče", "Okamžité ošetření při naléhavých stavech.", "akutni.html"],
  [ICON.chat, "Poradna chování", "Podpora při problémech s chováním.", null],
];

function services(variant) {
  const base = `/design-4/${variant}/`;
  const cards = SERVICES.map(([ic, title, text, href]) => {
    const tag = href ? "a" : "div";
    const attr = href ? ` href="${base}sluzby/${href}"` : "";
    return `            <${tag} class="svc-card"${attr}>
              ${ic}
              <h3>${title}</h3>
              <p>${text}</p>
            </${tag}>`;
  }).join("\n");

  return `${hero({
    image: IMG.examDog,
    kicker: "Služby",
    title: "Naše služby",
    subhead: "Komplexní péče v každé etapě života",
    lead: "Od prevence po pokročilou diagnostiku a chirurgii — nabízíme celou šíři veterinárních služeb pro psy a kočky.",
    leaf: false,
  })}

      <section class="section" style="padding-top: 0">
        <div class="container">
          <div class="svc-grid reveal">
${cards}
          </div>
          <div class="svc-follow split reveal">
            <div class="shot shot--wide">
              <img src="${IMG.catBed}" alt="Kočka odpočívající v pelíšku" />
            </div>
            <div>
              <h2 class="caps-title">Individuální přístup pro zdravější a šťastnější život.</h2>
              <p class="actions">${btn(bookHref(variant), "Objednat návštěvu")}</p>
            </div>
          </div>
        </div>
      </section>`;
}

/* ------------------------------------------------------------------ */
/* 2b — service detail                                                 */
/* ------------------------------------------------------------------ */

function serviceDetail(variant, def) {
  const base = `/design-4/${variant}/`;
  return `      <section class="hero">
        <div class="hero-media" style="background-image: url('${def.image}')"></div>
        <span class="leaf leaf--br"></span>
        <div class="container">
          <div class="hero-copy reveal">
            <a class="crumb" href="${base}sluzby/index.html">← Služby</a>
            <span class="kicker">Služba</span>
            <h1 class="display">${def.title}</h1>
            <p class="lead">${def.lead}</p>
          </div>
        </div>
      </section>

      <section class="section" style="padding-top: 0">
        <div class="container reveal">
          <div class="detail-grid">
            <article class="panel">
              <span class="panel-kicker">${def.k1}</span>
              <h2>${def.h1}</h2>
              ${def.b1}
            </article>
            <aside class="panel">
              <span class="panel-kicker">${def.k2}</span>
              <h2>${def.h2}</h2>
              ${def.b2}
            </aside>
          </div>
          <div class="actions">
            ${btn(`${base}sluzby/index.html`, "Zpět na služby", "ghost")}
            ${btn(bookHref(variant), "Objednat návštěvu")}
          </div>
        </div>
      </section>`;
}

const SERVICE_PAGES = {
  "ockovani.html": {
    title: "Očkování",
    image: IMG.examDog,
    lead: "Základní i doplňková vakcinace podle věku, prostředí a rizika.",
    k1: "Průběh",
    h1: "Jak to probíhá",
    b1: "<p>Krátké klinické vyšetření, kontrola očkovacího průkazu a aplikace vakcíny. Termín další dávky zapíšeme a včas připomeneme.</p>",
    k2: "Příprava",
    h2: "Připravte si",
    b2: "<ul><li>očkovací průkaz nebo pas</li><li>informaci o reakcích po dřívějším očkování</li><li>přehled aktuálních léků</li></ul>",
  },
  "kastrace.html": {
    title: "Kastrace",
    image: IMG.surgery,
    lead: "Plánovaný zákrok s důrazem na bezpečnou anestezii a klidné zotavení.",
    k1: "Příprava",
    h1: "Před zákrokem",
    b1: "<p>Lačnění podle pokynů, předoperační vyšetření a domluva termínu dopředu. U starších pacientů doplňujeme krevní testy.</p>",
    k2: "Po zákroku",
    h2: "Domácí péče",
    b2: "<ul><li>klidový režim bez skákání a běhání</li><li>denní kontrola rány, zamezení olizování</li><li>léky přesně podle předpisu</li></ul>",
  },
  "zuby.html": {
    title: "Dentální péče",
    image: IMG.dogTongue,
    lead: "Od preventivní kontroly po ultrazvukové čištění pod anestezií.",
    k1: "Indikace",
    h1: "Kdy řešit zuby",
    b1: "<ul><li>zápach z tlamy</li><li>viditelný zubní kámen</li><li>obtíže při žvýkání nebo krvácení dásní</li></ul>",
    k2: "Průběh",
    h2: "Jak to probíhá",
    b2: "<p>Vyšetření dutiny ústní, dentální RTG podle potřeby a návrh ošetření. Po zákroku dostanete pokyny k domácí hygieně.</p>",
  },
  "cipovani.html": {
    title: "Čipování",
    image: IMG.catHeld,
    lead: "Trvalá identifikace zvířete a zápis údajů majitele do registru.",
    k1: "Důvod",
    h1: "Proč čipovat",
    b1: "<p>Čip umožní rychlé spojení při ztrátě zvířete a je povinný pro psy. Často jej aplikujeme zároveň s očkováním.</p>",
    k2: "Příprava",
    h2: "Co potřebujeme",
    b2: "<ul><li>údaje majitele pro registr</li><li>očkovací průkaz nebo pas</li></ul>",
  },
  "akutni.html": {
    title: "Akutní péče",
    image: IMG.husky,
    lead: "Kdy jednat okamžitě a kam se obrátit mimo ordinační dobu.",
    k1: "V provozu",
    h1: "V ordinační době",
    b1: `<p>Zavolejte na <a href="${PHONE_HREF}">${PHONE}</a> — poradíme, jestli vyrazit ihned, nebo jak zvíře do příjezdu stabilizovat.</p>`,
    k2: "Mimo provoz",
    h2: "Večer a o víkendu",
    b2: "<p>Pohotovostní linka funguje 24/7. Podrobný postup a seznam varovných příznaků najdete na stránce Pohotovost.</p>",
  },
};

/* ------------------------------------------------------------------ */
/* 3 — team                                                            */
/* ------------------------------------------------------------------ */

const TEAM = [
  [IMG.vet1, "MVDr. Anna Nováková", "Vedoucí kliniky<br />Interní medicína"],
  [IMG.vet2, "MVDr. Jakub Svoboda", "Chirurgie<br />a ortopedie"],
  [IMG.vet3, "MVDr. Tereza Malá", "Dermatologie"],
  [IMG.vet4, "MVDr. Martin Procházka", "Stomatologie"],
];

function team(variant) {
  const cards = TEAM.map(
    ([img, name, role]) => `            <article class="team-card">
              <div class="portrait" style="background-image: url('${img}')" role="img" aria-label="${name}"></div>
              <h3>${name}</h3>
              <p>${role}</p>
            </article>`
  ).join("\n");

  return `${hero({
    image: IMG.teamHero,
    kicker: "Tým",
    title: "Náš tým",
    subhead: "Lidé, kterým na vašem zvířeti záleží",
    lead: "Náš tým spojuje odbornou zkušenost, průběžné vzdělávání a skutečnou lásku ke zvířatům. Jsme tu pro vás i vaše mazlíčky v každé fázi jejich života.",
    leaf: false,
  })}

      <section class="team-block">
        <div class="container">
          <div class="team-grid reveal">
${cards}
          </div>
        </div>
      </section>

      <section class="team-quote-block">
        <div class="container">
          <div class="team-quote reveal">
            <div>
              <blockquote>Různé dovednosti. Stejné poslání — lepší život vašich mazlíčků.</blockquote>
              <p class="actions">${btn(bookHref(variant), "Objednat návštěvu")}</p>
            </div>
            <div class="shot shot--wide">
              <img src="${IMG.catHeld}" alt="Sestra drží kočku v náručí" />
            </div>
          </div>
        </div>
      </section>`;
}

/* ------------------------------------------------------------------ */
/* 4 — pricing                                                         */
/* ------------------------------------------------------------------ */

const RATES = {
  dog: [
    ["Preventivní péče", [
      ["Klinické vyšetření", "800 – 1 200 Kč"],
      ["Očkování (vzteklina)", "600 – 950 Kč"],
      ["Očkování (kombinované)", "900 – 1 200 Kč"],
      ["Aplikace čipu", "800 Kč"],
    ]],
    ["Diagnostika", [
      ["Krevní test (základní)", "900 – 1 500 Kč"],
      ["Krevní test (rozšířený)", "1 600 – 3 000 Kč"],
      ["Ultrazvuk", "1 000 – 1 800 Kč"],
      ["RTG snímek", "900 – 1 500 Kč"],
    ]],
    ["Dentální péče", [
      ["Dentální vyšetření", "800 Kč"],
      ["Čištění zubů (ultrazvuk)", "2 500 – 4 000 Kč"],
      ["Dentální RTG", "1 200 Kč"],
    ]],
    ["Chirurgie", [
      ["Kastrace (fena)", "4 000 – 6 000 Kč"],
      ["Kastrace (pes)", "2 500 – 4 000 Kč"],
      ["Chirurgie měkkých tkání", "od 3 000 Kč"],
    ]],
  ],
  cat: [
    ["Preventivní péče", [
      ["Klinické vyšetření", "700 – 1 100 Kč"],
      ["Očkování (vzteklina)", "550 – 900 Kč"],
      ["Očkování (kombinované)", "850 – 1 150 Kč"],
      ["Aplikace čipu", "800 Kč"],
    ]],
    ["Diagnostika", [
      ["Krevní test (základní)", "850 – 1 400 Kč"],
      ["Krevní test (rozšířený)", "1 500 – 2 800 Kč"],
      ["Ultrazvuk", "900 – 1 600 Kč"],
      ["RTG snímek", "850 – 1 400 Kč"],
    ]],
    ["Dentální péče", [
      ["Dentální vyšetření", "700 Kč"],
      ["Čištění zubů (ultrazvuk)", "2 300 – 3 600 Kč"],
      ["Dentální RTG", "1 100 Kč"],
    ]],
    ["Chirurgie", [
      ["Kastrace (kočka)", "2 500 – 3 500 Kč"],
      ["Kastrace (kocour)", "1 500 – 2 200 Kč"],
      ["Chirurgie měkkých tkání", "od 2 800 Kč"],
    ]],
  ],
};

const rateCards = (key) =>
  RATES[key]
    .map(
      ([group, rows]) => `              <div class="rate-card">
                <h3>${group}</h3>
${rows
  .map(
    ([name, price]) =>
      `                <div class="rate-row"><span>${name}</span><span>${price}</span></div>`
  )
  .join("\n")}
              </div>`
    )
    .join("\n");

function pricing(variant) {
  const base = `/design-4/${variant}/`;
  return `${hero({
    image: IMG.catGinger,
    kicker: "Ceník",
    title: "Ceník",
    subhead: "Průhledná péče bez překvapení",
    lead: "Věříme v jasné a férové ceny. Uvedené částky jsou orientační a mohou se lišit podle rozsahu vyšetření a individuálních potřeb vašeho zvířete.",
    leaf: false,
  })}

      <section class="section" style="padding-top: 0">
        <div class="container">
          <div class="price-grid">
            <div class="reveal" data-tabs>
              <div class="seg">
                <button type="button" class="is-active" data-tab="dog">Psi</button>
                <button type="button" data-tab="cat">Kočky</button>
              </div>
              <div data-panel="dog">
${rateCards("dog")}
              </div>
              <div data-panel="cat" hidden>
${rateCards("cat")}
              </div>
              <p class="price-note">
                Uvedené ceny jsou orientační. Konečná cena se může lišit podle rozsahu péče a bude vždy potvrzena po vyšetření a konzultaci.
              </p>
            </div>

            <aside class="price-aside">
              <div class="price-aside-inner reveal">
                <div class="shot shot--tall">
                  <img src="${IMG.retriever}" alt="Pes v ordinaci" />
                </div>
                <h3>Nejste si jistí, co vaše zvíře potřebuje?</h3>
                <p>Rádi vám pomůžeme vybrat správnou péči.</p>
                ${btn(`${base}kontakt.html`, "Kontaktovat nás")}
              </div>
            </aside>
          </div>
        </div>
      </section>`;
}

/* ------------------------------------------------------------------ */
/* 5 — booking (zadost only)                                           */
/* ------------------------------------------------------------------ */

function booking() {
  const base = "/design-4/zadost/";
  const perks = [
    [ICON.calendar, "Rychlé a jednoduché odeslání žádosti"],
    [ICON.clock, "Flexibilní termíny"],
    [ICON.users, "Individuální přístup ke každému pacientovi"],
    [ICON.mail, "Termín vám vždy potvrdíme"],
  ]
    .map(([ic, text]) => `            <li>${ic}<span>${text}</span></li>`)
    .join("\n");

  return `${hero({
    image: IMG.catSofa,
    kicker: "Objednání",
    title: "Objednat návštěvu",
    subhead: "O zbytek se postaráme",
    lead: "Vyberte si termín, který vám vyhovuje, a napište, s čím můžeme pomoci. Termín potvrdíme co nejdříve — sloty si nevybíráte sami.",
    leaf: false,
  })}

      <section class="section" style="padding-top: 0">
        <div class="container">
          <div class="book-grid">
            <div class="form-card reveal" data-tabs>
              <div class="form-tabs">
                <button type="button" class="is-active" data-tab="form">Žádost o termín</button>
                <button type="button" data-tab="call">Zavolat na recepci</button>
              </div>

              <div class="form-body" data-panel="form">
                <form id="requestForm" novalidate>
                  <fieldset class="field">
                    <legend>Druh zvířete</legend>
                    <div class="pet-pick">
                      <label><input type="radio" name="petType" value="pes" required /> Pes</label>
                      <label><input type="radio" name="petType" value="kocka" /> Kočka</label>
                    </div>
                  </fieldset>

                  <div class="field">
                    <label for="reason">Důvod návštěvy</label>
                    <select id="reason" name="reason" required>
                      <option value="">Vyberte důvod…</option>
                      <option>Preventivní prohlídka</option>
                      <option>Očkování</option>
                      <option>Dentální péče</option>
                      <option>Chirurgie / kastrace</option>
                      <option>Kožní problém</option>
                      <option>Kontrola po zákroku</option>
                      <option>Jiné</option>
                    </select>
                  </div>

                  <div class="field-row">
                    <div class="field">
                      <label for="prefDate">Preferované datum</label>
                      <input id="prefDate" name="prefDate" type="date" required />
                    </div>
                    <div class="field">
                      <label for="prefTime">Preferovaný čas</label>
                      <select id="prefTime" name="prefTime" required>
                        <option value="">Vyberte čas…</option>
                        <option>Dopoledne 8:00–12:00</option>
                        <option>Odpoledne 12:00–16:00</option>
                        <option>Podvečer 16:00–18:00</option>
                      </select>
                    </div>
                  </div>

                  <div class="field">
                    <label for="ownerName">Vaše jméno</label>
                    <input id="ownerName" name="ownerName" type="text" required autocomplete="name" />
                  </div>

                  <div class="field">
                    <label for="phone">Telefon</label>
                    <input id="phone" name="phone" type="tel" required autocomplete="tel" placeholder="+420 …" />
                  </div>

                  <div class="field">
                    <label for="email">E-mail</label>
                    <input id="email" name="email" type="email" required autocomplete="email" placeholder="vas@email.cz" />
                  </div>

                  <div class="field">
                    <label for="note">Doplňující informace (nepovinné)</label>
                    <textarea id="note" name="note" rows="3" placeholder="Např. příznaky, předchozí léčba…"></textarea>
                  </div>

                  <label class="consent">
                    <input type="checkbox" name="consent" required />
                    <span>Souhlasím se zpracováním osobních údajů <em>(ukázkový text GDPR)</em>.</span>
                  </label>

                  <button class="btn btn--peach" type="submit">Požádat o termín</button>
                  <p class="hint">
                    U akutních stavů formulář nepoužívejte — volejte ihned na
                    <a href="${PHONE_HREF}">${PHONE}</a>.
                  </p>
                </form>

                <div class="form-success" id="requestSuccess">
                  <h2>Žádost odeslána</h2>
                  <p id="successDetail"></p>
                  <p class="hint">
                    Po potvrzení může přijít odkaz na
                    <a href="${base}dotaznik.html">přednávštěvní dotazník</a>.
                  </p>
                </div>
              </div>

              <div class="form-body" data-panel="call" hidden>
                <h2 style="color: var(--wine); font-size: 1.7rem">Zavolejte nám</h2>
                <p style="color: var(--ink-soft)">
                  Nechcete vyplňovat formulář? Zavolejte přímo na recepci —
                  termín domluvíme hned při hovoru.
                </p>
                <p class="actions">${btn(PHONE_HREF, PHONE)}</p>
                <p class="hint">Po–Pá 8:00–18:00 · So 9:00–12:00</p>
              </div>
            </div>

            <aside class="book-aside reveal">
              <ul class="perk-list">
${perks}
              </ul>
            </aside>
          </div>
        </div>
      </section>`;
}

/* ------------------------------------------------------------------ */
/* 6 — emergency                                                       */
/* ------------------------------------------------------------------ */

function emergency(variant) {
  const chips = [
    [ICON.clock, "Dostupnost 24/7"],
    [ICON.users, "Zkušený tým"],
    [ICON.tools, "Moderní vybavení"],
    [ICON.alert, "Okamžitá péče"],
  ]
    .map(([ic, l]) => `<div><span class="icon-ring">${ic}</span><b>${l}</b></div>`)
    .join("\n            ");

  const signs = [
    "Obtížné dýchání",
    "Silné krvácení",
    "Úrazy a nehody",
    "Náhlý kolaps nebo slabost",
    "Opakované zvracení nebo průjem",
    "Neschopnost močit",
    "Podezření na otravu",
    "Křeče",
  ]
    .map((s) => `              <li>${s}</li>`)
    .join("\n");

  return `      <section class="hero">
        <div class="hero-media" style="background-image: url('${IMG.husky}')"></div>
        <div class="container">
          <div class="hero-copy reveal">
            <span class="kicker">Pohotovost</span>
            <h1 class="display">Akutní péče</h1>
            <p class="subhead">Když rozhoduje každá minuta</p>
            <p class="lead">
              Jsme tu pro vás i vaše zvířata v naléhavých situacích. Náš tým
              zajišťuje péči 24/7 pro kritické stavy a nečekané zdravotní potíže.
            </p>
            <p class="actions">
              <a class="em-call" href="${PHONE_HREF}">
                <span class="ring">${ICON.phone}</span>
                <span>
                  <small>Pohotovostní linka 24/7</small>
                  <strong>${PHONE}</strong>
                </span>
              </a>
            </p>
          </div>
        </div>
      </section>

      <section class="em-benefits">
        <div class="container">
          <div class="icon-strip reveal" style="grid-template-columns: repeat(4, 1fr); max-width: 46rem">
            ${chips}
          </div>
        </div>
      </section>

      <section class="section em-signs">
        <div class="container">
          <div class="split reveal">
            <div>
              <h2 class="section-title">Kdy vyrazit na pohotovost?</h2>
              <ul class="check-list check-list--cols">
${signs}
              </ul>
            </div>
            <div class="shot shot--wide">
              <img src="${IMG.examDog}" alt="Veterinární vyšetření" />
            </div>
          </div>
        </div>
      </section>

      <section class="section em-advice">
        <div class="container">
          <div class="quote-panel quote-panel--action reveal">
            <span class="paw">${PAW_SOLID}</span>
            <p>
              Nejste si jistí, co dělat?<br />
              <em>Zavolejte nám. Popište nám stav svého mazlíčka a poradíme vám, zda je potřeba přijet okamžitě.</em>
            </p>
            <a class="btn btn--wine" href="${PHONE_HREF}">Zavolat na pohotovost</a>
          </div>
        </div>
      </section>`;
}

/* ------------------------------------------------------------------ */
/* 7 — aftercare (zadost only)                                         */
/* ------------------------------------------------------------------ */

const AFTER_TABS = {
  surgery: [
    [ICON.collar, "Dopřejte klid", "Omezte pohyb — žádné skákání ani běhání."],
    [ICON.bandage, "Udržujte ránu čistou", "Kontrolujte ji denně a zabraňte olizování."],
    [ICON.shield, "Použijte límec", "Pokud je potřeba zabránit dosahu na ránu."],
    [ICON.pill, "Podávejte léky dle předpisu", "Pečlivě dodržujte pokyny lékaře."],
    [ICON.alert, "Sledujte varovné signály", "Ozvěte se při otoku, zarudnutí, výtoku, nechutenství nebo nezvyklém chování."],
  ],
  home: [
    [ICON.heart, "Klidné místo", "Teplý pelíšek stranou od ruchu domácnosti."],
    [ICON.eye, "Dohled první noc", "Zvíře by nemělo zůstat dlouho samo."],
    [ICON.scale, "Menší porce", "Krmte po malých dávkách podle doporučení."],
  ],
  meds: [
    [ICON.pill, "Přesné dávkování", "Léky podávejte v časech uvedených na kartičce."],
    [ICON.clock, "Vynechaná dávka", "Nikdy nezdvojnásobujte — raději zavolejte."],
    [ICON.alert, "Žádné lidské léky", "Běžná analgetika mohou být pro zvíře toxická."],
  ],
  checks: [
    [ICON.calendar, "Kontrola v termínu", "Přijďte i tehdy, když se rána zdá v pořádku."],
    [ICON.bandage, "Vyndání stehů", "Obvykle 10–14 dní po zákroku."],
    [ICON.stetho, "Dlouhodobé sledování", "U chronických pacientů domluvíme další plán."],
  ],
};

const stepList = (rows) =>
  rows
    .map(
      ([ic, title, text]) => `              <li>
                ${ic}
                <span><b>${title}</b><p>${text}</p></span>
              </li>`
    )
    .join("\n");

function aftercare() {
  const base = "/design-4/zadost/";
  const docs = [
    ["po-kastrace.html", "Po kastraci", "Klidový režim, rána, límec, kdy volat."],
    ["po-zuby.html", "Po dentálním ošetření", "Strava, péče o tlamu, kontrola."],
    ["po-anestezii.html", "Po anestezii", "Probouzení, dohled, rizikové příznaky."],
  ]
    .map(
      ([href, title, text], i) => `            <li>
              <a class="doc-row" href="${base}po-zakroku/${href}">
                <span class="num">0${i + 1}</span>
                <span><h3>${title}</h3><p>${text}</p></span>
                <span class="go">→</span>
              </a>
            </li>`
    )
    .join("\n");

  return `${hero({
    image: IMG.puppySleep,
    kicker: "Po zákroku",
    title: "Po zákroku",
    subhead: "Klidné zotavení doma",
    lead: "Správná péče po zákroku je klíčem k rychlému a bezpečnému zotavení. Najdete tu praktické rady přizpůsobené potřebám vašeho zvířete.",
    leaf: false,
  })}

      <section class="after-body">
        <div class="container">
          <div class="reveal" data-tabs>
            <div class="tab-row">
              <button type="button" class="is-active" data-tab="surgery">Po operaci</button>
              <button type="button" data-tab="home">Péče doma</button>
              <button type="button" data-tab="meds">Léky</button>
              <button type="button" data-tab="checks">Kontroly</button>
            </div>
            <div data-panel="surgery">
              <ul class="step-list">
${stepList(AFTER_TABS.surgery)}
              </ul>
            </div>
            <div data-panel="home" hidden>
              <ul class="step-list">
${stepList(AFTER_TABS.home)}
              </ul>
            </div>
            <div data-panel="meds" hidden>
              <ul class="step-list">
${stepList(AFTER_TABS.meds)}
              </ul>
            </div>
            <div data-panel="checks" hidden>
              <ul class="step-list">
${stepList(AFTER_TABS.checks)}
              </ul>
            </div>
          </div>

          <ol class="doc-list reveal">
${docs}
          </ol>
        </div>
      </section>

      <section class="after-close">
        <div class="container">
          <div class="split reveal">
            <div>
              <h2 class="caps-title">Každé zvíře se zotavuje svým tempem.</h2>
              <p class="lead">
                Máte-li jakékoliv pochybnosti, ozvěte se — rádi poradíme.
                Odkaz na <a href="${base}dotaznik.html">přednávštěvní dotazník</a>
                posíláme před kontrolou.
              </p>
            </div>
            <div class="shot shot--wide">
              <img src="${IMG.dogBlanket}" alt="Odpočívající pes" />
            </div>
          </div>
        </div>
      </section>`;
}

function aftercareDoc(def) {
  const base = "/design-4/zadost/";
  return `      <section class="hero${def.heroClass ? ` ${def.heroClass}` : ""}">
        <div class="hero-media" style="background-image: url('${def.image}')"></div>${
          def.leaf === false ? "" : `\n        <span class="leaf leaf--br"></span>`
        }
        <div class="container">
          <div class="hero-copy reveal">
            <a class="crumb" href="${base}po-zakroku/index.html">← Po zákroku</a>
            <span class="kicker">Pokyny</span>
            <h1 class="display">${def.title}</h1>
            <p class="lead">${def.lead}</p>
          </div>
        </div>
      </section>

      <section class="section" style="padding-top: 0">
        <div class="container reveal">
          <h2 class="section-title">Prvních 24 hodin</h2>
          <ul class="step-list">
${stepList(def.steps)}
          </ul>

          <div class="detail-grid" style="margin-top: 1.2rem">
            <article class="panel">
              <span class="panel-kicker">Další dny</span>
              <h2>Jak postupovat</h2>
              ${String(def.later).includes("<p>") ? def.later : `<p>${def.later}</p>`}
            </article>
            <aside class="alert-panel">
              <span class="panel-kicker" style="color: var(--peach)">Urgentní</span>
              <h2>Volejte ihned</h2>
              <p>${def.alert}</p>
            </aside>
          </div>

          <div class="actions">
            ${btn(`${base}po-zakroku/index.html`, "Všechny pokyny", "ghost")}
            ${btn(PHONE_HREF, "Zavolat klinice")}
          </div>
        </div>
      </section>`;
}

const AFTER_PAGES = {
  "po-kastrace.html": {
    title: "Po kastraci",
    image: IMG.puppySleep,
    bodyClass: "page-neuter",
    heroClass: "hero--neuter",
    leaf: false,
    lead: "Základní domácí péče po kastračním zákroku.",
    steps: [
      [ICON.collar, "Klid, teplo, dohled", "Žádné skákání, běhání ani schody."],
      [ICON.heart, "Voda k dispozici", "Krmení až podle pokynů lékaře."],
      [ICON.bandage, "Kontrola rány", "Bez olizování — v případě potřeby límec."],
    ],
    later:
      "Pohyb omezte podle doporučení. Na kontrolu přijďte v domluveném termínu, i když se rána zdá v pořádku.",
    alert:
      "Silné krvácení, dušnost, kolaps, nebo zvíře nepřijímá tekutiny déle, než bylo doporučeno.",
  },
  "po-zuby.html": {
    title: "Po dentálním ošetření",
    image: IMG.dogTongue,
    bodyClass: "page-neuter",
    heroClass: "hero--neuter",
    leaf: false,
    lead: "Co dělat po čištění zubů nebo dentálním zákroku.",
    steps: [
      [ICON.scale, "Měkká strava", "Několik dní podle doporučení lékaře."],
      [ICON.eye, "Kontrola dásní", "Mírné zakrvácení první den bývá obvyklé."],
      [ICON.tooth, "Žádné tvrdé pamlsky", "Dokud ošetřující lékař nepovolí."],
    ],
    later:
      "Domácí hygienu tlamy zaveďte postupně podle instrukcí. Na kontrolu přijďte v domluveném termínu.",
    alert:
      "Přetrvávající krvácení, výrazná bolestivost, otok tváře nebo odmítání potravy déle než 24 hodin.",
  },
  "po-anestezii.html": {
    title: "Po anestezii",
    image: IMG.dogBlanket,
    bodyClass: "page-neuter",
    heroClass: "hero--neuter hero--anesthesia",
    leaf: false,
    lead: "Probouzení, dohled a rizikové příznaky po celkové anestezii.",
    steps: [
      [ICON.eye, "Dohled a teplo", "Žádné schody ani skoky na pohovku bez jištění."],
      [ICON.heart, "Voda až po probuzení", "Nabídněte malé množství, až bude zvíře plně při vědomí."],
      [ICON.stetho, "Sledujte dýchání", "Kontrolujte barvu sliznic a klidné dýchání."],
    ],
    later: `<p>Ospalost může přetrvávat do druhého dne. Postupně se vrací chuť k jídlu i běžná aktivita.</p>
              <p>První večer nechte zvíře především odpočívat. Zajistěte mu klidné a teplé místo, kde nebude rušeno dětmi ani dalšími zvířaty.</p>
              <p>Aktivitu zvyšujte postupně. Pokud je zvíře stále nejisté nebo ospalé, nedovolte mu skákat na nábytek, chodit po schodech ani běhat.</p>
              <p>Krmení a vodu nabídněte podle pokynů lékaře. Pokud zvíře opakovaně zvrací, odmítá vodu nebo se jeho stav zhoršuje, kontaktujte kliniku.</p>`,
    alert:
      "Dezorientace trvající déle než den, opakované zvracení, dušnost nebo bledé sliznice.",
  },
};

/* ------------------------------------------------------------------ */
/* 7b — questionnaire (zadost only)                                    */
/* ------------------------------------------------------------------ */

function quiz() {
  const base = "/design-4/zadost/";
  return `${hero({
    image: IMG.catSofa,
    kicker: "Před návštěvou",
    title: "Přednávštěvní dotazník",
    subhead: "Tři otázky, dvě minuty",
    lead: "Po potvrzení termínu vám sestra pošle odkaz na tento dotazník. Lékař tak uvidí vaše odpovědi ještě před příchodem pacienta.",
  })}

      <section class="section" style="padding-top: 0">
        <div class="container">
          <div class="book-grid">
            <div class="form-card reveal">
              <div class="form-body">
                <form id="questionnaireForm">
                  <div class="field">
                    <label for="meds">Aktuální léky</label>
                    <textarea id="meds" name="meds" rows="3" placeholder="Názvy léků a dávkování, nebo „žádné“"></textarea>
                  </div>
                  <div class="field">
                    <label for="allergies">Alergie</label>
                    <textarea id="allergies" name="allergies" rows="3" placeholder="Léky, krmivo, jiné…"></textarea>
                  </div>
                  <div class="field">
                    <label for="symptoms">Vývoj příznaků</label>
                    <textarea id="symptoms" name="symptoms" rows="3" placeholder="Od kdy, co se zhoršilo nebo zlepšilo"></textarea>
                  </div>
                  <div class="field">
                    <label for="qEmail">Váš e-mail</label>
                    <input id="qEmail" name="email" type="email" required autocomplete="email" placeholder="vas@email.cz" />
                  </div>
                  <label class="consent">
                    <input type="checkbox" name="consent" required />
                    <span>Souhlasím se zpracováním údajů pro účely vyšetření <em>(ukázkový text GDPR)</em>.</span>
                  </label>
                  <button class="btn btn--peach" type="submit">Odeslat dotazník</button>
                </form>
                <div class="form-success" id="qSuccess">
                  <h2>Dotazník uložen</h2>
                  <p style="color: var(--ink-soft)">
                    V ostré verzi by odpovědi viděl tým před příchodem pacienta.
                    V této ukázce se data nikam neodesílají.
                  </p>
                  <p class="actions">${btn(`${base}zadost.html`, "Zpět na objednání")}</p>
                </div>
              </div>
            </div>

            <aside class="book-aside reveal">
              <ul class="perk-list">
                <li>${ICON.clock}<span>Vyplnění zabere přibližně 2 minuty</span></li>
                <li>${ICON.stetho}<span>Lékař zná situaci ještě před návštěvou</span></li>
                <li>${ICON.heart}<span>Kratší a klidnější vyšetření pro zvíře</span></li>
              </ul>
              <div class="shot shot--wide">
                <img src="${IMG.kitten.replace("w=500", "w=1100")}" alt="Kotě" />
              </div>
            </aside>
          </div>
        </div>
      </section>`;
}

const QUIZ_JS = `
    <script>
      (function () {
        var form = document.getElementById("questionnaireForm");
        if (!form) return;
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          if (!form.checkValidity()) {
            form.reportValidity();
            return;
          }
          form.hidden = true;
          document.getElementById("qSuccess").classList.add("is-visible");
        });
      })();
    </script>`;

/* ------------------------------------------------------------------ */
/* 8 — reviews                                                         */
/* ------------------------------------------------------------------ */

const REVIEWS = [
  [IMG.kitten, "Martina K.", "Skvělá péče a úžasný tým. Vždy si najdou čas všechno vysvětlit a o našeho psa se opravdu starají."],
  [IMG.dogSmall, "Jan P.", "Profesionální, laskaví a pozorní. Naše kočka se tu cítila bezpečně už od první návštěvy."],
  [IMG.catGinger, "Lucie H.", "Jsme vděční za vynikající péči během operace naší kočky. Všechno proběhlo hladce a komunikace byla perfektní."],
  [IMG.retriever, "Petra S.", "Krásná klinika s přátelskou atmosférou. Naše zvířata bychom nesvěřili nikomu jinému."],
  [IMG.husky, "Tomáš R.", "Od očkování po kontroly je vše klidné a srozumitelné. Odcházíme s jistotou, že je o něj postaráno."],
  [IMG.catBlack, "Eva M.", "Při akutním stavu nám ihned poradili, co dělat. Cítili jsme podporu v každé chvíli, kdy jsme volali."],
];

function reviews(variant) {
  const cards = REVIEWS.map(
    ([img, name, text]) => `            <article class="rev-card">
              <header>
                <span class="avatar" style="background-image: url('${img}')"></span>
                <p class="stars" aria-label="Hodnocení 5 z 5">★★★★★</p>
              </header>
              <p>„${text}“</p>
              <cite>— ${name}</cite>
            </article>`
  ).join("\n");

  return `${hero({
    image: IMG.twoDogs,
    kicker: "Recenze",
    title: "Recenze klientů",
    subhead: "Skutečné příběhy, spokojení mazlíčci",
    lead: "Důvěra a spokojenost klientů pro nás znamenají všechno. Tady jsou některé z jejich příběhů.",
    klass: "hero--reviews",
    leaf: false,
  })}

      <section class="reviews-body">
        <div class="container">
          <div class="rev-grid reveal">
${cards}
          </div>
        </div>
      </section>

      <section class="reviews-share">
        <div class="container">
          <div class="split reveal">
            <div>
              <h2 class="section-title">Podělte se o zkušenost</h2>
              <p class="lead">
                Vaše zpětná vazba nám pomáhá zlepšovat se a inspiruje ostatní
                majitele. Rádi si přečteme váš příběh — QR kód na recenze najdete
                i na recepci.
              </p>
              <p class="actions">
                <a class="btn btn--peach" href="https://www.google.com/maps" target="_blank" rel="noopener">Napsat recenzi</a>
              </p>
            </div>
            <div class="shot shot--reviews">
              <span class="fill" style="background-image: url('${IMG.catBed}')"></span>
            </div>
          </div>
        </div>
      </section>`;
}

/* ------------------------------------------------------------------ */
/* 9 — gallery                                                         */
/* ------------------------------------------------------------------ */

const GALLERY = [
  [IMG.catGinger, "pacienti", "gal-mid"],
  [IMG.catSofa, "pacienti", "gal-short"],
  [IMG.examDog, "zakroky", "gal-tall"],
  [IMG.catBed, "pacienti", "gal-mid"],
  [IMG.clinic, "klinika", "gal-hero"],
  [IMG.twoDogs, "pacienti", "gal-short"],
  [IMG.surgery, "zakroky", "gal-mid"],
  [IMG.retriever, "pacienti", "gal-short"],
  [IMG.dogSmall, "pacienti", "gal-short"],
  [IMG.vet3, "tym", "gal-mid gal-crop-face"],
  [IMG.catHeld, "pacienti", "gal-tall"],
  [IMG.husky, "pacienti", "gal-short gal-crop-husky"],
];

function gallery(variant) {
  const figs = GALLERY.map(
    ([src, cat, mod]) =>
      `            <figure class="${mod}" data-cat="${cat}"><span class="fill" style="background-image: url('${src}')"></span></figure>`
  ).join("\n");

  return `${hero({
    image: IMG.catHeld,
    kicker: "Galerie",
    title: "Galerie",
    subhead: "Nahlédnutí do našeho světa",
    lead: "Momenty z našeho běžného dne — pacienti, tým a péče, kterou poskytujeme.",
    klass: "hero--gallery",
    leaf: false,
  })}

      <section class="gal-body">
        <div class="container">
          <div class="gal-filters reveal" id="galFilters">
            <button type="button" class="is-active" data-filter="all">Vše</button>
            <button type="button" data-filter="pacienti">Pacienti</button>
            <button type="button" data-filter="klinika">Klinika</button>
            <button type="button" data-filter="tym">Tým</button>
            <button type="button" data-filter="zakroky">Zákroky</button>
          </div>
          <div class="gal-grid reveal">
${figs}
          </div>
          <div class="gal-foot reveal">
            <a class="btn btn--ghost" href="https://www.instagram.com" target="_blank" rel="noopener">Sledujte nás na Instagramu</a>
          </div>
        </div>
      </section>`;
}

/* ------------------------------------------------------------------ */
/* 10 — contact                                                        */
/* ------------------------------------------------------------------ */

function contact(variant) {
  return `${hero({
    image: IMG.retriever,
    kicker: "Kontakt",
    title: "Kontakt",
    subhead: "JSME TU PRO VÁS",
    lead: "Máte otázku nebo potřebujete poradit? Ozvěte se — rádi pomůžeme.",
    klass: "hero--contact",
    leaf: false,
  })}

      <section class="section contact-body">
        <div class="container">
          <div class="contact-grid reveal">
            <article class="contact-card">
              ${ICON.pin}
              <h3>Navštivte nás</h3>
              <p>
                <span>VITAE Veterinary Clinic</span>
                <span>Ulice 12</span>
                <span>110 00 Praha</span>
                <span>Česká republika</span>
              </p>
            </article>
            <article class="contact-card">
              ${ICON.phone}
              <h3>Zavolejte nám</h3>
              <p>
                <span><a href="${PHONE_HREF}">${PHONE}</a></span>
                <span>Po–Pá 8:00–18:00 · So 9:00–12:00</span>
                <span>Pohotovost 24/7: <a href="${PHONE_HREF}">${PHONE}</a></span>
              </p>
            </article>
            <article class="contact-card">
              ${ICON.mail}
              <h3>Napište nám</h3>
              <p>
                <a href="mailto:${MAIL}">${MAIL}</a><br />
                Odpovídáme obvykle do 24 hodin.
              </p>
            </article>
          </div>

          <div class="split contact-photos reveal">
            <div class="shot shot--contact">
              <span class="fill" style="background-image: url('/shared/images/prostor-kliniky.jpg')"></span>
            </div>
            <div class="shot shot--contact">
              <span class="fill" style="background-image: url('${IMG.examDog}')"></span>
            </div>
          </div>

          <div class="social-section reveal">
            <h3>Sledujte nás</h3>
            <div class="contact-socials">
              <a href="https://www.instagram.com" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a>
              <a href="https://www.google.com/maps" target="_blank" rel="noopener" aria-label="Mapa">${ICON.map}</a>
            </div>
          </div>
        </div>
      </section>`;
}

/* ------------------------------------------------------------------ */
/* write everything                                                    */
/* ------------------------------------------------------------------ */

function write(rel, html) {
  const full = resolve(ROOT, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html.replace(/\r?\n/g, "\r\n"), "utf8");
  console.log("wrote design-4/" + rel.replace(/\\/g, "/"));
}

for (const variant of ["prezentacni", "zadost"]) {
  write(
    join(variant, "index.html"),
    page({
      variant,
      title: "VITAE Veterinary Clinic",
      current: "index.html",
      main: home(variant),
      bodyClass: "page-home",
      footerInner: `<a class="foot-brand" href="/design-4/${variant}/index.html"><b>VITAE</b><span>Veterinary Clinic</span></a>
        <nav class="foot-nav">
          <a href="/design-4/${variant}/sluzby/index.html">Služby</a>
          <a href="/design-4/${variant}/tym.html">Tým</a>
          <a href="/design-4/${variant}/cenik.html">Ceník</a>
          <a href="/design-4/${variant}/pohotovost.html">Pohotovost</a>
          <a href="/design-4/${variant}/kontakt.html">Kontakt</a>
        </nav>
        <span>© 2026 VITAE Veterinary Clinic</span>`,
    })
  );
  write(
    join(variant, "sluzby", "index.html"),
    page({ variant, title: "Služby — VITAE", current: "sluzby/index.html", main: services(variant), bodyClass: "page-services" })
  );
  for (const [file, def] of Object.entries(SERVICE_PAGES)) {
    write(
      join(variant, "sluzby", file),
      page({
        variant,
        title: `${def.title} — VITAE`,
        current: "sluzby/index.html",
        main: serviceDetail(variant, def),
      })
    );
  }
  write(
    join(variant, "tym.html"),
    page({ variant, title: "Náš tým — VITAE", current: "tym.html", main: team(variant), bodyClass: "page-team" })
  );
  write(
    join(variant, "cenik.html"),
    page({ variant, title: "Ceník — VITAE", current: "cenik.html", main: pricing(variant), bodyClass: "page-pricing" })
  );
  write(
    join(variant, "pohotovost.html"),
    page({ variant, title: "Pohotovost — VITAE", current: "pohotovost.html", main: emergency(variant), bodyClass: "page-emergency" })
  );
  write(
    join(variant, "recenze.html"),
    page({ variant, title: "Recenze klientů — VITAE", current: "recenze.html", main: reviews(variant), bodyClass: "page-reviews" })
  );
  write(
    join(variant, "galerie.html"),
    page({ variant, title: "Galerie — VITAE", current: "galerie.html", main: gallery(variant), bodyClass: "page-gallery" })
  );
  write(
    join(variant, "kontakt.html"),
    page({ variant, title: "Kontakt — VITAE", current: "kontakt.html", main: contact(variant), bodyClass: "page-contact" })
  );
}

write(
  join("zadost", "zadost.html"),
  page({ variant: "zadost", title: "Objednat návštěvu — VITAE", current: "zadost.html", main: booking(), bodyClass: "page-booking" })
);
write(
  join("zadost", "dotaznik.html"),
  page({
    variant: "zadost",
    title: "Přednávštěvní dotazník — VITAE",
    current: "zadost.html",
    main: quiz(),
    scripts: QUIZ_JS,
  })
);
write(
  join("zadost", "po-zakroku", "index.html"),
  page({
    variant: "zadost",
    title: "Po zákroku — VITAE",
    current: "po-zakroku/index.html",
    main: aftercare(),
    bodyClass: "page-aftercare",
  })
);
for (const [file, def] of Object.entries(AFTER_PAGES)) {
  write(
    join("zadost", "po-zakroku", file),
    page({
      variant: "zadost",
      title: `${def.title} — VITAE`,
      current: "po-zakroku/index.html",
      main: aftercareDoc(def),
      bodyClass: def.bodyClass || "",
    })
  );
}

console.log("done");
