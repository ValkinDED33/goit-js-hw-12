import{a as w,S as v,i as l}from"./assets/vendor-851Qsuw-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();const E="48211039-b5a5e94b0d08467a34362de56",L="https://pixabay.com/api/";async function h(r,o=1,s="",e="",t="all"){const n={key:E,q:r,image_type:t,orientation:"horizontal",safesearch:!0,per_page:15,page:o};s&&(n.category=s),e&&(n.colors=e);try{const a=await w.get(L,{params:n});return a.data.hits.length===0&&toastr.warning("No images found for your query. Try something else."),a.data}catch(a){throw toastr.error("Something went wrong. Please try again."),console.error(a),new Error("Failed to fetch images.")}}function y(r){const o=document.querySelector("#gallery"),s=r.map(e=>`
      <a href="${e.largeImageURL}" class="gallery-item">
        <img src="${e.webformatURL}" alt="${e.tags}" />
        <div class="info">
          <span><strong>Likes:</strong> ${e.likes}</span>
          <span><strong>Views:</strong> ${e.views}</span>
          <span><strong>Comments:</strong> ${e.comments}</span>
          <span><strong>Downloads:</strong> ${e.downloads}</span>
        </div>
      </a>
    `).join("");o.insertAdjacentHTML("beforeend",s),new SimpleLightbox(".gallery-item",{captionsData:"alt",captionDelay:250})}function b(){document.querySelector("#gallery").innerHTML=""}function i(r){document.querySelector("#loader").classList.toggle("hidden",!r)}function p(){window.scrollBy({top:400,behavior:"smooth"})}let d="",u=1;const g=15;document.getElementById("loader");const S=document.querySelector("#search-form"),m=document.querySelector("#load-more");document.querySelector(".gallery");let c=new Set,f=new v(".gallery a",{scrollZoom:!1});f.on("close.simplelightbox",()=>{setTimeout(()=>{document.body.style.overflow="",document.body.style.pointerEvents="auto",document.documentElement.style.overflow="",document.documentElement.style.pointerEvents="auto",document.documentElement.style.position="",document.body.dispatchEvent(new Event("click",{bubbles:!0}))},50)});document.addEventListener("touchstart",function(r){},{passive:!0});document.addEventListener("touchmove",function(r){},{passive:!0});S.addEventListener("submit",async r=>{if(r.preventDefault(),d=document.querySelector("#search-input").value.trim(),!d){l.info({title:"Info",message:"Please enter a search query!"});return}b(),c.clear(),u=1,m.classList.add("hidden"),i(!0);try{const o=await h(d,u,g);if(i(!1),o.hits.length===0){l.warning({title:"Warning",message:"Nothing found! Try another search."});return}const s=o.hits.filter(e=>!c.has(e.id));s.forEach(e=>c.add(e.id)),y(s),f.refresh(),p(),m.classList.remove("hidden")}catch(o){console.error("Error loading images:",o),i(!1),l.error({title:"Error",message:"Something went wrong. Please try again."})}});m.addEventListener("click",async()=>{u+=1,i(!0);try{const r=await h(d,u,g);i(!1);const o=r.hits.filter(s=>!c.has(s.id));o.forEach(s=>c.add(s.id)),y(o),f.refresh(),p(),r.hits.length<g&&(m.classList.add("hidden"),l.warning({title:"Warning",message:"We're sorry, but you've reached the end of search results."}))}catch(r){console.error("Error loading more images:",r),i(!1),l.error({title:"Error",message:"Something went wrong. Please try again."})}});
//# sourceMappingURL=index.js.map
