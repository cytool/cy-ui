"use strict";var tableBase=function(t){return".cyui-table-container(".concat(t,")\n    .cyui-table\n        .tr\n            .th 姓名\n            .th 性别\n            .th 地址\n        .tr\n            .td 乌拉拉\n            .td 男\n            .td 北京西城区中南海")},tableScrollX=".cyui-table-container\n    .cyui-table(style='width: 150%')\n        .tr\n            .th 姓名\n            .th 性别\n            .th 地址\n        .tr\n            .td 乌拉拉\n            .td 男\n            .td 北京西城区中南海",tableScrollY=".cyui-table-container(style='height: 250px')\n    .cyui-table\n        .tr\n            .th 姓名\n            .th 性别\n            .th 地址\n        .tr\n            .td 乌拉拉\n            .td 男\n            .td 北京西城区中南海",tableFixColN=".cyui-table-container(data-fixcol)\n    .cyui-table\n        .tr\n            .th(data-fixcol-item, style='width: 50px; left: 0px') 姓名\n            .th(data-fixcol-item, style='width: 50px; left: 50px') 性别\n            .th 地址\n\n        .tr                \n            .td(data-fixcol-item, style='left: 0') 乌拉拉\n            .td(data-fixcol-item, style='left: 50px') 男\n            .td 北京西城区中南海\n\n        .tr\n            .td(data-fixcol-item, style='left: 0') 乌拉拉\n            .td(data-fixcol-item, style='left: 50px') 男\n            .td 北京西城区中南海",tableMergeRow=".cyui-table-container(data-merge-row)\n    .cyui-table\n        .tr\n            .th 姓名\n            .th 性别\n            .th(style='width: 60%') 地址\n        .tr \n            .td(data-empty)\n                div(data-merge-item, style='width: 40%') 合计\n            .td(data-empty)\n            .td 北京西城区中南海",tableMergeCol=".cyui-table-container(data-merge-col)\n    .cyui-table\n        .tr\n            .th 姓名\n            .th(style='width: 15%') 性别\n            .th 地址\n            \n        .tr\n            .td 乌拉拉\n            .td(data-empty)\n                div(data-merge-item, style='width: 15%') 跨性别\n            .td 北京西城区中南海 \n        .tr\n            .td 乌拉拉\n            .td(data-empty)\n            .td 北京西城区中南海";window.addEventListener("load",function(){document.querySelector("#table-base code").innerHTML=Prism.highlight(tableBase("data-border"),Prism.languages.pug,"pug"),document.querySelector("#table-stripe code").innerHTML=Prism.highlight(tableBase("data-stripe"),Prism.languages.pug,"pug"),document.querySelector("#table-line-x code").innerHTML=Prism.highlight(tableBase("data-line-x"),Prism.languages.pug,"pug"),document.querySelector("#table-line-y code").innerHTML=Prism.highlight(tableBase("data-line-y"),Prism.languages.pug,"pug"),document.querySelector("#table-x code").innerHTML=Prism.highlight(tableScrollX,Prism.languages.pug,"pug"),document.querySelector("#table-y code").innerHTML=Prism.highlight(tableScrollY,Prism.languages.pug,"pug"),document.querySelector("#table-fixhead code").innerHTML=Prism.highlight(tableBase("data-fixhead"),Prism.languages.pug,"pug"),document.querySelector("#table-fixcol code").innerHTML=Prism.highlight(tableBase("data-fixcol"),Prism.languages.pug,"pug"),document.querySelector("#table-fixcol-2 code").innerHTML=Prism.highlight(tableFixColN,Prism.languages.pug,"pug"),document.querySelector("#table-merge-row code").innerHTML=Prism.highlight(tableMergeRow,Prism.languages.pug,"pug"),document.querySelector("#table-merge-col code").innerHTML=Prism.highlight(tableMergeCol,Prism.languages.pug,"pug")});