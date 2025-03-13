import{a4 as i}from"./three.core-dda14ae8.js";const a=(r,t={},o=[])=>{const s=document.createElement(r);return Object.keys(t).forEach(e=>{s.setAttribute(e,t[e])}),o.forEach(e=>{s.appendChild(typeof e=="string"?document.createTextNode(e):e)}),s},n=({barColor:r="#ff8a2b",bgColor:t="#000000"}={})=>`
.loader__bar {
   position: fixed;
   z-index: 100;
   width: 100%;
   height: 10px;
   background: ${r};
   left: 0;
   bottom: 0;
   transition: transform 0.5s ease-out; 
   transform-origin: left;
   transform: scaleX(0);
}

.loader__cover {
   position: fixed;
   z-index: 99;
   width: 100%;
   height: 100%;
   background: ${t};
   left: 0;
   top: 0;
   transition: opacity 0.7s ease-in-out;
}

.loader--finished .loader__bar,
.loader--finished .loader__cover {
   pointer-events: none;
}
.loader--finished .loader__bar {
   transition: transform 0.4s linear;
}
`;class c{manager;cover;bar;container;style;onReady;constructor({onReady:t,styles:o}={}){this.onReady=t,this.manager=new i(this.onFinished,this.onProgress),this.bar=a("div",{class:"loader__bar"}),this.cover=a("div",{class:"loader__cover"}),this.container=a("div",{class:"loader"},[this.bar,this.cover]),this.style=a("style",{},[n(o)]),document.body.append(this.container,this.style)}onFinished=()=>{window.setTimeout(()=>{this.cover.style.opacity="0",this.onReady&&this.onReady()},1e3),window.setTimeout(()=>{this.bar.style.transformOrigin="right",this.bar.style.transform="scaleX(0)"},800),this.container.classList.add("loader--finished")};onProgress=(t,o,s)=>{const e=o/s;this.bar.style.transform=`scaleX(${e})`}}export{c as L};
