# AVO Transportation — Website

Static website for **AVO Transportation LLC** (Denver / Aurora / Boulder / Front Range).
Pure HTML + CSS + JS — no framework, no build step. Deploys on **GitHub Pages**, with quote-form submissions landing in **your own Google Sheet** and **emailing you** automatically.

---

## Files

| File / folder | Purpose |
| --- | --- |
| `index.html` | Home |
| `services.html` | Services & service pricing |
| `pricing.html` | Comparison chart + price-beat guarantee + FAQ |
| `about.html` | About / Why Us / Service areas |
| `contact.html` | Contact info + quote form |
| `404.html` | Custom not-found page |
| `price-beat-policy.html` | One-page printable policy for customers + crew |
| `google-apps-script.gs` | The backend that captures leads → Sheet + email |
| `assets/` | Logo, symbol mark, and favicons |
| `robots.txt`, `sitemap.xml` | Search-engine basics |
| `.gitignore`, `.nojekyll` | Repo hygiene + GitHub Pages config |

---

## Launch checklist

### 1. Stand up your lead form (collects info → your Google Sheet → your email)

Your website form is a **Google-powered form**: when someone submits it, a short script running inside your own Google account writes the lead to a Google Sheet **and emails you a notification**. You get an organized spreadsheet *and* an inbox alert for every lead.

1. Open a new sheet at <https://sheets.new> → rename it **"AVO Leads"**.
2. **Extensions → Apps Script** → delete the placeholder → paste all of `google-apps-script.gs` → **Save**.
3. Confirm the notification email near the top of the script:
   ```js
   const NOTIFY_EMAIL = "avotransportationllc@gmail.com";
   ```
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**  ← required so the website can post to it
   - **Deploy**, authorize when prompted (the "unverified app" warning is normal for personal scripts → Advanced → Go to project → Allow).
5. **Copy the Web app URL** (ends in `/exec`).
6. In **every** `.html` file, replace the placeholder:
   ```js
   const AVO_FORM_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";
   ```
   with your `/exec` URL. (Find-and-replace across all files.)

> **Prefer a plain Google Form instead?** You can: create a Google Form, open **Responses → ⋮ → Get email notifications for new responses**, then either link to it from the "Get a Free Quote" buttons or embed it. The built-in branded form above is recommended because it keeps people on your site and still gives you the Sheet + email — but the option is yours.

Until the endpoint is set, the form safely falls back to opening the visitor's email app, so no lead is ever lost during setup.

### 2. Test it

Open `contact.html` locally or live, submit a test, and confirm (a) a row appears in your "AVO Leads" sheet and (b) an email arrives.

### 3. Deploy on GitHub Pages

After pushing (see **Pushing to GitHub** below): repo **Settings → Pages → Source: Deploy from a branch → `main` / root → Save.** Live in ~60 seconds at `https://dame-hub.github.io/AVOTRANSPORTATION/`.

---

## Pushing to GitHub (your repo)

Your repo: `https://github.com/dame-hub/AVOTRANSPORTATION.git`

From a terminal **inside this folder**:

```bash
git init
git add .
git commit -m "Launch AVO Transportation website"
git branch -M main
git remote add origin https://github.com/dame-hub/AVOTRANSPORTATION.git
git push -u origin main
```

If the repo already has commits and Git refuses the push, either start fresh (safe for a brand-new repo):

```bash
git push -u origin main --force
```

…or pull first and merge:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

GitHub will ask you to sign in — use a **Personal Access Token** as the password (GitHub no longer accepts your account password on the command line). Create one at **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate**, scope `repo`.

**Pre-push safety check** (takes 5 seconds): make sure you never staged a secrets file —
```bash
git status        # review the file list before committing
```
The included `.gitignore` already blocks `.env`, keys, and credential files.

---

## Is this safe? (Backend & "people seeing my code")

Short answer: **yes.** Here's exactly why.

- **There is no server to hack.** GitHub Pages only serves static files — there's no database, no PHP, no backend process on the host that someone could break into. The classic "backend" attack surface simply doesn't exist here.
- **Your code being visible is normal and harmless.** *Every* website's front-end (HTML/CSS/JS) is downloaded to the visitor's browser and can be viewed with "View Source" — that's true of every site on the internet, GitHub or not. What matters is that **there are no secrets in it**, and there aren't: no passwords, no API keys, no credentials anywhere in these files.
- **Your sensitive logic is NOT in the repo.** The part that touches your data — writing leads to your Sheet and emailing you — runs inside **Google Apps Script, in your own Google account**. That code is not in GitHub and nobody can read or run it.
- **The one public value (the Apps Script URL) is write-only.** Someone who finds it can only *submit* the form; they cannot read your Sheet, your email, or any past leads. Junk submissions are filtered by a hidden honeypot field and basic validation in the script.
- **No customer data is stored on the website.** Submissions pass straight through to your private Google Sheet.

If you ever want the source itself hidden too, GitHub Pages can serve from a **private repo** — but that requires a paid GitHub plan (Pro/Team). It is **not** necessary for security; it only hides the markup, which contains nothing sensitive.

---

## Optional: custom domain

1. Buy a domain (~$12/yr).
2. Add a file named `CNAME` (no extension) at the repo root with one line, e.g. `www.avotransportation.com`.
3. Point DNS at GitHub Pages: <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>.
4. **Settings → Pages**, set the domain, enable **Enforce HTTPS**.
5. Update `sitemap.xml` and `robots.txt` to the real domain.

---

## Editing tips

- **Prices** live in `services.html` *and* `pricing.html` — keep them in sync.
- **Menu** is the `<nav>` block at the top of each page.
- **Colors** are CSS variables at the top of each page's `<style>` (`--accent:#ff6b35;` etc.).
- **Logo** files are in `assets/` (`avo-symbol.png` = the mark, `avo-logo-full.png` = full lockup).

---

## Tech notes

- Fonts (Space Mono + Inter) and icons (Font Awesome 6) load from public CDNs; logo art is local in `assets/`.
- CSS scoped under `.avo`; vanilla JS, no dependencies.
- Responsive to ~360px; accessible (semantic HTML, keyboard-navigable modal, ARIA labels, reduced-motion support).
- Form spam protection: hidden honeypot + server-side validation.

---

© AVO Transportation LLC. All rights reserved.
