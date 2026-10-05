import React, {useEffect, useRef, useState} from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import "./styles.css";

const IMG = {
  office: "https://nnacas.in/wp-content/uploads/2024/05/modern-glass-fronted-office-building-in-spring.jpg",
  tax: "https://nnacas.in/wp-content/uploads/2024/05/GettyImages-959142068-how-to-find-best-tax-preparer-near-1920x1080-1.jpg",
  business: "https://nnacas.in/wp-content/uploads/2024/05/business-advisory-services.jpg",
  risk: "https://nnacas.in/wp-content/uploads/2024/05/risk-advisory.jpg",
  attestation: "https://nnacas.in/wp-content/uploads/2024/05/document-attestation.jpg"
};

const services = [
  {
    name: "Attestation",
    url: "/document-attestation/",
    description: "Nandhini Narendra & Associates offers comprehensive attestation services to individuals and businesses."
  },
  {
    name: "Taxation, Regulatory & Compliance",
    url: "/expert-taxation-services/",
    description: "Our expert team provides expert guidance and support to ensure compliance with tax laws and regulations."
  },
  {
    name: "Financial & Business Advisory",
    url: "/financial-business-advisory-services/",
    description: "Nandhini Narendra & Associates offers comprehensive financial and business advisory services to individuals and organizations."
  },
  {
    name: "Risk Advisory",
    url: "/risk-advisory-solutions/",
    description: "Nandhini Narendra & Associates offers comprehensive risk advisory services to individuals and businesses."
  },
  {
    name: "Business Support",
    url: "/get-expert-business-help/",
    description: "Nandhini Narendra & Associates offers comprehensive risk advisory services to individuals and businesses."
  },
  {
    name: "Auditing",
    url: "/auditing/",
    description: "Nandhini Narendra & Associates offers empanelment services to individuals and businesses seeking to become registered"
  }
];

const calculators = [
  ["GST Calculator","https://www.zoho.com/in/books/free-gst-calculator/"],
  ["Tax Calculator","https://www.incometaxindia.gov.in/"],
  ["TDS Calculator","https://www.incometaxindia.gov.in/"],
  ["Calculate Net Profit","https://www.omnicalculator.com/finance/net-profit-margin"],
  ["Calculate Networth","https://investor.sebi.gov.in/calculators/Networth_Calculator.html"],
  ["EMI Calculator","https://emicalculator.net/"],
  ["Home Loan Calculator","https://emicalculator.net/home-loan-emi-calculator/"],
  ["Auto Loan Calculator","https://www.calculator.net/auto-loan-calculator.html"]
];

function Brand({ footer = false }) {
  return (
    <Link className={"brand " + (footer ? "brand-footer" : "")} to="/">
      <img loading={footer ? "lazy" : "eager"} decoding="async"
        src="/image/N-5.webp"
        alt="Nandhini Narendra & Associates"
        className="brand-logo"
      />
    </Link>
  );
}

