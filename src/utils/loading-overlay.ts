import * as THREE from 'three'

const createElement = (
    tag: string,
    atts: { [key: string]: any } = {},
    children: (string | Element)[] = []
) => {
    const el = document.createElement(tag)
    Object.keys(atts).forEach((key) => {
        el.setAttribute(key, atts[key])
    })
    children.forEach((child) => {
        el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child)
    })
    return el
}

type LoaderStylesOptions = {
    barColor?: string
    bgColor?: string
}
const loaderStyles = ({ barColor = '#ff8a2b', bgColor = '#000000' }: LoaderStylesOptions = {}) => `
.loader__bar {
   position: fixed;
   z-index: 100;
   width: 100%;
   height: 10px;
   background: ${barColor};
   left: 0;
   bottom: 0;
   transition: transform 0.5s ease-out; 
   transform-origin: left;
   transform: scaleX(0);
}

.loader__cover {
   position: fixed;
   z-index: 99;
   width: 100%;
   height: 100%;
   background: ${bgColor};
   left: 0;
   top: 0;
   transition: opacity 0.7s ease-in-out;
}

.loader--finished .loader__bar,
.loader--finished .loader__cover {
   pointer-events: none;
}
.loader--finished .loader__bar {
   transition: transform 0.4s linear;
}
`

type LoaderOpts = {
    onReady?: () => void
    styles?: LoaderStylesOptions
}

export default class Loader {
    manager: THREE.LoadingManager
    cover: HTMLElement
    bar: HTMLElement
    container: HTMLElement
    style: HTMLElement
    onReady?: () => any

    constructor({ onReady, styles }: LoaderOpts = {}) {
        this.onReady = onReady
        this.manager = new THREE.LoadingManager(this.onFinished, this.onProgress)

        this.bar = createElement('div', { class: 'loader__bar' })
        this.cover = createElement('div', { class: 'loader__cover' })
        this.container = createElement('div', { class: 'loader' }, [this.bar, this.cover])
        this.style = createElement('style', {}, [loaderStyles(styles)])
        document.body.append(this.container, this.style)
    }

    onFinished = () => {
        window.setTimeout(() => {
            this.cover.style.opacity = '0'
            if (this.onReady) this.onReady()
        }, 1000)

        window.setTimeout(() => {
            this.bar.style.transformOrigin = 'right'
            this.bar.style.transform = 'scaleX(0)'
        }, 800)

        this.container.classList.add('loader--finished')
    }

    onProgress = (_: any, itemsLoaded: number, itemsTotal: number) => {
        const progress = itemsLoaded / itemsTotal
        this.bar.style.transform = `scaleX(${progress})`
    }
}
