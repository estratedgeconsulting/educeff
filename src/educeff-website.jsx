import { useState, useEffect, useRef } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── SUPABASE CONFIG ─────────────────────────────────────────────────────────
// Replace these with your actual Supabase project URL and anon key
// Get them from: https://supabase.com → your project → Settings → API
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY_HERE";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const COLORS = {
  navy: "#64B5F6",
  navyLight: "#A8D4F5",
  gold: "#A8D4F5",
  goldLight: "#C8E4FA",
  teal: "#C8E4FA",
  tealLight: "#A8D4F5",
  cream: "#FAFCFF",
  white: "#FFFFFF",
  gray50: "#FFFFFF",
  gray100: "#F5FAFF",
  gray200: "#F5FAFF",
  gray400: "#F5FAFF",
  gray600: "#7C3AED",
  gray800: "#64B5F6",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#64B5F6",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sora:wght@400;500;600;700&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #FAFCFF; color: #7C3AED; }
  
  .font-display { font-family: 'Sora', sans-serif; }
  
  .btn-primary {
    background: #64B5F6;
    color: #FFFFFF;
    border: none;
    padding: 12px 28px;
    border-radius: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.01em;
  }
  .btn-primary:hover { background: #7C3AED; transform: translateY(-1px); }
  
  .btn-outline {
    background: rgba(255,255,255,0.15);
    color: #FFFFFF;
    border: 1.5px solid rgba(255,255,255,0.7);
    padding: 11px 28px;
    border-radius: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.01em;
  }
  .btn-outline:hover { background: rgba(255,255,255,0.25); border-color: white; }
  
  .btn-navy {
    background: #64B5F6;
    color: #FFFFFF;
    border: none;
    padding: 12px 28px;
    border-radius: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-navy:hover { background: #6D28D9; }
  
  .btn-teal {
    background: #A8D4F5;
    color: #FFFFFF;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-teal:hover { background: #7EC8F0; }

  .section { padding: 80px 0; background: #FFFFFF; }
  .section-alt { background: #F4F9FF; }
  .container { max-width: 1160px; margin: 0 auto; padding: 0 24px; }
  
  .tag {
    display: inline-block;
    background: transparent;
    color: #7C3AED;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 20px;
    margin-bottom: 16px;
    border: 1px solid #7C3AED;
  }

  input, select, textarea {
    width: 100%;
    padding: 11px 14px;
    border: 1.5px solid #C8E4FA;
    border-radius: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: #7C3AED;
    background: #FFFFFF;
    outline: none;
    transition: border-color 0.2s;
    margin-bottom: 14px;
  }
  input:focus, select:focus, textarea:focus { border-color: #7C3AED; }
  
  label { font-size: 13px; font-weight: 600; color: #6D28D9; display: block; margin-bottom: 5px; }

  .card {
    background: #FFFFFF;
    border-radius: 12px;
    border: 1px solid #C8E4FA;
    padding: 28px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }

  .nav-link {
    color: rgba(255,255,255,0.88);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s;
    padding: 4px 0;
  }
  .nav-link:hover { color: #FFFFFF; }
  .nav-link.active { color: #FFFFFF; font-weight: 700; border-bottom: 2px solid rgba(255,255,255,0.8); }
  
  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255,255,255,0.75);
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 2px;
  }
  .sidebar-link:hover { background: rgba(255,255,255,0.12); color: white; }
  .sidebar-link.active { background: rgba(255,255,255,0.2); color: white; font-weight: 700; border-left: 3px solid rgba(255,255,255,0.8); }

  .stat-card {
    background: #FFFFFF;
    border-radius: 12px;
    border: 1px solid #C8E4FA;
    padding: 20px 24px;
  }

  .badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
  }
  .badge-success { background: #ECFDF5; color: #065F46; }
  .badge-warning { background: #FFFBEB; color: #92400E; }
  .badge-danger { background: #FEF2F2; color: #991B1B; }
  .badge-info { background: #DDEEFF; color: #7C3AED; }
  .badge-gray { background: #DDEEFF; color: #6D28D9; }

  .upload-zone {
    border: 2px dashed #C8E4FA;
    border-radius: 10px;
    padding: 32px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: #FAFCFF;
  }
  .upload-zone:hover { border-color: #7C3AED; }

  .faq-item { border-bottom: 1px solid #C8E4FA; }
  .faq-q {
    padding: 18px 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: 15px;
  }
  .faq-a { padding: 0 0 18px; color: #6D28D9; font-size: 14px; line-height: 1.7; }

  .timeline-step {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    margin-bottom: 32px;
  }
  .timeline-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #64B5F6;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 16px;
    flex-shrink: 0;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }
  .modal {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 36px;
    width: 100%;
    max-width: 480px;
    position: relative;
    border: 1px solid #C8E4FA;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.4s ease forwards; }
  
  @keyframes countUp { from { opacity: 0; } to { opacity: 1; } }
  
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { background: #EEF5FF; color: #6D28D9; font-weight: 700; padding: 10px 14px; text-align: left; border-bottom: 1px solid #C8E4FA; }
  td { padding: 12px 14px; border-bottom: 1px solid #EEF5FF; color: #6D28D9; }

  /* ── MOBILE HAMBURGER ── */
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
  .hamburger span { width: 22px; height: 2px; background: white; border-radius: 2px; transition: all 0.3s; display: block; }
  .mobile-menu { display: none; }

  /* ── TABLET (max 1024px) ── */
  @media (max-width: 1024px) {
    .container { padding: 0 20px; }
    .section { padding: 60px 0; }
  }

  /* ── MOBILE & TABLET NAV (max 768px) ── */
  @media (max-width: 768px) {
    .hamburger { display: flex; }
    .desktop-nav { display: none !important; }
    .desktop-btns { display: none !important; }
    .mobile-menu {
      display: block;
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      background: #64B5F6;
      padding: 16px 20px;
      z-index: 99;
      border-top: 1px solid rgba(255,255,255,0.15);
    }
    .mobile-menu .nav-link {
      display: block;
      padding: 12px 0;
      font-size: 15px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .mobile-menu-btns {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 16px;
    }

    /* sections */
    .section { padding: 48px 0; }
    .container { padding: 0 16px; }

    /* grids → single column */
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr !important; }

    /* hero */
    .hero-title { font-size: 32px !important; }
    .hero-stats { flex-wrap: wrap; gap: 20px !important; }
    .hero-btns { flex-direction: column; align-items: flex-start; }

    /* cards */
    .card { padding: 20px !important; }

    /* headings */
    .section-title { font-size: 28px !important; }

    /* process steps → 2 columns on mobile */
    .process-grid { grid-template-columns: 1fr 1fr !important; }

    /* footer grid */
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }

    /* about page stat boxes */
    .about-stats { grid-template-columns: 1fr 1fr !important; }

    /* portal sidebar → bottom nav on mobile */
    .portal-sidebar { width: 100% !important; flex-direction: row !important; overflow-x: auto; padding: 8px 12px !important; min-height: auto !important; }
    .portal-sidebar .sidebar-link { flex-direction: column; font-size: 10px !important; gap: 3px !important; padding: 8px 10px !important; white-space: nowrap; min-width: 60px; justify-content: center; text-align: center; }
    .portal-sidebar .sidebar-user { display: none; }
    .portal-layout { flex-direction: column !important; }
    .portal-content { padding: 20px 16px !important; }

    /* stat cards grid */
    .stats-grid { grid-template-columns: 1fr 1fr !important; }

    /* modal */
    .modal { padding: 24px 18px !important; margin: 10px; }

    /* table → scroll */
    .table-wrap { overflow-x: auto; }
    table { min-width: 500px; }

    /* contact grid */
    .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }

    /* why us grid */
    .whyus-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .whyus-reasons { grid-template-columns: 1fr !important; }

    /* testimonials */
    .testimonials-grid { grid-template-columns: 1fr !important; }

    /* services grid */
    .services-grid { grid-template-columns: 1fr !important; }

    /* colleges grid */
    .colleges-grid { grid-template-columns: 1fr !important; }

    /* team grid */
    .team-grid { grid-template-columns: 1fr 1fr !important; }

    /* admin sidebar */
    .admin-layout { flex-direction: column !important; }
    .admin-sidebar { width: 100% !important; flex-direction: row !important; overflow-x: auto; padding: 8px !important; }
    .admin-sidebar .sidebar-link { flex-direction: column; font-size: 10px !important; gap: 2px !important; padding: 8px !important; min-width: 56px; text-align: center; justify-content: center; }
    .admin-content { padding: 16px !important; }

    /* doc upload grid */
    .doc-grid { grid-template-columns: 1fr !important; }

    /* profile grid */
    .profile-grid { grid-template-columns: 1fr !important; }
    .profile-form-grid { grid-template-columns: 1fr !important; }

    /* CTA section */
    .cta-btns { flex-direction: column; align-items: center; }

    /* booking form */
    .booking-form-grid { grid-template-columns: 1fr !important; }

    /* application form */
    .app-form-grid { grid-template-columns: 1fr !important; }
  }

  /* ── SMALL MOBILE (max 480px) ── */
  @media (max-width: 480px) {
    .hero-title { font-size: 26px !important; }
    .section-title { font-size: 24px !important; }
    .process-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; }
    .team-grid { grid-template-columns: 1fr !important; }
    .about-stats { grid-template-columns: 1fr 1fr !important; }
    .stats-grid { grid-template-columns: 1fr 1fr !important; }
  }
  tr:hover td { background: #FAFCFF; }
  
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #DDD6FE; border-radius: 3px; }
`;

// ─── DATA ───────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: "📋", title: "Exam Form Filling", desc: "Expert assistance with entrance exam registrations — JEE, NEET, MHT-CET, and more — ensuring accuracy and timely submission.", color: "#6D28D9" },
  { icon: "🎓", title: "Educational Counseling", desc: "Personalized academic guidance to help students identify the right stream, college, and course aligned with their strengths.", color: "#E1F5FE" },
  { icon: "🧭", title: "Career Counseling", desc: "Data-driven career mapping sessions with certified counselors to chart a clear professional path for your future.", color: "#E8F4FD" },
  { icon: "🏛️", title: "College Admission", desc: "End-to-end admission assistance from shortlisting colleges to application submission and counseling rounds.", color: "#EDE7F6" },
  { icon: "💰", title: "Scholarship Assistance", desc: "Identify and apply for government and private scholarships — merit, need-based, and category-specific opportunities.", color: "#E0F2F1" },
  { icon: "📄", title: "Document Verification", desc: "Professional verification and attestation of academic documents ensuring compliance with university and government requirements.", color: "#F3E5F5" },
];

const STATS = [
  { num: "12,400+", label: "Students Guided" },
  { num: "98%", label: "Admission Success Rate" },
  { num: "340+", label: "Partner Colleges" },
  { num: "8", label: "Years of Excellence" },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", college: "COEP, Pune", quote: "Educeff's counselors helped me choose the right engineering branch. The entire process from form filling to admission was completely handled.", avatar: "PS", score: "JEE Main 97 Percentile" },
  { name: "Rohan Desai", college: "BJ Medical, Pune", quote: "Getting into MBBS felt impossible until Educeff stepped in. Their document support and counseling rounds guidance was exceptional.", avatar: "RD", score: "NEET 650/720" },
  { name: "Anjali Patil", college: "Symbiosis Law, Pune", quote: "The scholarship assistance team helped me secure full funding. I saved ₹2.4L in fees. Highly recommend their services!", avatar: "AP", score: "CLAT Top 200" },
];

const FAQS = [
  { q: "What exams does Educeff provide form filling assistance for?", a: "We assist with JEE Main, JEE Advanced, NEET UG/PG, MHT-CET, CLAT, CUET, MAH-MBA-CET, CAT and most state-level entrance exams." },
  { q: "How do I upload my documents securely?", a: "After registration, access the Document Upload Center in your student portal. All files are encrypted and stored on secure cloud infrastructure with AES-256 encryption." },
  { q: "Is there a fee for the initial counseling session?", a: "We offer one free 45-minute counseling session to all registered students. Subsequent sessions are billed based on the service package you choose." },
  { q: "How long does the admission process take?", a: "Timelines vary by college and exam cycle. Typically the complete process from registration to confirmation takes 2–8 weeks depending on the institution." },
  { q: "Can I track my application status online?", a: "Yes. Your student portal includes a real-time application tracker with status updates, notifications, and document verification progress." },
];

const PROCESS_STEPS = [
  { title: "Register & Profile", desc: "Create your free account, complete your academic profile, and upload required documents." },
  { title: "Free Counseling", desc: "Book a session with a certified counselor who will assess your goals and recommend the best path." },
  { title: "Apply & Track", desc: "Submit applications to shortlisted colleges and track every step in your personalized dashboard." },
  { title: "Admission Confirmed", desc: "Receive your confirmation, complete enrollment formalities, and begin your academic journey." },
];

const REQUIRED_DOCS = ["Aadhaar Card", "10th Marksheet", "Passport Size Photo", "Signature"];
const OPTIONAL_DOCS = ["PAN Card", "12th Marksheet", "Graduation Certificate", "Caste Certificate", "Income Certificate", "Domicile Certificate", "Disability Certificate", "Transfer Certificate"];

const MOCK_STUDENTS = [
  { id: "EDU2401", name: "Amit Kulkarni", email: "amit.k@gmail.com", course: "Engineering", status: "Active", docs: "Verified", date: "12 Jan 2025" },
  { id: "EDU2402", name: "Sneha Joshi", email: "sneha.j@gmail.com", course: "Medical", status: "Active", docs: "Pending", date: "14 Jan 2025" },
  { id: "EDU2403", name: "Rahul More", email: "rahul.m@gmail.com", course: "Law", status: "Active", docs: "Verified", date: "15 Jan 2025" },
  { id: "EDU2404", name: "Pooja Bane", email: "pooja.b@gmail.com", course: "MBA", status: "Pending", docs: "Incomplete", date: "16 Jan 2025" },
  { id: "EDU2405", name: "Vishal Shinde", email: "vishal.s@gmail.com", course: "Engineering", status: "Active", docs: "Verified", date: "18 Jan 2025" },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function Navbar({ page, setPage, isLoggedIn, isAdmin, setModal }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const publicPages = ["Home", "About", "Services", "Colleges", "Contact"];

  return (
    <nav style={{ background: "#64B5F6", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => { setPage("Home"); setMenuOpen(false); }}>
          <svg width="36" height="36" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,2 56,16 56,44 30,58 4,44 4,16" fill="rgba(255,255,255,0.18)"/>
            <polygon points="30,8 50,19 50,41 30,52 10,41 10,19" fill="none" stroke="white" strokeWidth="2"/>
            <text x="30" y="38" textAnchor="middle" fontFamily="Sora,sans-serif" fontSize="22" fontWeight="700" fill="white">E</text>
          </svg>
          <span className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.01em" }}>Edu<span style={{color:"#E0D4FC"}}>ceff</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center", marginLeft: 32 }}>
          {publicPages.map(p => (
            <span key={p} className={`nav-link ${page === p ? "active" : ""}`} onClick={() => setPage(p)}>{p}</span>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="desktop-btns" style={{ display: "flex", gap: 10, alignItems: "center", marginLeft: 24 }}>
          {isLoggedIn ? (
            <>
              <button className="btn-outline" style={{ fontSize: 13, padding: "8px 18px" }} onClick={() => setPage(isAdmin ? "Admin" : "Portal")}>{isAdmin ? "Admin Dashboard" : "My Portal"}</button>
              <button className="btn-primary" style={{ fontSize: 13, padding: "8px 18px" }} onClick={() => setModal(null)}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn-outline" style={{ fontSize: 13, padding: "8px 18px" }} onClick={() => setModal("login")}>Student Login</button>
              <button className="btn-primary" style={{ fontSize: 13, padding: "8px 18px" }} onClick={() => setModal("register")}>Register Free</button>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <div className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none", transition: "all 0.3s" }} />
          <span style={{ opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none", transition: "all 0.3s" }} />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {publicPages.map(p => (
            <span key={p} className="nav-link" onClick={() => { setPage(p); setMenuOpen(false); }} style={{ display: "block", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.1)", fontSize: 15 }}>{p}</span>
          ))}
          <div className="mobile-menu-btns">
            {isLoggedIn ? (
              <>
                <button className="btn-outline" style={{ width: "100%", padding: 12 }} onClick={() => { setPage(isAdmin ? "Admin" : "Portal"); setMenuOpen(false); }}>{isAdmin ? "Admin Dashboard" : "My Portal"}</button>
                <button className="btn-primary" style={{ width: "100%", padding: 12 }} onClick={() => { setModal(null); setMenuOpen(false); }}>Logout</button>
              </>
            ) : (
              <>
                <button className="btn-outline" style={{ width: "100%", padding: 12 }} onClick={() => { setModal("login"); setMenuOpen(false); }}>Student Login</button>
                <button className="btn-primary" style={{ width: "100%", padding: 12 }} onClick={() => { setModal("register"); setMenuOpen(false); }}>Register Free</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero({ setPage, setModal }) {
  return (
    <section style={{ background: `linear-gradient(135deg, #7C3AED 0%, #64B5F6 50%, #7C3AED 100%)`, minHeight: 600, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 500, height: 500, background: "radial-gradient(circle, rgba(144,202,249,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: "30%", width: 300, height: 300, background: "radial-gradient(circle, rgba(227,242,253,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="container" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 640 }} className="fade-in">
          <div className="tag" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.15)" }}>India's Trusted Education Consultancy</div>
          <h1 className="font-display" style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.12, marginBottom: 20, letterSpacing: "-0.02em" }}>
            Your One-Stop Solution for College Admissions & Counseling
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
            Expert guidance for exam forms, educational counseling, and college admissions — from JEE to NEET to MBA, we've helped 12,000+ students achieve their academic dreams.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => setModal("register")}>Register Now — It's Free</button>
            <button className="btn-outline" onClick={() => setModal("counseling")}>Book Free Counseling</button>
            <button className="btn-outline" onClick={() => setModal("login")}>Student Login</button>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 48, flexWrap: "wrap" }}>
            {STATS.map(s => (
              <div key={s.label}>
                <div className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#6D28D9" }}>{s.num}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ setPage }) {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag">What We Offer</div>
          <h2 className="font-display" style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "#64B5F6", letterSpacing: "-0.02em" }}>Comprehensive Education Services</h2>
          <p style={{ color: "#6D28D9", marginTop: 12, fontSize: 15, maxWidth: 520, margin: "12px auto 0" }}>
            End-to-end support from exam registration to college admission — every step covered by our expert team.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {SERVICES.map(s => (
            <div key={s.title} className="card" style={{ borderTop: `3px solid #64B5F6` }}>
              <div style={{ fontSize: 32, marginBottom: 14, background: s.color, width: 52, height: 52, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</div>
              <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, color: "#64B5F6" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#6D28D9", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button className="btn-navy" onClick={() => setPage("Services")}>View All Services</button>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const reasons = [
    { icon: "🏆", title: "10+ Years Experience", desc: "Over a decade of expertise guiding students through Maharashtra's complex admission processes." },
    { icon: "👥", title: "Certified Counselors", desc: "All our counselors hold certifications from recognized career guidance institutions." },
    { icon: "🔒", title: "Secure Document Handling", desc: "Bank-grade encryption and secure cloud storage for all your sensitive documents." },
    { icon: "📱", title: "Real-Time Tracking", desc: "Monitor every application, document, and counseling session through your personalized portal." },
    { icon: "💬", title: "Dedicated Support", desc: "Assigned relationship manager for every student throughout their admission journey." },
    { icon: "✅", title: "Verified Success Record", desc: "98% admission success rate with placements across IITs, NITs, and top private colleges." },
  ];
  return (
    <section className="section section-alt">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "center" }}>
          <div>
            <div className="tag">Why Choose Us</div>
            <h2 className="font-display" style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "#64B5F6", letterSpacing: "-0.02em", marginBottom: 16 }}>Trusted by Students Across Maharashtra</h2>
            <p style={{ color: "#6D28D9", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
              Educeff combines deep domain expertise with modern technology to deliver a seamless, transparent, and successful admission experience for every student.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {reasons.map(r => (
                <div key={r.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#64B5F6", marginBottom: 3 }}>{r.title}</div>
                    <div style={{ fontSize: 13, color: "#6D28D9", lineHeight: 1.6 }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#64B5F6", borderRadius: 12, padding: 36, color: "white" }}>
            <h3 className="font-display" style={{ fontSize: 24, marginBottom: 28, color: "#6D28D9" }}>Book Your Free Counseling</h3>
            <label style={{ color: "rgba(255,255,255,0.8)" }}>Full Name</label>
            <input placeholder="Enter your full name" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "white", marginBottom: 14 }} />
            <label style={{ color: "rgba(255,255,255,0.8)" }}>Mobile Number</label>
            <input placeholder="+91 98765 43210" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "white", marginBottom: 14 }} />
            <label style={{ color: "rgba(255,255,255,0.8)" }}>Course Interest</label>
            <select style={{ background: "#64B5F6", border: "1px solid rgba(255,255,255,0.25)", color: "white", marginBottom: 14 }}>
              <option>Select a course</option>
              <option>Engineering (B.E./B.Tech)</option>
              <option>Medical (MBBS/BDS)</option>
              <option>Law (LLB/BA-LLB)</option>
              <option>Management (MBA/BBA)</option>
              <option>Science (B.Sc)</option>
              <option>Commerce (B.Com)</option>
            </select>
            <button className="btn-primary" style={{ width: "100%", padding: 14, marginTop: 4 }}>Book Free Session →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="tag">Student Stories</div>
          <h2 className="font-display" style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "#64B5F6", letterSpacing: "-0.02em" }}>Real Results, Real Students</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="card" style={{ borderLeft: `4px solid #64B5F6` }}>
              <div style={{ fontSize: 32, color: "#64B5F6", marginBottom: 12, lineHeight: 1 }}>"</div>
              <p style={{ fontSize: 14, color: "#6D28D9", lineHeight: 1.75, marginBottom: 20 }}>{t.quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#F5FAFF", color: "#64B5F6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#64B5F6" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#64B5F6" }}>{t.college}</div>
                  <div style={{ fontSize: 11, color: "#6D28D9", marginTop: 1 }}>{t.score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdmissionProcess() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag">How It Works</div>
          <h2 className="font-display" style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "#64B5F6", letterSpacing: "-0.02em" }}>Simple 4-Step Admission Process</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.title} style={{ textAlign: "center", position: "relative" }}>
              {i < 3 && <div style={{ position: "absolute", top: 20, left: "70%", width: "60%", height: 1, background: `linear-gradient(to right, #C8E4FA, #E3F2FD)` }} />}
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#64B5F6", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, margin: "0 auto 16px" }}>{i + 1}</div>
              <h4 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: "#64B5F6", marginBottom: 8 }}>{s.title}</h4>
              <p style={{ fontSize: 13, color: "#6D28D9", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section">
      <div className="container">
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="tag">FAQ</div>
            <h2 className="font-display" style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "#64B5F6", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
          </div>
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item">
              <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <span style={{ color: "#64B5F6", fontSize: 20, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "none", display: "inline-block" }}>+</span>
              </div>
              {open === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setError(""); setLoading(true);
    try {
      const { error: err } = await supabase.from("contact_messages").insert({
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        created_at: new Date().toISOString(),
      });
      if (err) throw err;
      setSent(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message || "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section section-alt">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
          <div>
            <div className="tag">Get In Touch</div>
            <h2 className="font-display" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "#64B5F6", marginBottom: 16, letterSpacing: "-0.02em" }}>Let's Start Your Journey Today</h2>
            <p style={{ color: "#6D28D9", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>Reach out to our team for any queries about admissions, counseling, or services. We typically respond within 2 hours.</p>
            {[
              { icon: "📍", label: "Address", val: "123 Pimpri Road, Pimpri-Chinchwad, Pune 411018" },
              { icon: "📞", label: "Phone", val: "+91 98765 43210" },
              { icon: "✉️", label: "Email", val: "hello@educeff.com" },
              { icon: "🕐", label: "Hours", val: "Mon–Sat, 9AM – 7PM" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: 14, marginBottom: 18, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20, marginTop: 1 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#6D28D9", textTransform: "uppercase", letterSpacing: "0.08em" }}>{c.label}</div>
                  <div style={{ fontSize: 14, color: "#64B5F6", marginTop: 2 }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 20, color: "#64B5F6" }}>Send us a Message</h3>
            {sent && <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 6, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#065F46" }}>✅ Message sent! We'll get back to you within 2 hours.</div>}
            {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#DC2626" }}>{error}</div>}
            <label>Full Name</label><input name="name" placeholder="Your full name" value={form.name} onChange={handleChange} />
            <label>Email Address</label><input name="email" placeholder="your@email.com" type="email" value={form.email} onChange={handleChange} />
            <label>Phone Number</label><input name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
            <label>Subject</label>
            <select name="subject" value={form.subject} onChange={handleChange}>
              <option value="">Select topic</option>
              <option>Admission Inquiry</option><option>Counseling Session</option><option>Exam Form Filling</option><option>Scholarship Help</option><option>Other</option>
            </select>
            <label>Message</label>
            <textarea name="message" rows={4} placeholder="Tell us how we can help..." style={{ resize: "vertical" }} value={form.message} onChange={handleChange} />
            <button className="btn-navy" style={{ width: "100%", padding: 14, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
              {loading ? "Sending..." : "Send Message →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA({ setModal }) {
  return (
    <section style={{ background: `linear-gradient(135deg, #64B5F6, #64B5F6)`, padding: "72px 0" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <h2 className="font-display" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, color: "#FFFFFF", marginBottom: 14, letterSpacing: "-0.02em" }}>
          Ready to Secure Your Admission?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          Join 12,000+ students who trusted Educeff for their academic journey. Register today and get a free counseling session.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", padding: "0 16px" }}>
          <button className="btn-primary" style={{ padding: "14px 32px", fontSize: 15 }} onClick={() => setModal("register")}>Register Now — It's Free</button>
          <button className="btn-outline" style={{ padding: "14px 32px", fontSize: 15 }} onClick={() => setModal("counseling")}>Book Free Counseling</button>
        </div>
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: "#64B5F6", color: "rgba(255,255,255,0.6)", padding: "56px 0 24px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <svg width="32" height="32" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="30,2 56,16 56,44 30,58 4,44 4,16" fill="rgba(255,255,255,0.18)"/>
                <polygon points="30,8 50,19 50,41 30,52 10,41 10,19" fill="none" stroke="white" strokeWidth="2"/>
                <text x="30" y="38" textAnchor="middle" fontFamily="Sora,sans-serif" fontSize="22" fontWeight="700" fill="white">E</text>
              </svg>
              <span className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF" }}>Edu<span style={{color:"#E0D4FC"}}>ceff</span></span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 260 }}>Your trusted partner for exam forms, educational counseling, and college admissions across Maharashtra.</p>
          </div>
          {[
            { heading: "Company", links: ["Home", "About", "Services", "Colleges", "Contact"] },
            { heading: "Services", links: ["Exam Form Filling", "Counseling", "College Admission", "Scholarships", "Document Verification"] },
            { heading: "Student", links: ["Register", "Student Login", "Track Application", "Upload Documents", "Support"] },
          ].map(col => (
            <div key={col.heading}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#6D28D9", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>{col.heading}</div>
              {col.links.map(l => (
                <div key={l} style={{ fontSize: 13, marginBottom: 8, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "white"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
                  onClick={() => setPage(l === "Home" || l === "About" || l === "Services" || l === "Colleges" || l === "Contact" ? l : "Home")}
                >{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12 }}>© 2025 Educeff. All rights reserved.</span>
          <span style={{ fontSize: 12 }}>CIN: U80900MH2015PTC123456 | ISO 9001:2015 Certified</span>
        </div>
      </div>
    </footer>
  );
}

// ─── MODALS ──────────────────────────────────────────────────────────────────

function LoginModal({ onClose, onLogin }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); setLoading(true);
    try {
      if (isAdmin) {
        // Admin: check against admins table after auth
        const { data, error: authErr } = await supabase.auth.signInWithPassword({ email, password });
        if (authErr) throw authErr;
        const { data: adminData } = await supabase.from("admins").select("*").eq("user_id", data.user.id).single();
        if (!adminData) throw new Error("You do not have admin access.");
        onLogin(true);
      } else {
        // Student login
        const { error: authErr } = await supabase.auth.signInWithPassword({ email, password });
        if (authErr) throw authErr;
        onLogin(false);
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6D28D9" }}>×</button>
        <h2 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: "#64B5F6", marginBottom: 6 }}>Welcome Back</h2>
        <p style={{ color: "#6D28D9", fontSize: 14, marginBottom: 24 }}>Sign in to your Educeff account</p>
        <div style={{ display: "flex", gap: 0, background: "#F5FAFF", borderRadius: 6, padding: 3, marginBottom: 20 }}>
          {["Student", "Admin"].map(t => (
            <button key={t} style={{ flex: 1, padding: "8px 0", border: "none", borderRadius: 4, background: (t === "Admin") === isAdmin ? "#FFFFFF" : "transparent", fontWeight: 500, fontSize: 13, cursor: "pointer", color: (t === "Admin") === isAdmin ? "#64B5F6" : "#6D28D9", transition: "all 0.2s" }} onClick={() => { setIsAdmin(t === "Admin"); setError(""); }}>{t}</button>
          ))}
        </div>
        {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#DC2626" }}>{error}</div>}
        <label>Email Address</label>
        <input type="email" placeholder={isAdmin ? "admin@educeff.com" : "your@email.com"} value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
        <div style={{ textAlign: "right", marginTop: -8, marginBottom: 16 }}>
          <span style={{ fontSize: 12, color: "#64B5F6", cursor: "pointer" }} onClick={async () => {
            if (!email) { alert("Enter your email first"); return; }
            await supabase.auth.resetPasswordForEmail(email);
            alert("Password reset email sent!");
          }}>Forgot password?</span>
        </div>
        <button className="btn-navy" style={{ width: "100%", padding: 14, opacity: loading ? 0.7 : 1 }} onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Sign In →"}
        </button>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#6D28D9" }}>
          New student? <span style={{ color: "#64B5F6", cursor: "pointer" }} onClick={onClose}>Register for free</span>
        </p>
      </div>
    </div>
  );
}

function RegisterModal({ onClose }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", mobile: "", dob: "", course: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleRegister = async () => {
    setError(""); setLoading(true);
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: `${form.firstName} ${form.lastName}` } }
      });
      if (authError) throw authError;

      // 2. Save student profile to 'students' table
      const { error: profileError } = await supabase.from("students").insert({
        user_id: authData.user.id,
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        mobile: form.mobile,
        date_of_birth: form.dob,
        course_interest: form.course,
        status: "active",
        created_at: new Date().toISOString(),
      });
      if (profileError) throw profileError;

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 420, textAlign: "center" }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "#64B5F6", marginBottom: 8 }}>Account Created!</h2>
        <p style={{ color: "#6D28D9", fontSize: 14, marginBottom: 24 }}>Please check your email <strong>{form.email}</strong> and click the confirmation link to activate your account.</p>
        <button className="btn-primary" style={{ width: "100%", padding: 13 }} onClick={onClose}>Got it →</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6D28D9" }}>×</button>
        <h2 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: "#64B5F6", marginBottom: 6 }}>Create Your Account</h2>
        <p style={{ color: "#6D28D9", fontSize: 14, marginBottom: 24 }}>Join Educeff — your academic journey starts here.</p>
        {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#DC2626" }}>{error}</div>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <div><label>First Name</label><input name="firstName" placeholder="Rahul" value={form.firstName} onChange={handleChange} /></div>
          <div><label>Last Name</label><input name="lastName" placeholder="Sharma" value={form.lastName} onChange={handleChange} /></div>
        </div>
        <label>Email Address</label><input name="email" placeholder="rahul@email.com" type="email" value={form.email} onChange={handleChange} />
        <label>Mobile Number</label><input name="mobile" placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} />
        <label>Date of Birth</label><input name="dob" type="date" value={form.dob} onChange={handleChange} />
        <label>Course Interested In</label>
        <select name="course" value={form.course} onChange={handleChange}>
          <option value="">Select your field</option>
          <option>Engineering</option><option>Medical</option><option>Law</option><option>Management</option><option>Architecture</option><option>Science / Commerce</option>
        </select>
        <label>Password</label><input name="password" type="password" placeholder="Create a strong password (min 6 chars)" value={form.password} onChange={handleChange} />
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 16 }}>
          <input type="checkbox" style={{ width: "auto", marginTop: 3, marginBottom: 0 }} />
          <span style={{ fontSize: 12, color: "#6D28D9" }}>I agree to the <span style={{ color: "#64B5F6" }}>Terms of Service</span> and <span style={{ color: "#64B5F6" }}>Privacy Policy</span>.</span>
        </div>
        <button className="btn-primary" style={{ width: "100%", padding: 14, opacity: loading ? 0.7 : 1 }} onClick={handleRegister} disabled={loading}>
          {loading ? "Creating Account..." : "Create Account →"}
        </button>
      </div>
    </div>
  );
}

// ─── STUDENT PORTAL ──────────────────────────────────────────────────────────

function StudentPortal({ setPage, user }) {
  const [tab, setTab] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState({});

  useEffect(() => {
    if (user) loadProfile();
  }, [user]);

  const loadProfile = async () => {
    const { data } = await supabase.from("students").select("*").eq("user_id", user.id).single();
    if (data) setProfile(data);
    // Load uploaded doc names
    const { data: docs } = await supabase.storage.from("student-documents").list(`${user.id}/`);
    if (docs) {
      const docMap = {};
      docs.forEach(d => { docMap[d.name] = true; });
      setUploadedDocs(docMap);
    }
  };

  const initials = profile ? `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}` : "ST";
  const fullName = profile ? `${profile.first_name} ${profile.last_name}` : "Student";

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "profile", label: "My Profile", icon: "👤" },
    { id: "documents", label: "Documents", icon: "📁" },
    { id: "applications", label: "Applications", icon: "📋" },
    { id: "payments", label: "Payments", icon: "💳" },
    { id: "tracking", label: "Track Status", icon: "📍" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "support", label: "Support", icon: "💬" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setPage("Home");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FFFFFF", flexDirection: "column" }}>
      <div style={{ background: "#64B5F6", padding: "24px 12px", flexShrink: 0, minWidth: 200 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, padding: "0 8px" }}>
          <svg width="28" height="28" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,2 56,16 56,44 30,58 4,44 4,16" fill="rgba(255,255,255,0.18)"/>
            <polygon points="30,8 50,19 50,41 30,52 10,41 10,19" fill="none" stroke="white" strokeWidth="2"/>
            <text x="30" y="38" textAnchor="middle" fontFamily="Sora,sans-serif" fontSize="22" fontWeight="700" fill="white">E</text>
          </svg>
          <span className="font-display" style={{ fontSize: 17, fontWeight: 700, color: "#FFFFFF" }}>Edu<span style={{color:"#E0D4FC"}}>ceff</span></span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 8, padding: "12px 14px", marginBottom: 20 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#F5FAFF", color: "#64B5F6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{initials}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>{fullName}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{profile?.course_interest || "Student"}</div>
        </div>
        {tabs.map(t => (
          <div key={t.id} className={`sidebar-link ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>{t.label}
          </div>
        ))}
        <div className="sidebar-link" onClick={handleLogout} style={{ marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 14 }}>
          <span style={{ fontSize: 16 }}>🚪</span> Logout
        </div>
      </div>
      <div style={{ flex: 1, padding: "clamp(16px, 3vw, 32px)", overflowY: "auto", background: "#FAFCFF" }}>
        {tab === "dashboard" && <PortalDashboard user={user} profile={profile} />}
        {tab === "profile" && <PortalProfile user={user} profile={profile} onSave={loadProfile} />}
        {tab === "documents" && <DocumentCenter user={user} uploadedDocs={uploadedDocs} onUpload={loadProfile} />}
        {tab === "applications" && <ApplicationsTab user={user} />}
        {tab === "payments" && <PaymentsTab user={user} profile={profile} />}
        {tab === "tracking" && <TrackingTab user={user} />}
        {tab === "notifications" && <NotificationsTab user={user} />}
        {tab === "support" && <SupportTab user={user} />}
      </div>
    </div>
  );
}

function PortalDashboard({ user, profile }) {
  const [stats, setStats] = useState({ applications: 0, docs: 0, sessions: 0, pending: 0 });
  const [recentApps, setRecentApps] = useState([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data: apps } = await supabase.from("applications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5);
      if (apps) {
        setRecentApps(apps);
        setStats(s => ({ ...s, applications: apps.filter(a => a.status !== "rejected").length, pending: apps.filter(a => a.status === "pending").length }));
      }
      const { data: docs } = await supabase.storage.from("student-documents").list(`${user.id}/`);
      if (docs) setStats(s => ({ ...s, docs: docs.length }));
    };
    load();
  }, [user]);

  const firstName = profile?.first_name || "Student";

  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6", marginBottom: 6 }}>Welcome back, {firstName} 👋</h1>
      <p style={{ color: "#6D28D9", fontSize: 14, marginBottom: 28 }}>Here's an overview of your current applications and tasks.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Active Applications", val: stats.applications, color: "#64B5F6" },
          { label: "Documents Uploaded", val: `${stats.docs}/4`, color: "#D97706" },
          { label: "Counseling Sessions", val: stats.sessions, color: "#059669" },
          { label: "Pending Actions", val: stats.pending, color: "#DC2626" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: 13, color: "#6D28D9", marginBottom: 6 }}>{s.label}</div>
            <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 22 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#64B5F6" }}>Recent Applications</h3>
        {recentApps.length === 0 ? (
          <p style={{ fontSize: 14, color: "#6D28D9" }}>No applications yet. Click "My Applications" to add one.</p>
        ) : recentApps.map(a => (
          <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F5FAFF" }}>
            <span style={{ fontSize: 13, color: "#64B5F6" }}>{a.college} — {a.course}</span>
            <span className={`badge ${a.status === "approved" ? "badge-success" : a.status === "rejected" ? "badge-danger" : a.status === "under_review" ? "badge-info" : "badge-warning"}`}>{a.status?.replace("_", " ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortalProfile({ user, profile, onSave }) {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", mobile: "", date_of_birth: "", gender: "", address: "", tenth_percent: "", twelfth_percent: "", entrance_exam: "", score: "" });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (profile) setForm(f => ({ ...f, ...profile })); }, [profile]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setLoading(true); setSaved(false);
    const { error } = await supabase.from("students").update({ ...form, updated_at: new Date().toISOString() }).eq("user_id", user.id);
    setLoading(false);
    if (!error) { setSaved(true); onSave(); setTimeout(() => setSaved(false), 3000); }
  };

  const initials = `${form.first_name?.[0] || ""}${form.last_name?.[0] || ""}` || "ST";

  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6", marginBottom: 28 }}>Profile Management</h1>
      {saved && <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 6, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" }}>✅ Profile saved successfully!</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
        <div className="card" style={{ textAlign: "center", padding: 28 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#E3F2FD", color: "#64B5F6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 22, margin: "0 auto 14px" }}>{initials}</div>
          <div style={{ fontWeight: 600, fontSize: 16, color: "#64B5F6" }}>{form.first_name} {form.last_name}</div>
          <div style={{ fontSize: 13, color: "#64B5F6", marginBottom: 4 }}>{user?.email}</div>
          <div style={{ fontSize: 12, color: "#6D28D9", marginBottom: 20 }}>{form.course_interest || "Student"}</div>
          <span className="badge badge-success">Profile Active</span>
        </div>
        <div className="card" style={{ padding: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: "#64B5F6" }}>Personal Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <div><label>First Name</label><input name="first_name" value={form.first_name || ""} onChange={handleChange} /></div>
            <div><label>Last Name</label><input name="last_name" value={form.last_name || ""} onChange={handleChange} /></div>
            <div><label>Email</label><input value={user?.email || ""} disabled style={{ background: "#F5FAFF" }} /></div>
            <div><label>Mobile</label><input name="mobile" value={form.mobile || ""} onChange={handleChange} /></div>
            <div><label>Date of Birth</label><input name="date_of_birth" type="date" value={form.date_of_birth || ""} onChange={handleChange} /></div>
            <div><label>Gender</label><select name="gender" value={form.gender || ""} onChange={handleChange}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div style={{ gridColumn: "span 2" }}><label>Address</label><input name="address" value={form.address || ""} onChange={handleChange} /></div>
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: "20px 0 16px", color: "#64B5F6" }}>Academic Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <div><label>10th Percentage</label><input name="tenth_percent" value={form.tenth_percent || ""} onChange={handleChange} /></div>
            <div><label>12th Percentage</label><input name="twelfth_percent" value={form.twelfth_percent || ""} onChange={handleChange} /></div>
            <div><label>Entrance Exam</label><select name="entrance_exam" value={form.entrance_exam || ""} onChange={handleChange}><option value="">Select</option><option>JEE Main</option><option>MHT-CET</option><option>NEET</option><option>CLAT</option><option>CAT</option></select></div>
            <div><label>Score/Percentile</label><input name="score" value={form.score || ""} onChange={handleChange} /></div>
          </div>
          <button className="btn-primary" style={{ marginTop: 8, opacity: loading ? 0.7 : 1 }} onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DocumentCenter({ user, uploadedDocs, onUpload }) {
  const [uploading, setUploading] = useState({});
  const [error, setError] = useState("");

  const handleUpload = async (docName, file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError(`${docName}: File too large. Max 5MB.`); return; }
    setError(""); setUploading(u => ({ ...u, [docName]: true }));
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${docName}.${ext}`;
    const { error: uploadErr } = await supabase.storage.from("student-documents").upload(path, file, { upsert: true });
    if (!uploadErr) {
      await supabase.from("student_documents").upsert({ user_id: user.id, doc_name: docName, file_path: path, uploaded_at: new Date().toISOString(), status: "pending_review" });
      onUpload();
    } else setError(uploadErr.message);
    setUploading(u => ({ ...u, [docName]: false }));
  };

  const handleView = async (docName) => {
    const { data } = await supabase.storage.from("student-documents").list(`${user.id}/`, { search: docName });
    if (data && data.length > 0) {
      const { data: url } = supabase.storage.from("student-documents").getPublicUrl(`${user.id}/${data[0].name}`);
      window.open(url.publicUrl, "_blank");
    }
  };

  const handleRemove = async (docName) => {
    const { data } = await supabase.storage.from("student-documents").list(`${user.id}/`, { search: docName });
    if (data && data.length > 0) {
      await supabase.storage.from("student-documents").remove([`${user.id}/${data[0].name}`]);
      await supabase.from("student_documents").delete().eq("user_id", user.id).eq("doc_name", docName);
      onUpload();
    }
  };

  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6", marginBottom: 6 }}>Document Upload Center</h1>
      <p style={{ color: "#6D28D9", fontSize: 14, marginBottom: 28 }}>All documents are encrypted and stored securely. Accepted formats: PDF, JPG, PNG (max 5MB each).</p>
      {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#DC2626" }}>{error}</div>}

      <div style={{ background: "#FFFFFF", borderRadius: 8, border: "1px solid #E3F2FD", padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#64B5F6", marginBottom: 4 }}>Required Documents</h3>
        <p style={{ fontSize: 13, color: "#DC2626", marginBottom: 20 }}>All 4 documents must be uploaded to proceed with applications.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {REQUIRED_DOCS.map(doc => {
            const isUploaded = !!uploadedDocs[doc] || Object.keys(uploadedDocs).some(k => k.startsWith(doc));
            return (
              <div key={doc} style={{ border: `1px solid ${isUploaded ? "#059669" : "#E3F2FD"}`, borderRadius: 8, padding: 16, background: isUploaded ? "#F0FDF4" : "#FFFFFF" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#64B5F6" }}>📄 {doc}</span>
                  <span className={`badge ${isUploaded ? "badge-success" : "badge-danger"}`}>{isUploaded ? "✓ Uploaded" : "Required"}</span>
                </div>
                {isUploaded ? (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn-teal" style={{ fontSize: 11, padding: "5px 12px" }} onClick={() => handleView(doc)}>View</button>
                    <button style={{ fontSize: 11, padding: "5px 12px", background: "none", border: "1px solid #E3F2FD", borderRadius: 4, cursor: "pointer", color: "#DC2626" }} onClick={() => handleRemove(doc)}>Remove</button>
                  </div>
                ) : (
                  <label className="upload-zone" style={{ padding: "14px", cursor: "pointer", display: "block" }}>
                    <div style={{ fontSize: 13, color: "#6D28D9" }}>{uploading[doc] ? "Uploading..." : "Click to upload or drag &amp; drop"}</div>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={e => handleUpload(doc, e.target.files[0])} />
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: "#FFFFFF", borderRadius: 8, border: "1px solid #E3F2FD", padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#64B5F6", marginBottom: 4 }}>Optional Documents</h3>
        <p style={{ fontSize: 13, color: "#6D28D9", marginBottom: 20 }}>These may be required depending on your category and scholarship application.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {OPTIONAL_DOCS.map(doc => (
            <div key={doc} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #E3F2FD", borderRadius: 6, padding: "12px 16px" }}>
              <span style={{ fontSize: 13, color: "#64B5F6" }}>📎 {doc}</span>
              <label style={{ cursor: "pointer" }}>
                <span className="btn-teal" style={{ fontSize: 11, padding: "5px 12px", display: "inline-block" }}>{uploading[doc] ? "..." : "Upload"}</span>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={e => handleUpload(doc, e.target.files[0])} />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ApplicationsTab({ user }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ college: "", course: "", exam: "" });

  useEffect(() => {
    if (!user) return;
    supabase.from("applications").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { setApps(data || []); setLoading(false); });
  }, [user]);

  const handleAdd = async () => {
    const { data, error } = await supabase.from("applications").insert({ user_id: user.id, college: form.college, course: form.course, exam: form.exam, status: "pending", created_at: new Date().toISOString() }).select().single();
    if (!error) { setApps(a => [data, ...a]); setShowForm(false); setForm({ college: "", course: "", exam: "" }); }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6" }}>My Applications</h1>
        <button className="btn-primary" onClick={() => setShowForm(s => !s)}>+ New Application</button>
      </div>
      {showForm && (
        <div className="card" style={{ marginBottom: 20, padding: 20 }}>
          <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 14, color: "#64B5F6" }}>Add New Application</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 16px" }}>
            <div><label>College Name</label><input placeholder="e.g. COEP Pune" value={form.college} onChange={e => setForm(f => ({ ...f, college: e.target.value }))} /></div>
            <div><label>Course</label><input placeholder="e.g. B.E. Computer" value={form.course} onChange={e => setForm(f => ({ ...f, course: e.target.value }))} /></div>
            <div><label>Entrance Exam</label><input placeholder="e.g. JEE Main" value={form.exam} onChange={e => setForm(f => ({ ...f, exam: e.target.value }))} /></div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-primary" onClick={handleAdd}>Submit Application</button>
            <button className="btn-navy" style={{ background: "transparent", color: "#64B5F6", border: "1px solid #64B5F6" }} onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div style={{ background: "#FFFFFF", borderRadius: 8, border: "1px solid #E3F2FD", overflow: "hidden" }}>
        <table>
          <thead><tr><th>Application ID</th><th>College</th><th>Course</th><th>Exam</th><th>Applied On</th><th>Status</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={6} style={{ textAlign: "center", padding: 24, color: "#6D28D9" }}>Loading...</td></tr>
            : apps.length === 0 ? <tr><td colSpan={6} style={{ textAlign: "center", padding: 24, color: "#6D28D9" }}>No applications yet.</td></tr>
            : apps.map(a => (
              <tr key={a.id}>
                <td style={{ fontWeight: 600, color: "#64B5F6", fontSize: 12 }}>APP-{String(a.id).slice(-4).padStart(4,"0")}</td>
                <td>{a.college}</td><td>{a.course}</td><td>{a.exam}</td>
                <td style={{ color: "#6D28D9" }}>{new Date(a.created_at).toLocaleDateString("en-IN")}</td>
                <td><span className={`badge ${a.status === "approved" ? "badge-success" : a.status === "rejected" ? "badge-danger" : a.status === "under_review" ? "badge-info" : "badge-warning"}`}>{a.status?.replace("_"," ")}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaymentsTab({ user, profile }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [paySuccess, setPaySuccess] = useState(null);

  // Razorpay Key — replace with your actual Razorpay Key ID from razorpay.com
  const RAZORPAY_KEY = "rzp_test_YOUR_KEY_ID";

  const SERVICES = [
    {
      id: "counseling_basic",
      icon: "🎓",
      title: "Basic Counseling Session",
      desc: "45-minute one-on-one session with a certified academic counselor. Career guidance, stream selection & college shortlisting.",
      price: 499,
      originalPrice: 999,
      badge: "Most Popular",
      badgeColor: "#059669",
      includes: ["45-min video/phone call", "Stream & college shortlist", "Written summary report", "1 follow-up query"],
    },
    {
      id: "counseling_premium",
      icon: "⭐",
      title: "Premium Counseling Package",
      desc: "3 sessions with a senior counselor. Complete roadmap from exam selection to admission including scholarship guidance.",
      price: 1499,
      originalPrice: 2999,
      badge: "Best Value",
      badgeColor: "#7C3AED",
      includes: ["3 × 60-min sessions", "Complete admission roadmap", "Scholarship identification", "Document checklist", "Priority support for 30 days"],
    },
    {
      id: "exam_jee",
      icon: "📋",
      title: "JEE Main Form Filling",
      desc: "Expert assistance for JEE Main registration. We handle the complete form filling, photo upload, fee payment & confirmation.",
      price: 299,
      originalPrice: null,
      badge: "Engineering",
      badgeColor: "#1D4ED8",
      includes: ["Complete form filling", "Photo & signature upload", "Fee payment assistance", "Confirmation PDF", "Error-free guarantee"],
    },
    {
      id: "exam_neet",
      icon: "📋",
      title: "NEET UG Form Filling",
      desc: "End-to-end NEET UG application assistance including category verification, photo guidelines & payment confirmation.",
      price: 299,
      originalPrice: null,
      badge: "Medical",
      badgeColor: "#15803D",
      includes: ["Complete form filling", "Category verification", "Photo guidelines check", "Fee payment assistance", "Confirmation PDF"],
    },
    {
      id: "exam_mhtcet",
      icon: "📋",
      title: "MHT-CET Form Filling",
      desc: "Maharashtra CET form assistance for both PCM and PCB groups. Includes subject selection & hall ticket download support.",
      price: 199,
      originalPrice: null,
      badge: "Maharashtra",
      badgeColor: "#B45309",
      includes: ["PCM / PCB form filling", "Subject group selection", "Fee payment assistance", "Hall ticket support", "Confirmation PDF"],
    },
    {
      id: "exam_bundle",
      icon: "🚀",
      title: "Exam Form Bundle (3 Exams)",
      desc: "Get form filling assistance for any 3 entrance exams of your choice at a discounted bundled price.",
      price: 599,
      originalPrice: 897,
      badge: "Save ₹298",
      badgeColor: "#DC2626",
      includes: ["Any 3 entrance exams", "Priority processing", "All confirmations", "Dedicated manager", "Free 1 counseling call"],
    },
  ];

  useEffect(() => {
    if (!user) return;
    supabase.from("payments").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setHistory(data || []));
  }, [user, paySuccess]);

  const loadRazorpay = () => new Promise(resolve => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const handlePay = async (service) => {
    setLoading(true);
    const loaded = await loadRazorpay();
    if (!loaded) { alert("Failed to load Razorpay. Check your internet connection."); setLoading(false); return; }

    const fullName = profile ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim() : "Student";
    const email = user?.email || "";
    const mobile = profile?.mobile || "";

    const options = {
      key: RAZORPAY_KEY,
      amount: service.price * 100, // paise
      currency: "INR",
      name: "Educeff",
      description: service.title,
      image: "https://i.imgur.com/n5tjHFD.png",
      prefill: { name: fullName, email, contact: mobile },
      notes: { user_id: user?.id, service_id: service.id },
      theme: { color: "#64B5F6" },
      handler: async (response) => {
        // Save payment record to Supabase
        const { error } = await supabase.from("payments").insert({
          user_id: user.id,
          service_id: service.id,
          service_title: service.title,
          amount: service.price,
          currency: "INR",
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id || null,
          status: "success",
          created_at: new Date().toISOString(),
        });
        if (!error) {
          setPaySuccess({ service, paymentId: response.razorpay_payment_id });
          setSelectedService(null);
        }
      },
      modal: { ondismiss: () => setLoading(false) },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", async (resp) => {
      await supabase.from("payments").insert({
        user_id: user.id,
        service_id: service.id,
        service_title: service.title,
        amount: service.price,
        currency: "INR",
        razorpay_payment_id: resp.error.metadata?.payment_id || null,
        status: "failed",
        error_reason: resp.error.reason,
        created_at: new Date().toISOString(),
      });
      alert(`Payment failed: ${resp.error.description}`);
    });
    rzp.open();
    setLoading(false);
  };

  if (paySuccess) return (
    <div style={{ maxWidth: 480, margin: "40px auto", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <h2 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#059669", marginBottom: 8 }}>Payment Successful!</h2>
      <p style={{ color: "#6D28D9", fontSize: 15, marginBottom: 8 }}>You've successfully purchased <strong>{paySuccess.service.title}</strong></p>
      <p style={{ fontSize: 13, color: "#90CAF9", marginBottom: 28 }}>Payment ID: {paySuccess.paymentId}</p>
      <div style={{ background: "#F0FDF4", border: "1px solid #A7F3D0", borderRadius: 12, padding: 20, marginBottom: 24, textAlign: "left" }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#065F46", marginBottom: 10 }}>✅ What happens next:</div>
        {paySuccess.service.id.includes("counseling") ? (
          <ul style={{ paddingLeft: 18, fontSize: 13, color: "#065F46", lineHeight: 2 }}>
            <li>Our team will contact you within 2 hours</li>
            <li>Session will be scheduled at your convenience</li>
            <li>You'll receive a confirmation on your email</li>
          </ul>
        ) : (
          <ul style={{ paddingLeft: 18, fontSize: 13, color: "#065F46", lineHeight: 2 }}>
            <li>Our team will contact you within 4 hours</li>
            <li>Share your login credentials securely</li>
            <li>Form will be filled within 24 hours</li>
            <li>Confirmation PDF will be sent to your email</li>
          </ul>
        )}
      </div>
      <button className="btn-primary" style={{ width: "100%", padding: 14 }} onClick={() => setPaySuccess(null)}>Back to Payments →</button>
    </div>
  );

  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6", marginBottom: 6 }}>Payments</h1>
      <p style={{ color: "#6D28D9", fontSize: 14, marginBottom: 28 }}>Secure payments powered by Razorpay — UPI, Cards, NetBanking, Wallets accepted.</p>

      {/* Payment Methods Banner */}
      <div style={{ background: "linear-gradient(135deg, #EFF6FF, #F5F3FF)", border: "1px solid #C8E4FA", borderRadius: 12, padding: "14px 20px", marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>🔒 100% Secure Payments</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["UPI", "Visa", "Mastercard", "RuPay", "NetBanking", "Wallets"].map(m => (
            <span key={m} style={{ background: "white", border: "1px solid #C8E4FA", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600, color: "#64B5F6" }}>{m}</span>
          ))}
        </div>
      </div>

      {/* Service Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, marginBottom: 40 }}>
        {SERVICES.map(service => (
          <div key={service.id} className="card" style={{ position: "relative", border: selectedService?.id === service.id ? "2px solid #64B5F6" : "1px solid #C8E4FA" }}>
            {service.badge && (
              <div style={{ position: "absolute", top: -1, right: 16, background: service.badgeColor, color: "white", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>{service.badge}</div>
            )}
            <div style={{ fontSize: 32, marginBottom: 12 }}>{service.icon}</div>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: "#1A1A2E", marginBottom: 6 }}>{service.title}</h3>
            <p style={{ fontSize: 13, color: "#6D28D9", lineHeight: 1.6, marginBottom: 14 }}>{service.desc}</p>

            {/* Includes */}
            <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 16 }}>
              {service.includes.map(item => (
                <li key={item} style={{ fontSize: 12, color: "#1A1A2E", marginBottom: 5, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#059669", fontWeight: 700 }}>✓</span> {item}
                </li>
              ))}
            </ul>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: "#64B5F6" }}>₹{service.price}</span>
              {service.originalPrice && (
                <span style={{ fontSize: 14, color: "#9CA3AF", textDecoration: "line-through" }}>₹{service.originalPrice}</span>
              )}
              {service.originalPrice && (
                <span style={{ fontSize: 12, color: "#059669", fontWeight: 700 }}>Save ₹{service.originalPrice - service.price}</span>
              )}
            </div>

            <button className="btn-primary" style={{ width: "100%", padding: 12, opacity: loading ? 0.7 : 1 }}
              onClick={() => handlePay(service)} disabled={loading}>
              {loading ? "Processing..." : `Pay ₹${service.price} →`}
            </button>
          </div>
        ))}
      </div>

      {/* Payment History */}
      <div style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid #C8E4FA", padding: 24 }}>
        <h3 style={{ fontWeight: 700, fontSize: 16, color: "#64B5F6", marginBottom: 16 }}>💳 Payment History</h3>
        {history.length === 0 ? (
          <div style={{ textAlign: "center", padding: "32px 0", color: "#90CAF9" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📭</div>
            <div style={{ fontSize: 14 }}>No payments yet</div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr><th>Date</th><th>Service</th><th>Amount</th><th>Payment ID</th><th>Status</th></tr>
              </thead>
              <tbody>
                {history.map(p => (
                  <tr key={p.id}>
                    <td style={{ color: "#6D28D9" }}>{new Date(p.created_at).toLocaleDateString("en-IN")}</td>
                    <td style={{ fontWeight: 500, color: "#1A1A2E" }}>{p.service_title}</td>
                    <td style={{ fontWeight: 700, color: "#64B5F6" }}>₹{p.amount}</td>
                    <td style={{ fontSize: 11, color: "#90CAF9", fontFamily: "monospace" }}>{p.razorpay_payment_id || "—"}</td>
                    <td><span className={`badge ${p.status === "success" ? "badge-success" : p.status === "failed" ? "badge-danger" : "badge-warning"}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Note */}
      <div style={{ marginTop: 16, padding: "12px 16px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, fontSize: 12, color: "#92400E" }}>
        ⚠️ <strong>Test Mode:</strong> Replace <code>rzp_test_YOUR_KEY_ID</code> with your live Razorpay Key ID from <a href="https://razorpay.com" target="_blank" style={{ color: "#64B5F6" }}>razorpay.com</a> before going live.
      </div>
    </div>
  );
}

function TrackingTab({ user }) {
  const steps = ["Registered", "Documents Verified", "Application Submitted", "Under Review", "Admission Confirmed"];
  const currentStep = 3;
  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6", marginBottom: 28 }}>Application Tracking</h1>
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: 600, marginBottom: 20, color: "#64B5F6" }}>COEP Pune — B.E. Computer Science (APP-001)</h3>
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: 8 }}>
          <div style={{ position: "absolute", top: 18, left: 0, right: 0, height: 2, background: "#F5FAFF" }} />
          <div style={{ position: "absolute", top: 18, left: 0, width: `${(currentStep / (steps.length - 1)) * 100}%`, height: 2, background: "#64B5F6", transition: "width 0.5s" }} />
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 1, maxWidth: 90, textAlign: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: i <= currentStep ? "#A8D4F5" : "#F5FAFF", color: i <= currentStep ? "white" : "#F5FAFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600 }}>
                {i < currentStep ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: 11, color: i <= currentStep ? "#64B5F6" : "#F5FAFF", fontWeight: i === currentStep ? 600 : 400 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const notifs = [
    { title: "Document Verification Required", msg: "Please upload your Passport Size Photo and Signature to proceed.", time: "2 hours ago", type: "warning", unread: true },
    { title: "Application Submitted Successfully", msg: "Your application APP-002 to VJTI Mumbai has been submitted.", time: "1 day ago", type: "success", unread: true },
    { title: "Counseling Session Scheduled", msg: "Your free counseling session is scheduled for 20 Jan at 11AM.", time: "2 days ago", type: "info", unread: false },
    { title: "Welcome to Educeff!", msg: "Your account has been created. Complete your profile to get started.", time: "5 days ago", type: "info", unread: false },
  ];
  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6", marginBottom: 24 }}>Notifications</h1>
      {notifs.map((n, i) => (
        <div key={i} style={{ background: "#FFFFFF", borderRadius: 8, border: `1px solid ${n.unread ? "#A8D4F5" : "#F5FAFF"}`, padding: "16px 20px", marginBottom: 12, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ fontSize: 20 }}>{n.type === "warning" ? "⚠️" : n.type === "success" ? "✅" : "ℹ️"}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#64B5F6", marginBottom: 3 }}>{n.title}</div>
            <div style={{ fontSize: 13, color: "#6D28D9" }}>{n.msg}</div>
          </div>
          <div style={{ fontSize: 11, color: "#6D28D9", whiteSpace: "nowrap" }}>{n.time}</div>
          {n.unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#64B5F6", flexShrink: 0, marginTop: 5 }} />}
        </div>
      ))}
    </div>
  );
}

function SupportTab() {
  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6", marginBottom: 24 }}>Support Center</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 28 }}>
        {[
          { icon: "📞", title: "Call Support", desc: "+91 98765 43210", sub: "Mon–Sat, 9AM–7PM", action: "Call Now" },
          { icon: "💬", title: "Live Chat", desc: "Chat with an advisor", sub: "Avg. response: 5 min", action: "Start Chat" },
          { icon: "✉️", title: "Email Support", desc: "support@educeff.com", sub: "Response within 4 hours", action: "Send Email" },
          { icon: "📅", title: "Book Appointment", desc: "Schedule a session", sub: "In-person or video call", action: "Book Now" },
        ].map(s => (
          <div key={s.title} className="card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ fontSize: 28 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#64B5F6" }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#64B5F6" }}>{s.desc}</div>
              <div style={{ fontSize: 12, color: "#6D28D9" }}>{s.sub}</div>
            </div>
            <button className="btn-teal" style={{ fontSize: 12, padding: "6px 14px" }}>{s.action}</button>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 16, color: "#64B5F6" }}>Submit a Support Ticket</h3>
        <label>Issue Category</label>
        <select><option>Select category</option><option>Document Upload Issue</option><option>Application Status</option><option>Login Problem</option><option>Payment Query</option><option>Other</option></select>
        <label>Describe your issue</label>
        <textarea rows={4} placeholder="Describe your issue in detail..." style={{ resize: "vertical" }} />
        <button className="btn-primary">Submit Ticket</button>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────

function AdminDashboard({ setPage }) {
  const [tab, setTab] = useState("overview");

  const adminTabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "students", label: "Students", icon: "👥" },
    { id: "documents", label: "Doc Verification", icon: "🔍" },
    { id: "applications", label: "Applications", icon: "📋" },
    { id: "counseling", label: "Counseling", icon: "🎓" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "reports", label: "Reports & Analytics", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FFFFFF", flexDirection: "column" }}>
      <div style={{ background: "#64B5F6", padding: "24px 12px", flexShrink: 0, minWidth: 200 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, padding: "0 8px" }}>
          <svg width="28" height="28" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,2 56,16 56,44 30,58 4,44 4,16" fill="rgba(255,255,255,0.18)"/>
            <polygon points="30,8 50,19 50,41 30,52 10,41 10,19" fill="none" stroke="white" strokeWidth="2"/>
            <text x="30" y="38" textAnchor="middle" fontFamily="Sora,sans-serif" fontSize="22" fontWeight="700" fill="white">E</text>
          </svg>
          <span className="font-display" style={{ fontSize: 17, fontWeight: 700, color: "#FFFFFF" }}>Edu<span style={{color:"#E0D4FC"}}>ceff</span></span>
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", padding: "0 8px", marginBottom: 20, letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin Panel</div>
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "12px 14px", marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Meena Desai</div>
          <div style={{ fontSize: 11, color: "#64B5F6" }}>Super Admin</div>
        </div>
        {adminTabs.map(t => (
          <div key={t.id} className={`sidebar-link ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            {t.label}
          </div>
        ))}
        <div className="sidebar-link" onClick={() => setPage("Home")} style={{ marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14 }}>
          <span>🚪</span> Back to Website
        </div>
      </div>

      <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto", background: "#FFFFFF" }}>
        {tab === "overview" && <AdminOverview />}
        {tab === "students" && <AdminStudents />}
        {tab === "documents" && <AdminDocVerification />}
        {tab === "applications" && <AdminApplications />}
        {tab === "counseling" && <AdminCounseling />}
        {tab === "notifications" && <AdminNotifications />}
        {tab === "reports" && <AdminReports />}
        {tab === "settings" && <AdminSettings />}
      </div>
    </div>
  );
}

function AdminOverview() {
  const metrics = [
    { label: "Total Students", val: "12,418", delta: "+124 this month", color: "#64B5F6" },
    { label: "Active Applications", val: "1,284", delta: "+47 today", color: "#64B5F6" },
    { label: "Pending Verifications", val: "89", delta: "Needs attention", color: "#D97706" },
    { label: "Approved Applications", val: "10,942", delta: "All time", color: "#059669" },
    { label: "Rejected Applications", val: "192", delta: "1.5% rejection rate", color: "#DC2626" },
    { label: "Admission Success Rate", val: "98.2%", delta: "+0.4% vs last year", color: "#64B5F6" },
    { label: "Counseling Sessions", val: "3,891", delta: "+128 this month", color: "#7C3AED" },
    { label: "Active Counselors", val: "14", delta: "Online today: 8", color: "#64B5F6" },
  ];
  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6", marginBottom: 6 }}>Dashboard Overview</h1>
      <p style={{ color: "#6D28D9", fontSize: 13, marginBottom: 28 }}>Last updated: {new Date().toLocaleString("en-IN")}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 28 }}>
        {metrics.map(m => (
          <div key={m.label} className="stat-card">
            <div style={{ fontSize: 12, color: "#6D28D9", marginBottom: 6 }}>{m.label}</div>
            <div className="font-display" style={{ fontSize: 26, fontWeight: 700, color: m.color, marginBottom: 4 }}>{m.val}</div>
            <div style={{ fontSize: 11, color: "#6D28D9" }}>{m.delta}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        <div className="card" style={{ padding: 22 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#64B5F6" }}>Recent Registrations</h3>
          <table>
            <thead><tr><th>Name</th><th>Course</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {MOCK_STUDENTS.slice(0, 5).map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td style={{ color: "#6D28D9" }}>{s.course}</td>
                  <td style={{ color: "#6D28D9" }}>{s.date}</td>
                  <td><span className={`badge ${s.status === "Active" ? "badge-success" : "badge-warning"}`}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#64B5F6" }}>Quick Actions</h3>
          {[
            { label: "Review Pending Documents (89)", icon: "🔍", color: "#D97706" },
            { label: "Process New Applications (23)", icon: "📋", color: "#64B5F6" },
            { label: "Assign Counselor Sessions (12)", icon: "🎓", color: "#64B5F6" },
            { label: "Send Bulk Notifications", icon: "📢", color: "#64B5F6" },
            { label: "Generate Monthly Report", icon: "📈", color: "#059669" },
          ].map(a => (
            <div key={a.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${"#F5FAFF"}`, cursor: "pointer" }}>
              <span>{a.icon}</span>
              <span style={{ fontSize: 13, color: a.color, fontWeight: 500 }}>{a.label}</span>
              <span style={{ marginLeft: "auto", color: "#6D28D9" }}>→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminStudents() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_STUDENTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.course.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6" }}>Student Management</h1>
        <button className="btn-primary">+ Add Student</button>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." style={{ maxWidth: 300, marginBottom: 0 }} />
        <select style={{ width: 160, marginBottom: 0 }}><option>All Courses</option><option>Engineering</option><option>Medical</option><option>Law</option><option>MBA</option></select>
        <select style={{ width: 140, marginBottom: 0 }}><option>All Status</option><option>Active</option><option>Pending</option></select>
      </div>
      <div style={{ background: "#FFFFFF", borderRadius: 8, border: `1px solid ${"#F5FAFF"}`, overflow: "hidden" }}>
        <table>
          <thead><tr><th>Student ID</th><th>Name</th><th>Email</th><th>Course</th><th>Status</th><th>Documents</th><th>Registered</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600, color: "#64B5F6", fontSize: 12 }}>{s.id}</td>
                <td style={{ fontWeight: 500 }}>{s.name}</td>
                <td style={{ color: "#6D28D9" }}>{s.email}</td>
                <td>{s.course}</td>
                <td><span className={`badge ${s.status === "Active" ? "badge-success" : "badge-warning"}`}>{s.status}</span></td>
                <td><span className={`badge ${s.docs === "Verified" ? "badge-success" : s.docs === "Pending" ? "badge-warning" : "badge-danger"}`}>{s.docs}</span></td>
                <td style={{ color: "#6D28D9", fontSize: 12 }}>{s.date}</td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-teal" style={{ fontSize: 11, padding: "4px 10px" }}>View</button>
                    <button style={{ fontSize: 11, padding: "4px 10px", background: "none", border: `1px solid ${"#F5FAFF"}`, borderRadius: 4, cursor: "pointer" }}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminDocVerification() {
  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6", marginBottom: 24 }}>Document Verification</h1>
      <div style={{ background: "#FFFFFF", borderRadius: 8, border: `1px solid ${"#F5FAFF"}`, overflow: "hidden" }}>
        <table>
          <thead><tr><th>Student</th><th>Document Type</th><th>Uploaded On</th><th>File Size</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {[
              { name: "Sneha Joshi", doc: "Aadhaar Card", date: "14 Jan", size: "1.2 MB", status: "Pending" },
              { name: "Rahul More", doc: "12th Marksheet", date: "15 Jan", size: "2.1 MB", status: "Pending" },
              { name: "Pooja Bane", doc: "10th Marksheet", date: "16 Jan", size: "0.8 MB", status: "Pending" },
              { name: "Amit Kulkarni", doc: "Caste Certificate", date: "12 Jan", size: "1.5 MB", status: "Verified" },
              { name: "Vishal Shinde", doc: "Domicile Certificate", date: "18 Jan", size: "0.9 MB", status: "Rejected" },
            ].map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{r.name}</td>
                <td>{r.doc}</td>
                <td style={{ color: "#6D28D9" }}>{r.date}</td>
                <td style={{ color: "#6D28D9" }}>{r.size}</td>
                <td><span className={`badge ${r.status === "Verified" ? "badge-success" : r.status === "Rejected" ? "badge-danger" : "badge-warning"}`}>{r.status}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-teal" style={{ fontSize: 11, padding: "4px 10px" }}>Review</button>
                    {r.status === "Pending" && <>
                      <button style={{ fontSize: 11, padding: "4px 10px", background: "#ECFDF5", border: "none", borderRadius: 4, cursor: "pointer", color: "#065F46", fontWeight: 600 }}>Approve</button>
                      <button style={{ fontSize: 11, padding: "4px 10px", background: "#FEF2F2", border: "none", borderRadius: 4, cursor: "pointer", color: "#991B1B", fontWeight: 600 }}>Reject</button>
                    </>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminApplications() {
  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6", marginBottom: 24 }}>Exam Application Management</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[{ l: "Total Applications", v: "1,284", b: "badge-info" }, { l: "Pending", v: "89", b: "badge-warning" }, { l: "Approved", v: "1,103", b: "badge-success" }, { l: "Rejected", v: "92", b: "badge-danger" }].map(s => (
          <div key={s.l} className="stat-card">
            <div style={{ fontSize: 12, color: "#6D28D9", marginBottom: 4 }}>{s.l}</div>
            <div className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6" }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#FFFFFF", borderRadius: 8, border: `1px solid ${"#F5FAFF"}`, overflow: "hidden" }}>
        <table>
          <thead><tr><th>App ID</th><th>Student</th><th>Exam</th><th>College</th><th>Applied</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {[
              { id: "APP-001", name: "Rahul Kulkarni", exam: "JEE Main", college: "COEP Pune", date: "12 Jan", status: "Under Review", b: "badge-info" },
              { id: "APP-002", name: "Amit Kulkarni", exam: "MHT-CET", college: "VJTI Mumbai", date: "12 Jan", status: "Approved", b: "badge-success" },
              { id: "APP-003", name: "Sneha Joshi", exam: "NEET", college: "BJ Medical Pune", date: "14 Jan", status: "Pending Docs", b: "badge-warning" },
              { id: "APP-004", name: "Pooja Bane", exam: "CAT", college: "SIBM Pune", date: "16 Jan", status: "Rejected", b: "badge-danger" },
            ].map(a => (
              <tr key={a.id}>
                <td style={{ fontWeight: 600, color: "#64B5F6", fontSize: 12 }}>{a.id}</td>
                <td style={{ fontWeight: 500 }}>{a.name}</td>
                <td>{a.exam}</td>
                <td>{a.college}</td>
                <td style={{ color: "#6D28D9" }}>{a.date}</td>
                <td><span className={`badge ${a.b}`}>{a.status}</span></td>
                <td><button className="btn-teal" style={{ fontSize: 11, padding: "4px 10px" }}>Manage</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminCounseling() {
  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6", marginBottom: 24 }}>Counseling Management</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        <div className="card" style={{ padding: 22 }}>
          <h3 style={{ fontWeight: 600, marginBottom: 16, fontSize: 15, color: "#64B5F6" }}>Upcoming Sessions</h3>
          {[
            { student: "Rahul Kulkarni", counselor: "Dr. Priya M.", time: "Today, 11:00 AM", type: "Career Counseling" },
            { student: "Sneha Joshi", counselor: "Mr. Arun K.", time: "Today, 2:30 PM", type: "Admission Guidance" },
            { student: "Vishal Shinde", counselor: "Dr. Priya M.", time: "Tomorrow, 10:00 AM", type: "Scholarship Help" },
          ].map(s => (
            <div key={s.student} style={{ border: `1px solid ${"#F5FAFF"}`, borderRadius: 6, padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#64B5F6" }}>{s.student}</div>
              <div style={{ fontSize: 12, color: "#64B5F6" }}>{s.counselor} · {s.type}</div>
              <div style={{ fontSize: 12, color: "#6D28D9" }}>{s.time}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 22 }}>
          <h3 style={{ fontWeight: 600, marginBottom: 16, fontSize: 15, color: "#64B5F6" }}>Counselor Status</h3>
          {[
            { name: "Dr. Priya Mehta", specialty: "Engineering & Architecture", sessions: 24, status: "Online" },
            { name: "Mr. Arun Kumar", specialty: "Medical & Life Sciences", sessions: 18, status: "Online" },
            { name: "Ms. Rekha Patil", specialty: "Management & Law", sessions: 31, status: "Away" },
            { name: "Dr. Sanjay Rao", specialty: "Arts & Science", sessions: 15, status: "Offline" },
          ].map(c => (
            <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${"#F5FAFF"}` }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#64B5F6", color: "#64B5F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{c.name[0]}{c.name.split(" ")[1][0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#64B5F6" }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "#6D28D9" }}>{c.specialty} · {c.sessions} sessions</div>
              </div>
              <span className={`badge ${c.status === "Online" ? "badge-success" : c.status === "Away" ? "badge-warning" : "badge-gray"}`}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminNotifications() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6" }}>Notification Center</h1>
        <button className="btn-primary">+ Send Notification</button>
      </div>
      <div className="card" style={{ marginBottom: 24, padding: 24 }}>
        <h3 style={{ fontWeight: 600, marginBottom: 16, color: "#64B5F6" }}>Send Bulk Notification</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
          <div><label>Target Group</label>
            <select><option>All Students</option><option>Active Students</option><option>Pending Verification</option><option>Engineering Students</option><option>Medical Students</option></select>
          </div>
          <div><label>Notification Type</label>
            <select><option>In-App</option><option>SMS</option><option>Email</option><option>All Channels</option></select>
          </div>
        </div>
        <label>Title</label><input placeholder="Notification title" />
        <label>Message</label><textarea rows={3} placeholder="Enter your message..." style={{ resize: "vertical" }} />
        <button className="btn-primary">Send to 12,418 Students</button>
      </div>
    </div>
  );
}

function AdminReports() {
  const bars = [
    { label: "Engineering", val: 5840, pct: 90 },
    { label: "Medical", val: 3120, pct: 75 },
    { label: "Management", val: 1890, pct: 55 },
    { label: "Law", val: 980, pct: 35 },
    { label: "Architecture", val: 588, pct: 22 },
  ];
  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6", marginBottom: 24 }}>Reports &amp; Analytics</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 600, marginBottom: 20, fontSize: 15, color: "#64B5F6" }}>Admissions by Stream (2024–25)</h3>
          {bars.map(b => (
            <div key={b.label} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: "#64B5F6" }}>{b.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#64B5F6" }}>{b.val.toLocaleString()}</span>
              </div>
              <div style={{ background: "#F5FAFF", borderRadius: 4, height: 8 }}>
                <div style={{ width: `${b.pct}%`, background: "#64B5F6", borderRadius: 4, height: "100%", transition: "width 1s" }} />
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 600, marginBottom: 20, fontSize: 15, color: "#64B5F6" }}>Key Performance Metrics</h3>
          {[
            { label: "Avg. Time to Admission", val: "14.2 days", color: "#64B5F6" },
            { label: "Document Approval Rate", val: "94.3%", color: "#059669" },
            { label: "Student Satisfaction Score", val: "4.8 / 5.0", color: "#64B5F6" },
            { label: "Scholarship Success Rate", val: "67%", color: "#64B5F6" },
            { label: "Counseling Conversion Rate", val: "81%", color: "#7C3AED" },
            { label: "Application Rejection Rate", val: "1.5%", color: "#DC2626" },
          ].map(m => (
            <div key={m.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${"#F5FAFF"}` }}>
              <span style={{ fontSize: 13, color: "#6D28D9" }}>{m.label}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: m.color }}>{m.val}</span>
            </div>
          ))}
          <button className="btn-teal" style={{ marginTop: 16, width: "100%" }}>Export Full Report (PDF)</button>
        </div>
      </div>
    </div>
  );
}

function AdminSettings() {
  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "#64B5F6", marginBottom: 24 }}>Settings</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
        {[
          { title: "Organization Profile", fields: ["Organization Name: Educeff", "Registration No.: U80900MH2015PTC123456", "Email: admin@educeff.com", "Phone: +91 98765 43210"] },
          { title: "Security Settings", fields: ["OTP Validity: 10 minutes", "JWT Expiry: 24 hours", "Max Login Attempts: 5", "Session Timeout: 60 minutes"] },
          { title: "Notification Settings", fields: ["SMS Notifications: Enabled", "Email Notifications: Enabled", "In-App Notifications: Enabled", "Bulk SMS Limit: 500/day"] },
        ].map(s => (
          <div key={s.title} className="card" style={{ padding: 24 }}>
            <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 16, color: "#64B5F6" }}>{s.title}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              {s.fields.map(f => {
                const [k, v] = f.split(": ");
                return (
                  <div key={k} style={{ marginBottom: 14 }}>
                    <label>{k}</label>
                    <input defaultValue={v} />
                  </div>
                );
              })}
            </div>
            <button className="btn-teal">Save {s.title}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGES ───────────────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <div>
      <div style={{ background: "#64B5F6", padding: "64px 0" }}>
        <div className="container">
          <div className="tag">Our Story</div>
          <h1 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em" }}>About Educeff</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, maxWidth: 540, marginTop: 12, lineHeight: 1.7 }}>Founded in Pune, we've been transforming academic dreams into realities since 2015.</p>
        </div>
      </div>
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <h2 className="font-display" style={{ fontSize: 34, fontWeight: 700, color: "#64B5F6", marginBottom: 16 }}>A Decade of Academic Excellence</h2>
              <p style={{ color: "#6D28D9", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
                Educeff was founded in 2015 by a group of education professionals who recognized the overwhelming confusion students and parents face during the admission process in Maharashtra.
              </p>
              <p style={{ color: "#6D28D9", fontSize: 15, lineHeight: 1.8 }}>
                Today, we've guided over 12,000 students into their dream colleges — from premier IITs and NITs to top private institutions across the country. Our certified team of 14 counselors brings together expertise in engineering, medical, law, management, and arts streams.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {STATS.map(s => (
                <div key={s.label} style={{ background: "#64B5F6", borderRadius: 10, padding: 28, textAlign: "center" }}>
                  <div className="font-display" style={{ fontSize: 32, fontWeight: 700, color: "#64B5F6" }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="tag">Our Team</div>
            <h2 className="font-display" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "#64B5F6" }}>Meet Our Expert Counselors</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { name: "Dr. Priya Mehta", role: "Head Counselor — Engineering", exp: "12 years", initials: "PM" },
              { name: "Mr. Arun Kumar", role: "Senior Counselor — Medical", exp: "9 years", initials: "AK" },
              { name: "Ms. Rekha Patil", role: "Counselor — Management & Law", exp: "7 years", initials: "RP" },
              { name: "Dr. Sanjay Rao", role: "Counselor — Arts & Science", exp: "11 years", initials: "SR" },
            ].map(m => (
              <div key={m.name} className="card" style={{ textAlign: "center", padding: 24 }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#64B5F6", color: "#64B5F6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, margin: "0 auto 14px" }}>{m.initials}</div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "#64B5F6" }}>{m.name}</div>
                <div style={{ fontSize: 12, color: "#64B5F6", margin: "4px 0" }}>{m.role}</div>
                <div style={{ fontSize: 12, color: "#6D28D9" }}>{m.exp} experience</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServicesPage() {
  return (
    <div>
      <div style={{ background: "#64B5F6", padding: "64px 0" }}>
        <div className="container">
          <div className="tag">What We Offer</div>
          <h1 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em" }}>Our Services</h1>
        </div>
      </div>
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {SERVICES.map(s => (
              <div key={s.title} className="card" style={{ borderTop: `4px solid ${"#64B5F6"}` }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "#64B5F6", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#6D28D9", lineHeight: 1.8, marginBottom: 20 }}>{s.desc}</p>
                <ul style={{ fontSize: 13, color: "#6D28D9", paddingLeft: 18, lineHeight: 2 }}>
                  <li>Expert professional assistance</li>
                  <li>End-to-end process management</li>
                  <li>Real-time status updates</li>
                  <li>Dedicated relationship manager</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── COUNTDOWN HOOK ──────────────────────────────────────────────────────────
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTimeLeft({ expired: true });
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [targetDate]);
  return timeLeft;
}

function ExamCard({ exam }) {
  const countdown = useCountdown(exam.lastDate);
  const daysLeft = countdown.days;
  const isUrgent = !countdown.expired && daysLeft !== undefined && daysLeft <= 7;
  const isExpired = countdown.expired;

  const streamColors = {
    Engineering: { bg: "#EFF6FF", border: "#BFDBFE", text: "#1D4ED8" },
    Medical: { bg: "#F0FDF4", border: "#BBF7D0", text: "#15803D" },
    Law: { bg: "#FFF7ED", border: "#FED7AA", text: "#C2410C" },
    Management: { bg: "#FDF4FF", border: "#E9D5FF", text: "#7E22CE" },
    Architecture: { bg: "#FFFBEB", border: "#FDE68A", text: "#B45309" },
    Science: { bg: "#F0FDFA", border: "#99F6E4", text: "#0F766E" },
    Commerce: { bg: "#FFF1F2", border: "#FECDD3", text: "#BE123C" },
    Pharmacy: { bg: "#F5F3FF", border: "#DDD6FE", text: "#6D28D9" },
  };
  const sc = streamColors[exam.stream] || { bg: "#F0F7FF", border: "#C8E4FA", text: "#1565C0" };

  return (
    <div className="card" style={{ border: `1px solid ${isUrgent ? "#FCA5A5" : isExpired ? "#E5E7EB" : "#C8E4FA"}`, background: isExpired ? "#FAFAFA" : "#FFFFFF", opacity: isExpired ? 0.7 : 1, position: "relative", overflow: "hidden" }}>
      {isUrgent && !isExpired && (
        <div style={{ position: "absolute", top: 0, right: 0, background: "#DC2626", color: "white", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderBottomLeftRadius: 8 }}>CLOSING SOON</div>
      )}
      {isExpired && (
        <div style={{ position: "absolute", top: 0, right: 0, background: "#6B7280", color: "white", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderBottomLeftRadius: 8 }}>CLOSED</div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: 8, padding: "6px 10px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: sc.text, letterSpacing: "0.05em" }}>{exam.stream}</div>
        </div>
        <div style={{ background: "#F0F7FF", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600, color: exam.level.includes("Govt") ? "#059669" : "#7C3AED" , background: exam.level.includes("Govt") ? "#ECFDF5" : "#F5F3FF" }}>{exam.level}</div>
      </div>

      {/* Exam Name */}
      <h3 style={{ fontWeight: 700, fontSize: 16, color: "#1A1A2E", marginBottom: 4 }}>{exam.name}</h3>
      <p style={{ fontSize: 12, color: "#6D28D9", marginBottom: 14 }}>{exam.fullName}</p>

      {/* Dates */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        <div style={{ background: "#F0F7FF", borderRadius: 6, padding: "8px 10px" }}>
          <div style={{ fontSize: 10, color: "#90CAF9", fontWeight: 600, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>Form Start</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1A2E" }}>{exam.formStart}</div>
        </div>
        <div style={{ background: isUrgent ? "#FEF2F2" : "#F0F7FF", borderRadius: 6, padding: "8px 10px" }}>
          <div style={{ fontSize: 10, color: isUrgent ? "#FCA5A5" : "#90CAF9", fontWeight: 600, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>Last Date</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: isUrgent ? "#DC2626" : "#1A1A2E" }}>{exam.lastDateDisplay}</div>
        </div>
      </div>

      {/* Exam Date */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, padding: "8px 10px", background: "#F8F4FF", borderRadius: 6 }}>
        <span style={{ fontSize: 11, color: "#7C3AED", fontWeight: 600 }}>📅 Exam Date</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#1A1A2E" }}>{exam.examDate}</span>
      </div>

      {/* Countdown Timer */}
      {!isExpired ? (
        <div style={{ background: isUrgent ? "#FEF2F2" : "#EFF6FF", borderRadius: 8, padding: "10px 12px", marginBottom: 14 }}>
          <div style={{ fontSize: 10, color: isUrgent ? "#DC2626" : "#64B5F6", fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>⏱ Time Left to Apply</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {[
              { val: countdown.days, label: "Days" },
              { val: countdown.hours, label: "Hrs" },
              { val: countdown.mins, label: "Min" },
              { val: countdown.secs, label: "Sec" },
            ].map(t => (
              <div key={t.label} style={{ textAlign: "center", background: "white", borderRadius: 6, padding: "4px 8px", minWidth: 42, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: isUrgent ? "#DC2626" : "#64B5F6", lineHeight: 1.2 }}>{String(t.val ?? 0).padStart(2, "0")}</div>
                <div style={{ fontSize: 9, color: "#90CAF9", fontWeight: 600, textTransform: "uppercase" }}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ background: "#F3F4F6", borderRadius: 8, padding: "10px 12px", marginBottom: 14, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>Applications Closed</div>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>Next cycle expected {exam.nextCycle}</div>
        </div>
      )}

      {/* Fee & Mode */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6D28D9", marginBottom: 14 }}>
        <span>💰 Fee: <strong style={{ color: "#1A1A2E" }}>{exam.fee}</strong></span>
        <span>🖥️ Mode: <strong style={{ color: "#1A1A2E" }}>{exam.mode}</strong></span>
      </div>

      {/* Conducting Body */}
      <div style={{ fontSize: 11, color: "#90CAF9", marginBottom: 14 }}>Conducted by: <span style={{ color: "#64B5F6", fontWeight: 600 }}>{exam.conductedBy}</span></div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn-primary" style={{ flex: 1, fontSize: 12, padding: "9px 0", opacity: isExpired ? 0.5 : 1 }}
          onClick={() => !isExpired && window.open(exam.officialLink, "_blank")}>
          {isExpired ? "Closed" : "Apply Now →"}
        </button>
        <button className="btn-teal" style={{ fontSize: 12, padding: "9px 14px" }}
          onClick={() => window.open(exam.officialLink, "_blank")}>
          Info
        </button>
      </div>
    </div>
  );
}

function CollegesPage() {
  const [activeStream, setActiveStream] = useState("All");
  const [activeTab, setActiveTab] = useState("exams");
  const [search, setSearch] = useState("");

  const colleges = [
    // ── ENGINEERING – Maharashtra ──
    { name: "COEP Technological University", city: "Pune", stream: "Engineering", ranking: "#1 Govt. Engineering, Maharashtra", affiliation: "Autonomous", type: "Government" },
    { name: "VJTI Mumbai", city: "Mumbai", stream: "Engineering", ranking: "Top 10 Govt. Engineering, India", affiliation: "University of Mumbai", type: "Government" },
    { name: "MIT College of Engineering", city: "Pune", stream: "Engineering", ranking: "Top 20 Private Engineering", affiliation: "Savitribai Phule Pune Univ.", type: "Private" },
    { name: "Walchand College of Engineering", city: "Sangli", stream: "Engineering", ranking: "Top 5 Govt. Engineering, Maharashtra", affiliation: "Shivaji University", type: "Government" },
    { name: "Government College of Engineering Aurangabad", city: "Aurangabad", stream: "Engineering", ranking: "Top Govt. Engineering, Marathwada", affiliation: "Dr. BAMU", type: "Government" },
    { name: "Pune Institute of Computer Technology", city: "Pune", stream: "Engineering", ranking: "Top Private CS College, Pune", affiliation: "Savitribai Phule Pune Univ.", type: "Private" },
    { name: "Sardar Patel College of Engineering", city: "Mumbai", stream: "Engineering", ranking: "Top Private Engineering, Mumbai", affiliation: "University of Mumbai", type: "Private" },
    { name: "Fr. Conceicao Rodrigues College of Engineering", city: "Mumbai", stream: "Engineering", ranking: "Top Private Engineering, Mumbai", affiliation: "University of Mumbai", type: "Private" },
    { name: "KIT's College of Engineering", city: "Kolhapur", stream: "Engineering", ranking: "Top Engineering, Kolhapur", affiliation: "Shivaji University", type: "Private" },
    { name: "Symbiosis Institute of Technology", city: "Pune", stream: "Engineering", ranking: "Top Private Tech, Pune", affiliation: "SIU", type: "Private" },
    // ── ENGINEERING – National ──
    { name: "IIT Bombay", city: "Mumbai", stream: "Engineering", ranking: "#3 Engineering, India (NIRF)", affiliation: "Autonomous (IIT)", type: "Government" },
    { name: "IIT Delhi", city: "Delhi", stream: "Engineering", ranking: "#2 Engineering, India (NIRF)", affiliation: "Autonomous (IIT)", type: "Government" },
    { name: "NIT Nagpur (VNIT)", city: "Nagpur", stream: "Engineering", ranking: "Top 15 NIT, India", affiliation: "Autonomous (NIT)", type: "Government" },
    { name: "NIT Surathkal", city: "Karnataka", stream: "Engineering", ranking: "Top 10 NIT, India", affiliation: "Autonomous (NIT)", type: "Government" },
    { name: "BITS Pilani", city: "Rajasthan", stream: "Engineering", ranking: "Top 5 Private Engineering, India", affiliation: "Autonomous (BITS)", type: "Private" },
    // ── MEDICAL – Maharashtra ──
    { name: "BJ Medical College", city: "Pune", stream: "Medical", ranking: "#2 Govt. Medical, Maharashtra", affiliation: "MUHS", type: "Government" },
    { name: "Grant Medical College", city: "Mumbai", stream: "Medical", ranking: "#1 Govt. Medical, Maharashtra", affiliation: "University of Mumbai", type: "Government" },
    { name: "Seth GS Medical College", city: "Mumbai", stream: "Medical", ranking: "Top 5 Medical, India", affiliation: "University of Mumbai", type: "Government" },
    { name: "Nagpur Government Medical College", city: "Nagpur", stream: "Medical", ranking: "Top Govt. Medical, Vidarbha", affiliation: "MUHS", type: "Government" },
    { name: "D.Y. Patil Medical College", city: "Pune", stream: "Medical", ranking: "Top Private Medical, Pune", affiliation: "DPU", type: "Private" },
    { name: "Krishna Institute of Medical Sciences", city: "Karad", stream: "Medical", ranking: "Top Private Medical, Maharashtra", affiliation: "Krishna University", type: "Private" },
    // ── MEDICAL – National ──
    { name: "AIIMS New Delhi", city: "Delhi", stream: "Medical", ranking: "#1 Medical, India (NIRF)", affiliation: "Autonomous (AIIMS)", type: "Government" },
    { name: "AIIMS Nagpur", city: "Nagpur", stream: "Medical", ranking: "Top AIIMS, Central India", affiliation: "Autonomous (AIIMS)", type: "Government" },
    { name: "CMC Vellore", city: "Tamil Nadu", stream: "Medical", ranking: "Top 3 Medical, India", affiliation: "Autonomous", type: "Private" },
    { name: "Kasturba Medical College", city: "Manipal", stream: "Medical", ranking: "Top 10 Private Medical, India", affiliation: "Manipal University", type: "Private" },
    // ── LAW – Maharashtra ──
    { name: "Symbiosis Law School", city: "Pune", stream: "Law", ranking: "Top 5 Law Colleges, India", affiliation: "SIU", type: "Private" },
    { name: "ILS Law College", city: "Pune", stream: "Law", ranking: "Top Govt. Law, Maharashtra", affiliation: "Savitribai Phule Pune Univ.", type: "Government" },
    { name: "Government Law College Mumbai", city: "Mumbai", stream: "Law", ranking: "#1 Govt. Law, Maharashtra", affiliation: "University of Mumbai", type: "Government" },
    { name: "Maharashtra National Law University", city: "Mumbai", stream: "Law", ranking: "Top NLU, Maharashtra", affiliation: "Autonomous (NLU)", type: "Government" },
    // ── LAW – National ──
    { name: "NLSIU Bangalore", city: "Bangalore", stream: "Law", ranking: "#1 Law, India (NIRF)", affiliation: "Autonomous (NLU)", type: "Government" },
    { name: "NLU Delhi", city: "Delhi", stream: "Law", ranking: "#2 Law, India (NIRF)", affiliation: "Autonomous (NLU)", type: "Government" },
    { name: "NALSAR Hyderabad", city: "Hyderabad", stream: "Law", ranking: "#3 Law, India (NIRF)", affiliation: "Autonomous (NLU)", type: "Government" },
    // ── MANAGEMENT – Maharashtra ──
    { name: "IIM Nagpur", city: "Nagpur", stream: "Management", ranking: "IIM — CAT cutoff 90+", affiliation: "Autonomous (IIM)", type: "Government" },
    { name: "Symbiosis Institute of Business Management", city: "Pune", stream: "Management", ranking: "Top 10 MBA, India", affiliation: "SIU", type: "Private" },
    { name: "Jamnalal Bajaj Institute of Management", city: "Mumbai", stream: "Management", ranking: "Top 5 MBA, Maharashtra", affiliation: "University of Mumbai", type: "Government" },
    { name: "Prin. L. N. Welingkar Institute", city: "Mumbai", stream: "Management", ranking: "Top Private MBA, Mumbai", affiliation: "University of Mumbai", type: "Private" },
    { name: "PUMBA – Pune University MBA", city: "Pune", stream: "Management", ranking: "Top Govt. MBA, Pune", affiliation: "Savitribai Phule Pune Univ.", type: "Government" },
    // ── MANAGEMENT – National ──
    { name: "IIM Ahmedabad", city: "Ahmedabad", stream: "Management", ranking: "#1 Management, India (NIRF)", affiliation: "Autonomous (IIM)", type: "Government" },
    { name: "IIM Bangalore", city: "Bangalore", stream: "Management", ranking: "#2 Management, India (NIRF)", affiliation: "Autonomous (IIM)", type: "Government" },
    { name: "IIM Calcutta", city: "Kolkata", stream: "Management", ranking: "#3 Management, India (NIRF)", affiliation: "Autonomous (IIM)", type: "Government" },
    { name: "FMS Delhi", city: "Delhi", stream: "Management", ranking: "Top 5 MBA, India", affiliation: "University of Delhi", type: "Government" },
    // ── ARCHITECTURE ──
    { name: "Sir JJ College of Architecture", city: "Mumbai", stream: "Architecture", ranking: "#1 Architecture, Maharashtra", affiliation: "University of Mumbai", type: "Government" },
    { name: "Rachana Sansad Academy of Architecture", city: "Mumbai", stream: "Architecture", ranking: "Top 5 Architecture, India", affiliation: "Autonomous", type: "Private" },
    { name: "BKPS College of Architecture", city: "Pune", stream: "Architecture", ranking: "Top Architecture, Pune", affiliation: "Savitribai Phule Pune Univ.", type: "Private" },
    { name: "CEPT University", city: "Ahmedabad", stream: "Architecture", ranking: "#1 Architecture, India (NIRF)", affiliation: "Autonomous", type: "Private" },
    // ── SCIENCE & COMMERCE ──
    { name: "Fergusson College", city: "Pune", stream: "Science", ranking: "Top Arts & Science, Pune", affiliation: "Savitribai Phule Pune Univ.", type: "Autonomous" },
    { name: "St. Xavier's College", city: "Mumbai", stream: "Science", ranking: "Top Science College, Mumbai", affiliation: "University of Mumbai", type: "Autonomous" },
    { name: "Ruparel College", city: "Mumbai", stream: "Science", ranking: "Top Science, South Mumbai", affiliation: "University of Mumbai", type: "Autonomous" },
    { name: "Elphinstone College", city: "Mumbai", stream: "Commerce", ranking: "Top Commerce, Mumbai", affiliation: "University of Mumbai", type: "Autonomous" },
    { name: "H.R. College of Commerce & Economics", city: "Mumbai", stream: "Commerce", ranking: "Top Commerce, India", affiliation: "University of Mumbai", type: "Autonomous" },
    { name: "Sydenham College of Commerce", city: "Mumbai", stream: "Commerce", ranking: "Top Govt. Commerce, Maharashtra", affiliation: "University of Mumbai", type: "Government" },
    // ── PHARMACY ──
    { name: "Bombay College of Pharmacy", city: "Mumbai", stream: "Pharmacy", ranking: "#1 Pharmacy, Maharashtra", affiliation: "University of Mumbai", type: "Autonomous" },
    { name: "Poona College of Pharmacy", city: "Pune", stream: "Pharmacy", ranking: "Top Pharmacy, Pune", affiliation: "Savitribai Phule Pune Univ.", type: "Private" },
    { name: "JSS College of Pharmacy", city: "Mysore", stream: "Pharmacy", ranking: "Top 5 Pharmacy, India", affiliation: "JSS University", type: "Private" },
    // ── ENGINEERING – Additional Maharashtra ──
    { name: "Government College of Engineering Pune", city: "Pune", stream: "Engineering", ranking: "Top Govt. Engineering, Pune", affiliation: "Savitribai Phule Pune Univ.", type: "Government" },
    { name: "Vishwakarma Institute of Technology", city: "Pune", stream: "Engineering", ranking: "Top Private Engineering, Pune", affiliation: "Savitribai Phule Pune Univ.", type: "Private" },
    { name: "Shri Guru Gobind Singhji Institute", city: "Nanded", stream: "Engineering", ranking: "Top Govt. Engineering, Marathwada", affiliation: "SRTMUN", type: "Government" },
    { name: "Maharashtra Institute of Technology", city: "Aurangabad", stream: "Engineering", ranking: "Top Private Engineering, Aurangabad", affiliation: "Dr. BAMU", type: "Private" },
    { name: "Pune Vidyarthi Griha College of Engineering", city: "Pune", stream: "Engineering", ranking: "Top Engineering, Pune", affiliation: "Savitribai Phule Pune Univ.", type: "Private" },
    { name: "Cummins College of Engineering", city: "Pune", stream: "Engineering", ranking: "Top Women Engineering College, India", affiliation: "Savitribai Phule Pune Univ.", type: "Private" },
    { name: "DY Patil College of Engineering", city: "Pune", stream: "Engineering", ranking: "Top Private Engineering, Pune", affiliation: "Savitribai Phule Pune Univ.", type: "Private" },
    { name: "Sinhgad College of Engineering", city: "Pune", stream: "Engineering", ranking: "Popular Engineering, Pune", affiliation: "Savitribai Phule Pune Univ.", type: "Private" },
    // ── ENGINEERING – Additional National ──
    { name: "IIT Madras", city: "Chennai", stream: "Engineering", ranking: "#1 Engineering, India (NIRF)", affiliation: "Autonomous (IIT)", type: "Government" },
    { name: "IIT Kharagpur", city: "West Bengal", stream: "Engineering", ranking: "#5 Engineering, India (NIRF)", affiliation: "Autonomous (IIT)", type: "Government" },
    { name: "IIT Kanpur", city: "Kanpur", stream: "Engineering", ranking: "#4 Engineering, India (NIRF)", affiliation: "Autonomous (IIT)", type: "Government" },
    { name: "IIT Roorkee", city: "Roorkee", stream: "Engineering", ranking: "#7 Engineering, India (NIRF)", affiliation: "Autonomous (IIT)", type: "Government" },
    { name: "IIT Hyderabad", city: "Hyderabad", stream: "Engineering", ranking: "Top 10 IIT, India", affiliation: "Autonomous (IIT)", type: "Government" },
    { name: "IIT Pune (COEP)", city: "Pune", stream: "Engineering", ranking: "#1 Govt. Engineering, Maharashtra", affiliation: "Autonomous", type: "Government" },
    { name: "NIT Trichy", city: "Tamil Nadu", stream: "Engineering", ranking: "#8 NIT, India (NIRF)", affiliation: "Autonomous (NIT)", type: "Government" },
    { name: "NIT Warangal", city: "Telangana", stream: "Engineering", ranking: "#5 NIT, India (NIRF)", affiliation: "Autonomous (NIT)", type: "Government" },
    { name: "NIT Calicut", city: "Kerala", stream: "Engineering", ranking: "#6 NIT, India (NIRF)", affiliation: "Autonomous (NIT)", type: "Government" },
    { name: "VIT Vellore", city: "Vellore", stream: "Engineering", ranking: "Top 5 Private Engineering, India", affiliation: "VIT University", type: "Private" },
    { name: "SRM Institute of Science", city: "Chennai", stream: "Engineering", ranking: "Top 10 Private Engineering, India", affiliation: "SRM University", type: "Private" },
    { name: "Thapar Institute", city: "Patiala", stream: "Engineering", ranking: "Top 15 Engineering, India", affiliation: "Autonomous", type: "Private" },
    { name: "PES University", city: "Bangalore", stream: "Engineering", ranking: "Top Private Engineering, Bangalore", affiliation: "Autonomous", type: "Private" },
    { name: "RV College of Engineering", city: "Bangalore", stream: "Engineering", ranking: "Top Private Engineering, Karnataka", affiliation: "VTU", type: "Private" },
    { name: "BMS College of Engineering", city: "Bangalore", stream: "Engineering", ranking: "Top Private Engineering, Bangalore", affiliation: "VTU", type: "Autonomous" },
    { name: "Amity University", city: "Noida", stream: "Engineering", ranking: "Top Private University, North India", affiliation: "Autonomous", type: "Private" },
    { name: "Chandigarh University", city: "Chandigarh", stream: "Engineering", ranking: "Top Private University, Punjab", affiliation: "Autonomous", type: "Private" },
    { name: "LPU - Lovely Professional University", city: "Punjab", stream: "Engineering", ranking: "Top Private University, North India", affiliation: "Autonomous", type: "Private" },
    // ── MEDICAL – Additional ──
    { name: "Maulana Azad Medical College", city: "Delhi", stream: "Medical", ranking: "Top Govt. Medical, Delhi", affiliation: "University of Delhi", type: "Government" },
    { name: "Lady Hardinge Medical College", city: "Delhi", stream: "Medical", ranking: "Top Women Medical, India", affiliation: "University of Delhi", type: "Government" },
    { name: "King George Medical University", city: "Lucknow", stream: "Medical", ranking: "Top Govt. Medical, UP", affiliation: "Autonomous", type: "Government" },
    { name: "Madras Medical College", city: "Chennai", stream: "Medical", ranking: "Top Govt. Medical, Tamil Nadu", affiliation: "Tamil Nadu MGR Univ.", type: "Government" },
    { name: "Amrita School of Medicine", city: "Coimbatore", stream: "Medical", ranking: "Top Private Medical, South India", affiliation: "Amrita University", type: "Private" },
    { name: "Sri Ramachandra Medical College", city: "Chennai", stream: "Medical", ranking: "Top Private Medical, Tamil Nadu", affiliation: "SRMC University", type: "Private" },
    { name: "Jawaharlal Nehru Medical College", city: "Belgaum", stream: "Medical", ranking: "Top Medical, Karnataka", affiliation: "KLE University", type: "Private" },
    // ── LAW – Additional ──
    { name: "Gujarat National Law University", city: "Gandhinagar", stream: "Law", ranking: "Top NLU, West India", affiliation: "Autonomous (NLU)", type: "Government" },
    { name: "Rajiv Gandhi National Law University", city: "Patiala", stream: "Law", ranking: "Top NLU, North India", affiliation: "Autonomous (NLU)", type: "Government" },
    { name: "National Law University Jodhpur", city: "Jodhpur", stream: "Law", ranking: "Top 5 NLU, India", affiliation: "Autonomous (NLU)", type: "Government" },
    { name: "Hidayatullah National Law University", city: "Raipur", stream: "Law", ranking: "Top NLU, Central India", affiliation: "Autonomous (NLU)", type: "Government" },
    { name: "School of Law, Christ University", city: "Bangalore", stream: "Law", ranking: "Top Private Law, South India", affiliation: "Christ University", type: "Private" },
    // ── MANAGEMENT – Additional ──
    { name: "IIM Lucknow", city: "Lucknow", stream: "Management", ranking: "Top 5 IIM, India", affiliation: "Autonomous (IIM)", type: "Government" },
    { name: "IIM Kozhikode", city: "Kozhikode", stream: "Management", ranking: "Top 7 IIM, India", affiliation: "Autonomous (IIM)", type: "Government" },
    { name: "IIM Indore", city: "Indore", stream: "Management", ranking: "Top 6 IIM, India", affiliation: "Autonomous (IIM)", type: "Government" },
    { name: "SPJIMR Mumbai", city: "Mumbai", stream: "Management", ranking: "Top 5 MBA, India", affiliation: "S.P. Jain Institute", type: "Private" },
    { name: "MDI Gurgaon", city: "Gurgaon", stream: "Management", ranking: "Top 10 MBA, India", affiliation: "Autonomous", type: "Private" },
    { name: "IMT Ghaziabad", city: "Ghaziabad", stream: "Management", ranking: "Top 15 MBA, India", affiliation: "Autonomous", type: "Private" },
    { name: "Great Lakes Institute", city: "Chennai", stream: "Management", ranking: "Top MBA, South India", affiliation: "Autonomous", type: "Private" },
    { name: "XIMB - Xavier Institute", city: "Bhubaneswar", stream: "Management", ranking: "Top 15 MBA, India", affiliation: "Xavier University", type: "Private" },
    { name: "KJ Somaiya Institute of Management", city: "Mumbai", stream: "Management", ranking: "Top MBA, Mumbai", affiliation: "Somaiya University", type: "Private" },
    // ── SCIENCE – Additional ──
    { name: "Indian Institute of Science", city: "Bangalore", stream: "Science", ranking: "#1 Research University, India (NIRF)", affiliation: "Autonomous (IISc)", type: "Government" },
    { name: "Tata Institute of Fundamental Research", city: "Mumbai", stream: "Science", ranking: "Top Research Institute, India", affiliation: "Autonomous (TIFR)", type: "Government" },
    { name: "IISER Pune", city: "Pune", stream: "Science", ranking: "Top Science Research, India", affiliation: "Autonomous (IISER)", type: "Government" },
    { name: "IISER Kolkata", city: "Kolkata", stream: "Science", ranking: "Top Science Research, India", affiliation: "Autonomous (IISER)", type: "Government" },
    { name: "Miranda House", city: "Delhi", stream: "Science", ranking: "#1 College, India (NIRF)", affiliation: "University of Delhi", type: "Government" },
    { name: "Presidency College", city: "Chennai", stream: "Science", ranking: "Top Govt. Science, Tamil Nadu", affiliation: "University of Madras", type: "Government" },
    { name: "Loyola College", city: "Chennai", stream: "Science", ranking: "Top Private Science, South India", affiliation: "University of Madras", type: "Private" },
    // ── COMMERCE – Additional ──
    { name: "Shri Ram College of Commerce", city: "Delhi", stream: "Commerce", ranking: "#1 Commerce, India (NIRF)", affiliation: "University of Delhi", type: "Government" },
    { name: "Lady Shri Ram College", city: "Delhi", stream: "Commerce", ranking: "Top Women Commerce, India", affiliation: "University of Delhi", type: "Government" },
    { name: "Narsee Monjee College", city: "Mumbai", stream: "Commerce", ranking: "Top Commerce, Mumbai", affiliation: "University of Mumbai", type: "Autonomous" },
    { name: "St. Xavier College Commerce", city: "Kolkata", stream: "Commerce", ranking: "Top Commerce, Kolkata", affiliation: "University of Calcutta", type: "Autonomous" },
    // ── ARCHITECTURE – Additional ──
    { name: "School of Planning and Architecture", city: "Delhi", stream: "Architecture", ranking: "#2 Architecture, India (NIRF)", affiliation: "Autonomous (SPA)", type: "Government" },
    { name: "School of Planning and Architecture", city: "Bhopal", stream: "Architecture", ranking: "Top Architecture, Central India", affiliation: "Autonomous (SPA)", type: "Government" },
    { name: "Faculty of Architecture, Manipal", city: "Manipal", stream: "Architecture", ranking: "Top Private Architecture, India", affiliation: "Manipal University", type: "Private" },
    { name: "Kamla Raheja College of Architecture", city: "Mumbai", stream: "Architecture", ranking: "Top Private Architecture, Mumbai", affiliation: "University of Mumbai", type: "Private" },
  ];

  const EXAMS = [
    // ── ENGINEERING – National Government ──
    { name: "JEE Main", fullName: "Joint Entrance Examination Main", stream: "Engineering", level: "Govt · National", formStart: "Nov 2025", lastDateDisplay: "Dec 31, 2025", lastDate: "2025-12-31", examDate: "Jan–Apr 2026", fee: "₹1,000", mode: "Online (CBT)", conductedBy: "NTA", nextCycle: "Nov 2026", officialLink: "https://jeemain.nta.nic.in" },
    { name: "JEE Advanced", fullName: "Joint Entrance Examination Advanced", stream: "Engineering", level: "Govt · National", formStart: "Apr 2026", lastDateDisplay: "May 4, 2026", lastDate: "2026-05-04", examDate: "May 18, 2026", fee: "₹3,500", mode: "Online (CBT)", conductedBy: "IIT Delhi", nextCycle: "Apr 2027", officialLink: "https://jeeadv.ac.in" },
    { name: "GATE", fullName: "Graduate Aptitude Test in Engineering", stream: "Engineering", level: "Govt · National", formStart: "Aug 2025", lastDateDisplay: "Oct 3, 2025", lastDate: "2025-10-03", examDate: "Feb 2026", fee: "₹1,800", mode: "Online (CBT)", conductedBy: "IIT Roorkee", nextCycle: "Aug 2026", officialLink: "https://gate2026.iitr.ac.in" },
    { name: "BITSAT", fullName: "BITS Admission Test", stream: "Engineering", level: "Private · National", formStart: "Jan 2026", lastDateDisplay: "Apr 20, 2026", lastDate: "2026-04-20", examDate: "May–Jun 2026", fee: "₹3,500", mode: "Online (CBT)", conductedBy: "BITS Pilani", nextCycle: "Jan 2027", officialLink: "https://www.bitsadmission.com" },
    { name: "VITEEE", fullName: "VIT Engineering Entrance Examination", stream: "Engineering", level: "Private · National", formStart: "Nov 2025", lastDateDisplay: "Mar 31, 2026", lastDate: "2026-03-31", examDate: "Apr 2026", fee: "₹1,350", mode: "Online (CBT)", conductedBy: "VIT University", nextCycle: "Nov 2026", officialLink: "https://viteee.vit.ac.in" },
    { name: "SRMJEEE", fullName: "SRM Joint Engineering Entrance Exam", stream: "Engineering", level: "Private · National", formStart: "Nov 2025", lastDateDisplay: "Apr 10, 2026", lastDate: "2026-04-10", examDate: "Apr–May 2026", fee: "₹1,100", mode: "Online (CBT)", conductedBy: "SRM University", nextCycle: "Nov 2026", officialLink: "https://www.srmist.edu.in" },
    { name: "WBJEE", fullName: "West Bengal Joint Entrance Examination", stream: "Engineering", level: "Govt · State", formStart: "Dec 2025", lastDateDisplay: "Jan 20, 2026", lastDate: "2026-01-20", examDate: "Apr 2026", fee: "₹500", mode: "Offline (OMR)", conductedBy: "WBJEEB", nextCycle: "Dec 2026", officialLink: "https://wbjeeb.nic.in" },
    { name: "KCET", fullName: "Karnataka Common Entrance Test", stream: "Engineering", level: "Govt · State", formStart: "Jan 2026", lastDateDisplay: "Mar 5, 2026", lastDate: "2026-03-05", examDate: "Apr 2026", fee: "₹500", mode: "Offline (OMR)", conductedBy: "KEA Karnataka", nextCycle: "Jan 2027", officialLink: "https://kea.kar.nic.in" },
    { name: "MHT-CET", fullName: "Maharashtra Common Entrance Test", stream: "Engineering", level: "Govt · State", formStart: "Jan 2026", lastDateDisplay: "Mar 15, 2026", lastDate: "2026-03-15", examDate: "Apr–May 2026", fee: "₹800", mode: "Online (CBT)", conductedBy: "State CET Cell", nextCycle: "Jan 2027", officialLink: "https://cetcell.mahacet.org" },
    { name: "COMEDK", fullName: "Consortium of Medical Engineering Dental Colleges", stream: "Engineering", level: "Private · State", formStart: "Jan 2026", lastDateDisplay: "Apr 10, 2026", lastDate: "2026-04-10", examDate: "May 2026", fee: "₹1,800", mode: "Online (CBT)", conductedBy: "COMEDK", nextCycle: "Jan 2027", officialLink: "https://comedk.org" },
    { name: "GUJCET", fullName: "Gujarat Common Entrance Test", stream: "Engineering", level: "Govt · State", formStart: "Jan 2026", lastDateDisplay: "Feb 28, 2026", lastDate: "2026-02-28", examDate: "Mar 2026", fee: "₹300", mode: "Offline (OMR)", conductedBy: "GSEB", nextCycle: "Jan 2027", officialLink: "https://gujcet.gseb.org" },
    { name: "AP EAMCET", fullName: "Andhra Pradesh Engineering Agriculture Medical CET", stream: "Engineering", level: "Govt · State", formStart: "Jan 2026", lastDateDisplay: "Mar 20, 2026", lastDate: "2026-03-20", examDate: "May 2026", fee: "₹700", mode: "Online (CBT)", conductedBy: "JNTU Kakinada", nextCycle: "Jan 2027", officialLink: "https://sche.ap.gov.in/eamcet" },
    { name: "UPSEE", fullName: "Uttar Pradesh State Entrance Examination", stream: "Engineering", level: "Govt · State", formStart: "Feb 2026", lastDateDisplay: "Apr 5, 2026", lastDate: "2026-04-05", examDate: "May 2026", fee: "₹1,300", mode: "Online (CBT)", conductedBy: "AKTU Lucknow", nextCycle: "Feb 2027", officialLink: "https://upsee.nic.in" },
    { name: "Manipal MET", fullName: "Manipal Entrance Test", stream: "Engineering", level: "Private · National", formStart: "Oct 2025", lastDateDisplay: "Apr 15, 2026", lastDate: "2026-04-15", examDate: "Apr–May 2026", fee: "₹1,800", mode: "Online (CBT)", conductedBy: "Manipal University", nextCycle: "Oct 2026", officialLink: "https://manipal.edu/met" },
    { name: "KIITEE", fullName: "KIIT Entrance Examination", stream: "Engineering", level: "Private · National", formStart: "Nov 2025", lastDateDisplay: "Mar 31, 2026", lastDate: "2026-03-31", examDate: "Apr 2026", fee: "₹1,350", mode: "Online (CBT)", conductedBy: "KIIT University", nextCycle: "Nov 2026", officialLink: "https://kiitee.kiit.ac.in" },
    // ── MEDICAL – National Government ──
    { name: "NEET UG", fullName: "National Eligibility cum Entrance Test UG", stream: "Medical", level: "Govt · National", formStart: "Feb 2026", lastDateDisplay: "Mar 7, 2026", lastDate: "2026-03-07", examDate: "May 3, 2026", fee: "₹1,700", mode: "Offline (OMR)", conductedBy: "NTA", nextCycle: "Feb 2027", officialLink: "https://neet.nta.nic.in" },
    { name: "NEET PG", fullName: "National Eligibility cum Entrance Test PG", stream: "Medical", level: "Govt · National", formStart: "Dec 2025", lastDateDisplay: "Jan 15, 2026", lastDate: "2026-01-15", examDate: "Mar 2026", fee: "₹4,250", mode: "Online (CBT)", conductedBy: "NBE", nextCycle: "Dec 2026", officialLink: "https://nbe.edu.in" },
    { name: "AIIMS MBBS", fullName: "AIIMS MBBS Entrance (via NEET)", stream: "Medical", level: "Govt · National", formStart: "Feb 2026", lastDateDisplay: "Mar 7, 2026", lastDate: "2026-03-07", examDate: "May 3, 2026", fee: "₹1,700", mode: "Offline (OMR)", conductedBy: "NTA / AIIMS", nextCycle: "Feb 2027", officialLink: "https://aiimsexams.ac.in" },
    { name: "FMGE", fullName: "Foreign Medical Graduate Examination", stream: "Medical", level: "Govt · National", formStart: "Mar 2026", lastDateDisplay: "Apr 30, 2026", lastDate: "2026-04-30", examDate: "Jun 2026", fee: "₹5,000", mode: "Online (CBT)", conductedBy: "NBE", nextCycle: "Mar 2027", officialLink: "https://nbe.edu.in/fmge" },
    { name: "JIPMER MBBS", fullName: "JIPMER MBBS Entrance (via NEET)", stream: "Medical", level: "Govt · National", formStart: "Feb 2026", lastDateDisplay: "Mar 7, 2026", lastDate: "2026-03-07", examDate: "May 3, 2026", fee: "₹1,700", mode: "Offline (OMR)", conductedBy: "NTA", nextCycle: "Feb 2027", officialLink: "https://jipmer.edu.in" },
    { name: "CMC Vellore", fullName: "Christian Medical College Vellore Entrance", stream: "Medical", level: "Private · National", formStart: "Jan 2026", lastDateDisplay: "Feb 28, 2026", lastDate: "2026-02-28", examDate: "May 2026", fee: "₹1,000", mode: "Online (CBT)", conductedBy: "CMC Vellore", nextCycle: "Jan 2027", officialLink: "https://admissions.cmcvellore.ac.in" },
    { name: "MAHE Manipal", fullName: "Manipal Academy MBBS Entrance", stream: "Medical", level: "Private · National", formStart: "Nov 2025", lastDateDisplay: "Apr 10, 2026", lastDate: "2026-04-10", examDate: "Apr–May 2026", fee: "₹1,800", mode: "Online (CBT)", conductedBy: "Manipal University", nextCycle: "Nov 2026", officialLink: "https://manipal.edu" },
    // ── LAW ──
    { name: "CLAT", fullName: "Common Law Admission Test", stream: "Law", level: "Govt · National", formStart: "Aug 2025", lastDateDisplay: "Oct 15, 2025", lastDate: "2025-10-15", examDate: "Dec 1, 2025", fee: "₹4,000", mode: "Online (CBT)", conductedBy: "Consortium of NLUs", nextCycle: "Aug 2026", officialLink: "https://consortiumofnlus.ac.in" },
    { name: "AILET", fullName: "All India Law Entrance Test", stream: "Law", level: "Govt · National", formStart: "Nov 2025", lastDateDisplay: "Jan 31, 2026", lastDate: "2026-01-31", examDate: "Mar 2026", fee: "₹3,316", mode: "Online (CBT)", conductedBy: "NLU Delhi", nextCycle: "Nov 2026", officialLink: "https://nationallawuniversitydelhi.in" },
    { name: "MHCET Law", fullName: "Maharashtra Law Common Entrance Test", stream: "Law", level: "Govt · State", formStart: "Feb 2026", lastDateDisplay: "Mar 25, 2026", lastDate: "2026-03-25", examDate: "May 2026", fee: "₹800", mode: "Online (CBT)", conductedBy: "State CET Cell", nextCycle: "Feb 2027", officialLink: "https://cetcell.mahacet.org" },
    { name: "LSAT India", fullName: "Law School Admission Test India", stream: "Law", level: "Private · National", formStart: "Oct 2025", lastDateDisplay: "Jan 10, 2026", lastDate: "2026-01-10", examDate: "Jan 2026", fee: "₹3,999", mode: "Online (CBT)", conductedBy: "Pearson VUE", nextCycle: "Oct 2026", officialLink: "https://discoverlaw.in" },
    { name: "SLAT", fullName: "Symbiosis Law Admission Test", stream: "Law", level: "Private · National", formStart: "Nov 2025", lastDateDisplay: "Jan 20, 2026", lastDate: "2026-01-20", examDate: "May 2026", fee: "₹2,000", mode: "Online (CBT)", conductedBy: "Symbiosis International", nextCycle: "Nov 2026", officialLink: "https://slat.set-test.org" },
    { name: "ILICAT", fullName: "ILI Common Admission Test", stream: "Law", level: "Govt · National", formStart: "Mar 2026", lastDateDisplay: "Apr 30, 2026", lastDate: "2026-04-30", examDate: "Jun 2026", fee: "₹1,500", mode: "Online (CBT)", conductedBy: "Indian Law Institute", nextCycle: "Mar 2027", officialLink: "https://ili.ac.in" },
    // ── MANAGEMENT ──
    { name: "CAT", fullName: "Common Admission Test", stream: "Management", level: "Govt · National", formStart: "Aug 2026", lastDateDisplay: "Sep 13, 2026", lastDate: "2026-09-13", examDate: "Nov 2026", fee: "₹2,400", mode: "Online (CBT)", conductedBy: "IIMs", nextCycle: "Aug 2026", officialLink: "https://iimcat.ac.in" },
    { name: "MAH-MBA-CET", fullName: "Maharashtra MBA Common Entrance Test", stream: "Management", level: "Govt · State", formStart: "Jan 2026", lastDateDisplay: "Feb 28, 2026", lastDate: "2026-02-28", examDate: "Mar 2026", fee: "₹1,000", mode: "Online (CBT)", conductedBy: "State CET Cell", nextCycle: "Jan 2027", officialLink: "https://cetcell.mahacet.org" },
    { name: "SNAP", fullName: "Symbiosis National Aptitude Test", stream: "Management", level: "Private · National", formStart: "Aug 2026", lastDateDisplay: "Nov 24, 2026", lastDate: "2026-11-24", examDate: "Dec 2026", fee: "₹2,250", mode: "Online (CBT)", conductedBy: "Symbiosis International", nextCycle: "Aug 2026", officialLink: "https://www.snaptest.org" },
    { name: "XAT", fullName: "Xavier Aptitude Test", stream: "Management", level: "Private · National", formStart: "Jul 2025", lastDateDisplay: "Nov 30, 2025", lastDate: "2025-11-30", examDate: "Jan 5, 2026", fee: "₹2,200", mode: "Online (CBT)", conductedBy: "XLRI Jamshedpur", nextCycle: "Jul 2026", officialLink: "https://xatonline.in" },
    { name: "IIFT", fullName: "Indian Institute of Foreign Trade MBA", stream: "Management", level: "Govt · National", formStart: "Aug 2025", lastDateDisplay: "Oct 10, 2025", lastDate: "2025-10-10", examDate: "Dec 2025", fee: "₹2,500", mode: "Online (CBT)", conductedBy: "NTA / IIFT", nextCycle: "Aug 2026", officialLink: "https://iift.nta.nic.in" },
    { name: "NMAT", fullName: "NMIMS Management Aptitude Test", stream: "Management", level: "Private · National", formStart: "Jul 2025", lastDateDisplay: "Oct 10, 2025", lastDate: "2025-10-10", examDate: "Oct–Dec 2025", fee: "₹2,800", mode: "Online (CBT)", conductedBy: "GMAC / NMIMS", nextCycle: "Jul 2026", officialLink: "https://www.nmat.org" },
    { name: "CMAT", fullName: "Common Management Admission Test", stream: "Management", level: "Govt · National", formStart: "Nov 2025", lastDateDisplay: "Dec 20, 2025", lastDate: "2025-12-20", examDate: "Jan 2026", fee: "₹2,000", mode: "Online (CBT)", conductedBy: "NTA", nextCycle: "Nov 2026", officialLink: "https://cmat.nta.nic.in" },
    { name: "MAT", fullName: "Management Aptitude Test", stream: "Management", level: "Private · National", formStart: "Quarterly", lastDateDisplay: "Rolling Dates", lastDate: "2026-12-31", examDate: "Quarterly 2026", fee: "₹1,990", mode: "Online + Offline", conductedBy: "AIMA", nextCycle: "Quarterly", officialLink: "https://mat.aima.in" },
    { name: "TISSNET", fullName: "TISS National Entrance Test", stream: "Management", level: "Govt · National", formStart: "Nov 2025", lastDateDisplay: "Dec 20, 2025", lastDate: "2025-12-20", examDate: "Jan 2026", fee: "₹1,030", mode: "Online (CBT)", conductedBy: "TISS Mumbai", nextCycle: "Nov 2026", officialLink: "https://tiss.edu" },
    // ── ARCHITECTURE ──
    { name: "NATA", fullName: "National Aptitude Test in Architecture", stream: "Architecture", level: "Govt · National", formStart: "Jan 2026", lastDateDisplay: "Feb 20, 2026", lastDate: "2026-02-20", examDate: "Apr 2026", fee: "₹2,000", mode: "Online + Offline", conductedBy: "COA", nextCycle: "Jan 2027", officialLink: "https://nata.in" },
    { name: "JEE Main Paper 2", fullName: "JEE Main Paper 2 (B.Arch)", stream: "Architecture", level: "Govt · National", formStart: "Nov 2025", lastDateDisplay: "Dec 31, 2025", lastDate: "2025-12-31", examDate: "Jan–Apr 2026", fee: "₹1,000", mode: "Online + Offline", conductedBy: "NTA", nextCycle: "Nov 2026", officialLink: "https://jeemain.nta.nic.in" },
    { name: "CEED", fullName: "Common Entrance Exam for Design", stream: "Architecture", level: "Govt · National", formStart: "Sep 2025", lastDateDisplay: "Oct 20, 2025", lastDate: "2025-10-20", examDate: "Jan 2026", fee: "₹3,000", mode: "Online (CBT)", conductedBy: "IIT Bombay", nextCycle: "Sep 2026", officialLink: "https://ceed.iitb.ac.in" },
    { name: "NID DAT", fullName: "National Institute of Design Aptitude Test", stream: "Architecture", level: "Govt · National", formStart: "Sep 2025", lastDateDisplay: "Nov 15, 2025", lastDate: "2025-11-15", examDate: "Jan 2026", fee: "₹3,000", mode: "Offline", conductedBy: "NID Ahmedabad", nextCycle: "Sep 2026", officialLink: "https://admissions.nid.edu" },
    // ── SCIENCE / COMMERCE ──
    { name: "CUET UG", fullName: "Common University Entrance Test UG", stream: "Science", level: "Govt · National", formStart: "Feb 2026", lastDateDisplay: "Mar 22, 2026", lastDate: "2026-03-22", examDate: "May 2026", fee: "₹750", mode: "Online (CBT)", conductedBy: "NTA", nextCycle: "Feb 2027", officialLink: "https://cuet.samarth.ac.in" },
    { name: "CUET PG", fullName: "Common University Entrance Test PG", stream: "Science", level: "Govt · National", formStart: "Feb 2026", lastDateDisplay: "Mar 10, 2026", lastDate: "2026-03-10", examDate: "May 2026", fee: "₹750", mode: "Online (CBT)", conductedBy: "NTA", nextCycle: "Feb 2027", officialLink: "https://cuet.nta.nic.in" },
    { name: "ICAR AIEEA", fullName: "All India Entrance Examination Agriculture", stream: "Science", level: "Govt · National", formStart: "Feb 2026", lastDateDisplay: "Mar 31, 2026", lastDate: "2026-03-31", examDate: "Jun 2026", fee: "₹1,500", mode: "Online (CBT)", conductedBy: "NTA / ICAR", nextCycle: "Feb 2027", officialLink: "https://icar.nta.nic.in" },
    { name: "DUET", fullName: "Delhi University Entrance Test", stream: "Commerce", level: "Govt · University", formStart: "Feb 2026", lastDateDisplay: "Mar 25, 2026", lastDate: "2026-03-25", examDate: "May 2026", fee: "₹750", mode: "Online (CBT)", conductedBy: "NTA / DU", nextCycle: "Feb 2027", officialLink: "https://cuet.samarth.ac.in" },
    { name: "IPU CET", fullName: "Indraprastha University Common Entrance Test", stream: "Commerce", level: "Govt · University", formStart: "Feb 2026", lastDateDisplay: "Apr 10, 2026", lastDate: "2026-04-10", examDate: "May 2026", fee: "₹1,500", mode: "Online (CBT)", conductedBy: "IPU Delhi", nextCycle: "Feb 2027", officialLink: "https://ipu.ac.in" },
    // ── PHARMACY ──
    { name: "GPAT", fullName: "Graduate Pharmacy Aptitude Test", stream: "Pharmacy", level: "Govt · National", formStart: "Nov 2025", lastDateDisplay: "Dec 20, 2025", lastDate: "2025-12-20", examDate: "Feb 2026", fee: "₹2,000", mode: "Online (CBT)", conductedBy: "NTA", nextCycle: "Nov 2026", officialLink: "https://gpat.nta.nic.in" },
    { name: "MHT-CET PCB", fullName: "MHT-CET Biology (Pharmacy/Agriculture)", stream: "Pharmacy", level: "Govt · State", formStart: "Jan 2026", lastDateDisplay: "Mar 10, 2026", lastDate: "2026-03-10", examDate: "Apr 2026", fee: "₹800", mode: "Online (CBT)", conductedBy: "State CET Cell", nextCycle: "Jan 2027", officialLink: "https://cetcell.mahacet.org" },
    { name: "NIPER JEE", fullName: "National Institute Pharmaceutical Education Research JEE", stream: "Pharmacy", level: "Govt · National", formStart: "Mar 2026", lastDateDisplay: "May 10, 2026", lastDate: "2026-05-10", examDate: "Jun 2026", fee: "₹3,000", mode: "Online (CBT)", conductedBy: "NIPER", nextCycle: "Mar 2027", officialLink: "https://niperjee.nta.nic.in" },
    // ── DESIGN / ARTS ──
    { name: "UCEED", fullName: "Undergraduate Common Entrance Exam for Design", stream: "Architecture", level: "Govt · National", formStart: "Sep 2025", lastDateDisplay: "Oct 20, 2025", lastDate: "2025-10-20", examDate: "Jan 19, 2026", fee: "₹3,000", mode: "Online (CBT)", conductedBy: "IIT Bombay", nextCycle: "Sep 2026", officialLink: "https://uceed.iitb.ac.in" },
    { name: "AIAPGET", fullName: "All India Ayush PG Entrance Test", stream: "Medical", level: "Govt · National", formStart: "Mar 2026", lastDateDisplay: "Apr 20, 2026", lastDate: "2026-04-20", examDate: "Jun 2026", fee: "₹2,000", mode: "Online (CBT)", conductedBy: "NTA", nextCycle: "Mar 2027", officialLink: "https://aiapget.nta.nic.in" },
    // ── ENGINEERING – Additional State ──
    { name: "OJEE", fullName: "Odisha Joint Entrance Examination", stream: "Engineering", level: "Govt · State", formStart: "Feb 2026", lastDateDisplay: "Apr 5, 2026", lastDate: "2026-04-05", examDate: "May 2026", fee: "₹1,000", mode: "Online (CBT)", conductedBy: "OJEE Board", nextCycle: "Feb 2027", officialLink: "https://ojee.nic.in" },
    { name: "KEAM", fullName: "Kerala Engineering Architecture Medical", stream: "Engineering", level: "Govt · State", formStart: "Jan 2026", lastDateDisplay: "Mar 10, 2026", lastDate: "2026-03-10", examDate: "Apr 2026", fee: "₹700", mode: "Online (CBT)", conductedBy: "CEE Kerala", nextCycle: "Jan 2027", officialLink: "https://cee.kerala.gov.in" },
    { name: "TANCET", fullName: "Tamil Nadu Common Entrance Test", stream: "Engineering", level: "Govt · State", formStart: "Jan 2026", lastDateDisplay: "Feb 20, 2026", lastDate: "2026-02-20", examDate: "Mar 2026", fee: "₹500", mode: "Offline (OMR)", conductedBy: "Anna University", nextCycle: "Jan 2027", officialLink: "https://tancet.annauniv.edu" },
    { name: "REAP", fullName: "Rajasthan Engineering Admission Process", stream: "Engineering", level: "Govt · State", formStart: "Jun 2026", lastDateDisplay: "Jul 15, 2026", lastDate: "2026-07-15", examDate: "Based on JEE", fee: "₹500", mode: "Online (CBT)", conductedBy: "Board of Technical Education Rajasthan", nextCycle: "Jun 2027", officialLink: "https://www.techedu.rajasthan.gov.in" },
    { name: "GCET Goa", fullName: "Goa Common Entrance Test", stream: "Engineering", level: "Govt · State", formStart: "Feb 2026", lastDateDisplay: "Apr 10, 2026", lastDate: "2026-04-10", examDate: "May 2026", fee: "₹500", mode: "Offline (OMR)", conductedBy: "DHEQ Goa", nextCycle: "Feb 2027", officialLink: "https://www.dhegoa.gov.in" },
    { name: "TSECET", fullName: "Telangana State Engineering Common Entrance Test", stream: "Engineering", level: "Govt · State", formStart: "Jan 2026", lastDateDisplay: "Mar 25, 2026", lastDate: "2026-03-25", examDate: "May 2026", fee: "₹800", mode: "Online (CBT)", conductedBy: "JNTU Hyderabad", nextCycle: "Jan 2027", officialLink: "https://tsecet.nic.in" },
    { name: "BCECE", fullName: "Bihar Combined Entrance Competitive Examination", stream: "Engineering", level: "Govt · State", formStart: "Feb 2026", lastDateDisplay: "Mar 31, 2026", lastDate: "2026-03-31", examDate: "May 2026", fee: "₹1,000", mode: "Online (CBT)", conductedBy: "BCECEB", nextCycle: "Feb 2027", officialLink: "https://bceceboard.bihar.gov.in" },
    // ── ENGINEERING – Additional Private ──
    { name: "AMUEEE", fullName: "Aligarh Muslim University Engineering Entrance Exam", stream: "Engineering", level: "Govt · University", formStart: "Jan 2026", lastDateDisplay: "Mar 20, 2026", lastDate: "2026-03-20", examDate: "May 2026", fee: "₹700", mode: "Online (CBT)", conductedBy: "AMU", nextCycle: "Jan 2027", officialLink: "https://amucontrollerexams.com" },
    { name: "JUET", fullName: "Jaypee University Entrance Test", stream: "Engineering", level: "Private · National", formStart: "Nov 2025", lastDateDisplay: "Apr 30, 2026", lastDate: "2026-04-30", examDate: "May 2026", fee: "₹1,500", mode: "Online (CBT)", conductedBy: "Jaypee University", nextCycle: "Nov 2026", officialLink: "https://juet.ac.in" },
    { name: "LPUNEST", fullName: "LPU National Entrance and Scholarship Test", stream: "Engineering", level: "Private · National", formStart: "Oct 2025", lastDateDisplay: "Apr 25, 2026", lastDate: "2026-04-25", examDate: "Jan–May 2026", fee: "₹0", mode: "Online (CBT)", conductedBy: "LPU", nextCycle: "Oct 2026", officialLink: "https://lpunest.lpu.in" },
    { name: "CUSAT CAT", fullName: "Cochin University Science Technology CAT", stream: "Engineering", level: "Govt · University", formStart: "Jan 2026", lastDateDisplay: "Mar 15, 2026", lastDate: "2026-03-15", examDate: "Apr 2026", fee: "₹1,000", mode: "Online (CBT)", conductedBy: "CUSAT", nextCycle: "Jan 2027", officialLink: "https://admissions.cusat.ac.in" },
    // ── MEDICAL – Additional ──
    { name: "AIIMS Nursing", fullName: "AIIMS BSc Nursing Entrance Exam", stream: "Medical", level: "Govt · National", formStart: "Feb 2026", lastDateDisplay: "Mar 20, 2026", lastDate: "2026-03-20", examDate: "May 2026", fee: "₹1,500", mode: "Online (CBT)", conductedBy: "AIIMS", nextCycle: "Feb 2027", officialLink: "https://aiimsexams.ac.in" },
    { name: "BHU PMT", fullName: "Banaras Hindu University Pre Medical Test", stream: "Medical", level: "Govt · University", formStart: "Mar 2026", lastDateDisplay: "Apr 15, 2026", lastDate: "2026-04-15", examDate: "Jun 2026", fee: "₹700", mode: "Online (CBT)", conductedBy: "BHU", nextCycle: "Mar 2027", officialLink: "https://bhuonline.in" },
    { name: "VMMC MBBS", fullName: "Vardhman Mahavir Medical College MBBS", stream: "Medical", level: "Govt · University", formStart: "Feb 2026", lastDateDisplay: "Mar 5, 2026", lastDate: "2026-03-05", examDate: "May 2026", fee: "₹1,700", mode: "Offline (OMR)", conductedBy: "NTA / VMMC", nextCycle: "Feb 2027", officialLink: "https://vmmc-safdarjung.org" },
    // ── MANAGEMENT – Additional ──
    { name: "IBSAT", fullName: "ICFAI Business School Aptitude Test", stream: "Management", level: "Private · National", formStart: "Jul 2025", lastDateDisplay: "Dec 20, 2025", lastDate: "2025-12-20", examDate: "Dec 2025", fee: "₹1,800", mode: "Online (CBT)", conductedBy: "ICFAI", nextCycle: "Jul 2026", officialLink: "https://ibsindia.org" },
    { name: "ATMA", fullName: "AIMS Test for Management Admissions", stream: "Management", level: "Private · National", formStart: "Monthly", lastDateDisplay: "Rolling Dates", lastDate: "2026-12-31", examDate: "Monthly 2026", fee: "₹1,290", mode: "Online (CBT)", conductedBy: "AIMS", nextCycle: "Monthly", officialLink: "https://atmaaims.com" },
    { name: "MICAT", fullName: "MICA Admission Test", stream: "Management", level: "Private · National", formStart: "Sep 2025", lastDateDisplay: "Nov 25, 2025", lastDate: "2025-11-25", examDate: "Dec 2025", fee: "₹2,006", mode: "Online (CBT)", conductedBy: "MICA Ahmedabad", nextCycle: "Sep 2026", officialLink: "https://mica.ac.in" },
    { name: "IRMASAT", fullName: "Institute of Rural Management Anand Test", stream: "Management", level: "Govt · National", formStart: "Nov 2025", lastDateDisplay: "Jan 5, 2026", lastDate: "2026-01-05", examDate: "Feb 2026", fee: "₹1,500", mode: "Online (CBT)", conductedBy: "IRMA Anand", nextCycle: "Nov 2026", officialLink: "https://irma.ac.in" },
    { name: "TISS BAT", fullName: "TISS Bachelor Admission Test", stream: "Management", level: "Govt · National", formStart: "Nov 2025", lastDateDisplay: "Jan 15, 2026", lastDate: "2026-01-15", examDate: "Feb 2026", fee: "₹1,030", mode: "Online (CBT)", conductedBy: "TISS Mumbai", nextCycle: "Nov 2026", officialLink: "https://tiss.edu" },
    // ── LAW – Additional ──
    { name: "CULEE", fullName: "Christ University Law Entrance Examination", stream: "Law", level: "Private · National", formStart: "Nov 2025", lastDateDisplay: "Feb 15, 2026", lastDate: "2026-02-15", examDate: "Mar 2026", fee: "₹1,000", mode: "Online (CBT)", conductedBy: "Christ University", nextCycle: "Nov 2026", officialLink: "https://christuniversity.in" },
    { name: "BHU LLB", fullName: "BHU BA LLB Entrance Test", stream: "Law", level: "Govt · University", formStart: "Mar 2026", lastDateDisplay: "Apr 20, 2026", lastDate: "2026-04-20", examDate: "Jun 2026", fee: "₹700", mode: "Online (CBT)", conductedBy: "BHU", nextCycle: "Mar 2027", officialLink: "https://bhuonline.in" },
    { name: "AMU Law", fullName: "Aligarh Muslim University Law Entrance", stream: "Law", level: "Govt · University", formStart: "Jan 2026", lastDateDisplay: "Mar 20, 2026", lastDate: "2026-03-20", examDate: "May 2026", fee: "₹700", mode: "Online (CBT)", conductedBy: "AMU", nextCycle: "Jan 2027", officialLink: "https://amucontrollerexams.com" },
    // ── SCIENCE – Additional ──
    { name: "IISER Aptitude Test", fullName: "IISER Aptitude Test for BS-MS Program", stream: "Science", level: "Govt · National", formStart: "Mar 2026", lastDateDisplay: "May 1, 2026", lastDate: "2026-05-01", examDate: "Jun 2026", fee: "₹2,000", mode: "Online (CBT)", conductedBy: "IISER", nextCycle: "Mar 2027", officialLink: "https://iiseradmission.in" },
    { name: "JEST", fullName: "Joint Entrance Screening Test", stream: "Science", level: "Govt · National", formStart: "Nov 2025", lastDateDisplay: "Dec 20, 2025", lastDate: "2025-12-20", examDate: "Feb 2026", fee: "₹0", mode: "Online (CBT)", conductedBy: "JEST Committee", nextCycle: "Nov 2026", officialLink: "https://www.jest.org.in" },
    { name: "JAM", fullName: "Joint Admission Test for MSc", stream: "Science", level: "Govt · National", formStart: "Aug 2025", lastDateDisplay: "Oct 11, 2025", lastDate: "2025-10-11", examDate: "Feb 2026", fee: "₹1,800", mode: "Online (CBT)", conductedBy: "IIT Delhi", nextCycle: "Aug 2026", officialLink: "https://jam.iitd.ac.in" },
    { name: "NEST", fullName: "National Entrance Screening Test", stream: "Science", level: "Govt · National", formStart: "Jan 2026", lastDateDisplay: "Mar 31, 2026", lastDate: "2026-03-31", examDate: "Jun 2026", fee: "₹1,000", mode: "Online (CBT)", conductedBy: "NISER / CEBS", nextCycle: "Jan 2027", officialLink: "https://www.nestexam.in" },
    // ── ARCHITECTURE – Additional ──
    { name: "HITSEEE", fullName: "Hindustan Institute of Technology Science Entrance", stream: "Architecture", level: "Private · National", formStart: "Nov 2025", lastDateDisplay: "Apr 15, 2026", lastDate: "2026-04-15", examDate: "Apr–May 2026", fee: "₹500", mode: "Online (CBT)", conductedBy: "HITS Chennai", nextCycle: "Nov 2026", officialLink: "https://hindustanuniv.ac.in" },
    { name: "Amity JEE", fullName: "Amity Joint Entrance Examination", stream: "Architecture", level: "Private · National", formStart: "Nov 2025", lastDateDisplay: "Apr 20, 2026", lastDate: "2026-04-20", examDate: "May 2026", fee: "₹1,100", mode: "Online (CBT)", conductedBy: "Amity University", nextCycle: "Nov 2026", officialLink: "https://amity.edu" },
    // ── PHARMACY – Additional ──
    { name: "TS EAMCET Pharmacy", fullName: "Telangana State EAMCET for Pharmacy", stream: "Pharmacy", level: "Govt · State", formStart: "Jan 2026", lastDateDisplay: "Mar 20, 2026", lastDate: "2026-03-20", examDate: "May 2026", fee: "₹800", mode: "Online (CBT)", conductedBy: "JNTU Hyderabad", nextCycle: "Jan 2027", officialLink: "https://tseamcet.nic.in" },
    { name: "AP EAMCET Pharmacy", fullName: "Andhra Pradesh EAMCET for Pharmacy", stream: "Pharmacy", level: "Govt · State", formStart: "Jan 2026", lastDateDisplay: "Mar 20, 2026", lastDate: "2026-03-20", examDate: "May 2026", fee: "₹700", mode: "Online (CBT)", conductedBy: "JNTU Kakinada", nextCycle: "Jan 2027", officialLink: "https://sche.ap.gov.in/eamcet" },
  ];

  const streams = ["All", "Engineering", "Medical", "Law", "Management", "Architecture", "Science", "Commerce", "Pharmacy"];

  const filteredExams = EXAMS.filter(e =>
    (activeStream === "All" || e.stream === activeStream) &&
    (search === "" || e.name.toLowerCase().includes(search.toLowerCase()) || e.fullName.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredColleges = colleges.filter(c =>
    (activeStream === "All" || c.stream === activeStream) &&
    (search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase()))
  );

  const openCount = EXAMS.filter(e => !new Date(e.lastDate) < new Date()).length;
  const urgentCount = EXAMS.filter(e => {
    const diff = new Date(e.lastDate) - new Date();
    return diff > 0 && diff <= 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #64B5F6 0%, #7C3AED 100%)", padding: "64px 0" }}>
        <div className="container">
          <div className="tag" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.15)" }}>Colleges &amp; Entrance Exams</div>
          <h1 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: 12 }}>Colleges &amp; Exam Calendar</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, marginBottom: 28 }}>120+ partner colleges · Maharashtra &amp; National · Live exam deadlines with countdown timers</p>
          {/* Summary Pills */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "6px 16px", fontSize: 13, color: "white", fontWeight: 600 }}>📋 {EXAMS.length} Exams Listed</div>
            <div style={{ background: "rgba(5,150,105,0.3)", border: "1px solid rgba(5,150,105,0.5)", borderRadius: 20, padding: "6px 16px", fontSize: 13, color: "#6EE7B7", fontWeight: 600 }}>✅ {EXAMS.filter(e => new Date(e.lastDate) > new Date()).length} Open Now</div>
            {urgentCount > 0 && <div style={{ background: "rgba(220,38,38,0.3)", border: "1px solid rgba(220,38,38,0.5)", borderRadius: 20, padding: "6px 16px", fontSize: 13, color: "#FCA5A5", fontWeight: 600 }}>⚠️ {urgentCount} Closing This Week</div>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid #C8E4FA", position: "sticky", top: 64, zIndex: 90 }}>
        <div className="container" style={{ display: "flex", gap: 0 }}>
          {[{ id: "exams", label: "📋 Entrance Exams" }, { id: "colleges", label: "🏛️ Partner Colleges" }].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "14px 28px", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: activeTab === t.id ? "#64B5F6" : "#6D28D9", borderBottom: activeTab === t.id ? "2px solid #64B5F6" : "2px solid transparent", transition: "all 0.2s" }}>{t.label}</button>
          ))}
        </div>
      </div>

      <section className="section" style={{ background: "#F4F9FF" }}>
        <div className="container">
          {/* Filters */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {streams.map(s => (
                <button key={s} onClick={() => setActiveStream(s)} style={{ padding: "6px 14px", border: `1px solid ${activeStream === s ? "#64B5F6" : "#C8E4FA"}`, borderRadius: 20, background: activeStream === s ? "#64B5F6" : "white", color: activeStream === s ? "white" : "#6D28D9", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>{s}</button>
              ))}
            </div>
            {activeTab === "exams" && (
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search exam..." style={{ width: 220, marginBottom: 0, fontSize: 13 }} />
            )}
          </div>

          {/* EXAMS TAB */}
          {activeTab === "exams" && (
            <>
              <div style={{ fontSize: 13, color: "#6D28D9", marginBottom: 20, fontWeight: 500 }}>
                Showing <strong>{filteredExams.length}</strong> exams {activeStream !== "All" ? `for ${activeStream}` : ""} — Countdown timers update live every second
              </div>
              {filteredExams.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#6D28D9" }}>No exams found for "{search}"</div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                  {filteredExams.map(exam => <ExamCard key={exam.name} exam={exam} />)}
                </div>
              )}
              <div style={{ marginTop: 32, background: "#FFFFFF", borderRadius: 12, border: "1px solid #C8E4FA", padding: 20 }}>
                <p style={{ fontSize: 12, color: "#90CAF9", textAlign: "center" }}>
                  ⚠️ Exam dates are indicative based on previous year cycles. Always verify official dates at the respective exam authority websites before applying. Educeff helps with form filling — <span style={{ color: "#64B5F6", cursor: "pointer", fontWeight: 600 }}>contact us for assistance</span>.
                </p>
              </div>
            </>
          )}

          {activeTab === "colleges" && (
            <>
              <div style={{ fontSize: 13, color: "#6D28D9", marginBottom: 20, fontWeight: 500 }}>
                Showing <strong>{filteredColleges.length}</strong> colleges {activeStream !== "All" ? `for ${activeStream}` : "across all streams"}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                {filteredColleges.map(c => (
                  <div key={c.name} className="card" style={{ borderTop: `3px solid ${c.type === "Government" ? "#059669" : c.type === "Autonomous" ? "#7C3AED" : "#64B5F6"}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div style={{ width: 42, height: 42, background: "#64B5F6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 16 }}>{c.name[0]}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                        <span className="badge badge-info">{c.stream}</span>
                        <span style={{ fontSize: 10, fontWeight: 600, color: c.type === "Government" ? "#059669" : c.type === "Autonomous" ? "#7C3AED" : "#64B5F6", background: c.type === "Government" ? "#ECFDF5" : c.type === "Autonomous" ? "#F5F3FF" : "#EFF6FF", padding: "2px 8px", borderRadius: 8 }}>{c.type}</span>
                      </div>
                    </div>
                    <h3 style={{ fontWeight: 600, fontSize: 15, color: "#1A1A2E", marginBottom: 4 }}>{c.name}</h3>
                    <div style={{ fontSize: 13, color: "#64B5F6", marginBottom: 4 }}>📍 {c.city}</div>
                    <div style={{ fontSize: 12, color: "#6D28D9", marginBottom: 4 }}>🏆 {c.ranking}</div>
                    <div style={{ fontSize: 12, color: "#90CAF9", marginBottom: 16 }}>Affiliated: {c.affiliation}</div>
                    <button className="btn-primary" style={{ fontSize: 12, width: "100%" }}>Apply Through Educeff →</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("Home");
  const [modal, setModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  // Restore session on page load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setIsLoggedIn(true);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) { setUser(session.user); setIsLoggedIn(true); }
      else { setUser(null); setIsLoggedIn(false); setIsAdmin(false); }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogin = (admin) => {
    setIsAdmin(admin);
    setModal(null);
    setPage(admin ? "Admin" : "Portal");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    setPage("Home");
  };

  if (page === "Portal") return <StudentPortal setPage={setPage} user={user} />;
  if (page === "Admin") return <AdminDashboard setPage={setPage} />;

  return (
    <div>
      <style>{css}</style>
      <Navbar page={page} setPage={setPage} isLoggedIn={isLoggedIn} isAdmin={isAdmin} setModal={(m) => { if (m === null) handleLogout(); else setModal(m); }} />

      {page === "Home" && <>
        <Hero setPage={setPage} setModal={setModal} />
        <ServicesSection setPage={setPage} />
        <WhyUs />
        <Testimonials />
        <AdmissionProcess />
        <FAQ />
        <ContactForm />
        <CTA setModal={setModal} />
      </>}

      {page === "About" && <><AboutPage /><CTA setModal={setModal} /></>}
      {page === "Services" && <><ServicesPage /><CTA setModal={setModal} /></>}
      {page === "Colleges" && <><CollegesPage /><CTA setModal={setModal} /></>}
      {page === "Contact" && <><ContactForm /><CTA setModal={setModal} /></>}

      <Footer setPage={setPage} />

      {modal === "login" && <LoginModal onClose={() => setModal(null)} onLogin={handleLogin} />}
      {modal === "register" && <RegisterModal onClose={() => setModal(null)} />}
      {modal === "counseling" && (
        <CounselingModal onClose={() => setModal(null)} user={user} />
      )}
    </div>
  );
}

function CounselingModal({ onClose, user }) {
  const [form, setForm] = useState({ name: "", mobile: "", date: "", stream: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleBook = async () => {
    setLoading(true);
    const { error } = await supabase.from("counseling_bookings").insert({
      user_id: user?.id || null,
      full_name: form.name,
      mobile: form.mobile,
      preferred_date: form.date,
      stream: form.stream,
      status: "pending",
      created_at: new Date().toISOString(),
    });
    setLoading(false);
    if (!error) setDone(true);
  };

  if (done) return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ textAlign: "center" }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "#64B5F6", marginBottom: 8 }}>Session Booked!</h2>
        <p style={{ color: "#6D28D9", fontSize: 14, marginBottom: 24 }}>Our counselor will call you on <strong>{form.mobile}</strong> to confirm the appointment.</p>
        <button className="btn-primary" style={{ width: "100%", padding: 13 }} onClick={onClose}>Done →</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6D28D9" }}>×</button>
        <h2 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: "#64B5F6", marginBottom: 6 }}>Book Free Counseling</h2>
        <p style={{ color: "#6D28D9", fontSize: 14, marginBottom: 24 }}>45-minute session with a certified academic counselor — completely free.</p>
        <label>Full Name</label><input name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
        <label>Mobile Number</label><input name="mobile" placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} />
        <label>Preferred Date</label><input name="date" type="date" value={form.date} onChange={handleChange} />
        <label>Stream of Interest</label>
        <select name="stream" value={form.stream} onChange={handleChange}>
          <option value="">Select stream</option>
          <option>Engineering</option><option>Medical</option><option>Law</option><option>Management</option><option>Science/Commerce</option>
        </select>
        <button className="btn-primary" style={{ width: "100%", padding: 14, marginTop: 4, opacity: loading ? 0.7 : 1 }} onClick={handleBook} disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking →"}
        </button>
      </div>
    </div>
  );
}