function Header(){
  const [open,setOpen] = useState(null);
  const [mobile,setMobile] = useState(false);
  const close=()=>{setOpen(null);setMobile(false)};
  return <header className="site-header">
    <div className="nav-wrap">
      <Brand/>
      <button className="mobile-toggle" onClick={()=>setMobile(!mobile)} aria-label="Menu" aria-expanded={mobile}>☰</button>
     <nav className={mobile ? "nav open" : "nav"}>
  <NavLink to="/" onClick={() => { close(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Home</NavLink>

  <NavLink to="/about-us-tax-advisor-chennai/" onClick={close}>
    About Us
  </NavLink>

  <div
  className="nav-dd services-dropdown"
  onMouseEnter={() => setOpen("services")}
  onMouseLeave={() => setOpen(null)}
>
  <div className="nav-service-link">
    <NavLink
  to="/tax-services-for-individuals-businesses-in-chennai/"
  className={({ isActive }) => isActive ? "active" : ""}
  onClick={() => {
    setOpen(null);
    setMobile(false);
  }}
>
  Services
</NavLink>

    <button
      className={open === "services" ? "dropdown-active" : ""}
      onClick={(e) => {
        e.preventDefault();
        setOpen(open === "services" ? null : "services");
      }}
    >
      ⌄
    </button>
  </div>

  {open === "services" && (
  <div className="dropdown">
    {services.map((service) => (
      <NavLink
        key={service.url}
        to={service.url}
        onClick={close}
      >
        {service.name}
      </NavLink>
    ))}
  </div>
)}
</div>

  <div
  className="nav-dd calculator-dropdown"
  onMouseEnter={() => setOpen("calc")}
  onMouseLeave={() => setOpen(null)}
>
  <button
    className={open === "calc" ? "dropdown-active" : ""}
    onClick={(e) => {
      e.preventDefault();
      setOpen(open === "calc" ? null : "calc");
    }}
  >
    Calculator <span>⌄</span>
  </button>

  {open === "calc" && (
    <div className="dropdown calc">
      {calculators.map(([name, url]) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {name}
        </a>
      ))}
    </div>
  )}
</div>

  <NavLink to="/careers/" onClick={close}>Careers</NavLink>

  <NavLink to="/contact-us-now/" onClick={close}>
    Contact Us
  </NavLink>
</nav>
      <Link className="consult" to="/contact-us-now/">CONSULT NOW</Link>
    </div>
  </header>
}

function Hero({title,subtitle,className=""}){
  return <section className={`page-hero ${className}`}>
    <div className="hero-overlay"/>
    <div className="hero-content">
      <h1>{title}</h1>
      {subtitle && <h4>{subtitle}</h4>}
    </div>
  </section>
}

const FORM_SUBMIT_EMAIL = "connect@nnacas.com";

async function submitFormSubmit(event, subject, setStatus){
  const form = event.currentTarget;
  const submitButtons = [...form.querySelectorAll('button[type="submit"], button:not([type])')];
  const selectedFiles = [...form.elements]
    .filter(field => field.type === "file")
    .flatMap(field => [...(field.files || [])]);

  // FormSubmit handles attachments through a native multipart form POST.
  if (selectedFiles.length) {
    const totalFileSize = selectedFiles.reduce((total, file) => total + file.size, 0);
    if (totalFileSize > 10 * 1024 * 1024) {
      event.preventDefault();
      setStatus?.("error: attachments exceed FormSubmit’s 10 MB total upload limit.");
      return;
    }
    let captchaField = form.querySelector('input[name="_captcha"]');
    if (!captchaField) {
      captchaField = document.createElement("input");
      captchaField.type = "hidden";
      captchaField.name = "_captcha";
      form.appendChild(captchaField);
    }
    captchaField.value = "false";
    let returnField = form.querySelector('input[name="_next"]');
    if (!returnField) {
      returnField = document.createElement("input");
      returnField.type = "hidden";
      returnField.name = "_next";
      form.appendChild(returnField);
    }
    const returnUrl = new URL(window.location.href);
    returnUrl.searchParams.set("application", subject.includes("Articleship") ? "articleship" : "professionals");
    returnField.value = returnUrl.toString();
    submitButtons.forEach(button => { button.disabled = true; });
    setStatus?.("sending");
    return;
  }

  event.preventDefault();
  const data = new FormData(form);
  [...form.elements]
    .filter(field => field.type === "file")
    .forEach(field => data.delete(field.name));
  [...form.elements].forEach((field, index) => {
    if (["submit", "button", "reset"].includes(field.type)) return;
    const label = field.closest("label")?.childNodes[0]?.textContent?.trim();
    const fieldLabel = field.placeholder || label || `Field ${index + 1}`;
    const fieldName = fieldLabel.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    if (!field.name && field.type !== "file" && field.value) {
      data.append(fieldName, field.value);
    }
  });
  data.set("_subject", subject);
  data.set("_template", "table");
  data.set("_captcha", "false");
  submitButtons.forEach(button => { button.disabled = true; });
  setStatus?.("sending");
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${FORM_SUBMIT_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(data.entries()))
    });
    const result = await response.json();
    if (!response.ok || result.success === false || result.success === "false") {
      const message = result.message || response.statusText || "Submission failed";
      console.error("FormSubmit submission failed:", message);
      setStatus?.(`error: ${message}`);
      return;
    }
    setStatus?.("success");
    form.reset();
  } catch (error) {
    console.error("FormSubmit request failed:", error);
    setStatus?.(`error: ${error.message || "Network error. Check your connection and try again."}`);
  } finally {
    submitButtons.forEach(button => { button.disabled = false; });
  }
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    submitFormSubmit(e, "Newsletter signup", setSent);
  };

  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <div className="newsletter-text">
          <h3>
            Signup our newsletter to get update information,
            <br />
            news, insight or promotions.
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">SIGN UP</button>

          {sent && (
            <small className="form-success">
              {sent === "success" ? "Thanks for subscribing!" : sent.startsWith("error:") ? `Could not submit: ${sent.slice(7)}` : "Sending…"}
            </small>
          )}
        </form>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main container">

        {/* Logo + Description */}
        <div className="footer-brand">
          <Brand footer />

          <p>
            The Best Tax Consultant Company in Chennai
          </p>
        </div>

        {/* Services */}
        <div className="footer-column">
          <h4>Services</h4>

          {services.map((service) => (
  <Link key={service.url} to={service.url}>
    {service.name}
  </Link>
))}
        </div>

        {/* Quick Menu */}
        <div className="footer-column">
          <h4>Quick Menu</h4>

          <Link to="/">Home</Link>

          <Link to="/about-us-tax-advisor-chennai/">
            About Us
          </Link>

          <Link to="/tax-services-for-individuals-businesses-in-chennai/">
            Services
          </Link>

          <Link to="/careers/">
            Careers
          </Link>

          <Link to="/contact-us-now/">
            Contact Us
          </Link>
        </div>

        {/* Contact */}
        <div className="contact-col">
          <h4>Contact Details</h4>

          <p>
            <span>📍</span>
            Head Office: 4/87, S Mada St, Tirumalai Avenue,
            Rajakadai, Tiruvottiyur, Chennai, Tamil Nadu 600019
          </p>

          <p>
            <span>📍</span>
            Branch Office: 2.C, Jai Durga flats,
            Old No. 38/2, New No. 60, Jawaharlal Nehru Road
            (100 feet Road), Ashok Nagar, Chennai - 600083
          </p>

          <p>
            <span>✉</span>
            connect@nnacas.com
          </p>

          <div className="social">
            <span>f</span>
            <span>◎</span>
            <span>𝕏</span>
            <span>▶</span>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="copyright">
        Copyrights © 2026 Nandhini Narendra &amp; Associates
        All rights Reserved. Developed By <Link to="https://sagegfx.com/">Sage GFX Digital Solutions</Link>
      </div>

      <div className="legal">
        <Link to="/privacy-policy/">Privacy Policy</Link>
      </div>

    </footer>
  );
}
function PrivacyPolicy(){
  return <Layout><main className="container page-content privacy-policy">
    <h1>Who we are</h1><p>Our website address is: http://nnacas.in.</p>
    <h2>Comments</h2><p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.</p>
    <p>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available at https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p>
    <h2>Media</h2><p>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p>
    <h2>Cookies</h2><p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p>
    <p>If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p>
    <p>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p>
    <p>If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p>
    <h2>Embedded content from other websites</h2><p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>
    <p>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction if you have an account and are logged in to that website.</p>
    <h2>Who we share your data with</h2><p>If you request a password reset, your IP address will be included in the reset email.</p>
    <h2>How long we retain your data</h2><p>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p>
    <p>For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p>
    <h2>What rights you have over your data</h2><p>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p>
    <h2>Where your data is sent</h2><p>Visitor comments may be checked through an automated spam detection service.</p>
  </main></Layout>
}
function WhatsApp(){
  return <a className="whatsapp" href="https://wa.me/919551173873" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.55 0 .21 5.34.21 11.9c0 2.1.55 4.14 1.59 5.95L.1 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.9-11.9a11.82 11.82 0 0 0-3.48-8.42ZM12.1 21.77h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.25-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.34Z"/></svg>
  </a>
}
function Layout({children}) {
  return <><Header/>{children}<Newsletter/><Footer/><WhatsApp/></>
}

