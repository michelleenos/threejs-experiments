precision mediump float;

// uniform mat4 viewMatrix;
// uniform vec3 cameraPosition;

// attribute vec2 uv;
varying vec2 vUv;
varying vec3 vPosition;
varying vec4 vModelPosition;
varying vec4 vViewPosition;

void main() {
    gl_FragColor = vec4(0.3, 0.1, 0.5, 1.0);
    
    #include <colorspace_fragment>
}
