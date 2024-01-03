precision highp float;

uniform sampler2D texture;
varying vec4 vUv;


void main() {
    vec4 projectorColor;
    projectorColor = texture2DProj(texture, vUv);

    gl_FragColor = projectorColor;
}
