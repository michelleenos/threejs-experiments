import * as THREE from 'three'
import { ExpParams } from './231231'

const preset1: ExpParams = {
   clearColor: '#f2ebff',
   lightOptions: {
      ambient: {
         visible: true,
         intensity: 4.5,
         color: '#fafafa',
      },
      directional: {
         color: '#e5ffff',
         intensity: 5.8,
         visible: true,
         position: new THREE.Vector3(-150, -6, -30),
      },
      point: {
         color: '#29ffa2',
         intensity: 4.5,
         visible: true,
         position: new THREE.Vector3(-100, -124, -58),
         distance: 0,
         decay: 0.1,
      },
   },
   ringOptions: {
      innerPosY: 6,
      posY: 1,
      outerOpacity: 0.5,
      metalness: 0.36,
      roughness: 0.47,
      coneRadius: 7.6,
      coneHeight: 22,
      coneSegments: 100,
      ringRadius: 50,
      count: 18,
      wonkyShapeOptions: {
         vary: 0.2,
         radius: 3.7,
      },
      colorOpts: {
         red: { start: 0.22, end: 0.89, offset: -0.02 },
         green: { start: -0.37, end: 0.78, offset: -0.38 },
         blue: { start: 0.06, end: 0.97, offset: 1.42 },
      },
   },
   mirrorOptions: {
      mirrorColor: '#428a8a',
      screenColor: '#ffdbdb',
      screenRoughness: 0,
      screenMetalness: 0,
      screenOpacity: 0.4,
   },
}

const presetGreenblue: ExpParams = {
   clearColor: '#090f11',
   lightOptions: {
      ambient: {
         color: '#fafafa',
         visible: false,
      },
      directional: {
         visible: true,
         intensity: 4,
         color: '#ffffff',
         position: new THREE.Vector3(0, 10, 50),
      },
      point: {
         color: '#ffffff',
         visible: false,
      },
   },
   ringOptions: {
      colorOpts: {
         red: { start: 0, end: 0.3, offset: 1.19 },
         green: { start: 0.19, end: 0.89, offset: 0 },
         blue: { start: 0.19, end: 1.19, offset: 0.6 },
      },
   },
   mirrorOptions: {
      screenOpacity: 0.15,
      screenRoughness: 0.16,
      screenMetalness: 0.16,
      screenColor: '#ffffff',
      mirrorColor: '#ffffff',
   },
}

const presetAlien: ExpParams = {
   clearColor: 'ff7a7a',
   lightOptions: {
      ambient: {
         color: '#25ad6d',
         intensity: 5.6,
         visible: true,
      },
      directional: {
         visible: true,
         intensity: 5,
         color: '#ff0000',
         position: new THREE.Vector3(-50, -107, 7),
      },
      point: {
         color: '#8437ff',
         visible: false,
         position: new THREE.Vector3(-10, 80, 45),
         intensity: 9,
         distance: 0,
         decay: 0.1,
      },
   },
   ringOptions: {
      innerPosY: 6,
      posY: 1,
      outerOpacity: 0.3,
      metalness: 0.83,
      roughness: 0.34,
      coneRadius: 7.6,
      coneHeight: 22,
      coneSegments: 100,
      ringRadius: 50,
      count: 14,
      wonkyShapeOptions: {
         vary: 0.2,
         radius: 4,
         roughness: 0.5,
         metalness: 0.39,
         noiseAmount: 0.3,
         noiseSpeed: 0.001,
      },
      colorOpts: {
         red: {
            start: 0.34,
            end: 0,
            offset: 1,
         },
         green: {
            start: 1.15,
            end: 1,
            offset: 0,
         },
         blue: {
            start: 0,
            end: 0,
            offset: 0.51,
         },
      },
   },
   mirrorOptions: {
      mirrorColor: '#4b52b9',
      screenColor: '#ffffff',
      screenRoughness: 0.12,
      screenMetalness: 0.16,
      screenOpacity: 0.52,
   },
}

const presetDark: ExpParams = {
   clearColor: '#0c0911',
}

const presets = [presetDark, preset1, presetGreenblue, presetAlien]

export default presets
