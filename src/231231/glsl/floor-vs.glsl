attribute vec3 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat4 textureMatrix;

varying vec4 vUv;

void main()  {
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
    vUv = textureMatrix * worldPosition;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}