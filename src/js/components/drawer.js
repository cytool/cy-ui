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
        var childNodes = this.content.childNodes
        var copyNodes = []
        childNodes.forEach(item => {
            if (item.nodeType === 1) copyNodes.push(item)
        })
        this.content.classList.add('ui-drawer')

        var closeNode = document.createElement('div')
        closeNode.classList.add('ui-drawer-close')
        this.content.appendChild(closeNode)

        var contentNode = document.createElement('div')
        contentNode.classList.add('ui-drawer-content')
        copyNodes.forEach(item => contentNode.appendChild(item))
        this.content.appendChild(contentNode)

    },

    show() {
        this.content.classList.add('ui-drawer-open')
    },

    close() {
        this.content.classList.remove('ui-drawer-open')
    },


}