function AnimatedProgress({label,delay=0}){
  const itemRef=useRef(null);
  const [value,setValue]=useState(0);
  useEffect(()=>{
    const item=itemRef.current;
    if(!item) return;
    let frame=0;
    let timer=0;
    let observer;
    const animate=()=>{
      if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){setValue(100);return;}
      const start=performance.now();
      const duration=1100;
      const tick=(now)=>{
        const progress=Math.min((now-start)/duration,1);
        setValue(Math.round(progress*100));
        if(progress<1) frame=requestAnimationFrame(tick);
      };
      timer=window.setTimeout(()=>{frame=requestAnimationFrame(tick);},delay);
    };
    if(!("IntersectionObserver" in window)){animate();return;}
    observer=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting) return;
      animate();
      observer.disconnect();
    },{threshold:.35});
    observer.observe(item);
    return ()=>{observer?.disconnect();window.clearTimeout(timer);cancelAnimationFrame(frame);};
  },[delay]);
  return <div className="progress-item" ref={itemRef}>
    <div><span>{label}</span><b aria-label={`${value} percent`}>{value}%</b></div>
    <div className="progress-track"><i style={{width:`${value}%`}}/></div>
  </div>;
}

function QuoteForm({company=false,compact=false}){
  const [done,setDone]=useState("");
  return <div className="quote-card">
    <h3>Get Free a Quote</h3>
    <form onSubmit={e=>submitFormSubmit(e, company ? "Business consultation request" : "Service consultation request", setDone)}>
      <label>NAME</label><input required placeholder="Name"/>
      {company && <><label>COMPANY</label><input placeholder="Company"/></>}
      {!compact && <><label>MOBILE NUMBER</label><input placeholder="Mobile Number"/> </>}
      <label>EMAIL</label><input type="email" placeholder="Email"/>
      <label>MESSAGE</label><textarea placeholder="Message"/>
      <button>SEND</button>
      {done && <small className="form-success">{done === "success" ? "Thanks! Your message has been sent." : done.startsWith("error:") ? `Could not submit: ${done.slice(7)}` : "Sending…"}</small>}
    </form>
  </div>
}

function ContentPage({title,subtitle,intro,items,image="/image/income-tax-consultancy-service.webp",afterTitle,afterText,secondImage}){
  return <Layout>
    <Hero title={title} subtitle={subtitle}/>
    <main className="container page-content service-detail-page">
      <div className="service-detail-layout">
        <article className="service-detail-copy">
          <p className="intro">{intro}</p>
          {items && <ol className="numbered">{items.map((x,i)=><li key={i}>{x}</li>)}</ol>}
          {afterTitle && <><h2>{afterTitle}</h2><p>{afterText}</p></>}
        </article>
        <aside className="service-detail-aside"><img loading="lazy" decoding="async" className="service-detail-image" src={image} alt=""/><QuoteForm/></aside>
      </div>
      {secondImage && <img loading="lazy" decoding="async" className="content-image second" src={secondImage} alt=""/>}
    </main>
  </Layout>
}

const taxItems = [
"Tax Planning and Advisory: Strategic tax planning services to minimize tax liabilities and maximize savings for individuals and businesses.",
"Corporate Tax Compliance: Assistance with corporate tax compliance, including preparation and filing of tax returns, ensuring adherence to tax laws and regulations.",
"GST Compliance: Guidance and support for Goods and Services Tax (GST) compliance, including registration, return filing, and compliance reviews.",
"Regulatory Compliance: Assistance with regulatory compliance across various sectors, ensuring adherence to industry-specific laws and regulations.",
"Legal Compliance: Support for legal compliance requirements, including company law compliance, labor law compliance, and other statutory obligations.",
"Risk Assessment and Management: Identification and assessment of risks related to taxation and regulatory compliance, with strategies to mitigate risks and ensure business continuity.",
"Tax Audits and Representation: Representation before tax authorities and assistance with tax audits to ensure fair treatment and resolution of tax disputes.",
"International Taxation: Expertise in international tax laws and regulations to support businesses operating globally, including cross-border transactions and transfer pricing.",
"Compliance Reviews and Due Diligence: Comprehensive reviews and due diligence services to assess compliance with tax and regulatory requirements.",
"Training and Awareness Programs: Customized training programs and awareness sessions on taxation, regulatory compliance, and legal requirements."
];

const advisoryItems = [
"Investment Structure: Strategic guidance and structuring of investments to maximize returns, minimize risks, and achieve long-term financial goals.",
"HUF Settlement/Reorganization: Expert assistance in settling or reorganizing Hindu Undivided Family (HUF) assets and interests to ensure efficient management and succession planning.",
"Restructuring: Tailored solutions for business restructuring, including debt restructuring, operational restructuring, and organizational restructuring to enhance efficiency and profitability.",
"Transaction Advisory: Comprehensive advisory services for mergers, acquisitions, and strategic transactions, including due diligence, valuation, negotiation, and deal structuring.",
"Business Valuation: Independent valuation services to determine the fair value of businesses, assets, and investments for various purposes.",
"M&A Advisory: Expert guidance and support for mergers and acquisitions, including target identification, valuation, transaction structuring, and post-merger integration.",
"Insolvency and Bankruptcy: Advisory services for distressed businesses facing insolvency or bankruptcy, including turnaround strategies and restructuring options.",
"Due Diligence: Comprehensive due diligence services covering financial, legal, and operational aspects of transactions and investments."
];

