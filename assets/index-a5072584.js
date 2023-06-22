(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const s={btnEnterSite:null,splash:null},l={btnEnterSite:".js-btn-enter-site",splash:".js-splash"},d=n=>`
        <div class="js-exploration-item">
            ${n.name}
        </div>
    `,a=n=>`
    <div>
        <div class="js-splash">
            <div>
                <button class="js-btn-enter-site" type="button">
                    Enter Site
                </button>
            </div>
        </div>
        <div class="js-exploration">${n.map(r=>d(r))}</div>
    </div>
`,u=n=>{const r=Array.from(document.querySelectorAll("#exploration-items > div")).map(o=>({...o.dataset}));n.innerHTML=a(r)},p=()=>{s.btnEnterSite=document.querySelector(l.btnEnterSite),s.splash=document.querySelector(l.splash)},f=()=>{s.btnEnterSite.addEventListener("click",()=>{s.splash.style.display="none"})},m=()=>{const n=document.querySelector("#app");n&&(u(n),p(),f())},y={init:m};document.addEventListener("DOMContentLoaded",()=>{y.init()});
