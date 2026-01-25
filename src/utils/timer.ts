import EventEmitter from './event-emitter'

export default class Timer extends EventEmitter {
    _rafId: number | null = null
    start: number
    current: number
    lastTime: number
    elapsed: number
    delta: number
    _fps = -1
    _interval = -1
    _accTime = 0

    constructor() {
        super()

        this.start = performance.now()
        this.current = this.start
        this.lastTime = this.start
        this.elapsed = 0
        this.delta = 16
        this._rafId = window.requestAnimationFrame(this.tick)
    }

    set fps(val: number) {
        if (val <= 0 && val !== -1) {
            console.warn('unusable fps value sent to timer', val)
            return
        }
        if (val === -1) {
            if (this._fps === -1) return

            this._fps = -1
            this._interval = -1
            this.stop()
            this._rafId = window.requestAnimationFrame(this.tick)
        } else {
            this._interval = 1000 / val
            this._fps = val
            this.stop()
            this._rafId = window.requestAnimationFrame(this.clampFpsTick)
        }
    }

    get fps() {
        return this._fps
    }

    tick = () => {
        const t = performance.now()
        this.delta = t - this.lastTime
        this.current = t
        this.elapsed = this.current - this.start
        this.lastTime = t

        this.trigger('tick')

        if (this._rafId) {
            this._rafId = window.requestAnimationFrame(this.tick)
        }
    }

    clampFpsTick = () => {
        const t = performance.now()
        const delta = t - this.lastTime
        this._accTime += delta
        while (this._accTime >= this._interval) {
            this._accTime -= this._interval
            this.delta = this._interval
            this.current = this.lastTime + this._interval
            this.elapsed = this.current - this.start
            this.trigger('tick')
        }
        this.lastTime = t
        if (this._rafId) {
            this._rafId = window.requestAnimationFrame(this.clampFpsTick)
        }
    }

    stop = () => {
        if (this._rafId) window.cancelAnimationFrame(this._rafId)
        this._rafId = null
    }
}
