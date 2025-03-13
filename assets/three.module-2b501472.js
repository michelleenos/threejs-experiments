import{b2 as Ur,Y as Dr,N as At,f as Ke,b3 as tr,r as Vt,V as We,b4 as wr,b5 as Lt,W as kt,H as hn,ai as Nt,ay as qt,K as tt,a as Mt,b6 as _t,aa as Zt,b7 as Ir,b8 as Nr,b9 as yr,ba as Or,bb as Fr,v as ft,p as sn,s as lt,bc as Br,bd as Sn,be as Tt,bf as dn,bg as Wn,bh as Qt,bi as Jt,bj as nr,bk as Gr,ar as _n,q as Hr,bl as Fe,bm as Vr,bn as kr,bo as Wr,S as yt,B as ir,i as cn,b as xt,bp as rr,bq as It,br as St,aA as $t,bs as un,bt as Yt,bu as zr,bv as Xr,bw as Yr,bx as qr,by as Kr,bz as $r,bA as Zr,bB as Qr,bC as Jr,bD as jr,bE as ea,bF as ta,bG as na,bH as ia,bI as ra,bJ as aa,bK as oa,bL as sa,ae as Jn,ad as jn,j as ei,o as ln,bM as ca,bN as ti,bO as la,az as fa,aR as da,aS as ua,aO as pa,aQ as nn,ax as Gt,aP as Mn,bP as ha,bQ as _a,bR as ma,bS as ar,bT as va,bU as ga,bV as Ea,bW as Sa,bX as or,bY as sr,bZ as cr,b_ as pn,b$ as lr,c0 as fr,c1 as mn,a6 as dr,c2 as ni,c3 as Ye,t as ur,c4 as pr,c5 as hr,c6 as wt,c7 as In,c8 as Nn,c9 as Ma,ca as _r,cb as Ta,cc as xa,U as Aa,cd as Ra,ce as Ca,cf as Bt,cg as ii,ch as ba,ci as Pa,cj as La,ck as Ua,cl as Da,cm as wa,cn as Ia,co as Na,cp as ya,cq as Tn,cr as xn,cs as An,ct as Rn,cu as ri,cv as ai,cw as oi,cx as si,cy as ci,cz as li,cA as fi,cB as di,cC as ui,cD as pi,cE as hi,cF as _i,cG as mi,cH as vi,cI as gi,cJ as Ei,cK as Si,cL as Mi,cM as Ti,cN as xi,cO as Ai,cP as Cn,cQ as Ri,cR as Ci,cS as Oa,cT as bi,cU as Pi,cV as Li,aU as mr,cW as ct,E as vr,cX as jt,cY as Wt,_ as Fa,cZ as Ba,c_ as Ga,c$ as Ha,d0 as Ui,d1 as Va,d2 as yn,d3 as On,d4 as Fn,d5 as Bn,d6 as Gn,d7 as Hn,d8 as Vn,d9 as gr,aJ as ka,da as Wa,db as za,dc as Xa,n as Ya,m as qa,R as Ka,L as $a,P as Za,dd as Qa,de as Ja,df as ja,dg as eo,dh as to,di as no}from"./three.core-cdbdf8aa.js";/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Er(){let e=null,n=!1,t=null,i=null;function c(o,h){t(o,h),i=e.requestAnimationFrame(c)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(c),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(o){t=o},setContext:function(o){e=o}}}function io(e){const n=new WeakMap;function t(u,C){const M=u.array,w=u.usage,T=M.byteLength,E=e.createBuffer();e.bindBuffer(C,E),e.bufferData(C,M,w),u.onUploadCallback();let A;if(M instanceof Float32Array)A=e.FLOAT;else if(M instanceof Uint16Array)u.isFloat16BufferAttribute?A=e.HALF_FLOAT:A=e.UNSIGNED_SHORT;else if(M instanceof Int16Array)A=e.SHORT;else if(M instanceof Uint32Array)A=e.UNSIGNED_INT;else if(M instanceof Int32Array)A=e.INT;else if(M instanceof Int8Array)A=e.BYTE;else if(M instanceof Uint8Array)A=e.UNSIGNED_BYTE;else if(M instanceof Uint8ClampedArray)A=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+M);return{buffer:E,type:A,bytesPerElement:M.BYTES_PER_ELEMENT,version:u.version,size:T}}function i(u,C,M){const w=C.array,T=C.updateRanges;if(e.bindBuffer(M,u),T.length===0)e.bufferSubData(M,0,w);else{T.sort((A,O)=>A.start-O.start);let E=0;for(let A=1;A<T.length;A++){const O=T[E],L=T[A];L.start<=O.start+O.count+1?O.count=Math.max(O.count,L.start+L.count-O.start):(++E,T[E]=L)}T.length=E+1;for(let A=0,O=T.length;A<O;A++){const L=T[A];e.bufferSubData(M,L.start*w.BYTES_PER_ELEMENT,w,L.start,L.count)}C.clearUpdateRanges()}C.onUploadCallback()}function c(u){return u.isInterleavedBufferAttribute&&(u=u.data),n.get(u)}function o(u){u.isInterleavedBufferAttribute&&(u=u.data);const C=n.get(u);C&&(e.deleteBuffer(C.buffer),n.delete(u))}function h(u,C){if(u.isInterleavedBufferAttribute&&(u=u.data),u.isGLBufferAttribute){const w=n.get(u);(!w||w.version<u.version)&&n.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}const M=n.get(u);if(M===void 0)n.set(u,t(u,C));else if(M.version<u.version){if(M.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(M.buffer,u,C),M.version=u.version}}return{get:c,remove:o,update:h}}var ro=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ao=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,oo=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,so=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,co=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lo=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fo=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,uo=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,po=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ho=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_o=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mo=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vo=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,go=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Eo=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,So=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Mo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,To=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xo=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ao=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ro=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Co=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,bo=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Po=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Lo=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Uo=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Do=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wo=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Io=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,No=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yo="gl_FragColor = linearToOutputTexel( gl_FragColor );",Oo=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fo=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Bo=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Go=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ho=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vo=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ko=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wo=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zo=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xo=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yo=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,qo=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ko=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$o=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zo=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Qo=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Jo=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jo=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,es=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ts=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ns=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,is=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,rs=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,as=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,os=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ss=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cs=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ls=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fs=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ds=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,us=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ps=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hs=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_s=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ms=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vs=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gs=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Es=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ss=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ms=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ts=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xs=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,As=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rs=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cs=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bs=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ps=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ls=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Us=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ds=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ws=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Is=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ns=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ys=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Os=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fs=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bs=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gs=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hs=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Vs=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ks=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ws=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,zs=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xs=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ys=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qs=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ks=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$s=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zs=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qs=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Js=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,js=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ec=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,nc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ic=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rc=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ac=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sc=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lc=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fc=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,dc=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,uc=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,pc=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_c=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mc=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vc=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gc=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ec=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sc=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mc=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tc=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xc=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ac=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Rc=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Cc=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bc=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pc=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Lc=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uc=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dc=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wc=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ic=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Nc=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yc=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Oc=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fc=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Pe={alphahash_fragment:ro,alphahash_pars_fragment:ao,alphamap_fragment:oo,alphamap_pars_fragment:so,alphatest_fragment:co,alphatest_pars_fragment:lo,aomap_fragment:fo,aomap_pars_fragment:uo,batching_pars_vertex:po,batching_vertex:ho,begin_vertex:_o,beginnormal_vertex:mo,bsdfs:vo,iridescence_fragment:go,bumpmap_pars_fragment:Eo,clipping_planes_fragment:So,clipping_planes_pars_fragment:Mo,clipping_planes_pars_vertex:To,clipping_planes_vertex:xo,color_fragment:Ao,color_pars_fragment:Ro,color_pars_vertex:Co,color_vertex:bo,common:Po,cube_uv_reflection_fragment:Lo,defaultnormal_vertex:Uo,displacementmap_pars_vertex:Do,displacementmap_vertex:wo,emissivemap_fragment:Io,emissivemap_pars_fragment:No,colorspace_fragment:yo,colorspace_pars_fragment:Oo,envmap_fragment:Fo,envmap_common_pars_fragment:Bo,envmap_pars_fragment:Go,envmap_pars_vertex:Ho,envmap_physical_pars_fragment:Qo,envmap_vertex:Vo,fog_vertex:ko,fog_pars_vertex:Wo,fog_fragment:zo,fog_pars_fragment:Xo,gradientmap_pars_fragment:Yo,lightmap_pars_fragment:qo,lights_lambert_fragment:Ko,lights_lambert_pars_fragment:$o,lights_pars_begin:Zo,lights_toon_fragment:Jo,lights_toon_pars_fragment:jo,lights_phong_fragment:es,lights_phong_pars_fragment:ts,lights_physical_fragment:ns,lights_physical_pars_fragment:is,lights_fragment_begin:rs,lights_fragment_maps:as,lights_fragment_end:os,logdepthbuf_fragment:ss,logdepthbuf_pars_fragment:cs,logdepthbuf_pars_vertex:ls,logdepthbuf_vertex:fs,map_fragment:ds,map_pars_fragment:us,map_particle_fragment:ps,map_particle_pars_fragment:hs,metalnessmap_fragment:_s,metalnessmap_pars_fragment:ms,morphinstance_vertex:vs,morphcolor_vertex:gs,morphnormal_vertex:Es,morphtarget_pars_vertex:Ss,morphtarget_vertex:Ms,normal_fragment_begin:Ts,normal_fragment_maps:xs,normal_pars_fragment:As,normal_pars_vertex:Rs,normal_vertex:Cs,normalmap_pars_fragment:bs,clearcoat_normal_fragment_begin:Ps,clearcoat_normal_fragment_maps:Ls,clearcoat_pars_fragment:Us,iridescence_pars_fragment:Ds,opaque_fragment:ws,packing:Is,premultiplied_alpha_fragment:Ns,project_vertex:ys,dithering_fragment:Os,dithering_pars_fragment:Fs,roughnessmap_fragment:Bs,roughnessmap_pars_fragment:Gs,shadowmap_pars_fragment:Hs,shadowmap_pars_vertex:Vs,shadowmap_vertex:ks,shadowmask_pars_fragment:Ws,skinbase_vertex:zs,skinning_pars_vertex:Xs,skinning_vertex:Ys,skinnormal_vertex:qs,specularmap_fragment:Ks,specularmap_pars_fragment:$s,tonemapping_fragment:Zs,tonemapping_pars_fragment:Qs,transmission_fragment:Js,transmission_pars_fragment:js,uv_pars_fragment:ec,uv_pars_vertex:tc,uv_vertex:nc,worldpos_vertex:ic,background_vert:rc,background_frag:ac,backgroundCube_vert:oc,backgroundCube_frag:sc,cube_vert:cc,cube_frag:lc,depth_vert:fc,depth_frag:dc,distanceRGBA_vert:uc,distanceRGBA_frag:pc,equirect_vert:hc,equirect_frag:_c,linedashed_vert:mc,linedashed_frag:vc,meshbasic_vert:gc,meshbasic_frag:Ec,meshlambert_vert:Sc,meshlambert_frag:Mc,meshmatcap_vert:Tc,meshmatcap_frag:xc,meshnormal_vert:Ac,meshnormal_frag:Rc,meshphong_vert:Cc,meshphong_frag:bc,meshphysical_vert:Pc,meshphysical_frag:Lc,meshtoon_vert:Uc,meshtoon_frag:Dc,points_vert:wc,points_frag:Ic,shadow_vert:Nc,shadow_frag:yc,sprite_vert:Oc,sprite_frag:Fc},ee={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},gt={basic:{uniforms:ct([ee.common,ee.specularmap,ee.envmap,ee.aomap,ee.lightmap,ee.fog]),vertexShader:Pe.meshbasic_vert,fragmentShader:Pe.meshbasic_frag},lambert:{uniforms:ct([ee.common,ee.specularmap,ee.envmap,ee.aomap,ee.lightmap,ee.emissivemap,ee.bumpmap,ee.normalmap,ee.displacementmap,ee.fog,ee.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Pe.meshlambert_vert,fragmentShader:Pe.meshlambert_frag},phong:{uniforms:ct([ee.common,ee.specularmap,ee.envmap,ee.aomap,ee.lightmap,ee.emissivemap,ee.bumpmap,ee.normalmap,ee.displacementmap,ee.fog,ee.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:Pe.meshphong_vert,fragmentShader:Pe.meshphong_frag},standard:{uniforms:ct([ee.common,ee.envmap,ee.aomap,ee.lightmap,ee.emissivemap,ee.bumpmap,ee.normalmap,ee.displacementmap,ee.roughnessmap,ee.metalnessmap,ee.fog,ee.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Pe.meshphysical_vert,fragmentShader:Pe.meshphysical_frag},toon:{uniforms:ct([ee.common,ee.aomap,ee.lightmap,ee.emissivemap,ee.bumpmap,ee.normalmap,ee.displacementmap,ee.gradientmap,ee.fog,ee.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Pe.meshtoon_vert,fragmentShader:Pe.meshtoon_frag},matcap:{uniforms:ct([ee.common,ee.bumpmap,ee.normalmap,ee.displacementmap,ee.fog,{matcap:{value:null}}]),vertexShader:Pe.meshmatcap_vert,fragmentShader:Pe.meshmatcap_frag},points:{uniforms:ct([ee.points,ee.fog]),vertexShader:Pe.points_vert,fragmentShader:Pe.points_frag},dashed:{uniforms:ct([ee.common,ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Pe.linedashed_vert,fragmentShader:Pe.linedashed_frag},depth:{uniforms:ct([ee.common,ee.displacementmap]),vertexShader:Pe.depth_vert,fragmentShader:Pe.depth_frag},normal:{uniforms:ct([ee.common,ee.bumpmap,ee.normalmap,ee.displacementmap,{opacity:{value:1}}]),vertexShader:Pe.meshnormal_vert,fragmentShader:Pe.meshnormal_frag},sprite:{uniforms:ct([ee.sprite,ee.fog]),vertexShader:Pe.sprite_vert,fragmentShader:Pe.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Pe.background_vert,fragmentShader:Pe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Pe.backgroundCube_vert,fragmentShader:Pe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Pe.cube_vert,fragmentShader:Pe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Pe.equirect_vert,fragmentShader:Pe.equirect_frag},distanceRGBA:{uniforms:ct([ee.common,ee.displacementmap,{referencePosition:{value:new We},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Pe.distanceRGBA_vert,fragmentShader:Pe.distanceRGBA_frag},shadow:{uniforms:ct([ee.lights,ee.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Pe.shadow_vert,fragmentShader:Pe.shadow_frag}};gt.physical={uniforms:ct([gt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Pe.meshphysical_vert,fragmentShader:Pe.meshphysical_frag};const rn={r:0,b:0,g:0},bt=new vr,Bc=new Vt;function Gc(e,n,t,i,c,o,h){const u=new Ke(0);let C=o===!0?0:1,M,w,T=null,E=0,A=null;function O(x){let m=x.isScene===!0?x.background:null;return m&&m.isTexture&&(m=(x.backgroundBlurriness>0?t:n).get(m)),m}function L(x){let m=!1;const H=O(x);H===null?r(u,C):H&&H.isColor&&(r(H,1),m=!0);const P=e.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,h):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,h),(e.autoClear||m)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function l(x,m){const H=O(m);H&&(H.isCubeTexture||H.mapping===mn)?(w===void 0&&(w=new xt(new dr(1,1,1),new yt({name:"BackgroundCubeMaterial",uniforms:ni(gt.backgroundCube.uniforms),vertexShader:gt.backgroundCube.vertexShader,fragmentShader:gt.backgroundCube.fragmentShader,side:_t,depthTest:!1,depthWrite:!1,fog:!1})),w.geometry.deleteAttribute("normal"),w.geometry.deleteAttribute("uv"),w.onBeforeRender=function(P,N,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(w.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),c.update(w)),bt.copy(m.backgroundRotation),bt.x*=-1,bt.y*=-1,bt.z*=-1,H.isCubeTexture&&H.isRenderTargetTexture===!1&&(bt.y*=-1,bt.z*=-1),w.material.uniforms.envMap.value=H,w.material.uniforms.flipEnvMap.value=H.isCubeTexture&&H.isRenderTargetTexture===!1?-1:1,w.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,w.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,w.material.uniforms.backgroundRotation.value.setFromMatrix4(Bc.makeRotationFromEuler(bt)),w.material.toneMapped=tt.getTransfer(H.colorSpace)!==Ye,(T!==H||E!==H.version||A!==e.toneMapping)&&(w.material.needsUpdate=!0,T=H,E=H.version,A=e.toneMapping),w.layers.enableAll(),x.unshift(w,w.geometry,w.material,0,0,null)):H&&H.isTexture&&(M===void 0&&(M=new xt(new ur(2,2),new yt({name:"BackgroundMaterial",uniforms:ni(gt.background.uniforms),vertexShader:gt.background.vertexShader,fragmentShader:gt.background.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1})),M.geometry.deleteAttribute("normal"),Object.defineProperty(M.material,"map",{get:function(){return this.uniforms.t2D.value}}),c.update(M)),M.material.uniforms.t2D.value=H,M.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,M.material.toneMapped=tt.getTransfer(H.colorSpace)!==Ye,H.matrixAutoUpdate===!0&&H.updateMatrix(),M.material.uniforms.uvTransform.value.copy(H.matrix),(T!==H||E!==H.version||A!==e.toneMapping)&&(M.material.needsUpdate=!0,T=H,E=H.version,A=e.toneMapping),M.layers.enableAll(),x.unshift(M,M.geometry,M.material,0,0,null))}function r(x,m){x.getRGB(rn,pr(e)),i.buffers.color.setClear(rn.r,rn.g,rn.b,m,h)}function U(){w!==void 0&&(w.geometry.dispose(),w.material.dispose(),w=void 0),M!==void 0&&(M.geometry.dispose(),M.material.dispose(),M=void 0)}return{getClearColor:function(){return u},setClearColor:function(x,m=1){u.set(x),C=m,r(u,C)},getClearAlpha:function(){return C},setClearAlpha:function(x){C=x,r(u,C)},render:L,addToRenderList:l,dispose:U}}function Hc(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},c=E(null);let o=c,h=!1;function u(f,R,q,V,Y){let Q=!1;const W=T(V,q,R);o!==W&&(o=W,M(o.object)),Q=A(f,V,q,Y),Q&&O(f,V,q,Y),Y!==null&&n.update(Y,e.ELEMENT_ARRAY_BUFFER),(Q||h)&&(h=!1,m(f,R,q,V),Y!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(Y).buffer))}function C(){return e.createVertexArray()}function M(f){return e.bindVertexArray(f)}function w(f){return e.deleteVertexArray(f)}function T(f,R,q){const V=q.wireframe===!0;let Y=i[f.id];Y===void 0&&(Y={},i[f.id]=Y);let Q=Y[R.id];Q===void 0&&(Q={},Y[R.id]=Q);let W=Q[V];return W===void 0&&(W=E(C()),Q[V]=W),W}function E(f){const R=[],q=[],V=[];for(let Y=0;Y<t;Y++)R[Y]=0,q[Y]=0,V[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:q,attributeDivisors:V,object:f,attributes:{},index:null}}function A(f,R,q,V){const Y=o.attributes,Q=R.attributes;let W=0;const j=q.getAttributes();for(const F in j)if(j[F].location>=0){const Se=Y[F];let Le=Q[F];if(Le===void 0&&(F==="instanceMatrix"&&f.instanceMatrix&&(Le=f.instanceMatrix),F==="instanceColor"&&f.instanceColor&&(Le=f.instanceColor)),Se===void 0||Se.attribute!==Le||Le&&Se.data!==Le.data)return!0;W++}return o.attributesNum!==W||o.index!==V}function O(f,R,q,V){const Y={},Q=R.attributes;let W=0;const j=q.getAttributes();for(const F in j)if(j[F].location>=0){let Se=Q[F];Se===void 0&&(F==="instanceMatrix"&&f.instanceMatrix&&(Se=f.instanceMatrix),F==="instanceColor"&&f.instanceColor&&(Se=f.instanceColor));const Le={};Le.attribute=Se,Se&&Se.data&&(Le.data=Se.data),Y[F]=Le,W++}o.attributes=Y,o.attributesNum=W,o.index=V}function L(){const f=o.newAttributes;for(let R=0,q=f.length;R<q;R++)f[R]=0}function l(f){r(f,0)}function r(f,R){const q=o.newAttributes,V=o.enabledAttributes,Y=o.attributeDivisors;q[f]=1,V[f]===0&&(e.enableVertexAttribArray(f),V[f]=1),Y[f]!==R&&(e.vertexAttribDivisor(f,R),Y[f]=R)}function U(){const f=o.newAttributes,R=o.enabledAttributes;for(let q=0,V=R.length;q<V;q++)R[q]!==f[q]&&(e.disableVertexAttribArray(q),R[q]=0)}function x(f,R,q,V,Y,Q,W){W===!0?e.vertexAttribIPointer(f,R,q,Y,Q):e.vertexAttribPointer(f,R,q,V,Y,Q)}function m(f,R,q,V){L();const Y=V.attributes,Q=q.getAttributes(),W=R.defaultAttributeValues;for(const j in Q){const F=Q[j];if(F.location>=0){let _e=Y[j];if(_e===void 0&&(j==="instanceMatrix"&&f.instanceMatrix&&(_e=f.instanceMatrix),j==="instanceColor"&&f.instanceColor&&(_e=f.instanceColor)),_e!==void 0){const Se=_e.normalized,Le=_e.itemSize,Ge=n.get(_e);if(Ge===void 0)continue;const Ze=Ge.buffer,k=Ge.type,J=Ge.bytesPerElement,ue=k===e.INT||k===e.UNSIGNED_INT||_e.gpuType===hr;if(_e.isInterleavedBufferAttribute){const ie=_e.data,Ee=ie.stride,Be=_e.offset;if(ie.isInstancedInterleavedBuffer){for(let Te=0;Te<F.locationSize;Te++)r(F.location+Te,ie.meshPerAttribute);f.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Te=0;Te<F.locationSize;Te++)l(F.location+Te);e.bindBuffer(e.ARRAY_BUFFER,Ze);for(let Te=0;Te<F.locationSize;Te++)x(F.location+Te,Le/F.locationSize,k,Se,Ee*J,(Be+Le/F.locationSize*Te)*J,ue)}else{if(_e.isInstancedBufferAttribute){for(let ie=0;ie<F.locationSize;ie++)r(F.location+ie,_e.meshPerAttribute);f.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let ie=0;ie<F.locationSize;ie++)l(F.location+ie);e.bindBuffer(e.ARRAY_BUFFER,Ze);for(let ie=0;ie<F.locationSize;ie++)x(F.location+ie,Le/F.locationSize,k,Se,Le*J,Le/F.locationSize*ie*J,ue)}}else if(W!==void 0){const Se=W[j];if(Se!==void 0)switch(Se.length){case 2:e.vertexAttrib2fv(F.location,Se);break;case 3:e.vertexAttrib3fv(F.location,Se);break;case 4:e.vertexAttrib4fv(F.location,Se);break;default:e.vertexAttrib1fv(F.location,Se)}}}}U()}function H(){B();for(const f in i){const R=i[f];for(const q in R){const V=R[q];for(const Y in V)w(V[Y].object),delete V[Y];delete R[q]}delete i[f]}}function P(f){if(i[f.id]===void 0)return;const R=i[f.id];for(const q in R){const V=R[q];for(const Y in V)w(V[Y].object),delete V[Y];delete R[q]}delete i[f.id]}function N(f){for(const R in i){const q=i[R];if(q[f.id]===void 0)continue;const V=q[f.id];for(const Y in V)w(V[Y].object),delete V[Y];delete q[f.id]}}function B(){p(),h=!0,o!==c&&(o=c,M(o.object))}function p(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:B,resetDefaultState:p,dispose:H,releaseStatesOfGeometry:P,releaseStatesOfProgram:N,initAttributes:L,enableAttribute:l,disableUnusedAttributes:U}}function Vc(e,n,t){let i;function c(M){i=M}function o(M,w){e.drawArrays(i,M,w),t.update(w,i,1)}function h(M,w,T){T!==0&&(e.drawArraysInstanced(i,M,w,T),t.update(w,i,T))}function u(M,w,T){if(T===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,M,0,w,0,T);let A=0;for(let O=0;O<T;O++)A+=w[O];t.update(A,i,1)}function C(M,w,T,E){if(T===0)return;const A=n.get("WEBGL_multi_draw");if(A===null)for(let O=0;O<M.length;O++)h(M[O],w[O],E[O]);else{A.multiDrawArraysInstancedWEBGL(i,M,0,w,0,E,0,T);let O=0;for(let L=0;L<T;L++)O+=w[L]*E[L];t.update(O,i,1)}}this.setMode=c,this.render=o,this.renderInstances=h,this.renderMultiDraw=u,this.renderMultiDrawInstances=C}function kc(e,n,t,i){let c;function o(){if(c!==void 0)return c;if(n.has("EXT_texture_filter_anisotropic")===!0){const N=n.get("EXT_texture_filter_anisotropic");c=e.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else c=0;return c}function h(N){return!(N!==Tt&&i.convert(N)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function u(N){const B=N===hn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(N!==Nt&&i.convert(N)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==wt&&!B)}function C(N){if(N==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let M=t.precision!==void 0?t.precision:"highp";const w=C(M);w!==M&&(console.warn("THREE.WebGLRenderer:",M,"not supported, using",w,"instead."),M=w);const T=t.logarithmicDepthBuffer===!0,E=t.reverseDepthBuffer===!0&&n.has("EXT_clip_control"),A=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),O=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),L=e.getParameter(e.MAX_TEXTURE_SIZE),l=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),r=e.getParameter(e.MAX_VERTEX_ATTRIBS),U=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),x=e.getParameter(e.MAX_VARYING_VECTORS),m=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),H=O>0,P=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:C,textureFormatReadable:h,textureTypeReadable:u,precision:M,logarithmicDepthBuffer:T,reverseDepthBuffer:E,maxTextures:A,maxVertexTextures:O,maxTextureSize:L,maxCubemapSize:l,maxAttributes:r,maxVertexUniforms:U,maxVaryings:x,maxFragmentUniforms:m,vertexTextures:H,maxSamples:P}}function Wc(e){const n=this;let t=null,i=0,c=!1,o=!1;const h=new Hr,u=new Fe,C={value:null,needsUpdate:!1};this.uniform=C,this.numPlanes=0,this.numIntersection=0,this.init=function(T,E){const A=T.length!==0||E||i!==0||c;return c=E,i=T.length,A},this.beginShadows=function(){o=!0,w(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(T,E){t=w(T,E,0)},this.setState=function(T,E,A){const O=T.clippingPlanes,L=T.clipIntersection,l=T.clipShadows,r=e.get(T);if(!c||O===null||O.length===0||o&&!l)o?w(null):M();else{const U=o?0:i,x=U*4;let m=r.clippingState||null;C.value=m,m=w(O,E,x,A);for(let H=0;H!==x;++H)m[H]=t[H];r.clippingState=m,this.numIntersection=L?this.numPlanes:0,this.numPlanes+=U}};function M(){C.value!==t&&(C.value=t,C.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function w(T,E,A,O){const L=T!==null?T.length:0;let l=null;if(L!==0){if(l=C.value,O!==!0||l===null){const r=A+L*4,U=E.matrixWorldInverse;u.getNormalMatrix(U),(l===null||l.length<r)&&(l=new Float32Array(r));for(let x=0,m=A;x!==L;++x,m+=4)h.copy(T[x]).applyMatrix4(U,u),h.normal.toArray(l,m),l[m+3]=h.constant}C.value=l,C.needsUpdate=!0}return n.numPlanes=L,n.numIntersection=0,l}}function zc(e){let n=new WeakMap;function t(h,u){return u===In?h.mapping=jt:u===Nn&&(h.mapping=Wt),h}function i(h){if(h&&h.isTexture){const u=h.mapping;if(u===In||u===Nn)if(n.has(h)){const C=n.get(h).texture;return t(C,h.mapping)}else{const C=h.image;if(C&&C.height>0){const M=new Ma(C.height);return M.fromEquirectangularTexture(e,h),n.set(h,M),h.addEventListener("dispose",c),t(M.texture,h.mapping)}else return null}}return h}function c(h){const u=h.target;u.removeEventListener("dispose",c);const C=n.get(u);C!==void 0&&(n.delete(u),C.dispose())}function o(){n=new WeakMap}return{get:i,dispose:o}}const Ht=4,Di=[.125,.215,.35,.446,.526,.582],Dt=20,bn=new ka,wi=new Ke;let Pn=null,Ln=0,Un=0,Dn=!1;const Ut=(1+Math.sqrt(5))/2,Ft=1/Ut,Ii=[new We(-Ut,Ft,0),new We(Ut,Ft,0),new We(-Ft,0,Ut),new We(Ft,0,Ut),new We(0,Ut,-Ft),new We(0,Ut,Ft),new We(-1,1,-1),new We(1,1,-1),new We(-1,1,1),new We(1,1,1)],Xc=new We;class Ni{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,c=100,o={}){const{size:h=256,position:u=Xc}=o;Pn=this._renderer.getRenderTarget(),Ln=this._renderer.getActiveCubeFace(),Un=this._renderer.getActiveMipmapLevel(),Dn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const C=this._allocateTargets();return C.depthBuffer=!0,this._sceneToCubeUV(n,i,c,C,u),t>0&&this._blur(C,0,0,t),this._applyPMREM(C),this._cleanup(C),C}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fi(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oi(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(Pn,Ln,Un),this._renderer.xr.enabled=Dn,n.scissorTest=!1,an(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===jt||n.mapping===Wt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),Pn=this._renderer.getRenderTarget(),Ln=this._renderer.getActiveCubeFace(),Un=this._renderer.getActiveMipmapLevel(),Dn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:hn,format:Tt,colorSpace:_n,depthBuffer:!1},c=yi(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yi(n,t,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yc(o)),this._blurMaterial=qc(o,n,t)}return c}_compileMaterial(n){const t=new xt(this._lodPlanes[0],n);this._renderer.compile(t,bn)}_sceneToCubeUV(n,t,i,c,o){const C=new sn(90,1,t,i),M=[1,-1,1,1,1,1],w=[1,1,1,-1,-1,-1],T=this._renderer,E=T.autoClear,A=T.toneMapping;T.getClearColor(wi),T.toneMapping=At,T.autoClear=!1;const O=new Fa({name:"PMREM.Background",side:_t,depthWrite:!1,depthTest:!1}),L=new xt(new dr,O);let l=!1;const r=n.background;r?r.isColor&&(O.color.copy(r),n.background=null,l=!0):(O.color.copy(wi),l=!0);for(let U=0;U<6;U++){const x=U%3;x===0?(C.up.set(0,M[U],0),C.position.set(o.x,o.y,o.z),C.lookAt(o.x+w[U],o.y,o.z)):x===1?(C.up.set(0,0,M[U]),C.position.set(o.x,o.y,o.z),C.lookAt(o.x,o.y+w[U],o.z)):(C.up.set(0,M[U],0),C.position.set(o.x,o.y,o.z),C.lookAt(o.x,o.y,o.z+w[U]));const m=this._cubeSize;an(c,x*m,U>2?m:0,m,m),T.setRenderTarget(c),l&&T.render(L,C),T.render(n,C)}L.geometry.dispose(),L.material.dispose(),T.toneMapping=A,T.autoClear=E,n.background=r}_textureToCubeUV(n,t){const i=this._renderer,c=n.mapping===jt||n.mapping===Wt;c?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fi()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oi());const o=c?this._cubemapMaterial:this._equirectMaterial,h=new xt(this._lodPlanes[0],o),u=o.uniforms;u.envMap.value=n;const C=this._cubeSize;an(t,0,0,3*C,2*C),i.setRenderTarget(t),i.render(h,bn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const c=this._lodPlanes.length;for(let o=1;o<c;o++){const h=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),u=Ii[(c-o-1)%Ii.length];this._blur(n,o-1,o,h,u)}t.autoClear=i}_blur(n,t,i,c,o){const h=this._pingPongRenderTarget;this._halfBlur(n,h,t,i,c,"latitudinal",o),this._halfBlur(h,n,i,i,c,"longitudinal",o)}_halfBlur(n,t,i,c,o,h,u){const C=this._renderer,M=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const w=3,T=new xt(this._lodPlanes[c],M),E=M.uniforms,A=this._sizeLods[i]-1,O=isFinite(o)?Math.PI/(2*A):2*Math.PI/(2*Dt-1),L=o/O,l=isFinite(o)?1+Math.floor(w*L):Dt;l>Dt&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${l} samples when the maximum is set to ${Dt}`);const r=[];let U=0;for(let N=0;N<Dt;++N){const B=N/L,p=Math.exp(-B*B/2);r.push(p),N===0?U+=p:N<l&&(U+=2*p)}for(let N=0;N<r.length;N++)r[N]=r[N]/U;E.envMap.value=n.texture,E.samples.value=l,E.weights.value=r,E.latitudinal.value=h==="latitudinal",u&&(E.poleAxis.value=u);const{_lodMax:x}=this;E.dTheta.value=O,E.mipInt.value=x-i;const m=this._sizeLods[c],H=3*m*(c>x-Ht?c-x+Ht:0),P=4*(this._cubeSize-m);an(t,H,P,3*m,2*m),C.setRenderTarget(t),C.render(T,bn)}}function Yc(e){const n=[],t=[],i=[];let c=e;const o=e-Ht+1+Di.length;for(let h=0;h<o;h++){const u=Math.pow(2,c);t.push(u);let C=1/u;h>e-Ht?C=Di[h-e+Ht-1]:h===0&&(C=0),i.push(C);const M=1/(u-2),w=-M,T=1+M,E=[w,w,T,w,T,T,w,w,T,T,w,T],A=6,O=6,L=3,l=2,r=1,U=new Float32Array(L*O*A),x=new Float32Array(l*O*A),m=new Float32Array(r*O*A);for(let P=0;P<A;P++){const N=P%3*2/3-1,B=P>2?0:-1,p=[N,B,0,N+2/3,B,0,N+2/3,B+1,0,N,B,0,N+2/3,B+1,0,N,B+1,0];U.set(p,L*O*P),x.set(E,l*O*P);const f=[P,P,P,P,P,P];m.set(f,r*O*P)}const H=new ir;H.setAttribute("position",new cn(U,L)),H.setAttribute("uv",new cn(x,l)),H.setAttribute("faceIndex",new cn(m,r)),n.push(H),c>Ht&&c--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function yi(e,n,t){const i=new kt(e,n,t);return i.texture.mapping=mn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function an(e,n,t,i,c){e.viewport.set(n,t,i,c),e.scissor.set(n,t,i,c)}function qc(e,n,t){const i=new Float32Array(Dt),c=new We(0,1,0);return new yt({name:"SphericalGaussianBlur",defines:{n:Dt,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:c}},vertexShader:zn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:It,depthTest:!1,depthWrite:!1})}function Oi(){return new yt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:It,depthTest:!1,depthWrite:!1})}function Fi(){return new yt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:It,depthTest:!1,depthWrite:!1})}function zn(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Kc(e){let n=new WeakMap,t=null;function i(u){if(u&&u.isTexture){const C=u.mapping,M=C===In||C===Nn,w=C===jt||C===Wt;if(M||w){let T=n.get(u);const E=T!==void 0?T.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==E)return t===null&&(t=new Ni(e)),T=M?t.fromEquirectangular(u,T):t.fromCubemap(u,T),T.texture.pmremVersion=u.pmremVersion,n.set(u,T),T.texture;if(T!==void 0)return T.texture;{const A=u.image;return M&&A&&A.height>0||w&&A&&c(A)?(t===null&&(t=new Ni(e)),T=M?t.fromEquirectangular(u):t.fromCubemap(u),T.texture.pmremVersion=u.pmremVersion,n.set(u,T),u.addEventListener("dispose",o),T.texture):null}}}return u}function c(u){let C=0;const M=6;for(let w=0;w<M;w++)u[w]!==void 0&&C++;return C===M}function o(u){const C=u.target;C.removeEventListener("dispose",o);const M=n.get(C);M!==void 0&&(n.delete(C),M.dispose())}function h(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:h}}function $c(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let c;switch(i){case"WEBGL_depth_texture":c=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":c=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":c=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":c=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:c=e.getExtension(i)}return n[i]=c,c}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const c=t(i);return c===null&&Lt("THREE.WebGLRenderer: "+i+" extension not supported."),c}}}function Zc(e,n,t,i){const c={},o=new WeakMap;function h(T){const E=T.target;E.index!==null&&n.remove(E.index);for(const O in E.attributes)n.remove(E.attributes[O]);E.removeEventListener("dispose",h),delete c[E.id];const A=o.get(E);A&&(n.remove(A),o.delete(E)),i.releaseStatesOfGeometry(E),E.isInstancedBufferGeometry===!0&&delete E._maxInstanceCount,t.memory.geometries--}function u(T,E){return c[E.id]===!0||(E.addEventListener("dispose",h),c[E.id]=!0,t.memory.geometries++),E}function C(T){const E=T.attributes;for(const A in E)n.update(E[A],e.ARRAY_BUFFER)}function M(T){const E=[],A=T.index,O=T.attributes.position;let L=0;if(A!==null){const U=A.array;L=A.version;for(let x=0,m=U.length;x<m;x+=3){const H=U[x+0],P=U[x+1],N=U[x+2];E.push(H,P,P,N,N,H)}}else if(O!==void 0){const U=O.array;L=O.version;for(let x=0,m=U.length/3-1;x<m;x+=3){const H=x+0,P=x+1,N=x+2;E.push(H,P,P,N,N,H)}}else return;const l=new(Ba(E)?Ga:Ha)(E,1);l.version=L;const r=o.get(T);r&&n.remove(r),o.set(T,l)}function w(T){const E=o.get(T);if(E){const A=T.index;A!==null&&E.version<A.version&&M(T)}else M(T);return o.get(T)}return{get:u,update:C,getWireframeAttribute:w}}function Qc(e,n,t){let i;function c(E){i=E}let o,h;function u(E){o=E.type,h=E.bytesPerElement}function C(E,A){e.drawElements(i,A,o,E*h),t.update(A,i,1)}function M(E,A,O){O!==0&&(e.drawElementsInstanced(i,A,o,E*h,O),t.update(A,i,O))}function w(E,A,O){if(O===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,A,0,o,E,0,O);let l=0;for(let r=0;r<O;r++)l+=A[r];t.update(l,i,1)}function T(E,A,O,L){if(O===0)return;const l=n.get("WEBGL_multi_draw");if(l===null)for(let r=0;r<E.length;r++)M(E[r]/h,A[r],L[r]);else{l.multiDrawElementsInstancedWEBGL(i,A,0,o,E,0,L,0,O);let r=0;for(let U=0;U<O;U++)r+=A[U]*L[U];t.update(r,i,1)}}this.setMode=c,this.setIndex=u,this.render=C,this.renderInstances=M,this.renderMultiDraw=w,this.renderMultiDrawInstances=T}function Jc(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,h,u){switch(t.calls++,h){case e.TRIANGLES:t.triangles+=u*(o/3);break;case e.LINES:t.lines+=u*(o/2);break;case e.LINE_STRIP:t.lines+=u*(o-1);break;case e.LINE_LOOP:t.lines+=u*o;break;case e.POINTS:t.points+=u*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function c(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:c,update:i}}function jc(e,n,t){const i=new WeakMap,c=new lt;function o(h,u,C){const M=h.morphTargetInfluences,w=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,T=w!==void 0?w.length:0;let E=i.get(u);if(E===void 0||E.count!==T){let p=function(){N.dispose(),i.delete(u),u.removeEventListener("dispose",p)};E!==void 0&&E.texture.dispose();const A=u.morphAttributes.position!==void 0,O=u.morphAttributes.normal!==void 0,L=u.morphAttributes.color!==void 0,l=u.morphAttributes.position||[],r=u.morphAttributes.normal||[],U=u.morphAttributes.color||[];let x=0;A===!0&&(x=1),O===!0&&(x=2),L===!0&&(x=3);let m=u.attributes.position.count*x,H=1;m>n.maxTextureSize&&(H=Math.ceil(m/n.maxTextureSize),m=n.maxTextureSize);const P=new Float32Array(m*H*4*T),N=new _r(P,m,H,T);N.type=wt,N.needsUpdate=!0;const B=x*4;for(let f=0;f<T;f++){const R=l[f],q=r[f],V=U[f],Y=m*H*4*f;for(let Q=0;Q<R.count;Q++){const W=Q*B;A===!0&&(c.fromBufferAttribute(R,Q),P[Y+W+0]=c.x,P[Y+W+1]=c.y,P[Y+W+2]=c.z,P[Y+W+3]=0),O===!0&&(c.fromBufferAttribute(q,Q),P[Y+W+4]=c.x,P[Y+W+5]=c.y,P[Y+W+6]=c.z,P[Y+W+7]=0),L===!0&&(c.fromBufferAttribute(V,Q),P[Y+W+8]=c.x,P[Y+W+9]=c.y,P[Y+W+10]=c.z,P[Y+W+11]=V.itemSize===4?c.w:1)}}E={count:T,texture:N,size:new ft(m,H)},i.set(u,E),u.addEventListener("dispose",p)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)C.getUniforms().setValue(e,"morphTexture",h.morphTexture,t);else{let A=0;for(let L=0;L<M.length;L++)A+=M[L];const O=u.morphTargetsRelative?1:1-A;C.getUniforms().setValue(e,"morphTargetBaseInfluence",O),C.getUniforms().setValue(e,"morphTargetInfluences",M)}C.getUniforms().setValue(e,"morphTargetsTexture",E.texture,t),C.getUniforms().setValue(e,"morphTargetsTextureSize",E.size)}return{update:o}}function el(e,n,t,i){let c=new WeakMap;function o(C){const M=i.render.frame,w=C.geometry,T=n.get(C,w);if(c.get(T)!==M&&(n.update(T),c.set(T,M)),C.isInstancedMesh&&(C.hasEventListener("dispose",u)===!1&&C.addEventListener("dispose",u),c.get(C)!==M&&(t.update(C.instanceMatrix,e.ARRAY_BUFFER),C.instanceColor!==null&&t.update(C.instanceColor,e.ARRAY_BUFFER),c.set(C,M))),C.isSkinnedMesh){const E=C.skeleton;c.get(E)!==M&&(E.update(),c.set(E,M))}return T}function h(){c=new WeakMap}function u(C){const M=C.target;M.removeEventListener("dispose",u),t.remove(M.instanceMatrix),M.instanceColor!==null&&t.remove(M.instanceColor)}return{update:o,dispose:h}}const Sr=new mr,Bi=new nr(1,1),Mr=new _r,Tr=new Ja,xr=new ja,Gi=[],Hi=[],Vi=new Float32Array(16),ki=new Float32Array(9),Wi=new Float32Array(4);function zt(e,n,t){const i=e[0];if(i<=0||i>0)return e;const c=n*t;let o=Gi[c];if(o===void 0&&(o=new Float32Array(c),Gi[c]=o),n!==0){i.toArray(o,0);for(let h=1,u=0;h!==n;++h)u+=t,e[h].toArray(o,u)}return o}function nt(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function it(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function vn(e,n){let t=Hi[n];t===void 0&&(t=new Int32Array(n),Hi[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function tl(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function nl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(nt(t,n))return;e.uniform2fv(this.addr,n),it(t,n)}}function il(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(nt(t,n))return;e.uniform3fv(this.addr,n),it(t,n)}}function rl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(nt(t,n))return;e.uniform4fv(this.addr,n),it(t,n)}}function al(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(nt(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),it(t,n)}else{if(nt(t,i))return;Wi.set(i),e.uniformMatrix2fv(this.addr,!1,Wi),it(t,i)}}function ol(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(nt(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),it(t,n)}else{if(nt(t,i))return;ki.set(i),e.uniformMatrix3fv(this.addr,!1,ki),it(t,i)}}function sl(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(nt(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),it(t,n)}else{if(nt(t,i))return;Vi.set(i),e.uniformMatrix4fv(this.addr,!1,Vi),it(t,i)}}function cl(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function ll(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(nt(t,n))return;e.uniform2iv(this.addr,n),it(t,n)}}function fl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(nt(t,n))return;e.uniform3iv(this.addr,n),it(t,n)}}function dl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(nt(t,n))return;e.uniform4iv(this.addr,n),it(t,n)}}function ul(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function pl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(nt(t,n))return;e.uniform2uiv(this.addr,n),it(t,n)}}function hl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(nt(t,n))return;e.uniform3uiv(this.addr,n),it(t,n)}}function _l(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(nt(t,n))return;e.uniform4uiv(this.addr,n),it(t,n)}}function ml(e,n,t){const i=this.cache,c=t.allocateTextureUnit();i[0]!==c&&(e.uniform1i(this.addr,c),i[0]=c);let o;this.type===e.SAMPLER_2D_SHADOW?(Bi.compareFunction=ar,o=Bi):o=Sr,t.setTexture2D(n||o,c)}function vl(e,n,t){const i=this.cache,c=t.allocateTextureUnit();i[0]!==c&&(e.uniform1i(this.addr,c),i[0]=c),t.setTexture3D(n||Tr,c)}function gl(e,n,t){const i=this.cache,c=t.allocateTextureUnit();i[0]!==c&&(e.uniform1i(this.addr,c),i[0]=c),t.setTextureCube(n||xr,c)}function El(e,n,t){const i=this.cache,c=t.allocateTextureUnit();i[0]!==c&&(e.uniform1i(this.addr,c),i[0]=c),t.setTexture2DArray(n||Mr,c)}function Sl(e){switch(e){case 5126:return tl;case 35664:return nl;case 35665:return il;case 35666:return rl;case 35674:return al;case 35675:return ol;case 35676:return sl;case 5124:case 35670:return cl;case 35667:case 35671:return ll;case 35668:case 35672:return fl;case 35669:case 35673:return dl;case 5125:return ul;case 36294:return pl;case 36295:return hl;case 36296:return _l;case 35678:case 36198:case 36298:case 36306:case 35682:return ml;case 35679:case 36299:case 36307:return vl;case 35680:case 36300:case 36308:case 36293:return gl;case 36289:case 36303:case 36311:case 36292:return El}}function Ml(e,n){e.uniform1fv(this.addr,n)}function Tl(e,n){const t=zt(n,this.size,2);e.uniform2fv(this.addr,t)}function xl(e,n){const t=zt(n,this.size,3);e.uniform3fv(this.addr,t)}function Al(e,n){const t=zt(n,this.size,4);e.uniform4fv(this.addr,t)}function Rl(e,n){const t=zt(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Cl(e,n){const t=zt(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function bl(e,n){const t=zt(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function Pl(e,n){e.uniform1iv(this.addr,n)}function Ll(e,n){e.uniform2iv(this.addr,n)}function Ul(e,n){e.uniform3iv(this.addr,n)}function Dl(e,n){e.uniform4iv(this.addr,n)}function wl(e,n){e.uniform1uiv(this.addr,n)}function Il(e,n){e.uniform2uiv(this.addr,n)}function Nl(e,n){e.uniform3uiv(this.addr,n)}function yl(e,n){e.uniform4uiv(this.addr,n)}function Ol(e,n,t){const i=this.cache,c=n.length,o=vn(t,c);nt(i,o)||(e.uniform1iv(this.addr,o),it(i,o));for(let h=0;h!==c;++h)t.setTexture2D(n[h]||Sr,o[h])}function Fl(e,n,t){const i=this.cache,c=n.length,o=vn(t,c);nt(i,o)||(e.uniform1iv(this.addr,o),it(i,o));for(let h=0;h!==c;++h)t.setTexture3D(n[h]||Tr,o[h])}function Bl(e,n,t){const i=this.cache,c=n.length,o=vn(t,c);nt(i,o)||(e.uniform1iv(this.addr,o),it(i,o));for(let h=0;h!==c;++h)t.setTextureCube(n[h]||xr,o[h])}function Gl(e,n,t){const i=this.cache,c=n.length,o=vn(t,c);nt(i,o)||(e.uniform1iv(this.addr,o),it(i,o));for(let h=0;h!==c;++h)t.setTexture2DArray(n[h]||Mr,o[h])}function Hl(e){switch(e){case 5126:return Ml;case 35664:return Tl;case 35665:return xl;case 35666:return Al;case 35674:return Rl;case 35675:return Cl;case 35676:return bl;case 5124:case 35670:return Pl;case 35667:case 35671:return Ll;case 35668:case 35672:return Ul;case 35669:case 35673:return Dl;case 5125:return wl;case 36294:return Il;case 36295:return Nl;case 36296:return yl;case 35678:case 36198:case 36298:case 36306:case 35682:return Ol;case 35679:case 36299:case 36307:return Fl;case 35680:case 36300:case 36308:case 36293:return Bl;case 36289:case 36303:case 36311:case 36292:return Gl}}class Vl{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Sl(t.type)}}class kl{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Hl(t.type)}}class Wl{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const c=this.seq;for(let o=0,h=c.length;o!==h;++o){const u=c[o];u.setValue(n,t[u.id],i)}}}const wn=/(\w+)(\])?(\[|\.)?/g;function zi(e,n){e.seq.push(n),e.map[n.id]=n}function zl(e,n,t){const i=e.name,c=i.length;for(wn.lastIndex=0;;){const o=wn.exec(i),h=wn.lastIndex;let u=o[1];const C=o[2]==="]",M=o[3];if(C&&(u=u|0),M===void 0||M==="["&&h+2===c){zi(t,M===void 0?new Vl(u,e,n):new kl(u,e,n));break}else{let T=t.map[u];T===void 0&&(T=new Wl(u),zi(t,T)),t=T}}}class fn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let c=0;c<i;++c){const o=n.getActiveUniform(t,c),h=n.getUniformLocation(t,o.name);zl(o,h,this)}}setValue(n,t,i,c){const o=this.map[t];o!==void 0&&o.setValue(n,i,c)}setOptional(n,t,i){const c=t[i];c!==void 0&&this.setValue(n,i,c)}static upload(n,t,i,c){for(let o=0,h=t.length;o!==h;++o){const u=t[o],C=i[u.id];C.needsUpdate!==!1&&u.setValue(n,C.value,c)}}static seqWithValue(n,t){const i=[];for(let c=0,o=n.length;c!==o;++c){const h=n[c];h.id in t&&i.push(h)}return i}}function Xi(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const Xl=37297;let Yl=0;function ql(e,n){const t=e.split(`
`),i=[],c=Math.max(n-6,0),o=Math.min(n+6,t.length);for(let h=c;h<o;h++){const u=h+1;i.push(`${u===n?">":" "} ${u}: ${t[h]}`)}return i.join(`
`)}const Yi=new Fe;function Kl(e){tt._getMatrix(Yi,tt.workingColorSpace,e);const n=`mat3( ${Yi.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(e)){case gr:return[n,"LinearTransferOETF"];case Ye:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function qi(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),c=e.getShaderInfoLog(n).trim();if(i&&c==="")return"";const o=/ERROR: 0:(\d+)/.exec(c);if(o){const h=parseInt(o[1]);return t.toUpperCase()+`

`+c+`

`+ql(e.getShaderSource(n),h)}else return c}function $l(e,n){const t=Kl(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Zl(e,n){let t;switch(n){case $a:t="Linear";break;case Ka:t="Reinhard";break;case qa:t="Cineon";break;case Ya:t="ACESFilmic";break;case Xa:t="AgX";break;case za:t="Neutral";break;case Wa:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const on=new We;function Ql(){tt.getLuminanceCoefficients(on);const e=on.x.toFixed(4),n=on.y.toFixed(4),t=on.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jl(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Kt).join(`
`)}function jl(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function ef(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let c=0;c<i;c++){const o=e.getActiveAttrib(n,c),h=o.name;let u=1;o.type===e.FLOAT_MAT2&&(u=2),o.type===e.FLOAT_MAT3&&(u=3),o.type===e.FLOAT_MAT4&&(u=4),t[h]={type:o.type,location:e.getAttribLocation(n,h),locationSize:u}}return t}function Kt(e){return e!==""}function Ki(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function $i(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const tf=/^[ \t]*#include +<([\w\d./]+)>/gm;function kn(e){return e.replace(tf,rf)}const nf=new Map;function rf(e,n){let t=Pe[n];if(t===void 0){const i=nf.get(n);if(i!==void 0)t=Pe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return kn(t)}const af=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zi(e){return e.replace(af,of)}function of(e,n,t,i){let c="";for(let o=parseInt(n);o<parseInt(t);o++)c+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return c}function Qi(e){let n=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?n+=`
#define HIGH_PRECISION`:e.precision==="mediump"?n+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(n+=`
#define LOW_PRECISION`),n}function sf(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===rr?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===Za?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===St&&(n="SHADOWMAP_TYPE_VSM"),n}function cf(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case jt:case Wt:n="ENVMAP_TYPE_CUBE";break;case mn:n="ENVMAP_TYPE_CUBE_UV";break}return n}function lf(e){let n="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case Wt:n="ENVMAP_MODE_REFRACTION";break}return n}function ff(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case no:n="ENVMAP_BLENDING_MULTIPLY";break;case to:n="ENVMAP_BLENDING_MIX";break;case eo:n="ENVMAP_BLENDING_ADD";break}return n}function df(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function uf(e,n,t,i){const c=e.getContext(),o=t.defines;let h=t.vertexShader,u=t.fragmentShader;const C=sf(t),M=cf(t),w=lf(t),T=ff(t),E=df(t),A=Jl(t),O=jl(o),L=c.createProgram();let l,r,U=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(l=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,O].filter(Kt).join(`
`),l.length>0&&(l+=`
`),r=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,O].filter(Kt).join(`
`),r.length>0&&(r+=`
`)):(l=[Qi(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,O,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+w:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+C:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Kt).join(`
`),r=[Qi(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,O,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+M:"",t.envMap?"#define "+w:"",t.envMap?"#define "+T:"",E?"#define CUBEUV_TEXEL_WIDTH "+E.texelWidth:"",E?"#define CUBEUV_TEXEL_HEIGHT "+E.texelHeight:"",E?"#define CUBEUV_MAX_MIP "+E.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+C:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==At?"#define TONE_MAPPING":"",t.toneMapping!==At?Pe.tonemapping_pars_fragment:"",t.toneMapping!==At?Zl("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Pe.colorspace_pars_fragment,$l("linearToOutputTexel",t.outputColorSpace),Ql(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Kt).join(`
`)),h=kn(h),h=Ki(h,t),h=$i(h,t),u=kn(u),u=Ki(u,t),u=$i(u,t),h=Zi(h),u=Zi(u),t.isRawShaderMaterial!==!0&&(U=`#version 300 es
`,l=[A,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+l,r=["#define varying in",t.glslVersion===Ui?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ui?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+r);const x=U+l+h,m=U+r+u,H=Xi(c,c.VERTEX_SHADER,x),P=Xi(c,c.FRAGMENT_SHADER,m);c.attachShader(L,H),c.attachShader(L,P),t.index0AttributeName!==void 0?c.bindAttribLocation(L,0,t.index0AttributeName):t.morphTargets===!0&&c.bindAttribLocation(L,0,"position"),c.linkProgram(L);function N(R){if(e.debug.checkShaderErrors){const q=c.getProgramInfoLog(L).trim(),V=c.getShaderInfoLog(H).trim(),Y=c.getShaderInfoLog(P).trim();let Q=!0,W=!0;if(c.getProgramParameter(L,c.LINK_STATUS)===!1)if(Q=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(c,L,H,P);else{const j=qi(c,H,"vertex"),F=qi(c,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+c.getError()+" - VALIDATE_STATUS "+c.getProgramParameter(L,c.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+q+`
`+j+`
`+F)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(V===""||Y==="")&&(W=!1);W&&(R.diagnostics={runnable:Q,programLog:q,vertexShader:{log:V,prefix:l},fragmentShader:{log:Y,prefix:r}})}c.deleteShader(H),c.deleteShader(P),B=new fn(c,L),p=ef(c,L)}let B;this.getUniforms=function(){return B===void 0&&N(this),B};let p;this.getAttributes=function(){return p===void 0&&N(this),p};let f=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return f===!1&&(f=c.getProgramParameter(L,Xl)),f},this.destroy=function(){i.releaseStatesOfProgram(this),c.deleteProgram(L),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Yl++,this.cacheKey=n,this.usedTimes=1,this.program=L,this.vertexShader=H,this.fragmentShader=P,this}let pf=0;class hf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,c=this._getShaderStage(t),o=this._getShaderStage(i),h=this._getShaderCacheForMaterial(n);return h.has(c)===!1&&(h.add(c),c.usedTimes++),h.has(o)===!1&&(h.add(o),o.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new _f(n),t.set(n,i)),i}}class _f{constructor(n){this.id=pf++,this.code=n,this.usedTimes=0}}function mf(e,n,t,i,c,o,h){const u=new Va,C=new hf,M=new Set,w=[],T=c.logarithmicDepthBuffer,E=c.vertexTextures;let A=c.precision;const O={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function L(p){return M.add(p),p===0?"uv":`uv${p}`}function l(p,f,R,q,V){const Y=q.fog,Q=V.geometry,W=p.isMeshStandardMaterial?q.environment:null,j=(p.isMeshStandardMaterial?t:n).get(p.envMap||W),F=j&&j.mapping===mn?j.image.height:null,_e=O[p.type];p.precision!==null&&(A=c.getMaxPrecision(p.precision),A!==p.precision&&console.warn("THREE.WebGLProgram.getParameters:",p.precision,"not supported, using",A,"instead."));const Se=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Le=Se!==void 0?Se.length:0;let Ge=0;Q.morphAttributes.position!==void 0&&(Ge=1),Q.morphAttributes.normal!==void 0&&(Ge=2),Q.morphAttributes.color!==void 0&&(Ge=3);let Ze,k,J,ue;if(_e){const ke=gt[_e];Ze=ke.vertexShader,k=ke.fragmentShader}else Ze=p.vertexShader,k=p.fragmentShader,C.update(p),J=C.getVertexShaderID(p),ue=C.getFragmentShaderID(p);const ie=e.getRenderTarget(),Ee=e.state.buffers.depth.getReversed(),Be=V.isInstancedMesh===!0,Te=V.isBatchedMesh===!0,je=!!p.map,$e=!!p.matcap,Ue=!!j,_=!!p.aoMap,ut=!!p.lightMap,De=!!p.bumpMap,we=!!p.normalMap,me=!!p.displacementMap,Xe=!!p.emissiveMap,he=!!p.metalnessMap,d=!!p.roughnessMap,a=p.anisotropy>0,b=p.clearcoat>0,z=p.dispersion>0,K=p.iridescence>0,G=p.sheen>0,pe=p.transmission>0,re=a&&!!p.anisotropyMap,ce=b&&!!p.clearcoatMap,Ne=b&&!!p.clearcoatNormalMap,Z=b&&!!p.clearcoatRoughnessMap,le=K&&!!p.iridescenceMap,Me=K&&!!p.iridescenceThicknessMap,xe=G&&!!p.sheenColorMap,fe=G&&!!p.sheenRoughnessMap,Ie=!!p.specularMap,be=!!p.specularColorMap,ze=!!p.specularIntensityMap,v=pe&&!!p.transmissionMap,te=pe&&!!p.thicknessMap,y=!!p.gradientMap,X=!!p.alphaMap,oe=p.alphaTest>0,ae=!!p.alphaHash,Ce=!!p.extensions;let Qe=At;p.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Qe=e.toneMapping);const at={shaderID:_e,shaderType:p.type,shaderName:p.name,vertexShader:Ze,fragmentShader:k,defines:p.defines,customVertexShaderID:J,customFragmentShaderID:ue,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:A,batching:Te,batchingColor:Te&&V._colorsTexture!==null,instancing:Be,instancingColor:Be&&V.instanceColor!==null,instancingMorph:Be&&V.morphTexture!==null,supportsVertexTextures:E,outputColorSpace:ie===null?e.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:_n,alphaToCoverage:!!p.alphaToCoverage,map:je,matcap:$e,envMap:Ue,envMapMode:Ue&&j.mapping,envMapCubeUVHeight:F,aoMap:_,lightMap:ut,bumpMap:De,normalMap:we,displacementMap:E&&me,emissiveMap:Xe,normalMapObjectSpace:we&&p.normalMapType===Ta,normalMapTangentSpace:we&&p.normalMapType===xa,metalnessMap:he,roughnessMap:d,anisotropy:a,anisotropyMap:re,clearcoat:b,clearcoatMap:ce,clearcoatNormalMap:Ne,clearcoatRoughnessMap:Z,dispersion:z,iridescence:K,iridescenceMap:le,iridescenceThicknessMap:Me,sheen:G,sheenColorMap:xe,sheenRoughnessMap:fe,specularMap:Ie,specularColorMap:be,specularIntensityMap:ze,transmission:pe,transmissionMap:v,thicknessMap:te,gradientMap:y,opaque:p.transparent===!1&&p.blending===ln&&p.alphaToCoverage===!1,alphaMap:X,alphaTest:oe,alphaHash:ae,combine:p.combine,mapUv:je&&L(p.map.channel),aoMapUv:_&&L(p.aoMap.channel),lightMapUv:ut&&L(p.lightMap.channel),bumpMapUv:De&&L(p.bumpMap.channel),normalMapUv:we&&L(p.normalMap.channel),displacementMapUv:me&&L(p.displacementMap.channel),emissiveMapUv:Xe&&L(p.emissiveMap.channel),metalnessMapUv:he&&L(p.metalnessMap.channel),roughnessMapUv:d&&L(p.roughnessMap.channel),anisotropyMapUv:re&&L(p.anisotropyMap.channel),clearcoatMapUv:ce&&L(p.clearcoatMap.channel),clearcoatNormalMapUv:Ne&&L(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&L(p.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&L(p.iridescenceMap.channel),iridescenceThicknessMapUv:Me&&L(p.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&L(p.sheenColorMap.channel),sheenRoughnessMapUv:fe&&L(p.sheenRoughnessMap.channel),specularMapUv:Ie&&L(p.specularMap.channel),specularColorMapUv:be&&L(p.specularColorMap.channel),specularIntensityMapUv:ze&&L(p.specularIntensityMap.channel),transmissionMapUv:v&&L(p.transmissionMap.channel),thicknessMapUv:te&&L(p.thicknessMap.channel),alphaMapUv:X&&L(p.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(we||a),vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Q.attributes.uv&&(je||X),fog:!!Y,useFog:p.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:p.flatShading===!0,sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:T,reverseDepthBuffer:Ee,skinning:V.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Le,morphTextureStride:Ge,numDirLights:f.directional.length,numPointLights:f.point.length,numSpotLights:f.spot.length,numSpotLightMaps:f.spotLightMap.length,numRectAreaLights:f.rectArea.length,numHemiLights:f.hemi.length,numDirLightShadows:f.directionalShadowMap.length,numPointLightShadows:f.pointShadowMap.length,numSpotLightShadows:f.spotShadowMap.length,numSpotLightShadowsWithMaps:f.numSpotLightShadowsWithMaps,numLightProbes:f.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:p.dithering,shadowMapEnabled:e.shadowMap.enabled&&R.length>0,shadowMapType:e.shadowMap.type,toneMapping:Qe,decodeVideoTexture:je&&p.map.isVideoTexture===!0&&tt.getTransfer(p.map.colorSpace)===Ye,decodeVideoTextureEmissive:Xe&&p.emissiveMap.isVideoTexture===!0&&tt.getTransfer(p.emissiveMap.colorSpace)===Ye,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===Mt,flipSided:p.side===_t,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:Ce&&p.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ce&&p.extensions.multiDraw===!0||Te)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return at.vertexUv1s=M.has(1),at.vertexUv2s=M.has(2),at.vertexUv3s=M.has(3),M.clear(),at}function r(p){const f=[];if(p.shaderID?f.push(p.shaderID):(f.push(p.customVertexShaderID),f.push(p.customFragmentShaderID)),p.defines!==void 0)for(const R in p.defines)f.push(R),f.push(p.defines[R]);return p.isRawShaderMaterial===!1&&(U(f,p),x(f,p),f.push(e.outputColorSpace)),f.push(p.customProgramCacheKey),f.join()}function U(p,f){p.push(f.precision),p.push(f.outputColorSpace),p.push(f.envMapMode),p.push(f.envMapCubeUVHeight),p.push(f.mapUv),p.push(f.alphaMapUv),p.push(f.lightMapUv),p.push(f.aoMapUv),p.push(f.bumpMapUv),p.push(f.normalMapUv),p.push(f.displacementMapUv),p.push(f.emissiveMapUv),p.push(f.metalnessMapUv),p.push(f.roughnessMapUv),p.push(f.anisotropyMapUv),p.push(f.clearcoatMapUv),p.push(f.clearcoatNormalMapUv),p.push(f.clearcoatRoughnessMapUv),p.push(f.iridescenceMapUv),p.push(f.iridescenceThicknessMapUv),p.push(f.sheenColorMapUv),p.push(f.sheenRoughnessMapUv),p.push(f.specularMapUv),p.push(f.specularColorMapUv),p.push(f.specularIntensityMapUv),p.push(f.transmissionMapUv),p.push(f.thicknessMapUv),p.push(f.combine),p.push(f.fogExp2),p.push(f.sizeAttenuation),p.push(f.morphTargetsCount),p.push(f.morphAttributeCount),p.push(f.numDirLights),p.push(f.numPointLights),p.push(f.numSpotLights),p.push(f.numSpotLightMaps),p.push(f.numHemiLights),p.push(f.numRectAreaLights),p.push(f.numDirLightShadows),p.push(f.numPointLightShadows),p.push(f.numSpotLightShadows),p.push(f.numSpotLightShadowsWithMaps),p.push(f.numLightProbes),p.push(f.shadowMapType),p.push(f.toneMapping),p.push(f.numClippingPlanes),p.push(f.numClipIntersection),p.push(f.depthPacking)}function x(p,f){u.disableAll(),f.supportsVertexTextures&&u.enable(0),f.instancing&&u.enable(1),f.instancingColor&&u.enable(2),f.instancingMorph&&u.enable(3),f.matcap&&u.enable(4),f.envMap&&u.enable(5),f.normalMapObjectSpace&&u.enable(6),f.normalMapTangentSpace&&u.enable(7),f.clearcoat&&u.enable(8),f.iridescence&&u.enable(9),f.alphaTest&&u.enable(10),f.vertexColors&&u.enable(11),f.vertexAlphas&&u.enable(12),f.vertexUv1s&&u.enable(13),f.vertexUv2s&&u.enable(14),f.vertexUv3s&&u.enable(15),f.vertexTangents&&u.enable(16),f.anisotropy&&u.enable(17),f.alphaHash&&u.enable(18),f.batching&&u.enable(19),f.dispersion&&u.enable(20),f.batchingColor&&u.enable(21),p.push(u.mask),u.disableAll(),f.fog&&u.enable(0),f.useFog&&u.enable(1),f.flatShading&&u.enable(2),f.logarithmicDepthBuffer&&u.enable(3),f.reverseDepthBuffer&&u.enable(4),f.skinning&&u.enable(5),f.morphTargets&&u.enable(6),f.morphNormals&&u.enable(7),f.morphColors&&u.enable(8),f.premultipliedAlpha&&u.enable(9),f.shadowMapEnabled&&u.enable(10),f.doubleSided&&u.enable(11),f.flipSided&&u.enable(12),f.useDepthPacking&&u.enable(13),f.dithering&&u.enable(14),f.transmission&&u.enable(15),f.sheen&&u.enable(16),f.opaque&&u.enable(17),f.pointsUvs&&u.enable(18),f.decodeVideoTexture&&u.enable(19),f.decodeVideoTextureEmissive&&u.enable(20),f.alphaToCoverage&&u.enable(21),p.push(u.mask)}function m(p){const f=O[p.type];let R;if(f){const q=gt[f];R=Aa.clone(q.uniforms)}else R=p.uniforms;return R}function H(p,f){let R;for(let q=0,V=w.length;q<V;q++){const Y=w[q];if(Y.cacheKey===f){R=Y,++R.usedTimes;break}}return R===void 0&&(R=new uf(e,f,p,o),w.push(R)),R}function P(p){if(--p.usedTimes===0){const f=w.indexOf(p);w[f]=w[w.length-1],w.pop(),p.destroy()}}function N(p){C.remove(p)}function B(){C.dispose()}return{getParameters:l,getProgramCacheKey:r,getUniforms:m,acquireProgram:H,releaseProgram:P,releaseShaderCache:N,programs:w,dispose:B}}function vf(){let e=new WeakMap;function n(h){return e.has(h)}function t(h){let u=e.get(h);return u===void 0&&(u={},e.set(h,u)),u}function i(h){e.delete(h)}function c(h,u,C){e.get(h)[u]=C}function o(){e=new WeakMap}return{has:n,get:t,remove:i,update:c,dispose:o}}function gf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function Ji(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function ji(){const e=[];let n=0;const t=[],i=[],c=[];function o(){n=0,t.length=0,i.length=0,c.length=0}function h(T,E,A,O,L,l){let r=e[n];return r===void 0?(r={id:T.id,object:T,geometry:E,material:A,groupOrder:O,renderOrder:T.renderOrder,z:L,group:l},e[n]=r):(r.id=T.id,r.object=T,r.geometry=E,r.material=A,r.groupOrder=O,r.renderOrder=T.renderOrder,r.z=L,r.group=l),n++,r}function u(T,E,A,O,L,l){const r=h(T,E,A,O,L,l);A.transmission>0?i.push(r):A.transparent===!0?c.push(r):t.push(r)}function C(T,E,A,O,L,l){const r=h(T,E,A,O,L,l);A.transmission>0?i.unshift(r):A.transparent===!0?c.unshift(r):t.unshift(r)}function M(T,E){t.length>1&&t.sort(T||gf),i.length>1&&i.sort(E||Ji),c.length>1&&c.sort(E||Ji)}function w(){for(let T=n,E=e.length;T<E;T++){const A=e[T];if(A.id===null)break;A.id=null,A.object=null,A.geometry=null,A.material=null,A.group=null}}return{opaque:t,transmissive:i,transparent:c,init:o,push:u,unshift:C,finish:w,sort:M}}function Ef(){let e=new WeakMap;function n(i,c){const o=e.get(i);let h;return o===void 0?(h=new ji,e.set(i,[h])):c>=o.length?(h=new ji,o.push(h)):h=o[c],h}function t(){e=new WeakMap}return{get:n,dispose:t}}function Sf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new We,color:new Ke};break;case"SpotLight":t={position:new We,direction:new We,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new We,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new We,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new We,halfWidth:new We,halfHeight:new We};break}return e[n.id]=t,t}}}function Mf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let Tf=0;function xf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Af(e){const n=new Sf,t=Mf(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let M=0;M<9;M++)i.probe.push(new We);const c=new We,o=new Vt,h=new Vt;function u(M){let w=0,T=0,E=0;for(let p=0;p<9;p++)i.probe[p].set(0,0,0);let A=0,O=0,L=0,l=0,r=0,U=0,x=0,m=0,H=0,P=0,N=0;M.sort(xf);for(let p=0,f=M.length;p<f;p++){const R=M[p],q=R.color,V=R.intensity,Y=R.distance,Q=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)w+=q.r*V,T+=q.g*V,E+=q.b*V;else if(R.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(R.sh.coefficients[W],V);N++}else if(R.isDirectionalLight){const W=n.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const j=R.shadow,F=t.get(R);F.shadowIntensity=j.intensity,F.shadowBias=j.bias,F.shadowNormalBias=j.normalBias,F.shadowRadius=j.radius,F.shadowMapSize=j.mapSize,i.directionalShadow[A]=F,i.directionalShadowMap[A]=Q,i.directionalShadowMatrix[A]=R.shadow.matrix,U++}i.directional[A]=W,A++}else if(R.isSpotLight){const W=n.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(q).multiplyScalar(V),W.distance=Y,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,i.spot[L]=W;const j=R.shadow;if(R.map&&(i.spotLightMap[H]=R.map,H++,j.updateMatrices(R),R.castShadow&&P++),i.spotLightMatrix[L]=j.matrix,R.castShadow){const F=t.get(R);F.shadowIntensity=j.intensity,F.shadowBias=j.bias,F.shadowNormalBias=j.normalBias,F.shadowRadius=j.radius,F.shadowMapSize=j.mapSize,i.spotShadow[L]=F,i.spotShadowMap[L]=Q,m++}L++}else if(R.isRectAreaLight){const W=n.get(R);W.color.copy(q).multiplyScalar(V),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),i.rectArea[l]=W,l++}else if(R.isPointLight){const W=n.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),W.distance=R.distance,W.decay=R.decay,R.castShadow){const j=R.shadow,F=t.get(R);F.shadowIntensity=j.intensity,F.shadowBias=j.bias,F.shadowNormalBias=j.normalBias,F.shadowRadius=j.radius,F.shadowMapSize=j.mapSize,F.shadowCameraNear=j.camera.near,F.shadowCameraFar=j.camera.far,i.pointShadow[O]=F,i.pointShadowMap[O]=Q,i.pointShadowMatrix[O]=R.shadow.matrix,x++}i.point[O]=W,O++}else if(R.isHemisphereLight){const W=n.get(R);W.skyColor.copy(R.color).multiplyScalar(V),W.groundColor.copy(R.groundColor).multiplyScalar(V),i.hemi[r]=W,r++}}l>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ee.LTC_FLOAT_1,i.rectAreaLTC2=ee.LTC_FLOAT_2):(i.rectAreaLTC1=ee.LTC_HALF_1,i.rectAreaLTC2=ee.LTC_HALF_2)),i.ambient[0]=w,i.ambient[1]=T,i.ambient[2]=E;const B=i.hash;(B.directionalLength!==A||B.pointLength!==O||B.spotLength!==L||B.rectAreaLength!==l||B.hemiLength!==r||B.numDirectionalShadows!==U||B.numPointShadows!==x||B.numSpotShadows!==m||B.numSpotMaps!==H||B.numLightProbes!==N)&&(i.directional.length=A,i.spot.length=L,i.rectArea.length=l,i.point.length=O,i.hemi.length=r,i.directionalShadow.length=U,i.directionalShadowMap.length=U,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=m,i.spotShadowMap.length=m,i.directionalShadowMatrix.length=U,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=m+H-P,i.spotLightMap.length=H,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=N,B.directionalLength=A,B.pointLength=O,B.spotLength=L,B.rectAreaLength=l,B.hemiLength=r,B.numDirectionalShadows=U,B.numPointShadows=x,B.numSpotShadows=m,B.numSpotMaps=H,B.numLightProbes=N,i.version=Tf++)}function C(M,w){let T=0,E=0,A=0,O=0,L=0;const l=w.matrixWorldInverse;for(let r=0,U=M.length;r<U;r++){const x=M[r];if(x.isDirectionalLight){const m=i.directional[T];m.direction.setFromMatrixPosition(x.matrixWorld),c.setFromMatrixPosition(x.target.matrixWorld),m.direction.sub(c),m.direction.transformDirection(l),T++}else if(x.isSpotLight){const m=i.spot[A];m.position.setFromMatrixPosition(x.matrixWorld),m.position.applyMatrix4(l),m.direction.setFromMatrixPosition(x.matrixWorld),c.setFromMatrixPosition(x.target.matrixWorld),m.direction.sub(c),m.direction.transformDirection(l),A++}else if(x.isRectAreaLight){const m=i.rectArea[O];m.position.setFromMatrixPosition(x.matrixWorld),m.position.applyMatrix4(l),h.identity(),o.copy(x.matrixWorld),o.premultiply(l),h.extractRotation(o),m.halfWidth.set(x.width*.5,0,0),m.halfHeight.set(0,x.height*.5,0),m.halfWidth.applyMatrix4(h),m.halfHeight.applyMatrix4(h),O++}else if(x.isPointLight){const m=i.point[E];m.position.setFromMatrixPosition(x.matrixWorld),m.position.applyMatrix4(l),E++}else if(x.isHemisphereLight){const m=i.hemi[L];m.direction.setFromMatrixPosition(x.matrixWorld),m.direction.transformDirection(l),L++}}}return{setup:u,setupView:C,state:i}}function er(e){const n=new Af(e),t=[],i=[];function c(w){M.camera=w,t.length=0,i.length=0}function o(w){t.push(w)}function h(w){i.push(w)}function u(){n.setup(t)}function C(w){n.setupView(t,w)}const M={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:c,state:M,setupLights:u,setupLightsView:C,pushLight:o,pushShadow:h}}function Rf(e){let n=new WeakMap;function t(c,o=0){const h=n.get(c);let u;return h===void 0?(u=new er(e),n.set(c,[u])):o>=h.length?(u=new er(e),h.push(u)):u=h[o],u}function i(){n=new WeakMap}return{get:t,dispose:i}}const Cf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bf=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Pf(e,n,t){let i=new tr;const c=new ft,o=new ft,h=new lt,u=new Vr({depthPacking:kr}),C=new Wr,M={},w=t.maxTextureSize,T={[Zt]:_t,[_t]:Zt,[Mt]:Mt},E=new yt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:Cf,fragmentShader:bf}),A=E.clone();A.defines.HORIZONTAL_PASS=1;const O=new ir;O.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const L=new xt(O,E),l=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rr;let r=this.type;this.render=function(P,N,B){if(l.enabled===!1||l.autoUpdate===!1&&l.needsUpdate===!1||P.length===0)return;const p=e.getRenderTarget(),f=e.getActiveCubeFace(),R=e.getActiveMipmapLevel(),q=e.state;q.setBlending(It),q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const V=r!==St&&this.type===St,Y=r===St&&this.type!==St;for(let Q=0,W=P.length;Q<W;Q++){const j=P[Q],F=j.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;c.copy(F.mapSize);const _e=F.getFrameExtents();if(c.multiply(_e),o.copy(F.mapSize),(c.x>w||c.y>w)&&(c.x>w&&(o.x=Math.floor(w/_e.x),c.x=o.x*_e.x,F.mapSize.x=o.x),c.y>w&&(o.y=Math.floor(w/_e.y),c.y=o.y*_e.y,F.mapSize.y=o.y)),F.map===null||V===!0||Y===!0){const Le=this.type!==St?{minFilter:$t,magFilter:$t}:{};F.map!==null&&F.map.dispose(),F.map=new kt(c.x,c.y,Le),F.map.texture.name=j.name+".shadowMap",F.camera.updateProjectionMatrix()}e.setRenderTarget(F.map),e.clear();const Se=F.getViewportCount();for(let Le=0;Le<Se;Le++){const Ge=F.getViewport(Le);h.set(o.x*Ge.x,o.y*Ge.y,o.x*Ge.z,o.y*Ge.w),q.viewport(h),F.updateMatrices(j,Le),i=F.getFrustum(),m(N,B,F.camera,j,this.type)}F.isPointLightShadow!==!0&&this.type===St&&U(F,B),F.needsUpdate=!1}r=this.type,l.needsUpdate=!1,e.setRenderTarget(p,f,R)};function U(P,N){const B=n.update(L);E.defines.VSM_SAMPLES!==P.blurSamples&&(E.defines.VSM_SAMPLES=P.blurSamples,A.defines.VSM_SAMPLES=P.blurSamples,E.needsUpdate=!0,A.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new kt(c.x,c.y)),E.uniforms.shadow_pass.value=P.map.texture,E.uniforms.resolution.value=P.mapSize,E.uniforms.radius.value=P.radius,e.setRenderTarget(P.mapPass),e.clear(),e.renderBufferDirect(N,null,B,E,L,null),A.uniforms.shadow_pass.value=P.mapPass.texture,A.uniforms.resolution.value=P.mapSize,A.uniforms.radius.value=P.radius,e.setRenderTarget(P.map),e.clear(),e.renderBufferDirect(N,null,B,A,L,null)}function x(P,N,B,p){let f=null;const R=B.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(R!==void 0)f=R;else if(f=B.isPointLight===!0?C:u,e.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0){const q=f.uuid,V=N.uuid;let Y=M[q];Y===void 0&&(Y={},M[q]=Y);let Q=Y[V];Q===void 0&&(Q=f.clone(),Y[V]=Q,N.addEventListener("dispose",H)),f=Q}if(f.visible=N.visible,f.wireframe=N.wireframe,p===St?f.side=N.shadowSide!==null?N.shadowSide:N.side:f.side=N.shadowSide!==null?N.shadowSide:T[N.side],f.alphaMap=N.alphaMap,f.alphaTest=N.alphaTest,f.map=N.map,f.clipShadows=N.clipShadows,f.clippingPlanes=N.clippingPlanes,f.clipIntersection=N.clipIntersection,f.displacementMap=N.displacementMap,f.displacementScale=N.displacementScale,f.displacementBias=N.displacementBias,f.wireframeLinewidth=N.wireframeLinewidth,f.linewidth=N.linewidth,B.isPointLight===!0&&f.isMeshDistanceMaterial===!0){const q=e.properties.get(f);q.light=B}return f}function m(P,N,B,p,f){if(P.visible===!1)return;if(P.layers.test(N.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&f===St)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,P.matrixWorld);const V=n.update(P),Y=P.material;if(Array.isArray(Y)){const Q=V.groups;for(let W=0,j=Q.length;W<j;W++){const F=Q[W],_e=Y[F.materialIndex];if(_e&&_e.visible){const Se=x(P,_e,p,f);P.onBeforeShadow(e,P,N,B,V,Se,F),e.renderBufferDirect(B,null,V,Se,P,F),P.onAfterShadow(e,P,N,B,V,Se,F)}}}else if(Y.visible){const Q=x(P,Y,p,f);P.onBeforeShadow(e,P,N,B,V,Q,null),e.renderBufferDirect(B,null,V,Q,P,null),P.onAfterShadow(e,P,N,B,V,Q,null)}}const q=P.children;for(let V=0,Y=q.length;V<Y;V++)m(q[V],N,B,p,f)}function H(P){P.target.removeEventListener("dispose",H);for(const B in M){const p=M[B],f=P.target.uuid;f in p&&(p[f].dispose(),delete p[f])}}}const Lf={[Vn]:Hn,[Gn]:On,[Bn]:yn,[un]:Fn,[Hn]:Vn,[On]:Gn,[yn]:Bn,[Fn]:un};function Uf(e,n){function t(){let v=!1;const te=new lt;let y=null;const X=new lt(0,0,0,0);return{setMask:function(oe){y!==oe&&!v&&(e.colorMask(oe,oe,oe,oe),y=oe)},setLocked:function(oe){v=oe},setClear:function(oe,ae,Ce,Qe,at){at===!0&&(oe*=Qe,ae*=Qe,Ce*=Qe),te.set(oe,ae,Ce,Qe),X.equals(te)===!1&&(e.clearColor(oe,ae,Ce,Qe),X.copy(te))},reset:function(){v=!1,y=null,X.set(-1,0,0,0)}}}function i(){let v=!1,te=!1,y=null,X=null,oe=null;return{setReversed:function(ae){if(te!==ae){const Ce=n.get("EXT_clip_control");te?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT);const Qe=oe;oe=null,this.setClear(Qe)}te=ae},getReversed:function(){return te},setTest:function(ae){ae?ie(e.DEPTH_TEST):Ee(e.DEPTH_TEST)},setMask:function(ae){y!==ae&&!v&&(e.depthMask(ae),y=ae)},setFunc:function(ae){if(te&&(ae=Lf[ae]),X!==ae){switch(ae){case Vn:e.depthFunc(e.NEVER);break;case Hn:e.depthFunc(e.ALWAYS);break;case Gn:e.depthFunc(e.LESS);break;case un:e.depthFunc(e.LEQUAL);break;case Bn:e.depthFunc(e.EQUAL);break;case Fn:e.depthFunc(e.GEQUAL);break;case On:e.depthFunc(e.GREATER);break;case yn:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}X=ae}},setLocked:function(ae){v=ae},setClear:function(ae){oe!==ae&&(te&&(ae=1-ae),e.clearDepth(ae),oe=ae)},reset:function(){v=!1,y=null,X=null,oe=null,te=!1}}}function c(){let v=!1,te=null,y=null,X=null,oe=null,ae=null,Ce=null,Qe=null,at=null;return{setTest:function(ke){v||(ke?ie(e.STENCIL_TEST):Ee(e.STENCIL_TEST))},setMask:function(ke){te!==ke&&!v&&(e.stencilMask(ke),te=ke)},setFunc:function(ke,mt,Et){(y!==ke||X!==mt||oe!==Et)&&(e.stencilFunc(ke,mt,Et),y=ke,X=mt,oe=Et)},setOp:function(ke,mt,Et){(ae!==ke||Ce!==mt||Qe!==Et)&&(e.stencilOp(ke,mt,Et),ae=ke,Ce=mt,Qe=Et)},setLocked:function(ke){v=ke},setClear:function(ke){at!==ke&&(e.clearStencil(ke),at=ke)},reset:function(){v=!1,te=null,y=null,X=null,oe=null,ae=null,Ce=null,Qe=null,at=null}}}const o=new t,h=new i,u=new c,C=new WeakMap,M=new WeakMap;let w={},T={},E=new WeakMap,A=[],O=null,L=!1,l=null,r=null,U=null,x=null,m=null,H=null,P=null,N=new Ke(0,0,0),B=0,p=!1,f=null,R=null,q=null,V=null,Y=null;const Q=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,j=0;const F=e.getParameter(e.VERSION);F.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(F)[1]),W=j>=1):F.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),W=j>=2);let _e=null,Se={};const Le=e.getParameter(e.SCISSOR_BOX),Ge=e.getParameter(e.VIEWPORT),Ze=new lt().fromArray(Le),k=new lt().fromArray(Ge);function J(v,te,y,X){const oe=new Uint8Array(4),ae=e.createTexture();e.bindTexture(v,ae),e.texParameteri(v,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(v,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Ce=0;Ce<y;Ce++)v===e.TEXTURE_3D||v===e.TEXTURE_2D_ARRAY?e.texImage3D(te,0,e.RGBA,1,1,X,0,e.RGBA,e.UNSIGNED_BYTE,oe):e.texImage2D(te+Ce,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,oe);return ae}const ue={};ue[e.TEXTURE_2D]=J(e.TEXTURE_2D,e.TEXTURE_2D,1),ue[e.TEXTURE_CUBE_MAP]=J(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[e.TEXTURE_2D_ARRAY]=J(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ue[e.TEXTURE_3D]=J(e.TEXTURE_3D,e.TEXTURE_3D,1,1),o.setClear(0,0,0,1),h.setClear(1),u.setClear(0),ie(e.DEPTH_TEST),h.setFunc(un),De(!1),we(ti),ie(e.CULL_FACE),_(It);function ie(v){w[v]!==!0&&(e.enable(v),w[v]=!0)}function Ee(v){w[v]!==!1&&(e.disable(v),w[v]=!1)}function Be(v,te){return T[v]!==te?(e.bindFramebuffer(v,te),T[v]=te,v===e.DRAW_FRAMEBUFFER&&(T[e.FRAMEBUFFER]=te),v===e.FRAMEBUFFER&&(T[e.DRAW_FRAMEBUFFER]=te),!0):!1}function Te(v,te){let y=A,X=!1;if(v){y=E.get(te),y===void 0&&(y=[],E.set(te,y));const oe=v.textures;if(y.length!==oe.length||y[0]!==e.COLOR_ATTACHMENT0){for(let ae=0,Ce=oe.length;ae<Ce;ae++)y[ae]=e.COLOR_ATTACHMENT0+ae;y.length=oe.length,X=!0}}else y[0]!==e.BACK&&(y[0]=e.BACK,X=!0);X&&e.drawBuffers(y)}function je(v){return O!==v?(e.useProgram(v),O=v,!0):!1}const $e={[Yt]:e.FUNC_ADD,[zr]:e.FUNC_SUBTRACT,[Xr]:e.FUNC_REVERSE_SUBTRACT};$e[Ra]=e.MIN,$e[Ca]=e.MAX;const Ue={[Yr]:e.ZERO,[qr]:e.ONE,[Kr]:e.SRC_COLOR,[$r]:e.SRC_ALPHA,[Zr]:e.SRC_ALPHA_SATURATE,[Qr]:e.DST_COLOR,[Jr]:e.DST_ALPHA,[jr]:e.ONE_MINUS_SRC_COLOR,[ea]:e.ONE_MINUS_SRC_ALPHA,[ta]:e.ONE_MINUS_DST_COLOR,[na]:e.ONE_MINUS_DST_ALPHA,[ia]:e.CONSTANT_COLOR,[ra]:e.ONE_MINUS_CONSTANT_COLOR,[aa]:e.CONSTANT_ALPHA,[oa]:e.ONE_MINUS_CONSTANT_ALPHA};function _(v,te,y,X,oe,ae,Ce,Qe,at,ke){if(v===It){L===!0&&(Ee(e.BLEND),L=!1);return}if(L===!1&&(ie(e.BLEND),L=!0),v!==sa){if(v!==l||ke!==p){if((r!==Yt||m!==Yt)&&(e.blendEquation(e.FUNC_ADD),r=Yt,m=Yt),ke)switch(v){case ln:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case ei:e.blendFunc(e.ONE,e.ONE);break;case jn:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Jn:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}else switch(v){case ln:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case ei:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case jn:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Jn:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}U=null,x=null,H=null,P=null,N.set(0,0,0),B=0,l=v,p=ke}return}oe=oe||te,ae=ae||y,Ce=Ce||X,(te!==r||oe!==m)&&(e.blendEquationSeparate($e[te],$e[oe]),r=te,m=oe),(y!==U||X!==x||ae!==H||Ce!==P)&&(e.blendFuncSeparate(Ue[y],Ue[X],Ue[ae],Ue[Ce]),U=y,x=X,H=ae,P=Ce),(Qe.equals(N)===!1||at!==B)&&(e.blendColor(Qe.r,Qe.g,Qe.b,at),N.copy(Qe),B=at),l=v,p=!1}function ut(v,te){v.side===Mt?Ee(e.CULL_FACE):ie(e.CULL_FACE);let y=v.side===_t;te&&(y=!y),De(y),v.blending===ln&&v.transparent===!1?_(It):_(v.blending,v.blendEquation,v.blendSrc,v.blendDst,v.blendEquationAlpha,v.blendSrcAlpha,v.blendDstAlpha,v.blendColor,v.blendAlpha,v.premultipliedAlpha),h.setFunc(v.depthFunc),h.setTest(v.depthTest),h.setMask(v.depthWrite),o.setMask(v.colorWrite);const X=v.stencilWrite;u.setTest(X),X&&(u.setMask(v.stencilWriteMask),u.setFunc(v.stencilFunc,v.stencilRef,v.stencilFuncMask),u.setOp(v.stencilFail,v.stencilZFail,v.stencilZPass)),Xe(v.polygonOffset,v.polygonOffsetFactor,v.polygonOffsetUnits),v.alphaToCoverage===!0?ie(e.SAMPLE_ALPHA_TO_COVERAGE):Ee(e.SAMPLE_ALPHA_TO_COVERAGE)}function De(v){f!==v&&(v?e.frontFace(e.CW):e.frontFace(e.CCW),f=v)}function we(v){v!==ca?(ie(e.CULL_FACE),v!==R&&(v===ti?e.cullFace(e.BACK):v===la?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Ee(e.CULL_FACE),R=v}function me(v){v!==q&&(W&&e.lineWidth(v),q=v)}function Xe(v,te,y){v?(ie(e.POLYGON_OFFSET_FILL),(V!==te||Y!==y)&&(e.polygonOffset(te,y),V=te,Y=y)):Ee(e.POLYGON_OFFSET_FILL)}function he(v){v?ie(e.SCISSOR_TEST):Ee(e.SCISSOR_TEST)}function d(v){v===void 0&&(v=e.TEXTURE0+Q-1),_e!==v&&(e.activeTexture(v),_e=v)}function a(v,te,y){y===void 0&&(_e===null?y=e.TEXTURE0+Q-1:y=_e);let X=Se[y];X===void 0&&(X={type:void 0,texture:void 0},Se[y]=X),(X.type!==v||X.texture!==te)&&(_e!==y&&(e.activeTexture(y),_e=y),e.bindTexture(v,te||ue[v]),X.type=v,X.texture=te)}function b(){const v=Se[_e];v!==void 0&&v.type!==void 0&&(e.bindTexture(v.type,null),v.type=void 0,v.texture=void 0)}function z(){try{e.compressedTexImage2D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function K(){try{e.compressedTexImage3D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function G(){try{e.texSubImage2D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function pe(){try{e.texSubImage3D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function re(){try{e.compressedTexSubImage2D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function ce(){try{e.compressedTexSubImage3D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Ne(){try{e.texStorage2D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Z(){try{e.texStorage3D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function le(){try{e.texImage2D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Me(){try{e.texImage3D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function xe(v){Ze.equals(v)===!1&&(e.scissor(v.x,v.y,v.z,v.w),Ze.copy(v))}function fe(v){k.equals(v)===!1&&(e.viewport(v.x,v.y,v.z,v.w),k.copy(v))}function Ie(v,te){let y=M.get(te);y===void 0&&(y=new WeakMap,M.set(te,y));let X=y.get(v);X===void 0&&(X=e.getUniformBlockIndex(te,v.name),y.set(v,X))}function be(v,te){const X=M.get(te).get(v);C.get(te)!==X&&(e.uniformBlockBinding(te,X,v.__bindingPointIndex),C.set(te,X))}function ze(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),h.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),w={},_e=null,Se={},T={},E=new WeakMap,A=[],O=null,L=!1,l=null,r=null,U=null,x=null,m=null,H=null,P=null,N=new Ke(0,0,0),B=0,p=!1,f=null,R=null,q=null,V=null,Y=null,Ze.set(0,0,e.canvas.width,e.canvas.height),k.set(0,0,e.canvas.width,e.canvas.height),o.reset(),h.reset(),u.reset()}return{buffers:{color:o,depth:h,stencil:u},enable:ie,disable:Ee,bindFramebuffer:Be,drawBuffers:Te,useProgram:je,setBlending:_,setMaterial:ut,setFlipSided:De,setCullFace:we,setLineWidth:me,setPolygonOffset:Xe,setScissorTest:he,activeTexture:d,bindTexture:a,unbindTexture:b,compressedTexImage2D:z,compressedTexImage3D:K,texImage2D:le,texImage3D:Me,updateUBOMapping:Ie,uniformBlockBinding:be,texStorage2D:Ne,texStorage3D:Z,texSubImage2D:G,texSubImage3D:pe,compressedTexSubImage2D:re,compressedTexSubImage3D:ce,scissor:xe,viewport:fe,reset:ze}}function Df(e,n,t,i,c,o,h){const u=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,C=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),M=new ft,w=new WeakMap;let T;const E=new WeakMap;let A=!1;try{A=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function O(d,a){return A?new OffscreenCanvas(d,a):Qa("canvas")}function L(d,a,b){let z=1;const K=he(d);if((K.width>b||K.height>b)&&(z=b/Math.max(K.width,K.height)),z<1)if(typeof HTMLImageElement<"u"&&d instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&d instanceof ImageBitmap||typeof VideoFrame<"u"&&d instanceof VideoFrame){const G=Math.floor(z*K.width),pe=Math.floor(z*K.height);T===void 0&&(T=O(G,pe));const re=a?O(G,pe):T;return re.width=G,re.height=pe,re.getContext("2d").drawImage(d,0,0,G,pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+G+"x"+pe+")."),re}else return"data"in d&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),d;return d}function l(d){return d.generateMipmaps}function r(d){e.generateMipmap(d)}function U(d){return d.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:d.isWebGL3DRenderTarget?e.TEXTURE_3D:d.isWebGLArrayRenderTarget||d.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function x(d,a,b,z,K=!1){if(d!==null){if(e[d]!==void 0)return e[d];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+d+"'")}let G=a;if(a===e.RED&&(b===e.FLOAT&&(G=e.R32F),b===e.HALF_FLOAT&&(G=e.R16F),b===e.UNSIGNED_BYTE&&(G=e.R8)),a===e.RED_INTEGER&&(b===e.UNSIGNED_BYTE&&(G=e.R8UI),b===e.UNSIGNED_SHORT&&(G=e.R16UI),b===e.UNSIGNED_INT&&(G=e.R32UI),b===e.BYTE&&(G=e.R8I),b===e.SHORT&&(G=e.R16I),b===e.INT&&(G=e.R32I)),a===e.RG&&(b===e.FLOAT&&(G=e.RG32F),b===e.HALF_FLOAT&&(G=e.RG16F),b===e.UNSIGNED_BYTE&&(G=e.RG8)),a===e.RG_INTEGER&&(b===e.UNSIGNED_BYTE&&(G=e.RG8UI),b===e.UNSIGNED_SHORT&&(G=e.RG16UI),b===e.UNSIGNED_INT&&(G=e.RG32UI),b===e.BYTE&&(G=e.RG8I),b===e.SHORT&&(G=e.RG16I),b===e.INT&&(G=e.RG32I)),a===e.RGB_INTEGER&&(b===e.UNSIGNED_BYTE&&(G=e.RGB8UI),b===e.UNSIGNED_SHORT&&(G=e.RGB16UI),b===e.UNSIGNED_INT&&(G=e.RGB32UI),b===e.BYTE&&(G=e.RGB8I),b===e.SHORT&&(G=e.RGB16I),b===e.INT&&(G=e.RGB32I)),a===e.RGBA_INTEGER&&(b===e.UNSIGNED_BYTE&&(G=e.RGBA8UI),b===e.UNSIGNED_SHORT&&(G=e.RGBA16UI),b===e.UNSIGNED_INT&&(G=e.RGBA32UI),b===e.BYTE&&(G=e.RGBA8I),b===e.SHORT&&(G=e.RGBA16I),b===e.INT&&(G=e.RGBA32I)),a===e.RGB&&b===e.UNSIGNED_INT_5_9_9_9_REV&&(G=e.RGB9_E5),a===e.RGBA){const pe=K?gr:tt.getTransfer(z);b===e.FLOAT&&(G=e.RGBA32F),b===e.HALF_FLOAT&&(G=e.RGBA16F),b===e.UNSIGNED_BYTE&&(G=pe===Ye?e.SRGB8_ALPHA8:e.RGBA8),b===e.UNSIGNED_SHORT_4_4_4_4&&(G=e.RGBA4),b===e.UNSIGNED_SHORT_5_5_5_1&&(G=e.RGB5_A1)}return(G===e.R16F||G===e.R32F||G===e.RG16F||G===e.RG32F||G===e.RGBA16F||G===e.RGBA32F)&&n.get("EXT_color_buffer_float"),G}function m(d,a){let b;return d?a===null||a===Jt||a===Qt?b=e.DEPTH24_STENCIL8:a===wt?b=e.DEPTH32F_STENCIL8:a===pn&&(b=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):a===null||a===Jt||a===Qt?b=e.DEPTH_COMPONENT24:a===wt?b=e.DEPTH_COMPONENT32F:a===pn&&(b=e.DEPTH_COMPONENT16),b}function H(d,a){return l(d)===!0||d.isFramebufferTexture&&d.minFilter!==$t&&d.minFilter!==Gt?Math.log2(Math.max(a.width,a.height))+1:d.mipmaps!==void 0&&d.mipmaps.length>0?d.mipmaps.length:d.isCompressedTexture&&Array.isArray(d.image)?a.mipmaps.length:1}function P(d){const a=d.target;a.removeEventListener("dispose",P),B(a),a.isVideoTexture&&w.delete(a)}function N(d){const a=d.target;a.removeEventListener("dispose",N),f(a)}function B(d){const a=i.get(d);if(a.__webglInit===void 0)return;const b=d.source,z=E.get(b);if(z){const K=z[a.__cacheKey];K.usedTimes--,K.usedTimes===0&&p(d),Object.keys(z).length===0&&E.delete(b)}i.remove(d)}function p(d){const a=i.get(d);e.deleteTexture(a.__webglTexture);const b=d.source,z=E.get(b);delete z[a.__cacheKey],h.memory.textures--}function f(d){const a=i.get(d);if(d.depthTexture&&(d.depthTexture.dispose(),i.remove(d.depthTexture)),d.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(a.__webglFramebuffer[z]))for(let K=0;K<a.__webglFramebuffer[z].length;K++)e.deleteFramebuffer(a.__webglFramebuffer[z][K]);else e.deleteFramebuffer(a.__webglFramebuffer[z]);a.__webglDepthbuffer&&e.deleteRenderbuffer(a.__webglDepthbuffer[z])}else{if(Array.isArray(a.__webglFramebuffer))for(let z=0;z<a.__webglFramebuffer.length;z++)e.deleteFramebuffer(a.__webglFramebuffer[z]);else e.deleteFramebuffer(a.__webglFramebuffer);if(a.__webglDepthbuffer&&e.deleteRenderbuffer(a.__webglDepthbuffer),a.__webglMultisampledFramebuffer&&e.deleteFramebuffer(a.__webglMultisampledFramebuffer),a.__webglColorRenderbuffer)for(let z=0;z<a.__webglColorRenderbuffer.length;z++)a.__webglColorRenderbuffer[z]&&e.deleteRenderbuffer(a.__webglColorRenderbuffer[z]);a.__webglDepthRenderbuffer&&e.deleteRenderbuffer(a.__webglDepthRenderbuffer)}const b=d.textures;for(let z=0,K=b.length;z<K;z++){const G=i.get(b[z]);G.__webglTexture&&(e.deleteTexture(G.__webglTexture),h.memory.textures--),i.remove(b[z])}i.remove(d)}let R=0;function q(){R=0}function V(){const d=R;return d>=c.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+d+" texture units while this GPU supports only "+c.maxTextures),R+=1,d}function Y(d){const a=[];return a.push(d.wrapS),a.push(d.wrapT),a.push(d.wrapR||0),a.push(d.magFilter),a.push(d.minFilter),a.push(d.anisotropy),a.push(d.internalFormat),a.push(d.format),a.push(d.type),a.push(d.generateMipmaps),a.push(d.premultiplyAlpha),a.push(d.flipY),a.push(d.unpackAlignment),a.push(d.colorSpace),a.join()}function Q(d,a){const b=i.get(d);if(d.isVideoTexture&&me(d),d.isRenderTargetTexture===!1&&d.version>0&&b.__version!==d.version){const z=d.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(b,d,a);return}}t.bindTexture(e.TEXTURE_2D,b.__webglTexture,e.TEXTURE0+a)}function W(d,a){const b=i.get(d);if(d.version>0&&b.__version!==d.version){k(b,d,a);return}t.bindTexture(e.TEXTURE_2D_ARRAY,b.__webglTexture,e.TEXTURE0+a)}function j(d,a){const b=i.get(d);if(d.version>0&&b.__version!==d.version){k(b,d,a);return}t.bindTexture(e.TEXTURE_3D,b.__webglTexture,e.TEXTURE0+a)}function F(d,a){const b=i.get(d);if(d.version>0&&b.__version!==d.version){J(b,d,a);return}t.bindTexture(e.TEXTURE_CUBE_MAP,b.__webglTexture,e.TEXTURE0+a)}const _e={[fa]:e.REPEAT,[da]:e.CLAMP_TO_EDGE,[ua]:e.MIRRORED_REPEAT},Se={[$t]:e.NEAREST,[pa]:e.NEAREST_MIPMAP_NEAREST,[nn]:e.NEAREST_MIPMAP_LINEAR,[Gt]:e.LINEAR,[Mn]:e.LINEAR_MIPMAP_NEAREST,[qt]:e.LINEAR_MIPMAP_LINEAR},Le={[ha]:e.NEVER,[_a]:e.ALWAYS,[ma]:e.LESS,[ar]:e.LEQUAL,[va]:e.EQUAL,[ga]:e.GEQUAL,[Ea]:e.GREATER,[Sa]:e.NOTEQUAL};function Ge(d,a){if(a.type===wt&&n.has("OES_texture_float_linear")===!1&&(a.magFilter===Gt||a.magFilter===Mn||a.magFilter===nn||a.magFilter===qt||a.minFilter===Gt||a.minFilter===Mn||a.minFilter===nn||a.minFilter===qt)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(d,e.TEXTURE_WRAP_S,_e[a.wrapS]),e.texParameteri(d,e.TEXTURE_WRAP_T,_e[a.wrapT]),(d===e.TEXTURE_3D||d===e.TEXTURE_2D_ARRAY)&&e.texParameteri(d,e.TEXTURE_WRAP_R,_e[a.wrapR]),e.texParameteri(d,e.TEXTURE_MAG_FILTER,Se[a.magFilter]),e.texParameteri(d,e.TEXTURE_MIN_FILTER,Se[a.minFilter]),a.compareFunction&&(e.texParameteri(d,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(d,e.TEXTURE_COMPARE_FUNC,Le[a.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(a.magFilter===$t||a.minFilter!==nn&&a.minFilter!==qt||a.type===wt&&n.has("OES_texture_float_linear")===!1)return;if(a.anisotropy>1||i.get(a).__currentAnisotropy){const b=n.get("EXT_texture_filter_anisotropic");e.texParameterf(d,b.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,c.getMaxAnisotropy())),i.get(a).__currentAnisotropy=a.anisotropy}}}function Ze(d,a){let b=!1;d.__webglInit===void 0&&(d.__webglInit=!0,a.addEventListener("dispose",P));const z=a.source;let K=E.get(z);K===void 0&&(K={},E.set(z,K));const G=Y(a);if(G!==d.__cacheKey){K[G]===void 0&&(K[G]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,b=!0),K[G].usedTimes++;const pe=K[d.__cacheKey];pe!==void 0&&(K[d.__cacheKey].usedTimes--,pe.usedTimes===0&&p(a)),d.__cacheKey=G,d.__webglTexture=K[G].texture}return b}function k(d,a,b){let z=e.TEXTURE_2D;(a.isDataArrayTexture||a.isCompressedArrayTexture)&&(z=e.TEXTURE_2D_ARRAY),a.isData3DTexture&&(z=e.TEXTURE_3D);const K=Ze(d,a),G=a.source;t.bindTexture(z,d.__webglTexture,e.TEXTURE0+b);const pe=i.get(G);if(G.version!==pe.__version||K===!0){t.activeTexture(e.TEXTURE0+b);const re=tt.getPrimaries(tt.workingColorSpace),ce=a.colorSpace===Bt?null:tt.getPrimaries(a.colorSpace),Ne=a.colorSpace===Bt||re===ce?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let Z=L(a.image,!1,c.maxTextureSize);Z=Xe(a,Z);const le=o.convert(a.format,a.colorSpace),Me=o.convert(a.type);let xe=x(a.internalFormat,le,Me,a.colorSpace,a.isVideoTexture);Ge(z,a);let fe;const Ie=a.mipmaps,be=a.isVideoTexture!==!0,ze=pe.__version===void 0||K===!0,v=G.dataReady,te=H(a,Z);if(a.isDepthTexture)xe=m(a.format===dn,a.type),ze&&(be?t.texStorage2D(e.TEXTURE_2D,1,xe,Z.width,Z.height):t.texImage2D(e.TEXTURE_2D,0,xe,Z.width,Z.height,0,le,Me,null));else if(a.isDataTexture)if(Ie.length>0){be&&ze&&t.texStorage2D(e.TEXTURE_2D,te,xe,Ie[0].width,Ie[0].height);for(let y=0,X=Ie.length;y<X;y++)fe=Ie[y],be?v&&t.texSubImage2D(e.TEXTURE_2D,y,0,0,fe.width,fe.height,le,Me,fe.data):t.texImage2D(e.TEXTURE_2D,y,xe,fe.width,fe.height,0,le,Me,fe.data);a.generateMipmaps=!1}else be?(ze&&t.texStorage2D(e.TEXTURE_2D,te,xe,Z.width,Z.height),v&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,Z.width,Z.height,le,Me,Z.data)):t.texImage2D(e.TEXTURE_2D,0,xe,Z.width,Z.height,0,le,Me,Z.data);else if(a.isCompressedTexture)if(a.isCompressedArrayTexture){be&&ze&&t.texStorage3D(e.TEXTURE_2D_ARRAY,te,xe,Ie[0].width,Ie[0].height,Z.depth);for(let y=0,X=Ie.length;y<X;y++)if(fe=Ie[y],a.format!==Tt)if(le!==null)if(be){if(v)if(a.layerUpdates.size>0){const oe=ii(fe.width,fe.height,a.format,a.type);for(const ae of a.layerUpdates){const Ce=fe.data.subarray(ae*oe/fe.data.BYTES_PER_ELEMENT,(ae+1)*oe/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,y,0,0,ae,fe.width,fe.height,1,le,Ce)}a.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,y,0,0,0,fe.width,fe.height,Z.depth,le,fe.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,y,xe,fe.width,fe.height,Z.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else be?v&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,y,0,0,0,fe.width,fe.height,Z.depth,le,Me,fe.data):t.texImage3D(e.TEXTURE_2D_ARRAY,y,xe,fe.width,fe.height,Z.depth,0,le,Me,fe.data)}else{be&&ze&&t.texStorage2D(e.TEXTURE_2D,te,xe,Ie[0].width,Ie[0].height);for(let y=0,X=Ie.length;y<X;y++)fe=Ie[y],a.format!==Tt?le!==null?be?v&&t.compressedTexSubImage2D(e.TEXTURE_2D,y,0,0,fe.width,fe.height,le,fe.data):t.compressedTexImage2D(e.TEXTURE_2D,y,xe,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):be?v&&t.texSubImage2D(e.TEXTURE_2D,y,0,0,fe.width,fe.height,le,Me,fe.data):t.texImage2D(e.TEXTURE_2D,y,xe,fe.width,fe.height,0,le,Me,fe.data)}else if(a.isDataArrayTexture)if(be){if(ze&&t.texStorage3D(e.TEXTURE_2D_ARRAY,te,xe,Z.width,Z.height,Z.depth),v)if(a.layerUpdates.size>0){const y=ii(Z.width,Z.height,a.format,a.type);for(const X of a.layerUpdates){const oe=Z.data.subarray(X*y/Z.data.BYTES_PER_ELEMENT,(X+1)*y/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,X,Z.width,Z.height,1,le,Me,oe)}a.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,le,Me,Z.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,xe,Z.width,Z.height,Z.depth,0,le,Me,Z.data);else if(a.isData3DTexture)be?(ze&&t.texStorage3D(e.TEXTURE_3D,te,xe,Z.width,Z.height,Z.depth),v&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,le,Me,Z.data)):t.texImage3D(e.TEXTURE_3D,0,xe,Z.width,Z.height,Z.depth,0,le,Me,Z.data);else if(a.isFramebufferTexture){if(ze)if(be)t.texStorage2D(e.TEXTURE_2D,te,xe,Z.width,Z.height);else{let y=Z.width,X=Z.height;for(let oe=0;oe<te;oe++)t.texImage2D(e.TEXTURE_2D,oe,xe,y,X,0,le,Me,null),y>>=1,X>>=1}}else if(Ie.length>0){if(be&&ze){const y=he(Ie[0]);t.texStorage2D(e.TEXTURE_2D,te,xe,y.width,y.height)}for(let y=0,X=Ie.length;y<X;y++)fe=Ie[y],be?v&&t.texSubImage2D(e.TEXTURE_2D,y,0,0,le,Me,fe):t.texImage2D(e.TEXTURE_2D,y,xe,le,Me,fe);a.generateMipmaps=!1}else if(be){if(ze){const y=he(Z);t.texStorage2D(e.TEXTURE_2D,te,xe,y.width,y.height)}v&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,le,Me,Z)}else t.texImage2D(e.TEXTURE_2D,0,xe,le,Me,Z);l(a)&&r(z),pe.__version=G.version,a.onUpdate&&a.onUpdate(a)}d.__version=a.version}function J(d,a,b){if(a.image.length!==6)return;const z=Ze(d,a),K=a.source;t.bindTexture(e.TEXTURE_CUBE_MAP,d.__webglTexture,e.TEXTURE0+b);const G=i.get(K);if(K.version!==G.__version||z===!0){t.activeTexture(e.TEXTURE0+b);const pe=tt.getPrimaries(tt.workingColorSpace),re=a.colorSpace===Bt?null:tt.getPrimaries(a.colorSpace),ce=a.colorSpace===Bt||pe===re?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const Ne=a.isCompressedTexture||a.image[0].isCompressedTexture,Z=a.image[0]&&a.image[0].isDataTexture,le=[];for(let X=0;X<6;X++)!Ne&&!Z?le[X]=L(a.image[X],!0,c.maxCubemapSize):le[X]=Z?a.image[X].image:a.image[X],le[X]=Xe(a,le[X]);const Me=le[0],xe=o.convert(a.format,a.colorSpace),fe=o.convert(a.type),Ie=x(a.internalFormat,xe,fe,a.colorSpace),be=a.isVideoTexture!==!0,ze=G.__version===void 0||z===!0,v=K.dataReady;let te=H(a,Me);Ge(e.TEXTURE_CUBE_MAP,a);let y;if(Ne){be&&ze&&t.texStorage2D(e.TEXTURE_CUBE_MAP,te,Ie,Me.width,Me.height);for(let X=0;X<6;X++){y=le[X].mipmaps;for(let oe=0;oe<y.length;oe++){const ae=y[oe];a.format!==Tt?xe!==null?be?v&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe,0,0,ae.width,ae.height,xe,ae.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe,Ie,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):be?v&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe,0,0,ae.width,ae.height,xe,fe,ae.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe,Ie,ae.width,ae.height,0,xe,fe,ae.data)}}}else{if(y=a.mipmaps,be&&ze){y.length>0&&te++;const X=he(le[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,te,Ie,X.width,X.height)}for(let X=0;X<6;X++)if(Z){be?v&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,le[X].width,le[X].height,xe,fe,le[X].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ie,le[X].width,le[X].height,0,xe,fe,le[X].data);for(let oe=0;oe<y.length;oe++){const Ce=y[oe].image[X].image;be?v&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe+1,0,0,Ce.width,Ce.height,xe,fe,Ce.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe+1,Ie,Ce.width,Ce.height,0,xe,fe,Ce.data)}}else{be?v&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,xe,fe,le[X]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ie,xe,fe,le[X]);for(let oe=0;oe<y.length;oe++){const ae=y[oe];be?v&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe+1,0,0,xe,fe,ae.image[X]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe+1,Ie,xe,fe,ae.image[X])}}}l(a)&&r(e.TEXTURE_CUBE_MAP),G.__version=K.version,a.onUpdate&&a.onUpdate(a)}d.__version=a.version}function ue(d,a,b,z,K,G){const pe=o.convert(b.format,b.colorSpace),re=o.convert(b.type),ce=x(b.internalFormat,pe,re,b.colorSpace),Ne=i.get(a),Z=i.get(b);if(Z.__renderTarget=a,!Ne.__hasExternalTextures){const le=Math.max(1,a.width>>G),Me=Math.max(1,a.height>>G);K===e.TEXTURE_3D||K===e.TEXTURE_2D_ARRAY?t.texImage3D(K,G,ce,le,Me,a.depth,0,pe,re,null):t.texImage2D(K,G,ce,le,Me,0,pe,re,null)}t.bindFramebuffer(e.FRAMEBUFFER,d),we(a)?u.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,z,K,Z.__webglTexture,0,De(a)):(K===e.TEXTURE_2D||K>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,z,K,Z.__webglTexture,G),t.bindFramebuffer(e.FRAMEBUFFER,null)}function ie(d,a,b){if(e.bindRenderbuffer(e.RENDERBUFFER,d),a.depthBuffer){const z=a.depthTexture,K=z&&z.isDepthTexture?z.type:null,G=m(a.stencilBuffer,K),pe=a.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,re=De(a);we(a)?u.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,re,G,a.width,a.height):b?e.renderbufferStorageMultisample(e.RENDERBUFFER,re,G,a.width,a.height):e.renderbufferStorage(e.RENDERBUFFER,G,a.width,a.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,pe,e.RENDERBUFFER,d)}else{const z=a.textures;for(let K=0;K<z.length;K++){const G=z[K],pe=o.convert(G.format,G.colorSpace),re=o.convert(G.type),ce=x(G.internalFormat,pe,re,G.colorSpace),Ne=De(a);b&&we(a)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne,ce,a.width,a.height):we(a)?u.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne,ce,a.width,a.height):e.renderbufferStorage(e.RENDERBUFFER,ce,a.width,a.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ee(d,a){if(a&&a.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,d),!(a.depthTexture&&a.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const z=i.get(a.depthTexture);z.__renderTarget=a,(!z.__webglTexture||a.depthTexture.image.width!==a.width||a.depthTexture.image.height!==a.height)&&(a.depthTexture.image.width=a.width,a.depthTexture.image.height=a.height,a.depthTexture.needsUpdate=!0),Q(a.depthTexture,0);const K=z.__webglTexture,G=De(a);if(a.depthTexture.format===Wn)we(a)?u.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0,G):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0);else if(a.depthTexture.format===dn)we(a)?u.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0,G):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Be(d){const a=i.get(d),b=d.isWebGLCubeRenderTarget===!0;if(a.__boundDepthTexture!==d.depthTexture){const z=d.depthTexture;if(a.__depthDisposeCallback&&a.__depthDisposeCallback(),z){const K=()=>{delete a.__boundDepthTexture,delete a.__depthDisposeCallback,z.removeEventListener("dispose",K)};z.addEventListener("dispose",K),a.__depthDisposeCallback=K}a.__boundDepthTexture=z}if(d.depthTexture&&!a.__autoAllocateDepthBuffer){if(b)throw new Error("target.depthTexture not supported in Cube render targets");Ee(a.__webglFramebuffer,d)}else if(b){a.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer[z]),a.__webglDepthbuffer[z]===void 0)a.__webglDepthbuffer[z]=e.createRenderbuffer(),ie(a.__webglDepthbuffer[z],d,!1);else{const K=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,G=a.__webglDepthbuffer[z];e.bindRenderbuffer(e.RENDERBUFFER,G),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,G)}}else if(t.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer),a.__webglDepthbuffer===void 0)a.__webglDepthbuffer=e.createRenderbuffer(),ie(a.__webglDepthbuffer,d,!1);else{const z=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,K=a.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,K),e.framebufferRenderbuffer(e.FRAMEBUFFER,z,e.RENDERBUFFER,K)}t.bindFramebuffer(e.FRAMEBUFFER,null)}function Te(d,a,b){const z=i.get(d);a!==void 0&&ue(z.__webglFramebuffer,d,d.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),b!==void 0&&Be(d)}function je(d){const a=d.texture,b=i.get(d),z=i.get(a);d.addEventListener("dispose",N);const K=d.textures,G=d.isWebGLCubeRenderTarget===!0,pe=K.length>1;if(pe||(z.__webglTexture===void 0&&(z.__webglTexture=e.createTexture()),z.__version=a.version,h.memory.textures++),G){b.__webglFramebuffer=[];for(let re=0;re<6;re++)if(a.mipmaps&&a.mipmaps.length>0){b.__webglFramebuffer[re]=[];for(let ce=0;ce<a.mipmaps.length;ce++)b.__webglFramebuffer[re][ce]=e.createFramebuffer()}else b.__webglFramebuffer[re]=e.createFramebuffer()}else{if(a.mipmaps&&a.mipmaps.length>0){b.__webglFramebuffer=[];for(let re=0;re<a.mipmaps.length;re++)b.__webglFramebuffer[re]=e.createFramebuffer()}else b.__webglFramebuffer=e.createFramebuffer();if(pe)for(let re=0,ce=K.length;re<ce;re++){const Ne=i.get(K[re]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=e.createTexture(),h.memory.textures++)}if(d.samples>0&&we(d)===!1){b.__webglMultisampledFramebuffer=e.createFramebuffer(),b.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,b.__webglMultisampledFramebuffer);for(let re=0;re<K.length;re++){const ce=K[re];b.__webglColorRenderbuffer[re]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,b.__webglColorRenderbuffer[re]);const Ne=o.convert(ce.format,ce.colorSpace),Z=o.convert(ce.type),le=x(ce.internalFormat,Ne,Z,ce.colorSpace,d.isXRRenderTarget===!0),Me=De(d);e.renderbufferStorageMultisample(e.RENDERBUFFER,Me,le,d.width,d.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+re,e.RENDERBUFFER,b.__webglColorRenderbuffer[re])}e.bindRenderbuffer(e.RENDERBUFFER,null),d.depthBuffer&&(b.__webglDepthRenderbuffer=e.createRenderbuffer(),ie(b.__webglDepthRenderbuffer,d,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(G){t.bindTexture(e.TEXTURE_CUBE_MAP,z.__webglTexture),Ge(e.TEXTURE_CUBE_MAP,a);for(let re=0;re<6;re++)if(a.mipmaps&&a.mipmaps.length>0)for(let ce=0;ce<a.mipmaps.length;ce++)ue(b.__webglFramebuffer[re][ce],d,a,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+re,ce);else ue(b.__webglFramebuffer[re],d,a,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);l(a)&&r(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let re=0,ce=K.length;re<ce;re++){const Ne=K[re],Z=i.get(Ne);t.bindTexture(e.TEXTURE_2D,Z.__webglTexture),Ge(e.TEXTURE_2D,Ne),ue(b.__webglFramebuffer,d,Ne,e.COLOR_ATTACHMENT0+re,e.TEXTURE_2D,0),l(Ne)&&r(e.TEXTURE_2D)}t.unbindTexture()}else{let re=e.TEXTURE_2D;if((d.isWebGL3DRenderTarget||d.isWebGLArrayRenderTarget)&&(re=d.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(re,z.__webglTexture),Ge(re,a),a.mipmaps&&a.mipmaps.length>0)for(let ce=0;ce<a.mipmaps.length;ce++)ue(b.__webglFramebuffer[ce],d,a,e.COLOR_ATTACHMENT0,re,ce);else ue(b.__webglFramebuffer,d,a,e.COLOR_ATTACHMENT0,re,0);l(a)&&r(re),t.unbindTexture()}d.depthBuffer&&Be(d)}function $e(d){const a=d.textures;for(let b=0,z=a.length;b<z;b++){const K=a[b];if(l(K)){const G=U(d),pe=i.get(K).__webglTexture;t.bindTexture(G,pe),r(G),t.unbindTexture()}}}const Ue=[],_=[];function ut(d){if(d.samples>0){if(we(d)===!1){const a=d.textures,b=d.width,z=d.height;let K=e.COLOR_BUFFER_BIT;const G=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,pe=i.get(d),re=a.length>1;if(re)for(let ce=0;ce<a.length;ce++)t.bindFramebuffer(e.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ce,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,pe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ce,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let ce=0;ce<a.length;ce++){if(d.resolveDepthBuffer&&(d.depthBuffer&&(K|=e.DEPTH_BUFFER_BIT),d.stencilBuffer&&d.resolveStencilBuffer&&(K|=e.STENCIL_BUFFER_BIT)),re){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,pe.__webglColorRenderbuffer[ce]);const Ne=i.get(a[ce]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Ne,0)}e.blitFramebuffer(0,0,b,z,0,0,b,z,K,e.NEAREST),C===!0&&(Ue.length=0,_.length=0,Ue.push(e.COLOR_ATTACHMENT0+ce),d.depthBuffer&&d.resolveDepthBuffer===!1&&(Ue.push(G),_.push(G),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,_)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),re)for(let ce=0;ce<a.length;ce++){t.bindFramebuffer(e.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ce,e.RENDERBUFFER,pe.__webglColorRenderbuffer[ce]);const Ne=i.get(a[ce]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,pe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ce,e.TEXTURE_2D,Ne,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(d.depthBuffer&&d.resolveDepthBuffer===!1&&C){const a=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[a])}}}function De(d){return Math.min(c.maxSamples,d.samples)}function we(d){const a=i.get(d);return d.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&a.__useRenderToTexture!==!1}function me(d){const a=h.render.frame;w.get(d)!==a&&(w.set(d,a),d.update())}function Xe(d,a){const b=d.colorSpace,z=d.format,K=d.type;return d.isCompressedTexture===!0||d.isVideoTexture===!0||b!==_n&&b!==Bt&&(tt.getTransfer(b)===Ye?(z!==Tt||K!==Nt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",b)),a}function he(d){return typeof HTMLImageElement<"u"&&d instanceof HTMLImageElement?(M.width=d.naturalWidth||d.width,M.height=d.naturalHeight||d.height):typeof VideoFrame<"u"&&d instanceof VideoFrame?(M.width=d.displayWidth,M.height=d.displayHeight):(M.width=d.width,M.height=d.height),M}this.allocateTextureUnit=V,this.resetTextureUnits=q,this.setTexture2D=Q,this.setTexture2DArray=W,this.setTexture3D=j,this.setTextureCube=F,this.rebindTextures=Te,this.setupRenderTarget=je,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=ut,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=we}function wf(e,n){function t(i,c=Bt){let o;const h=tt.getTransfer(c);if(i===Nt)return e.UNSIGNED_BYTE;if(i===lr)return e.UNSIGNED_SHORT_4_4_4_4;if(i===fr)return e.UNSIGNED_SHORT_5_5_5_1;if(i===ba)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Pa)return e.BYTE;if(i===La)return e.SHORT;if(i===pn)return e.UNSIGNED_SHORT;if(i===hr)return e.INT;if(i===Jt)return e.UNSIGNED_INT;if(i===wt)return e.FLOAT;if(i===hn)return e.HALF_FLOAT;if(i===Ua)return e.ALPHA;if(i===Da)return e.RGB;if(i===Tt)return e.RGBA;if(i===wa)return e.LUMINANCE;if(i===Ia)return e.LUMINANCE_ALPHA;if(i===Wn)return e.DEPTH_COMPONENT;if(i===dn)return e.DEPTH_STENCIL;if(i===Na)return e.RED;if(i===cr)return e.RED_INTEGER;if(i===ya)return e.RG;if(i===sr)return e.RG_INTEGER;if(i===or)return e.RGBA_INTEGER;if(i===Tn||i===xn||i===An||i===Rn)if(h===Ye)if(o=n.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===Tn)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===xn)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===An)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Rn)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=n.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===Tn)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===xn)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===An)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Rn)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ri||i===ai||i===oi||i===si)if(o=n.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===ri)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ai)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===oi)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===si)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ci||i===li||i===fi)if(o=n.get("WEBGL_compressed_texture_etc"),o!==null){if(i===ci||i===li)return h===Ye?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===fi)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===di||i===ui||i===pi||i===hi||i===_i||i===mi||i===vi||i===gi||i===Ei||i===Si||i===Mi||i===Ti||i===xi||i===Ai)if(o=n.get("WEBGL_compressed_texture_astc"),o!==null){if(i===di)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ui)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pi)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===hi)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===_i)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===mi)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vi)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===gi)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ei)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Si)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Mi)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ti)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===xi)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ai)return h===Ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Cn||i===Ri||i===Ci)if(o=n.get("EXT_texture_compression_bptc"),o!==null){if(i===Cn)return h===Ye?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ri)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ci)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Oa||i===bi||i===Pi||i===Li)if(o=n.get("EXT_texture_compression_rgtc"),o!==null){if(i===Cn)return o.COMPRESSED_RED_RGTC1_EXT;if(i===bi)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Pi)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Li)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Qt?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const If=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Nf=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class yf{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t,i){if(this.texture===null){const c=new mr,o=n.properties.get(c);o.__webglTexture=t.texture,(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=c}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new yt({vertexShader:If,fragmentShader:Nf,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new xt(new ur(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Of extends Fr{constructor(n,t){super();const i=this;let c=null,o=1,h=null,u="local-floor",C=1,M=null,w=null,T=null,E=null,A=null,O=null;const L=new yf,l=t.getContextAttributes();let r=null,U=null;const x=[],m=[],H=new ft;let P=null;const N=new sn;N.viewport=new lt;const B=new sn;B.viewport=new lt;const p=[N,B],f=new Br;let R=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let J=x[k];return J===void 0&&(J=new Sn,x[k]=J),J.getTargetRaySpace()},this.getControllerGrip=function(k){let J=x[k];return J===void 0&&(J=new Sn,x[k]=J),J.getGripSpace()},this.getHand=function(k){let J=x[k];return J===void 0&&(J=new Sn,x[k]=J),J.getHandSpace()};function V(k){const J=m.indexOf(k.inputSource);if(J===-1)return;const ue=x[J];ue!==void 0&&(ue.update(k.inputSource,k.frame,M||h),ue.dispatchEvent({type:k.type,data:k.inputSource}))}function Y(){c.removeEventListener("select",V),c.removeEventListener("selectstart",V),c.removeEventListener("selectend",V),c.removeEventListener("squeeze",V),c.removeEventListener("squeezestart",V),c.removeEventListener("squeezeend",V),c.removeEventListener("end",Y),c.removeEventListener("inputsourceschange",Q);for(let k=0;k<x.length;k++){const J=m[k];J!==null&&(m[k]=null,x[k].disconnect(J))}R=null,q=null,L.reset(),n.setRenderTarget(r),A=null,E=null,T=null,c=null,U=null,Ze.stop(),i.isPresenting=!1,n.setPixelRatio(P),n.setSize(H.width,H.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){o=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){u=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return M||h},this.setReferenceSpace=function(k){M=k},this.getBaseLayer=function(){return E!==null?E:A},this.getBinding=function(){return T},this.getFrame=function(){return O},this.getSession=function(){return c},this.setSession=async function(k){if(c=k,c!==null){if(r=n.getRenderTarget(),c.addEventListener("select",V),c.addEventListener("selectstart",V),c.addEventListener("selectend",V),c.addEventListener("squeeze",V),c.addEventListener("squeezestart",V),c.addEventListener("squeezeend",V),c.addEventListener("end",Y),c.addEventListener("inputsourceschange",Q),l.xrCompatible!==!0&&await t.makeXRCompatible(),P=n.getPixelRatio(),n.getSize(H),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,ie=null,Ee=null;l.depth&&(Ee=l.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=l.stencil?dn:Wn,ie=l.stencil?Qt:Jt);const Be={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:o};T=new XRWebGLBinding(c,t),E=T.createProjectionLayer(Be),c.updateRenderState({layers:[E]}),n.setPixelRatio(1),n.setSize(E.textureWidth,E.textureHeight,!1),U=new kt(E.textureWidth,E.textureHeight,{format:Tt,type:Nt,depthTexture:new nr(E.textureWidth,E.textureHeight,ie,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:l.stencil,colorSpace:n.outputColorSpace,samples:l.antialias?4:0,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1})}else{const ue={antialias:l.antialias,alpha:!0,depth:l.depth,stencil:l.stencil,framebufferScaleFactor:o};A=new XRWebGLLayer(c,t,ue),c.updateRenderState({baseLayer:A}),n.setPixelRatio(1),n.setSize(A.framebufferWidth,A.framebufferHeight,!1),U=new kt(A.framebufferWidth,A.framebufferHeight,{format:Tt,type:Nt,colorSpace:n.outputColorSpace,stencilBuffer:l.stencil,resolveDepthBuffer:A.ignoreDepthValues===!1,resolveStencilBuffer:A.ignoreDepthValues===!1})}U.isXRRenderTarget=!0,this.setFoveation(C),M=null,h=await c.requestReferenceSpace(u),Ze.setContext(c),Ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(c!==null)return c.environmentBlendMode},this.getDepthTexture=function(){return L.getDepthTexture()};function Q(k){for(let J=0;J<k.removed.length;J++){const ue=k.removed[J],ie=m.indexOf(ue);ie>=0&&(m[ie]=null,x[ie].disconnect(ue))}for(let J=0;J<k.added.length;J++){const ue=k.added[J];let ie=m.indexOf(ue);if(ie===-1){for(let Be=0;Be<x.length;Be++)if(Be>=m.length){m.push(ue),ie=Be;break}else if(m[Be]===null){m[Be]=ue,ie=Be;break}if(ie===-1)break}const Ee=x[ie];Ee&&Ee.connect(ue)}}const W=new We,j=new We;function F(k,J,ue){W.setFromMatrixPosition(J.matrixWorld),j.setFromMatrixPosition(ue.matrixWorld);const ie=W.distanceTo(j),Ee=J.projectionMatrix.elements,Be=ue.projectionMatrix.elements,Te=Ee[14]/(Ee[10]-1),je=Ee[14]/(Ee[10]+1),$e=(Ee[9]+1)/Ee[5],Ue=(Ee[9]-1)/Ee[5],_=(Ee[8]-1)/Ee[0],ut=(Be[8]+1)/Be[0],De=Te*_,we=Te*ut,me=ie/(-_+ut),Xe=me*-_;if(J.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Xe),k.translateZ(me),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),Ee[10]===-1)k.projectionMatrix.copy(J.projectionMatrix),k.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const he=Te+me,d=je+me,a=De-Xe,b=we+(ie-Xe),z=$e*je/d*he,K=Ue*je/d*he;k.projectionMatrix.makePerspective(a,b,z,K,he,d),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function _e(k,J){J===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(J.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(c===null)return;let J=k.near,ue=k.far;L.texture!==null&&(L.depthNear>0&&(J=L.depthNear),L.depthFar>0&&(ue=L.depthFar)),f.near=B.near=N.near=J,f.far=B.far=N.far=ue,(R!==f.near||q!==f.far)&&(c.updateRenderState({depthNear:f.near,depthFar:f.far}),R=f.near,q=f.far),N.layers.mask=k.layers.mask|2,B.layers.mask=k.layers.mask|4,f.layers.mask=N.layers.mask|B.layers.mask;const ie=k.parent,Ee=f.cameras;_e(f,ie);for(let Be=0;Be<Ee.length;Be++)_e(Ee[Be],ie);Ee.length===2?F(f,N,B):f.projectionMatrix.copy(N.projectionMatrix),Se(k,f,ie)};function Se(k,J,ue){ue===null?k.matrix.copy(J.matrixWorld):(k.matrix.copy(ue.matrixWorld),k.matrix.invert(),k.matrix.multiply(J.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(J.projectionMatrix),k.projectionMatrixInverse.copy(J.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Gr*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return f},this.getFoveation=function(){if(!(E===null&&A===null))return C},this.setFoveation=function(k){C=k,E!==null&&(E.fixedFoveation=k),A!==null&&A.fixedFoveation!==void 0&&(A.fixedFoveation=k)},this.hasDepthSensing=function(){return L.texture!==null},this.getDepthSensingMesh=function(){return L.getMesh(f)};let Le=null;function Ge(k,J){if(w=J.getViewerPose(M||h),O=J,w!==null){const ue=w.views;A!==null&&(n.setRenderTargetFramebuffer(U,A.framebuffer),n.setRenderTarget(U));let ie=!1;ue.length!==f.cameras.length&&(f.cameras.length=0,ie=!0);for(let Te=0;Te<ue.length;Te++){const je=ue[Te];let $e=null;if(A!==null)$e=A.getViewport(je);else{const _=T.getViewSubImage(E,je);$e=_.viewport,Te===0&&(n.setRenderTargetTextures(U,_.colorTexture,E.ignoreDepthValues?void 0:_.depthStencilTexture),n.setRenderTarget(U))}let Ue=p[Te];Ue===void 0&&(Ue=new sn,Ue.layers.enable(Te),Ue.viewport=new lt,p[Te]=Ue),Ue.matrix.fromArray(je.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(je.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set($e.x,$e.y,$e.width,$e.height),Te===0&&(f.matrix.copy(Ue.matrix),f.matrix.decompose(f.position,f.quaternion,f.scale)),ie===!0&&f.cameras.push(Ue)}const Ee=c.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&c.depthUsage=="gpu-optimized"&&T){const Te=T.getDepthInformation(ue[0]);Te&&Te.isValid&&Te.texture&&L.init(n,Te,c.renderState)}}for(let ue=0;ue<x.length;ue++){const ie=m[ue],Ee=x[ue];ie!==null&&Ee!==void 0&&Ee.update(ie,J,M||h)}Le&&Le(k,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),O=null}const Ze=new Er;Ze.setAnimationLoop(Ge),this.setAnimationLoop=function(k){Le=k},this.dispose=function(){}}}const Pt=new vr,Ff=new Vt;function Bf(e,n){function t(l,r){l.matrixAutoUpdate===!0&&l.updateMatrix(),r.value.copy(l.matrix)}function i(l,r){r.color.getRGB(l.fogColor.value,pr(e)),r.isFog?(l.fogNear.value=r.near,l.fogFar.value=r.far):r.isFogExp2&&(l.fogDensity.value=r.density)}function c(l,r,U,x,m){r.isMeshBasicMaterial||r.isMeshLambertMaterial?o(l,r):r.isMeshToonMaterial?(o(l,r),T(l,r)):r.isMeshPhongMaterial?(o(l,r),w(l,r)):r.isMeshStandardMaterial?(o(l,r),E(l,r),r.isMeshPhysicalMaterial&&A(l,r,m)):r.isMeshMatcapMaterial?(o(l,r),O(l,r)):r.isMeshDepthMaterial?o(l,r):r.isMeshDistanceMaterial?(o(l,r),L(l,r)):r.isMeshNormalMaterial?o(l,r):r.isLineBasicMaterial?(h(l,r),r.isLineDashedMaterial&&u(l,r)):r.isPointsMaterial?C(l,r,U,x):r.isSpriteMaterial?M(l,r):r.isShadowMaterial?(l.color.value.copy(r.color),l.opacity.value=r.opacity):r.isShaderMaterial&&(r.uniformsNeedUpdate=!1)}function o(l,r){l.opacity.value=r.opacity,r.color&&l.diffuse.value.copy(r.color),r.emissive&&l.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(l.map.value=r.map,t(r.map,l.mapTransform)),r.alphaMap&&(l.alphaMap.value=r.alphaMap,t(r.alphaMap,l.alphaMapTransform)),r.bumpMap&&(l.bumpMap.value=r.bumpMap,t(r.bumpMap,l.bumpMapTransform),l.bumpScale.value=r.bumpScale,r.side===_t&&(l.bumpScale.value*=-1)),r.normalMap&&(l.normalMap.value=r.normalMap,t(r.normalMap,l.normalMapTransform),l.normalScale.value.copy(r.normalScale),r.side===_t&&l.normalScale.value.negate()),r.displacementMap&&(l.displacementMap.value=r.displacementMap,t(r.displacementMap,l.displacementMapTransform),l.displacementScale.value=r.displacementScale,l.displacementBias.value=r.displacementBias),r.emissiveMap&&(l.emissiveMap.value=r.emissiveMap,t(r.emissiveMap,l.emissiveMapTransform)),r.specularMap&&(l.specularMap.value=r.specularMap,t(r.specularMap,l.specularMapTransform)),r.alphaTest>0&&(l.alphaTest.value=r.alphaTest);const U=n.get(r),x=U.envMap,m=U.envMapRotation;x&&(l.envMap.value=x,Pt.copy(m),Pt.x*=-1,Pt.y*=-1,Pt.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Pt.y*=-1,Pt.z*=-1),l.envMapRotation.value.setFromMatrix4(Ff.makeRotationFromEuler(Pt)),l.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,l.reflectivity.value=r.reflectivity,l.ior.value=r.ior,l.refractionRatio.value=r.refractionRatio),r.lightMap&&(l.lightMap.value=r.lightMap,l.lightMapIntensity.value=r.lightMapIntensity,t(r.lightMap,l.lightMapTransform)),r.aoMap&&(l.aoMap.value=r.aoMap,l.aoMapIntensity.value=r.aoMapIntensity,t(r.aoMap,l.aoMapTransform))}function h(l,r){l.diffuse.value.copy(r.color),l.opacity.value=r.opacity,r.map&&(l.map.value=r.map,t(r.map,l.mapTransform))}function u(l,r){l.dashSize.value=r.dashSize,l.totalSize.value=r.dashSize+r.gapSize,l.scale.value=r.scale}function C(l,r,U,x){l.diffuse.value.copy(r.color),l.opacity.value=r.opacity,l.size.value=r.size*U,l.scale.value=x*.5,r.map&&(l.map.value=r.map,t(r.map,l.uvTransform)),r.alphaMap&&(l.alphaMap.value=r.alphaMap,t(r.alphaMap,l.alphaMapTransform)),r.alphaTest>0&&(l.alphaTest.value=r.alphaTest)}function M(l,r){l.diffuse.value.copy(r.color),l.opacity.value=r.opacity,l.rotation.value=r.rotation,r.map&&(l.map.value=r.map,t(r.map,l.mapTransform)),r.alphaMap&&(l.alphaMap.value=r.alphaMap,t(r.alphaMap,l.alphaMapTransform)),r.alphaTest>0&&(l.alphaTest.value=r.alphaTest)}function w(l,r){l.specular.value.copy(r.specular),l.shininess.value=Math.max(r.shininess,1e-4)}function T(l,r){r.gradientMap&&(l.gradientMap.value=r.gradientMap)}function E(l,r){l.metalness.value=r.metalness,r.metalnessMap&&(l.metalnessMap.value=r.metalnessMap,t(r.metalnessMap,l.metalnessMapTransform)),l.roughness.value=r.roughness,r.roughnessMap&&(l.roughnessMap.value=r.roughnessMap,t(r.roughnessMap,l.roughnessMapTransform)),r.envMap&&(l.envMapIntensity.value=r.envMapIntensity)}function A(l,r,U){l.ior.value=r.ior,r.sheen>0&&(l.sheenColor.value.copy(r.sheenColor).multiplyScalar(r.sheen),l.sheenRoughness.value=r.sheenRoughness,r.sheenColorMap&&(l.sheenColorMap.value=r.sheenColorMap,t(r.sheenColorMap,l.sheenColorMapTransform)),r.sheenRoughnessMap&&(l.sheenRoughnessMap.value=r.sheenRoughnessMap,t(r.sheenRoughnessMap,l.sheenRoughnessMapTransform))),r.clearcoat>0&&(l.clearcoat.value=r.clearcoat,l.clearcoatRoughness.value=r.clearcoatRoughness,r.clearcoatMap&&(l.clearcoatMap.value=r.clearcoatMap,t(r.clearcoatMap,l.clearcoatMapTransform)),r.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=r.clearcoatRoughnessMap,t(r.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),r.clearcoatNormalMap&&(l.clearcoatNormalMap.value=r.clearcoatNormalMap,t(r.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(r.clearcoatNormalScale),r.side===_t&&l.clearcoatNormalScale.value.negate())),r.dispersion>0&&(l.dispersion.value=r.dispersion),r.iridescence>0&&(l.iridescence.value=r.iridescence,l.iridescenceIOR.value=r.iridescenceIOR,l.iridescenceThicknessMinimum.value=r.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=r.iridescenceThicknessRange[1],r.iridescenceMap&&(l.iridescenceMap.value=r.iridescenceMap,t(r.iridescenceMap,l.iridescenceMapTransform)),r.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=r.iridescenceThicknessMap,t(r.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),r.transmission>0&&(l.transmission.value=r.transmission,l.transmissionSamplerMap.value=U.texture,l.transmissionSamplerSize.value.set(U.width,U.height),r.transmissionMap&&(l.transmissionMap.value=r.transmissionMap,t(r.transmissionMap,l.transmissionMapTransform)),l.thickness.value=r.thickness,r.thicknessMap&&(l.thicknessMap.value=r.thicknessMap,t(r.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=r.attenuationDistance,l.attenuationColor.value.copy(r.attenuationColor)),r.anisotropy>0&&(l.anisotropyVector.value.set(r.anisotropy*Math.cos(r.anisotropyRotation),r.anisotropy*Math.sin(r.anisotropyRotation)),r.anisotropyMap&&(l.anisotropyMap.value=r.anisotropyMap,t(r.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=r.specularIntensity,l.specularColor.value.copy(r.specularColor),r.specularColorMap&&(l.specularColorMap.value=r.specularColorMap,t(r.specularColorMap,l.specularColorMapTransform)),r.specularIntensityMap&&(l.specularIntensityMap.value=r.specularIntensityMap,t(r.specularIntensityMap,l.specularIntensityMapTransform))}function O(l,r){r.matcap&&(l.matcap.value=r.matcap)}function L(l,r){const U=n.get(r).light;l.referencePosition.value.setFromMatrixPosition(U.matrixWorld),l.nearDistance.value=U.shadow.camera.near,l.farDistance.value=U.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:c}}function Gf(e,n,t,i){let c={},o={},h=[];const u=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function C(U,x){const m=x.program;i.uniformBlockBinding(U,m)}function M(U,x){let m=c[U.id];m===void 0&&(O(U),m=w(U),c[U.id]=m,U.addEventListener("dispose",l));const H=x.program;i.updateUBOMapping(U,H);const P=n.render.frame;o[U.id]!==P&&(E(U),o[U.id]=P)}function w(U){const x=T();U.__bindingPointIndex=x;const m=e.createBuffer(),H=U.__size,P=U.usage;return e.bindBuffer(e.UNIFORM_BUFFER,m),e.bufferData(e.UNIFORM_BUFFER,H,P),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,x,m),m}function T(){for(let U=0;U<u;U++)if(h.indexOf(U)===-1)return h.push(U),U;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function E(U){const x=c[U.id],m=U.uniforms,H=U.__cache;e.bindBuffer(e.UNIFORM_BUFFER,x);for(let P=0,N=m.length;P<N;P++){const B=Array.isArray(m[P])?m[P]:[m[P]];for(let p=0,f=B.length;p<f;p++){const R=B[p];if(A(R,P,p,H)===!0){const q=R.__offset,V=Array.isArray(R.value)?R.value:[R.value];let Y=0;for(let Q=0;Q<V.length;Q++){const W=V[Q],j=L(W);typeof W=="number"||typeof W=="boolean"?(R.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,q+Y,R.__data)):W.isMatrix3?(R.__data[0]=W.elements[0],R.__data[1]=W.elements[1],R.__data[2]=W.elements[2],R.__data[3]=0,R.__data[4]=W.elements[3],R.__data[5]=W.elements[4],R.__data[6]=W.elements[5],R.__data[7]=0,R.__data[8]=W.elements[6],R.__data[9]=W.elements[7],R.__data[10]=W.elements[8],R.__data[11]=0):(W.toArray(R.__data,Y),Y+=j.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,q,R.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function A(U,x,m,H){const P=U.value,N=x+"_"+m;if(H[N]===void 0)return typeof P=="number"||typeof P=="boolean"?H[N]=P:H[N]=P.clone(),!0;{const B=H[N];if(typeof P=="number"||typeof P=="boolean"){if(B!==P)return H[N]=P,!0}else if(B.equals(P)===!1)return B.copy(P),!0}return!1}function O(U){const x=U.uniforms;let m=0;const H=16;for(let N=0,B=x.length;N<B;N++){const p=Array.isArray(x[N])?x[N]:[x[N]];for(let f=0,R=p.length;f<R;f++){const q=p[f],V=Array.isArray(q.value)?q.value:[q.value];for(let Y=0,Q=V.length;Y<Q;Y++){const W=V[Y],j=L(W),F=m%H,_e=F%j.boundary,Se=F+_e;m+=_e,Se!==0&&H-Se<j.storage&&(m+=H-Se),q.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=m,m+=j.storage}}}const P=m%H;return P>0&&(m+=H-P),U.__size=m,U.__cache={},this}function L(U){const x={boundary:0,storage:0};return typeof U=="number"||typeof U=="boolean"?(x.boundary=4,x.storage=4):U.isVector2?(x.boundary=8,x.storage=8):U.isVector3||U.isColor?(x.boundary=16,x.storage=12):U.isVector4?(x.boundary=16,x.storage=16):U.isMatrix3?(x.boundary=48,x.storage=48):U.isMatrix4?(x.boundary=64,x.storage=64):U.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",U),x}function l(U){const x=U.target;x.removeEventListener("dispose",l);const m=h.indexOf(x.__bindingPointIndex);h.splice(m,1),e.deleteBuffer(c[x.id]),delete c[x.id],delete o[x.id]}function r(){for(const U in c)e.deleteBuffer(c[U]);h=[],c={},o={}}return{bind:C,update:M,dispose:r}}class Vf{constructor(n={}){const{canvas:t=Ur(),context:i=null,depth:c=!0,stencil:o=!1,alpha:h=!1,antialias:u=!1,premultipliedAlpha:C=!0,preserveDrawingBuffer:M=!1,powerPreference:w="default",failIfMajorPerformanceCaveat:T=!1,reverseDepthBuffer:E=!1}=n;this.isWebGLRenderer=!0;let A;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");A=i.getContextAttributes().alpha}else A=h;const O=new Uint32Array(4),L=new Int32Array(4);let l=null,r=null;const U=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Dr,this.toneMapping=At,this.toneMappingExposure=1;const m=this;let H=!1,P=0,N=0,B=null,p=-1,f=null;const R=new lt,q=new lt;let V=null;const Y=new Ke(0);let Q=0,W=t.width,j=t.height,F=1,_e=null,Se=null;const Le=new lt(0,0,W,j),Ge=new lt(0,0,W,j);let Ze=!1;const k=new tr;let J=!1,ue=!1;this.transmissionResolutionScale=1;const ie=new Vt,Ee=new Vt,Be=new We,Te=new lt,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let $e=!1;function Ue(){return B===null?F:1}let _=i;function ut(s,g){return t.getContext(s,g)}try{const s={alpha:!0,depth:c,stencil:o,antialias:u,premultipliedAlpha:C,preserveDrawingBuffer:M,powerPreference:w,failIfMajorPerformanceCaveat:T};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${wr}`),t.addEventListener("webglcontextlost",X,!1),t.addEventListener("webglcontextrestored",oe,!1),t.addEventListener("webglcontextcreationerror",ae,!1),_===null){const g="webgl2";if(_=ut(g,s),_===null)throw ut(g)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(s){throw console.error("THREE.WebGLRenderer: "+s.message),s}let De,we,me,Xe,he,d,a,b,z,K,G,pe,re,ce,Ne,Z,le,Me,xe,fe,Ie,be,ze,v;function te(){De=new $c(_),De.init(),be=new wf(_,De),we=new kc(_,De,n,be),me=new Uf(_,De),we.reverseDepthBuffer&&E&&me.buffers.depth.setReversed(!0),Xe=new Jc(_),he=new vf,d=new Df(_,De,me,he,we,be,Xe),a=new zc(m),b=new Kc(m),z=new io(_),ze=new Hc(_,z),K=new Zc(_,z,Xe,ze),G=new el(_,K,z,Xe),xe=new jc(_,we,d),Z=new Wc(he),pe=new mf(m,a,b,De,we,ze,Z),re=new Bf(m,he),ce=new Ef,Ne=new Rf(De),Me=new Gc(m,a,b,me,G,A,C),le=new Pf(m,G,we),v=new Gf(_,Xe,we,me),fe=new Vc(_,De,Xe),Ie=new Qc(_,De,Xe),Xe.programs=pe.programs,m.capabilities=we,m.extensions=De,m.properties=he,m.renderLists=ce,m.shadowMap=le,m.state=me,m.info=Xe}te();const y=new Of(m,_);this.xr=y,this.getContext=function(){return _},this.getContextAttributes=function(){return _.getContextAttributes()},this.forceContextLoss=function(){const s=De.get("WEBGL_lose_context");s&&s.loseContext()},this.forceContextRestore=function(){const s=De.get("WEBGL_lose_context");s&&s.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(s){s!==void 0&&(F=s,this.setSize(W,j,!1))},this.getSize=function(s){return s.set(W,j)},this.setSize=function(s,g,D=!0){if(y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=s,j=g,t.width=Math.floor(s*F),t.height=Math.floor(g*F),D===!0&&(t.style.width=s+"px",t.style.height=g+"px"),this.setViewport(0,0,s,g)},this.getDrawingBufferSize=function(s){return s.set(W*F,j*F).floor()},this.setDrawingBufferSize=function(s,g,D){W=s,j=g,F=D,t.width=Math.floor(s*D),t.height=Math.floor(g*D),this.setViewport(0,0,s,g)},this.getCurrentViewport=function(s){return s.copy(R)},this.getViewport=function(s){return s.copy(Le)},this.setViewport=function(s,g,D,I){s.isVector4?Le.set(s.x,s.y,s.z,s.w):Le.set(s,g,D,I),me.viewport(R.copy(Le).multiplyScalar(F).round())},this.getScissor=function(s){return s.copy(Ge)},this.setScissor=function(s,g,D,I){s.isVector4?Ge.set(s.x,s.y,s.z,s.w):Ge.set(s,g,D,I),me.scissor(q.copy(Ge).multiplyScalar(F).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(s){me.setScissorTest(Ze=s)},this.setOpaqueSort=function(s){_e=s},this.setTransparentSort=function(s){Se=s},this.getClearColor=function(s){return s.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(s=!0,g=!0,D=!0){let I=0;if(s){let S=!1;if(B!==null){const $=B.texture.format;S=$===or||$===sr||$===cr}if(S){const $=B.texture.type,ne=$===Nt||$===Jt||$===pn||$===Qt||$===lr||$===fr,se=Me.getClearColor(),de=Me.getClearAlpha(),Ae=se.r,Re=se.g,ve=se.b;ne?(O[0]=Ae,O[1]=Re,O[2]=ve,O[3]=de,_.clearBufferuiv(_.COLOR,0,O)):(L[0]=Ae,L[1]=Re,L[2]=ve,L[3]=de,_.clearBufferiv(_.COLOR,0,L))}else I|=_.COLOR_BUFFER_BIT}g&&(I|=_.DEPTH_BUFFER_BIT),D&&(I|=_.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),_.clear(I)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",X,!1),t.removeEventListener("webglcontextrestored",oe,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),Me.dispose(),ce.dispose(),Ne.dispose(),he.dispose(),a.dispose(),b.dispose(),G.dispose(),ze.dispose(),v.dispose(),pe.dispose(),y.dispose(),y.removeEventListener("sessionstart",Xn),y.removeEventListener("sessionend",Yn),Rt.stop()};function X(s){s.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),H=!0}function oe(){console.log("THREE.WebGLRenderer: Context Restored."),H=!1;const s=Xe.autoReset,g=le.enabled,D=le.autoUpdate,I=le.needsUpdate,S=le.type;te(),Xe.autoReset=s,le.enabled=g,le.autoUpdate=D,le.needsUpdate=I,le.type=S}function ae(s){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",s.statusMessage)}function Ce(s){const g=s.target;g.removeEventListener("dispose",Ce),Qe(g)}function Qe(s){at(s),he.remove(s)}function at(s){const g=he.get(s).programs;g!==void 0&&(g.forEach(function(D){pe.releaseProgram(D)}),s.isShaderMaterial&&pe.releaseShaderCache(s))}this.renderBufferDirect=function(s,g,D,I,S,$){g===null&&(g=je);const ne=S.isMesh&&S.matrixWorld.determinant()<0,se=Ar(s,g,D,I,S);me.setMaterial(I,ne);let de=D.index,Ae=1;if(I.wireframe===!0){if(de=K.getWireframeAttribute(D),de===void 0)return;Ae=2}const Re=D.drawRange,ve=D.attributes.position;let ye=Re.start*Ae,He=(Re.start+Re.count)*Ae;$!==null&&(ye=Math.max(ye,$.start*Ae),He=Math.min(He,($.start+$.count)*Ae)),de!==null?(ye=Math.max(ye,0),He=Math.min(He,de.count)):ve!=null&&(ye=Math.max(ye,0),He=Math.min(He,ve.count));const et=He-ye;if(et<0||et===1/0)return;ze.setup(S,I,se,D,de);let Je,Oe=fe;if(de!==null&&(Je=z.get(de),Oe=Ie,Oe.setIndex(Je)),S.isMesh)I.wireframe===!0?(me.setLineWidth(I.wireframeLinewidth*Ue()),Oe.setMode(_.LINES)):Oe.setMode(_.TRIANGLES);else if(S.isLine){let ge=I.linewidth;ge===void 0&&(ge=1),me.setLineWidth(ge*Ue()),S.isLineSegments?Oe.setMode(_.LINES):S.isLineLoop?Oe.setMode(_.LINE_LOOP):Oe.setMode(_.LINE_STRIP)}else S.isPoints?Oe.setMode(_.POINTS):S.isSprite&&Oe.setMode(_.TRIANGLES);if(S.isBatchedMesh)if(S._multiDrawInstances!==null)Lt("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Oe.renderMultiDrawInstances(S._multiDrawStarts,S._multiDrawCounts,S._multiDrawCount,S._multiDrawInstances);else if(De.get("WEBGL_multi_draw"))Oe.renderMultiDraw(S._multiDrawStarts,S._multiDrawCounts,S._multiDrawCount);else{const ge=S._multiDrawStarts,rt=S._multiDrawCounts,Ve=S._multiDrawCount,vt=de?z.get(de).bytesPerElement:1,Ot=he.get(I).currentProgram.getUniforms();for(let dt=0;dt<Ve;dt++)Ot.setValue(_,"_gl_DrawID",dt),Oe.render(ge[dt]/vt,rt[dt])}else if(S.isInstancedMesh)Oe.renderInstances(ye,et,S.count);else if(D.isInstancedBufferGeometry){const ge=D._maxInstanceCount!==void 0?D._maxInstanceCount:1/0,rt=Math.min(D.instanceCount,ge);Oe.renderInstances(ye,et,rt)}else Oe.render(ye,et)};function ke(s,g,D){s.transparent===!0&&s.side===Mt&&s.forceSinglePass===!1?(s.side=_t,s.needsUpdate=!0,tn(s,g,D),s.side=Zt,s.needsUpdate=!0,tn(s,g,D),s.side=Mt):tn(s,g,D)}this.compile=function(s,g,D=null){D===null&&(D=s),r=Ne.get(D),r.init(g),x.push(r),D.traverseVisible(function(S){S.isLight&&S.layers.test(g.layers)&&(r.pushLight(S),S.castShadow&&r.pushShadow(S))}),s!==D&&s.traverseVisible(function(S){S.isLight&&S.layers.test(g.layers)&&(r.pushLight(S),S.castShadow&&r.pushShadow(S))}),r.setupLights();const I=new Set;return s.traverse(function(S){if(!(S.isMesh||S.isPoints||S.isLine||S.isSprite))return;const $=S.material;if($)if(Array.isArray($))for(let ne=0;ne<$.length;ne++){const se=$[ne];ke(se,D,S),I.add(se)}else ke($,D,S),I.add($)}),r=x.pop(),I},this.compileAsync=function(s,g,D=null){const I=this.compile(s,g,D);return new Promise(S=>{function $(){if(I.forEach(function(ne){he.get(ne).currentProgram.isReady()&&I.delete(ne)}),I.size===0){S(s);return}setTimeout($,10)}De.get("KHR_parallel_shader_compile")!==null?$():setTimeout($,10)})};let mt=null;function Et(s){mt&&mt(s)}function Xn(){Rt.stop()}function Yn(){Rt.start()}const Rt=new Er;Rt.setAnimationLoop(Et),typeof self<"u"&&Rt.setContext(self),this.setAnimationLoop=function(s){mt=s,y.setAnimationLoop(s),s===null?Rt.stop():Rt.start()},y.addEventListener("sessionstart",Xn),y.addEventListener("sessionend",Yn),this.render=function(s,g){if(g!==void 0&&g.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;if(s.matrixWorldAutoUpdate===!0&&s.updateMatrixWorld(),g.parent===null&&g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),y.enabled===!0&&y.isPresenting===!0&&(y.cameraAutoUpdate===!0&&y.updateCamera(g),g=y.getCamera()),s.isScene===!0&&s.onBeforeRender(m,s,g,B),r=Ne.get(s,x.length),r.init(g),x.push(r),Ee.multiplyMatrices(g.projectionMatrix,g.matrixWorldInverse),k.setFromProjectionMatrix(Ee),ue=this.localClippingEnabled,J=Z.init(this.clippingPlanes,ue),l=ce.get(s,U.length),l.init(),U.push(l),y.enabled===!0&&y.isPresenting===!0){const $=m.xr.getDepthSensingMesh();$!==null&&gn($,g,-1/0,m.sortObjects)}gn(s,g,0,m.sortObjects),l.finish(),m.sortObjects===!0&&l.sort(_e,Se),$e=y.enabled===!1||y.isPresenting===!1||y.hasDepthSensing()===!1,$e&&Me.addToRenderList(l,s),this.info.render.frame++,J===!0&&Z.beginShadows();const D=r.state.shadowsArray;le.render(D,s,g),J===!0&&Z.endShadows(),this.info.autoReset===!0&&this.info.reset();const I=l.opaque,S=l.transmissive;if(r.setupLights(),g.isArrayCamera){const $=g.cameras;if(S.length>0)for(let ne=0,se=$.length;ne<se;ne++){const de=$[ne];Kn(I,S,s,de)}$e&&Me.render(s);for(let ne=0,se=$.length;ne<se;ne++){const de=$[ne];qn(l,s,de,de.viewport)}}else S.length>0&&Kn(I,S,s,g),$e&&Me.render(s),qn(l,s,g);B!==null&&N===0&&(d.updateMultisampleRenderTarget(B),d.updateRenderTargetMipmap(B)),s.isScene===!0&&s.onAfterRender(m,s,g),ze.resetDefaultState(),p=-1,f=null,x.pop(),x.length>0?(r=x[x.length-1],J===!0&&Z.setGlobalState(m.clippingPlanes,r.state.camera)):r=null,U.pop(),U.length>0?l=U[U.length-1]:l=null};function gn(s,g,D,I){if(s.visible===!1)return;if(s.layers.test(g.layers)){if(s.isGroup)D=s.renderOrder;else if(s.isLOD)s.autoUpdate===!0&&s.update(g);else if(s.isLight)r.pushLight(s),s.castShadow&&r.pushShadow(s);else if(s.isSprite){if(!s.frustumCulled||k.intersectsSprite(s)){I&&Te.setFromMatrixPosition(s.matrixWorld).applyMatrix4(Ee);const ne=G.update(s),se=s.material;se.visible&&l.push(s,ne,se,D,Te.z,null)}}else if((s.isMesh||s.isLine||s.isPoints)&&(!s.frustumCulled||k.intersectsObject(s))){const ne=G.update(s),se=s.material;if(I&&(s.boundingSphere!==void 0?(s.boundingSphere===null&&s.computeBoundingSphere(),Te.copy(s.boundingSphere.center)):(ne.boundingSphere===null&&ne.computeBoundingSphere(),Te.copy(ne.boundingSphere.center)),Te.applyMatrix4(s.matrixWorld).applyMatrix4(Ee)),Array.isArray(se)){const de=ne.groups;for(let Ae=0,Re=de.length;Ae<Re;Ae++){const ve=de[Ae],ye=se[ve.materialIndex];ye&&ye.visible&&l.push(s,ne,ye,D,Te.z,ve)}}else se.visible&&l.push(s,ne,se,D,Te.z,null)}}const $=s.children;for(let ne=0,se=$.length;ne<se;ne++)gn($[ne],g,D,I)}function qn(s,g,D,I){const S=s.opaque,$=s.transmissive,ne=s.transparent;r.setupLightsView(D),J===!0&&Z.setGlobalState(m.clippingPlanes,D),I&&me.viewport(R.copy(I)),S.length>0&&en(S,g,D),$.length>0&&en($,g,D),ne.length>0&&en(ne,g,D),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Kn(s,g,D,I){if((D.isScene===!0?D.overrideMaterial:null)!==null)return;r.state.transmissionRenderTarget[I.id]===void 0&&(r.state.transmissionRenderTarget[I.id]=new kt(1,1,{generateMipmaps:!0,type:De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float")?hn:Nt,minFilter:qt,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const $=r.state.transmissionRenderTarget[I.id],ne=I.viewport||R;$.setSize(ne.z*m.transmissionResolutionScale,ne.w*m.transmissionResolutionScale);const se=m.getRenderTarget();m.setRenderTarget($),m.getClearColor(Y),Q=m.getClearAlpha(),Q<1&&m.setClearColor(16777215,.5),m.clear(),$e&&Me.render(D);const de=m.toneMapping;m.toneMapping=At;const Ae=I.viewport;if(I.viewport!==void 0&&(I.viewport=void 0),r.setupLightsView(I),J===!0&&Z.setGlobalState(m.clippingPlanes,I),en(s,D,I),d.updateMultisampleRenderTarget($),d.updateRenderTargetMipmap($),De.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ve=0,ye=g.length;ve<ye;ve++){const He=g[ve],et=He.object,Je=He.geometry,Oe=He.material,ge=He.group;if(Oe.side===Mt&&et.layers.test(I.layers)){const rt=Oe.side;Oe.side=_t,Oe.needsUpdate=!0,$n(et,D,I,Je,Oe,ge),Oe.side=rt,Oe.needsUpdate=!0,Re=!0}}Re===!0&&(d.updateMultisampleRenderTarget($),d.updateRenderTargetMipmap($))}m.setRenderTarget(se),m.setClearColor(Y,Q),Ae!==void 0&&(I.viewport=Ae),m.toneMapping=de}function en(s,g,D){const I=g.isScene===!0?g.overrideMaterial:null;for(let S=0,$=s.length;S<$;S++){const ne=s[S],se=ne.object,de=ne.geometry,Ae=I===null?ne.material:I,Re=ne.group;se.layers.test(D.layers)&&$n(se,g,D,de,Ae,Re)}}function $n(s,g,D,I,S,$){s.onBeforeRender(m,g,D,I,S,$),s.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,s.matrixWorld),s.normalMatrix.getNormalMatrix(s.modelViewMatrix),S.onBeforeRender(m,g,D,I,s,$),S.transparent===!0&&S.side===Mt&&S.forceSinglePass===!1?(S.side=_t,S.needsUpdate=!0,m.renderBufferDirect(D,g,I,S,s,$),S.side=Zt,S.needsUpdate=!0,m.renderBufferDirect(D,g,I,S,s,$),S.side=Mt):m.renderBufferDirect(D,g,I,S,s,$),s.onAfterRender(m,g,D,I,S,$)}function tn(s,g,D){g.isScene!==!0&&(g=je);const I=he.get(s),S=r.state.lights,$=r.state.shadowsArray,ne=S.state.version,se=pe.getParameters(s,S.state,$,g,D),de=pe.getProgramCacheKey(se);let Ae=I.programs;I.environment=s.isMeshStandardMaterial?g.environment:null,I.fog=g.fog,I.envMap=(s.isMeshStandardMaterial?b:a).get(s.envMap||I.environment),I.envMapRotation=I.environment!==null&&s.envMap===null?g.environmentRotation:s.envMapRotation,Ae===void 0&&(s.addEventListener("dispose",Ce),Ae=new Map,I.programs=Ae);let Re=Ae.get(de);if(Re!==void 0){if(I.currentProgram===Re&&I.lightsStateVersion===ne)return Qn(s,se),Re}else se.uniforms=pe.getUniforms(s),s.onBeforeCompile(se,m),Re=pe.acquireProgram(se,de),Ae.set(de,Re),I.uniforms=se.uniforms;const ve=I.uniforms;return(!s.isShaderMaterial&&!s.isRawShaderMaterial||s.clipping===!0)&&(ve.clippingPlanes=Z.uniform),Qn(s,se),I.needsLights=Cr(s),I.lightsStateVersion=ne,I.needsLights&&(ve.ambientLightColor.value=S.state.ambient,ve.lightProbe.value=S.state.probe,ve.directionalLights.value=S.state.directional,ve.directionalLightShadows.value=S.state.directionalShadow,ve.spotLights.value=S.state.spot,ve.spotLightShadows.value=S.state.spotShadow,ve.rectAreaLights.value=S.state.rectArea,ve.ltc_1.value=S.state.rectAreaLTC1,ve.ltc_2.value=S.state.rectAreaLTC2,ve.pointLights.value=S.state.point,ve.pointLightShadows.value=S.state.pointShadow,ve.hemisphereLights.value=S.state.hemi,ve.directionalShadowMap.value=S.state.directionalShadowMap,ve.directionalShadowMatrix.value=S.state.directionalShadowMatrix,ve.spotShadowMap.value=S.state.spotShadowMap,ve.spotLightMatrix.value=S.state.spotLightMatrix,ve.spotLightMap.value=S.state.spotLightMap,ve.pointShadowMap.value=S.state.pointShadowMap,ve.pointShadowMatrix.value=S.state.pointShadowMatrix),I.currentProgram=Re,I.uniformsList=null,Re}function Zn(s){if(s.uniformsList===null){const g=s.currentProgram.getUniforms();s.uniformsList=fn.seqWithValue(g.seq,s.uniforms)}return s.uniformsList}function Qn(s,g){const D=he.get(s);D.outputColorSpace=g.outputColorSpace,D.batching=g.batching,D.batchingColor=g.batchingColor,D.instancing=g.instancing,D.instancingColor=g.instancingColor,D.instancingMorph=g.instancingMorph,D.skinning=g.skinning,D.morphTargets=g.morphTargets,D.morphNormals=g.morphNormals,D.morphColors=g.morphColors,D.morphTargetsCount=g.morphTargetsCount,D.numClippingPlanes=g.numClippingPlanes,D.numIntersection=g.numClipIntersection,D.vertexAlphas=g.vertexAlphas,D.vertexTangents=g.vertexTangents,D.toneMapping=g.toneMapping}function Ar(s,g,D,I,S){g.isScene!==!0&&(g=je),d.resetTextureUnits();const $=g.fog,ne=I.isMeshStandardMaterial?g.environment:null,se=B===null?m.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:_n,de=(I.isMeshStandardMaterial?b:a).get(I.envMap||ne),Ae=I.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,Re=!!D.attributes.tangent&&(!!I.normalMap||I.anisotropy>0),ve=!!D.morphAttributes.position,ye=!!D.morphAttributes.normal,He=!!D.morphAttributes.color;let et=At;I.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(et=m.toneMapping);const Je=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,Oe=Je!==void 0?Je.length:0,ge=he.get(I),rt=r.state.lights;if(J===!0&&(ue===!0||s!==f)){const ot=s===f&&I.id===p;Z.setState(I,s,ot)}let Ve=!1;I.version===ge.__version?(ge.needsLights&&ge.lightsStateVersion!==rt.state.version||ge.outputColorSpace!==se||S.isBatchedMesh&&ge.batching===!1||!S.isBatchedMesh&&ge.batching===!0||S.isBatchedMesh&&ge.batchingColor===!0&&S.colorTexture===null||S.isBatchedMesh&&ge.batchingColor===!1&&S.colorTexture!==null||S.isInstancedMesh&&ge.instancing===!1||!S.isInstancedMesh&&ge.instancing===!0||S.isSkinnedMesh&&ge.skinning===!1||!S.isSkinnedMesh&&ge.skinning===!0||S.isInstancedMesh&&ge.instancingColor===!0&&S.instanceColor===null||S.isInstancedMesh&&ge.instancingColor===!1&&S.instanceColor!==null||S.isInstancedMesh&&ge.instancingMorph===!0&&S.morphTexture===null||S.isInstancedMesh&&ge.instancingMorph===!1&&S.morphTexture!==null||ge.envMap!==de||I.fog===!0&&ge.fog!==$||ge.numClippingPlanes!==void 0&&(ge.numClippingPlanes!==Z.numPlanes||ge.numIntersection!==Z.numIntersection)||ge.vertexAlphas!==Ae||ge.vertexTangents!==Re||ge.morphTargets!==ve||ge.morphNormals!==ye||ge.morphColors!==He||ge.toneMapping!==et||ge.morphTargetsCount!==Oe)&&(Ve=!0):(Ve=!0,ge.__version=I.version);let vt=ge.currentProgram;Ve===!0&&(vt=tn(I,g,S));let Ot=!1,dt=!1,Xt=!1;const qe=vt.getUniforms(),pt=ge.uniforms;if(me.useProgram(vt.program)&&(Ot=!0,dt=!0,Xt=!0),I.id!==p&&(p=I.id,dt=!0),Ot||f!==s){me.buffers.depth.getReversed()?(ie.copy(s.projectionMatrix),Ir(ie),Nr(ie),qe.setValue(_,"projectionMatrix",ie)):qe.setValue(_,"projectionMatrix",s.projectionMatrix),qe.setValue(_,"viewMatrix",s.matrixWorldInverse);const st=qe.map.cameraPosition;st!==void 0&&st.setValue(_,Be.setFromMatrixPosition(s.matrixWorld)),we.logarithmicDepthBuffer&&qe.setValue(_,"logDepthBufFC",2/(Math.log(s.far+1)/Math.LN2)),(I.isMeshPhongMaterial||I.isMeshToonMaterial||I.isMeshLambertMaterial||I.isMeshBasicMaterial||I.isMeshStandardMaterial||I.isShaderMaterial)&&qe.setValue(_,"isOrthographic",s.isOrthographicCamera===!0),f!==s&&(f=s,dt=!0,Xt=!0)}if(S.isSkinnedMesh){qe.setOptional(_,S,"bindMatrix"),qe.setOptional(_,S,"bindMatrixInverse");const ot=S.skeleton;ot&&(ot.boneTexture===null&&ot.computeBoneTexture(),qe.setValue(_,"boneTexture",ot.boneTexture,d))}S.isBatchedMesh&&(qe.setOptional(_,S,"batchingTexture"),qe.setValue(_,"batchingTexture",S._matricesTexture,d),qe.setOptional(_,S,"batchingIdTexture"),qe.setValue(_,"batchingIdTexture",S._indirectTexture,d),qe.setOptional(_,S,"batchingColorTexture"),S._colorsTexture!==null&&qe.setValue(_,"batchingColorTexture",S._colorsTexture,d));const ht=D.morphAttributes;if((ht.position!==void 0||ht.normal!==void 0||ht.color!==void 0)&&xe.update(S,D,vt),(dt||ge.receiveShadow!==S.receiveShadow)&&(ge.receiveShadow=S.receiveShadow,qe.setValue(_,"receiveShadow",S.receiveShadow)),I.isMeshGouraudMaterial&&I.envMap!==null&&(pt.envMap.value=de,pt.flipEnvMap.value=de.isCubeTexture&&de.isRenderTargetTexture===!1?-1:1),I.isMeshStandardMaterial&&I.envMap===null&&g.environment!==null&&(pt.envMapIntensity.value=g.environmentIntensity),dt&&(qe.setValue(_,"toneMappingExposure",m.toneMappingExposure),ge.needsLights&&Rr(pt,Xt),$&&I.fog===!0&&re.refreshFogUniforms(pt,$),re.refreshMaterialUniforms(pt,I,F,j,r.state.transmissionRenderTarget[s.id]),fn.upload(_,Zn(ge),pt,d)),I.isShaderMaterial&&I.uniformsNeedUpdate===!0&&(fn.upload(_,Zn(ge),pt,d),I.uniformsNeedUpdate=!1),I.isSpriteMaterial&&qe.setValue(_,"center",S.center),qe.setValue(_,"modelViewMatrix",S.modelViewMatrix),qe.setValue(_,"normalMatrix",S.normalMatrix),qe.setValue(_,"modelMatrix",S.matrixWorld),I.isShaderMaterial||I.isRawShaderMaterial){const ot=I.uniformsGroups;for(let st=0,En=ot.length;st<En;st++){const Ct=ot[st];v.update(Ct,vt),v.bind(Ct,vt)}}return vt}function Rr(s,g){s.ambientLightColor.needsUpdate=g,s.lightProbe.needsUpdate=g,s.directionalLights.needsUpdate=g,s.directionalLightShadows.needsUpdate=g,s.pointLights.needsUpdate=g,s.pointLightShadows.needsUpdate=g,s.spotLights.needsUpdate=g,s.spotLightShadows.needsUpdate=g,s.rectAreaLights.needsUpdate=g,s.hemisphereLights.needsUpdate=g}function Cr(s){return s.isMeshLambertMaterial||s.isMeshToonMaterial||s.isMeshPhongMaterial||s.isMeshStandardMaterial||s.isShadowMaterial||s.isShaderMaterial&&s.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(s,g,D){he.get(s.texture).__webglTexture=g,he.get(s.depthTexture).__webglTexture=D;const I=he.get(s);I.__hasExternalTextures=!0,I.__autoAllocateDepthBuffer=D===void 0,I.__autoAllocateDepthBuffer||De.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),I.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(s,g){const D=he.get(s);D.__webglFramebuffer=g,D.__useDefaultFramebuffer=g===void 0};const br=_.createFramebuffer();this.setRenderTarget=function(s,g=0,D=0){B=s,P=g,N=D;let I=!0,S=null,$=!1,ne=!1;if(s){const de=he.get(s);if(de.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(_.FRAMEBUFFER,null),I=!1;else if(de.__webglFramebuffer===void 0)d.setupRenderTarget(s);else if(de.__hasExternalTextures)d.rebindTextures(s,he.get(s.texture).__webglTexture,he.get(s.depthTexture).__webglTexture);else if(s.depthBuffer){const ve=s.depthTexture;if(de.__boundDepthTexture!==ve){if(ve!==null&&he.has(ve)&&(s.width!==ve.image.width||s.height!==ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");d.setupDepthRenderbuffer(s)}}const Ae=s.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ne=!0);const Re=he.get(s).__webglFramebuffer;s.isWebGLCubeRenderTarget?(Array.isArray(Re[g])?S=Re[g][D]:S=Re[g],$=!0):s.samples>0&&d.useMultisampledRTT(s)===!1?S=he.get(s).__webglMultisampledFramebuffer:Array.isArray(Re)?S=Re[D]:S=Re,R.copy(s.viewport),q.copy(s.scissor),V=s.scissorTest}else R.copy(Le).multiplyScalar(F).floor(),q.copy(Ge).multiplyScalar(F).floor(),V=Ze;if(D!==0&&(S=br),me.bindFramebuffer(_.FRAMEBUFFER,S)&&I&&me.drawBuffers(s,S),me.viewport(R),me.scissor(q),me.setScissorTest(V),$){const de=he.get(s.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_CUBE_MAP_POSITIVE_X+g,de.__webglTexture,D)}else if(ne){const de=he.get(s.texture),Ae=g;_.framebufferTextureLayer(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,de.__webglTexture,D,Ae)}else if(s!==null&&D!==0){const de=he.get(s.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,de.__webglTexture,D)}p=-1},this.readRenderTargetPixels=function(s,g,D,I,S,$,ne){if(!(s&&s.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let se=he.get(s).__webglFramebuffer;if(s.isWebGLCubeRenderTarget&&ne!==void 0&&(se=se[ne]),se){me.bindFramebuffer(_.FRAMEBUFFER,se);try{const de=s.texture,Ae=de.format,Re=de.type;if(!we.textureFormatReadable(Ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!we.textureTypeReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}g>=0&&g<=s.width-I&&D>=0&&D<=s.height-S&&_.readPixels(g,D,I,S,be.convert(Ae),be.convert(Re),$)}finally{const de=B!==null?he.get(B).__webglFramebuffer:null;me.bindFramebuffer(_.FRAMEBUFFER,de)}}},this.readRenderTargetPixelsAsync=async function(s,g,D,I,S,$,ne){if(!(s&&s.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let se=he.get(s).__webglFramebuffer;if(s.isWebGLCubeRenderTarget&&ne!==void 0&&(se=se[ne]),se){const de=s.texture,Ae=de.format,Re=de.type;if(!we.textureFormatReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!we.textureTypeReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(g>=0&&g<=s.width-I&&D>=0&&D<=s.height-S){me.bindFramebuffer(_.FRAMEBUFFER,se);const ve=_.createBuffer();_.bindBuffer(_.PIXEL_PACK_BUFFER,ve),_.bufferData(_.PIXEL_PACK_BUFFER,$.byteLength,_.STREAM_READ),_.readPixels(g,D,I,S,be.convert(Ae),be.convert(Re),0);const ye=B!==null?he.get(B).__webglFramebuffer:null;me.bindFramebuffer(_.FRAMEBUFFER,ye);const He=_.fenceSync(_.SYNC_GPU_COMMANDS_COMPLETE,0);return _.flush(),await yr(_,He,4),_.bindBuffer(_.PIXEL_PACK_BUFFER,ve),_.getBufferSubData(_.PIXEL_PACK_BUFFER,0,$),_.deleteBuffer(ve),_.deleteSync(He),$}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(s,g=null,D=0){s.isTexture!==!0&&(Lt("WebGLRenderer: copyFramebufferToTexture function signature has changed."),g=arguments[0]||null,s=arguments[1]);const I=Math.pow(2,-D),S=Math.floor(s.image.width*I),$=Math.floor(s.image.height*I),ne=g!==null?g.x:0,se=g!==null?g.y:0;d.setTexture2D(s,0),_.copyTexSubImage2D(_.TEXTURE_2D,D,0,0,ne,se,S,$),me.unbindTexture()};const Pr=_.createFramebuffer(),Lr=_.createFramebuffer();this.copyTextureToTexture=function(s,g,D=null,I=null,S=0,$=null){s.isTexture!==!0&&(Lt("WebGLRenderer: copyTextureToTexture function signature has changed."),I=arguments[0]||null,s=arguments[1],g=arguments[2],$=arguments[3]||0,D=null),$===null&&(S!==0?(Lt("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),$=S,S=0):$=0);let ne,se,de,Ae,Re,ve,ye,He,et;const Je=s.isCompressedTexture?s.mipmaps[$]:s.image;if(D!==null)ne=D.max.x-D.min.x,se=D.max.y-D.min.y,de=D.isBox3?D.max.z-D.min.z:1,Ae=D.min.x,Re=D.min.y,ve=D.isBox3?D.min.z:0;else{const ht=Math.pow(2,-S);ne=Math.floor(Je.width*ht),se=Math.floor(Je.height*ht),s.isDataArrayTexture?de=Je.depth:s.isData3DTexture?de=Math.floor(Je.depth*ht):de=1,Ae=0,Re=0,ve=0}I!==null?(ye=I.x,He=I.y,et=I.z):(ye=0,He=0,et=0);const Oe=be.convert(g.format),ge=be.convert(g.type);let rt;g.isData3DTexture?(d.setTexture3D(g,0),rt=_.TEXTURE_3D):g.isDataArrayTexture||g.isCompressedArrayTexture?(d.setTexture2DArray(g,0),rt=_.TEXTURE_2D_ARRAY):(d.setTexture2D(g,0),rt=_.TEXTURE_2D),_.pixelStorei(_.UNPACK_FLIP_Y_WEBGL,g.flipY),_.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),_.pixelStorei(_.UNPACK_ALIGNMENT,g.unpackAlignment);const Ve=_.getParameter(_.UNPACK_ROW_LENGTH),vt=_.getParameter(_.UNPACK_IMAGE_HEIGHT),Ot=_.getParameter(_.UNPACK_SKIP_PIXELS),dt=_.getParameter(_.UNPACK_SKIP_ROWS),Xt=_.getParameter(_.UNPACK_SKIP_IMAGES);_.pixelStorei(_.UNPACK_ROW_LENGTH,Je.width),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,Je.height),_.pixelStorei(_.UNPACK_SKIP_PIXELS,Ae),_.pixelStorei(_.UNPACK_SKIP_ROWS,Re),_.pixelStorei(_.UNPACK_SKIP_IMAGES,ve);const qe=s.isDataArrayTexture||s.isData3DTexture,pt=g.isDataArrayTexture||g.isData3DTexture;if(s.isDepthTexture){const ht=he.get(s),ot=he.get(g),st=he.get(ht.__renderTarget),En=he.get(ot.__renderTarget);me.bindFramebuffer(_.READ_FRAMEBUFFER,st.__webglFramebuffer),me.bindFramebuffer(_.DRAW_FRAMEBUFFER,En.__webglFramebuffer);for(let Ct=0;Ct<de;Ct++)qe&&(_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,he.get(s).__webglTexture,S,ve+Ct),_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,he.get(g).__webglTexture,$,et+Ct)),_.blitFramebuffer(Ae,Re,ne,se,ye,He,ne,se,_.DEPTH_BUFFER_BIT,_.NEAREST);me.bindFramebuffer(_.READ_FRAMEBUFFER,null),me.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else if(S!==0||s.isRenderTargetTexture||he.has(s)){const ht=he.get(s),ot=he.get(g);me.bindFramebuffer(_.READ_FRAMEBUFFER,Pr),me.bindFramebuffer(_.DRAW_FRAMEBUFFER,Lr);for(let st=0;st<de;st++)qe?_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,ht.__webglTexture,S,ve+st):_.framebufferTexture2D(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,ht.__webglTexture,S),pt?_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,ot.__webglTexture,$,et+st):_.framebufferTexture2D(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,ot.__webglTexture,$),S!==0?_.blitFramebuffer(Ae,Re,ne,se,ye,He,ne,se,_.COLOR_BUFFER_BIT,_.NEAREST):pt?_.copyTexSubImage3D(rt,$,ye,He,et+st,Ae,Re,ne,se):_.copyTexSubImage2D(rt,$,ye,He,Ae,Re,ne,se);me.bindFramebuffer(_.READ_FRAMEBUFFER,null),me.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else pt?s.isDataTexture||s.isData3DTexture?_.texSubImage3D(rt,$,ye,He,et,ne,se,de,Oe,ge,Je.data):g.isCompressedArrayTexture?_.compressedTexSubImage3D(rt,$,ye,He,et,ne,se,de,Oe,Je.data):_.texSubImage3D(rt,$,ye,He,et,ne,se,de,Oe,ge,Je):s.isDataTexture?_.texSubImage2D(_.TEXTURE_2D,$,ye,He,ne,se,Oe,ge,Je.data):s.isCompressedTexture?_.compressedTexSubImage2D(_.TEXTURE_2D,$,ye,He,Je.width,Je.height,Oe,Je.data):_.texSubImage2D(_.TEXTURE_2D,$,ye,He,ne,se,Oe,ge,Je);_.pixelStorei(_.UNPACK_ROW_LENGTH,Ve),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,vt),_.pixelStorei(_.UNPACK_SKIP_PIXELS,Ot),_.pixelStorei(_.UNPACK_SKIP_ROWS,dt),_.pixelStorei(_.UNPACK_SKIP_IMAGES,Xt),$===0&&g.generateMipmaps&&_.generateMipmap(rt),me.unbindTexture()},this.copyTextureToTexture3D=function(s,g,D=null,I=null,S=0){return s.isTexture!==!0&&(Lt("WebGLRenderer: copyTextureToTexture3D function signature has changed."),D=arguments[0]||null,I=arguments[1]||null,s=arguments[2],g=arguments[3],S=arguments[4]||0),Lt('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(s,g,D,I,S)},this.initRenderTarget=function(s){he.get(s).__webglFramebuffer===void 0&&d.setupRenderTarget(s)},this.initTexture=function(s){s.isCubeTexture?d.setTextureCube(s,0):s.isData3DTexture?d.setTexture3D(s,0):s.isDataArrayTexture||s.isCompressedArrayTexture?d.setTexture2DArray(s,0):d.setTexture2D(s,0),me.unbindTexture()},this.resetState=function(){P=0,N=0,B=null,me.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Or}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorspace=tt._getDrawingBufferColorSpace(n),t.unpackColorSpace=tt._getUnpackColorSpace()}}export{Vf as W};
