import{a as w,S as L,i as l}from"./assets/vendor-851Qsuw-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const S="48211039-b5a5e94b0d08467a34362de56",b="https://pixabay.com/api/";async function m(s,t=1,n="",e="",r="all"){const o={key:S,q:s,image_type:r,orientation:"horizontal",safesearch:!0,per_page:15,page:t};n&&(o.category=n),e&&(o.colors=e);try{const a=await w.get(b,{params:o});return a.data.hits.length===0&&toastr.warning("No images found for your query. Try something else."),a.data}catch(a){throw toastr.error("Something went wrong. Please try again."),console.error(a),new Error("Failed to fetch images.")}}function h(s){const t=document.querySelector("#gallery"),n=s.map(e=>`
      <a href="${e.largeImageURL}" class="gallery-item">
        <img src="${e.webformatURL}" alt="${e.tags}" />
        <div class="info">
          <span><strong>Likes:</strong> ${e.likes}</span>
          <span><strong>Views:</strong> ${e.views}</span>
          <span><strong>Comments:</strong> ${e.comments}</span>
          <span><strong>Downloads:</strong> ${e.downloads}</span>
        </div>
      </a>
    `).join("");t.insertAdjacentHTML("beforeend",n),new SimpleLightbox(".gallery-item",{captionsData:"alt",captionDelay:250})}function q(){document.querySelector("#gallery").innerHTML=""}function i(s){document.querySelector("#loader").classList.toggle("hidden",!s)}function y(){window.scrollBy({top:400,behavior:"smooth"})}let d="",u=1;const f=15;document.getElementById("loader");const E=document.querySelector("#search-form"),g=document.querySelector("#load-more");document.querySelector(".gallery");let p=new L(".gallery a"),c=new Set;E.addEventListener("submit",async s=>{if(s.preventDefault(),d=document.querySelector("#search-input").value.trim(),!d){l.info({title:"Info",message:"Please enter a search query!"});return}q(),c.clear(),u=1,g.classList.add("hidden"),i(!0);try{const t=await m(d,u,f);if(i(!1),t.hits.length===0){l.warning({title:"Warning",message:"Nothing found! Try another search."});return}const n=t.hits.filter(e=>!c.has(e.id));n.forEach(e=>c.add(e.id)),h(n),p.refresh(),y(),g.classList.remove("hidden")}catch(t){console.error("Error loading images:",t),i(!1),l.error({title:"Error",message:"Something went wrong. Please try again."})}});g.addEventListener("click",async()=>{u+=1,i(!0);try{const s=await m(d,u,f);i(!1);const t=s.hits.filter(n=>!c.has(n.id));t.forEach(n=>c.add(n.id)),h(t),p.refresh(),y(),s.hits.length<f&&(l.warning({title:"Warning",message:"We're sorry, but you've reached the end of search results."}),g.classList.add("hidden"))}catch(s){console.error("Error loading more images:",s),i(!1),l.error({title:"Error",message:"Something went wrong. Please try again."})}});
//# sourceMappingURL=index.js.map
