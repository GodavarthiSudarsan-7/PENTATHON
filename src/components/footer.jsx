/**
 * Footer.jsx — Pentathon 3.0  (self-contained, production-ready)
 *
 * ✅ Pure React + CSS — no external libraries
 * ✅ CSS injected once into <head> on mount (no separate import needed)
 *    → If you prefer a .css file: copy FOOTER_CSS into Footer.css
 *      and replace useStyleInjection with: import "./Footer.css";
 * ✅ Canvas hex grid, count-up stats, infinite ticker — React hooks
 * ✅ Fully responsive (mobile / tablet / desktop)
 * ✅ export default Footer
 *
 * Drop-in usage:
 *   import Footer from "./components/Footer";
 *   <Footer />
 */

import React, { useEffect, useRef } from "react";

/* ================================================================
   CSS STRING — Pentathon 3.0 Design System
   This is injected into <head> automatically. Zero config needed.
================================================================ */
const FOOTER_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Bebas+Neue&display=swap');

  :root {
    --neon:       #a320ff;
    --accent:     #d180ff;
    --neon2:      #8c00e6;
    --cyan:       #b366ff;
    --bg:         linear-gradient(135deg, #1a0033, #0d001a);
    --bg-dark:    #0d001a;
    --text:       rgba(224, 224, 224, 0.95);
    --muted:      rgba(224, 224, 224, 0.7);
    --glass:      rgba(40, 0, 80, 0.2);
    --glass2:     rgba(30, 0, 60, 0.15);
    --stroke:     rgba(163, 32, 255, 0.3);
    --shadow:     0 18px 55px rgba(163, 32, 255, 0.25);
    --glow-text:  0 0 12px rgba(163,32,255,0.9), 0 0 30px rgba(163,32,255,0.5);
    --glow-box:   0 0 0 1px rgba(163,32,255,0.5), 0 8px 40px rgba(163,32,255,0.3);
    --glow-hover: 0 0 0 1px rgba(163,32,255,0.9), 0 0 30px rgba(163,32,255,0.5), 0 16px 60px rgba(163,32,255,0.3);
  }

  .penta-footer *, .penta-footer *::before, .penta-footer *::after {
    box-sizing: border-box; margin: 0; padding: 0;
  }
  .penta-footer a { text-decoration: none; }

  .penta-footer {
    position: relative;
    background: var(--bg-dark);
    overflow: hidden;
    font-family: 'Rajdhani', sans-serif;
    color: var(--text);
  }

  .penta-footer .hex-canvas {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    opacity: 0.35; pointer-events: none; z-index: 0;
  }

  .penta-footer .grain {
    position: absolute; inset: 0;
    pointer-events: none; z-index: 1; opacity: 0.06;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px 180px;
    animation: grainShift 0.8s steps(1) infinite;
  }
  @keyframes grainShift {
    0%  { transform: translate(0,0); }
    25% { transform: translate(-5px,3px); }
    50% { transform: translate(4px,-2px); }
    75% { transform: translate(-2px,5px); }
    100%{ transform: translate(3px,-4px); }
  }

  .penta-footer .top-beam {
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--neon) 30%, var(--accent) 50%, var(--neon) 70%, transparent 100%);
    box-shadow: 0 0 20px 2px rgba(163,32,255,0.6); z-index: 2;
  }

  .penta-footer .stat-ticker {
    position: relative; z-index: 3;
    border-bottom: 1px solid var(--stroke);
    background: rgba(20,0,40,0.6);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    overflow: hidden; height: 52px;
    display: flex; align-items: center;
  }
  .penta-footer .ticker-track {
    display: flex; gap: 0;
    animation: tickerScroll 28s linear infinite;
    white-space: nowrap; will-change: transform;
  }
  .penta-footer .ticker-track:hover { animation-play-state: paused; }
  @keyframes tickerScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .penta-footer .ticker-item {
    display: flex; align-items: center; gap: 10px;
    padding: 0 40px;
    font-family: 'DM Mono', monospace; font-size: 0.72rem;
    letter-spacing: 0.1em; color: var(--muted);
    border-right: 1px solid var(--stroke);
  }
  .penta-footer .ticker-item .t-val {
    color: var(--accent); font-weight: 500; text-shadow: var(--glow-text);
  }
  .penta-footer .ticker-item .t-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--neon); box-shadow: 0 0 8px var(--neon); flex-shrink: 0;
  }

  .penta-footer .footer-wrap {
    position: relative; z-index: 3;
    max-width: 1280px; margin: 0 auto; padding: 70px 40px 0;
  }

  .penta-footer .editorial-heading {
    position: relative; margin-bottom: 60px;
    overflow: hidden; padding-bottom: 32px;
  }
  .penta-footer .editorial-heading::after {
    content: ''; position: absolute; bottom: 0; left: 0;
    width: 100%; height: 1px;
    background: linear-gradient(90deg, var(--neon) 0%, transparent 60%);
  }
  .penta-footer .big-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(4rem, 10vw, 9rem);
    letter-spacing: 0.04em; line-height: 0.9;
    color: transparent;
    -webkit-text-stroke: 1px rgba(163,32,255,0.5);
    position: relative; user-select: none;
  }
  .penta-footer .big-title .filled {
    position: absolute; inset: 0; color: transparent;
    background: linear-gradient(135deg, var(--accent) 0%, var(--neon) 50%, var(--neon2) 100%);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 16px rgba(163,32,255,0.7));
    clip-path: inset(0 100% 0 0);
    animation: titleReveal 1.4s cubic-bezier(0.76,0,0.24,1) 0.3s forwards;
  }
  @keyframes titleReveal { to { clip-path: inset(0 0% 0 0); } }
  .penta-footer .tagline-row {
    display: flex; align-items: center; gap: 16px; margin-top: 12px;
  }
  .penta-footer .tagline-line {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, var(--stroke), transparent);
  }
  .penta-footer .tagline-text {
    font-family: 'DM Mono', monospace; font-size: 0.72rem;
    letter-spacing: 0.3em; color: var(--accent);
    text-transform: uppercase; text-shadow: var(--glow-text); white-space: nowrap;
  }

  .penta-footer .footer-grid {
    display: grid; grid-template-columns: 2fr 1.2fr 1.8fr;
    gap: 2px; background: var(--stroke);
    border: 1px solid var(--stroke); border-radius: 20px; overflow: hidden;
  }
  .penta-footer .grid-cell {
    background: rgba(8,0,18,0.82);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    padding: 40px 36px; transition: background 0.3s ease;
  }
  .penta-footer .grid-cell:hover { background: rgba(30,0,58,0.85); }

  .penta-footer .about-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'DM Mono', monospace; font-size: 0.62rem;
    letter-spacing: 0.25em; color: var(--neon);
    text-transform: uppercase; margin-bottom: 20px;
  }
  .penta-footer .about-eyebrow::before {
    content: ''; display: block; width: 20px; height: 1px;
    background: var(--neon); box-shadow: 0 0 6px var(--neon);
  }
  .penta-footer .about-desc {
    font-size: 1rem; font-weight: 300; line-height: 1.8;
    color: var(--muted); margin-bottom: 32px; max-width: 380px;
  }
  .penta-footer .stat-pills { display: flex; gap: 12px; flex-wrap: wrap; }
  .penta-footer .stat-pill {
    display: flex; flex-direction: column; align-items: center;
    padding: 14px 20px; border: 1px solid var(--stroke);
    border-radius: 12px; background: var(--glass2); min-width: 80px;
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; cursor: default;
  }
  .penta-footer .stat-pill:hover {
    border-color: rgba(163,32,255,0.8);
    box-shadow: var(--glow-box); transform: translateY(-3px);
  }
  .penta-footer .stat-num {
    font-family: 'Bebas Neue', sans-serif; font-size: 1.7rem;
    line-height: 1; color: var(--accent); text-shadow: var(--glow-text);
  }
  .penta-footer .stat-label {
    font-family: 'DM Mono', monospace; font-size: 0.58rem;
    letter-spacing: 0.15em; color: var(--muted);
    text-transform: uppercase; margin-top: 4px;
  }

  .penta-footer .cell-heading {
    font-family: 'DM Mono', monospace; font-size: 0.62rem;
    letter-spacing: 0.28em; color: var(--neon);
    text-transform: uppercase; margin-bottom: 28px; text-shadow: var(--glow-text);
  }
  .penta-footer .nav-list {
    list-style: none; display: flex; flex-direction: column; gap: 4px;
  }
  .penta-footer .nav-list li a {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px; border-radius: 10px; border: 1px solid transparent;
    color: var(--muted); font-size: 1rem; font-weight: 500;
    letter-spacing: 0.05em; transition: all 0.25s ease;
    position: relative; overflow: hidden;
  }
  .penta-footer .nav-list li a::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 0;
    background: linear-gradient(90deg, rgba(163,32,255,0.15), transparent);
    transition: width 0.3s ease; border-radius: inherit;
  }
  .penta-footer .nav-list li a:hover::before { width: 100%; }
  .penta-footer .nav-list li a:hover {
    color: var(--accent); border-color: rgba(163,32,255,0.5);
    box-shadow: 0 0 20px rgba(163,32,255,0.15);
  }
  .penta-footer .nav-arrow {
    font-size: 0.75rem; opacity: 0; transform: translateX(-6px);
    transition: opacity 0.25s, transform 0.25s; color: var(--neon);
  }
  .penta-footer .nav-list li a:hover .nav-arrow { opacity: 1; transform: translateX(0); }

  .penta-footer .social-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 10px; margin-bottom: 36px;
  }
  .penta-footer .social-btn {
    display: flex; align-items: center; gap: 10px;
    padding: 14px 16px; border: 1px solid var(--stroke);
    border-radius: 12px; background: var(--glass2); color: var(--muted);
    font-family: 'DM Mono', monospace; font-size: 0.72rem;
    letter-spacing: 0.08em; transition: all 0.28s ease;
    position: relative; overflow: hidden;
  }
  .penta-footer .social-btn::after {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at center, rgba(163,32,255,0.15), transparent 70%);
    opacity: 0; transition: opacity 0.3s;
  }
  .penta-footer .social-btn:hover::after { opacity: 1; }
  .penta-footer .social-btn:hover {
    border-color: rgba(163,32,255,0.8);
    box-shadow: var(--glow-hover); color: var(--accent); transform: translateY(-2px);
  }
  .penta-footer .social-btn svg {
    width: 17px; height: 17px; fill: currentColor;
    flex-shrink: 0; transition: filter 0.28s;
  }
  .penta-footer .social-btn:hover svg { filter: drop-shadow(0 0 5px rgba(163,32,255,0.9)); }

  .penta-footer .cell-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--stroke), transparent);
    margin-bottom: 28px;
  }
  .penta-footer .nl-label {
    font-family: 'DM Mono', monospace; font-size: 0.62rem;
    letter-spacing: 0.28em; color: var(--neon);
    text-transform: uppercase; margin-bottom: 8px; text-shadow: var(--glow-text);
  }
  .penta-footer .nl-desc {
    font-size: 0.88rem; color: var(--muted);
    font-weight: 300; line-height: 1.6; margin-bottom: 16px;
  }
  .penta-footer .nl-form { display: flex; gap: 8px; }
  .penta-footer .nl-input {
    flex: 1; background: rgba(20,0,40,0.7);
    border: 1px solid var(--stroke); border-radius: 10px;
    padding: 11px 14px; color: var(--text);
    font-family: 'DM Mono', monospace; font-size: 0.78rem;
    outline: none; transition: border-color 0.25s, box-shadow 0.25s; min-width: 0;
  }
  .penta-footer .nl-input::placeholder { color: rgba(224,224,224,0.3); }
  .penta-footer .nl-input:focus {
    border-color: rgba(163,32,255,0.8);
    box-shadow: 0 0 0 3px rgba(163,32,255,0.12), inset 0 0 10px rgba(163,32,255,0.05);
  }
  .penta-footer .nl-btn {
    position: relative; flex-shrink: 0; padding: 11px 18px;
    border: none; border-radius: 10px;
    background: linear-gradient(135deg, var(--neon2) 0%, var(--neon) 60%, var(--accent) 100%);
    color: #fff; font-family: 'Bebas Neue', sans-serif;
    font-size: 0.95rem; letter-spacing: 0.12em; cursor: pointer;
    overflow: hidden; transition: transform 0.25s, box-shadow 0.25s;
    box-shadow: 0 4px 20px rgba(163,32,255,0.4);
  }
  .penta-footer .nl-btn::before {
    content: ''; position: absolute; top: -50%; left: -60%;
    width: 50%; height: 200%; background: rgba(255,255,255,0.18);
    transform: skewX(-20deg); transition: left 0.4s ease;
  }
  .penta-footer .nl-btn:hover::before { left: 120%; }
  .penta-footer .nl-btn:hover { transform: translateY(-2px); box-shadow: var(--glow-hover); }
  .penta-footer .nl-btn:active { transform: translateY(0); }

  .penta-footer .footer-bottom {
    position: relative; z-index: 3;
    max-width: 1280px; margin: 0 auto; padding: 0 40px 40px;
  }
  .penta-footer .bottom-sep {
    position: relative; height: 1px;
    background: var(--stroke); margin: 40px 0 28px; overflow: visible;
  }
  .penta-footer .bottom-sep::before {
    content: ''; position: absolute; top: -1px; left: 0;
    height: 3px; width: 80px;
    background: linear-gradient(90deg, transparent, var(--neon), var(--accent), transparent);
    border-radius: 3px; animation: scanLine 5s linear infinite;
  }
  @keyframes scanLine {
    0%  { left: 0; opacity: 1; }
    90% { opacity: 1; }
    100%{ left: calc(100% - 80px); opacity: 0; }
  }
  .penta-footer .bottom-bar {
    display: flex; align-items: center;
    justify-content: space-between; flex-wrap: wrap; gap: 16px;
  }
  .penta-footer .copyright {
    font-family: 'DM Mono', monospace; font-size: 0.72rem;
    color: var(--muted); letter-spacing: 0.06em;
  }
  .penta-footer .copyright em {
    font-style: normal; color: var(--accent); text-shadow: var(--glow-text);
  }
  .penta-footer .live-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'DM Mono', monospace; font-size: 0.68rem;
    letter-spacing: 0.14em; color: var(--muted);
    padding: 6px 14px; border: 1px solid var(--stroke);
    border-radius: 40px; background: var(--glass2);
  }
  .penta-footer .live-ring {
    position: relative; width: 8px; height: 8px; flex-shrink: 0;
  }
  .penta-footer .live-ring::before,
  .penta-footer .live-ring::after {
    content: ''; position: absolute; border-radius: 50%; background: var(--neon);
  }
  .penta-footer .live-ring::before { inset: 0; box-shadow: 0 0 6px var(--neon); }
  .penta-footer .live-ring::after {
    inset: -4px; background: transparent;
    border: 1px solid rgba(163,32,255,0.5);
    animation: ringPulse 2s ease-out infinite;
  }
  @keyframes ringPulse {
    0%  { transform: scale(0.6); opacity: 0.9; }
    100%{ transform: scale(2);   opacity: 0; }
  }
  .penta-footer .bottom-nav {
    display: flex; gap: 24px; list-style: none; align-items: center;
  }
  .penta-footer .bottom-nav li a {
    font-size: 0.8rem; color: var(--muted);
    letter-spacing: 0.08em; transition: color 0.2s, text-shadow 0.2s;
  }
  .penta-footer .bottom-nav li a:hover { color: var(--accent); text-shadow: var(--glow-text); }
  .penta-footer .bottom-nav li::after { content: '·'; margin-left: 24px; color: var(--stroke); }
  .penta-footer .bottom-nav li:last-child::after { display: none; }

  @media (max-width: 900px) {
    .penta-footer .footer-grid { grid-template-columns: 1fr 1fr; }
    .penta-footer .cell-about { grid-column: 1 / -1; border-bottom: 1px solid var(--stroke); }
    .penta-footer .big-title  { font-size: clamp(3.5rem, 12vw, 6rem); }
  }
  @media (max-width: 580px) {
    .penta-footer .footer-wrap   { padding: 48px 20px 0; }
    .penta-footer .footer-bottom { padding: 0 20px 32px; }
    .penta-footer .footer-grid   { grid-template-columns: 1fr; }
    .penta-footer .big-title     { font-size: clamp(3rem, 15vw, 5rem); }
    .penta-footer .nl-form       { flex-direction: column; }
    .penta-footer .social-grid   { grid-template-columns: 1fr 1fr; }
    .penta-footer .bottom-bar    { flex-direction: column; align-items: flex-start; }
    .penta-footer .bottom-nav    { flex-wrap: wrap; gap: 12px; }
    .penta-footer .bottom-nav li::after { display: none; }
    .penta-footer .editorial-heading { margin-bottom: 36px; }
  }
