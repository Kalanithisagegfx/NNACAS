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

## Notes
- Routing is implemented with React Router.
- Header Services and Calculator dropdowns are implemented.
- The newsletter and quote/query forms have client-side submit feedback only; no external mail/API endpoint was supplied.
- Existing site images are referenced from the NNACAS WordPress media URLs so the visual assets remain the same.
