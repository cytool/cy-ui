const data = [
    [
        {
            name: '全部商品',
            id: '11'
        },
        {
            name: '新款商品',
            id: '21'
        },
        {
            name: '活动商品',
            id: '31'
        },
        {
            name: '活动商品',
            id: '31'
        },
        {
            name: '活动商品',
            id: '31'
        }
    ],
    [
        {
            name: '默认排序',
            id: '21'
        },
        {
            name: '销量排序',
            id: '22'
        },
        {
            name: '好评排序',
            id: '23'
        }

    ]

    
]
var cyui = {};
cyui._DropDown = function (args) {
    this.dom = document.querySelector(args.dom || args);
    this.dropBox = this.dom.querySelector('.drop-box');
    this.createDom();
    this.dropList = this.dom.querySelectorAll('.drop-list');
    this.dropListItem = this.dom.querySelectorAll('.drop-list-item');
    this.dropItem = this.dropBox.children;
    this.show();
}

cyui._DropDown.prototype = {
    createDom() {
        let dropBox = this.dropBox;
        console.log(dropBox);
        data.forEach(function (item,index) {
            let div1 = document.createElement('div');
            div1.classList.add('drop-item');
            let div2 = document.createElement('div');
            div2.classList.add('drop-item-title');
            let ul = document.createElement('ul');
            ul.classList.add('drop-list');
            let dropItem = dropBox.appendChild(div1);
            // if (index == 0) {
            //     dropItem.classList.add('first');
            // }
            let dropListTitle = dropItem.appendChild(div2);
            dropListTitle.innerText = item[0].name;
            let dropList = dropItem.appendChild(ul);
    
            item.forEach(function (item,index) {
                let li = document.createElement('li');
                li.classList.add('drop-list-item')
                li.innerText = item.name
                if (index == 0) {
                    li.classList.add('active');
                }
                dropList.appendChild(li);
            }) 
        })
    },
    // 判断下拉列表下面的空间大小选择是否向上展开
    slider() {
        // 获取demo元素的高度
        let dropDemoTitle = document.querySelector('.demo-title').offsetHeight;
        let dropDemoItemOffsetHeight = this.dom.offsetHeight;
        let dropListOffsetHeight = 0;
        let moveHeight = 0;
        let screenHeight = document.body.offsetHeight;
        // console.log(screenHeight,'sssss');
        let distance = 0;
        let demoOffsetTop = this.dom.offsetTop;
        // 
        let dropList = [...this.dropList];
        // console.log(dropList);
        dropList.forEach(function (dL) {
            // 获取下拉列表的高度
            dropListOffsetHeight = dL.offsetHeight;
            // 下拉列表向上偏移的高度
            moveHeight = -(dropDemoTitle + dropListOffsetHeight);
            distance = screenHeight - (dropDemoItemOffsetHeight + demoOffsetTop);
            // console.log(distance,'ddddddd');
            // bottomDis = this.dom.getBoundingClientRect().top;
            // dL.classList.remove('show');
            if (distance < dL.offsetHeight) {
                dL.style.top = moveHeight + 'px';
            } else {
                dL.style.top = dropDemoItemOffsetHeight + 'px';
            }

        })
        setInterval(() => {
            this.slider();
        }, 1000);
    },
    
    show() {
        
        let dropBox = this.dropBox;
        let dropItem = [...this.dropItem];
        let dropList = [...this.dropList];
        let demo = document.querySelector('.demo');
        // let first = this.dropList[0];
        dropBox.addEventListener('click',function (e) {
            
            console.log(11111111111)
            if (e.target.className == 'drop-item') {
                var currentTarget = e.target;
            } else {
                currentTarget = e.target.parentElement;
            }


            dropItem.forEach(function (dI) {
                if(dI != currentTarget) {
                    dI.classList.remove('switch-icon');
                }
            })
            // 判断当前事件触发对象
            if (e.target.className == 'drop-item') {
                var currentDropList = e.target.querySelector('.drop-list');
                console.log(currentDropList,'cdl');
            } else {
                currentDropList = e.target.nextElementSibling;
                console.log(currentDropList,'title')
            }
            // if (currentDropList.parentElement.classList[1] != 'first') {

            // }
            dropItem.forEach(function (dI) {
                console.log(dI);
                if (dI != currentDropList.parentElement) {
                    // console.log(currentDropList.parentElement,'pppp');
                    dI.classList.remove('active');
                } 
            })
            dropList.forEach(function (dL) {
                if (dL != currentDropList) {
                    dL.classList.remove('show');
                }
                
            })
            // demo.classList.remove('mask');
            currentDropList.style.transition = "all 0.05s";
            currentDropList.classList.toggle('show');
            demo.classList.toggle('mask');
            currentDropList.parentElement.classList.toggle('active');
            currentDropList.parentElement.classList.toggle('swit-icon');
            // 阻止冒泡
            e.stopPropagation();
        },false)
        this.slider();
        this.active();
        
        
    },
    active() {
        // 循环每个下拉列表并为下拉列表下面的子元素节点添加点击高亮样式
        let dropList = [...this.dropList];
        let dropListItem = [...this.dropListItem];
        let html = document.documentElement;
        let demo = document.querySelector('.demo');
        console.log(dropListItem,'dLI');
        dropList.forEach(function (el) {
            el.addEventListener('click', function (e) {
                // dropListItem.forEach(function (dLI) {
                //     if (dLI != e.target) {
                //         dLI.classList.remove('active');

                //     }
                // })
                var currentDropItem = e.target.parentElement.parentElement;
                currentDropItem.classList.remove('swit-icon');
                var preNode = e.target.previousElementSibling;
                var nextNode = e.target.nextElementSibling;
                // 遍历当前元素前面的每一个元素兄弟节点并移除高亮样式
                while (preNode) {
                    preNode.classList.remove('active');
                    preNode = preNode.previousElementSibling; 
                } 
                // 遍历当前元素后面的每一个元素兄弟节点并移除高亮样式
                while (nextNode) {
                    nextNode.classList.remove('active');
                    nextNode = nextNode.nextElementSibling; 
                } 
                e.target.classList.add('active');
                console.log(e.target.parentElement,'ep')
                e.target.parentElement.classList.remove('show');
                e.target.parentElement.parentElement.classList.add('active');
                e.target.parentElement.previousElementSibling.innerText = e.target.innerText;
                // 取消向上冒泡
                e.stopPropagation();
                
            })
        })
        // 点击空白区域隐藏，注意前面的dropBox取消冒泡
        html.addEventListener('click', function () {
            dropList.forEach(function (dL) {
                dL.classList.remove('show');
                console.log(dL.parentElement,'ffffffff');
                // console.log(currentDropItem,'FFFFFFF')
                dL.parentElement.classList.remove('swit-icon');
                dL.parentElement.classList.remove('active');
                demo.classList.remove('mask');
            })
        })
       
    }
    

}



