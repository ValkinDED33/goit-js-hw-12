import{a as E,S as b,i}from"./assets/vendor-851Qsuw-.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const S="48211039-b5a5e94b0d08467a34362de56",q="https://pixabay.com/api/";async function p(s,r=1,e="",n="",t="all",o=29){const a={key:S,q:s,image_type:t,orientation:"horizontal",safesearch:!0,page:r,per_page:o};e&&(a.category=e),n&&(a.colors=n);try{return(await E.get(q,{params:a,timeout:1e4})).data}catch(h){throw console.error("Error fetching images:",h.message||h),new Error("Failed to fetch images.")}}const y=document.querySelector("#gallery");function L(s){const r=s.map(e=>`
      <a href="${e.largeImageURL}" class="gallery-item">
        <img src="${e.webformatURL}" alt="${e.tags}" />
        <div class="info">
          <span><strong>Likes:</strong> ${e.likes}</span>
          <span><strong>Views:</strong> ${e.views}</span>
          <span><strong>Comments:</strong> ${e.comments}</span>
          <span><strong>Downloads:</strong> ${e.downloads}</span>
        </div>
      </a>
    `).join("");y.insertAdjacentHTML("beforeend",r)}function I(){y.innerHTML=""}function P(){window.scrollBy({top:400,behavior:"smooth"})}let c="",d=1;const u=29,f=document.getElementById("loader"),$=document.querySelector("#search-form"),g=document.querySelector("#load-more");document.querySelector(".gallery");let l=new Set;const w=new b(".gallery a",{scrollZoom:!1});document.addEventListener("touchstart",()=>{},{passive:!0});document.addEventListener("touchmove",()=>{},{passive:!0});function v(){f.innerHTML='<div class="spinner"></div>',f.style.display="block"}function m(){f.innerHTML="",f.style.display="none"}$.addEventListener("submit",async s=>{if(s.preventDefault(),c=document.querySelector("#search-input").value.trim(),!c){i.info({title:"Info",message:"Please enter a search query!"});return}I(),l.clear(),d=1,g.classList.add("hidden"),v();try{const r=await p(c,d,"","","all",u);if(m(),!r.hits.length){i.warning({title:"Warning",message:"Nothing found! Try another search."});return}const e=r.hits.filter(n=>!l.has(n.id));e.forEach(n=>l.add(n.id)),L(e),w.refresh(),r.hits.length>=u&&g.classList.remove("hidden")}catch(r){console.error("Error loading images:",r),m(),i.error({title:"Error",message:"Something went wrong. Please try again."})}});g.addEventListener("click",async()=>{d+=1,v();try{const s=await p(c,d,"","","all",u);m();const r=s.hits.filter(e=>!l.has(e.id));r.forEach(e=>l.add(e.id)),r.length&&(L(r),w.refresh(),P()),s.hits.length<u&&(g.classList.add("hidden"),i.warning({title:"Warning",message:"We're sorry, but you've reached the end of search results."}))}catch(s){console.error("Error loading more images:",s),m(),i.error({title:"Error",message:"Something went wrong. Please try again."})}});
//# sourceMappingURL=index.js.map
