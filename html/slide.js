/**
 * Created by Aaron on 2017/11/14.
 */
;(function() {
    class Slide {
        constructor(idName) {
            let t = this
            this.main = document.getElementById(idName)
            this.width = document.getElementById(idName).offsetWidth
            this.count = document.getElementById(idName).childElementCount
            this.box = []
            this.nowslide = {nowPage: 0, nowPX: 0}
            for (let i = 0; i < this.count; i++) {
                this.box.push({nowPage: i, nowPX: -i * this.width})
            }
            this.initSlide = () => {
                let slides = document.getElementsByClassName('slide-page')
                let mouse = false
                for (let i = 0; i < slides.length; i++) {
                    slides[i].style.cssText = 'width:' + this.width + 'px;float:left;height:100%;' + slides[i].style.cssText
                }
                let inner = this.main.innerHTML
                this.main.innerHTML = '<div style="width: ' + this.count + "00%" + ';height: 300px;left: 0;position:relative;">' + inner + '</div>'
                let pointX_start, pointX_end
                this.main.addEventListener('touchstart', touchstart, true)
                this.main.addEventListener('touchend', touchend, true)
                this.main.addEventListener('touchmove', touchmove, true)
                this.main.addEventListener('mousedown', mousedown, true)
                this.main.addEventListener('mouseup', mouseup, true)
                this.main.addEventListener('mousemove', mousemove, true)
                function mousedown(event) {
                    mouse = true
                    pointX_start = event.screenX
                }

                function mouseup(event) {
                    pointX_end = event.screenX
                    mouse = false
                    if (parseInt(pointX_end) - parseInt(pointX_start) > 50) {
                        t.last()
                    } else if (parseInt(pointX_end) - parseInt(pointX_start) < -50) {
                        t.next()
                    } else {
                        t.reset()
                    }
                }

                function mousemove(event) {
                    if (!mouse) return
                    let a = t.box[t.nowslide.nowPage].nowPX + event.screenX - pointX_start
                    let page = document.getElementById(idName).firstElementChild
                    page.style.left = a + 'px'
                }

                function touchstart(event) {
                    pointX_start = event.changedTouches[0].screenX
                }

                function touchmove(event) {
                    let a = t.box[t.nowslide.nowPage].nowPX + event.changedTouches[0].screenX - pointX_start
                    let page = document.getElementById(idName).firstElementChild
                    page.style.left = a + 'px'
                }

                function touchend(event) {
                    pointX_end = event.changedTouches[0].screenX
                    if (parseInt(pointX_end) - parseInt(pointX_start) > 50) {
                        t.last()
                    } else if (parseInt(pointX_end) - parseInt(pointX_start) < -50) {
                        t.next()
                    } else {
                        t.reset()
                    }
                }
            }
            this.last = () => {
                let a
                let page = document.getElementById(idName).firstElementChild
                if (this.nowslide.nowPage === 0) {
                    page.style.transition = 'all .3s'
                    this.reset()
                } else {
                    page.style.transition = 'all .3s'
                    a = this.box[this.nowslide.nowPage - 1].nowPX
                    page.style.left = a + 'px'
                    this.nowslide.nowPX = this.box[this.nowslide.nowPage - 1].nowPX
                    this.nowslide.nowPage = this.box[this.nowslide.nowPage - 1].nowPage
                    setTimeout(function () {
                        page.style.transition = 'none'
                    }, 300)
                }
            }
            this.next = () => {
                let a
                let page = document.getElementById(idName).firstElementChild
                if (this.nowslide.nowPage === this.box.length - 1) {
                    page.style.transition = 'all .3s'
                    this.reset()
                } else {
                    page.style.transition = 'all .3s'
                    a = this.box[this.nowslide.nowPage + 1].nowPX
                    page.style.left = a + 'px'
                    this.nowslide.nowPX = this.box[this.nowslide.nowPage + 1].nowPX
                    this.nowslide.nowPage = this.box[this.nowslide.nowPage + 1].nowPage
                    setTimeout(function () {
                        page.style.transition = 'none'
                    }, 300)
                }
            }
            this.reset = () => {
                let a = this.box[this.nowslide.nowPage].nowPX
                let page = document.getElementById(idName).firstElementChild
                page.style.left = a + 'px'
                setTimeout(function () {
                    page.style.transition = 'none'
                }, 300)
            }
        }
    }
    this.Slide = Slide;
})()