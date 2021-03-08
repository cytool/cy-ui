var cyui = {}

var startTime = null
var startX = 0

cyui.Drawer = function (args) {
    

    this.trigger = document.querySelector(args.trigger)
    this.content = document.querySelector(args.content)
    this.init()
    this.trigger.addEventListener('click', () => this.show())

    
    this.content.querySelector('.ui-drawer-close').addEventListener('touchstart',()=> this.touchStart(event))
    this.content.querySelector('.ui-drawer-close').addEventListener('touchmove',()=> this.touchmove(event))
    this.content.querySelector('.ui-drawer-close').addEventListener('touchend',()=> this.touchend(event))
}

cyui.Drawer.prototype = {
    
    init() {

        this.content.classList.add('ui-drawer')
        var contentNode = document.createElement('div')
        contentNode.classList.add('ui-drawer-content')

        var childNodes = this.content.childNodes
        if (childNodes) {
            var copyNodes = []
            childNodes.forEach(item => {
                if (item.nodeType === 1) copyNodes.push(item)
            })

            copyNodes.forEach(item => contentNode.appendChild(item))
        }

        this.content.appendChild(contentNode)

        var closeNode = document.createElement('div')
        closeNode.classList.add('ui-drawer-close')
        this.content.appendChild(closeNode)

        this.initEvent()


    },

    initEvent() {
        this.content.querySelector('.ui-drawer-close').addEventListener('click', () => this.close())
    },

    show() {
        this.content.classList.add('ui-drawer-open')
    },

    close() {
        this.content.classList.remove('ui-drawer-open')
    },

    touchStart(event) {
        
        // 开始触摸时间
        startTime = new Date()
        // 手指开始的落点
        startX = event.changedTouches[0].clientX
        console.log(startX,'touchStart')
    },

    touchmove(event) {
        // 位差
        var dx = event.changedTouches[0].clientX - startX
        if (dx > 0) {
            this.content.querySelector('.ui-drawer-content').setAttribute('style','transform:translateX('+dx+'px)')
        }
        
        console.log(Math.abs(dx),dx,'touchmove')
    },

    touchend(event) {
        
        // 位差
        var dx = event.changedTouches[0].clientX - startX
        // 时差 css('transform','translateX('+dx+')')
        var dTime = Date.now() - startTime
        // 屏幕宽
        var contentWidth = this.content.querySelector('.ui-drawer-content').offsetWidth

        if (Math.abs(dx) > contentWidth / 3 || (dTime < 300 && Math.abs(dx) > 30)) {
            if (dx > 0) {
                console.log('touchend')
                this.close()
                this.content.querySelector('.ui-drawer-content').removeAttribute('style')
            }else {
                return
            }
        } else {
            this.show()
            this.content.querySelector('.ui-drawer-content').removeAttribute('style')
        }
    }


}