const riskItems = [
"Internal Audit: Independent and objective assessments of internal controls, processes, and operations to identify areas for improvement and enhance organizational effectiveness.",
"ICFR Documentation: Documentation and evaluation of Internal Controls over Financial Reporting (ICFR) to ensure compliance with regulatory requirements and mitigate financial reporting risks.",
"IT Implementation Review: Review and assessment of Information Technology implementation projects to ensure alignment with business objectives and minimize risks.",
"Process Improvement: Identification of inefficiencies and bottlenecks in business processes, along with recommendations for process redesign and improvement.",
"Standard Operating Procedure Documentation: Development and documentation of Standard Operating Procedures (SOPs) to streamline operations and promote compliance.",
"Data Analytics: Utilization of data analytics techniques to analyze large volumes of data, identify patterns, trends, and anomalies, and derive actionable insights.",
"IT Audit: Comprehensive assessments of IT systems, controls, and processes to evaluate effectiveness, security, and compliance."
];

const attestationItems = [
"Statutory Audit: Comprehensive audit services to ensure compliance with statutory requirements and financial reporting standards.",
"Limited Review: In-depth review of financial statements to provide assurance on their accuracy and reliability.",
"Certification: Issuance of certificates to verify specific financial or non-financial information as per regulatory requirements.",
"Inventory and Receivables Audit: Detailed examination of inventory and receivables to assess accuracy and valuation.",
"Concurrent Audit: Real-time audit services conducted simultaneously with ongoing operations to identify potential risks and irregularities.",
"Special Audits: Specialized audits of IT systems, CBI investigations, and other statutory bodies.",
"GAAP Conversion: Conversion of financial statements from one set of accounting standards to another, such as Indian GAAP to Ind AS or IFRS.",
"GST Audits: Thorough examination of GST records and transactions to ensure compliance with GST laws and regulations.",
"Income Tax Audits: Comprehensive review of income tax records and filings to verify accuracy and compliance.",
"Transfer Pricing Certification: Assessment and certification of transfer pricing policies and transactions."
];

function Home(){
  return <Layout>
    <section className="home-hero" style={{backgroundImage:`url(${"/image/multiethnic-business-people-working-together-in-the-office-updraft-pre-smush-original.webp"})`}}>
      <div className="home-overlay"/>
      <div className="container home-copy">
        <h1>Welcome to Nandhini Narendra &amp; Associates, your Trusted tax consultant Partner in Chennai</h1>
        <p>As a leading tax consultant firm in Chennai, Nandhini Narendra &amp; Associates understands the intricacies of tax regulations and the value of strategic financial planning. We are committed to providing our clients with comprehensive solutions that are customized to their specific needs.</p>
        <Link className="btn" to="/contact-us-now/">CONSULT NOW</Link>
      </div>
    </section>
    <section className="home-service-ribbon" aria-label="Our featured services">
      <article>
        <span className="ribbon-icon" aria-hidden="true"><svg viewBox="0 0 40 40"><rect x="5" y="3" width="30" height="34" rx="1"/><path d="M10 8h20v7H10zM11 21h4m-4 7h4m6-7h4m-4 7h4m6-7h1m-1 7h1M10 19h20v14H10z"/></svg></span>
        <h2>Corporate Tax Planning</h2>
      </article>
      <article>
        <span className="ribbon-icon" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M4 35h33M8 33V23h6v10m5 0V17h6v16m5 0V10h6v23M5 17l9-7 7 3 11-9m-5 0h5v5"/></svg></span>
        <h2>Tax Audits and<br />Representation</h2>
      </article>
      <article>
        <span className="ribbon-icon" aria-hidden="true"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15"/><circle cx="20" cy="15" r="4"/><path d="M12 29c1-6 15-6 16 0m-8-24v3m0 24v3M5 20h3m24 0h3M8.5 8.5l2 2m19 19 2 2m0-23-2 2m-19 19-2 2"/></svg></span>
        <h2>Financial Advisory<br />Services</h2>
      </article>
    </section>
    <main className="container home-body">
   <section className="who-we-are">

  <div className="who-content">

    <h5>WHO WE ARE</h5>

    <h2>
      Empowered Finances: Your Trusted Tax Consultant
    </h2>

    <p>
      Nandhini Narendra &amp; Associates is a premier tax consultation
      firm located in the vibrant city of Chennai. Established with a
      passion for excellence and a commitment to client success, we
      specialize in providing expert tax advisory services tailored to
      meet the unique needs of individuals and businesses alike.
    </p>

    <div className="who-feature">

      <div className="who-icon">
        <span>✦</span>
      </div>

      <div>
        <h3>Empowering Financial Success</h3>

        <p>
          Nandhini Narendra &amp; Associates, our mission is to empower
          individuals and businesses with the knowledge and resources
          they need to achieve financial success.
        </p>
      </div>

    </div>


    <div className="who-feature">

      <div className="who-icon">
        <span>✦</span>
      </div>

      <div>
        <h3>Experienced Team</h3>

        <p>
          Our team consists of seasoned tax professionals with extensive
          experience and expertise in tax planning, compliance, and
          advisory services.
        </p>
      </div>

    </div>

  </div>


  <div className="who-image">

    <img loading="lazy" decoding="async"
      src="/image/income-tax-consultancy-service.webp"
      alt="A team reviewing tax and financial documents"
    />

    <div className="who-experience-badge" aria-label="More than 5 years of experience">
      <strong>5+</strong>
      <span>Years of Experience</span>
    </div>

  </div>

</section>
      <center><h4>OUR SERVICES</h4><h2>Unlocking Your Financial Potential: Explore Our Tailored Tax Solutions Today</h2></center>
       <div className="service-grid">
  {services.map((service, i) => (
    <Link
      className="service-card"
      key={service.url}
      to={service.url}
    >
      <img loading="lazy" decoding="async"
        src={[
          "/image/GettyImages-Attestation-service.webp",
          "/image/business-tax-service.webp",
          "/image/woman-FINANCIAL -services.webp",
          "/image/risk-services.webp",
          "/image/businesswoman-services.webp",
          "/image/empanelment-services.webp"
        ][i]}
        alt={service.name}
      />

      <div>
        <h3>{service.name}</h3>

        <p>{service.description}</p>

        <span>READ MORE</span>
      </div>
    </Link>
  ))}
</div>
    </main>
    <section className="why-choose container">
      <div className="why-heading"><h5>WHY CHOOSE US</h5><h2>Choose Nandhini Narendra &amp; Associates for Expertise You Can Trust</h2></div>
      <div className="why-showcase">
        <div className="why-feature-grid">
          <article><span>✓</span><div><h3>Expertise and Experience</h3><p>Our team comprises seasoned tax professionals.</p></div></article>
          <article><span>✓</span><div><h3>Personalized Service</h3><p>We take a personalized approach to every client, taking the time to understand your needs.</p></div></article>
          <article><span>✓</span><div><h3>Integrity and Trust</h3><p>Integrity is at the core of everything we do. You can trust us to provide honest advice.</p></div></article>
          <article><span>✓</span><div><h3>Client-Centric Focus</h3><p>Our clients come first. We are dedicated to providing exceptional service and support.</p></div></article>
        </div>
        <div className="why-image"><img loading="lazy" decoding="async" src="/image/pngegg-updraft-pre-smush-original.webp" alt="Tax and accounting consultation" /></div>
      </div>
      <div className="why-consult">
        <div className="why-photo-grid"><img loading="lazy" decoding="async" src="/image/income-tax-consultancy-service.webp" alt="Tax consultation"/><img loading="lazy" decoding="async" src="/image/woman-FINANCIAL -services.webp" alt="Financial advisory"/></div>
        <div className="why-copy"><h2>Personalized Tax Consultations</h2><p>Our tax experts provide personalized consultations to individuals seeking guidance on optimizing their tax liabilities, maximizing deductions and planning for future tax obligations.</p>
          {["Tax Consultations", "Budget Management", "Analytic Finance"].map((x,index)=><AnimatedProgress label={x} delay={index*160} key={x}/>)}
        </div>
      </div>
    </section>
    <section className="home-cta"><div className="container"><div><h2>Get Started Together</h2><p>Ready to take control of your financial future? Let’s get started together. At Nandhini Narendra &amp; Associates, we’re committed to helping you achieve your goals and navigate the complexities of taxation and financial planning with confidence.</p><Link className="btn" to="/contact-us-now/">GET STARTED</Link></div></div></section>
  </Layout>
}

