import GUI from 'lil-gui'
import * as THREE from 'three'

export class GuiExtra extends GUI {
    addVec3<T>(
        object: T,
        property: keyof T,
        min?: number,
        max?: number,
        step?: number,
    ): GuiExtra {
        const val = object[property]
        if (!(val instanceof THREE.Vector3 || val instanceof THREE.Euler)) {
            throw new Error(
                `cannot do gui.addVec3 with property ${property.toString()}`,
            )
        }

        const fold = this.addFolder(property.toString())
        const vec3 = object[property] as THREE.Vector3 | THREE.Euler
        fold.add(vec3, 'x', min, max, step)
        fold.add(vec3, 'y', min, max, step)
        fold.add(vec3, 'z', min, max, step)
        return fold
    }

    addVec2<T>(
        object: T,
        property: keyof T,
        min?: number,
        max?: number,
        step?: number,
    ): GuiExtra {
        const val = object[property]
        if (!(val instanceof THREE.Vector2)) {
            throw new Error(
                `cannot do gui.addVec2 with property ${property.toString()}`,
            )
        }
        const fold = this.addFolder(property.toString())

        const vec2 = object[property] as THREE.Vector2
        fold.add(vec2, 'x', min, max, step)
        fold.add(vec2, 'y', min, max, step)
        return fold
    }

    override addFolder(title: string) {
        const newFolder = new GuiExtra({ title, parent: this })
        return newFolder
    }

    addThreeColor<T>(object: T, key: keyof T) {
        let color = object[key]
        if (!(color instanceof THREE.Color)) {
            throw new Error(`${key.toString()} is not a THREE.Color object`)
        }

        return this.addColor({ color: color.getHexString() }, 'color')
            .name(String(key))
            .onChange((val: string) => {
                color.setStyle(val)
            })
    }

    disable() {
        this.controllersRecursive().forEach((ctrl) => ctrl.disable())
        return this
    }

    listen() {
        this.controllersRecursive().forEach((c) => c.listen())
        return this
    }

    enable() {
        this.controllersRecursive().forEach((ctrl) => ctrl.enable())
        return this
    }

    decimals(decimals: number) {
        this.controllersRecursive().forEach((c) => c.decimals(decimals))
        return this
    }

    name(title: string) {
        this.title(title)
        return this
    }
}
