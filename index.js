import{a as g}from"./assets/vendor-upsvKRUO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const m="48211039-b5a5e94b0d08467a34362de56",p="https://pixabay.com/api/";async function u(e,t=1){const a={key:m,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};return(await g.get(p,{params:a})).data}function f(e){const t=document.querySelector("#gallery"),a=e.map(o=>`
      <a href="${o.largeImageURL}" class="gallery-item">
        <img src="${o.webformatURL}" alt="${o.tags}" />
render-functions.js
      
  <div class="info">
          <span><strong>Likes:</strong> ${o.likes}</span>
          <span><strong>Views:</strong> ${o.views}</span>
          <span><strong>Comments:</strong> ${o.comments}</span>
          <span><strong>Downloads:</strong> ${o.downloads}</span>
        </div>
      </a>
    `).join("");t.insertAdjacentHTML("beforeend",a),new SimpleLightbox(".gallery-item",{captionsData:"alt",captionDelay:250})}function y(){const e=document.querySelector("#gallery");e.innerHTML=""}function n(e){const t=document.querySelector("#loader");t&&t.classList.toggle("hidden",!e)}let c="",i=1;const h=document.querySelector("#search-form"),l=document.querySelector("#load-more");h.addEventListener("submit",async e=>{if(e.preventDefault(),c=document.querySelector("#search-input").value.trim(),!!c){y(),i=1,l.classList.add("hidden"),n(!0);try{const t=await u(c,i);if(n(!1),t.hits.length===0){alert("No images found. Try another query.");return}f(t.hits),l.classList.remove("hidden")}catch(t){console.error("Error fetching images:",t),n(!1),alert("Something went wrong. Please try again.")}}});l.addEventListener("click",async()=>{i+=1,n(!0);try{const e=await u(c,i);n(!1),f(e.hits),i*15>=e.totalHits&&(l.classList.add("hidden"),alert("We're sorry, but you've reached the end of search results."))}catch(e){console.error("Error loading more images:",e),n(!1),alert("Something went wrong. Please try again.")}});
//# sourceMappingURL=index.js.map