function About(){
  return <Layout><Hero title="About Us" subtitle="Your Trusted Tax Advisor in Chennai: Nandhini Narendra & Associates"/>
    <main className="container page-content about">
      <section className="about-intro">
        <img loading="lazy" decoding="async" className="about-feature-image" src="/image/income-tax-consultancy-service.webp" alt="Accountants reviewing financial documents"/>
        <div><h5>ABOUT US</h5><h2>Take Control of Your Taxes: Get Expert Help from a Trusted Tax Advisor in Chennai</h2>
          <p>Nandhini Narendra &amp; Associates is your trusted tax advisor, offering expert guidance to individuals and businesses in Chennai and beyond. Our team of seasoned professionals provides personalized tax solutions tailored to your unique needs. We are committed to excellence, integrity, and client satisfaction, making us the preferred choice for all your tax and financial advisory needs.</p></div>
      </section>
      <div className="values"><div><b>◎</b><h3>Our Vision</h3><p>At Nandhini Narendra &amp; Associates, our vision is to be the leading provider of innovative and strategic tax solutions in Chennai and beyond.</p></div><div><b>◎</b><h3>Our Mission</h3><p>Our mission is to provide exceptional tax consultation services that empower individuals and businesses to achieve their financial goals.</p></div><div><b>♙</b><h3>Our Culture</h3><p>Our culture is built on a foundation of integrity, collaboration, and excellence.</p></div></div>
      <section className="about-team-heading"><h5>MEET OUR TEAM</h5><h2>Awesome people behind us.</h2></section>
      <div className="team">
        <article className="team-member narendra"><div className="portrait"><img loading="lazy" decoding="async" src="/image/founder.webp" alt="Narendra"/><div className="team-hover"><strong>Narendra</strong><span>Founder</span></div></div><h3>Narendra</h3><p>He is an Associate Chartered Accountant with experience in Finance, Taxation and Accounting of mid-sized corporates. His core areas include indirect taxation advisory, statutory audits, due diligence, financial reporting, project financing and international taxation.</p></article>
        <article className="team-member nandhini"><div className="portrait woman"><img loading="lazy" decoding="async" src="/image/co founder.webp" alt="Nandhini"/><div className="team-hover"><strong>Nandhini</strong><span>Co-Founder</span></div></div><h3>Nandhini</h3><p>She is an Associate Chartered Accountant with experience in bank audits, direct taxation advisory, statutory audits, NGO setup and taxation, startup advisory, internal and management audit, and project financing.</p></article>
      </div>
    </main>
    <section className="about-cta"><div className="container"><h2>Unlocking Excellence: Experience Chennai's Premier Tax Consultation Service Today!</h2><Link className="btn" to="/contact-us-now/">CONSULT NOW</Link></div></section>
  </Layout>
}

function ScrollToTop(){
  const { pathname } = useLocation();
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    const pageTitles = {
      "/": "Need a tax consultant in Chennai? We've Got You Covered",
      "/about-us-tax-advisor-chennai/": "Don't Wait! Reduce Your Tax Burden Now: Chennai Tax Advisor",
      "/careers/": "Taxation Jobs : Don't Just Do Taxes, Make a Difference",
      "/contact-us-now/": "Ready to Discuss Your Needs? Contact Us Now!",
      "/tax-services-for-individuals-businesses-in-chennai/": "Top-Rated Tax Services for Individuals & Businesses in Chennai",
      "/document-attestation/": "Document Attestation Made Easy At Nandhini Narendra Associates",
      "/expert-taxation-services/": "Expert taxation services from Nandhini Narendra & Associates.",
      "/financial-business-advisory-services/": "Expert Business Advisory Services for Growth & Success",
      "/risk-advisory-solutions/": "Proactive Risk Advisory Solutions : Don't Wait Until It's Too Late",
      "/get-expert-business-help/": "Get expert business help to boost efficiency and reduce costs.",
      "/auditing/": "Auditing - nnacas.in",
      "/privacy-policy/": "Privacy Policy - nnacas.in"
    };
    document.title = pageTitles[pathname] || "Nandhini Narendra & Associates";
  }, [pathname]);
  return null;
}

