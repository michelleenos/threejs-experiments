import{X as z,k as T,Y as S,S as w,f as y,b as c,B as b,i as h,j as G,h as L,J as A,Z as B}from"../../three.module-f3808c7b.js";/* empty css                  */import{S as E,W as j}from"../../World-66b936b7.js";import{a as F}from"../../lil-gui.esm-ee8b5e9f.js";import{G as I}from"../../GLTFLoader-2ceaf2e5.js";import"../../OrbitControls-7df3182b.js";var R=`void main() {

    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}`,W=`uniform float uPixelRatio;
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
}`,k=`varying vec2 vUv;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}`,D=`varying vec2 vUv;
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
}`;A.enabled=!0;const u=new E,n=new j(u),U=new B,i=new F;n.camera.near=.1;n.camera.far=100;n.camera.position.set(-.7,2,-3.5);n.camera.updateProjectionMatrix();n.renderer.outputColorSpace=z;n.controls.minPolarAngle=0;n.controls.maxPolarAngle=Math.PI/2-.1;n.controls.maxDistance=20;n.controls.minDistance=1;const q=new T,H=new I,C="/threejs-experiments",g=q.load(C+"/scenes/portal/baked.jpg");g.flipY=!1;g.colorSpace=z;const Y=new S({map:g}),v=new S({color:"#ffe3d1"}),o=new w({vertexShader:k,fragmentShader:D,uniforms:{uTime:{value:0},uColorStart:{value:new y("#ffbdc2")},uColorEnd:{value:new y("#fffaff")},uSpiralTightness:{value:.45},uWaveSpeed:{value:.2},uSpiralSpeed:{value:.45},uBlur:{value:.43},uGlowStart:{value:.29},uGlowEnd:{value:.95},uDiv:{value:.34}}});H.load(C+"/scenes/portal/portal-merged.glb",e=>{const r=e.scene;r.traverse(a=>{a instanceof c&&(a.material=Y)});const x=r.children.find(a=>a.name==="poleLightA"),p=r.children.find(a=>a.name==="poleLightB"),P=r.children.find(a=>a.name==="portalLight");x instanceof c&&(x.material=v),p instanceof c&&(p.material=v),P instanceof c&&(P.material=o),n.scene.add(r)});const m=new b,f=30,s=new Float32Array(f*3);for(let e=0;e<f;e++)s[e*3]=(Math.random()-.5)*4,s[e*3+1]=.25+Math.random()*1.25,s[e*3+2]=(Math.random()-.5)*4;m.setAttribute("position",new h(s,3));const M=new Float32Array(f);for(let e=0;e<f;e++)M[e]=Math.random();m.setAttribute("aScale",new h(M,1));const d=new w({uniforms:{uPixelRatio:{value:u.pixelRatio},uSize:{value:100},uTime:{value:0}},vertexShader:W,fragmentShader:R,transparent:!0,depthWrite:!1,blending:G}),$=new L(m,d);n.scene.add($);u.on("resize",()=>{d.uniforms.uPixelRatio.value=u.pixelRatio});const l={poleLightColor:v.color.getHexString(),clearColor:"#160e14",portalColorStart:o.uniforms.uColorStart.value.getHexString(),portalColorEnd:o.uniforms.uColorEnd.value.getHexString()};n.renderer.setClearColor(l.clearColor);i.addColor(l,"clearColor").onChange(e=>{n.renderer.setClearColor(e)});i.add(d.uniforms.uSize,"value",0,500,1).name("firefliesSize");i.addColor(l,"poleLightColor").onChange(e=>{v.color.set(e)});let t=i.addFolder("portal");t.addColor(l,"portalColorStart").onChange(e=>{o.uniforms.uColorStart.value.set(e)});t.addColor(l,"portalColorEnd").onChange(e=>{o.uniforms.uColorEnd.value.set(e)});t.add(o.uniforms.uSpiralTightness,"value",0,1,.01).name("spiralTightness");t.add(o.uniforms.uWaveSpeed,"value",0,2,.01).name("waveSpeed");t.add(o.uniforms.uSpiralSpeed,"value",0,2,.01).name("spiralSpeed");t.add(o.uniforms.uBlur,"value",0,1,.01).name("blur");t.add(o.uniforms.uGlowStart,"value",0,1,.01).name("glowStart");t.add(o.uniforms.uGlowEnd,"value",0,1,.01).name("glowEnd");t.add(o.uniforms.uDiv,"value",.01,1,.01).name("div");i.close();const _=()=>{const e=U.getElapsedTime();d.uniforms.uTime.value=e,o.uniforms.uTime.value=e,n.render(),window.requestAnimationFrame(_)};window.requestAnimationFrame(_);
