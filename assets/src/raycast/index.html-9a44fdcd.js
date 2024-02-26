var X=Object.defineProperty;var Y=(o,i,e)=>i in o?X(o,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[i]=e;var x=(o,i,e)=>(Y(o,typeof i!="symbol"?i+"":i,e),e);import{b as g,_ as q,V as B,ac as R,ad as T,f as E,t as b,j as K,ae as Q,s as Z,af as W,B as $,ag as ee,ah as _,a7 as te,x as ie,k as se,J as ne,M as F}from"../../three.module-08dc1cdd.js";/* empty css                  */import{S as re}from"../../scene-8780dbe5.js";import"../../OrbitControls-f09e7187.js";class w extends g{constructor(){super(w.Geometry,new q({opacity:0,transparent:!0})),this.isLensflare=!0,this.type="Lensflare",this.frustumCulled=!1,this.renderOrder=1/0;const i=new B,e=new B,t=new R(16,16),n=new R(16,16);let a=W;const c=w.Geometry,l=new T({uniforms:{scale:{value:null},screenPosition:{value:null}},vertexShader:`

				precision highp float;

				uniform vec3 screenPosition;
				uniform vec2 scale;

				attribute vec3 position;

				void main() {

					gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );

				}`,fragmentShader:`

				precision highp float;

				void main() {

					gl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );

				}`,depthTest:!0,depthWrite:!1,transparent:!1}),P=new T({uniforms:{map:{value:t},scale:{value:null},screenPosition:{value:null}},vertexShader:`

				precision highp float;

				uniform vec3 screenPosition;
				uniform vec2 scale;

				attribute vec3 position;
				attribute vec2 uv;

				varying vec2 vUV;

				void main() {

					vUV = uv;

					gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );

				}`,fragmentShader:`

				precision highp float;

				uniform sampler2D map;

				varying vec2 vUV;

				void main() {

					gl_FragColor = texture2D( map, vUV );

				}`,depthTest:!1,depthWrite:!1,transparent:!1}),U=new g(c,l),u=[],V=M.Shader,v=new T({name:V.name,uniforms:{map:{value:null},occlusionMap:{value:n},color:{value:new E(16777215)},scale:{value:new b},screenPosition:{value:new B}},vertexShader:V.vertexShader,fragmentShader:V.fragmentShader,blending:K,transparent:!0,depthWrite:!1}),G=new g(c,v);this.addElement=function(r){u.push(r)};const S=new b,f=new b,D=new Q,s=new Z;this.onBeforeRender=function(r,A,p){r.getCurrentViewport(s);const C=r.getRenderTarget(),I=C!==null?C.texture.type:W;a!==I&&(t.dispose(),n.dispose(),t.type=n.type=I,a=I);const H=s.w/s.z,L=s.z/2,j=s.w/2;let h=16/s.w;if(S.set(h*H,h),D.min.set(s.x,s.y),D.max.set(s.x+(s.z-16),s.y+(s.w-16)),e.setFromMatrixPosition(this.matrixWorld),e.applyMatrix4(p.matrixWorldInverse),!(e.z>0)&&(i.copy(e).applyMatrix4(p.projectionMatrix),f.x=s.x+i.x*L+L-8,f.y=s.y+i.y*j+j-8,D.containsPoint(f))){r.copyFramebufferToTexture(f,t);let d=l.uniforms;d.scale.value=S,d.screenPosition.value=i,r.renderBufferDirect(p,null,c,l,U,null),r.copyFramebufferToTexture(f,n),d=P.uniforms,d.scale.value=S,d.screenPosition.value=i,r.renderBufferDirect(p,null,c,P,U,null);const O=-i.x*2,k=-i.y*2;for(let z=0,J=u.length;z<J;z++){const m=u[z],y=v.uniforms;y.color.value.copy(m.color),y.map.value=m.texture,y.screenPosition.value.x=i.x+O*m.distance,y.screenPosition.value.y=i.y+k*m.distance,h=m.size/s.w;const N=s.w/s.z;y.scale.value.set(h*N,h),v.uniformsNeedUpdate=!0,r.renderBufferDirect(p,null,c,v,G,null)}}},this.dispose=function(){l.dispose(),P.dispose(),v.dispose(),t.dispose(),n.dispose();for(let r=0,A=u.length;r<A;r++)u[r].texture.dispose()}}}class M{constructor(i,e=1,t=0,n=new E(16777215)){this.texture=i,this.size=e,this.distance=t,this.color=n}}M.Shader={name:"LensflareElementShader",uniforms:{map:{value:null},occlusionMap:{value:null},color:{value:null},scale:{value:null},screenPosition:{value:null}},vertexShader:`

		precision highp float;

		uniform vec3 screenPosition;
		uniform vec2 scale;

		uniform sampler2D occlusionMap;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUV;
		varying float vVisibility;

		void main() {

			vUV = uv;

			vec2 pos = position.xy;

			vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );
			visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );
			visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );
			visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );
			visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );
			visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );
			visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );
			visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );
			visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );

			vVisibility =        visibility.r / 9.0;
			vVisibility *= 1.0 - visibility.g / 9.0;
			vVisibility *=       visibility.b / 9.0;

			gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D map;
		uniform vec3 color;

		varying vec2 vUV;
		varying float vVisibility;

		void main() {

			vec4 texture = texture2D( map, vUV );
			texture.a *= vVisibility;
			gl_FragColor = texture;
			gl_FragColor.rgb *= color;

		}`};w.Geometry=function(){const o=new $,i=new Float32Array([-1,-1,0,0,0,1,-1,0,1,0,1,1,0,1,1,-1,1,0,0,1]),e=new ee(i,5);return o.setIndex([0,1,2,0,2,3]),o.setAttribute("position",new _(e,3,0,!1)),o.setAttribute("uv",new _(e,2,3,!1)),o}();class oe extends re{constructor(e=!0,{controls:t=!0,fov:n=70,clearColor:a=3355443,mouse:c=!0,rendererAlpha:l=!0}={}){super(e,{controls:t,fov:n,clearColor:a,mouse:c,rendererAlpha:l});x(this,"geo",new te(10,32,32));x(this,"pointer",new b);x(this,"raycaster",new ie);x(this,"intersected",null);this.camera.position.z=200,this.camera.far=3e3,this.controls&&(this.controls.autoRotate=!0),this.dirLight(),this.createObjects(),this.addToDom(),this.animate()}lensFlares(){const t=new se().load("/lensflare0.png"),n=new ne(16777215,1,2e3);n.color.setHSL(.55,.9,.5),n.position.set(0,0,-100),this.scene.add(n);const a=new w;a.addElement(new M(t,600,0,n.color)),a.addElement(new M(t,30,.2)),n.add(a)}createObjects(){for(let e=0;e<100;e++){let t=new g(this.geo,new F({color:6581503}));t.position.x=Math.random()*200-100,t.position.y=Math.random()*200-100,t.position.z=Math.random()*200-100,t.rotation.x=Math.random()*2*Math.PI,t.rotation.y=Math.random()*2*Math.PI,t.rotation.z=Math.random()*2*Math.PI,this.scene.add(t)}}render(){this.controls&&this.controls.update(),this.checkIntersects(),this.renderer.render(this.scene,this.camera)}checkIntersects(){this.raycaster.setFromCamera(this.pointer,this.camera);const e=this.raycaster.intersectObjects(this.scene.children);if(e.length>0){let t=e[0].object;if(this.intersected===t)return;this.resetIntersected(),t instanceof g&&this.setIntersected(t)}else this.resetIntersected()}setIntersected(e){let t=e.material;t instanceof F&&t.emissive.setHex(16711680),this.intersected=e}resetIntersected(){if(!this.intersected)return;let e=this.intersected.material;e instanceof F&&e.emissive.setHex(0),this.intersected=null}}new oe;