function RevealOnScroll(){
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const elements = document.querySelectorAll(
      ".page-hero, .home-hero, .home-service-ribbon article, main > section, main > .container > section, .service-card, .why-feature-grid article, .team-member, .contact-detail, .values > div, .career-forms form, .quote-card"
    );
    if (!elements.length) return;

    document.documentElement.classList.add("motion-enabled");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

    elements.forEach((element, index) => {
      element.style.setProperty("--motion-delay", `${(index % 4) * 70}ms`);
      element.classList.add("motion-reveal");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);
  return null;
}

function Query(){
  const [sent,setSent]=useState("");
  return <Layout><Hero title="Query"/>
    <main className="container query-card">
      <form onSubmit={e=>submitFormSubmit(e, "Website query", setSent)}>
        {["Name","Designation","Organization","Office Address","City","Email","Telephone Number","Mobile Number"].map(x=><input key={x} placeholder={x}/>)}
        <label>OTHER PROFESSIONAL UPDATES</label><div className="radio">○ YES &nbsp;&nbsp; ○ No</div>
        <label>SUBJECT OF QUERY</label><select><option>Please Select</option></select>
        <label>QUERY</label><textarea/>
        <button>SEND MESSAGE</button>{sent&&<p className="form-success">{sent === "success" ? "Thanks! Your message has been sent." : sent.startsWith("error:") ? `Could not submit: ${sent.slice(7)}` : "Sending…"}</p>}
      </form>
    </main>
  </Layout>
}

function Careers(){
  const [status,setStatus]=useState({});
  const location=useLocation();
  useEffect(()=>{
    const application=new URLSearchParams(location.search).get("application");
    if(application==="articleship" || application==="professionals"){
      setStatus(current=>({...current,[application]:"success"}));
    }
  },[location.search]);
  return <Layout><Hero title="Careers" subtitle="Launch Your Career with Nandhini Narendra & Associates" className="careers-hero"/>
    <main className="careers-page">
      <section className="container career-intro">
        <div><h2>Join Our Team</h2><p>Are you passionate about taxation and looking for a career that challenges you and makes a difference? Look no further than Nandhini Narendra &amp; Associates. We believe our team is the key to our success, which is why we’re dedicated to creating a work environment that’s both dynamic and inclusive.</p><p>In our exciting taxation jobs, you’ll be surrounded by talented colleagues who share your passion for tax. We empower every team member to grow, innovate, and contribute their unique skills. Whether you’re an experienced tax professional or just starting out, we offer a variety of taxation jobs that allow you to develop your expertise and build a fulfilling career.</p><b>Any Query? Write Here</b></div>
        <img loading="lazy" decoding="async" src="/image/two-young-business-people-working-together-in-office-financial-analysis-accounting-concept--updraft-pre-smush-original.webp" alt="Colleagues working together"/>
      </section>
      <section className="career-apply"><div className="container"><h2>WANT TO JOIN THE TEAM?</h2><div className="career-forms">
        <form action={`https://formsubmit.co/${FORM_SUBMIT_EMAIL}`} method="POST" encType="multipart/form-data" onSubmit={e=>submitFormSubmit(e, "Articleship application", value=>setStatus(s=>({...s, articleship:value})))}><input type="hidden" name="_subject" value="Articleship application"/><input type="hidden" name="_template" value="table"/><h3>Articleship</h3><div className="career-fields"><input name="name" placeholder="Name" required/><input name="last_name" placeholder="Last Name" required/><input name="phone" placeholder="Phone"/><input name="email" type="email" placeholder="Email" required/><select name="qualification" defaultValue=""><option value="" disabled>Select CA Inter</option><option>CA Inter-1st Group</option><option>CA Inter-2st Group</option><option>CA Inter-Both Group</option></select></div><label>MESSAGE</label><input name="resume" type="file"/><button>SUBMIT NOW</button>{status.articleship&&<small className="form-success">{status.articleship === "success" ? "Application sent." : status.articleship.startsWith("error:") ? status.articleship.slice(7) : "Sending…"}</small>}</form>
        <form action={`https://formsubmit.co/${FORM_SUBMIT_EMAIL}`} method="POST" encType="multipart/form-data" onSubmit={e=>submitFormSubmit(e, "Professional career application", value=>setStatus(s=>({...s, professionals:value})))}><input type="hidden" name="_subject" value="Professional career application"/><input type="hidden" name="_template" value="table"/><h3>Professionals</h3><div className="career-fields"><input name="name" placeholder="Name" required/><input name="last_name" placeholder="Last Name" required/><input name="phone" placeholder="Phone"/><input name="email" type="email" placeholder="Email" required/><input name="position" placeholder="Position"/><input name="qualification" placeholder="Qualification"/><select name="area_of_interest" defaultValue=""><option value="" disabled>Area of Interest</option><option>Domestic Taxation</option><option>Audit and Assurance</option><option>International Taxiation</option><option>Good and Service Tax</option><option>Corporate Advisory</option><option>FEMA and Other Regulatory Matters</option></select></div><label>MESSAGE</label><input name="resume" type="file"/><button>SUBMIT NOW</button>{status.professionals&&<small className="form-success">{status.professionals === "success" ? "Application sent." : status.professionals.startsWith("error:") ? status.professionals.slice(7) : "Sending…"}</small>}</form>
      </div></div></section>
    </main>
  </Layout>
}

function Contact(){
  const [done,setDone] = useState("");
  const [mapLocation,setMapLocation] = useState("4/87 S Mada St, Tiruvottiyur, Chennai, Tamil Nadu 600019");
  const goToMapLocation = (location) => {
    setMapLocation(location);
    requestAnimationFrame(() => document.getElementById("contact-map")?.scrollIntoView({behavior:"smooth",block:"center"}));
  };
  return <Layout><Hero title="Connect With Us" subtitle="Get in touch and let us know how we can help."/>
    <main className="container contact-page">
      <section className="contact-form-section"><h2>Send us a message</h2><form className="contact-form" onSubmit={e=>submitFormSubmit(e, "Website contact message", setDone)}>
        <label>NAME<input required placeholder="Name"/></label><label>COMPANY<input placeholder="Company"/></label>
        <label>PHONE<input placeholder="Phone"/></label><label>EMAIL<input type="email" required placeholder="Email"/></label>
        <label className="contact-form-wide">SUBJECT<input placeholder="Subject"/></label><label className="contact-form-wide">MESSAGE<textarea placeholder="Message"/></label>
        <button>SEND MESSAGE</button>{done&&<small className="form-success">{done === "success" ? "Thanks! Your message has been sent." : done.startsWith("error:") ? `Could not submit: ${done.slice(7)}` : "Sending…"}</small>}
      </form></section>
      <section className="contact-overview">
        <div className="contact-details"><h2>Get in touch</h2>
          <div className="contact-detail"><span>●</span><p><b>Head Office</b><br/>4/87, S Mada St, Tirumalai Avenue, Rajakadai, Tiruvottiyur, Chennai, Tamil Nadu 600019</p></div>
          <div className="contact-detail"><span>●</span><p><b>Branch Office</b><br/>2.C, Jai Durga flats, Old No. 38/2, New No. 60, Jawaharlal Nehru Road (100 feet Road), Ashok Nagar, Chennai -600083</p></div>
          <div className="contact-detail"><span>✉</span><p><b>Email us</b><br/>connect@nnacas.com</p></div>
          <div className="contact-detail"><span>♧</span><p><b>Call us</b><br/>+91 9551173873, +91 74188 14777</p></div>
        </div>
        <img loading="lazy" decoding="async" className="contact-office-image" src="/image/modern-glass-fronted-office-building-in-spring-updraft-pre-smush-original.webp" alt="Nandhini Narendra & Associates office"/>
      </section>
      <section className="contact-media" aria-label="Find our office"><div className="map-panel"><h2>Find our office</h2><div className="map-location-actions"><button type="button" onClick={()=>goToMapLocation("4/87 S Mada St, Tiruvottiyur, Chennai, Tamil Nadu 600019")}>Head Office</button><button type="button" onClick={()=>goToMapLocation("2.C Jai Durga flats, 60 Jawaharlal Nehru Road, Ashok Nagar, Chennai 600083")}>Branch Office</button></div><iframe id="contact-map" title="Map to Nandhini Narendra and Associates" src={`https://maps.google.com/maps?q=${encodeURIComponent(mapLocation)}&t=&z=15&ie=UTF8&iwloc=&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div></section>
      <section className="contact-social"><h2>Follow our social media</h2><div className="social"><a href="https://facebook.com/" aria-label="Facebook">f</a><a href="https://instagram.com/" aria-label="Instagram">◎</a><a href="https://twitter.com/" aria-label="Twitter">♥</a><a href="https://youtube.com/" aria-label="YouTube">▶</a></div></section>
    </main>
  </Layout>
}

function Auditing(){
  return <Layout><Hero title="Professional Auditing Services in Chennai - Nandhini Narendra Associates" subtitle="AUDITING SERVICES"/>
    <main className="container page-content auditing-page">
      <section className="audit-intro audit-row">
        <div className="audit-copy">
          <p>At <strong>Nandhini Narendra Associates</strong>, located in the heart of Chennai, we pride ourselves on delivering top-notch auditing services tailored to meet the specific needs of our clients. Our commitment to accuracy, transparency, and integrity ensures that your financial operations are thoroughly examined, helping you maintain compliance and achieve your business goals.</p>
          <p>Our goal is to help you navigate the complexities of financial auditing with ease. Whether you require internal audits to improve your operations or statutory audits to meet regulatory requirements, our team is here to support you every step of the way. Contact us today to learn how we can assist with your auditing needs.</p>
          <ul className="checklist">{["Comprehensive Risk Assessment","Process Optimization","Compliance Verification","Fraud Prevention","Accurate Financial Reporting","Regulatory Adherence","Detailed Audit Reports","Ongoing Support"].map(x=><li key={x}>✓ {x}</li>)}</ul>
          <section className="audit-benefits"><ul>{[
            ["Ensures Financial Accuracy", "Auditing verifies the accuracy of financial statements, ensuring they reflect a true and fair view of the company’s financial health."],
            ["Regulatory Compliance", "Audits ensure that a business adheres to relevant laws, regulations, and industry standards, reducing the risk of legal issues."],
            ["Risk Management", "Through audits, potential risks and inefficiencies in business processes are identified, allowing for proactive measures to mitigate them."],
            ["Fraud Detection", "Regular audits help in detecting and preventing fraudulent activities within an organization, safeguarding assets and resources."],
            ["Enhances Stakeholder Confidence", "Transparent and thorough auditing builds trust among investors, creditors, and other stakeholders by providing assurance of financial integrity."],
            ["Improves Business Processes", "Auditing can reveal areas for improvement in internal controls, leading to more efficient and effective business operations."],
            ["Supports Strategic Decision-Making", "Audits provide valuable insights that help management make informed decisions for the future growth and stability of the business."]
          ].map(([title,description])=><li key={title}><strong>{title}:</strong> {description}</li>)}</ul></section>
        </div>
        <aside className="audit-aside"><img loading="lazy" decoding="async" src="/image/business-tax-service.webp" alt="Auditing and financial review"/><QuoteForm compact/></aside>
      </section>
      <section className="audit-row audit-section"><div><h5>INTERNAL AUDITS</h5><h2>Comprehensive Internal Audits for Enhanced Business Performance</h2><p>Nandhini Narendra Associates offers comprehensive internal audit services in Chennai, helping businesses streamline operations, reduce risks, and ensure compliance with regulations. Partner with us to enhance your company's performance and sustainability.</p></div><img loading="lazy" decoding="async" src="/image/business-tax-service.webp" alt="Internal audit and reporting"/></section>
      <section className="audit-row audit-section audit-reverse"><img loading="lazy" decoding="async" src="/image/risk-services.webp" alt="Financial audit work"/><div><h5>STATUTORY AUDITS</h5><h2>Expert Statutory Audits for Compliance and Transparency</h2><p>Our statutory audit services ensure your financial statements are accurate, transparent, and fully compliant with regulatory standards. Trust us to deliver thorough audits that enhance stakeholder confidence and support your business's legal and financial integrity.</p></div></section>
      <section className="audit-cta"><h2>Ready to enhance your financial integrity and ensure compliance with expert auditing services?</h2><p>Strong financial governance is the foundation of a thriving business.</p><Link className="btn" to="/contact-us-now/">GET STARTED</Link></section>
    </main>
  </Layout>
}
function ServicesPage() {
  const serviceImages = [
    "/image/GettyImages-Attestation-service.webp",
    "/image/business-tax-service.webp",
    "/image/woman-doing-accounting-updraft-pre-smush-original.webp",
    "/image/risk-services.webp",
    "/image/businesswoman-services.webp",
    "/image/empanelment-services.webp"
  ];

  return (
    <Layout>

      <Hero
        title="Services"
        subtitle="Accounting & Tax Services, That Work for You."
      />

      <main className="container services-page">

        {/* INTRO */}
        <section className="services-intro">

          <div className="services-intro-text">

            <h5>OUR SERVICES</h5>

            <p>
              Nandhini Narendra &amp; Associates offers comprehensive tax
              services to empower individuals and businesses. We provide
              personalized tax consultations, strategic corporate tax
              planning, and expert guidance on navigating GST compliance
              and international taxation.
            </p>

            <p>
              We begin by offering personalized consultations to understand
              your unique financial situation and goals. This allows us to
              tailor strategic tax planning strategies, whether you're an
              individual looking to maximize deductions or a business owner
              seeking to minimize your corporate tax burden.
            </p>

          </div>

          <div className="services-intro-image">
            <img loading="lazy" decoding="async" src={IMG.tax} alt="Tax services" />
          </div>

        </section>


        {/* SERVICES */}
        <section className="services-list">

          <div className="services-heading">

            <h5>OUR SERVICES</h5>

            <h2>
              Unlocking Your Financial Potential: Explore Our
              Tailored Tax Solutions Today
            </h2>

          </div>


          <div className="service-grid">

            {services.map((service, index) => (

              <Link
                className="service-card"
                key={service.url}
                to={service.url}
              >

                <img loading="lazy" decoding="async"
                  src={serviceImages[index]}
                  alt={service.name}
                />

                <div className="service-card-content">

                  <h3>{service.name}</h3>

                 <p>{service.description}</p>

                  <span>READ MORE</span>

                </div>

              </Link>

            ))}

          </div>

        </section>

      </main>

    </Layout>
  );
}

function App(){
  return <><ScrollToTop/><RevealOnScroll/><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about-us-tax-advisor-chennai/" element={<About/>}/>
    <Route
  path="/tax-services-for-individuals-businesses-in-chennai/"
  element={<ServicesPage />}
/>
    <Route path="/document-attestation/" element={<ContentPage title="Attestation Services" subtitle="Fast & Reliable Document Attestation Services for Individuals & Businesses" intro="In today’s globalized world, navigating the complexities of document attestation can feel overwhelming. Whether you’re an individual seeking educational opportunities abroad or a business venturing into international markets, ensuring your documents are properly attested is crucial." items={attestationItems} image="/image/GettyImages-Attestation-service.webp"/>}/>
    <Route path="/expert-taxation-services/" element={<ContentPage title="REGULATION, COMPLIANCE & TAXATION SERVICES" intro="When it comes to navigating the ever-changing world of taxation, Nandhini Narendra & Associates is your one-stop shop for comprehensive taxation services. We understand the complexities individuals and businesses face when dealing with tax regulations and legal requirements." items={taxItems} image="/image/business-tax-service.webp"/>}/>
    <Route path="/financial-business-advisory-services/" element={<ContentPage title="Financial & Business Advisory Services" intro="Nandhini Narendra & Associates is your trusted partner for comprehensive business advisory services. We empower individuals and organizations seeking strategic guidance and solutions to optimize their financial performance and achieve their business objectives." items={advisoryItems} image="/image/woman-doing-accounting-updraft-pre-smush-original.webp"/>}/>
    <Route path="/risk-advisory-solutions/" element={<ContentPage title="Risk Advisory" intro="Nandhini Narendra & Associates offers comprehensive risk advisory services to help individuals and businesses identify, assess, and mitigate risks across various aspects of their operations." items={riskItems} image="/image/risk-services.webp"/>}/>
    <Route path="/get-expert-business-help/" element={<ContentPage title="Business Help & Support" subtitle="Grow Your Business, Reduce Costs: Essential Business Help from Nandhini Narendra & Associates" intro="Welcome to Nandhini Narendra & Associates, your one-stop shop for comprehensive business help. We empower businesses to reach their full potential through customized support services tailored to your unique needs." items={taxItems} image="/image/businesswoman-services.webp"/>}/>
    <Route path="/auditing/" element={<Auditing/>}/>
    <Route path="/careers/" element={<Careers/>}/>
    <Route path="/contact-us-now/" element={<Contact/>}/>
    <Route path="/privacy-policy/" element={<PrivacyPolicy/>}/>
    <Route path="*" element={<Home/>}/>
  </Routes></>
}

createRoot(document.getElementById("root")).render(<BrowserRouter><App/></BrowserRouter>);
