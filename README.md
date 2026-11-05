# Nandhini Narendra & Associates — React conversion

This is a React/Vite conversion of the supplied NNACAS screenshots and the current public site structure.

## Important change requested
The first/dummy Mocounta newsletter + footer block has been removed.
Only the second NNACAS newsletter/footer block is rendered.

The NNACAS footer keeps:
- "The Best Tax Consultant Company in Chennai"
- NNACAS services
- Quick Menu
- Chennai office/branch contact details
- Social icons
- Copyright/legal row

## Run
```bash
npm install
npm run dev
```

Build:
```bash
npm run build
```

## Analytics and deployment

No Google Analytics measurement ID is configured. When one is supplied, add the Google tag through the site metadata setup in `src/main.jsx` and document any consent requirements before enabling it. Do not collect form contents or other personal information in analytics.

For Hostinger Apache/LiteSpeed hosting, upload the **contents** of `dist/` (including `.htaccess`, `sitemap.xml`, and `robots.txt`) to the website document root, usually `public_html`, after backing up the current live files. The included `.htaccess` serves real assets directly and sends other paths to the React app. React Router's 404 screen is client rendered, so this SPA fallback returns `index.html` with HTTP 200 for unknown paths unless the host is separately configured to return an HTTP 404 status.

For Google Search Console, verify `nnacas.in` with the DNS TXT record Google provides, then submit `https://nnacas.in/sitemap.xml`. No verification token is included in this project.

## Notes
- Routing is implemented with React Router.
- Header Services and Calculator dropdowns are implemented.
- The newsletter and quote/query forms have client-side submit feedback only; no external mail/API endpoint was supplied.
- Existing site images are referenced from the NNACAS WordPress media URLs so the visual assets remain the same.
