const AREADATA = [
    {
        name: '福建省',
        id: '111',
        children: [{
            name: '厦门市',
            id: '222',
            children:
                [{
                    name: '湖里区',
                    id: '333',
                    children:
                        [{
                            name: '金山街道',
                            id: '444'
                        },],
                },],
        },],
    },
    {
        name: '浙江省',
        id: '123',
        children: [{
            name: '杭州市',
            id: '234',
            children:
                [{
                    name: '余杭区',
                    id: '345',
                    children:
                        [{
                            name: '萧山街道',
                            id: '456'
                        },],
                },],
        },],
    },
];




var cyui = {}


cyui.City = function (args) {

    this.trigger = document.querySelector(args.trigger || args) // 触发弹窗的Node节点
    this.type = args.type || 'area' // 数据类型 ， 自定义数据展示 || 省市区
    this.data = args.data || AREADATA // 自定义数据
    this.title = args.title || '请选择所在地区'
    this.value = [] // 选中的值
    this.level = 4 // 层级，默认4级，自定义的话可以2-无限

    this.clientW = document.querySelector('body').clientWidth // resize重新计算，所以可以写这里
    this.showNum = 1 // 表示展示第几层，默认第一层（但是一般用来做取值的下标，需要减一： this.data[this.showNum - 1]
    this.touch = {
        touchX: false,  // 是否左右移动
        touchY: false // 是否上下滚动
    }
    this.trigger.addEventListener('click', () => this.init())
}

