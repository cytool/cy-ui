// --- form ---
const form1 = `var v = new cyui.Form({
    dom: '#verfiyForm',
    tipSkin: 1, // 表单样式
    trigger: 'input', // 校验方式，实时
})`

const form2 = `var v2 = new cyui.Form({
    dom: '#verfiyForm2',
    tipSkin: 2, // 表单样式
    trigger: 'input', // 校验方式，实时
})`

window.addEventListener('load', () => {

    document.querySelector('#form1 code').innerHTML = Prism.highlight(form1, Prism.languages.javascript, 'javascript');
    document.querySelector('#form2 code').innerHTML = Prism.highlight(form2, Prism.languages.javascript, 'javascript');

})