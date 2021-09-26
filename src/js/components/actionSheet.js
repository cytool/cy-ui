var cyui = {}

cyui._Action = function (args) {
    this.createDom()
    this.dom = document.querySelector(args.dom || args)
    this.show = false
    this.dom.querySelector('.cyui-action-row').addEventListener('click', () => this.showBox(true))
    document.querySelector('.cyui-action-change').addEventListener('click', () => this.showBox(false))
    document.querySelector('.cyui-action-cancel').addEventListener('click', () => this.showBox(false))
    document.querySelector('.cyui-action-cancel').addEventListener('touchstart', e => this.touchStart(e))
    document.querySelector('.cyui-action-cancel').addEventListener('touchend', e => this.touchEnd(e))
    document.querySelector('.cyui-action-dialog').addEventListener('click', () => this.showBox(false))
    let domArr = document.querySelectorAll('.cyui-action-changeBox')
    console.log(domArr, "------DOMARR--------")
    
    for (let o of domArr) {
        console.log(o, "---------OOOOOOOO")
        o.addEventListener('touchstart', e => this.touchStart(e))
        o.addEventListener('touchend', e => this.touchEnd(e))
    }
}

cyui._Action.prototype = {
    /**
     * 创建插件所需节点
     * @param {Boolean} show 是否显示弹窗
     * @return {void}
     */
    createDom() {
        if (document.querySelector('.cyui-action-dialog') === null) {
            let contentNode = document.createElement('div')
            contentNode.setAttribute('class', 'cyui-action-dialog')
            contentNode.innerHTML = `
            <div class="cyui-action-box">
                <h3 class="cyui-action-txt">这是一段描述信息</h3>
                <div class="cyui-action-changeBox">
                    <div class="cyui-action-change">选项一</div>
                    <div class="cyui-action-change">选项二</div>
                    <div class="cyui-action-change">选项三
                        <div class="cyui-action-changetxt">描述信息</div>
                    </div>
                </div>
                <div class="cyui-action-bg"></div>
                <div class="cyui-action-cancel">取消</div>
            </div>
            `
            document.querySelector('body').appendChild(contentNode)
        }
    },
    /**
     * 点击弹出弹窗
     * @param {Boolean} show 是否显示弹窗
     * @return {void}
     */
    showBox(show) {
        this.show = show
        if (this.show) {
            document.querySelector('.cyui-action-dialog').classList.add('on')
            setTimeout(() => {
                document.querySelector('.cyui-action-box').classList.add('on')
            })
        } else {
            document.querySelector('.cyui-action-box').classList.remove('on')
            setTimeout(() => {
                document.querySelector('.cyui-action-dialog').classList.remove('on')
            }, 600)
        }
    },
    /**
     * @param {Object} evt 事件对象 
     * @return {void}
     */
    touchStart(evt) {
        console.log(evt, "鼠标点击开始------------")
        var c = evt.changedTouches[0].target
        console.log(c, "--------ccccccccc")
        // c.appendChild('changeOn');
        c.style.backgroundColor = "#f2f3f5"
    },
    touchEnd(evt) {
        var c = evt.changedTouches[0].target
        c.style.backgroundColor = "#fff"
    },
}