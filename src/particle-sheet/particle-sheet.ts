import { ParticleSheetBase } from './particle-sheet-base'

import * as THREE from 'three'
import '../style.css'

const geoDefaults = {
   sheetWidth: 8,
   sheetHeight: 6,
   nx: 150,
   ny: 60,
}

const getGlsl = async (folder: string, file: string) => {
   return await import(`./glsl/${folder}/${file}.glsl`).then((m) => m.default)
}

const base = new ParticleSheetBase({
   key: 'particles',
   data: [
      {
         key: 'curlnoise',
         sheets: [
            {
               params: { ...geoDefaults },
               material: {
                  vertexShader: await getGlsl('curlnoise', 'vert'),
                  fragmentShader: await getGlsl('curlnoise', 'frag'),
                  uniforms: [
                     ['noiseIterations', 3, 1, 10, 1],
                     ['noiseFreq', 0.1, -1, 1, 0.001],
                     ['noiseAmp', 0.9, -2, 2, 0.001],
                     ['noiseSpeed', 0.05, -1, 1, 0.01],
                     ['waveFreq', new THREE.Vector2(1, 3), -5, 5, 0.01],
                     ['waveAmp', new THREE.Vector2(0.2, 0.5), -2, 2, 0.01],
                     ['waveSpeed', new THREE.Vector2(0.2, 0.5), -1, 1, 0.01],
                     ['scaleChangeAmt', 0.014, 0, 0.2, 0.001],
                     ['mixOklab', false],
                  ],
               },
            },
         ],
      },
      {
         key: 'snoise',
         sheets: [
            {
               params: {
                  sheetWidth: 8,
                  sheetHeight: 6,
                  nx: 150,
                  ny: 60,
               },
               material: {
                  vertexShader: await getGlsl('snoise', 'vert'),
                  fragmentShader: await getGlsl('snoise', 'frag'),
                  uniforms: [
                     ['targetPower', 2, -1, 5, 0.01],
                     ['noiseFreq', 0.5, 0, 1, 0.01],
                     ['noiseAmp', 0.8, 0, 1, 0.01],
                     ['noiseSpeed', 0.5, -2, 2, 0.01],
                     ['scaleChange', 0.1, 0, 0.5, 0.001],
                     ['mixOklab', false],
                     ['circleWaveFreq', 20, -40, 40, 1],
                     ['circleWaveSpeed', 0.5, -2, 2, 0.01],
                     ['circleWaveAmp', 2, -5, 5, 0.01],
                     ['alphaOffsetStart', 0.2, 0, 1, 0.01],
                     ['alphaOffsetEnd', 0.5, 0, 1, 0.01],
                     ['useMouse', false],
                  ],
               },
            },
         ],
      },
      {
         key: 'pnoise',
         sheets: [
            {
               params: {
                  sheetHeight: 5,
                  sheetWidth: 8,
                  nx: 75,
                  ny: 57,
                  position: new THREE.Vector3(0, 0, 0),
                  rotation: new THREE.Euler(-0.1, 0, 0),
               },
               colors: [
                  new THREE.Color('#FF8D25'),
                  new THREE.Color('#8C7B6F'),
                  new THREE.Color('#0067A7'),
               ],
               material: {
                  vertexShader: await getGlsl('pnoise', 'vert'),
                  fragmentShader: await getGlsl('pnoise', 'frag'),
                  uniforms: [
                     ['variant1', new THREE.Vector3(1.2, 3.4, 5.6), -10, 10, 0.1],
                     ['variant2', new THREE.Vector3(1.2, 3.4, 5.6), -10, 10, 0.1],
                     ['variant3', new THREE.Vector3(1.2, 3.4, 5.6), -10, 10, 0.1],
                     ['res1', 4.5, -10, 10, 0.1],
                     ['res2', 3.4, -10, 10, 0.1],
                     ['res3', 3.6, -10, 10, 0.1],
                     ['amt1', 0.25, -2, 2, 0.01],
                     ['amt2', 0.81, -2, 2, 0.01],
                     ['amt3', 0.39, -2, 2, 0.01],
                     ['speed', 0.5, -2, 2, 0.01],
                     ['alphaOffsetStart', 0.05, -1, 1, 0.01],
                     ['alphaOffsetEnd', 0.5, -1, 1, 0.01],
                     ['useSine', false],
                     ['useUvs', false],
                     ['scaleChange', 0.1, 0, 0.4, 0.001],
                     ['scaleBase', 0.1, 0, 0.3, 0.0001],
                  ],
               },
            },
         ],
      },
      {
         key: 'circles',
         sheets: [
            {
               params: {
                  sheetWidth: 5,
                  sheetHeight: 5,
                  nx: 350,
                  ny: 80,
                  rotation: new THREE.Euler(-1.41, 3.14, -Math.PI * 0.5),
                  position: new THREE.Vector3(0, 0, 0),
                  blending: {
                     default: THREE.NormalBlending,
                     controls: true,
                  },
               },
               material: {
                  vertexShader: await getGlsl('circles', 'vert1'),
                  fragmentShader: await getGlsl('circles', 'frag1'),
                  uniforms: [
                     ['scaleBase', 0.014, 0, 0.1, 0.0001],
                     // ['waves', 3, 0, 10, 0.1],
                     // ['waveAmount', 3, -10, 10, 0.1],
                     ['curve', 5.5, 0, 20, 0.1],
                     // ['radius', 5, 1, 20, 0.1],
                     ['petals', 7, 1, 10, 1],
                     ['amp', 0.5, 0, 5, 0.01],
                     ['zPow', 2, 0, 5, 0.01],
                     ['speed', 0.35, -2, 2, 0.01],
                     ['slice', 1, 0, 1, 0.1],
                     ['distortionFreq', 0.5, -5, 5, 0.1],
                     ['distortionAmp', 1, -5, 5, 0.1],
                     ['distortionSpeed', 0.5, -2, 2, 0.1],
                  ],
               },
               colors: [new THREE.Color('#8025ff'), new THREE.Color('#eac43b')],
            },
            {
               params: {
                  sheetWidth: 5,
                  sheetHeight: 5,
                  nx: 350,
                  ny: 80,
                  rotation: new THREE.Euler(-1.41, 3.14, Math.PI * 0.5),
                  position: new THREE.Vector3(0, 1, 0),
                  blending: {
                     default: THREE.NormalBlending,
                     controls: true,
                  },
               },
               material: {
                  vertexShader: await getGlsl('circles', 'vert1'),
                  fragmentShader: await getGlsl('circles', 'frag1'),
                  uniforms: [
                     ['scaleBase', 0.014, 0, 0.1, 0.0001],
                     ['curve', 5.5, 0, 20, 0.1],
                     ['petals', 7, 1, 10, 1],
                     ['amp', 0.5, 0, 5, 0.01],
                     ['zPow', 2, 0, 5, 0.01],
                     ['speed', 0.35, -2, 2, 0.01],
                     ['slice', 1, 0, 1, 0.1],
                     ['distortionFreq', 0.5, -5, 5, 0.1],
                     ['distortionAmp', 1, -5, 5, 0.1],
                     ['distortionSpeed', 0.5, -2, 2, 0.1],
                  ],
               },
               colors: [new THREE.Color('#8025ff'), new THREE.Color('#eac43b')],
            },
         ],
      },
      {
         key: 'ribbon',
         saveCamera: false,
         sheets: [
            {
               params: {
                  sheetWidth: 8,
                  sheetHeight: 4,
                  nx: 375,
                  ny: 30,
                  // rotation: new THREE.Euler(Math.PI * 0.4, 0, 0),
                  // position: new THREE.Vector3(0, 0.5, 0),
               },
               material: {
                  vertexShader: await getGlsl('ribbon', 'vert'),
                  fragmentShader: await getGlsl('ribbon', 'frag'),
                  uniforms: [
                     ['scaleBase', 0.02, 0, 1.5, 0.001],
                     ['variantY', 2, 0, 10, 0.1],
                     ['variantZ', 3, 0, 10, 0.1],
                     ['variantX', 4, 0, 10, 0.1],
                     ['freqY', 0.3, -2, 2, 0.1],
                     ['freqZ', 0.5, -2, 2, 0.1],
                     ['freqX', 0.5, -2, 2, 0.1],
                     ['speedY', 0.4, -2, 2, 0.1],
                     ['speedZ', 0.5, -2, 2, 0.1],
                     ['speedX', 0.5, -2, 2, 0.1],
                     ['ampX', 0.9, -2, 2, 0.1],
                     ['ampY', 0.9, -2, 2, 0.1],
                     ['ampZ', 0.2, -2, 2, 0.1],
                     ['space', 0.7, -3, 3, 0.1],
                     ['layersDiff', 3, -10, 10, 0.1],
                     ['rot', 1, -5, 5, 0.1],
                  ],
               },
               colors: [new THREE.Color('#ff2525'), new THREE.Color('#fbacff')],
            },
            // {
            //    params: {
            //       sheetWidth: 8,
            //       sheetHeight: 4,
            //       nx: 375,
            //       ny: 25,
            //       rotation: new THREE.Euler(Math.PI * 0.6, 0, 0),
            //       position: new THREE.Vector3(0, -0.5, 0),
            //    },
            //    material: {
            //       vertexShader: await getGlsl('ribbon', 'vert2'),
            //       fragmentShader: await getGlsl('ribbon', 'frag'),
            //       uniforms: [
            //          ['scaleBase', 0.02, 0, 1.5, 0.001],
            //          ['variantY', 2, 0, 10, 0.1],
            //          ['variantZ', 4.2, 0, 10, 0.1],
            //          ['freqY', -0.6, -2, 2, 0.1],
            //          ['freqZ', 0.5, -2, 2, 0.1],
            //          ['speedY', -0.2, -2, 2, 0.1],
            //          ['speedZ', 0.5, -2, 2, 0.1],
            //          ['ampY', 1.8, -2, 2, 0.1],
            //          ['ampZ', -1.2, -2, 2, 0.1],
            //          ['curveAmount', -1.5, -4, 4, 0.1],
            //       ],
            //    },
            //    colors: [new THREE.Color('#6625ff'), new THREE.Color('#ffd438')],
            // },
         ],
      },
   ],
})

base.useGui = true
base.createAll()
base.start()

console.log(base)
