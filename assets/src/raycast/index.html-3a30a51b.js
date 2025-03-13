import{b as m,_ as N,V as z,af as L,ag as B,f as _,v as w,j as X,ah as Y,s as q,ai as R,B as K,aj as Q,ak as W,a9 as Z,x as $,k as ee,J as te,M as T}from"../../three.core-cdbdf8aa.js";/* empty css                  */import{S as ie}from"../../scene-b667a442.js";import"../../three.module-2b501472.js";import"../../OrbitControls-ed6ab3c1.js";class y extends m{constructor(){super(y.Geometry,new N({opacity:0,transparent:!0})),this.isLensflare=!0,this.type="Lensflare",this.frustumCulled=!1,this.renderOrder=1/0;const t=new z,e=new z,s=new L(16,16),n=new L(16,16);let x=R;const o=y.Geometry,g=new B({uniforms:{scale:{value:null},screenPosition:{value:null}},vertexShader:`

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

				}`,depthTest:!0,depthWrite:!1,transparent:!1}),M=new B({uniforms:{map:{value:s},scale:{value:null},screenPosition:{value:null}},vertexShader:`

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

				}`,depthTest:!1,depthWrite:!1,transparent:!1}),F=new m(o,g),c=[],P=b.Shader,l=new B({name:P.name,uniforms:{map:{value:null},occlusionMap:{value:n},color:{value:new _(16777215)},scale:{value:new w},screenPosition:{value:new z}},vertexShader:P.vertexShader,fragmentShader:P.fragmentShader,blending:X,transparent:!0,depthWrite:!1}),E=new m(o,l);this.addElement=function(r){c.push(r)};const V=new w,u=new w,S=new Y,i=new q;this.onBeforeRender=function(r,U,v){r.getCurrentViewport(i);const A=r.getRenderTarget(),D=A!==null?A.texture.type:R;x!==D&&(s.dispose(),n.dispose(),s.type=n.type=D,x=D);const G=i.w/i.z,j=i.z/2,C=i.w/2;let f=16/i.w;if(V.set(f*G,f),S.min.set(i.x,i.y),S.max.set(i.x+(i.z-16),i.y+(i.w-16)),e.setFromMatrixPosition(this.matrixWorld),e.applyMatrix4(v.matrixWorldInverse),!(e.z>0)&&(t.copy(e).applyMatrix4(v.projectionMatrix),u.x=i.x+t.x*j+j-8,u.y=i.y+t.y*C+C-8,S.containsPoint(u))){r.copyFramebufferToTexture(s,u);let p=g.uniforms;p.scale.value=V,p.screenPosition.value=t,r.renderBufferDirect(v,null,o,g,F,null),r.copyFramebufferToTexture(n,u),p=M.uniforms,p.scale.value=V,p.screenPosition.value=t,r.renderBufferDirect(v,null,o,M,F,null);const k=-t.x*2,H=-t.y*2;for(let I=0,O=c.length;I<O;I++){const h=c[I],d=l.uniforms;d.color.value.copy(h.color),d.map.value=h.texture,d.screenPosition.value.x=t.x+k*h.distance,d.screenPosition.value.y=t.y+H*h.distance,f=h.size/i.w;const J=i.w/i.z;d.scale.value.set(f*J,f),l.uniformsNeedUpdate=!0,r.renderBufferDirect(v,null,o,l,E,null)}}},this.dispose=function(){g.dispose(),M.dispose(),l.dispose(),s.dispose(),n.dispose();for(let r=0,U=c.length;r<U;r++)c[r].texture.dispose()}}}class b{constructor(t,e=1,s=0,n=new _(16777215)){this.texture=t,this.size=e,this.distance=s,this.color=n}}b.Shader={name:"LensflareElementShader",uniforms:{map:{value:null},occlusionMap:{value:null},color:{value:null},scale:{value:null},screenPosition:{value:null}},vertexShader:`

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

		}`};y.Geometry=function(){const a=new K,t=new Float32Array([-1,-1,0,0,0,1,-1,0,1,0,1,1,0,1,1,-1,1,0,0,1]),e=new Q(t,5);return a.setIndex([0,1,2,0,2,3]),a.setAttribute("position",new W(e,3,0,!1)),a.setAttribute("uv",new W(e,2,3,!1)),a}();class se extends ie{geo=new Z(10,32,32);pointer=new w;raycaster=new $;intersected=null;constructor(t=!0,{controls:e=!0,fov:s=70,clearColor:n=3355443,mouse:x=!0,rendererAlpha:o=!0}={}){super(t,{controls:e,fov:s,clearColor:n,mouse:x,rendererAlpha:o}),this.camera.position.z=200,this.camera.far=3e3,this.controls&&(this.controls.autoRotate=!0),this.dirLight(),this.createObjects(),this.addToDom(),this.animate()}lensFlares(){const e=new ee().load("/lensflare0.png"),s=new te(16777215,1,2e3);s.color.setHSL(.55,.9,.5),s.position.set(0,0,-100),this.scene.add(s);const n=new y;n.addElement(new b(e,600,0,s.color)),n.addElement(new b(e,30,.2)),s.add(n)}createObjects(){for(let t=0;t<100;t++){let e=new m(this.geo,new T({color:6581503}));e.position.x=Math.random()*200-100,e.position.y=Math.random()*200-100,e.position.z=Math.random()*200-100,e.rotation.x=Math.random()*2*Math.PI,e.rotation.y=Math.random()*2*Math.PI,e.rotation.z=Math.random()*2*Math.PI,this.scene.add(e)}}render(){this.controls&&this.controls.update(),this.checkIntersects(),this.renderer.render(this.scene,this.camera)}checkIntersects(){this.raycaster.setFromCamera(this.pointer,this.camera);const t=this.raycaster.intersectObjects(this.scene.children);if(t.length>0){let e=t[0].object;if(this.intersected===e)return;this.resetIntersected(),e instanceof m&&this.setIntersected(e)}else this.resetIntersected()}setIntersected(t){let e=t.material;e instanceof T&&e.emissive.setHex(16711680),this.intersected=t}resetIntersected(){if(!this.intersected)return;let t=this.intersected.material;t instanceof T&&t.emissive.setHex(0),this.intersected=null}}new se;
