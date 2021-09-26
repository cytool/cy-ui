
const drawer = `var d = new cyui.Drawer({
    trigger: '.menu', // 触发弹窗的按钮
    content: '.ui-drawer' // 弹窗内容
})`

window.addEventListener('load', () => {

    document.querySelector('#drawer code').innerHTML = Prism.highlight(drawer, Prism.languages.javascript, 'javascript')

})