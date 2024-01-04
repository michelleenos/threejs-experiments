import * as THREE from 'three'

export class ShaderUtils {
   renderer: THREE.WebGLRenderer
   scene: THREE.Scene
   camera: THREE.Camera
   object: THREE.Mesh

   constructor(
      renderer: THREE.WebGLRenderer,
      scene: THREE.Scene,
      camera: THREE.Camera,
      object: THREE.Mesh
   ) {
      this.renderer = renderer
      this.scene = scene
      this.camera = camera
      this.object = object
      this.renderer.compile(this.scene, this.camera) // Might be unnecessary, the shaders could already be compiled

      window.addEventListener(
         'keydown',
         (event) => {
            if (event.keyCode == 70) {
               // F
               // Utils.findAndOutputShader(renderer, object, 'fragmentShader', 'Fragment Shader');
               this.findAndOutputShader('fragmentShader', 'Fragment Shader')
            }
            if (event.keyCode == 86) {
               // V
               this.findAndOutputShader('vertexShader', 'Vertex Shader')
            }
         },
         false
      )
   }

   findAndOutputShader(shaderIdentifier: string, shaderName: string) {
      var programs = this.renderer.properties.get(this.object.material).programs
      for (var program of programs) {
         let shader = this.renderer.getContext().getShaderSource(program[1][shaderIdentifier])
         if (shader) this.outputShader(' ----' + shaderName + ' Code----', shader)
      }
   }

   outputShader(prefix: string, code: string) {
      code = code.replaceAll('\t', '  ')
      var lines = code.split('\n')
      var linedCode = ''
      var i = 1
      for (var line of lines) {
         linedCode += (i < 10 ? ' ' : '') + i + ':\t\t' + line + '\n'
         i++
      }

      var output = prefix + '\n' + linedCode
      console.log(output)
   }
}
