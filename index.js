import{a as L,S as w,i as l}from"./assets/vendor-851Qsuw-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const v="48211039-b5a5e94b0d08467a34362de56",b="https://pixabay.com/api/";async function E(s,t=1,r="",n="",e="all",o=29){const a={key:v,q:s,image_type:e,orientation:"horizontal",safesearch:!0,page:t,per_page:o};r&&(a.category=r),n&&(a.colors=n);try{return(await L.get(b,{params:a,timeout:1e4})).data}catch(d){throw console.error("Error fetching images:",d.message||d),new Error("Failed to fetch images.")}}const h=document.querySelector("#gallery");function S(s){const t=s.map(r=>`
      <a href="${r.largeImageURL}" class="gallery-item">
        <img src="${r.webformatURL}" alt="${r.tags}" />
        <div class="info">
          <span><strong>Likes:</strong> ${r.likes}</span>
          <span><strong>Views:</strong> ${r.views}</span>
          <span><strong>Comments:</strong> ${r.comments}</span>
          <span><strong>Downloads:</strong> ${r.downloads}</span>
        </div>
      </a>
    `).join("");h.insertAdjacentHTML("beforeend",t)}function I(){h.innerHTML=""}function q(){window.scrollBy({top:400,behavior:"smooth"})}let f="",i=1;const m=29,p=document.getElementById("loader"),P=document.querySelector("#search-form"),c=document.querySelector("#load-more");document.querySelector(".gallery");const $=document.querySelector("#search-input");let u=new Set;const O=new w(".gallery a",{scrollZoom:!1});document.addEventListener("touchstart",()=>{},{passive:!0});document.addEventListener("touchmove",()=>{},{passive:!0});function x(){p.style.display="block"}function g(){p.style.display="none"}async function y(s=!1){s?(i=1,I(),u.clear(),c.classList.add("hidden")):i+=1,x();try{const t=await E(f,i,"","","all",m);if(g(),!t||!t.hits||t.hits.length===0){l.warning({title:"Warning",message:"Nothing found! Try another search."});return}const r=t.hits.filter(n=>!u.has(n.id));r.forEach(n=>u.add(n.id)),S(r),O.refresh(),t.totalHits>i*m?c.classList.remove("hidden"):(c.classList.add("hidden"),l.warning({title:"Warning",message:"We're sorry, but you've reached the end of search results."})),s||q()}catch(t){console.error("Error loading images:",t),g(),l.error({title:"Error",message:"Something went wrong. Please try again."})}}P.addEventListener("submit",s=>{if(s.preventDefault(),f=$.value.trim(),!f){l.info({title:"Info",message:"Please enter a search query!"});return}y(!0)});c.addEventListener("click",()=>y(!1));
//# sourceMappingURL=index.js.map
