var cyui = {}

cyui.Drawer = function (args) {
    console.log(args.trigger, 'xixi', document.querySelector(args.trigger))

    this.trigger = document.querySelector(args.trigger)
    this.content = document.querySelector(args.content)
    this.init()
    this.trigger.addEventListener('click', () => this.show())

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


}



