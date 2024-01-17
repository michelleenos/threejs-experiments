var C=Object.defineProperty;var b=(n,e,t)=>e in n?C(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var o=(n,e,t)=>(b(n,typeof e!="symbol"?e+"":e,t),t);import{u as _,S as v,b as l,$ as M,B as T,i as p,j as A,h as F,Y as x,k as L,Z as y,f as h,K as G,_ as E}from"../../three.module-01fec873.js";/* empty css                  */import{S as B,W as R}from"../../World-d5e501f2.js";import{a as k}from"../../lil-gui.esm-ee8b5e9f.js";import{l as j}from"../../utils-100a9827.js";import{G as I}from"../../GLTFLoader-a77f9021.js";import"../../OrbitControls-1ea4caff.js";var q=`varying vec2 vUv;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}`,W=`varying vec2 vUv;
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;
uniform float uSpiralTightness;
uniform float uBlur;
uniform float uGlowStart;
uniform float uGlowEnd;
uniform float uDiv;
uniform float uWaveSpeed;
uniform float uSpiralSpeed;

#define PI 3.14159265358979323846
#define e  2.71828182845904523

vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec3 P) {
    vec3 Pi0 = floor(P); 
    vec3 Pi1 = Pi0 + vec3(1.0); 
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); 
    vec3 Pf1 = Pf0 - vec3(1.0); 
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    
    return 2.2 * n_xyz;
}

mat2 rotate2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

void main() {
    vec2 uv = vUv;
    uv -= 0.5;
    uv *= 2.0;

    float d0 = length(uv);
    float outerGlow = smoothstep(uGlowStart, uGlowEnd, d0);

    float a1 = cnoise(vec3(uv.x * -10.0, uv.y * -8.0, uTime * uWaveSpeed)) * PI;
    uv *= rotate2d(a1);

    float angle = atan(uv.y, uv.x);
    float offset = d0 + (angle/ (PI * 2.0)) * uSpiralTightness;
    float circles = mod(offset - uTime * uSpiralSpeed, uSpiralTightness);
    float c = circles;
    c /= uDiv;

    c = smoothstep(0.0, uBlur, c) - smoothstep(1.0 - uBlur , 1.0, c);
    c = max(c, 0.0);
    c += outerGlow;
    c = min(c, 1.0);
  
    vec3 color = mix(uColorStart, uColorEnd, c);
    gl_FragColor = vec4(color, 1.0);
}`;class D{constructor(e,t){o(this,"scene");o(this,"geometry");o(this,"material");o(this,"mesh");o(this,"manager");o(this,"bar");o(this,"_opacity");o(this,"onReady");o(this,"tickFadeOut",()=>{let e=j(this._opacity.value,0,.01);this._opacity.value=e,e>.01?window.requestAnimationFrame(this.tickFadeOut):this.dispose()});o(this,"onFinished",()=>{window.setTimeout(()=>{this.bar.style.transform="",this.bar.style.opacity="0",window.requestAnimationFrame(this.tickFadeOut),this.onReady&&this.onReady()},2e3)});o(this,"onProgress",(e,t,d)=>{const m=t/d;this.bar.style.transform=`scaleX(${m})`});this.onReady=t,this.geometry=new _(2,2,1,1),this.material=new v({transparent:!0,uniforms:{uAlpha:{value:1}},vertexShader:"void main() {gl_Position = vec4(position, 1.0);}",fragmentShader:`
            uniform float uAlpha;
            void main() {
               gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
            }
         `}),this._opacity=this.material.uniforms.uAlpha,this.mesh=new l(this.geometry,this.material),this.manager=new M(this.onFinished,this.onProgress),this.bar=document.createElement("div"),this.bar.setAttribute("style","position: absolute; width: 100%; height: 20px; background: #fff; left: 0; bottom: 0; transform-origin: left; transform: scaleX(0); z-index: 100; transition: all 0.5s ease-out;"),document.body.appendChild(this.bar),this.scene=e,this.scene.add(this.mesh)}dispose(){this.scene.remove(this.mesh),this.material.dispose(),this.geometry.dispose()}}var U=`void main() {

    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}`,$=`uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;

attribute float aScale;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / -viewPosition.z);
}`;const H=(n=30)=>{const e=new Float32Array(n*3);for(let t=0;t<n;t++)e[t*3]=(Math.random()-.5)*4,e[t*3+1]=.25+Math.random()*1.25,e[t*3+2]=(Math.random()-.5)*4;return e},O=(n=30)=>{const e=new Float32Array(n);for(let t=0;t<n;t++)e[t]=Math.random();return e};class X{constructor(e){o(this,"world");o(this,"sizes");o(this,"points");o(this,"geometry");o(this,"material");o(this,"onResize",()=>{this.material.uniforms.uPixelRatio.value=this.sizes.pixelRatio});o(this,"tick",e=>{this.material.uniforms.uTime.value=e});this.geometry=new T,this.geometry.setAttribute("position",new p(H(),3)),this.geometry.setAttribute("aScale",new p(O(),1)),this.material=new v({uniforms:{uPixelRatio:{value:e.sizes.pixelRatio},uSize:{value:100},uTime:{value:0}},vertexShader:$,fragmentShader:U,transparent:!0,depthWrite:!1,blending:A}),this.points=new F(this.geometry,this.material),this.world=e,this.sizes=e.sizes,this.world.scene.add(this.points),this.sizes.on("resize",this.onResize)}}G.enabled=!0;const Y=new B,a=new R(Y),K=new E,c=new k;a.camera.near=.1;a.camera.far=100;a.camera.position.set(-.7,2,-3.5);a.camera.updateProjectionMatrix();a.renderer.outputColorSpace=x;a.controls.minPolarAngle=0;a.controls.maxPolarAngle=Math.PI/2-.1;a.controls.maxDistance=20;a.controls.minDistance=1;const z=new D(a.scene),Z=new L(z.manager),J=new I(z.manager),P="/threejs-experiments",f=Z.load(P+"/scenes/portal/baked.jpg");f.flipY=!1;f.colorSpace=x;const N=new y({map:f}),g=new y({color:"#ffe3d1"}),i=new v({vertexShader:q,fragmentShader:W,uniforms:{uTime:{value:0},uColorStart:{value:new h("#ffbdc2")},uColorEnd:{value:new h("#fffaff")},uSpiralTightness:{value:.45},uWaveSpeed:{value:.2},uSpiralSpeed:{value:.45},uBlur:{value:.43},uGlowStart:{value:.29},uGlowEnd:{value:.95},uDiv:{value:.34}}}),w=new X(a);J.load(P+"/scenes/portal/portal-merged.glb",n=>{const e=n.scene;e.traverse(s=>{s instanceof l&&(s.material=N)});const t=e.children.find(s=>s.name==="poleLightA"),d=e.children.find(s=>s.name==="poleLightB"),m=e.children.find(s=>s.name==="portalLight");t instanceof l&&(t.material=g),d instanceof l&&(d.material=g),m instanceof l&&(m.material=i),a.scene.add(e)});const u={poleLightColor:g.color.getHexString(),clearColor:"#160e14",portalColorStart:i.uniforms.uColorStart.value.getHexString(),portalColorEnd:i.uniforms.uColorEnd.value.getHexString()};a.renderer.setClearColor(u.clearColor);c.addColor(u,"clearColor").onChange(n=>{a.renderer.setClearColor(n)});c.add(w.material.uniforms.uSize,"value",0,500,1).name("firefliesSize");c.addColor(u,"poleLightColor").onChange(n=>{g.color.set(n)});let r=c.addFolder("portal");r.addColor(u,"portalColorStart").onChange(n=>{i.uniforms.uColorStart.value.set(n)});r.addColor(u,"portalColorEnd").onChange(n=>{i.uniforms.uColorEnd.value.set(n)});r.add(i.uniforms.uSpiralTightness,"value",0,1,.01).name("spiralTightness");r.add(i.uniforms.uWaveSpeed,"value",0,2,.01).name("waveSpeed");r.add(i.uniforms.uSpiralSpeed,"value",0,2,.01).name("spiralSpeed");r.add(i.uniforms.uBlur,"value",0,1,.01).name("blur");r.add(i.uniforms.uGlowStart,"value",0,1,.01).name("glowStart");r.add(i.uniforms.uGlowEnd,"value",0,1,.01).name("glowEnd");r.add(i.uniforms.uDiv,"value",.01,1,.01).name("div");c.close();const S=()=>{const n=K.getElapsedTime();i.uniforms.uTime.value=n,w.tick(n),a.render(),window.requestAnimationFrame(S)};window.requestAnimationFrame(S);