`;

/* ================================================================
   DATA
================================================================ */
const TICKER_ITEMS = [
  { label: "PARTICIPANTS",    value: "1,800+" },
  { label: "PRIZE POOL",      value: "₹5,00,000" },
  { label: "MENTOR SESSIONS", value: "24+" },
  { label: "HOURS",           value: "36hr NON-STOP" },
  { label: "TRACKS",          value: "06" },
  { label: "COLLEGES",        value: "80+" },
  { label: "JUDGES",          value: "15+ EXPERTS" },
  { label: "EDITION",         value: "3.0" },
];
const STATS = [
  { target: 1800, label: "Coders" },
  { target: 500,  label: "₹ Prize (K)" },
  { target: 36,   label: "Hours" },
  { target: 6,    label: "Tracks" },
];
const NAV_LINKS    = ["Home","About","Events","Tracks","Team","Sponsors","Contact"].map(l => ({ label: l, href: "#" }));
const SOCIAL_LINKS = ["LinkedIn","GitHub","Instagram","Twitter"].map(l => ({ label: l, href: "#" }));
const LEGAL_LINKS  = ["Privacy Policy","Code of Conduct","FAQs"].map(l => ({ label: l, href: "#" }));

/* ================================================================
   SVG ICONS
================================================================ */
const Icons = {
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452H16.89v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.98 1.98 0 0 1-1.972-1.982c0-1.09.887-1.98 1.972-1.98 1.088 0 1.972.89 1.972 1.98a1.98 1.98 0 0 1-1.972 1.982zm1.932 13.019H3.404V9h3.865v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
};

/* ================================================================
   HOOKS
================================================================ */

/** Injects CSS into <head> once, removes on unmount */
function useStyleInjection(css, id) {
  useEffect(() => {
    if (document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id = id;
    tag.textContent = css;
    document.head.appendChild(tag);
    return () => { document.getElementById(id)?.remove(); };
  }, []); // eslint-disable-line
}

/** Animated hex grid drawn on a <canvas> ref */
function useHexCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const SIZE = 34, GAP = 3;
    const NEON = "rgba(163,32,255,";
    let hexes = [], rafId;

    const corner = (cx, cy, sz, i) => {
      const a = (Math.PI / 180) * (60 * i - 30);
      return [cx + sz * Math.cos(a), cy + sz * Math.sin(a)];
    };

    const build = () => {
      hexes = [];
      const eff = SIZE + GAP;
      const cols = Math.ceil(canvas.width  / (eff * 1.732)) + 2;
      const rows = Math.ceil(canvas.height / (eff * 1.5))   + 2;
      for (let r = -1; r < rows; r++)
        for (let c = -1; c < cols; c++)
          hexes.push({
            x: c * eff * 1.732 + (r % 2 === 0 ? 0 : eff * 0.866),
            y: r * eff * 1.5,
            phase: Math.random() * Math.PI * 2,
            speed: 0.003 + Math.random() * 0.004,
            max:   0.04  + Math.random() * 0.1,
          });
    };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      build();
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hexes.forEach(h => {
        const a = h.max * (0.4 + 0.6 * Math.sin(h.phase + t * h.speed));
        h.phase += 0.005;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const [px, py] = corner(h.x, h.y, SIZE, i);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = NEON + a + ")";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
      rafId = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();
    rafId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, [canvasRef]);
}

/** Count-up triggered by IntersectionObserver */
function useCountUp(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".stat-num[data-target]");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const span = e.target;
        const end  = parseInt(span.dataset.target, 10);
        const step = end / (1600 / 16);
        let cur    = 0;
        const t    = setInterval(() => {
          cur = Math.min(cur + step, end);
          span.textContent = Math.round(cur).toLocaleString();
          if (cur >= end) { span.textContent = end.toLocaleString(); clearInterval(t); }
        }, 16);
        io.unobserve(span);
      });
    }, { threshold: 0.5 });
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, [ref]);
}

/* ================================================================
   MAIN COMPONENT
================================================================ */
export default function Footer({
  eventName   = "Pentathon 3.0",
  tagline     = "Build · Innovate · Dominate",
  description = "A 36-hour forge where raw code meets radical ideas. Pentathon 3.0 is where tomorrow's builders come to break limits, ship real products, and walk out legends. Hosted by SRM Institute of Science & Technology.",
  year        = 2025,
  institute   = "SRM Institute of Science & Technology",
  navLinks    = NAV_LINKS,
  socialLinks = SOCIAL_LINKS,
  tickerItems = TICKER_ITEMS,
  stats       = STATS,
  legalLinks  = LEGAL_LINKS,
}) {
  const canvasRef = useRef(null);
  const statsRef  = useRef(null);

  useStyleInjection(FOOTER_CSS, "penta-footer-css");
  useHexCanvas(canvasRef);
  useCountUp(statsRef);

  /* Double ticker items for seamless infinite CSS loop */
  const ticker = [...tickerItems, ...tickerItems];

  return (
    <footer className="penta-footer">

      {/* Canvas hex grid */}
      <canvas ref={canvasRef} className="hex-canvas" aria-hidden="true" />
      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />
      {/* Top neon beam */}
      <div className="top-beam" aria-hidden="true" />

      {/* ── Ticker ── */}
      <div className="stat-ticker" aria-hidden="true">
        <div className="ticker-track">
          {ticker.map((item, i) => (
            <div className="ticker-item" key={i}>
              <span className="t-dot" />
              {item.label}&nbsp;<span className="t-val">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="footer-wrap">

        {/* Editorial heading */}
        <div className="editorial-heading">
          <div className="big-title" aria-label={eventName}>
            {eventName}
            <span className="filled" aria-hidden="true">{eventName}</span>
          </div>
          <div className="tagline-row">
            <div className="tagline-line" />
            <span className="tagline-text">{tagline}</span>
            <div className="tagline-line"
              style={{ background: "linear-gradient(270deg, var(--stroke), transparent)" }} />
          </div>
        </div>

        {/* 3-col grid */}
        <div className="footer-grid">

          {/* Cell 1 — About */}
          <div className="grid-cell cell-about">
            <div className="about-eyebrow">The Hackathon</div>
            <p className="about-desc">{description}</p>
            <div className="stat-pills" ref={statsRef}>
              {stats.map((s, i) => (
                <div className="stat-pill" key={i}>
                  <span className="stat-num" data-target={s.target}>0</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cell 2 — Nav */}
          <div className="grid-cell cell-nav">
            <div className="cell-heading">Navigate</div>
            <ul className="nav-list">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href}>
                    {link.label}
                    <span className="nav-arrow">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cell 3 — Social + Newsletter */}
          <div className="grid-cell cell-social-news">
            <div className="cell-heading">Connect</div>
            <div className="social-grid">
              {socialLinks.map((s, i) => {
                const Icon = Icons[s.label];
                return (
                  <a key={i} href={s.href} className="social-btn" aria-label={s.label}>
                    {Icon && <Icon />}
                    {s.label}
                  </a>
                );
              })}
            </div>
            <div className="cell-divider" />
            <div className="nl-label">Stay in the loop</div>
            <p className="nl-desc">
              Drops, deadlines, and disruption—straight to your inbox before anyone else gets it.
            </p>
            <div className="nl-form">
              <input
                type="email"
                className="nl-input"
                placeholder="your@email.com"
                aria-label="Email address"
              />
              <button className="nl-btn" type="button">JOIN</button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <div className="bottom-sep" />
        <div className="bottom-bar">
          <span className="copyright">
            © {year} <em>{eventName}</em> · {institute} · All rights reserved
          </span>
          <ul className="bottom-nav" aria-label="Legal links">
            {legalLinks.map((link, i) => (
              <li key={i}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
          <div className="live-badge" aria-label="Systems online">
            <span className="live-ring" />
            SYSTEMS ONLINE
          </div>
        </div>
      </div>

    </footer>
  );
}
