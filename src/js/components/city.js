var cyui = {}
let startX
let endX
let transformNum = 0

cyui.City = function (args) {
    this.createDom()
    this.dom = document.querySelector(args.dom || args)
    this.show = false
    this.province = {}
    this.city = {}
    this.area = {}
    this.street = {}
    this.dom.querySelector('.cyui-input-input')?.addEventListener('click', () => this.showBox(true))
    document.querySelector('.cyui-input-close')?.addEventListener('click', () => this.showBox(false))
    document.querySelector('.cyui-input-ul-box')?.addEventListener('touchstart', e => this.scrollUlStart(e))
    document.querySelector('.cyui-input-ul-box')?.addEventListener('touchend', e => this.scrollUlEnd(e))
    document.querySelector('.cyui-input-ul-box')?.addEventListener('touchmove', e => this.scrollUlMove(e))
}

cyui.City.prototype = {
    /**
     * 创建插件所需节点
     * @param {Boolean} show 是否显示弹窗
     * @return {void}
     */
    createDom() {
        if (document.querySelector('.cyui-input-dialog') === null) {
            let contentNode = document.createElement('div')
            contentNode.setAttribute('class', 'cyui-input-dialog')
            contentNode.innerHTML = `
            <div class="cyui-input-box">
                <h3 class="cyui-input-title">请选择所在地区</h3>
                <div class="cyui-input-close">×</div>
                <div class="cyui-input-select"></div>
                <div class="cyui-input-card">
                    <div class="cyui-input-ul-box">
                        <ul class="cyui-input-ul" id="cyui-input-province"></ul>
                        <ul class="cyui-input-ul" id="cyui-input-city"></ul>
                        <ul class="cyui-input-ul" id="cyui-input-area"></ul>
                        <ul class="cyui-input-ul" id="cyui-input-street"></ul>
                    </div>
                </div>
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
            document.querySelector('.cyui-input-dialog').classList.add('on')
            setTimeout(() => {
                document.querySelector('.cyui-input-box').classList.add('on')
                this.setSelectValue()
            })
        } else {
            document.querySelector('.cyui-input-box').classList.remove('on')
            setTimeout(() => {
                document.querySelector('.cyui-input-dialog').classList.remove('on')
            }, 500)
        }
        this.showAddressList('province')
    },
    /**
     * 触摸开始事件，记录初始触摸位置
     * @param {Object} e 事件对象
     * @return {void}
     */
    scrollUlStart(e) {
        startX = e.touches[0].pageX
    },
    /**
     * 触摸结束事件，记录触摸结束位置，判断滑动方向
     * @param {Object} e 事件对象
     * @return {void}
     */
    scrollUlEnd(e) {
        endX = e.changedTouches[0].pageX
        if (endX > startX) {
            if (endX - startX > 80) {
                console.log('往右滑')
                if (transformNum === 0) {
                    this.toBox(transformNum)
                } else {
                    this.moveBox(0)
                }
            } else {
                this.toBox(transformNum)
            }
        } else if (endX < startX) {
            if (startX - endX > 80) {
                console.log('往左滑')
                let isChange = true
                if (transformNum === 0) {
                    if (!this.province.code) {
                        isChange = false
                    }
                }
                if (transformNum === 1) {
                    if (!this.city.code) {
                        isChange = false
                    }
                }
                if (transformNum === 2) {
                    if (!this.area.code) {
                        isChange = false
                    }
                    let indexStreet = address.street.findIndex(item => item.code.substr(0, 6) === this.area.code.substr(0, 6))
                    if (indexStreet <= -1) {
                        isChange = false
                    }
                }
                if (transformNum === 3) {
                    isChange = false
                }

                if (isChange) {
                    this.moveBox(1)
                } else {
                    this.toBox(transformNum)
                }
            } else {
                this.toBox(transformNum)
            }
        }
    },
    /**
     * 触摸事件，移动中
     * @param {Object} e 事件对象
     * @return {void}
     */
    scrollUlMove(e) {
        let boxLeft = (startX - e.touches[0].clientX) / document.documentElement.clientWidth * 100
        document.querySelector('.cyui-input-ul-box').setAttribute('style', 'transform:translateX(' + (-25 * transformNum - boxLeft / 4) + '%)')
    },
    /**
     * 滑动选择框
     * @param {Number} dir 1表示向右滑，0表示向左滑
     * @return {void}
     */
    moveBox(dir) {
        if (dir) {
            if (transformNum >= 3) {
                return
            }
            transformNum++
        } else {
            if (transformNum <= 0) {
                return
            }
            transformNum--
        }
        document.querySelector('.cyui-input-ul-box').style.transform = 'translateX(' + -25 * transformNum + '%)'
        this.setSelectValue()
    },
    /**
     * 跳转显示选择框
     * @param {Number} num 0,1,2,3表示要显示的页面
     * @return {void}
     */
    toBox(num) {
        transformNum = num
        document.querySelector('.cyui-input-ul-box').style.transform = 'translateX(' + -25 * transformNum + '%)'
        this.setSelectValue()
    },
    /**
     * 渲染省市区列表
     * @param {String} type province,city,area,street，分别表示省市区街道
     * @return {void}
     */
    showAddressList(type) {
        document.querySelector(`#cyui-input-${type}`).innerHTML = ''
        let findNum
        let typeParent
        switch (type) {
            case 'province':
                typeParent = 'province'
                break
            case 'city':
                findNum = 2
                typeParent = 'province'
                break
            case 'area':
                findNum = 4
                typeParent = 'city'
                break
            case 'street':
                findNum = 6
                typeParent = 'area'
                break
        }
        for (let o of address[type]) {
            if (type === 'province' || o.code.substr(0, findNum) === this[typeParent].code.substr(0, findNum)) {
                let contentNode = document.createElement('li')
                contentNode.innerText = o.desc
                contentNode.setAttribute('data-desc', o.desc)
                contentNode.setAttribute('data-code', o.code)
                if (this[type].code && this[type].code === o.code) {
                    contentNode.classList.add('on')
                }
                document.querySelector(`#cyui-input-${type}`).appendChild(contentNode)
            }
        }

        let domArr = document.querySelectorAll(`#cyui-input-${type} li`)
        for (let o of domArr) {
            o.onclick = e => this.clickRow(e, type)
        }
    },
    /**
     * 点击选择哪个省市区街道
     * @param {Object} e 事件对象
     * @param {String} type province,city,area,street，分别表示省市区街道
     * @return {void}
     */
    clickRow(e, type) {
        let domArr = document.querySelectorAll(`#cyui-input-${type} li`)
        for (let o of domArr) {
            o.classList.remove('on')
        }
        e.target.classList.add('on')

        if (!this[type].code || this[type].code !== e.target.dataset.code) {
            this[type] = {
                code: e.target.dataset.code,
                desc: e.target.dataset.desc
            }
            this.clearList(type)

        }

        switch (type) {
            case 'province':
                this.moveBox(1)
                this.setSelectValue()
                this.showAddressList('city')
                break
            case 'city':
                this.moveBox(1)
                this.setSelectValue()
                this.showAddressList('area')
                break
            case 'area':
                let indexStreet = address.street.findIndex(item => item.code.substr(0, 6) === this.area.code.substr(0, 6))
                this.setSelectValue()
                if (indexStreet > -1) {
                    this.moveBox(1)
                    this.showAddressList('street')
                } else {
                    this.showBox(false)
                    this.saveValue()
                }
                break
            case 'street':
                this.setSelectValue()
                this.showBox(false)
                this.saveValue()
                break
        }
    },
    /**
     * 点击选择哪个省市区街道
     * @param {Object} e 事件对象
     * @param {String} type province,city,area,street，分别表示省市区街道
     * @return {void}
     */
    clearList(type) {
        switch (type) {
            case 'province':
                this.city = {}
                this.area = {}
                this.street = {}
                document.querySelector('#cyui-input-city').innerHTML = ''
                document.querySelector('#cyui-input-area').innerHTML = ''
                document.querySelector('#cyui-input-street').innerHTML = ''
                break
            case 'city':
                this.area = {}
                this.street = {}
                document.querySelector('#cyui-input-area').innerHTML = ''
                document.querySelector('#cyui-input-street').innerHTML = ''
                break
            case 'area':
                this.street = {}
                document.querySelector('#cyui-input-street').innerHTML = ''
                break
        }
    },
    /**
     * 设置已选数据的显示
     * @return {void}
     */
    setSelectValue() {
        document.querySelector('.cyui-input-select').innerHTML = ''
        let resultStr = `<div class="cyui-input-sel-btn ${transformNum === 0 ? 'on' : ''}" data-index="0">${this.province.desc ? this.province.desc : '请选择'}</div>`
        if (transformNum >= 1 || this.province.desc) {
            resultStr += `<div class="cyui-input-sel-btn ${transformNum === 1 ? 'on' : ''}" data-index="1">${this.city.desc ? this.city.desc : '请选择'}</div>`
        }
        if (transformNum >= 2 || this.city.desc) {
            resultStr += `<div class="cyui-input-sel-btn ${transformNum === 2 ? 'on' : ''}" data-index="2">${this.area.desc ? this.area.desc : '请选择'}</div>`
        }
        if (transformNum >= 3 || this.area.desc) {
            let indexStreet = address.street.findIndex(item => item.code.substr(0, 6) === this.area.code.substr(0, 6))
            if (indexStreet > -1) {
                resultStr += `<div class="cyui-input-sel-btn ${transformNum === 3 ? 'on' : ''}" data-index="3">${this.street.desc ? this.street.desc : '请选择'}</div>`
            }
        }
        document.querySelector('.cyui-input-select').innerHTML = resultStr

        let btnArr = document.querySelectorAll('.cyui-input-select .cyui-input-sel-btn')
        for (let o of btnArr) {
            o.onclick = e => this.changeSelectTab(e)
        }
    },
    /**
    * 为已选择的结果添加事件
    * @param {Object} e 事件对象
    * @return {void}
    */
    changeSelectTab(e) {
        let num = parseInt(e.target.dataset.index)
        this.toBox(num)
    },
    /**
    * 保存地址选择的值
    * @param {Object} e 事件对象
    * @return {void}
    */
    saveValue() {
        let resultStr = this.province.desc ? this.province.desc : ''
        resultStr += this.city.desc ? this.city.desc : ''
        resultStr += this.area.desc ? this.area.desc : ''
        resultStr += this.street.desc ? this.street.desc : ''
        this.dom.querySelector('.cyui-input-input').innerHTML = resultStr
        this.dom.querySelector('.cyui-input-input').classList.add('on')
    }
}