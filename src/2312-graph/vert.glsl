precision mediump float;

// https://threejs.org/docs/index.html#api/en/renderers/webgl/WebGLProgram
// default vertex attributes provided by BufferGeometry
// attribute vec3 position;
// attribute vec3 normal;
// attribute vec2 uv;

// = object.matrixWorld
// uniform mat4 modelMatrix;
// // = camera.matrixWorldInverse * object.matrixWorld
// uniform mat4 modelViewMatrix;
// // = camera.projectionMatrix
// uniform mat4 projectionMatrix;
// // = camera.matrixWorldInverse
// uniform mat4 viewMatrix;
// // = inverse transpose of modelViewMatrix
// uniform mat3 normalMatrix;
// // = camera position in world space
// uniform vec3 cameraPosition;

varying vec2 vUv;
varying vec3 vPosition;
varying vec4 vModelPosition;
varying vec4 vViewPosition;

void main() {
    vUv = uv;

    vec3 pos = position;
    vPosition = pos;

    vec4 mPosition = modelMatrix * vec4(pos, 1.0);

    vModelPosition = mPosition;
    vec4 vPosition = viewMatrix * mPosition;
    vViewPosition = vPosition;
    vPosition.y += sin(vPosition.x * 0.5 + vPosition.y * 0.3) + cos(vPosition.z);
    vec4 pPosition = projectionMatrix * vPosition;

    gl_Position = pPosition;
}