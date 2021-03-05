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
}

cyui.City.prototype = {
    /**
     * 创建插件所需节点
     * @param {Boolean} show 是否显示弹窗
     * @return {void}
     */
    createDom() {
        if(document.querySelector('.cyui-input-dialog') === null) {
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
    showBox: function (show) {
        this.show = show
        if (this.show) {
            document.querySelector('.cyui-input-dialog').classList.add('on')
            setTimeout(() => {
                document.querySelector('.cyui-input-box').classList.add('on')
            })
        } else {
            document.querySelector('.cyui-input-box').classList.remove('on')
            setTimeout(() => {
                document.querySelector('.cyui-input-dialog').classList.remove('on')
            }, 500)
        }
        this.showProvince()
    },
    /**
     * 触摸开始事件，记录初始触摸位置
     * @param {Object} e 事件对象
     * @return {void}
     */
    scrollUlStart(e) {
        console.log(e)
        startX = e.touches[0].pageX
    },
    /**
     * 触摸结束事件，记录触摸结束位置，判断滑动方向
     * @param {Object} e 事件对象
     * @return {void}
     */
    scrollUlEnd(e) {
        console.log(e)
        endX = e.changedTouches[0].pageX
        if (endX > startX) {
            if (endX - startX > 100) {
                console.log('往右滑')
                this.moveBox(0)
            }
        } else if (endX < startX) {
            if (startX - endX > 100) {
                console.log('往左滑')
                console.log(transformNum)
                if (transformNum === 0) {
                    if (!this.province.code) {
                        return
                    }
                }
                if (transformNum === 1) {
                    if (!this.city.code) {
                        return
                    }
                }
                if (transformNum === 2) {
                    if (!this.area.code) {
                        return
                    }
                    let indexStreet = address.street.findIndex(item => item.code.substr(0, 6) === this.area.code.substr(0, 6))
                    if (indexStreet <= -1) {
                        return
                    }
                }
                this.moveBox(1)
            }
        }
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
    },
    /**
     * 渲染省列表
     * @return {void}
     */
    showProvince: function () {
        document.querySelector('#cyui-input-province').innerHTML = ''
        for (let o of address.province) {
            let contentNode = document.createElement('li')
            contentNode.innerText = o.desc
            contentNode.setAttribute('data-desc', o.desc)
            contentNode.setAttribute('data-code', o.code)
            if (this.province.code && this.province.code === o.code) {
                contentNode.classList.add('on')
            }
            document.querySelector('#cyui-input-province').appendChild(contentNode)
        }

        let provinceArr = document.querySelectorAll('#cyui-input-province li')
        for (let o of provinceArr) {
            o.onclick = e => this.clickProvince(e)
        }
    },
    /**
     * 渲染市列表
     * @return {void}
     */
    showCity() {
        document.querySelector('#cyui-input-city').innerHTML = ''
        for (let o of address.city) {
            if (o.code.substr(0, 2) === this.province.code.substr(0, 2)) {
                let contentNode = document.createElement('li')
                contentNode.innerText = o.desc
                contentNode.setAttribute('data-desc', o.desc)
                contentNode.setAttribute('data-code', o.code)
                if (this.city.code && this.city.code === o.code) {
                    contentNode.classList.add('on')
                }
                document.querySelector('#cyui-input-city').appendChild(contentNode)
            }
        }

        let provinceArr = document.querySelectorAll('#cyui-input-city li')
        for (let o of provinceArr) {
            o.onclick = e => this.clickCity(e)
        }
    },
    /**
    * 渲染县列表
    * @return {void}
    */
    showArea() {
        document.querySelector('#cyui-input-area').innerHTML = ''
        for (let o of address.area) {
            if (o.code.substr(0, 4) === this.city.code.substr(0, 4)) {
                let contentNode = document.createElement('li')
                contentNode.innerText = o.desc
                contentNode.setAttribute('data-desc', o.desc)
                contentNode.setAttribute('data-code', o.code)
                if (this.area.code && this.area.code === o.code) {
                    contentNode.classList.add('on')
                }
                document.querySelector('#cyui-input-area').appendChild(contentNode)
            }
        }

        let provinceArr = document.querySelectorAll('#cyui-input-area li')
        for (let o of provinceArr) {
            o.onclick = e => this.clickArea(e)
        }
    },
    /**
     * 渲染镇列表
     * @return {void}
     */
    showStreet() {
        document.querySelector('#cyui-input-street').innerHTML = ''
        for (let o of address.street) {
            if (o.code.substr(0, 6) === this.area.code.substr(0, 6)) {
                let contentNode = document.createElement('li')
                contentNode.innerText = o.desc
                contentNode.setAttribute('data-desc', o.desc)
                contentNode.setAttribute('data-code', o.code)
                if (this.street.code && this.street.code === o.code) {
                    contentNode.classList.add('on')
                }
                document.querySelector('#cyui-input-street').appendChild(contentNode)
            }
        }

        let provinceArr = document.querySelectorAll('#cyui-input-street li')
        for (let o of provinceArr) {
            o.onclick = e => this.clickStreet(e)
        }
    },
    /**
     * 点击选择哪个省
     * @param {Object} e 事件对象
     * @return {void}
     */
    clickProvince(e) {
        console.log(e.target.dataset.code)
        console.log(e.target.dataset.desc)
        let provinceArr = document.querySelectorAll('#cyui-input-province li')
        for (let o of provinceArr) {
            o.classList.remove('on')
        }
        e.target.classList.add('on')

        if (!this.province.code || this.province.code !== e.target.dataset.code) {
            this.province = {
                code: e.target.dataset.code,
                desc: e.target.dataset.desc
            }
            this.city = {}
            this.area = {}
            this.street = {}
        }

        this.setSelectValue()
        this.moveBox(1)
        this.showCity()
    },
    /**
     * 点击选择哪个市
     * @param {Object} e 事件对象
     * @return {void}
     */
    clickCity(e) {
        console.log(e.target.dataset.code)
        console.log(e.target.dataset.desc)
        let cityArr = document.querySelectorAll('#cyui-input-city li')
        for (let o of cityArr) {
            o.classList.remove('on')
        }
        e.target.classList.add('on')

        if (!this.city.code || this.city.code !== e.target.dataset.code) {
            this.city = {
                code: e.target.dataset.code,
                desc: e.target.dataset.desc
            }
            this.area = {}
            this.street = {}
        }

        this.setSelectValue()
        this.moveBox(1)
        this.showArea()
    },
    /**
    * 点击选择哪个县
    * @param {Object} e 事件对象
    * @return {void}
    */
    clickArea(e) {
        console.log(e.target.dataset.code)
        console.log(e.target.dataset.desc)
        let areaArr = document.querySelectorAll('#cyui-input-area li')
        for (let o of areaArr) {
            o.classList.remove('on')
        }
        e.target.classList.add('on')

        if (!this.area.code || this.area.code !== e.target.dataset.code) {
            this.area = {
                code: e.target.dataset.code,
                desc: e.target.dataset.desc
            }
            this.street = {}
        }

        this.setSelectValue()
        let indexStreet = address.street.findIndex(item => item.code.substr(0, 6) === this.area.code.substr(0, 6))
        if (indexStreet > -1) {
            this.moveBox(1)
            this.showStreet()
        } else {
            this.showBox(false)
            this.saveValue()
        }
    },
    /**
    * 点击选择哪个镇
    * @param {Object} e 事件对象
    * @return {void}
    */
    clickStreet(e) {
        console.log(e.target.dataset.code)
        console.log(e.target.dataset.desc)
        let streetArr = document.querySelectorAll('#cyui-input-street li')
        for (let o of streetArr) {
            o.classList.remove('on')
        }
        e.target.classList.add('on')
        this.street = {
            code: e.target.dataset.code,
            desc: e.target.dataset.desc
        }
        this.setSelectValue()
        this.showBox(false)
        this.saveValue()
    },
    /**
     * 设置已选数据的显示
     * @return {void}
     */
    setSelectValue() {
        let resultStr = this.province.desc ? this.province.desc : ''
        resultStr += this.city.desc ? this.city.desc : ''
        resultStr += this.area.desc ? this.area.desc : ''
        resultStr += this.street.desc ? this.street.desc : ''
        if (resultStr.length > 0) {
            document.querySelector('.cyui-input-select').innerHTML = resultStr
            document.querySelector('.cyui-input-select').style.display = 'block'
        } else {
            document.querySelector('.cyui-input-select').style.display = 'none'
        }
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