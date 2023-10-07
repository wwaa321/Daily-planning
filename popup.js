window.onload = function() {
    var currentDate = new Date();
    var new_date = currentDate.getDay();
    var dateString = currentDate.toLocaleDateString();
    var dateDiv = document.getElementById("dateDiv");
    dateDiv.innerHTML = currentDate.getFullYear() + "年" + (currentDate.getMonth() + 1) + "月";
    var dateday = document.getElementById("date-day");
    dateday.innerHTML = currentDate.getDate();
    //
    var deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            deleteItem(button);
        });
    });

    // 定义一个脚本来控制鼠标点击后的标签和标签内容的切换
    var tabs = document.querySelectorAll('.tabs li');
    var tabContent = document.querySelectorAll('.tab-content .tab-pane');
    var recipeList = document.getElementById('recipeList');
    tabs.forEach(function(tab, index) {
        tab.addEventListener('click', function() {
            // 从所有标签和标签内容中移除 'active' 类
            tabs.forEach(function(tab) {
                tab.classList.remove('active');
            });
            tabContent.forEach(function(content) {
                content.classList.remove('active');
            });

            // 将 'active' 类添加到被点击的标签和相应的标签内容
            tab.classList.add('active');
            tabContent[index].classList.add('active');
        });
    });



    document.getElementById('clearButton').addEventListener('click', function() {
        // 清除数据的逻辑
        localStorage.clear();
        location.reload();
    });

    function changeCount(item, change) {
        var count = localStorage.getItem(item) ? parseInt(localStorage.getItem(item)) : 0;
        count += change;
        if (count < 0) count = 0;
        localStorage.setItem(item, count);
        document.getElementById(item + 'Count').innerHTML = count;
    }
    window.onload = function() {
        ['water', 'tea', 'coffee'].forEach(function(item) {
            var count = localStorage.getItem(item) ? parseInt(localStorage.getItem(item)) : 0;
            document.getElementById(item + 'Count').innerHTML = count;
        });
    };
    
    // 定义食谱备选项目数组
    var grainItems = ['大米', '糙米', '燕麦', '荞麦面', '米粉'];
    var meatItems = ['鸡肉', '牛肉', '猪肉', '培根', '火腿', '羊肉', '虾', '三文鱼'];
    var vegMushroomItems = ['白菜', '胡萝卜', '茄子', '番茄', '圣女果', '西兰花', '彩椒', '辣椒', '菠菜', '南瓜', '黄瓜', '姜', '秋葵', '生菜', '白萝卜', '竹笋', '豆芽', '甘蓝', '土豆', '山药'];
    var fruitItems = ['草莓', '香蕉', '橙子', '葡萄', '甜瓜', '猕猴桃', '橘子', '柠檬', '菠萝', '蓝莓', '榴莲', '橄榄', '火龙果'];
    var nutItems = ['杏仁', '核桃', '榛子', '花生', '栗子', '松子', '南瓜子'];

    // 将食谱备选项目添加到相应的tab中
    function addItemsToTab(items, tabId) {
        var tab = document.getElementById(tabId);
        items.forEach(function(item) {
            var p = document.createElement('p');
            p.textContent = item;
            var button1 = document.createElement('button');
            button1.classList.add('button-1');
            button1.textContent = '+ 早餐';
            button1.onclick = function() { addItem('早餐', item); };
            var button2 = document.createElement('button');
            button2.classList.add('button-2');
            button2.textContent = '+ 午餐';
            button2.onclick = function() { addItem('午餐', item); };
            var button3 = document.createElement('button');
            button3.classList.add('button-3');
            button3.textContent = '+ 晚餐';
            button3.onclick = function() { addItem('晚餐', item); };
            tab.appendChild(p);
            tab.appendChild(button1);
            tab.appendChild(button2);
            tab.appendChild(button3);
        });
    }

    addItemsToTab(grainItems, 'grainList');
    addItemsToTab(meatItems, 'meatList');
    addItemsToTab(vegMushroomItems, 'vegMushroomList');
    addItemsToTab(fruitItems, 'fruitList');
    addItemsToTab(nutItems, 'nutList');

    function addItem(meal, item) {
        var list;
        if (meal === '早餐') {
            list = document.getElementById('breakfastList');
        } else if (meal === '午餐') {
            list = document.getElementById('lunchList');
        } else if (meal === '晚餐') {
            list = document.getElementById('dinnerList');
        }
        
        var newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.textContent = item;
        
        var deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = '删除';
        deleteButton.addEventListener('click', function() {
            deleteItem(deleteButton);
        });
        newItem.appendChild(deleteButton);
        
        newItem.style.display = 'flex';
        newItem.style.justifyContent = 'space-between';
        list.appendChild(newItem);
        
        // 存储到localStorage
        var items = JSON.parse(localStorage.getItem(meal)) || [];
        items.push(item);
        localStorage.setItem(meal, JSON.stringify(items));
    }
    
    function loadItem(meal, item) {
        var list;
        if (meal === '早餐') {
            list = document.getElementById('breakfastList');
        } else if (meal === '午餐') {
            list = document.getElementById('lunchList');
        } else if (meal === '晚餐') {
            list = document.getElementById('dinnerList');
        }
        
        var newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.textContent = item;
        newItem.setAttribute('data-item', item); // 添加自定义属性
        
        var deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = '删除';
        deleteButton.addEventListener('click', function() {
            deleteItem(deleteButton);
        });
        newItem.appendChild(deleteButton);
        
        newItem.style.display = 'flex';
        newItem.style.justifyContent = 'space-between';
        list.appendChild(newItem);
    }


    function deleteItem(button) {
        var item = button.parentNode;
        var list = item.parentNode;
        list.removeChild(item);
        
        // 从localStorage中删除对应的数据
        var meal = '';
        if (list.id === 'breakfastList') {
            meal = '早餐';
        } else if (list.id === 'lunchList') {
            meal = '午餐';
        } else if (list.id === 'dinnerList') {
            meal = '晚餐';
        }
        var items = JSON.parse(localStorage.getItem(meal)) || [];
        var itemText = item.getAttribute('data-item'); // 获取自定义属性的值
        var index = items.indexOf(itemText);
        if (index !== -1) {
            items.splice(index, 1);
        }
        localStorage.setItem(meal, JSON.stringify(items));
    }

  
    

//
document.getElementById('waterIncrementButton').addEventListener('click', function() {
    changeCount('water', 1);
});
document.getElementById('waterDecrementButton').addEventListener('click', function() {
    changeCount('water', -1);
});
// ...
    document.getElementById('teaIncrementButton').addEventListener('click', function() {
        changeCount('tea', 1);
    });
    document.getElementById('teaDecrementButton').addEventListener('click', function() {
        changeCount('tea', -1);
    });
    // ...
    document.getElementById('coffeeIncrementButton').addEventListener('click', function() {
        changeCount('coffee', 1);
    });
    document.getElementById('coffeeDecrementButton').addEventListener('click', function() {
        changeCount('coffee', -1);
    });



    // 从localStorage中恢复数据

    ['water', 'tea', 'coffee'].forEach(function(item) {
        var count = localStorage.getItem(item) ? parseInt(localStorage.getItem(item)) : 0;
        document.getElementById(item + 'Count').innerHTML = count;
    });

    ['早餐', '午餐', '晚餐'].forEach(function(meal) {
        var list = document.getElementById(meal.toLowerCase() + 'List');
        var savedItems = JSON.parse(localStorage.getItem(meal)) || [];
        savedItems.forEach(function(item) {
            loadItem(meal, item);
        });
    });
        
}