cyui.City.prototype = {

    init() {
        if (!!document.querySelector('.cyui-cascade-dialog')) return
        this.getLevel(this.data[0])
        this.createContainerNode()
        this.createCascadeSelectNode()
        this.insertDataNode()
        this.initEvent()
        this.showContainer()
    },

    /**
     * 获取数据层级（用于决定创建div数据容器个数
     * @param {Object} data 
     * @param {Number} n children的个数（累加
     * @returns 
     */
    getLevel(data, n = 1) {
        // todo: 这个阶段要判断数据是否合法
        let curData = data || this.data
        if (curData.children) {
            n += 1
            return this.getLevel(curData.children[0], n)
        }
        this.level = n

    },

    /**
     * 创建插件所需节点
     * @param {Boolean} show 是否显示弹窗
     * @return {void}
     */
    createContainerNode() {

        let contentNode = document.createElement('div')
        contentNode.classList.add('cyui-cascade-dialog')

        contentNode.innerHTML = `
            <div class='cyui-common-overlay'></div>
            <div class='cyui-cascade-box'>
                <div class='cyui-common-head'>
                    <h3 class='cyui-common-title'>${this.title}</h3>
                    <div class='cyui-common-close'></div>
                </div>
                <div class='cyui-cascade-select'></div>
                <div class='cyui-cascade-card'>
                    <div class='cyui-cascade-content'>
                        ${Array(this.level).fill("<ul class='cyui-cascade-item'></ul>").join('')}
                    </div>
                </div>
            </div>
            `
        document.querySelector('body').appendChild(contentNode)

    },

    /**
     * 创建选中后的显示节点
     * @param {Boolean} show 是否显示弹窗
     * @return {void}
     */
    createCascadeSelectNode() {
        for (let index = 0; index < this.showNum; index++) {
            const nodeSpan = document.createElement('span')
            nodeSpan.setAttribute('data-index', index)
            nodeSpan.setAttribute('data-label', '请选择')
            nodeSpan.innerHTML = '请选择'
            if (index == this.showNum - 1) nodeSpan.classList.add('on')
            document.querySelector('.cyui-cascade-select').appendChild(nodeSpan)
        }

    },

    insertDataNode(data) {
        let curData = data || this.data
        curData.forEach((item,) => {
            const nodeLi = document.createElement('li')
            nodeLi.setAttribute('data-name', item.name)
            nodeLi.setAttribute('data-id', item.id)
            nodeLi.innerHTML = item.name
            document.querySelectorAll('.cyui-cascade-item')[this.showNum - 1]?.appendChild(nodeLi)
        })
    },


    /**
     * 初始化事件
     * @return {void}
     */
    initEvent() {
        document.querySelector('.cyui-cascade-close')?.addEventListener('click', () => this.hideContainer())
        document.querySelector('.cyui-cascade-card')?.addEventListener('touchstart', e => this.touchStart(e))
        document.querySelector('.cyui-cascade-card')?.addEventListener('touchend', e => this.touchEnd(e))
        document.querySelector('.cyui-cascade-card')?.addEventListener('touchmove', e => this.touchMove(e))
        document.querySelector('.cyui-cascade-card')?.addEventListener('click', e => this.clickItem(e))

    },

    /**
     * 
     * @param {*} data 
     * @param {*} id 
     * @returns { Object || Boolean }
     */
    findChildren(id, data) {
        let curData = data || this.data
        let result = null
        for (let index = 0; index < curData.length; index++) {
            const item = curData[index]
            if (item.id === id) {
                result = item.children
                break
            } else if (result === null && item.children) {
                result = this.findChildren(id, item.children)
            }
        }
        return result
    },

    /**
     * 
     * @param {*} e 
     * @returns 
     */
    clickItem(e) {
        if (e.target.nodeName != 'LI') return
        e.target.classList.add('on')
        this.value[this.showNum - 1] = {
            name: e.target.dataset.name,
            id: e.target.dataset.id,
        }
        this.updateSelectNodeText()
        if (this.showNum >= this.level) return
        this.next(e.target.dataset.id)
    },

    clickNavItem(e) {

        // let index = 
    },

    /**
     * 切换到下一项
     */
    next(curId) {
        this.showNum += 1
        this.insertDataNode(this.findChildren(curId))
        this.createNextSelectNode()
        this.moveBox()
        this.updateSelectNodeLine()
    },

    /**
     * 更新当前选中节点的名字
     */
    updateSelectNodeText() {
        document.querySelector('.cyui-cascade-select').innerHTML = ''

        for (let index = 0; index < this.value.length; index++) {
            const nodeSpan = document.createElement('span')
            nodeSpan.setAttribute('data-label', this.value[index]?.name)
            nodeSpan.innerHTML = this.value[index]?.name
            if (this.showNum - 1 == index) nodeSpan.classList.add('on')
            document.querySelector('.cyui-cascade-select').appendChild(nodeSpan)
        }
    },

    updateSelectNodeLine() {
        let selectAll = document.querySelectorAll('.cyui-cascade-select span')
        console.log(selectAll, '123', this.showNum)
        selectAll.forEach(item => item.classList.remove('on'))
        selectAll[this.showNum - 1].classList.add('on')
    },

    /**
     * 
     */
    createNextSelectNode() {
        // if (this.showNum >= this.level) return
        const nodeSpan = document.createElement('span')
        nodeSpan.setAttribute('data-label', '请选择')
        nodeSpan.innerHTML = '请选择'
        nodeSpan.classList.add('on')
        document.querySelector('.cyui-cascade-select').appendChild(nodeSpan)
    },

    moveBox() {
        document.querySelector('.cyui-cascade-content').style.transform = `translateX(-${this.showNum - 1}00%)`
    },



    /**
     * 点击弹出弹窗
     * @param {Boolean} show 是否显示弹窗
     * @return {void}
     */

    showContainer() {
        document.querySelector('.cyui-cascade-dialog').classList.add('on')
        document.querySelector('.cyui-cascade-box').classList.add('on')
    },
    hideContainer() {
        document.querySelector('.cyui-cascade-dialog').classList.remove('on')
        document.querySelector('.cyui-cascade-box').classList.remove('on')
    },


    /**
     * 触摸开始事件，记录初始触摸位置
     * @param {Object} e 事件对象
     * @return {void}
     */
    touchStart(e) {
        this.touch.startX = e.touches[0].pageX
        this.touch.startY = e.touches[0].pageY
        this.touch.startTime = +new Date
    },
    /**
     * 触摸结束事件，记录触摸结束位置，判断滑动方向
     * @param {Object} e 事件对象
     * @return {void}
     */
    touchEnd(e) {
        // if (this.showNum <= 1) return
        let endTime = +new Date
        let endX = e.changedTouches[0].pageX
        let distanceX = this.touch.startX - endX // 移动距离
        let directionX = distanceX >= 0 ? 1 : -1 // 移动方向 

        if (Math.abs(distanceX) < this.clientW / 3) {
            if (Math.abs(distanceX) < 30) return
            if (endTime - this.touch.startTime > 300) return
        }

        this.showNum += directionX
        this.moveBox()
        this.touch.touchY = false
    },
    /**
     * 触摸事件，移动中
     * @param {Object} e 事件对象
     * @return {void}
     */
    touchMove(e) {
        if (this.touch.touchY) return
        this.touch.moveY = e.touches[0].clientY - this.touch.startY
        this.touch.moveX = e.touches[0].clientX - this.touch.startX
        console.log('Y:', Math.abs(this.touch.moveY), '   X: ', Math.abs(this.touch.moveX), this.touch.touchY)
        if (Math.abs(this.touch.moveY) > Math.abs(this.touch.moveX) - 8) { // 8相当于小于45度角滑动
            this.touch.touchY = true
        } else {
            this.touch.touchX = true
            e.preventDefault()
            e.stopPropagation()
        }
    },

}