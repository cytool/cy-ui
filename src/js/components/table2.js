const tableBase = attr => `.cyui-table-container(${attr})
    .cyui-table
        .tr
            .th 姓名
            .th 性别
            .th 地址
        .tr
            .td 乌拉拉
            .td 男
            .td 北京西城区中南海`


const tableScrollX = `.cyui-table-container
    .cyui-table(style='width: 150%')
        .tr
            .th 姓名
            .th 性别
            .th 地址
        .tr
            .td 乌拉拉
            .td 男
            .td 北京西城区中南海`


const tableScrollY = `.cyui-table-container(style='height: 250px')
    .cyui-table
        .tr
            .th 姓名
            .th 性别
            .th 地址
        .tr
            .td 乌拉拉
            .td 男
            .td 北京西城区中南海`


const tableFixColN = `.cyui-table-container(data-fixcol)
    .cyui-table
        .tr
            .th(data-fixcol-item, style='width: 50px; left: 0px') 姓名
            .th(data-fixcol-item, style='width: 50px; left: 50px') 性别
            .th 地址

        .tr                
            .td(data-fixcol-item, style='left: 0') 乌拉拉
            .td(data-fixcol-item, style='left: 50px') 男
            .td 北京西城区中南海

        .tr
            .td(data-fixcol-item, style='left: 0') 乌拉拉
            .td(data-fixcol-item, style='left: 50px') 男
            .td 北京西城区中南海`

const tableMergeRow = `.cyui-table-container(data-merge-row)
    .cyui-table
        .tr
            .th 姓名
            .th 性别
            .th(style='width: 60%') 地址
        .tr 
            .td(data-empty)
                .row(style='width: 40%') 合计
            .td(data-empty)
            .td 北京西城区中南海`

const tableMergeCol = `.cyui-table-container(data-merge-col)
    .cyui-table
        .tr
            .th 姓名
            .th(style='width: 15%') 性别
            .th 地址
            
        .tr
            .td 乌拉拉
            .td(data-empty)
                div(data-merge-item, style='width: 15%') 跨性别
            .td 北京西城区中南海 
        .tr
            .td 乌拉拉
            .td(data-empty)
            .td 北京西城区中南海`



window.addEventListener('load', () => {

    document.querySelector('#table-base code').innerHTML = tableBase('data-border')
    document.querySelector('#table-stripe code').innerHTML = tableBase('data-stripe')
    document.querySelector('#table-line-x code').innerHTML = tableBase('data-line-x')
    document.querySelector('#table-line-y code').innerHTML = tableBase('data-line-y')
    document.querySelector('#table-x code').innerHTML = tableScrollX
    document.querySelector('#table-y code').innerHTML = tableScrollY
    document.querySelector('#table-fixhead code').innerHTML = tableBase('data-fixhead')
    document.querySelector('#table-fixcol code').innerHTML = tableBase('data-fixcol')
    document.querySelector('#table-fixcol-2 code').innerHTML = tableFixColN
    document.querySelector('#table-merge-row code').innerHTML = tableMergeRow
    document.querySelector('#table-merge-col code').innerHTML = tableMergeCol

})