import{B as w,i as f,S as x,j as C,h as _,K as M,Y as p,k as T,_ as z,f as m,b as c,Z as b}from"../../three.core-dda14ae8.js";/* empty css                  */import{W as L}from"../../World-fed11d95.js";import{S as G}from"../../sizes-40a94193.js";import{a as B}from"../../lil-gui.esm-ee8b5e9f.js";import{L as E}from"../../loading-overlay-785c0760.js";import{G as A}from"../../GLTFLoader-03a1bcb0.js";import"../../three.module-bbe333d0.js";import"../../OrbitControls-cba99037.js";var j=`varying vec2 vUv;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}`,F=`varying vec2 vUv;
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
}`,R=`void main() {

    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}`,k=`uniform float uPixelRatio;
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
}`;const I=(e=30)=>{const n=new Float32Array(e*3);for(let a=0;a<e;a++)n[a*3]=(Math.random()-.5)*4,n[a*3+1]=.25+Math.random()*1.25,n[a*3+2]=(Math.random()-.5)*4;return n},W=(e=30)=>{const n=new Float32Array(e);for(let a=0;a<e;a++)n[a]=Math.random();return n};class D{world;sizes;points;geometry;material;constructor(n){this.geometry=new w,this.geometry.setAttribute("position",new f(I(),3)),this.geometry.setAttribute("aScale",new f(W(),1)),this.material=new x({uniforms:{uPixelRatio:{value:n.sizes.pixelRatio},uSize:{value:100},uTime:{value:0}},vertexShader:k,fragmentShader:R,transparent:!0,depthWrite:!1,blending:C}),this.points=new _(this.geometry,this.material),this.world=n,this.sizes=n.sizes,this.world.scene.add(this.points),this.sizes.on("resize",this.onResize)}onResize=()=>{this.material.uniforms.uPixelRatio.value=this.sizes.pixelRatio};tick=n=>{this.material.uniforms.uTime.value=n}}M.enabled=!0;const U=new G,o=new L(U),q=new b,l=new B;o.camera.near=.1;o.camera.far=100;o.camera.position.set(-.7,2,-3.5);o.camera.updateProjectionMatrix();o.renderer.outputColorSpace=p;o.controls&&(o.controls.minPolarAngle=0,o.controls.maxPolarAngle=Math.PI/2-.1,o.controls.maxDistance=20,o.controls.minDistance=1);const y=new E,H=new T(y.manager),Y=new A(y.manager),P="/threejs-experiments",v=H.load(P+"/scenes/portal/baked.jpg");v.flipY=!1;v.colorSpace=p;const $=new z({map:v}),u=new z({color:"#ffe3d1"}),t=new x({vertexShader:j,fragmentShader:F,uniforms:{uTime:{value:0},uColorStart:{value:new m("#ffbdc2")},uColorEnd:{value:new m("#fffaff")},uSpiralTightness:{value:.45},uWaveSpeed:{value:.2},uSpiralSpeed:{value:.45},uBlur:{value:.43},uGlowStart:{value:.29},uGlowEnd:{value:.95},uDiv:{value:.34}}}),h=new D(o);Y.load(P+"/scenes/portal/portal-merged.glb",e=>{const n=e.scene;n.traverse(i=>{i instanceof c&&(i.material=$)});const a=n.children.find(i=>i.name==="poleLightA"),g=n.children.find(i=>i.name==="poleLightB"),d=n.children.find(i=>i.name==="portalLight");a instanceof c&&(a.material=u),g instanceof c&&(g.material=u),d instanceof c&&(d.material=t),o.scene.add(n)});const s={poleLightColor:u.color.getHexString(),clearColor:"#160e14",portalColorStart:t.uniforms.uColorStart.value.getHexString(),portalColorEnd:t.uniforms.uColorEnd.value.getHexString()};o.renderer.setClearColor(s.clearColor);l.addColor(s,"clearColor").onChange(e=>{o.renderer.setClearColor(e)});l.add(h.material.uniforms.uSize,"value",0,500,1).name("firefliesSize");l.addColor(s,"poleLightColor").onChange(e=>{u.color.set(e)});let r=l.addFolder("portal");r.addColor(s,"portalColorStart").onChange(e=>{t.uniforms.uColorStart.value.set(e)});r.addColor(s,"portalColorEnd").onChange(e=>{t.uniforms.uColorEnd.value.set(e)});r.add(t.uniforms.uSpiralTightness,"value",0,1,.01).name("spiralTightness");r.add(t.uniforms.uWaveSpeed,"value",0,2,.01).name("waveSpeed");r.add(t.uniforms.uSpiralSpeed,"value",0,2,.01).name("spiralSpeed");r.add(t.uniforms.uBlur,"value",0,1,.01).name("blur");r.add(t.uniforms.uGlowStart,"value",0,1,.01).name("glowStart");r.add(t.uniforms.uGlowEnd,"value",0,1,.01).name("glowEnd");r.add(t.uniforms.uDiv,"value",.01,1,.01).name("div");l.close();const S=()=>{const e=q.getElapsedTime();t.uniforms.uTime.value=e,h.tick(e),o.render(),window.requestAnimationFrame(S)};window.requestAnimationFrame(S);
