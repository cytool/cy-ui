var regRules = {

    /**
     * 验证不是数字的规则
     */
    notNum: /[^\d]{1,}/igu,

    /**
     * 大陆手机号码规则
     */
    phone: /^1[3-9]\d{9}$/igu,

    /**
     * 身份证件号规则
     */
    idCode: /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/u,

    /**
     * 电子邮箱规则
     */
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/u,

    /**
     * 银行卡号规则
     */
    bankCode: /^([1-9]{1})(\d{15}|\d{18})$/u,

}


// 1. 设置了required则表示不能为空, 另外如果输入框有值则都需要校验规则
// 2. data-verify=‘addr’ 验证哪条规则， 某些规则会限制输入，有些只会失去焦点时候校验
// 3. 自定义验证规则data-verify=‘c-addr’，加个前缀
// 4. 通过 data-form-submit 触发整体校验



var errType = {
    empty: '必填项',
    phone: '手机号位数不对'
}

var cyui = {}

// args = { String | Object }
cyui.Form = function (args) {

    this.tipSkin = args.tipSkin || 1
    this.dom = document.querySelector(args.dom || args)
    this.dom.addEventListener('input', e => this.input(e))
    this.dom.addEventListener('blur', e => this.blur(e), true) // 往上冒泡
    this.dom.querySelector('[data-submit]')?.addEventListener('click', e => this.submit())

}
cyui.Form.prototype = {

    // 提交验证
    submit: function (e) {

    },

    input: function (e) {
        e.target.value = e.target.value.replace(regRules.notNum, '')
        this.removeErr(e)
    },
    blur: function (e) {
        console.log(e, 'blur', this)

        // 验证失败
        if (e.target.nodeName != 'INPUT') return

        var value = e.target.value.trim()
        var required = e.target.dataset.required
        var verify = e.target.dataset.verify

        // 是否需要验证非空
        if (required !== undefined) {
            if (this.verifyRequired(value)) {
                return this.addErr(e, 'empty')
            }
        }

        // 验证规则
        if (verify) {

            if (required === undefined && !value) {
                // 非必填且为空
                return
            }

            // 判断是否是自定义规则
            if (!this.verifyRule(value, verify)) {
                this.addErr(e, 'phone')
            }
        }

    },

    // 验证是否为空
    verifyRequired: function (value) {
        return !value
    },

    // 验证规则
    verifyRule: function (value, type) {
        return regRules[type].test(value)
    },

    // 添加/删除错误提示
    addErr: function (e, type) {
        var errDom = e.target.closest('.ui-form-item').querySelector('.ui-input-err')
        var parentBox = e.target.closest('.ui-input-content').classList
        parentBox.add('ui-input-content-err')
        if (errDom) return

        var insertParentName = this.tipSkin === 1 ? '.ui-input-box' : '.ui-form-item'
        var parent = e.target.closest(insertParentName)
        var err = document.createElement('div')
        err.classList.add('ui-input-err')
        err.innerHTML = errType[type]
        parent.appendChild(err)
    },

    removeErr: function (e) {
        var errDom = e.target.closest('.ui-form-item').querySelector('.ui-input-err')
        var parentBox = e.target.closest('.ui-input-content').classList
        if (errDom) errDom.remove()
        parentBox.remove('ui-input-content-err')
    },

    /** 清除所有提示 **/
    clearErr: function (e) {
        this.dom.querySelectorAll('.ui-input-err').forEach(item => {
            item.closest('.ui-input-content').classList.remove('ui-input-content-err')
            item.remove()
        })
    },

    switchSkin() {
        this.clearErr()
        this.tipSkin = this.tipSkin == 1 ? 2 : 1
    }
}


