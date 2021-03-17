const baseTable = `.cyui-table-container(data-border)
    .cyui-table
        .tr
            .th 姓名
            .th 性别
            .th 电话
            .th 地址
            .th 备注

        .tr
            .td 乌拉拉
            .td 男
            .td 12345678910
            .td 厦门创想中心
            .td 是一枚帅哥`


window.addEventListener('load', () => {

    document.querySelector('#base-table code').innerHTML = baseTable

})