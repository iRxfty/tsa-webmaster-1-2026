import{r as m,d as p,o as U,a as x,p as C,f as S,g as E,h as D,i as $,b as R}from"./config-BFNy9MU4.js";const T=m(p,"forum/threads");let l=null,b=[],k="all";U(x,n=>{l=n;const e=document.getElementById("new-thread-form"),t=document.getElementById("forum-signin-prompt");e&&(e.style.display=n?"flex":"none"),t&&(t.style.display=n?"none":"block")});function I(n,e=800,t=.7){return new Promise(s=>{const i=new FileReader;i.onload=a=>{const r=new Image;r.onload=()=>{const u=document.createElement("canvas");let c=r.width,d=r.height;c>e&&(d=e/c*d,c=e),u.width=c,u.height=d,u.getContext("2d").drawImage(r,0,0,c,d),s(u.toDataURL("image/jpeg",t))},r.src=a.target.result},i.readAsDataURL(n)})}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("new-thread-form");n&&(n.addEventListener("submit",async e=>{if(e.preventDefault(),!l)return alert("You must be signed in to post.");const t=document.getElementById("thread-title"),s=document.getElementById("thread-body"),i=document.getElementById("thread-category"),a=document.getElementById("thread-image"),r=n.querySelector(".post-submit-btn"),u=t.value.trim(),c=s.value.trim(),d=i.value;if(!u||!c)return alert("Please fill in both the title and body.");r.disabled=!0,r.textContent="Posting...";try{let f="";if(a.files&&a.files[0]){const y=a.files[0];if(y.size>5*1024*1024){alert("Image must be under 5MB."),r.disabled=!1,r.textContent="Post Thread";return}f=await I(y)}await C(T,{title:u,body:c,author:l.displayName||l.email,authorUid:l.uid,category:d,createdAt:Date.now(),likes:0,dislikes:0,replyCount:0,imageUrl:f}),t.value="",s.value="",a.value=""}catch(f){console.error("Post error:",f),alert("Failed to post: "+f.message)}r.disabled=!1,r.textContent="Post Thread"}),document.querySelectorAll(".filter-btn").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("active")),e.classList.add("active"),k=e.dataset.category,A()})}))});document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("forum-threads");n&&S(T,e=>{b=[],e.forEach(t=>{b.push({id:t.key,...t.val()})}),b.sort((t,s)=>s.createdAt-t.createdAt),A()},e=>{console.error("Firebase RTDB error:",e),n.innerHTML='<p class="forum-empty">Could not load threads. Check your Firebase connection.</p>'})});function A(){const n=document.getElementById("forum-threads");if(!n)return;n.innerHTML="";const e=k==="all"?b:b.filter(t=>t.category===k);if(e.length===0){n.innerHTML=`<p class="forum-empty">${k==="all"?"No threads yet — be the first to start a discussion!":"No threads in this category."}</p>`;return}e.forEach(t=>M(n,t))}function M(n,e){const t=document.createElement("div");t.className="forum-card",t.id="thread-"+e.id;const s=l?l.uid:null,i=s&&e.authorUid===s,a=e.voters||{},r=Object.values(a).filter(o=>o==="like").length,u=Object.values(a).filter(o=>o==="dislike").length,c=s&&a[s]?a[s]:null,f=new Date(e.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"}),y=e.category?`<span class="forum-category">${g(e.category)}</span>`:"",w=e.imageUrl?`<div class="forum-image-wrap"><img src="${g(e.imageUrl)}" alt="Post image" class="forum-image" loading="lazy"></div>`:"";t.innerHTML=`
    <div class="forum-card-header">
      <div class="forum-card-header-left">
        ${y}
        <span class="forum-author">${g(e.author)}</span>
      </div>
      <span class="forum-time">${f}</span>
    </div>
    <h3 class="forum-title">${g(e.title)}</h3>
    <p class="forum-body">${g(e.body)}</p>
    ${w}
    <div class="forum-actions">
      <button class="vote-btn like-btn ${c==="like"?"active":""}" data-id="${e.id}" data-type="like">
        👍 <span>${r}</span>
      </button>
      <button class="vote-btn dislike-btn ${c==="dislike"?"active":""}" data-id="${e.id}" data-type="dislike">
        👎 <span>${u}</span>
      </button>
      <button class="reply-toggle-btn" data-id="${e.id}">
        💬 ${e.replyCount||0} Replies
      </button>
      ${i?`<button class="delete-btn" data-id="${e.id}">🗑️ Delete</button>`:""}
    </div>
    <div class="replies-section" id="replies-${e.id}" style="display:none;">
      <div class="replies-list" id="replies-list-${e.id}"></div>
      ${l?`
        <form class="reply-form" data-thread-id="${e.id}">
          <textarea placeholder="Write a reply..." required maxlength="1000" rows="2"></textarea>
          <button type="submit" class="reply-submit-btn">Reply</button>
        </form>
      `:""}
    </div>
  `,n.appendChild(t),t.querySelectorAll(".vote-btn").forEach(o=>{o.addEventListener("click",()=>P(o.dataset.id,o.dataset.type))});const h=t.querySelector(".delete-btn");h&&h.addEventListener("click",()=>N(h.dataset.id)),t.querySelector(".reply-toggle-btn").addEventListener("click",()=>q(e.id));const v=t.querySelector(".reply-form");v&&v.addEventListener("submit",o=>{o.preventDefault();const B=v.querySelector("textarea");V(e.id,B)})}function q(n){const e=document.getElementById("replies-"+n);if(!e)return;const t=e.style.display!=="none";e.style.display=t?"none":"block",t||H(n)}function H(n){const e=m(p,"forum/replies/"+n),t=document.getElementById("replies-list-"+n);t&&S(e,s=>{t.innerHTML="";const i=[];if(s.forEach(a=>{i.push({id:a.key,...a.val()})}),i.sort((a,r)=>a.createdAt-r.createdAt),i.length===0){t.innerHTML='<p class="no-replies">No replies yet.</p>';return}i.forEach(a=>{const r=document.createElement("div");r.className="reply-card";const c=new Date(a.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}),d=l?l.uid:null,f=d&&a.authorUid===d,y=a.voters||{},w=Object.values(y).filter(o=>o==="like").length,h=Object.values(y).filter(o=>o==="dislike").length,L=d&&y[d]?y[d]:null;r.innerHTML=`
        <div class="reply-header">
          <span class="reply-author">${g(a.author)}</span>
          <span class="reply-time">${c}</span>
        </div>
        <p class="reply-body">${g(a.body)}</p>
        <div class="reply-actions">
          <button class="vote-btn vote-btn-sm like-btn ${L==="like"?"active":""}" data-thread="${n}" data-reply="${a.id}" data-type="like">
            👍 <span>${w}</span>
          </button>
          <button class="vote-btn vote-btn-sm dislike-btn ${L==="dislike"?"active":""}" data-thread="${n}" data-reply="${a.id}" data-type="dislike">
            👎 <span>${h}</span>
          </button>
          ${f?`<button class="delete-reply-btn" data-thread="${n}" data-reply="${a.id}">🗑️</button>`:""}
        </div>
      `,t.appendChild(r),r.querySelectorAll(".vote-btn").forEach(o=>{o.addEventListener("click",()=>F(o.dataset.thread,o.dataset.reply,o.dataset.type))});const v=r.querySelector(".delete-reply-btn");v&&v.addEventListener("click",()=>O(v.dataset.thread,v.dataset.reply))})})}async function V(n,e){if(!l)return alert("Sign in to reply.");const t=e.value.trim();if(!t)return;const s=m(p,"forum/replies/"+n);await C(s,{body:t,author:l.displayName||l.email,authorUid:l.uid,createdAt:Date.now(),likes:0,dislikes:0});const i=m(p,"forum/threads/"+n),a=await E(i);if(a.exists()){const r=a.val().replyCount||0;await D(i,{replyCount:r+1})}e.value=""}async function P(n,e){if(!l)return alert("Sign in to vote.");const t=l.uid,s=m(p,`forum/threads/${n}/voters/${t}`),i=await E(s);(i.exists()?i.val():null)===e?await $(s):await R(s,e)}async function F(n,e,t){if(!l)return alert("Sign in to vote.");const s=l.uid,i=m(p,`forum/replies/${n}/${e}/voters/${s}`),a=await E(i);(a.exists()?a.val():null)===t?await $(i):await R(i,t)}async function N(n){confirm("Delete this thread and all its replies?")&&(await $(m(p,"forum/threads/"+n)),await $(m(p,"forum/replies/"+n)))}async function O(n,e){if(!confirm("Delete this reply?"))return;await $(m(p,`forum/replies/${n}/${e}`));const t=m(p,"forum/threads/"+n),s=await E(t);if(s.exists()){const i=s.val().replyCount||0;await D(t,{replyCount:Math.max(0,i-1)})}}function g(n){if(!n)return"";const e=document.createElement("div");return e.textContent=n,e.innerHTML}
