import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE CONFIG ─────────────────────────────────────────────────────────
// Replace with your actual Supabase project URL and anon key
// Get them from: https://supabase.com → your project → Settings → API
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const supabaseConfigured = SUPABASE_URL && !SUPABASE_URL.includes("YOUR_PROJECT") && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes("YOUR_ANON");

const supabase = supabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : {
      auth: {
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signUp: async () => { throw new Error("Supabase not configured. Please add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to Vercel environment variables."); },
        signInWithPassword: async () => { throw new Error("Supabase not configured. Please add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to Vercel environment variables."); },
        signOut: async () => {},
        resetPasswordForEmail: async () => {},
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }), order: () => ({ ascending: () => ({ limit: async () => ({ data: [], error: null }) }), limit: async () => ({ data: [], error: null }) }), limit: async () => ({ data: [], error: null }), data: [], error: null }), data: [], error: null }),
        insert: async () => ({ data: null, error: new Error("Supabase not configured") }),
        update: () => ({ eq: async () => ({ error: new Error("Supabase not configured") }) }),
        delete: () => ({ eq: () => ({ eq: async () => ({ error: null }) }) }),
        upsert: async () => ({ error: null }),
      }),
      storage: { from: () => ({ list: async () => ({ data: [], error: null }), upload: async () => ({ error: new Error("Supabase not configured") }), remove: async () => ({}), getPublicUrl: () => ({ data: { publicUrl: "" } }) }) },
    };

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

  /* ── MOBILE & TABLET (max 768px) ── */
  @media (max-width: 768px) {
    /* Navbar */
    .hamburger { display: flex; }
    .desktop-nav { display: none !important; }
    .desktop-btns { display: none !important; }
    .mobile-menu {
      display: block;
      position: fixed;
      top: 64px; left: 0; right: 0;
      background: #64B5F6;
      padding: 16px 20px;
      z-index: 99;
      border-top: 1px solid rgba(255,255,255,0.15);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }
    .mobile-menu .nav-link { display: block; padding: 12px 0; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .mobile-menu-btns { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }

    /* General */
    .section { padding: 40px 0; }
    .container { padding: 0 16px; }
    .card { padding: 18px !important; }

    /* Modal */
    .modal { padding: 20px 16px !important; margin: 8px; max-width: calc(100vw - 16px) !important; }
    .modal-overlay { padding: 8px; align-items: flex-end; }

    /* Tables - always scroll */
    table { min-width: 480px; font-size: 12px; }
    th, td { padding: 8px 10px !important; }

    /* Hero */
    .hero-title { font-size: 28px !important; }
    .hero-stats { flex-wrap: wrap; gap: 16px !important; }

    /* All auto-fit grids already handle themselves */
    /* Force 1-col on specific layouts */
    .section-title { font-size: 26px !important; }

    /* Footer */
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 20px !important; }

    /* CTA buttons */
    .cta-btns { flex-direction: column !important; align-items: stretch !important; }
    .cta-btns button { width: 100% !important; }

    /* ── STUDENT PORTAL ── */
    .portal-wrap { flex-direction: column !important; }
    .portal-sidebar-premium {
      width: 100% !important;
      height: auto !important;
      flex-direction: row !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 50 !important;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      padding: 0 !important;
    }
    .portal-sidebar-top { display: none !important; }
    .portal-user-card { display: none !important; }
    .portal-nav-section {
      display: flex !important;
      flex-direction: row !important;
      padding: 4px 8px !important;
      gap: 2px;
      flex-shrink: 0;
    }
    .portal-nav-label { display: none !important; }
    .portal-nav-item {
      flex-direction: column !important;
      font-size: 9px !important;
      gap: 2px !important;
      padding: 8px 10px !important;
      min-width: 56px !important;
      text-align: center !important;
      border-left: none !important;
      border-bottom: 3px solid transparent !important;
      border-radius: 0 !important;
      white-space: nowrap;
    }
    .portal-nav-item.active {
      background: rgba(255,255,255,0.2) !important;
      border-bottom-color: white !important;
      border-left: none !important;
    }
    .portal-nav-item .nav-icon {
      width: 26px !important;
      height: 26px !important;
      font-size: 13px !important;
      margin: 0 auto;
    }
    .portal-badge { font-size: 8px !important; padding: 1px 4px !important; }
    .portal-main { overflow: visible !important; }
    .portal-topbar { padding: 10px 14px !important; }
    .portal-topbar > div:first-child > div:first-child { font-size: 15px !important; }
    .portal-content-area { padding: 16px 14px !important; }

    /* Portal sidebar logout */
    .portal-wrap > div:first-child > div:last-child { display: none !important; }

    /* ── ADMIN DASHBOARD ── */
    .admin-wrap { flex-direction: column !important; }
    .admin-sidebar {
      width: 100% !important;
      height: auto !important;
      flex-direction: row !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 50 !important;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      padding: 0 !important;
    }
    .admin-sidebar-top { display: none !important; }
    .admin-user-card { display: none !important; }
    .admin-nav-section {
      display: flex !important;
      flex-direction: row !important;
      padding: 4px 6px !important;
      gap: 2px;
      flex-shrink: 0;
    }
    .admin-nav-label { display: none !important; }
    .admin-nav-item {
      flex-direction: column !important;
      font-size: 9px !important;
      gap: 2px !important;
      padding: 8px 10px !important;
      min-width: 52px !important;
      text-align: center !important;
      border-left: none !important;
      border-bottom: 3px solid transparent !important;
      border-radius: 0 !important;
    }
    .admin-nav-item.active {
      background: rgba(100,181,246,0.2) !important;
      border-bottom-color: #64B5F6 !important;
      border-left: none !important;
    }
    .admin-nav-icon { width: 24px !important; height: 24px !important; font-size: 13px !important; margin: 0 auto; }
    .admin-main { overflow: visible !important; }
    .admin-topbar { padding: 10px 14px !important; }
    .admin-content { padding: 14px !important; }

    /* Hide back to website in mobile admin */
    .admin-sidebar > div:last-child { display: none !important; }

    /* Welcome banners */
    .premium-welcome-banner { padding: 20px 18px !important; border-radius: 14px !important; }
    .premium-welcome-banner h1 { font-size: 20px !important; }

    /* Stat cards 2-col */
    .admin-stat-card { padding: 14px !important; }
    .premium-stat-card { padding: 14px !important; }

    /* Detail modal full screen on mobile */
    .detail-modal { max-width: 100% !important; margin: 0 !important; border-radius: 12px !important; }
    .detail-modal-overlay { padding: 10px !important; align-items: flex-end !important; }

    /* Registration modal 2-col grid → 1 col */
    .modal .grid-2-col { grid-template-columns: 1fr !important; }

    /* Document center */
    .upload-zone { padding: 18px !important; }

    /* Payments grid */
    .payments-grid { grid-template-columns: 1fr !important; }

    /* Profile form 2-col → 1 col */
    .profile-form-inner { grid-template-columns: 1fr !important; }

    /* About page */
    .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .about-stats { grid-template-columns: 1fr 1fr !important; }
    .team-grid { grid-template-columns: 1fr 1fr !important; }

    /* Counseling booking form */
    .booking-inner { grid-template-columns: 1fr !important; }

    /* FAQ */
    .faq-q { font-size: 14px !important; }

    /* Hero buttons */
    .hero-btns { flex-direction: column !important; width: 100% !important; }
    .hero-btns button { width: 100% !important; text-align: center !important; }

    /* Exam cards */
    .exam-countdown { flex-wrap: wrap; gap: 6px !important; }
    .exam-countdown > div { min-width: 38px !important; }

    /* College page tabs */
    .college-tabs button { padding: 12px 16px !important; font-size: 13px !important; }
    .stream-filters { gap: 6px !important; }
    .stream-filters button { font-size: 11px !important; padding: "5px 10px" !important; }
  }

  /* ── SMALL MOBILE (max 480px) ── */
  @media (max-width: 480px) {
    .container { padding: 0 12px; }
    .hero-title { font-size: 24px !important; }
    .section-title { font-size: 22px !important; }
    .footer-grid { grid-template-columns: 1fr !important; }
    .team-grid { grid-template-columns: 1fr !important; }
    .about-stats { grid-template-columns: 1fr 1fr !important; }
    .modal { padding: 16px 14px !important; }
    .portal-nav-item { min-width: 48px !important; padding: 6px 8px !important; }
    .admin-nav-item { min-width: 44px !important; padding: 6px 8px !important; }
    table { min-width: 420px; font-size: 11px; }
    .premium-welcome-banner { padding: 16px !important; }
    .premium-welcome-banner h1 { font-size: 18px !important; }
  }
  tr:hover td { background: #FAFCFF; }
  
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #DDD6FE; border-radius: 3px; }
`;



// ─── SITE STATS — Single source of truth (P0-1) ─────────────────────────────
// Update these values with real, verified numbers before publishing.
const SITE_STATS = {
  studentsGuided:    "{{OWNER_INPUT: real_student_count}}",   // e.g. "5,200+"
  partnerColleges:   "116",        // equals actual college records rendered
  yearsExcellence:  "{{OWNER_INPUT: real_years_of_excellence}}", // e.g. "8"
  counselors:        "14",
  successRateLabel:  "{{OWNER_INPUT: success_rate_basis}}",   // e.g. "94%" or remove
};

// ─── LEGAL CREDENTIALS — Verified before publishing (P0-4) ──────────────────
// Replace placeholders with real, current, verified values.
const LEGAL = {
  cin:  "{{OWNER_INPUT: real_CIN}}",            // e.g. "U80900MH2017PTC123456"
  iso:  "{{OWNER_INPUT: iso_cert_number}}",     // leave "" if not certified
  gstin: "{{OWNER_INPUT: gstin}}",
};

// ─── INPUT SANITIZER ─────────────────────────────────────────────────────────
const sanitize = (str) => {
  if (!str) return str;
  return String(str)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
};

const sanitizeForm = (obj) => {
  const clean = {};
  Object.keys(obj).forEach(k => {
    clean[k] = typeof obj[k] === "string" ? sanitize(obj[k]) : obj[k];
  });
  return clean;
};

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
  { num: SITE_STATS.studentsGuided, label: "Students Guided" },
  { num: SITE_STATS.partnerColleges, label: "Partner Colleges" },
  { num: SITE_STATS.yearsExcellence, label: "Years of Excellence" },
  { num: SITE_STATS.counselors, label: "Expert Counselors" },
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
            Expert guidance for exam forms, educational counseling, and college admissions — from JEE to NEET to MBA, we help thousands of students achieve their academic dreams each year.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ padding: "14px 32px", fontSize: 16, fontWeight: 700 }} onClick={() => setModal("counseling")}>Book Free Counseling →</button>
            <button className="btn-outline" style={{ fontSize: 14 }} onClick={() => setModal("register")}>Register Free</button>
            <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontSize: 13, cursor: "pointer", textDecoration: "underline", padding: "8px 4px" }} onClick={() => setModal("login")}>Student Login</button>
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
    { icon: "✅", title: "Proven Track Record", desc: "Thousands of students successfully placed in top engineering, medical, law, and management colleges across India." },
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
          <h2 className="font-display" style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 700, color: "#1A1A2E", letterSpacing: "-0.02em" }}>Student Experiences</h2>
          <p style={{ fontSize: 13, color: "#90CAF9", marginTop: 8, maxWidth: 500, margin: "8px auto 0" }}>
            * These are illustrative testimonials representing typical student journeys. Real testimonials with consent will be added as received.
          </p>
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
        full_name: sanitize(form.name),
        email: form.email.toLowerCase().trim(),
        phone: form.phone.trim(),
        subject: sanitize(form.subject),
        message: sanitize(form.message),
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
          Join thousands of students who trusted Educeff for their academic journey. Register today and get a free counseling session.
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
          <span style={{ fontSize: 12 }}>{LEGAL.cin !== "{{OWNER_INPUT: real_CIN}}" ? `CIN: ${LEGAL.cin}` : ""}{LEGAL.iso !== "{{OWNER_INPUT: iso_cert_number}}" && LEGAL.iso ? " | ISO 9001:2015 Certified" : ""}</span>
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
        // Step 1: Sign in
        const { data, error: authErr } = await supabase.auth.signInWithPassword({ email, password });
        if (authErr) throw authErr;

        // Step 2: Check admins table — use maybeSingle() to avoid error when no row found
        const { data: adminData, error: adminErr } = await supabase
          .from("admins")
          .select("*")
          .eq("user_id", data.user.id)
          .maybeSingle();

        // Step 3: If RLS blocks the read, try matching by email instead
        if (!adminData) {
          const { data: adminByEmail } = await supabase
            .from("admins")
            .select("*")
            .eq("email", email.toLowerCase().trim())
            .maybeSingle();

          if (!adminByEmail) {
            // Sign out since they logged in but aren't admin
            await supabase.auth.signOut();
            throw new Error("You do not have admin access. Make sure your email is added to the admins table in Supabase.");
          }
        }
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
            try {
              await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
              alert("Password reset email sent! Check your inbox.");
            } catch(e) { alert("Failed to send reset email: " + e.message); }
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
  const [agreed, setAgreed] = useState(false);

  // Calculate max and min date for DOB
  const today = new Date();
  const maxDob = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate()).toISOString().split("T")[0]; // must be at least 10 years old
  const minDob = new Date(today.getFullYear() - 60, today.getMonth(), today.getDate()).toISOString().split("T")[0]; // max 60 years old

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const validateForm = () => {
    if (!form.firstName.trim()) return "First name is required.";
    if (!form.lastName.trim()) return "Last name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email address.";
    if (!form.mobile.trim() || form.mobile.replace(/\D/g, "").length < 10) return "Enter a valid 10-digit mobile number.";
    if (!form.dob) return "Date of birth is required.";

    // Date of birth validations
    const dob = new Date(form.dob);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (dob >= todayDate) return "Date of birth cannot be today or a future date.";
    if (form.dob > maxDob) return "You must be at least 10 years old to register.";
    if (form.dob < minDob) return "Please enter a valid date of birth.";

    if (!form.course) return "Please select your course of interest.";
    if (!form.password || form.password.length < 8) return "Password must be at least 8 characters.";
    if (!agreed) return "Please agree to the Terms of Service.";
    return null;
  };

  const handleRegister = async () => {
    const validationError = validateForm();
    if (validationError) { setError(validationError); return; }

    setError(""); setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: `${form.firstName} ${form.lastName}` } }
      });
      if (authError) throw authError;

      const { error: profileError } = await supabase.from("students").insert({
        user_id: authData.user.id,
        first_name: sanitize(form.firstName),
        last_name: sanitize(form.lastName),
        email: form.email.toLowerCase().trim(),
        mobile: form.mobile.trim(),
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
        {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#DC2626" }}>⚠️ {error}</div>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <div><label>First Name</label><input name="firstName" placeholder="Rahul" value={form.firstName} onChange={handleChange} /></div>
          <div><label>Last Name</label><input name="lastName" placeholder="Sharma" value={form.lastName} onChange={handleChange} /></div>
        </div>
        <label>Email Address</label><input name="email" placeholder="rahul@email.com" type="email" value={form.email} onChange={handleChange} />
        <label>Mobile Number</label><input name="mobile" placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} />
        <label>Date of Birth <span style={{ color: "#90CAF9", fontSize: 11, fontWeight: 400 }}>(cannot be today or future)</span></label>
        <input
          name="dob"
          type="date"
          value={form.dob}
          max={maxDob}
          min={minDob}
          onChange={handleChange}
          style={{ borderColor: form.dob && form.dob >= new Date().toISOString().split("T")[0] ? "#DC2626" : undefined }}
        />
        {form.dob && form.dob >= new Date().toISOString().split("T")[0] && (
          <div style={{ fontSize: 11, color: "#DC2626", marginTop: -10, marginBottom: 10 }}>⚠️ Date of birth cannot be today or a future date</div>
        )}
        <label>Course Interested In</label>
        <select name="course" value={form.course} onChange={handleChange}>
          <option value="">Select your field</option>
          <option>Engineering</option><option>Medical</option><option>Law</option><option>Management</option><option>Architecture</option><option>Science / Commerce</option>
        </select>
        <label>Password</label><input name="password" type="password" placeholder="Min 8 characters, mix letters &amp; numbers" value={form.password} onChange={handleChange} />
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 16 }}>
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ width: "auto", marginTop: 3, marginBottom: 0 }} />
          <span style={{ fontSize: 12, color: "#6D28D9" }}>
            I agree to the <span style={{ color: "#64B5F6", cursor: "pointer" }}>Terms of Service</span> and <span style={{ color: "#64B5F6", cursor: "pointer" }}>Privacy Policy</span>. I consent to Educeff collecting and using my personal data for admission and counseling services as described in the Privacy Policy (DPDP Act 2023).
            {form.dob && new Date().getFullYear() - new Date(form.dob).getFullYear() < 18 && (
              <span style={{ display: "block", marginTop: 6, color: "#D97706", fontWeight: 600 }}>
                ⚠️ You appear to be a minor. Please ensure a parent or guardian reviews and approves this registration.
              </span>
            )}
          </span>
        </div>
        <button className="btn-primary" style={{ width: "100%", padding: 14, opacity: loading ? 0.7 : 1 }} onClick={handleRegister} disabled={loading}>
          {loading ? "Creating Account..." : "Create Account →"}
        </button>
      </div>
    </div>
  );
}

// ─── PREMIUM PORTAL CSS ──────────────────────────────────────────────────────
const portalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  .portal-wrap { display: flex; min-height: 100vh; background: #F0F7FF; font-family: 'Plus Jakarta Sans', sans-serif; }

  .portal-sidebar-premium {
    width: 260px;
    background: linear-gradient(180deg, #1A237E 0%, #283593 60%, #1565C0 100%);
    display: flex;
    flex-direction: column;
    padding: 0;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .portal-sidebar-top {
    padding: 24px 20px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .portal-user-card {
    margin: 20px 16px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px;
    padding: 16px;
    backdrop-filter: blur(10px);
  }

  .portal-avatar {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: linear-gradient(135deg, #64B5F6, #7C3AED);
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 18px; color: white;
    margin-bottom: 10px;
    box-shadow: 0 4px 12px rgba(100,181,246,0.4);
  }

  .portal-nav-section { padding: 8px 12px; margin-top: 4px; }
  .portal-nav-label { font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.35); padding: 0 8px; margin: 12px 0 6px; }

  .portal-nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 10px;
    font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,0.65);
    cursor: pointer; transition: all 0.2s;
    margin-bottom: 2px;
    position: relative;
  }
  .portal-nav-item:hover { background: rgba(255,255,255,0.08); color: white; }
  .portal-nav-item.active {
    background: rgba(255,255,255,0.15);
    color: white; font-weight: 600;
    border-left: 3px solid #64B5F6;
  }
  .portal-nav-item .nav-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    background: rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  .portal-nav-item.active .nav-icon { background: rgba(100,181,246,0.2); }

  .portal-badge {
    margin-left: auto;
    background: #DC2626;
    color: white;
    font-size: 9px; font-weight: 700;
    padding: 2px 6px;
    border-radius: 10px;
    min-width: 18px; text-align: center;
  }

  .portal-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  .portal-topbar {
    background: white;
    border-bottom: 1px solid #E3F2FD;
    padding: 14px 28px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 10;
  }

  .portal-content-area { flex: 1; padding: 28px; overflow-y: auto; }

  .premium-stat-card {
    background: white;
    border-radius: 16px;
    padding: 22px;
    border: 1px solid #E3F2FD;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .premium-stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(100,181,246,0.15); }
  .premium-stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
  }

  .progress-bar-wrap { background: #E3F2FD; border-radius: 20px; height: 6px; overflow: hidden; }
  .progress-bar-fill { height: 100%; border-radius: 20px; transition: width 1s ease; }

  .activity-item {
    display: flex; gap: 12px; align-items: flex-start;
    padding: 12px 0;
    border-bottom: 1px solid #F0F7FF;
  }
  .activity-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 5px;
  }

  .quick-action-card {
    background: white;
    border: 1px solid #E3F2FD;
    border-radius: 12px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex; align-items: center; gap: 12px;
  }
  .quick-action-card:hover { border-color: #64B5F6; box-shadow: 0 4px 12px rgba(100,181,246,0.12); transform: translateY(-2px); }

  .exam-reminder-card {
    background: linear-gradient(135deg, #1565C0, #7C3AED);
    border-radius: 16px;
    padding: 20px;
    color: white;
    position: relative;
    overflow: hidden;
  }
  .exam-reminder-card::after {
    content: '📅';
    position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
    font-size: 48px; opacity: 0.15;
  }

  .premium-welcome-banner {
    background: linear-gradient(135deg, #1565C0 0%, #7C3AED 100%);
    border-radius: 20px;
    padding: 28px 32px;
    color: white;
    position: relative;
    overflow: hidden;
    margin-bottom: 28px;
  }
  .premium-welcome-banner::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
  }
  .premium-welcome-banner::after {
    content: '';
    position: absolute;
    bottom: -60px; right: 60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }

  @media (max-width: 768px) {
    .portal-wrap { flex-direction: column; }
    .portal-sidebar-premium { width: 100%; height: auto; flex-direction: row; position: sticky; top: 0; overflow-x: auto; overflow-y: hidden; padding: 0; z-index: 50; min-height: 60px; }
    .portal-sidebar-top { display: none; }
    .portal-user-card { display: none; }
    .portal-nav-section { display: flex; flex-direction: row; padding: 4px 6px; flex-shrink: 0; }
    .portal-nav-label { display: none; }
    .portal-nav-item { flex-direction: column; font-size: 9px; gap: 2px; padding: 8px 10px; min-width: 52px; text-align: center; border-left: none !important; border-bottom: 3px solid transparent; border-radius: 0; white-space: nowrap; }
    .portal-nav-item.active { background: rgba(255,255,255,0.2); border-left: none !important; border-bottom: 3px solid rgba(255,255,255,0.9); }
    .portal-nav-item .nav-icon { width: 26px; height: 26px; font-size: 13px; margin: 0 auto; }
    .portal-badge { font-size: 8px; padding: 1px 4px; }
    .portal-main { overflow: visible; }
    .portal-content-area { padding: 14px 12px; }
    .portal-topbar { padding: 10px 14px; }
  }
  @media (max-width: 480px) {
    .portal-nav-item { min-width: 46px; padding: 6px 8px; font-size: 8px; }
    .portal-nav-item .nav-icon { width: 22px; height: 22px; font-size: 12px; }
    .portal-content-area { padding: 10px 8px; }
  }
`;

function StudentPortal({ setPage, user }) {
  const [tab, setTab] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [notifications, setNotifications] = useState(0);
  const [applications, setApplications] = useState(0);

  useEffect(() => { if (user) loadProfile(); }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase.from("students").select("*").eq("user_id", user.id).single();
      if (data) setProfile(data);
    } catch (e) { console.warn("Profile load failed", e); }

    try {
      const { data: docs } = await supabase.storage.from("student-documents").list(`${user.id}/`);
      if (docs) { const m = {}; docs.forEach(d => { m[d.name] = true; }); setUploadedDocs(m); }
    } catch (e) { console.warn("Docs load failed", e); }

    try {
      const { data: apps } = await supabase.from("applications").select("id").eq("user_id", user.id);
      if (apps) setApplications(apps.length);
    } catch (e) { console.warn("Apps load failed", e); }

    try {
      const { data: notifs } = await supabase.from("notifications").select("id").eq("user_id", user.id).eq("is_read", false);
      if (notifs) setNotifications(notifs.length);
    } catch (e) { console.warn("Notifs load failed", e); }
  };

  const initials = profile ? `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`.toUpperCase() : "ST";
  const fullName = profile ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim() : "Student";
  const docCount = Object.keys(uploadedDocs).length;
  const profileComplete = Math.min(100, Math.round(
    ([profile?.first_name, profile?.mobile, profile?.date_of_birth, profile?.address, profile?.tenth_percent, profile?.course_interest].filter(Boolean).length / 6) * 100
  ));

  const handleLogout = async () => { try { await supabase.auth.signOut(); } catch(e){} setPage("Home"); };

  const navGroups = [
    { label: "Main", items: [
      { id: "dashboard", label: "Dashboard", icon: "⚡" },
      { id: "profile", label: "My Profile", icon: "👤", badge: profileComplete < 100 ? "!" : null },
    ]},
    { label: "Admissions", items: [
      { id: "applications", label: "Applications", icon: "📋", badge: applications > 0 ? applications : null },
      { id: "tracking", label: "Track Status", icon: "📍" },
      { id: "documents", label: "Documents", icon: "📁", badge: docCount < 4 ? `${docCount}/4` : null },
    ]},
    { label: "Services", items: [
      { id: "payments", label: "Payments", icon: "💳" },
      { id: "notifications", label: "Notifications", icon: "🔔", badge: notifications > 0 ? notifications : null },
      { id: "support", label: "Support", icon: "💬" },
    ]},
  ];

  return (
    <div className="portal-wrap">
      <style>{portalCSS}</style>

      {/* Sidebar */}
      <div className="portal-sidebar-premium">
        {/* Logo */}
        <div className="portal-sidebar-top">
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setPage("Home")}>
            <svg width="28" height="28" viewBox="0 0 60 60" fill="none">
              <polygon points="30,2 56,16 56,44 30,58 4,44 4,16" fill="rgba(255,255,255,0.2)"/>
              <polygon points="30,8 50,19 50,41 30,52 10,41 10,19" fill="none" stroke="white" strokeWidth="2"/>
              <text x="30" y="38" textAnchor="middle" fontFamily="Sora" fontSize="20" fontWeight="700" fill="white">E</text>
            </svg>
            <span style={{ fontSize: 17, fontWeight: 700, color: "white", fontFamily: "Sora" }}>Edu<span style={{ color: "#90CAF9" }}>ceff</span></span>
          </div>
        </div>

        {/* User Card */}
        <div className="portal-user-card">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="portal-avatar">{initials}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{fullName}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 1 }}>{profile?.course_interest || "Student"}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 5 }}>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 10, height: 4, overflow: "hidden" }}>
                  <div style={{ width: `${profileComplete}%`, height: "100%", background: "linear-gradient(90deg, #64B5F6, #A78BFA)", borderRadius: 10 }} />
                </div>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap" }}>{profileComplete}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav Groups */}
        {navGroups.map(group => (
          <div key={group.label} className="portal-nav-section">
            <div className="portal-nav-label">{group.label}</div>
            {group.items.map(item => (
              <div key={item.id} className={`portal-nav-item ${tab === item.id ? "active" : ""}`} onClick={() => setTab(item.id)}>
                <div className="nav-icon">{item.icon}</div>
                {item.label}
                {item.badge && <span className="portal-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}

        {/* Logout */}
        <div style={{ marginTop: "auto", padding: "12px 12px 20px" }}>
          <div className="portal-nav-item" onClick={handleLogout} style={{ color: "rgba(255,100,100,0.8)" }}>
            <div className="nav-icon" style={{ background: "rgba(220,38,38,0.15)" }}>🚪</div>
            Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="portal-main">
        {/* Top Bar */}
        <div className="portal-topbar">
          <div>
            <div style={{ fontSize: "clamp(14px, 2.5vw, 18px)", fontWeight: 700, color: "#1A1A2E", fontFamily: "Sora" }}>
              {navGroups.flatMap(g => g.items).find(i => i.id === tab)?.label || "Dashboard"}
            </div>
            <div style={{ fontSize: 12, color: "#90CAF9" }}>{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{ background: "#F0F7FF", border: "1px solid #E3F2FD", borderRadius: 10, padding: "8px 14px", fontSize: 13, fontWeight: 600, color: "#64B5F6", cursor: "pointer" }} onClick={() => setTab("notifications")}>
              🔔 {notifications > 0 ? <span style={{ background: "#DC2626", color: "white", borderRadius: 10, padding: "1px 5px", fontSize: 10, marginLeft: 4 }}>{notifications}</span> : ""}
            </button>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #64B5F6, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "white", cursor: "pointer" }} onClick={() => setTab("profile")}>{initials}</div>
          </div>
        </div>

        {/* Content */}
        <div className="portal-content-area">
          {tab === "dashboard" && <PortalDashboard user={user} profile={profile} setTab={setTab} profileComplete={profileComplete} docCount={docCount} />}
          {tab === "profile" && <PortalProfile user={user} profile={profile} onSave={loadProfile} />}
          {tab === "documents" && <DocumentCenter user={user} uploadedDocs={uploadedDocs} onUpload={loadProfile} />}
          {tab === "applications" && <ApplicationsTab user={user} />}
          {tab === "payments" && <PaymentsTab user={user} profile={profile} />}
          {tab === "tracking" && <TrackingTab user={user} />}
          {tab === "notifications" && <NotificationsTab user={user} />}
          {tab === "support" && <SupportTab user={user} />}
        </div>
      </div>
    </div>
  );
}

function PortalDashboard({ user, profile, setTab, profileComplete, docCount }) {
  const [stats, setStats] = useState({ applications: 0, docs: 0, sessions: 0, pending: 0, payments: 0 });
  const [recentApps, setRecentApps] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setError(null);
      try {
        // Load applications
        const appsRes = await supabase.from("applications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5);
        if (appsRes.data) {
          setRecentApps(appsRes.data);
          setStats(s => ({ ...s, applications: appsRes.data.filter(a => a.status !== "rejected").length, pending: appsRes.data.filter(a => a.status === "pending").length }));
        }
      } catch (e) { console.warn("Apps fetch failed", e); }

      try {
        // Load documents
        const docsRes = await supabase.storage.from("student-documents").list(`${user.id}/`);
        if (docsRes.data) setStats(s => ({ ...s, docs: docsRes.data.length }));
      } catch (e) { console.warn("Docs fetch failed", e); }

      try {
        // Load payments
        const paymentsRes = await supabase.from("payments").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(3);
        if (paymentsRes.data) {
          setRecentPayments(paymentsRes.data);
          setStats(s => ({ ...s, payments: paymentsRes.data.filter(p => p.status === "success").length }));
        }
      } catch (e) { console.warn("Payments fetch failed", e); }

      setLoading(false);
    };
    load();
  }, [user]);

  const firstName = profile?.first_name || "Student";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const statCards = [
    { label: "Active Applications", val: stats.applications, icon: "📋", color: "#1565C0", bg: "#EFF6FF", bar: "#64B5F6", pct: Math.min(100, stats.applications * 20) },
    { label: "Documents Uploaded", val: `${stats.docs}/4`, icon: "📁", color: "#059669", bg: "#F0FDF4", bar: "#34D399", pct: (stats.docs / 4) * 100 },
    { label: "Profile Completion", val: `${profileComplete}%`, icon: "👤", color: "#7C3AED", bg: "#F5F3FF", bar: "#A78BFA", pct: profileComplete },
    { label: "Services Purchased", val: stats.payments, icon: "💳", color: "#D97706", bg: "#FFFBEB", bar: "#FCD34D", pct: Math.min(100, stats.payments * 33) },
  ];

  const quickActions = [
    { icon: "📋", label: "New Application", desc: "Apply to a college", color: "#EFF6FF", action: () => setTab("applications") },
    { icon: "📁", label: "Upload Documents", desc: `${4 - Math.min(4, stats.docs)} docs pending`, color: "#F0FDF4", action: () => setTab("documents") },
    { icon: "🎓", label: "Book Counseling", desc: "Free 45-min session", color: "#F5F3FF", action: () => setTab("payments") },
    { icon: "📍", label: "Track Status", desc: "View application status", color: "#FFFBEB", action: () => setTab("tracking") },
  ];

  const upcomingExams = [
    { name: "JEE Main Session 2", date: "Apr 4, 2026", daysLeft: 45, color: "#1565C0" },
    { name: "MHT-CET 2026", date: "May 2, 2026", daysLeft: 73, color: "#059669" },
    { name: "NEET UG 2026", date: "May 3, 2026", daysLeft: 74, color: "#DC2626" },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div className="premium-welcome-banner">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 4, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{greeting} 👋</div>
          <h1 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, color: "white", marginBottom: 6, fontFamily: "Sora" }}>Welcome back, {firstName}!</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 20, maxWidth: 420 }}>
            {stats.applications === 0
              ? "You haven't applied to any college yet. Start your admission journey today!"
              : `You have ${stats.applications} active application${stats.applications > 1 ? "s" : ""}. Keep going, you're doing great!`}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button style={{ background: "white", color: "#1565C0", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }} onClick={() => setTab("applications")}>+ New Application</button>
            <button style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }} onClick={() => setTab("documents")}>Upload Documents</button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 20 }}>
        {statCards.map(s => (
          <div key={s.label} className="premium-stat-card" style={{ "--card-color": s.color }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: "16px 16px 0 0" }} />
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{s.icon}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: s.color, fontFamily: "Sora" }}>{loading ? "..." : s.val}</div>
            </div>
            <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 500, marginBottom: 10 }}>{s.label}</div>
            <div className="progress-bar-wrap">
              <div className="progress-bar-fill" style={{ width: `${s.pct}%`, background: s.bar }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 20 }}>
        {/* Recent Applications */}
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #E3F2FD", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E", fontFamily: "Sora" }}>Recent Applications</h3>
            <button style={{ fontSize: 12, color: "#64B5F6", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }} onClick={() => setTab("applications")}>View All →</button>
          </div>
          {recentApps.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>📭</div>
              <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 16 }}>No applications yet</div>
              <button className="btn-primary" style={{ fontSize: 13, padding: "10px 20px" }} onClick={() => setTab("applications")}>Apply to a College</button>
            </div>
          ) : recentApps.map((a, i) => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < recentApps.length - 1 ? "1px solid #F0F7FF" : "none" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#1565C0", flexShrink: 0 }}>{a.college?.[0] || "C"}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.college}</div>
                <div style={{ fontSize: 11, color: "#90CAF9" }}>{a.course}</div>
              </div>
              <span className={`badge ${a.status === "approved" ? "badge-success" : a.status === "rejected" ? "badge-danger" : a.status === "under_review" ? "badge-info" : "badge-warning"}`} style={{ flexShrink: 0 }}>{a.status?.replace("_", " ")}</span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Upcoming Exams */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #E3F2FD", padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", fontFamily: "Sora", marginBottom: 14 }}>⏰ Upcoming Exams</h3>
            {upcomingExams.map(e => (
              <div key={e.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "8px 10px", background: "#F8FFFE", borderRadius: 8, border: "1px solid #E3F2FD" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: e.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 11, fontWeight: 700, flexShrink: 0, textAlign: "center", lineHeight: 1.2 }}>{e.daysLeft}d</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1A2E" }}>{e.name}</div>
                  <div style={{ fontSize: 10, color: "#90CAF9" }}>{e.date}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Profile Completion */}
          {profileComplete < 100 && (
            <div style={{ background: "linear-gradient(135deg, #7C3AED, #1565C0)", borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "white", marginBottom: 4 }}>Complete Your Profile</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>{profileComplete}% done — complete it to apply faster</div>
              <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, height: 6, overflow: "hidden", marginBottom: 12 }}>
                <div style={{ width: `${profileComplete}%`, height: "100%", background: "white", borderRadius: 10 }} />
              </div>
              <button style={{ background: "white", color: "#7C3AED", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", width: "100%" }} onClick={() => setTab("profile")}>Complete Now →</button>
            </div>
          )}

          {/* Recent Payment */}
          {recentPayments.length > 0 && (
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #E3F2FD", padding: 18 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", fontFamily: "Sora", marginBottom: 12 }}>💳 Recent Payments</h3>
              {recentPayments.slice(0, 2).map(p => (
                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #F0F7FF" }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1A2E" }}>{p.service_title}</div>
                    <div style={{ fontSize: 10, color: "#90CAF9" }}>{new Date(p.created_at).toLocaleDateString("en-IN")}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>₹{p.amount}</div>
                    <span className={`badge ${p.status === "success" ? "badge-success" : "badge-danger"}`} style={{ fontSize: 9 }}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ background: "white", borderRadius: 16, border: "1px solid #E3F2FD", padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E", fontFamily: "Sora", marginBottom: 16 }}>Quick Actions</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          {quickActions.map(a => (
            <div key={a.label} className="quick-action-card" onClick={a.action}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: a.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{a.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{a.label}</div>
                <div style={{ fontSize: 11, color: "#90CAF9" }}>{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function PortalProfile({ user, profile, onSave }) {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", mobile: "", date_of_birth: "", gender: "", address: "", tenth_percent: "", twelfth_percent: "", entrance_exam: "", score: "" });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Password change state
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);
  const [showPwSection, setShowPwSection] = useState(false);

  useEffect(() => { if (profile) setForm(f => ({ ...f, ...profile })); }, [profile]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setLoading(true); setSaved(false);
    try {
      const { error } = await supabase.from("students").update({ ...form, updated_at: new Date().toISOString() }).eq("user_id", user.id);
      if (!error) { setSaved(true); onSave(); setTimeout(() => setSaved(false), 3000); }
      else console.warn("Profile update error:", error.message);
    } catch(e) { console.warn("Profile update failed:", e); }
    setLoading(false);
  };

  const handlePasswordChange = async () => {
    setPwError(""); setPwSuccess(false);
    if (!pwForm.current) { setPwError("Please enter your current password."); return; }
    if (!pwForm.newPw || pwForm.newPw.length < 6) { setPwError("New password must be at least 6 characters."); return; }
    if (pwForm.newPw !== pwForm.confirm) { setPwError("New passwords do not match."); return; }
    if (pwForm.newPw === pwForm.current) { setPwError("New password must be different."); return; }
    setPwLoading(true);
    try {
      const email = user?.email;

      // Verify current password is correct first
      const { error: verifyErr } = await supabase.auth.signInWithPassword({
        email, password: pwForm.current,
      });
      if (verifyErr) {
        setPwError("Current password is incorrect.");
        setPwLoading(false);
        return;
      }

      // Use Admin-style update via direct sign in + update in same call
      // Sign in gets a completely new access token
      const { data: freshSession, error: freshErr } = await supabase.auth.signInWithPassword({
        email, password: pwForm.current,
      });
      if (freshErr || !freshSession?.session) {
        setPwError("Authentication failed. Please try again.");
        setPwLoading(false);
        return;
      }

      // Create a new supabase client with the fresh token to bypass reauth check
      const { createClient } = await import("@supabase/supabase-js");
      const freshClient = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY,
        {
          global: {
            headers: {
              Authorization: `Bearer ${freshSession.session.access_token}`,
            },
          },
        }
      );

      const { error: updateErr } = await freshClient.auth.updateUser({
        password: pwForm.newPw,
      });

      if (updateErr) {
        setPwError(`${updateErr.message}`);
        setPwLoading(false);
        return;
      }

      setPwSuccess(true);
      setPwForm({ current: "", newPw: "", confirm: "" });
      setTimeout(() => { setPwSuccess(false); setShowPwSection(false); }, 4000);
    } catch(e) {
      setPwError(e.message || "Failed. Please try again.");
    }
    setPwLoading(false);
  };

  const initials = `${form.first_name?.[0] || ""}${form.last_name?.[0] || ""}` || "ST";

  const pwStrength = pwForm.newPw.length === 0 ? null :
    pwForm.newPw.length < 6 ? { label: "Too short", color: "#DC2626", pct: 20 } :
    pwForm.newPw.length < 8 ? { label: "Weak", color: "#D97706", pct: 45 } :
    pwForm.newPw.length < 10 ? { label: "Good", color: "#64B5F6", pct: 70 } :
    { label: "Strong", color: "#059669", pct: 100 };

  return (
    <div>
      <h1 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 700, color: "#64B5F6", marginBottom: 6, fontFamily: "Sora" }}>Profile Management</h1>
      <p style={{ color: "#6D28D9", fontSize: 13, marginBottom: 24 }}>Update your personal details and keep your account secure.</p>

      {saved && <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 8, padding: "10px 16px", marginBottom: 20, fontSize: 13, color: "#065F46" }}>✅ Profile saved successfully!</div>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>

        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Avatar Card */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #E3F2FD", padding: 24, textAlign: "center" }}>
            <div style={{ width: 68, height: 68, borderRadius: "50%", background: "linear-gradient(135deg, #64B5F6, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24, color: "white", margin: "0 auto 12px" }}>{initials}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#1A1A2E" }}>{form.first_name} {form.last_name}</div>
            <div style={{ fontSize: 12, color: "#90CAF9", marginTop: 3, marginBottom: 12 }}>{user?.email}</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>● Active Account</span>
          </div>

          {/* Password Change Card */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #E3F2FD", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: showPwSection ? "1px solid #E3F2FD" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: "#F5F3FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🔒</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A2E" }}>Change Password</div>
                  <div style={{ fontSize: 11, color: "#90CAF9" }}>Update your login password</div>
                </div>
              </div>
              <button onClick={() => { setShowPwSection(s => !s); setPwError(""); setPwSuccess(false); setPwForm({ current: "", newPw: "", confirm: "" }); }}
                style={{ fontSize: 12, padding: "6px 14px", background: showPwSection ? "#FEF2F2" : "#F0F7FF", border: `1px solid ${showPwSection ? "#FECACA" : "#BFDBFE"}`, borderRadius: 8, cursor: "pointer", color: showPwSection ? "#DC2626" : "#1565C0", fontWeight: 600 }}>
                {showPwSection ? "✕ Cancel" : "Change"}
              </button>
            </div>

            {/* Form */}
            {showPwSection && (
              <div style={{ padding: "16px 20px" }}>
                {pwSuccess && (
                  <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#065F46", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>✅</span> Password changed! You'll be using the new password next time you log in.
                  </div>
                )}

                {pwError && (
                  <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#DC2626", display: "flex", alignItems: "center", gap: 8 }}>
                    <span>⚠️</span> {pwError}
                  </div>
                )}

                {/* Current Password */}
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Current Password</label>
                <input type="password" placeholder="Enter your current password" value={pwForm.current}
                  onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))}
                  style={{ marginBottom: 14 }} />

                {/* New Password */}
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>New Password</label>
                <div style={{ position: "relative", marginBottom: pwStrength ? 6 : 14 }}>
                  <input type="password" placeholder="Enter new password (min 6 chars)" value={pwForm.newPw}
                    onChange={e => setPwForm(f => ({ ...f, newPw: e.target.value }))}
                    style={{ marginBottom: 0, paddingRight: 40 }} />
                </div>

                {/* Strength bar */}
                {pwStrength && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ background: "#E3F2FD", borderRadius: 4, height: 4, overflow: "hidden", marginBottom: 4 }}>
                      <div style={{ width: `${pwStrength.pct}%`, height: "100%", background: pwStrength.color, borderRadius: 4, transition: "all 0.3s" }} />
                    </div>
                    <div style={{ fontSize: 11, color: pwStrength.color, fontWeight: 600 }}>{pwStrength.label}</div>
                  </div>
                )}

                {/* Confirm Password */}
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Confirm New Password</label>
                <input type="password" placeholder="Re-enter new password" value={pwForm.confirm}
                  onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))}
                  style={{ marginBottom: 6, borderColor: pwForm.confirm ? (pwForm.newPw === pwForm.confirm ? "#059669" : "#DC2626") : "#C8E4FA" }} />

                {pwForm.confirm.length > 0 && (
                  <div style={{ fontSize: 11, marginBottom: 14, color: pwForm.newPw === pwForm.confirm ? "#059669" : "#DC2626", fontWeight: 600 }}>
                    {pwForm.newPw === pwForm.confirm ? "✅ Passwords match" : "⚠️ Passwords do not match"}
                  </div>
                )}

                <button onClick={handlePasswordChange} disabled={pwLoading || !pwForm.current || pwForm.newPw.length < 6 || pwForm.newPw !== pwForm.confirm}
                  style={{ width: "100%", padding: "11px 0", background: (!pwForm.current || pwForm.newPw.length < 6 || pwForm.newPw !== pwForm.confirm) ? "#E3F2FD" : "#7C3AED", color: (!pwForm.current || pwForm.newPw.length < 6 || pwForm.newPw !== pwForm.confirm) ? "#90CAF9" : "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: (!pwForm.current || pwForm.newPw.length < 6 || pwForm.newPw !== pwForm.confirm) ? "not-allowed" : "pointer", transition: "all 0.2s", opacity: pwLoading ? 0.7 : 1 }}>
                  {pwLoading ? "Updating..." : "🔒 Update Password"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Card - Profile Form */}
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #E3F2FD", padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18, color: "#1A1A2E" }}>Personal Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0 16px" }}>
            <div><label>First Name</label><input name="first_name" value={form.first_name || ""} onChange={handleChange} /></div>
            <div><label>Last Name</label><input name="last_name" value={form.last_name || ""} onChange={handleChange} /></div>
            <div><label>Email (cannot change)</label><input value={user?.email || ""} disabled style={{ background: "#F8FAFF", color: "#90CAF9" }} /></div>
            <div><label>Mobile</label><input name="mobile" value={form.mobile || ""} onChange={handleChange} placeholder="+91 98765 43210" /></div>
            <div><label>Date of Birth</label><input name="date_of_birth" type="date" value={form.date_of_birth || ""} onChange={handleChange} max={new Date(new Date().setFullYear(new Date().getFullYear() - 10)).toISOString().split("T")[0]} min={new Date(new Date().setFullYear(new Date().getFullYear() - 60)).toISOString().split("T")[0]} /></div>
            <div><label>Gender</label><select name="gender" value={form.gender || ""} onChange={handleChange}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div style={{ gridColumn: "span 2" }}><label>Address</label><input name="address" value={form.address || ""} onChange={handleChange} placeholder="Your full address" /></div>
          </div>

          <h3 style={{ fontSize: 15, fontWeight: 700, margin: "20px 0 16px", color: "#1A1A2E" }}>Academic Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0 16px" }}>
            <div><label>10th Percentage</label><input name="tenth_percent" value={form.tenth_percent || ""} onChange={handleChange} placeholder="e.g. 92.4%" /></div>
            <div><label>12th Percentage</label><input name="twelfth_percent" value={form.twelfth_percent || ""} onChange={handleChange} placeholder="e.g. 88.6%" /></div>
            <div><label>Entrance Exam</label>
              <select name="entrance_exam" value={form.entrance_exam || ""} onChange={handleChange}>
                <option value="">Select</option>
                <option>JEE Main</option><option>JEE Advanced</option><option>MHT-CET</option>
                <option>NEET UG</option><option>NEET PG</option><option>CLAT</option>
                <option>CAT</option><option>MAH-MBA-CET</option><option>CUET</option><option>Other</option>
              </select>
            </div>
            <div><label>Score / Percentile</label><input name="score" value={form.score || ""} onChange={handleChange} placeholder="e.g. 95.2 Percentile" /></div>
          </div>

          <button className="btn-primary" style={{ marginTop: 20, padding: "12px 28px", opacity: loading ? 0.7 : 1, fontSize: 14 }} onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DocumentCenter({ user, uploadedDocs, onUpload }) {
  const [uploading, setUploading] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [docStatuses, setDocStatuses] = useState({});
  const [docPaths, setDocPaths] = useState({});
  const [previewDoc, setPreviewDoc] = useState(null); // { name, url, type }

  // Load doc statuses and file paths from student_documents table
  useEffect(() => {
    if (!user) return;
    const loadStatuses = async () => {
      const { data } = await supabase
        .from("student_documents")
        .select("doc_name, status, file_path, uploaded_at")
        .eq("user_id", user.id);
      if (data) {
        const statusMap = {}, pathMap = {};
        data.forEach(d => { statusMap[d.doc_name] = d.status; pathMap[d.doc_name] = d.file_path; });
        setDocStatuses(statusMap);
        setDocPaths(pathMap);
      }
    };
    loadStatuses();
  }, [user, uploadedDocs]);

  const [lastUpload, setLastUpload] = useState(0);
  const handleUpload = async (docName, file) => {
    if (!file) return;
    // Rate limit: 1 upload per 3 seconds
    const now = Date.now();
    if (now - lastUpload < 3000) { setError("Please wait a moment before uploading again."); return; }
    setLastUpload(now);
    if (file.size > 5 * 1024 * 1024) { setError(`${docName}: File too large. Max 5MB.`); return; }
    const allowed = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) { setError(`${docName}: Only PDF, JPG, PNG allowed.`); return; }
    // Validate file name
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    if (safeName !== file.name) console.info("File name sanitized:", safeName);

    setError(""); setSuccess("");
    setUploading(u => ({ ...u, [docName]: true }));

    const ext = file.name.split(".").pop().toLowerCase();
    const path = `${user.id}/${docName}.${ext}`;

    try {
      const { error: uploadErr } = await supabase.storage
        .from("student-documents")
        .upload(path, file, { upsert: true, contentType: file.type });

      if (!uploadErr) {
        await supabase.from("student_documents").upsert({
          user_id: user.id,
          doc_name: docName,
          file_path: path,
          uploaded_at: new Date().toISOString(),
          status: "pending_review",
        }, { onConflict: "user_id,doc_name" });
        setSuccess(`${docName} uploaded successfully!`);
        setTimeout(() => setSuccess(""), 3000);
        onUpload();
      } else {
        setError(`Upload failed: ${uploadErr.message}`);
      }
    } catch (e) {
      setError(`Upload error: ${e.message || "Please try again."}`);
    }
    setUploading(u => ({ ...u, [docName]: false }));
  };

  const handleView = async (docName) => {
    const filePath = docPaths[docName];
    if (!filePath) { setError("File path not found. Try re-uploading."); return; }
    try {
      const { data, error: urlErr } = await supabase.storage
        .from("student-documents")
        .createSignedUrl(filePath, 120);
      if (urlErr) throw urlErr;
      // Check if PDF or image to decide preview vs new tab
      const isPdf = filePath.toLowerCase().endsWith(".pdf");
      if (isPdf) {
        window.open(data.signedUrl, "_blank");
      } else {
        setPreviewDoc({ name: docName, url: data.signedUrl, type: "image" });
      }
    } catch (e) {
      console.warn("View error:", e);
      setError("Could not open file. Please try again.");
    }
  };

  const handleRemove = async (docName) => {
    if (!window.confirm(`Remove ${docName}? You will need to re-upload it.`)) return;
    const filePath = docPaths[docName];
    try {
      if (filePath) await supabase.storage.from("student-documents").remove([filePath]);
      await supabase.from("student_documents").delete().eq("user_id", user.id).eq("doc_name", docName);
      setSuccess(`${docName} removed.`);
      setTimeout(() => setSuccess(""), 3000);
      onUpload();
    } catch (e) { setError("Remove failed. Please try again."); }
  };

  const isUploaded = (doc) =>
    !!uploadedDocs[doc] || Object.keys(uploadedDocs).some(k => k.startsWith(doc));

  const getStatusBadge = (doc) => {
    const status = docStatuses[doc];
    if (!status) return null;
    const map = {
      verified: { label: "✓ Verified", cls: "badge-success" },
      pending_review: { label: "⏳ Under Review", cls: "badge-warning" },
      rejected: { label: "✗ Rejected", cls: "badge-danger" },
    };
    return map[status] || null;
  };

  const uploadedCount = REQUIRED_DOCS.filter(d => isUploaded(d)).length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: "#64B5F6", marginBottom: 4 }}>Document Upload Center</h1>
        <p style={{ color: "#6D28D9", fontSize: 13 }}>Accepted formats: PDF, JPG, PNG · Max 5MB per file · All files encrypted</p>
      </div>

      {/* Alerts */}
      {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 16px", marginBottom: 14, fontSize: 13, color: "#DC2626", display: "flex", justifyContent: "space-between" }}>{error}<span style={{ cursor: "pointer" }} onClick={() => setError("")}>×</span></div>}
      {success && <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 8, padding: "10px 16px", marginBottom: 14, fontSize: 13, color: "#065F46" }}>✅ {success}</div>}

      {/* Progress Bar */}
      <div style={{ background: "white", borderRadius: 12, border: "1px solid #E3F2FD", padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>Required Documents Progress</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: uploadedCount === 4 ? "#059669" : "#D97706" }}>{uploadedCount}/4 uploaded</span>
          </div>
          <div style={{ background: "#E3F2FD", borderRadius: 10, height: 8, overflow: "hidden" }}>
            <div style={{ width: `${(uploadedCount / 4) * 100}%`, height: "100%", background: uploadedCount === 4 ? "#059669" : "#64B5F6", borderRadius: 10, transition: "width 0.5s" }} />
          </div>
        </div>
        {uploadedCount === 4 && <span style={{ fontSize: 20 }}>🎉</span>}
      </div>

      {/* Required Documents */}
      <div style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid #E3F2FD", padding: 24, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E" }}>Required Documents</h3>
            <p style={{ fontSize: 12, color: "#DC2626", marginTop: 2 }}>All 4 must be uploaded to apply for colleges</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {REQUIRED_DOCS.map(doc => {
            const uploaded = isUploaded(doc);
            const statusBadge = getStatusBadge(doc);
            const isRejected = docStatuses[doc] === "rejected";
            return (
              <div key={doc} style={{ border: `1.5px solid ${isRejected ? "#FCA5A5" : uploaded ? "#6EE7B7" : "#E3F2FD"}`, borderRadius: 12, padding: 16, background: isRejected ? "#FFF5F5" : uploaded ? "#F0FDF4" : "#FAFCFF", transition: "all 0.2s" }}>
                {/* Doc header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 22 }}>{uploaded ? "📄" : "📋"}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A2E" }}>{doc}</div>
                      <div style={{ fontSize: 10, color: "#90CAF9", marginTop: 1 }}>Required</div>
                    </div>
                  </div>
                  {statusBadge && <span className={`badge ${statusBadge.cls}`} style={{ fontSize: 10 }}>{statusBadge.label}</span>}
                  {!uploaded && <span className="badge badge-danger" style={{ fontSize: 10 }}>Missing</span>}
                </div>

                {/* Rejection message */}
                {isRejected && (
                  <div style={{ background: "#FEE2E2", borderRadius: 6, padding: "8px 10px", marginBottom: 10, fontSize: 11, color: "#991B1B" }}>
                    ⚠️ Document rejected by admin. Please re-upload a clearer copy.
                  </div>
                )}

                {/* Buttons */}
                {uploaded ? (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button style={{ fontSize: 11, padding: "6px 12px", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 6, cursor: "pointer", color: "#1565C0", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
                      onClick={() => handleView(doc)}>👁 View</button>
                    <label style={{ fontSize: 11, padding: "6px 12px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 6, cursor: "pointer", color: "#92400E", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      🔄 Replace
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={e => handleUpload(doc, e.target.files[0])} />
                    </label>
                    <button style={{ fontSize: 11, padding: "6px 12px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, cursor: "pointer", color: "#DC2626", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
                      onClick={() => handleRemove(doc)}>🗑 Remove</button>
                  </div>
                ) : (
                  <label className="upload-zone" style={{ padding: "14px 12px", cursor: "pointer", display: "block", marginTop: 4 }}>
                    <div style={{ fontSize: 18, marginBottom: 4 }}>☁️</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1565C0" }}>{uploading[doc] ? "Uploading..." : "Click to Upload"}</div>
                    <div style={{ fontSize: 11, color: "#90CAF9", marginTop: 2 }}>PDF, JPG or PNG · Max 5MB</div>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={e => handleUpload(doc, e.target.files[0])} disabled={uploading[doc]} />
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Optional Documents */}
      <div style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid #E3F2FD", padding: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E" }}>Optional Documents</h3>
          <p style={{ fontSize: 12, color: "#6D28D9", marginTop: 2 }}>Upload based on your category, scholarship, or college requirement</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
          {OPTIONAL_DOCS.map(doc => {
            const uploaded = isUploaded(doc);
            const statusBadge = getStatusBadge(doc);
            return (
              <div key={doc} style={{ border: `1px solid ${uploaded ? "#6EE7B7" : "#E3F2FD"}`, borderRadius: 10, padding: "12px 14px", background: uploaded ? "#F0FDF4" : "#FAFCFF", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{uploaded ? "📄" : "📎"}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1A2E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc}</div>
                    {statusBadge && <span className={`badge ${statusBadge.cls}`} style={{ fontSize: 9, marginTop: 2 }}>{statusBadge.label}</span>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  {uploaded && (
                    <button style={{ fontSize: 10, padding: "5px 10px", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 6, cursor: "pointer", color: "#1565C0", fontWeight: 600 }}
                      onClick={() => handleView(doc)}>👁</button>
                  )}
                  <label style={{ fontSize: 10, padding: "5px 10px", background: uploaded ? "#FFFBEB" : "#EFF6FF", border: `1px solid ${uploaded ? "#FDE68A" : "#BFDBFE"}`, borderRadius: 6, cursor: "pointer", color: uploaded ? "#92400E" : "#1565C0", fontWeight: 600 }}>
                    {uploading[doc] ? "..." : uploaded ? "🔄" : "Upload"}
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={e => handleUpload(doc, e.target.files[0])} disabled={uploading[doc]} />
                  </label>
                  {uploaded && (
                    <button style={{ fontSize: 10, padding: "5px 10px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, cursor: "pointer", color: "#DC2626", fontWeight: 600 }}
                      onClick={() => handleRemove(doc)}>🗑</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewDoc && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 20 }}
          onClick={() => setPreviewDoc(null)}>
          <div style={{ background: "white", borderRadius: 12, overflow: "hidden", maxWidth: 700, maxHeight: "90vh", width: "100%" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ background: "#1565C0", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "white", fontWeight: 600, fontSize: 14 }}>📄 {previewDoc.name}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}
                  onClick={() => window.open(previewDoc.url, "_blank")}>⬇ Download</button>
                <button style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}
                  onClick={() => setPreviewDoc(null)}>✕ Close</button>
              </div>
            </div>
            <div style={{ padding: 16, overflowY: "auto", maxHeight: "80vh", textAlign: "center", background: "#F8FAFF" }}>
              <img src={previewDoc.url} alt={previewDoc.name} style={{ maxWidth: "100%", maxHeight: "70vh", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── COLLEGE DATABASE (from CollegesPage) ────────────────────────────────────
const ALL_COLLEGES = [
  { name: "COEP Technological University", city: "Pune", stream: "Engineering", ranking: "#1 Govt. Engineering, Maharashtra", affiliation: "Autonomous", type: "Government", exams: ["JEE Main", "MHT-CET"] },
  { name: "VJTI Mumbai", city: "Mumbai", stream: "Engineering", ranking: "Top 10 Govt. Engineering, India", affiliation: "University of Mumbai", type: "Government", exams: ["JEE Main", "MHT-CET"] },
  { name: "MIT College of Engineering", city: "Pune", stream: "Engineering", ranking: "Top 20 Private Engineering", affiliation: "Savitribai Phule Pune Univ.", type: "Private", exams: ["MHT-CET", "JEE Main"] },
  { name: "Pune Institute of Computer Technology", city: "Pune", stream: "Engineering", ranking: "Top Private CS College, Pune", affiliation: "Savitribai Phule Pune Univ.", type: "Private", exams: ["MHT-CET"] },
  { name: "Walchand College of Engineering", city: "Sangli", stream: "Engineering", ranking: "Top 5 Govt. Engineering, Maharashtra", affiliation: "Shivaji University", type: "Government", exams: ["MHT-CET", "JEE Main"] },
  { name: "Vishwakarma Institute of Technology", city: "Pune", stream: "Engineering", ranking: "Top Private Engineering, Pune", affiliation: "Savitribai Phule Pune Univ.", type: "Private", exams: ["MHT-CET"] },
  { name: "Cummins College of Engineering", city: "Pune", stream: "Engineering", ranking: "Top Women Engineering College", affiliation: "Savitribai Phule Pune Univ.", type: "Private", exams: ["MHT-CET"] },
  { name: "Symbiosis Institute of Technology", city: "Pune", stream: "Engineering", ranking: "Top Private Tech, Pune", affiliation: "SIU", type: "Private", exams: ["JEE Main", "MHT-CET"] },
  { name: "IIT Bombay", city: "Mumbai", stream: "Engineering", ranking: "#3 Engineering, India (NIRF)", affiliation: "Autonomous (IIT)", type: "Government", exams: ["JEE Advanced"] },
  { name: "IIT Delhi", city: "Delhi", stream: "Engineering", ranking: "#2 Engineering, India (NIRF)", affiliation: "Autonomous (IIT)", type: "Government", exams: ["JEE Advanced"] },
  { name: "NIT Nagpur (VNIT)", city: "Nagpur", stream: "Engineering", ranking: "Top 15 NIT, India", affiliation: "Autonomous (NIT)", type: "Government", exams: ["JEE Main"] },
  { name: "BITS Pilani", city: "Rajasthan", stream: "Engineering", ranking: "Top 5 Private Engineering", affiliation: "Autonomous (BITS)", type: "Private", exams: ["BITSAT"] },
  { name: "VIT Vellore", city: "Vellore", stream: "Engineering", ranking: "Top 5 Private Engineering, India", affiliation: "VIT University", type: "Private", exams: ["VITEEE"] },
  { name: "BJ Medical College", city: "Pune", stream: "Medical", ranking: "#2 Govt. Medical, Maharashtra", affiliation: "MUHS", type: "Government", exams: ["NEET UG"] },
  { name: "Grant Medical College", city: "Mumbai", stream: "Medical", ranking: "#1 Govt. Medical, Maharashtra", affiliation: "University of Mumbai", type: "Government", exams: ["NEET UG"] },
  { name: "Seth GS Medical College", city: "Mumbai", stream: "Medical", ranking: "Top 5 Medical, India", affiliation: "University of Mumbai", type: "Government", exams: ["NEET UG"] },
  { name: "D.Y. Patil Medical College", city: "Pune", stream: "Medical", ranking: "Top Private Medical, Pune", affiliation: "DPU", type: "Private", exams: ["NEET UG"] },
  { name: "AIIMS New Delhi", city: "Delhi", stream: "Medical", ranking: "#1 Medical, India (NIRF)", affiliation: "Autonomous (AIIMS)", type: "Government", exams: ["NEET UG"] },
  { name: "Symbiosis Law School", city: "Pune", stream: "Law", ranking: "Top 5 Law Colleges, India", affiliation: "SIU", type: "Private", exams: ["CLAT", "SLAT"] },
  { name: "ILS Law College", city: "Pune", stream: "Law", ranking: "Top Govt. Law, Maharashtra", affiliation: "Savitribai Phule Pune Univ.", type: "Government", exams: ["MHCET Law"] },
  { name: "Government Law College Mumbai", city: "Mumbai", stream: "Law", ranking: "#1 Govt. Law, Maharashtra", affiliation: "University of Mumbai", type: "Government", exams: ["MHCET Law"] },
  { name: "NLSIU Bangalore", city: "Bangalore", stream: "Law", ranking: "#1 Law, India (NIRF)", affiliation: "Autonomous (NLU)", type: "Government", exams: ["CLAT"] },
  { name: "IIM Nagpur", city: "Nagpur", stream: "Management", ranking: "IIM — CAT cutoff 90+", affiliation: "Autonomous (IIM)", type: "Government", exams: ["CAT"] },
  { name: "Symbiosis Institute of Business Management", city: "Pune", stream: "Management", ranking: "Top 10 MBA, India", affiliation: "SIU", type: "Private", exams: ["SNAP"] },
  { name: "JBIMS Mumbai", city: "Mumbai", stream: "Management", ranking: "Top 5 MBA, Maharashtra", affiliation: "University of Mumbai", type: "Government", exams: ["MAH-MBA-CET"] },
  { name: "IIM Ahmedabad", city: "Ahmedabad", stream: "Management", ranking: "#1 Management, India", affiliation: "Autonomous (IIM)", type: "Government", exams: ["CAT"] },
  { name: "IIM Bangalore", city: "Bangalore", stream: "Management", ranking: "#2 Management, India", affiliation: "Autonomous (IIM)", type: "Government", exams: ["CAT"] },
  { name: "SPJIMR Mumbai", city: "Mumbai", stream: "Management", ranking: "Top 5 MBA, India", affiliation: "S.P. Jain Institute", type: "Private", exams: ["CAT", "XAT"] },
  { name: "Sir JJ College of Architecture", city: "Mumbai", stream: "Architecture", ranking: "#1 Architecture, Maharashtra", affiliation: "University of Mumbai", type: "Government", exams: ["NATA", "JEE Main Paper 2"] },
  { name: "CEPT University", city: "Ahmedabad", stream: "Architecture", ranking: "#1 Architecture, India (NIRF)", affiliation: "Autonomous", type: "Private", exams: ["NATA"] },
  { name: "Fergusson College", city: "Pune", stream: "Science", ranking: "Top Arts & Science, Pune", affiliation: "Savitribai Phule Pune Univ.", type: "Autonomous", exams: ["CUET UG"] },
  { name: "St. Xavier's College", city: "Mumbai", stream: "Science", ranking: "Top Science College, Mumbai", affiliation: "University of Mumbai", type: "Autonomous", exams: ["CUET UG"] },
  { name: "Shri Ram College of Commerce", city: "Delhi", stream: "Commerce", ranking: "#1 Commerce, India (NIRF)", affiliation: "University of Delhi", type: "Government", exams: ["CUET UG"] },
  { name: "H.R. College of Commerce", city: "Mumbai", stream: "Commerce", ranking: "Top Commerce, India", affiliation: "University of Mumbai", type: "Autonomous", exams: ["CUET UG"] },
  { name: "Bombay College of Pharmacy", city: "Mumbai", stream: "Pharmacy", ranking: "#1 Pharmacy, Maharashtra", affiliation: "University of Mumbai", type: "Autonomous", exams: ["MHT-CET PCB", "GPAT"] },
];

function ApplicationsTab({ user }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ college: "", course: "", exam: "" });
  const [profile, setProfile] = useState(null);
  const [activeSection, setActiveSection] = useState("suggestions"); // "suggestions" | "applications"
  const [searchStream, setSearchStream] = useState("All");
  const [collegeSearch, setCollegeSearch] = useState("");
  const [applyModal, setApplyModal] = useState(null);
  const [applying, setApplying] = useState({});

  useEffect(() => {
    if (!user) return;
    // Load applications
    supabase.from("applications").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { setApps(data || []); setLoading(false); })
      .catch(() => setLoading(false));
    // Load profile for smart suggestions
    supabase.from("students").select("course_interest, entrance_exam, score").eq("user_id", user.id).single()
      .then(({ data }) => { if (data) setProfile(data); })
      .catch(() => {});
  }, [user]);

  // Smart suggestions based on profile
  const getSuggestions = () => {
    const stream = profile?.course_interest || "All";
    const exam = profile?.entrance_exam || "";
    const appliedColleges = new Set(apps.map(a => a.college));

    let suggestions = ALL_COLLEGES.filter(c => !appliedColleges.has(c.name));

    // Filter by stream if profile has one
    if (stream && stream !== "All" && stream !== "Science / Commerce") {
      const streamMap = {
        "Engineering": "Engineering",
        "Medical": "Medical",
        "Law": "Law",
        "Management": "Management",
        "Architecture": "Architecture",
        "Science / Commerce": null,
      };
      const mappedStream = streamMap[stream];
      if (mappedStream) suggestions = suggestions.filter(c => c.stream === mappedStream);
    }

    // Prioritize colleges matching their exam
    if (exam) {
      suggestions.sort((a, b) => {
        const aMatch = a.exams.some(e => e.toLowerCase().includes(exam.toLowerCase())) ? -1 : 1;
        const bMatch = b.exams.some(e => e.toLowerCase().includes(exam.toLowerCase())) ? -1 : 1;
        return aMatch - bMatch;
      });
    }

    return suggestions;
  };

  const suggestions = getSuggestions();

  const filteredSuggestions = suggestions.filter(c => {
    const matchStream = searchStream === "All" || c.stream === searchStream;
    const matchSearch = !collegeSearch || c.name.toLowerCase().includes(collegeSearch.toLowerCase()) || c.city.toLowerCase().includes(collegeSearch.toLowerCase());
    return matchStream && matchSearch;
  });

  const handleQuickApply = async (college) => {
    setApplying(p => ({ ...p, [college.name]: true }));
    try {
      const course = college.stream === "Engineering" ? "B.E. / B.Tech" :
        college.stream === "Medical" ? "MBBS" :
        college.stream === "Law" ? "LLB / BA LLB" :
        college.stream === "Management" ? "MBA" :
        college.stream === "Architecture" ? "B.Arch" : college.stream;
      const exam = college.exams[0] || profile?.entrance_exam || "";
      const { data, error } = await supabase.from("applications").insert({
        user_id: user.id,
        college: college.name,
        course,
        exam,
        status: "pending",
        created_at: new Date().toISOString(),
      }).select().single();
      if (!error && data) {
        setApps(a => [data, ...a]);
        setApplyModal({ college, success: true });
      }
    } catch(e) { console.warn(e); }
    setApplying(p => ({ ...p, [college.name]: false }));
  };

  const isApplied = (collegeName) => apps.some(a => a.college === collegeName);

  const streams = ["All", "Engineering", "Medical", "Law", "Management", "Architecture", "Science", "Commerce", "Pharmacy"];

  const handleAdd = async () => {
    if (!form.college.trim() || !form.course.trim()) return;
    try {
      const { data, error } = await supabase.from("applications").insert({
        user_id: user.id, college: form.college, course: form.course,
        exam: form.exam, status: "pending", created_at: new Date().toISOString()
      }).select().single();
      if (!error && data) { setApps(a => [data, ...a]); setShowForm(false); setForm({ college: "", course: "", exam: "" }); }
    } catch(e) { console.warn(e); }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 700, color: "#64B5F6", fontFamily: "Sora" }}>Applications</h1>
          <div style={{ fontSize: 12, color: "#90CAF9", marginTop: 2 }}>{apps.length} application{apps.length !== 1 ? "s" : ""} submitted</div>
        </div>
        <button className="btn-primary" style={{ fontSize: 13 }} onClick={() => setShowForm(s => !s)}>+ Custom Apply</button>
      </div>

      {/* Tab Switch */}
      <div style={{ display: "flex", gap: 0, background: "#F0F7FF", borderRadius: 10, padding: 4, marginBottom: 20, width: "fit-content" }}>
        {[{ id: "suggestions", label: "🎯 College Suggestions", count: suggestions.length }, { id: "applications", label: "📋 My Applications", count: apps.length }].map(t => (
          <button key={t.id} onClick={() => setActiveSection(t.id)}
            style={{ padding: "8px 16px", border: "none", borderRadius: 8, background: activeSection === t.id ? "white" : "transparent", color: activeSection === t.id ? "#1565C0" : "#6D28D9", fontWeight: activeSection === t.id ? 700 : 500, fontSize: 13, cursor: "pointer", boxShadow: activeSection === t.id ? "0 2px 8px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>
            {t.label} <span style={{ background: activeSection === t.id ? "#EFF6FF" : "transparent", color: "#64B5F6", borderRadius: 10, padding: "1px 6px", fontSize: 11, fontWeight: 700 }}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Custom Application Form */}
      {showForm && (
        <div style={{ background: "white", borderRadius: 14, border: "1px solid #E3F2FD", padding: 20, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: "#1A1A2E" }}>Add Custom Application</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0 16px" }}>
            <div><label>College Name *</label><input placeholder="e.g. COEP Pune" value={form.college} onChange={e => setForm(f => ({ ...f, college: e.target.value }))} /></div>
            <div><label>Course *</label><input placeholder="e.g. B.E. Computer" value={form.course} onChange={e => setForm(f => ({ ...f, course: e.target.value }))} /></div>
            <div><label>Entrance Exam</label><input placeholder="e.g. JEE Main" value={form.exam} onChange={e => setForm(f => ({ ...f, exam: e.target.value }))} /></div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-primary" style={{ fontSize: 13 }} onClick={handleAdd}>Submit Application</button>
            <button style={{ fontSize: 13, padding: "10px 20px", background: "transparent", color: "#64B5F6", border: "1px solid #BFDBFE", borderRadius: 8, cursor: "pointer" }} onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* ── SUGGESTIONS SECTION ── */}
      {activeSection === "suggestions" && (
        <div>
          {/* Profile match banner */}
          {profile?.course_interest && (
            <div style={{ background: "linear-gradient(135deg, #EFF6FF, #F5F3FF)", border: "1px solid #BFDBFE", borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>🎯</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A2E" }}>Personalized for you</div>
                <div style={{ fontSize: 12, color: "#6B7280" }}>
                  Showing colleges for <strong>{profile.course_interest}</strong>
                  {profile.entrance_exam ? ` · ${profile.entrance_exam}` : ""}
                  {profile.score ? ` · ${profile.score}` : ""}
                </div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 12, color: "#64B5F6", fontWeight: 600 }}>{filteredSuggestions.length} colleges</div>
            </div>
          )}

          {/* Filters */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
            <input value={collegeSearch} onChange={e => setCollegeSearch(e.target.value)} placeholder="🔍 Search college or city..." style={{ flex: 1, minWidth: 180, marginBottom: 0, fontSize: 13 }} />
            <select value={searchStream} onChange={e => setSearchStream(e.target.value)} style={{ width: 160, marginBottom: 0, fontSize: 13 }}>
              {streams.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* College Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {filteredSuggestions.length === 0 ? (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "48px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>🔍</div>
                <div style={{ fontSize: 14, color: "#6B7280" }}>No colleges found for your search</div>
              </div>
            ) : filteredSuggestions.map(c => {
              const applied = isApplied(c.name);
              const isApplying = applying[c.name];
              const typeColor = c.type === "Government" ? "#059669" : c.type === "Autonomous" ? "#7C3AED" : "#1565C0";
              const typeBg = c.type === "Government" ? "#ECFDF5" : c.type === "Autonomous" ? "#F5F3FF" : "#EFF6FF";
              return (
                <div key={c.name} style={{ background: "white", borderRadius: 14, border: `1px solid ${applied ? "#A7F3D0" : "#E3F2FD"}`, padding: 18, transition: "all 0.2s", position: "relative", overflow: "hidden" }}>
                  {applied && <div style={{ position: "absolute", top: 0, right: 0, background: "#059669", color: "white", fontSize: 9, fontWeight: 700, padding: "3px 10px", borderBottomLeftRadius: 8 }}>✓ APPLIED</div>}

                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #64B5F6, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>{c.name[0]}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A2E", lineHeight: 1.3 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "#90CAF9", marginTop: 2 }}>📍 {c.city}</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                    <span style={{ background: typeBg, color: typeColor, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>{c.type}</span>
                    <span style={{ background: "#EFF6FF", color: "#1565C0", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>{c.stream}</span>
                  </div>

                  {/* Ranking */}
                  <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 8 }}>🏆 {c.ranking}</div>

                  {/* Affiliated */}
                  <div style={{ fontSize: 10, color: "#90CAF9", marginBottom: 10 }}>Affiliated: {c.affiliation}</div>

                  {/* Exams */}
                  <div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>
                    {c.exams.map(e => (
                      <span key={e} style={{ background: profile?.entrance_exam && e.includes(profile.entrance_exam.split(" ")[0]) ? "#DBEAFE" : "#F8FAFF", color: profile?.entrance_exam && e.includes(profile.entrance_exam.split(" ")[0]) ? "#1D4ED8" : "#90CAF9", fontSize: 10, padding: "2px 8px", borderRadius: 6, border: `1px solid ${profile?.entrance_exam && e.includes(profile.entrance_exam.split(" ")[0]) ? "#BFDBFE" : "#E3F2FD"}`, fontWeight: profile?.entrance_exam && e.includes(profile.entrance_exam.split(" ")[0]) ? 700 : 400 }}>
                        {e}
                      </span>
                    ))}
                  </div>

                  {/* Apply Button */}
                  {applied ? (
                    <div style={{ background: "#ECFDF5", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#065F46", fontWeight: 600, textAlign: "center" }}>✅ Application Submitted</div>
                  ) : (
                    <button className="btn-primary" style={{ width: "100%", fontSize: 12, padding: "9px 0", opacity: isApplying ? 0.7 : 1 }}
                      onClick={() => handleQuickApply(c)} disabled={isApplying}>
                      {isApplying ? "Applying..." : "⚡ Quick Apply →"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── MY APPLICATIONS SECTION ── */}
      {activeSection === "applications" && (
        <div>
          {loading ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}><div style={{ fontSize: 32 }}>⏳</div><div style={{ color: "#90CAF9", fontSize: 14, marginTop: 8 }}>Loading...</div></div>
          ) : apps.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", background: "white", borderRadius: 16, border: "1px solid #E3F2FD" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E", marginBottom: 8 }}>No Applications Yet</div>
              <div style={{ fontSize: 13, color: "#90CAF9", marginBottom: 20 }}>Browse college suggestions and apply with one click</div>
              <button className="btn-primary" style={{ fontSize: 13 }} onClick={() => setActiveSection("suggestions")}>🎯 Browse Suggestions →</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {apps.map(a => (
                <div key={a.id} style={{ background: "white", borderRadius: 14, border: "1px solid #E3F2FD", padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 9, background: "linear-gradient(135deg, #64B5F6, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 15 }}>{a.college?.[0] || "C"}</div>
                    <span className={`badge ${a.status === "approved" ? "badge-success" : a.status === "rejected" ? "badge-danger" : a.status === "under_review" ? "badge-info" : "badge-warning"}`} style={{ fontSize: 10 }}>{a.status?.replace("_", " ")}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 4 }}>{a.college}</div>
                  <div style={{ fontSize: 12, color: "#90CAF9", marginBottom: 4 }}>{a.course}</div>
                  {a.exam && <div style={{ fontSize: 11, color: "#64B5F6", marginBottom: 8 }}>📝 {a.exam}</div>}
                  <div style={{ fontSize: 10, color: "#C8E4FA" }}>Applied: {new Date(a.created_at).toLocaleDateString("en-IN")}</div>
                  <div style={{ fontSize: 10, color: "#C8E4FA", marginTop: 2 }}>ID: APP-{String(a.id).slice(-8).toUpperCase()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Apply Success Modal */}
      {applyModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(13,27,75,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}
          onClick={() => setApplyModal(null)}>
          <div style={{ background: "white", borderRadius: 16, padding: 36, maxWidth: 380, width: "100%", textAlign: "center" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#059669", marginBottom: 8, fontFamily: "Sora" }}>Application Submitted!</h3>
            <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 6 }}>Your application to <strong>{applyModal.college.name}</strong> has been submitted.</p>
            <p style={{ fontSize: 13, color: "#90CAF9", marginBottom: 24 }}>Our counselors will contact you to guide you through the next steps.</p>
            <button className="btn-primary" style={{ width: "100%", padding: 12 }} onClick={() => { setApplyModal(null); setActiveSection("applications"); }}>View My Applications →</button>
          </div>
        </div>
      )}
    </div>
  );
}


function PaymentsTab({ user, profile }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [paySuccess, setPaySuccess] = useState(null);

  // Razorpay Key — replace with your actual Razorpay Key ID from razorpay.com
  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_YOUR_KEY_ID";

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
        try {
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
          } else console.warn("Payment save error:", error.message);
        } catch(e) { console.warn("Payment save failed:", e); }
      },
      modal: { ondismiss: () => setLoading(false) },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", async (resp) => {
      try {
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
      } catch(e) { console.warn("Failed payment save error:", e); }
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, marginBottom: 32 }}>
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
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("applications").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { setApps(data || []); if (data?.length > 0) setSelected(data[0]); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user]);

  const STEPS = ["Registered", "Documents Verified", "Application Submitted", "Under Review", "Admission Confirmed"];

  const getStep = (status) => {
    switch (status) {
      case "pending": return 2;
      case "under_review": return 3;
      case "approved": return 4;
      case "rejected": return 1;
      default: return 2;
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 700, color: "#64B5F6", marginBottom: 6, fontFamily: "Sora" }}>Application Tracking</h1>
      <p style={{ color: "#6D28D9", fontSize: 13, marginBottom: 24 }}>Track the real-time status of all your college applications.</p>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}><div style={{ fontSize: 32 }}>⏳</div><div style={{ color: "#90CAF9", fontSize: 14, marginTop: 8 }}>Loading applications...</div></div>
      ) : apps.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", background: "white", borderRadius: 16, border: "1px solid #E3F2FD" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#1A1A2E", marginBottom: 8 }}>No Applications Yet</div>
          <div style={{ fontSize: 13, color: "#90CAF9", marginBottom: 20 }}>Submit your first application to track its status here</div>
          <button className="btn-primary" style={{ fontSize: 13 }}>+ New Application</button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {/* Application List */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #E3F2FD", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #E3F2FD", background: "#F8FAFF" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>Your Applications ({apps.length})</div>
            </div>
            {apps.map(a => (
              <div key={a.id} onClick={() => setSelected(a)} style={{ padding: "14px 20px", borderBottom: "1px solid #F0F7FF", cursor: "pointer", background: selected?.id === a.id ? "#EFF6FF" : "white", transition: "background 0.15s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E", marginBottom: 3 }}>{a.college}</div>
                    <div style={{ fontSize: 11, color: "#90CAF9" }}>{a.course} {a.exam ? `· ${a.exam}` : ""}</div>
                    <div style={{ fontSize: 10, color: "#C8E4FA", marginTop: 2 }}>{new Date(a.created_at).toLocaleDateString("en-IN")}</div>
                  </div>
                  <span className={`badge ${a.status === "approved" ? "badge-success" : a.status === "rejected" ? "badge-danger" : a.status === "under_review" ? "badge-info" : "badge-warning"}`} style={{ fontSize: 10 }}>
                    {a.status?.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tracking Detail */}
          {selected && (
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #E3F2FD", padding: 24 }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E", marginBottom: 4 }}>{selected.college}</div>
                <div style={{ fontSize: 12, color: "#90CAF9" }}>{selected.course} {selected.exam ? `· ${selected.exam}` : ""}</div>
              </div>

              {selected.status === "rejected" && (
                <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#DC2626", marginBottom: 4 }}>❌ Application Rejected</div>
                  <div style={{ fontSize: 12, color: "#991B1B" }}>Please contact our counselors for assistance with re-application.</div>
                </div>
              )}

              {/* Progress Steps */}
              <div style={{ position: "relative", padding: "8px 0" }}>
                {STEPS.map((step, i) => {
                  const currentStep = getStep(selected.status);
                  const isDone = i < currentStep;
                  const isCurrent = i === currentStep;
                  const isPending = i > currentStep;
                  return (
                    <div key={step} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: i < STEPS.length - 1 ? 0 : 0 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: isDone ? "#059669" : isCurrent ? "#64B5F6" : "#E3F2FD", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: isDone || isCurrent ? "white" : "#90CAF9", flexShrink: 0, zIndex: 1, transition: "all 0.3s" }}>
                          {isDone ? "✓" : i + 1}
                        </div>
                        {i < STEPS.length - 1 && <div style={{ width: 2, height: 28, background: isDone ? "#059669" : "#E3F2FD", margin: "2px 0", transition: "background 0.3s" }} />}
                      </div>
                      <div style={{ paddingBottom: i < STEPS.length - 1 ? 20 : 0, paddingTop: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: isCurrent ? 700 : 500, color: isDone ? "#059669" : isCurrent ? "#1565C0" : "#9CA3AF" }}>{step}</div>
                        {isCurrent && !selected.status === "rejected" && (
                          <div style={{ fontSize: 11, color: "#64B5F6", marginTop: 2 }}>Current status</div>
                        )}
                        {isDone && i === 0 && <div style={{ fontSize: 10, color: "#90CAF9", marginTop: 1 }}>{new Date(selected.created_at).toLocaleDateString("en-IN")}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: 20, padding: "12px 16px", background: "#F8FAFF", borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: "#90CAF9", marginBottom: 4 }}>Application ID</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1A2E", fontFamily: "monospace" }}>APP-{String(selected.id).slice(-8).toUpperCase()}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NotificationsTab({ user }) {
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadNotifs();
  }, [user]);

  const loadNotifs = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      setNotifs(data || []);
    } catch (e) { console.warn(e); }
    setLoading(false);
  };

  const markRead = async (id) => {
    try { await supabase.from("notifications").update({ is_read: true }).eq("id", id); } catch(e){}
    setNotifs(p => p.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const markAllRead = async () => {
    try { await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id); } catch(e){}
    setNotifs(p => p.map(n => ({ ...n, is_read: true })));
  };

  const unreadCount = notifs.filter(n => !n.is_read).length;

  const typeIcon = (type) => ({ warning: "⚠️", success: "✅", info: "ℹ️", error: "❌" }[type] || "🔔");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 700, color: "#64B5F6", fontFamily: "Sora" }}>Notifications</h1>
          {unreadCount > 0 && <div style={{ fontSize: 12, color: "#D97706", marginTop: 2 }}>{unreadCount} unread notification{unreadCount > 1 ? "s" : ""}</div>}
        </div>
        {unreadCount > 0 && (
          <button style={{ fontSize: 12, color: "#64B5F6", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 600 }} onClick={markAllRead}>Mark all read</button>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}><div style={{ fontSize: 32 }}>⏳</div><div style={{ color: "#90CAF9", fontSize: 14, marginTop: 8 }}>Loading...</div></div>
      ) : notifs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", background: "white", borderRadius: 16, border: "1px solid #E3F2FD" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔔</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E", marginBottom: 6 }}>No Notifications Yet</div>
          <div style={{ fontSize: 13, color: "#90CAF9" }}>You'll receive updates about your applications and documents here</div>
        </div>
      ) : notifs.map(n => (
        <div key={n.id} onClick={() => !n.is_read && markRead(n.id)} style={{ background: "white", borderRadius: 12, border: `1px solid ${!n.is_read ? "#BFDBFE" : "#E3F2FD"}`, padding: "16px 20px", marginBottom: 10, display: "flex", gap: 14, alignItems: "flex-start", cursor: !n.is_read ? "pointer" : "default", transition: "all 0.2s", boxShadow: !n.is_read ? "0 2px 8px rgba(100,181,246,0.1)" : "none" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: !n.is_read ? "#EFF6FF" : "#F8FAFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{typeIcon(n.type)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: !n.is_read ? 700 : 500, fontSize: 14, color: "#1A1A2E", marginBottom: 4 }}>{n.title}</div>
            <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{n.message}</div>
            <div style={{ fontSize: 11, color: "#90CAF9", marginTop: 6 }}>{new Date(n.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
            {!n.is_read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#64B5F6" }} />}
            {!n.is_read && <div style={{ fontSize: 10, color: "#64B5F6", fontWeight: 600 }}>tap to read</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function SupportTab({ user }) {
  const [form, setForm] = useState({ category: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase.from("support_tickets").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setTickets(data || [])).catch(() => {});
  }, [user, sent]);

  const handleSubmit = async () => {
    if (!form.category || !form.description.trim()) { setError("Please select a category and describe your issue."); return; }
    setError(""); setLoading(true);
    try {
      const { error: err } = await supabase.from("support_tickets").insert({
        user_id: user.id,
        category: sanitize(form.category),
        description: sanitize(form.description),
        status: "open",
        created_at: new Date().toISOString(),
      });
      if (err) throw err;
      setSent(true);
      setForm({ category: "", description: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (e) { setError(e.message || "Failed to submit. Please try again."); }
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 700, color: "#64B5F6", marginBottom: 20, fontFamily: "Sora" }}>Support Center</h1>

      {/* Contact Options */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 24 }}>
        {[
          { icon: "📞", title: "Call Us", desc: "+91 98765 43210", sub: "Mon–Sat, 9AM–7PM", color: "#EFF6FF", border: "#BFDBFE", action: () => window.open("tel:+919876543210") },
          { icon: "✉️", title: "Email Us", desc: "support@educeff.com", sub: "Reply within 4 hours", color: "#F0FDF4", border: "#A7F3D0", action: () => window.open("mailto:support@educeff.com") },
          { icon: "💬", title: "WhatsApp", desc: "+91 98765 43210", sub: "Quick responses", color: "#F5F3FF", border: "#DDD6FE", action: () => window.open("https://wa.me/919876543210") },
          { icon: "📅", title: "Book Session", desc: "Free counseling", sub: "45 min call", color: "#FFFBEB", border: "#FDE68A", action: () => {} },
        ].map(s => (
          <div key={s.title} onClick={s.action} style={{ background: s.color, border: `1px solid ${s.border}`, borderRadius: 12, padding: "16px 14px", cursor: "pointer", transition: "all 0.2s", display: "flex", gap: 12, alignItems: "center" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A2E" }}>{s.title}</div>
              <div style={{ fontSize: 12, color: "#374151" }}>{s.desc}</div>
              <div style={{ fontSize: 10, color: "#6B7280" }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {/* Submit Ticket */}
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #E3F2FD", padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E", marginBottom: 16 }}>🎫 Submit a Support Ticket</h3>
          {sent && <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#065F46" }}>✅ Ticket submitted! We'll respond within 4 hours.</div>}
          {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#DC2626" }}>{error}</div>}
          <label>Issue Category</label>
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            <option value="">Select category</option>
            <option>Document Upload Issue</option>
            <option>Application Status Query</option>
            <option>Login / Account Problem</option>
            <option>Payment Query</option>
            <option>Counseling Session</option>
            <option>College Admission Help</option>
            <option>Other</option>
          </select>
          <label>Describe Your Issue</label>
          <textarea rows={4} placeholder="Describe your issue in detail..." style={{ resize: "vertical" }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <button className="btn-primary" style={{ width: "100%", padding: 12, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit Ticket →"}
          </button>
        </div>

        {/* Ticket History */}
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #E3F2FD", padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E", marginBottom: 16 }}>📋 My Tickets ({tickets.length})</h3>
          {tickets.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🎫</div>
              <div style={{ fontSize: 13, color: "#90CAF9" }}>No tickets yet</div>
            </div>
          ) : tickets.map(t => (
            <div key={t.id} style={{ padding: "12px 0", borderBottom: "1px solid #F0F7FF" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{t.category}</div>
                <span className={`badge ${t.status === "resolved" ? "badge-success" : t.status === "in_progress" ? "badge-info" : "badge-warning"}`} style={{ fontSize: 9 }}>{t.status?.replace("_", " ")}</span>
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4, lineHeight: 1.4 }}>{t.description?.substring(0, 80)}{t.description?.length > 80 ? "..." : ""}</div>
              <div style={{ fontSize: 10, color: "#90CAF9" }}>{new Date(t.created_at).toLocaleDateString("en-IN")}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────

// ─── ADMIN CSS ───────────────────────────────────────────────────────────────
const adminCSS = `
  .admin-wrap { display: flex; min-height: 100vh; background: #F0F7FF; font-family: 'Plus Jakarta Sans', sans-serif; }
  .admin-sidebar {
    width: 260px;
    background: linear-gradient(180deg, #0D1B4B 0%, #1A237E 50%, #283593 100%);
    display: flex; flex-direction: column;
    padding: 0; flex-shrink: 0;
    position: sticky; top: 0; height: 100vh; overflow-y: auto;
  }
  .admin-sidebar-top { padding: 24px 20px 16px; border-bottom: 1px solid rgba(255,255,255,0.07); }
  .admin-user-card { margin: 16px; padding: 14px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; }
  .admin-nav-section { padding: 4px 12px; }
  .admin-nav-label { font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.3); padding: 0 8px; margin: 12px 0 4px; }
  .admin-nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.2s; margin-bottom: 1px; }
  .admin-nav-item:hover { background: rgba(255,255,255,0.08); color: white; }
  .admin-nav-item.active { background: rgba(100,181,246,0.2); color: white; font-weight: 600; border-left: 3px solid #64B5F6; }
  .admin-nav-icon { width: 30px; height: 30px; border-radius: 7px; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
  .admin-nav-item.active .admin-nav-icon { background: rgba(100,181,246,0.2); }
  .admin-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .admin-topbar { background: white; border-bottom: 1px solid #E3F2FD; padding: 14px 28px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10; }
  .admin-content { flex: 1; padding: 28px; overflow-y: auto; }
  .admin-stat-card { background: white; border-radius: 14px; padding: 20px; border: 1px solid #E3F2FD; transition: transform 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; }
  .admin-stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(21,101,192,0.1); }
  .student-row { transition: background 0.15s; }
  .student-row:hover { background: #F0F7FF !important; }
  .detail-modal-overlay { position: fixed; inset: 0; background: rgba(13,27,75,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
  .detail-modal { background: white; border-radius: 16px; width: 100%; max-width: 680px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 60px rgba(0,0,0,0.2); }
  @media (max-width: 768px) {
    .admin-wrap { flex-direction: column; }
    .admin-sidebar { width: 100%; height: auto; flex-direction: row; position: sticky; top: 0; overflow-x: auto; overflow-y: hidden; padding: 0; z-index: 50; min-height: 58px; }
    .admin-sidebar-top { display: none; }
    .admin-user-card { display: none; }
    .admin-nav-section { display: flex; flex-direction: row; padding: 4px 6px; flex-shrink: 0; }
    .admin-nav-label { display: none; }
    .admin-nav-item { flex-direction: column; font-size: 9px; gap: 2px; padding: 8px 10px; min-width: 50px; text-align: center; border-left: none !important; border-bottom: 3px solid transparent; border-radius: 0; white-space: nowrap; }
    .admin-nav-item.active { border-bottom-color: #64B5F6; background: rgba(100,181,246,0.2); border-left: none !important; }
    .admin-nav-icon { width: 24px; height: 24px; font-size: 13px; margin: 0 auto; }
    .admin-main { overflow: visible; }
    .admin-topbar { padding: 10px 14px; flex-wrap: wrap; gap: 8px; }
    .admin-content { padding: 14px 12px; }
    .detail-modal { max-width: 100%; margin: 0; border-radius: 12px 12px 0 0; }
    .detail-modal-overlay { padding: 0; align-items: flex-end; }
    .detail-modal > div:first-child { border-radius: 12px 12px 0 0; }
  }
  @media (max-width: 480px) {
    .admin-nav-item { min-width: 44px; padding: 6px 8px; font-size: 8px; }
    .admin-nav-icon { width: 20px; height: 20px; font-size: 11px; }
    .admin-content { padding: 10px 8px; }
  }
`;

function AdminDashboard({ setPage }) {
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState({ students: 0, applications: 0, pending_docs: 0, approved: 0, rejected: 0, payments: 0, counseling: 0 });

  useEffect(() => { loadAdminStats(); }, []);

  const loadAdminStats = async () => {
    try {
      // Use head:true for efficient counting without fetching all rows
      const [studRes, appRes, docRes, payRes, bookRes] = await Promise.all([
        supabase.from("students").select("*", { count: "exact", head: true }),
        supabase.from("applications").select("id,status"),
        supabase.from("student_documents").select("id,status").eq("status", "pending_review"),
        supabase.from("payments").select("id,status").eq("status", "success"),
        supabase.from("counseling_bookings").select("*", { count: "exact", head: true }),
      ]);

      // Log errors for debugging
      if (studRes.error) console.warn("Students query error:", studRes.error.message);
      if (appRes.error) console.warn("Applications query error:", appRes.error.message);
      if (docRes.error) console.warn("Docs query error:", docRes.error.message);
      if (payRes.error) console.warn("Payments query error:", payRes.error.message);
      if (bookRes.error) console.warn("Bookings query error:", bookRes.error.message);

      setStats({
        students: studRes.count ?? studRes.data?.length ?? 0,
        applications: appRes.data?.length ?? 0,
        pending_docs: docRes.data?.length ?? 0,
        approved: appRes.data?.filter(a => a.status === "approved").length ?? 0,
        rejected: appRes.data?.filter(a => a.status === "rejected").length ?? 0,
        payments: payRes.data?.length ?? 0,
        counseling: bookRes.count ?? bookRes.data?.length ?? 0,
      });
    } catch (e) { console.warn("Admin stats failed:", e); }
  };

  const navGroups = [
    { label: "Overview", items: [{ id: "overview", label: "Dashboard", icon: "\u26a1" }] },
    { label: "Students", items: [{ id: "students", label: "All Students", icon: "\ud83d\udc65" }] },
    { label: "Operations", items: [
      { id: "applications", label: "Applications", icon: "\ud83d\udccb" },
      { id: "documents", label: "Doc Verification", icon: "\ud83d\udd0d" },
      { id: "payments_admin", label: "Payments", icon: "\ud83d\udcb3" },
      { id: "counseling", label: "Counseling", icon: "\ud83c\udf93" },
    ]},
    { label: "Communication", items: [{ id: "notifications", label: "Notifications", icon: "\ud83d\udd14" }] },
    { label: "System", items: [
      { id: "reports", label: "Reports", icon: "\ud83d\udcc8" },
      { id: "settings", label: "Settings", icon: "\u2699\ufe0f" },
    ]},
  ];

  return (
    <div className="admin-wrap">
      <style>{adminCSS}</style>
      <div className="admin-sidebar">
        <div className="admin-sidebar-top">
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setPage("Home")}>
            <svg width="26" height="26" viewBox="0 0 60 60" fill="none">
              <polygon points="30,2 56,16 56,44 30,58 4,44 4,16" fill="rgba(255,255,255,0.2)"/>
              <polygon points="30,8 50,19 50,41 30,52 10,41 10,19" fill="none" stroke="white" strokeWidth="2"/>
              <text x="30" y="38" textAnchor="middle" fontFamily="Sora" fontSize="20" fontWeight="700" fill="white">E</text>
            </svg>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "white", fontFamily: "Sora" }}>Educeff</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Admin Panel</div>
            </div>
          </div>
        </div>
        <div className="admin-user-card">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #64B5F6, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "white" }}>AD</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Admin</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>Super Administrator</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {[{val: stats.students, label: "Students", color: "#64B5F6"}, {val: stats.applications, label: "Apps", color: "#34D399"}, {val: stats.pending_docs, label: "Pending", color: "#FCD34D"}].map(s => (
              <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: 6, padding: "5px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        {navGroups.map(group => (
          <div key={group.label} className="admin-nav-section">
            <div className="admin-nav-label">{group.label}</div>
            {group.items.map(item => (
              <div key={item.id} className={`admin-nav-item ${tab === item.id ? "active" : ""}`} onClick={() => setTab(item.id)}>
                <div className="admin-nav-icon">{item.icon}</div>
                {item.label}
              </div>
            ))}
          </div>
        ))}
        <div style={{ marginTop: "auto", padding: "12px 12px 20px" }}>
          <div className="admin-nav-item" onClick={() => setPage("Home")} style={{ color: "rgba(100,181,246,0.8)" }}>
            <div className="admin-nav-icon">\ud83c\udf10</div> Back to Website
          </div>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-topbar">
          <div>
            <div style={{ fontSize: "clamp(13px, 2.5vw, 17px)", fontWeight: 700, color: "#1A1A2E", fontFamily: "Sora" }}>
              {navGroups.flatMap(g => g.items).find(i => i.id === tab)?.label || "Dashboard"}
            </div>
            <div style={{ fontSize: 11, color: "#90CAF9" }}>{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, color: "#1565C0", cursor: "pointer" }} onClick={loadAdminStats}>\u21bb Refresh</button>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #64B5F6, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: "white" }}>AD</div>
          </div>
        </div>
        <div className="admin-content">
          {tab === "overview" && <AdminOverview stats={stats} setTab={setTab} />}
          {tab === "students" && <AdminStudents />}
          {tab === "applications" && <AdminApplications />}
          {tab === "documents" && <AdminDocVerification />}
          {tab === "payments_admin" && <AdminPayments />}
          {tab === "counseling" && <AdminCounseling />}
          {tab === "notifications" && <AdminNotifications />}
          {tab === "reports" && <AdminReports stats={stats} />}
          {tab === "settings" && <AdminSettings />}
        </div>
      </div>
    </div>
  );
}

function AdminOverview({ stats, setTab }) {
  const statCards = [
    { label: "Total Students", val: stats.students, icon: "\ud83d\udc65", color: "#1565C0", bg: "#EFF6FF" },
    { label: "Total Applications", val: stats.applications, icon: "\ud83d\udccb", color: "#059669", bg: "#F0FDF4" },
    { label: "Pending Doc Review", val: stats.pending_docs, icon: "\ud83d\udd0d", color: "#D97706", bg: "#FFFBEB", urgent: stats.pending_docs > 0 },
    { label: "Approved Applications", val: stats.approved, icon: "\u2705", color: "#059669", bg: "#F0FDF4" },
    { label: "Rejected Applications", val: stats.rejected, icon: "\u274c", color: "#DC2626", bg: "#FEF2F2" },
    { label: "Successful Payments", val: stats.payments, icon: "\ud83d\udcb3", color: "#7C3AED", bg: "#F5F3FF" },
    { label: "Counseling Booked", val: stats.counseling, icon: "\ud83c\udf93", color: "#0891B2", bg: "#ECFEFF" },
    { label: "Success Rate", val: stats.applications > 0 ? `${Math.round((stats.approved / stats.applications) * 100)}%` : "\u2014", icon: "\ud83d\udcc8", color: "#059669", bg: "#F0FDF4" },
  ];

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #0D1B4B, #1565C0)", borderRadius: 16, padding: "24px 28px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Admin Dashboard</div>
          <h1 style={{ fontSize: "clamp(17px, 3vw, 22px)", fontWeight: 800, color: "white", marginBottom: 6, fontFamily: "Sora" }}>Welcome back, Admin!</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", maxWidth: 440 }}>
            {stats.pending_docs > 0 ? `\u26a0\ufe0f ${stats.pending_docs} documents pending verification.` : `${stats.students} students enrolled, ${stats.applications} applications managed.`}
          </p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14, marginBottom: 24 }}>
        {statCards.map(s => (
          <div key={s.label} className="admin-stat-card" style={{ borderTop: `3px solid ${s.color}`, cursor: "pointer" }} onClick={() => s.urgent && setTab("documents")}>
            {s.urgent && <div style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: "50%", background: "#DC2626" }} />}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.color, fontFamily: "Sora" }}>{s.val}</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "white", borderRadius: 14, border: "1px solid #E3F2FD", padding: 22, marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 14, fontFamily: "Sora" }}>Quick Actions</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
          {[
            { icon: "\ud83d\udc65", label: "View All Students", color: "#EFF6FF", action: () => setTab("students") },
            { icon: "\ud83d\udd0d", label: "Review Documents", color: "#FFFBEB", action: () => setTab("documents"), count: stats.pending_docs },
            { icon: "\ud83d\udccb", label: "Manage Applications", color: "#F0FDF4", action: () => setTab("applications") },
            { icon: "\ud83d\udd14", label: "Send Notification", color: "#F5F3FF", action: () => setTab("notifications") },
          ].map(a => (
            <div key={a.label} onClick={a.action} style={{ background: a.color, borderRadius: 10, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}>
              <span style={{ fontSize: 20 }}>{a.icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1A2E" }}>{a.label}</div>
                {a.count > 0 && <div style={{ fontSize: 10, color: "#D97706", fontWeight: 700 }}>{a.count} pending</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "white", borderRadius: 14, border: "1px solid #E3F2FD", padding: 22 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 14, fontFamily: "Sora" }}>Admissions by Stream</h3>
        {[
          { label: "Engineering", pct: 42, color: "#1565C0" },
          { label: "Medical", pct: 28, color: "#059669" },
          { label: "Management", pct: 14, color: "#7C3AED" },
          { label: "Law", pct: 9, color: "#D97706" },
          { label: "Architecture", pct: 4, color: "#0891B2" },
          { label: "Others", pct: 3, color: "#6B7280" },
        ].map(b => (
          <div key={b.label} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{b.label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: b.color }}>{b.pct}%</span>
            </div>
            <div style={{ background: "#E3F2FD", borderRadius: 10, height: 7, overflow: "hidden" }}>
              <div style={{ width: `${b.pct}%`, height: "100%", background: b.color, borderRadius: 10 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => { loadStudents(); }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from("students").select("*").order("created_at", { ascending: false });
      setStudents(data || []);
    } catch (e) { console.warn(e); }
    setLoading(false);
  };

  const filtered = students.filter(s => {
    const name = `${s.first_name || ""} ${s.last_name || ""}`.toLowerCase();
    const matchSearch = name.includes(search.toLowerCase()) || (s.email || "").toLowerCase().includes(search.toLowerCase()) || (s.mobile || "").includes(search);
    const matchFilter = filter === "All" || s.course_interest === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1A1A2E", fontFamily: "Sora" }}>All Students</h1>
          <div style={{ fontSize: 12, color: "#90CAF9", marginTop: 2 }}>{students.length} students enrolled</div>
        </div>
        <button className="btn-primary" style={{ fontSize: 13 }} onClick={loadStudents}>\u21bb Refresh</button>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="\ud83d\udd0d Search name, email, mobile..." style={{ flex: 1, minWidth: 200, marginBottom: 0, fontSize: 13 }} />
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: 180, marginBottom: 0, fontSize: 13 }}>
          <option>All</option>
          <option>Engineering</option><option>Medical</option><option>Law</option>
          <option>Management</option><option>Architecture</option><option>Science / Commerce</option>
        </select>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>\u23f3</div>
          <div style={{ color: "#90CAF9", fontSize: 14 }}>Loading students from Supabase...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>\ud83d\udc65</div>
          <div style={{ color: "#6B7280", fontSize: 15, marginBottom: 8 }}>{students.length === 0 ? "No students registered yet" : "No results found"}</div>
          <div style={{ fontSize: 13, color: "#90CAF9" }}>{students.length === 0 ? "Students appear here once they register on the website" : "Try a different search"}</div>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: 14, border: "1px solid #E3F2FD", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr><th>#</th><th>Student</th><th>Contact</th><th>Course</th><th>10th %</th><th>12th %</th><th>Entrance Exam</th><th>Registered</th><th>Action</th></tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id} className="student-row" style={{ background: selected?.id === s.id ? "#EFF6FF" : "white" }}>
                    <td style={{ color: "#90CAF9", fontSize: 12 }}>{i + 1}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #64B5F6, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11, color: "white", flexShrink: 0 }}>
                          {(s.first_name?.[0] || "").toUpperCase()}{(s.last_name?.[0] || "").toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13, color: "#1A1A2E" }}>{s.first_name} {s.last_name}</div>
                          <div style={{ fontSize: 10, color: "#90CAF9" }}>{s.gender || "\u2014"} {s.date_of_birth ? `\u00b7 ${new Date(s.date_of_birth).toLocaleDateString("en-IN")}` : ""}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: 12, color: "#374151" }}>{s.email}</div>
                      <div style={{ fontSize: 11, color: "#90CAF9" }}>{s.mobile || "\u2014"}</div>
                    </td>
                    <td><span className="badge badge-info" style={{ fontSize: 10 }}>{s.course_interest || "\u2014"}</span></td>
                    <td style={{ fontSize: 12, color: "#374151" }}>{s.tenth_percent || "\u2014"}</td>
                    <td style={{ fontSize: 12, color: "#374151" }}>{s.twelfth_percent || "\u2014"}</td>
                    <td style={{ fontSize: 12, color: "#374151" }}>{s.entrance_exam || "\u2014"} {s.score ? `(${s.score})` : ""}</td>
                    <td style={{ fontSize: 11, color: "#90CAF9", whiteSpace: "nowrap" }}>{s.created_at ? new Date(s.created_at).toLocaleDateString("en-IN") : "\u2014"}</td>
                    <td>
                      <button style={{ background: "#EFF6FF", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 11, fontWeight: 600, color: "#1565C0", cursor: "pointer" }} onClick={() => setSelected(s)}>View \u2192</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected && (
        <div className="detail-modal-overlay" onClick={() => setSelected(null)}>
          <div className="detail-modal" onClick={e => e.stopPropagation()}>
            <div style={{ background: "linear-gradient(135deg, #1565C0, #7C3AED)", padding: "24px 28px", borderRadius: "16px 16px 0 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, color: "white" }}>
                    {(selected.first_name?.[0] || "").toUpperCase()}{(selected.last_name?.[0] || "").toUpperCase()}
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", fontFamily: "Sora" }}>{selected.first_name} {selected.last_name}</h2>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{selected.email} \u00b7 {selected.mobile || "No mobile"}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Registered {selected.created_at ? new Date(selected.created_at).toLocaleDateString("en-IN") : "\u2014"}</div>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: 16 }}>\u00d7</button>
              </div>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[
                  ["Course Interest", selected.course_interest],
                  ["Date of Birth", selected.date_of_birth ? new Date(selected.date_of_birth).toLocaleDateString("en-IN") : null],
                  ["Gender", selected.gender],
                  ["Address", selected.address],
                  ["10th Percentage", selected.tenth_percent],
                  ["12th Percentage", selected.twelfth_percent],
                  ["Entrance Exam", selected.entrance_exam],
                  ["Score / Percentile", selected.score],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: "#F8FAFF", borderRadius: 8, padding: "10px 14px" }}>
                    <div style={{ fontSize: 10, color: "#90CAF9", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{k}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{v || "\u2014"}</div>
                  </div>
                ))}
              </div>
              <StudentApplicationsAdmin userId={selected.user_id} />
              <StudentDocsAdmin userId={selected.user_id} />
              <StudentPaymentsAdmin userId={selected.user_id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StudentApplicationsAdmin({ userId }) {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    supabase.from("applications").select("*").eq("user_id", userId).then(({ data }) => setApps(data || [])).catch(() => {});
  }, [userId]);
  if (apps.length === 0) return <div style={{ fontSize: 13, color: "#90CAF9", marginBottom: 12 }}>No applications submitted.</div>;
  return (
    <div style={{ marginBottom: 16 }}>
      <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1565C0", marginBottom: 8 }}>\ud83d\udccb Applications ({apps.length})</h4>
      {apps.map(a => (
        <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#F8FAFF", borderRadius: 8, marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1A2E" }}>{a.college} \u2014 {a.course}</div>
            <div style={{ fontSize: 10, color: "#90CAF9" }}>{a.exam} \u00b7 {new Date(a.created_at).toLocaleDateString("en-IN")}</div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span className={`badge ${a.status === "approved" ? "badge-success" : a.status === "rejected" ? "badge-danger" : "badge-warning"}`}>{a.status}</span>
            {a.status === "pending" && (
              <button style={{ fontSize: 10, padding: "3px 8px", background: "#ECFDF5", border: "none", borderRadius: 4, cursor: "pointer", color: "#065F46", fontWeight: 700 }}
                onClick={async () => { await supabase.from("applications").update({ status: "approved" }).eq("id", a.id); setApps(p => p.map(x => x.id === a.id ? { ...x, status: "approved" } : x)); }}>Approve</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function StudentDocsAdmin({ userId }) {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    supabase.from("student_documents").select("*").eq("user_id", userId).then(({ data }) => setDocs(data || [])).catch(() => {});
  }, [userId]);
  if (docs.length === 0) return <div style={{ fontSize: 13, color: "#90CAF9", marginBottom: 12 }}>No documents uploaded.</div>;
  return (
    <div style={{ marginBottom: 16 }}>
      <h4 style={{ fontSize: 13, fontWeight: 700, color: "#059669", marginBottom: 8 }}>\ud83d\udcc1 Documents ({docs.length})</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {docs.map(d => (
          <div key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#F8FAFF", borderRadius: 8 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1A2E" }}>{d.doc_name}</div>
              <div style={{ fontSize: 10, color: "#90CAF9" }}>{d.uploaded_at ? new Date(d.uploaded_at).toLocaleDateString("en-IN") : "\u2014"}</div>
            </div>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <span className={`badge ${d.status === "verified" ? "badge-success" : d.status === "rejected" ? "badge-danger" : "badge-warning"}`} style={{ fontSize: 9 }}>{d.status?.replace("_", " ")}</span>
              {d.status === "pending_review" && (
                <button style={{ fontSize: 10, padding: "2px 6px", background: "#ECFDF5", border: "none", borderRadius: 4, cursor: "pointer", color: "#065F46", fontWeight: 700 }}
                  onClick={async () => { await supabase.from("student_documents").update({ status: "verified" }).eq("id", d.id); setDocs(p => p.map(x => x.id === d.id ? { ...x, status: "verified" } : x)); }}>\u2713</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentPaymentsAdmin({ userId }) {
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    supabase.from("payments").select("*").eq("user_id", userId).then(({ data }) => setPayments(data || [])).catch(() => {});
  }, [userId]);
  if (payments.length === 0) return null;
  return (
    <div>
      <h4 style={{ fontSize: 13, fontWeight: 700, color: "#7C3AED", marginBottom: 8 }}>\ud83d\udcb3 Payments ({payments.length})</h4>
      {payments.map(p => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#F8FAFF", borderRadius: 8, marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1A2E" }}>{p.service_title}</div>
            <div style={{ fontSize: 10, color: "#90CAF9" }}>{new Date(p.created_at).toLocaleDateString("en-IN")}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>\u20b9{p.amount}</div>
            <span className={`badge ${p.status === "success" ? "badge-success" : "badge-danger"}`} style={{ fontSize: 9 }}>{p.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminDocVerification() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { loadDocs(); }, []);

  const loadDocs = async () => {
    setLoading(true);
    try {
      // Step 1: fetch all documents
      const { data: docData, error: docErr } = await supabase
        .from("student_documents")
        .select("*")
        .order("uploaded_at", { ascending: false });

      if (docErr) { console.warn("Doc fetch error:", docErr.message); setLoading(false); return; }
      if (!docData || docData.length === 0) { setDocs([]); setLoading(false); return; }

      // Step 2: fetch matching student profiles by user_id
      const userIds = [...new Set(docData.map(d => d.user_id))];
      const { data: studentData } = await supabase
        .from("students")
        .select("user_id, first_name, last_name, email")
        .in("user_id", userIds);

      // Step 3: merge student info into docs
      const studentMap = {};
      (studentData || []).forEach(s => { studentMap[s.user_id] = s; });

      const merged = docData.map(d => ({
        ...d,
        student: studentMap[d.user_id] || null,
      }));

      setDocs(merged);
    } catch (e) { console.warn("loadDocs error:", e); }
    setLoading(false);
  };

  const viewDoc = async (filePath) => {
    if (!filePath) return alert("File path not found.");
    try {
      const { data, error } = await supabase.storage
        .from("student-documents")
        .createSignedUrl(filePath, 60);
      if (error) throw error;
      window.open(data.signedUrl, "_blank");
    } catch (e) {
      console.warn("View doc error:", e);
      alert("Could not open file. Make sure the storage bucket exists and policies are set.");
    }
  };

  const updateStatus = async (id, status) => {
    await supabase.from("student_documents")
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq("id", id);
    setDocs(p => p.map(d => d.id === id ? { ...d, status } : d));
  };

  const pending = docs.filter(d => d.status === "pending_review");
  const reviewed = docs.filter(d => d.status !== "pending_review");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1A1A2E", fontFamily: "Sora" }}>Document Verification</h1>
          <div style={{ fontSize: 12, color: "#D97706", marginTop: 2 }}>{pending.length} documents pending review · {docs.length} total</div>
        </div>
        <button className="btn-primary" style={{ fontSize: 13 }} onClick={loadDocs}>↻ Refresh</button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>⏳</div>
          <div style={{ color: "#90CAF9", fontSize: 14 }}>Loading documents...</div>
        </div>
      ) : docs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>📁</div>
          <div style={{ color: "#6B7280", fontSize: 15, marginBottom: 6 }}>No documents uploaded yet</div>
          <div style={{ color: "#90CAF9", fontSize: 13 }}>Documents will appear here once students upload them</div>
        </div>
      ) : (
        <>
          {pending.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#D97706", marginBottom: 10 }}>
                ⚠️ Pending Review ({pending.length})
              </div>
              <div style={{ background: "white", borderRadius: 12, border: "1.5px solid #FCD34D", overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead>
                      <tr><th>Student</th><th>Document</th><th>Uploaded</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {pending.map(d => (
                        <tr key={d.id} className="student-row">
                          <td>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>
                              {d.student ? `${d.student.first_name || ""} ${d.student.last_name || ""}`.trim() : "Unknown Student"}
                            </div>
                            <div style={{ fontSize: 11, color: "#90CAF9" }}>
                              {d.student?.email || d.user_id?.substring(0, 8) + "..."}
                            </div>
                          </td>
                          <td style={{ fontSize: 13, fontWeight: 500 }}>{d.doc_name}</td>
                          <td style={{ fontSize: 11, color: "#90CAF9" }}>
                            {d.uploaded_at ? new Date(d.uploaded_at).toLocaleDateString("en-IN") : "—"}
                          </td>
                          <td>
                            <span className="badge badge-warning">
                              {d.status?.replace("_", " ")}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: 6 }}>
                              <button style={{ fontSize: 11, padding: "5px 12px", background: "#EFF6FF", border: "none", borderRadius: 6, cursor: "pointer", color: "#1565C0", fontWeight: 700 }}
                                onClick={() => viewDoc(d.file_path)}>👁 View</button>
                              <button style={{ fontSize: 11, padding: "5px 12px", background: "#ECFDF5", border: "none", borderRadius: 6, cursor: "pointer", color: "#065F46", fontWeight: 700 }}
                                onClick={() => updateStatus(d.id, "verified")}>✓ Verify</button>
                              <button style={{ fontSize: 11, padding: "5px 12px", background: "#FEF2F2", border: "none", borderRadius: 6, cursor: "pointer", color: "#991B1B", fontWeight: 700 }}
                                onClick={() => updateStatus(d.id, "rejected")}>✗ Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {reviewed.length > 0 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#6B7280", marginBottom: 10 }}>
                Reviewed Documents ({reviewed.length})
              </div>
              <div style={{ background: "white", borderRadius: 12, border: "1px solid #E3F2FD", overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead>
                      <tr><th>Student</th><th>Document</th><th>Uploaded</th><th>Reviewed</th><th>Status</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {reviewed.map(d => (
                        <tr key={d.id} className="student-row">
                          <td>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>
                              {d.student ? `${d.student.first_name || ""} ${d.student.last_name || ""}`.trim() : "Unknown"}
                            </div>
                            <div style={{ fontSize: 11, color: "#90CAF9" }}>{d.student?.email || "—"}</div>
                          </td>
                          <td style={{ fontSize: 13 }}>{d.doc_name}</td>
                          <td style={{ fontSize: 11, color: "#90CAF9" }}>
                            {d.uploaded_at ? new Date(d.uploaded_at).toLocaleDateString("en-IN") : "—"}
                          </td>
                          <td style={{ fontSize: 11, color: "#90CAF9" }}>
                            {d.reviewed_at ? new Date(d.reviewed_at).toLocaleDateString("en-IN") : "—"}
                          </td>
                          <td><span className={`badge ${d.status === "verified" ? "badge-success" : "badge-danger"}`}>{d.status}</span></td>
                          <td>
                            <div style={{ display: "flex", gap: 6 }}>
                              <button style={{ fontSize: 11, padding: "5px 12px", background: "#EFF6FF", border: "none", borderRadius: 6, cursor: "pointer", color: "#1565C0", fontWeight: 700 }}
                                onClick={() => viewDoc(d.file_path)}>👁 View</button>
                              {d.status === "verified" && (
                                <button style={{ fontSize: 10, padding: "4px 8px", background: "#FEF2F2", border: "none", borderRadius: 5, cursor: "pointer", color: "#991B1B", fontWeight: 700 }}
                                  onClick={() => updateStatus(d.id, "rejected")}>Reject</button>
                              )}
                              {d.status === "rejected" && (
                                <button style={{ fontSize: 10, padding: "4px 8px", background: "#ECFDF5", border: "none", borderRadius: 5, cursor: "pointer", color: "#065F46", fontWeight: 700 }}
                                  onClick={() => updateStatus(d.id, "verified")}>Verify</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [students, setStudents] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => { loadApps(); }, []);

  const loadApps = async () => {
    setLoading(true);
    try {
      // Fetch applications
      const { data: appData, error: appErr } = await supabase
        .from("applications").select("*").order("created_at", { ascending: false });
      if (appErr) { console.warn("Apps error:", appErr.message); setLoading(false); return; }

      // Fetch student profiles separately
      const userIds = [...new Set((appData || []).map(a => a.user_id))];
      if (userIds.length > 0) {
        const { data: studentData } = await supabase
          .from("students").select("user_id, first_name, last_name, email, mobile")
          .in("user_id", userIds);
        const map = {};
        (studentData || []).forEach(s => { map[s.user_id] = s; });
        setStudents(map);
      }
      setApps(appData || []);
    } catch (e) { console.warn(e); }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await supabase.from("applications").update({ status }).eq("id", id);
    setApps(p => p.map(a => a.id === id ? { ...a, status } : a));
  };

  const filtered = filter === "all" ? apps : apps.filter(a => a.status === filter);
  const counts = {
    all: apps.length,
    pending: apps.filter(a => a.status === "pending").length,
    under_review: apps.filter(a => a.status === "under_review").length,
    approved: apps.filter(a => a.status === "approved").length,
    rejected: apps.filter(a => a.status === "rejected").length,
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1A1A2E", fontFamily: "Sora" }}>Applications</h1>
          <div style={{ fontSize: 12, color: "#90CAF9", marginTop: 2 }}>{apps.length} total applications</div>
        </div>
        <button className="btn-primary" style={{ fontSize: 13 }} onClick={loadApps}>↻ Refresh</button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {[["all","All","#1565C0"],["pending","Pending","#D97706"],["under_review","Under Review","#1565C0"],["approved","Approved","#059669"],["rejected","Rejected","#DC2626"]].map(([val,label,color]) => (
          <button key={val} onClick={() => setFilter(val)} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${filter === val ? color : "#E3F2FD"}`, background: filter === val ? color : "white", color: filter === val ? "white" : "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {label} ({counts[val]})
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#90CAF9" }}>Loading applications...</div>
      ) : (
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #E3F2FD", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr><th>#</th><th>Student</th><th>College</th><th>Course</th><th>Exam</th><th>Applied</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: "center", padding: "32px 0", color: "#90CAF9" }}>No applications found</td></tr>
                ) : filtered.map((a, i) => {
                  const s = students[a.user_id];
                  return (
                    <tr key={a.id} className="student-row">
                      <td style={{ color: "#90CAF9", fontSize: 12 }}>{i + 1}</td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{s ? `${s.first_name || ""} ${s.last_name || ""}`.trim() : "Unknown"}</div>
                        <div style={{ fontSize: 10, color: "#90CAF9" }}>{s?.email || "—"}</div>
                      </td>
                      <td style={{ fontSize: 13, fontWeight: 500 }}>{a.college}</td>
                      <td style={{ fontSize: 12 }}>{a.course}</td>
                      <td style={{ fontSize: 12 }}>{a.exam || "—"}</td>
                      <td style={{ fontSize: 11, color: "#90CAF9" }}>{new Date(a.created_at).toLocaleDateString("en-IN")}</td>
                      <td><span className={`badge ${a.status === "approved" ? "badge-success" : a.status === "rejected" ? "badge-danger" : a.status === "under_review" ? "badge-info" : "badge-warning"}`}>{a.status?.replace("_"," ")}</span></td>
                      <td>
                        <div style={{ display: "flex", gap: 4 }}>
                          {(a.status === "pending" || a.status === "under_review") && <>
                            <button style={{ fontSize: 10, padding: "4px 8px", background: "#ECFDF5", border: "none", borderRadius: 5, cursor: "pointer", color: "#065F46", fontWeight: 700 }} onClick={() => updateStatus(a.id, "approved")}>✓</button>
                            <button style={{ fontSize: 10, padding: "4px 8px", background: "#FEF2F2", border: "none", borderRadius: 5, cursor: "pointer", color: "#991B1B", fontWeight: 700 }} onClick={() => updateStatus(a.id, "rejected")}>✗</button>
                          </>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState({});
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const { data: payData } = await supabase
          .from("payments").select("*").order("created_at", { ascending: false });

        const userIds = [...new Set((payData || []).map(p => p.user_id))];
        if (userIds.length > 0) {
          const { data: studentData } = await supabase
            .from("students").select("user_id, first_name, last_name, email")
            .in("user_id", userIds);
          const map = {};
          (studentData || []).forEach(s => { map[s.user_id] = s; });
          setStudents(map);
        }
        setPayments(payData || []);
        setTotal((payData || []).filter(p => p.status === "success").reduce((s, p) => s + (p.amount || 0), 0));
      } catch (e) { console.warn(e); }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1A1A2E", fontFamily: "Sora" }}>Payment Records</h1>
          <div style={{ fontSize: 12, color: "#059669", marginTop: 2, fontWeight: 600 }}>Total Revenue: ₹{total.toLocaleString("en-IN")}</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Total", val: payments.length, color: "#1565C0" },
          { label: "Successful", val: payments.filter(p => p.status === "success").length, color: "#059669" },
          { label: "Failed", val: payments.filter(p => p.status === "failed").length, color: "#DC2626" },
          { label: "Revenue", val: `₹${total.toLocaleString("en-IN")}`, color: "#7C3AED" },
        ].map(s => (
          <div key={s.label} className="admin-stat-card" style={{ borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "Sora" }}>{s.val}</div>
          </div>
        ))}
      </div>
      {loading ? <div style={{ textAlign: "center", padding: "40px 0", color: "#90CAF9" }}>Loading payments...</div> : (
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #E3F2FD", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead><tr><th>Student</th><th>Service</th><th>Amount</th><th>Payment ID</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: "32px 0", color: "#90CAF9" }}>No payments yet</td></tr>
                ) : payments.map(p => {
                  const s = students[p.user_id];
                  return (
                    <tr key={p.id} className="student-row">
                      <td>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{s ? `${s.first_name || ""} ${s.last_name || ""}`.trim() : "Unknown"}</div>
                        <div style={{ fontSize: 10, color: "#90CAF9" }}>{s?.email || "—"}</div>
                      </td>
                      <td style={{ fontSize: 12 }}>{p.service_title}</td>
                      <td style={{ fontSize: 14, fontWeight: 700, color: "#059669" }}>₹{p.amount}</td>
                      <td style={{ fontSize: 10, color: "#90CAF9", fontFamily: "monospace" }}>{p.razorpay_payment_id || "—"}</td>
                      <td style={{ fontSize: 11, color: "#90CAF9" }}>{new Date(p.created_at).toLocaleDateString("en-IN")}</td>
                      <td><span className={`badge ${p.status === "success" ? "badge-success" : "badge-danger"}`}>{p.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminCounseling() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("counseling_bookings").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setBookings(data || []); setLoading(false); }).catch(e => { console.warn(e); setLoading(false); });
  }, []);
  const updateStatus = async (id, status) => {
    await supabase.from("counseling_bookings").update({ status }).eq("id", id);
    setBookings(p => p.map(b => b.id === id ? { ...b, status } : b));
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div><h1 style={{ fontSize: 22, fontWeight: 800, color: "#1A1A2E", fontFamily: "Sora" }}>Counseling Sessions</h1><div style={{ fontSize: 12, color: "#90CAF9", marginTop: 2 }}>{bookings.filter(b => b.status === "pending").length} pending sessions</div></div>
      </div>
      {loading ? <div style={{ textAlign: "center", padding: "40px 0", color: "#90CAF9" }}>Loading...</div> : (
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #E3F2FD", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}><table>
            <thead><tr><th>Student</th><th>Mobile</th><th>Stream</th><th>Preferred Date</th><th>Booked</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {bookings.length === 0 ? <tr><td colSpan={7} style={{ textAlign: "center", padding: "32px 0", color: "#90CAF9" }}>No sessions booked yet</td></tr>
              : bookings.map(b => (
                <tr key={b.id} className="student-row">
                  <td style={{ fontWeight: 600, fontSize: 13 }}>{b.full_name}</td>
                  <td style={{ fontSize: 12 }}>{b.mobile}</td>
                  <td><span className="badge badge-info" style={{ fontSize: 10 }}>{b.stream || "\u2014"}</span></td>
                  <td style={{ fontSize: 12 }}>{b.preferred_date ? new Date(b.preferred_date).toLocaleDateString("en-IN") : "\u2014"}</td>
                  <td style={{ fontSize: 11, color: "#90CAF9" }}>{new Date(b.created_at).toLocaleDateString("en-IN")}</td>
                  <td><span className={`badge ${b.status === "confirmed" ? "badge-success" : b.status === "completed" ? "badge-gray" : "badge-warning"}`}>{b.status}</span></td>
                  <td>{b.status === "pending" && <div style={{ display: "flex", gap: 4 }}>
                    <button style={{ fontSize: 10, padding: "4px 8px", background: "#ECFDF5", border: "none", borderRadius: 5, cursor: "pointer", color: "#065F46", fontWeight: 700 }} onClick={() => updateStatus(b.id, "confirmed")}>Confirm</button>
                    <button style={{ fontSize: 10, padding: "4px 8px", background: "#EFF6FF", border: "none", borderRadius: 5, cursor: "pointer", color: "#1565C0", fontWeight: 700 }} onClick={() => updateStatus(b.id, "completed")}>Done</button>
                  </div>}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
      )}
    </div>
  );
}

function AdminNotifications() {
  const [form, setForm] = useState({ title: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const handleSend = async () => {
    if (!form.title || !form.message) return alert("Fill in title and message.");
    setSending(true);
    try {
      const { data: students } = await supabase.from("students").select("user_id");
      if (students) {
        await supabase.from("notifications").insert(students.map(s => ({ user_id: s.user_id, title: form.title, message: form.message, type: "info", is_read: false, created_at: new Date().toISOString() })));
        setSent(true); setForm({ title: "", message: "" }); setTimeout(() => setSent(false), 4000);
      }
    } catch (e) { console.warn(e); }
    setSending(false);
  };
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1A1A2E", fontFamily: "Sora", marginBottom: 20 }}>Notification Center</h1>
      {sent && <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#065F46" }}>\u2705 Sent to all students!</div>}
      <div style={{ background: "white", borderRadius: 14, border: "1px solid #E3F2FD", padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E", marginBottom: 16 }}>Send Bulk Notification</h3>
        <label>Title</label><input placeholder="e.g. JEE Main 2026 Registration Open" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        <label>Message</label><textarea rows={4} placeholder="Type your message..." style={{ resize: "vertical" }} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
        <button className="btn-primary" style={{ opacity: sending ? 0.7 : 1 }} onClick={handleSend} disabled={sending}>{sending ? "Sending..." : "\ud83d\udce2 Send to All Students"}</button>
      </div>
    </div>
  );
}

function AdminReports({ stats }) {
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1A1A2E", fontFamily: "Sora", marginBottom: 20 }}>Reports &amp; Analytics</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        <div style={{ background: "white", borderRadius: 14, border: "1px solid #E3F2FD", padding: 22 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 16 }}>Admissions by Stream</h3>
          {[{label:"Engineering",pct:42,color:"#1565C0"},{label:"Medical",pct:28,color:"#059669"},{label:"Management",pct:14,color:"#7C3AED"},{label:"Law",pct:9,color:"#D97706"},{label:"Architecture",pct:4,color:"#0891B2"},{label:"Others",pct:3,color:"#6B7280"}].map(b => (
            <div key={b.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{b.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: b.color }}>{b.pct}%</span>
              </div>
              <div style={{ background: "#E3F2FD", borderRadius: 10, height: 7, overflow: "hidden" }}>
                <div style={{ width: `${b.pct}%`, background: b.color, borderRadius: 10, height: "100%" }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "white", borderRadius: 14, border: "1px solid #E3F2FD", padding: 22 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 16 }}>Live Metrics from Database</h3>
          {[
            {label:"Total Students Enrolled",val:stats.students,color:"#1565C0"},
            {label:"Total Applications",val:stats.applications,color:"#059669"},
            {label:"Approved Applications",val:stats.approved,color:"#059669"},
            {label:"Rejected Applications",val:stats.rejected,color:"#DC2626"},
            {label:"Documents Pending Review",val:stats.pending_docs,color:"#D97706"},
            {label:"Counseling Sessions Booked",val:stats.counseling,color:"#7C3AED"},
            {label:"Successful Payments",val:stats.payments,color:"#059669"},
            {label:"Application Approval Rate",val:stats.applications>0?`${Math.round((stats.approved/stats.applications)*100)}%`:"\u2014",color:"#059669"},
          ].map(m => (
            <div key={m.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #F0F7FF" }}>
              <span style={{ fontSize: 12, color: "#374151" }}>{m.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: m.color }}>{m.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminSettings() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1A1A2E", fontFamily: "Sora", marginBottom: 20 }}>Settings</h1>
      {saved && <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 8, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#065F46" }}>\u2705 Settings saved!</div>}
      {[
        { title: "\ud83c\udfe2 Organization Profile", fields: [["Organization Name","Educeff"],["Registration No.","U80900MH2015PTC123456"],["Email","admin@educeff.com"],["Phone","+91 98765 43210"],["Address","123 Pimpri Road, Pune 411018"]] },
        { title: "\ud83d\udd12 Security Settings", fields: [["OTP Validity","10 minutes"],["JWT Expiry","24 hours"],["Max Login Attempts","5"],["Session Timeout","60 minutes"]] },
        { title: "\ud83d\udd14 Notification Settings", fields: [["SMS Notifications","Enabled"],["Email Notifications","Enabled"],["In-App Notifications","Enabled"],["Bulk SMS Limit","500/day"]] },
      ].map(s => (
        <div key={s.title} style={{ background: "white", borderRadius: 14, border: "1px solid #E3F2FD", padding: 24, marginBottom: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E", marginBottom: 18 }}>{s.title}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0 20px" }}>
            {s.fields.map(([k, v]) => (<div key={k} style={{ marginBottom: 14 }}><label>{k}</label><input defaultValue={v} /></div>))}
          </div>
          <button className="btn-primary" style={{ fontSize: 13 }} onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}>Save Changes</button>
        </div>
      ))}
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
                Today, we've guided thousands of students into their dream colleges — from premier IITs and NITs to top private institutions across the country. Our certified team of {SITE_STATS.counselors} counselors brings together expertise in engineering, medical, law, management, and arts streams.
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
  const DETAILED_SERVICES = [
    {
      icon: "📋",
      title: "Exam Form Filling Assistance",
      color: "#E3F2FD",
      accent: "#1565C0",
      who: "Students appearing in JEE, NEET, MHT-CET, CLAT, CAT, CUET and 70+ other entrance exams.",
      what: "We handle the complete online registration process on your behalf — from creating the exam account to uploading photos/signatures to fee payment and printing the confirmation.",
      deliverables: ["Filled and submitted exam application", "Fee payment receipt", "Confirmation PDF with hall-ticket download link", "Error-check before submission"],
      turnaround: "24–48 hours from document receipt",
      price: "{{OWNER_INPUT: price_per_exam_form}}",
      note: "Student reviews and approves the prefilled form before submission.",
    },
    {
      icon: "🎓",
      title: "Educational Counseling",
      color: "#F0FDF4",
      accent: "#059669",
      who: "Class 10–12 students and parents unsure about stream selection, college choice, or career direction.",
      what: "One-on-one session with a certified counselor who analyses your academic profile, interests, and goals to recommend the right stream, entrance exams, and target colleges.",
      deliverables: ["45-minute counseling session (video/phone)", "Written profile assessment report", "Recommended stream + exam list", "College shortlist (top 10)", "1 follow-up query within 7 days"],
      turnaround: "Session within 48 hours of booking",
      price: "{{OWNER_INPUT: price_counseling_session}}",
      note: "First session is free for registered students.",
    },
    {
      icon: "🧭",
      title: "Career Counseling",
      color: "#FFF7ED",
      accent: "#EA580C",
      who: "Students after Class 12, graduates, and professionals considering a career pivot.",
      what: "Data-driven career mapping using psychometric assessment tools combined with market demand analysis. Covers engineering, medical, law, management, creative, and emerging tech careers.",
      deliverables: ["Psychometric assessment report", "Career roadmap document", "Top 5 career paths ranked by fit", "Required qualification plan", "Action plan for next 12 months"],
      turnaround: "Report within 72 hours of assessment",
      price: "{{OWNER_INPUT: price_career_counseling}}",
      note: "Includes follow-up session after report delivery.",
    },
    {
      icon: "🏛️",
      title: "College Admission Assistance",
      color: "#F5F3FF",
      accent: "#7C3AED",
      who: "Students who have appeared in entrance exams and need guidance through counseling rounds and admission.",
      what: "End-to-end support from choice-filling in counseling rounds to final allotment acceptance, fee payment, and document submission at the college.",
      deliverables: ["Counseling round strategy and choice-filling", "Merit-based college-and-branch prioritization", "Document checklist and verification", "Admission fee payment guidance", "Post-admission enrollment support"],
      turnaround: "Throughout the counseling cycle",
      price: "{{OWNER_INPUT: price_admission_assistance}}",
      note: "Success-fee model available — pay only after admission confirmed.",
    },
    {
      icon: "💰",
      title: "Scholarship Assistance",
      color: "#ECFDF5",
      accent: "#059669",
      who: "Students from any income group — central government, state government, minority, merit, sports, and private scholarships.",
      what: "We identify scholarships you are eligible for, prepare and submit applications, track disbursement, and follow up with scholarship authorities on your behalf.",
      deliverables: ["Eligibility assessment report", "List of applicable scholarships", "Application filing for up to 5 schemes", "Document preparation and attestation guidance", "Follow-up until disbursement"],
      turnaround: "Applications filed within 5 working days",
      price: "{{OWNER_INPUT: price_scholarship_assistance}}",
      note: "Success-fee option available: a small percentage of the scholarship amount secured (rate TBD by owner).",
    },
    {
      icon: "📄",
      title: "Document Verification Support",
      color: "#FFF5F5",
      accent: "#DC2626",
      who: "Students preparing documents for university admission, government exams, or visa applications.",
      what: "We verify that your academic, category, domicile, and identity documents meet the requirements of your target institution or exam authority — catching errors before they cost you an opportunity.",
      deliverables: ["Document gap analysis report", "Checklist of missing/deficient documents", "Guidance on obtaining corrections/duplicates", "Notarization and attestation referral", "Final document readiness certificate"],
      turnaround: "Report within 24 hours of document upload",
      price: "{{OWNER_INPUT: price_doc_verification}}",
      note: "Included free with College Admission Assistance package.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #64B5F6, #7C3AED)", padding: "64px 0" }}>
        <div className="container">
          <div className="tag" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.15)" }}>What We Offer</div>
          <h1 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: 12 }}>Our Services</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, maxWidth: 540 }}>Clear deliverables, honest timelines, and transparent pricing — so you know exactly what you're getting before you pay.</p>
        </div>
      </div>

      {/* Pricing note */}
      <div style={{ background: "#FFFBEB", borderBottom: "1px solid #FDE68A", padding: "12px 0" }}>
        <div className="container">
          <p style={{ fontSize: 13, color: "#92400E", textAlign: "center" }}>
            ⚠️ Prices marked <strong>[PRICE TBD]</strong> are pending owner confirmation and will be updated before go-live.
          </p>
        </div>
      </div>

      <section className="section" style={{ background: "#F8FAFF" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {DETAILED_SERVICES.map(s => (
              <div key={s.title} style={{ background: "white", borderRadius: 16, border: "1px solid #E3F2FD", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                {/* Card header */}
                <div style={{ background: s.color, padding: "24px 24px 20px" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E", marginBottom: 6 }}>{s.title}</h3>
                  <div style={{ fontSize: 12, color: "#6B7280", background: "white", display: "inline-block", padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>For: {s.who}</div>
                </div>

                <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* What we do */}
                  <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>{s.what}</p>

                  {/* Deliverables */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: s.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>What You Receive</div>
                    <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}>
                      {s.deliverables.map(d => (
                        <li key={d} style={{ fontSize: 12, color: "#374151", marginBottom: 5, display: "flex", gap: 6, alignItems: "flex-start" }}>
                          <span style={{ color: s.accent, fontWeight: 700, flexShrink: 0 }}>✓</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Turnaround + Price */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14, marginTop: "auto" }}>
                    <div style={{ background: "#F8FAFF", borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ fontSize: 10, color: "#90CAF9", fontWeight: 600, marginBottom: 3 }}>⏱ TURNAROUND</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1A2E" }}>{s.turnaround}</div>
                    </div>
                    <div style={{ background: s.color, borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ fontSize: 10, color: s.accent, fontWeight: 600, marginBottom: 3 }}>💰 STARTING FROM</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: s.accent }}>{s.price}</div>
                    </div>
                  </div>

                  {/* Note */}
                  <div style={{ fontSize: 11, color: "#6B7280", fontStyle: "italic", marginBottom: 16, padding: "8px 10px", background: "#F8FAFF", borderRadius: 6, borderLeft: `3px solid ${s.accent}` }}>
                    ℹ️ {s.note}
                  </div>

                  <button className="btn-primary" style={{ width: "100%", fontSize: 13, padding: "11px 0" }}
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
                    Book This Service →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Accuracy & Refund Policy — P3-3 */}
          <div style={{ marginTop: 40, background: "white", borderRadius: 16, border: "1px solid #BFDBFE", padding: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1565C0", marginBottom: 12 }}>📋 Accuracy &amp; Refund Policy for Form Filling</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, fontSize: 13, color: "#374151", lineHeight: 1.7 }}>
              <div><strong style={{ color: "#1A1A2E" }}>Student Review Step</strong><br />Every prefilled form is shared with the student/parent for review and explicit approval before submission. We do not submit without sign-off.</div>
              <div><strong style={{ color: "#1A1A2E" }}>If Educeff Makes an Error</strong><br />[OWNER INPUT: refund_policy_terms] — placeholder until owner confirms remediation/refund terms.</div>
              <div><strong style={{ color: "#1A1A2E" }}>Official Dates Disclaimer</strong><br />Exam dates, fees, and eligibility are verified at the time of filing but must be independently confirmed at the official exam authority website before submission.</div>
              <div><strong style={{ color: "#1A1A2E" }}>Refunds</strong><br />[OWNER INPUT: refund_policy_terms] — service fee refund terms to be defined by owner.</div>
            </div>
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

function ExamCard({ exam, isLoggedIn, onRemind }) {
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

      {/* Conducting Body + lastVerified */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: "#90CAF9" }}>
          By: <span style={{ color: "#64B5F6", fontWeight: 600 }}>{exam.conductedBy}</span>
        </div>
        {exam.lastVerified ? (
          <span style={{ background: "#ECFDF5", color: "#059669", fontSize: 9, padding: "2px 7px", borderRadius: 8, fontWeight: 700 }}>
            ✓ Verified {new Date(exam.lastVerified).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
          </span>
        ) : (
          <span style={{ background: "#FFFBEB", color: "#D97706", fontSize: 9, padding: "2px 7px", borderRadius: 8, fontWeight: 700 }}>
            ⚠️ Verify at official site
          </span>
        )}
      </div>

      {/* Buttons — P1-3: Official site + Educeff CTA */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {!isExpired && (
          <button style={{ width: "100%", fontSize: 12, padding: "9px 0", background: "linear-gradient(135deg, #1565C0, #7C3AED)", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}
            onClick={() => { if(typeof setModal === "function") setModal("register"); else window.location.href = "/#register"; }}>
            🎓 Let Educeff Fill This Form
          </button>
        )}
        <div style={{ display: "flex", gap: 6 }}>
          <button style={{ flex: 1, fontSize: 11, padding: "7px 0", background: isExpired ? "#F0F7FF" : "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 7, cursor: isExpired ? "default" : "pointer", color: isExpired ? "#90CAF9" : "#1565C0", fontWeight: 600 }}
            onClick={() => !isExpired && window.open(exam.officialLink, "_blank")}>
            {isExpired ? "Closed" : "Official Site →"}
          </button>
          {!isExpired && (
            <button style={{ flex: 1, fontSize: 11, padding: "7px 0", background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: 7, cursor: "pointer", color: "#7C3AED", fontWeight: 600 }}
              onClick={() => window.open(exam.officialLink, "_blank")}>
              📋 Exam Info
            </button>
          )}
        </div>
        {/* P1-4: Track/Remind — gates behind free account */}
        {!isExpired && (
          <button style={{ width: "100%", fontSize: 11, padding: "7px 0", background: "white", border: "1px solid #E3F2FD", borderRadius: 7, cursor: "pointer", color: "#6B7280", fontWeight: 500 }}
            onClick={() => onRemind && onRemind(exam)}>
            🔔 Remind me before deadline
          </button>
        )}
      </div>
    </div>
  );
}

function CollegesPage() {
  const [activeStream, setActiveStream] = useState("All");
  const [activeTab, setActiveTab] = useState("exams");
  const [search, setSearch] = useState("");
  const [remindExam, setRemindExam] = useState(null); // P1-4: exam to set reminder for
  const [remindDone, setRemindDone] = useState(false);
  const [remindForm, setRemindForm] = useState({ name: "", email: "", mobile: "" });
  const [applyCollege, setApplyCollege] = useState(null); // college being applied to
  const [applyForm, setApplyForm] = useState({ name: "", email: "", mobile: "", course: "", exam: "", message: "" });
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyDone, setApplyDone] = useState(false);
  const [applyError, setApplyError] = useState("");

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
    // lastVerified: date Educeff last confirmed this data against official source
    { name: "JEE Main", fullName: "Joint Entrance Examination Main", stream: "Engineering", level: "Govt · National", formStart: "Nov 2025", lastDateDisplay: "Dec 31, 2025", lastDate: "2025-12-31", examDate: "Jan–Apr 2026", fee: "₹1,000", mode: "Online (CBT)", conductedBy: "NTA", nextCycle: "Nov 2026", officialLink: "https://jeemain.nta.nic.in", lastVerified: "2025-11-01" },
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
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, marginBottom: 28 }}>{SITE_STATS.partnerColleges}+ partner colleges listed · Maharashtra &amp; National · Live exam deadlines with countdown timers</p>
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
                  {filteredExams.map(exam => <ExamCard key={exam.name} exam={exam} isLoggedIn={false} onRemind={(e) => { setRemindExam(e); setRemindDone(false); setRemindForm({ name: "", email: "", mobile: "" }); }} />)}
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
                    <button className="btn-primary" style={{ fontSize: 12, width: "100%" }}
                      onClick={() => { setApplyCollege(c); setApplyDone(false); setApplyError(""); setApplyForm({ name: "", email: "", mobile: "", course: c.stream, exam: "", message: "" }); }}>
                      Apply Through Educeff →
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Apply Modal */}
      {applyCollege && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(13,27,75,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}
          onClick={() => setApplyCollege(null)}>
          <div style={{ background: "white", borderRadius: 16, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }}
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #64B5F6, #7C3AED)", padding: "20px 24px", borderRadius: "16px 16px 0 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Apply Through Educeff</div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: "white", margin: 0 }}>{applyCollege.name}</h2>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>📍 {applyCollege.city} · {applyCollege.stream}</div>
                </div>
                <button onClick={() => setApplyCollege(null)} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: 16, flexShrink: 0 }}>×</button>
              </div>
            </div>

            <div style={{ padding: 24 }}>
              {applyDone ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#059669", marginBottom: 8 }}>Application Submitted!</h3>
                  <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 20, lineHeight: 1.6 }}>
                    Our counselor will contact you within <strong>2 hours</strong> to guide you through the admission process for <strong>{applyCollege.name}</strong>.
                  </p>
                  <div style={{ background: "#F0FDF4", border: "1px solid #A7F3D0", borderRadius: 10, padding: 16, marginBottom: 20, textAlign: "left" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#065F46", marginBottom: 8 }}>✅ What happens next:</div>
                    <ul style={{ paddingLeft: 18, fontSize: 13, color: "#065F46", lineHeight: 2, margin: 0 }}>
                      <li>Counselor reviews your profile</li>
                      <li>You receive a call to discuss eligibility</li>
                      <li>Document checklist shared with you</li>
                      <li>Application submitted on your behalf</li>
                    </ul>
                  </div>
                  <button className="btn-primary" style={{ width: "100%", padding: 12 }} onClick={() => setApplyCollege(null)}>Done →</button>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20, lineHeight: 1.6 }}>
                    Fill in your details and our expert counselors will guide you through the complete admission process for this college — from eligibility check to final admission.
                  </p>

                  {applyError && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#DC2626" }}>{applyError}</div>}

                  <label>Full Name *</label>
                  <input placeholder="Your full name" value={applyForm.name} onChange={e => setApplyForm(f => ({ ...f, name: e.target.value }))} />

                  <label>Email Address *</label>
                  <input type="email" placeholder="your@email.com" value={applyForm.email} onChange={e => setApplyForm(f => ({ ...f, email: e.target.value }))} />

                  <label>Mobile Number *</label>
                  <input placeholder="+91 98765 43210" value={applyForm.mobile} onChange={e => setApplyForm(f => ({ ...f, mobile: e.target.value }))} />

                  <label>Course You Want to Apply For *</label>
                  <input placeholder={`e.g. B.E. Computer Science, MBBS, LLB`} value={applyForm.course} onChange={e => setApplyForm(f => ({ ...f, course: e.target.value }))} />

                  <label>Entrance Exam Appeared / Score</label>
                  <input placeholder="e.g. JEE Main - 95 percentile, NEET - 620" value={applyForm.exam} onChange={e => setApplyForm(f => ({ ...f, exam: e.target.value }))} />

                  <label>Additional Message (Optional)</label>
                  <textarea rows={3} placeholder="Any specific queries or requirements..." style={{ resize: "vertical" }} value={applyForm.message} onChange={e => setApplyForm(f => ({ ...f, message: e.target.value }))} />

                  <button className="btn-primary" style={{ width: "100%", padding: 14, opacity: applyLoading ? 0.7 : 1, marginTop: 4 }}
                    disabled={applyLoading}
                    onClick={async () => {
                      if (!applyForm.name.trim()) { setApplyError("Please enter your full name."); return; }
                      if (!applyForm.email.trim() || !applyForm.email.includes("@")) { setApplyError("Please enter a valid email."); return; }
                      if (!applyForm.mobile.replace(/\D/g, "").match(/^\d{10}$/)) { setApplyError("Please enter a valid 10-digit mobile number."); return; }
                      if (!applyForm.course.trim()) { setApplyError("Please enter the course you want to apply for."); return; }
                      setApplyError(""); setApplyLoading(true);
                      try {
                        await supabase.from("contact_messages").insert({
                          full_name: sanitize(applyForm.name),
                          email: applyForm.email.toLowerCase().trim(),
                          phone: applyForm.mobile.trim(),
                          subject: `College Application: ${applyCollege.name}`,
                          message: `College: ${applyCollege.name} (${applyCollege.city})\nStream: ${applyCollege.stream}\nCourse: ${sanitize(applyForm.course)}\nExam/Score: ${sanitize(applyForm.exam)}\nMessage: ${sanitize(applyForm.message)}`,
                          created_at: new Date().toISOString(),
                        });
                        setApplyDone(true);
                      } catch(e) {
                        setApplyError("Submission failed. Please try again or call us directly.");
                      }
                      setApplyLoading(false);
                    }}>
                    {applyLoading ? "Submitting..." : "Submit Application Request →"}
                  </button>

                  <p style={{ fontSize: 11, color: "#90CAF9", textAlign: "center", marginTop: 12 }}>
                    By submitting, you agree to be contacted by Educeff counselors regarding this application.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* P1-4: Exam Reminder Modal — gates behind free account */}
      {remindExam && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(13,27,75,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}
          onClick={() => setRemindExam(null)}>
          <div style={{ background: "white", borderRadius: 16, width: "100%", maxWidth: 440, padding: 32, boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }}
            onClick={e => e.stopPropagation()}>
            {remindDone ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 52, marginBottom: 12 }}>🔔</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#059669", marginBottom: 8 }}>Reminder Set!</h3>
                <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 20 }}>We'll remind you before the <strong>{remindExam.name}</strong> deadline on <strong>{remindExam.lastDateDisplay}</strong>.</p>
                <button className="btn-primary" style={{ width: "100%" }} onClick={() => setRemindExam(null)}>Done ✓</button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#90CAF9", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Set Deadline Reminder</div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E", marginTop: 4 }}>{remindExam.name}</h3>
                    <div style={{ fontSize: 13, color: "#DC2626", fontWeight: 600, marginTop: 2 }}>Last Date: {remindExam.lastDateDisplay}</div>
                  </div>
                  <button onClick={() => setRemindExam(null)} style={{ background: "#F0F7FF", border: "none", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: 16 }}>×</button>
                </div>
                <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20, lineHeight: 1.6 }}>
                  Get reminded 7 days and 1 day before this deadline via email and WhatsApp — completely free.
                </p>
                <label>Your Name</label>
                <input placeholder="Full name" value={remindForm.name} onChange={e => setRemindForm(f => ({ ...f, name: e.target.value }))} />
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" value={remindForm.email} onChange={e => setRemindForm(f => ({ ...f, email: e.target.value }))} />
                <label>WhatsApp Number</label>
                <input placeholder="+91 98765 43210" value={remindForm.mobile} onChange={e => setRemindForm(f => ({ ...f, mobile: e.target.value }))} />
                <button className="btn-primary" style={{ width: "100%", marginTop: 4, padding: 12 }}
                  onClick={async () => {
                    if (!remindForm.name || !remindForm.email) return;
                    try {
                      await supabase.from("contact_messages").insert({
                        full_name: sanitize(remindForm.name),
                        email: remindForm.email.toLowerCase().trim(),
                        phone: remindForm.mobile.trim(),
                        subject: `Exam Reminder: ${remindExam.name}`,
                        message: `Reminder request for ${remindExam.name} — Last Date: ${remindExam.lastDateDisplay}`,
                        created_at: new Date().toISOString(),
                      });
                    } catch(e) { console.warn(e); }
                    setRemindDone(true);
                  }}>
                  🔔 Set Free Reminder
                </button>
                <p style={{ fontSize: 11, color: "#90CAF9", textAlign: "center", marginTop: 10 }}>
                  By registering, Educeff can also help you fill this exam form — <span style={{ color: "#7C3AED", fontWeight: 600 }}>save hours of hassle</span>.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


// ─── RESET PASSWORD PAGE ─────────────────────────────────────────────────────
function ResetPasswordPage({ onDone }) {
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    setError("");
    if (!newPw || newPw.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (newPw !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.updateUser({ password: newPw });
      if (err) throw err;
      setSuccess(true);
      setTimeout(() => onDone(), 3000);
    } catch (e) {
      setError(e.message || "Failed to reset password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #64B5F6 0%, #7C3AED 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "white", borderRadius: 16, padding: 40, width: "100%", maxWidth: 420, boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, background: "linear-gradient(135deg, #64B5F6, #7C3AED)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 22, fontWeight: 800, color: "white", fontFamily: "Sora" }}>E</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1A1A2E", margin: 0, fontFamily: "Sora" }}>Reset Your Password</h2>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 6 }}>Enter your new password below</p>
        </div>

        {success ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>✅</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#059669", marginBottom: 8 }}>Password Reset!</h3>
            <p style={{ fontSize: 14, color: "#6B7280" }}>Your password has been updated successfully. Redirecting you to the homepage...</p>
          </div>
        ) : (
          <>
            {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#DC2626" }}>{error}</div>}

            <label>New Password</label>
            <input type="password" placeholder="Minimum 6 characters" value={newPw} onChange={e => setNewPw(e.target.value)} />

            {/* Strength bar */}
            {newPw && (
              <div style={{ marginTop: -10, marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: newPw.length >= i * 3 ? (i <= 1 ? "#DC2626" : i <= 2 ? "#D97706" : i <= 3 ? "#64B5F6" : "#059669") : "#E3F2FD" }} />
                  ))}
                </div>
                <div style={{ fontSize: 11, color: newPw.length < 6 ? "#DC2626" : newPw.length < 8 ? "#D97706" : newPw.length < 10 ? "#64B5F6" : "#059669" }}>
                  {newPw.length < 6 ? "Too short" : newPw.length < 8 ? "Weak" : newPw.length < 10 ? "Good" : "Strong"}
                </div>
              </div>
            )}

            <label>Confirm New Password</label>
            <input type="password" placeholder="Re-enter new password" value={confirm} onChange={e => setConfirm(e.target.value)} />

            {confirm && newPw !== confirm && <div style={{ fontSize: 11, color: "#DC2626", marginTop: -10, marginBottom: 10 }}>⚠️ Passwords do not match</div>}
            {confirm && newPw === confirm && confirm.length > 0 && <div style={{ fontSize: 11, color: "#059669", marginTop: -10, marginBottom: 10 }}>✅ Passwords match</div>}

            <button className="btn-primary" style={{ width: "100%", padding: 14, marginTop: 4, fontSize: 15, opacity: loading ? 0.7 : 1 }}
              onClick={handleReset} disabled={loading}>
              {loading ? "Resetting..." : "Set New Password →"}
            </button>

            <button onClick={onDone} style={{ width: "100%", padding: 10, marginTop: 10, background: "none", border: "none", color: "#90CAF9", fontSize: 13, cursor: "pointer" }}>
              Cancel — Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("Home");
  const [modal, setModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [isRecovery, setIsRecovery] = useState(false); // password reset mode

  // Restore session on page load
  useEffect(() => {
    if (!supabaseConfigured) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) { setUser(session.user); setIsLoggedIn(true); }
    }).catch(e => console.warn("Session check failed:", e));

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      // Detect password recovery event from email link
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
        setUser(session?.user || null);
        return;
      }
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

  // Show reset password page when student clicks email link
  if (isRecovery) return <ResetPasswordPage onDone={() => { setIsRecovery(false); setPage("Home"); }} />;

  return (
    <div>
      <style>{css}</style>
      {!supabaseConfigured && (
        <div style={{ background: "#FEF3C7", borderBottom: "1px solid #FCD34D", padding: "10px 24px", fontSize: 13, color: "#92400E", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <strong>Supabase not configured:</strong> Add <code style={{ background: "#FEF9EE", padding: "1px 6px", borderRadius: 4 }}>VITE_SUPABASE_URL</code> and <code style={{ background: "#FEF9EE", padding: "1px 6px", borderRadius: 4 }}>VITE_SUPABASE_ANON_KEY</code> to your Vercel environment variables, then redeploy. Login and data features are disabled until then.
        </div>
      )}
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
