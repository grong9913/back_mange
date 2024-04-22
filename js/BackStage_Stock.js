document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:5193/api/Back/ItemUpdate", { credentials: 'include' })
        .then(response => {
            if (!response.ok) {
                throw new Error('伺服器回應錯誤');
            }
            return response.json();
        })
        .then(data => {
            const table = document.querySelector('table');
            //table.innerHTML = '';
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
                <th>新增日期</th>
                <th>商品名稱</th>
                <th>儲存空間</th>
                <th>顏色</th>
                <th>庫存</th>
                <th>單價</th>
                <th>操作</th>
            `;
            table.appendChild(headerRow);
            data.Message.forEach((order, index)=>{
                let count = 0;
                const tr = document.createElement('tr');
                tr.className = "Item"
                const CreateTime = document.createElement('td');
                CreateTime.textContent = formatDateTime(order.CreateTime);
                const ItemName = document.createElement('td');
                ItemName.textContent = order.ItemName;
                tr.appendChild(CreateTime);
                tr.appendChild(ItemName);
                table.appendChild(tr);
                order.Format.forEach(item=>{
                    let count2 = 0;
                    const Space = document.createElement('td');
                    Space.textContent = item.Space;
                    
                    item.info.forEach((itemInfo,index)=>{
                        const tr2 = document.createElement('tr');
                        tr2.className = 'ItemInfo';
                        const Color = document.createElement('td');
                        Color.textContent = itemInfo.Color;
                        const Store = document.createElement('td');
                        Store.textContent = itemInfo.Store;
                        const ItemPrice = document.createElement('td');
                        ItemPrice.textContent = itemInfo.ItemPrice;
                        const inputTd = document.createElement('td');
                        const input = document.createElement('input');
                        input.type = "button";
                        input.value = "修改"
                        input.className = "button_edit"
                        input.setAttribute('data-FormatId',itemInfo.FormatId);
                        inputTd.appendChild(input)
                        if(count == 0){
                            tr.appendChild(Space);
                            tr.appendChild(Color);
                            tr.appendChild(Store);
                            tr.appendChild(ItemPrice);
                            tr.appendChild(inputTd);
                        }else{
                            if(count2 == 0){
                                tr2.appendChild(Space);
                            }
                            tr2.appendChild(Color);
                            tr2.appendChild(Store);
                            tr2.appendChild(ItemPrice);
                            tr2.appendChild(inputTd);
                            table.appendChild(tr2)
                        }
                        count += 1;
                        count2 = index + 1;
                    })
                    Space.rowSpan = count2;
                })
                CreateTime.rowSpan = count;
                ItemName.rowSpan = count;
            })
            setButtonEventHandlers();
            /*let prevOrder = null;

            data.Message.forEach((order, index) => {
                let colorCount = 0; // 用於計算每個商品的顏色數量
                order.Format.forEach((format, formatIndex) => {
                    colorCount += format.info.length; // 累加顏色數量
                    const row = document.createElement('tr');

                    if (formatIndex === 0 || !prevOrder || prevOrder.Account !== order.Account || prevOrder.TotalPrice !== order.TotalPrice || prevOrder.Address !== order.Address) {
                        row.innerHTML += `<td rowspan="${colorCount}">${formatDateTime(order.CreateTime)}</td>`;
                        row.innerHTML += `<td rowspan="${colorCount}">${order.ItemName}</td>`;
                    }

                    row.innerHTML += `<td>${format.Space}</td>`;
                    row.innerHTML += `<td>${format.info[0].Color}</td>`;
                    row.innerHTML += `<td>${format.info[0].Store}</td>`;
                    row.innerHTML += `<td>${format.info[0].ItemPrice}</td>`;
                    row.innerHTML += `
                        <td><input type="button" value="修改" class="button_edit" data-FormatId="${format.info[0].FormatId}"></td>
                    `;
                    setButtonEventHandlers();

                    table.appendChild(row);

                    if (format.info.length > 1) {
                        for (let i = 1; i < format.info.length; i++) {
                            const colorRow = document.createElement('tr');
                            colorRow.innerHTML += `<td>${format.Space}</td>`;
                            colorRow.innerHTML += `<td>${format.info[i].Color}</td>`;
                            colorRow.innerHTML += `<td>${format.info[i].Store}</td>`;
                            colorRow.innerHTML += `<td>${format.info[i].ItemPrice}</td>`;
                            colorRow.innerHTML += `
                                <td><input type="button" value="修改" class="button_edit" data-FormatId="${format.info[i].FormatId}"></td>
                            `;
                            table.appendChild(colorRow);
                            setButtonEventHandlers();
                        }
                    }
                    
                });

                prevOrder = order;

            });*/


        })
        .catch(error => {
            console.error('Error:', error);
        });

    // 函數：設置按鈕的事件處理器
    function setButtonEventHandlers() {
        const detailButtons = document.querySelectorAll('.button_edit');
        var modal = document.getElementById("myModal");
        var closeBtn = document.getElementsByClassName("close")[0];
        detailButtons.forEach(button => {
            button.addEventListener('click', function() {
                const FormatId = button.getAttribute("data-FormatId");
                getItem(FormatId);
                modal.style.display = "block";
                closeBtn.addEventListener('click', function() {
                    modal.style.display = "none";
                });
                window.addEventListener('click', function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                });
                const form = document.getElementById('UpdateForm');

                form.addEventListener('submit', function(event) {
                    event.preventDefault();

                    console.log("123");
                    
                    const formData = new FormData(form);
                    
                    const data = {};
                    formData.forEach((value, key) => {
                        data[key] = value;
                    });
                    data['ItemPrice'] = parseInt(data['ItemPrice'].replace(/,/g, ''), 10);
                    data['Store'] = parseInt(data['Store']);
                    data['FormatId'] = parseInt(FormatId);
                    console.log(data)
                    
                    fetch(`http://localhost:5193/api/Back/ItemUpdate`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                        credentials: 'include',
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('伺服器回應錯誤');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('修改成功', data);
                        alert('修改成功');
                        location.reload();
                    })
                    .catch(error => {
                        console.error('發生錯誤:', error);
                        alert('新增-商品失敗');
                    });
                });
            });
        });
    }

    function formatDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
        const date = ('0' + dateTime.getDate()).slice(-2);
        const hours = ('0' + dateTime.getHours()).slice(-2);
        const minutes = ('0' + dateTime.getMinutes()).slice(-2);
        const seconds = ('0' + dateTime.getSeconds()).slice(-2);
        return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
    }
});

function getItem(FormatId){
    fetch(`http://localhost:5193/api/Back/ItemUpdate/${FormatId}`,{
        method: 'GET',
        credentials: 'include'
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('Fail')
        }
        return response.json();
    })
    .then(data=>{
        const form = document.querySelector('.form');
        form.innerHTML = `<div class="create">
        <div id ="field1"><p>商品品牌：</p>
        </div>
        <p>${data.Message.Brand}</p>
    </div>
    <div class="create">
        <div id ="field1"><p>商品名稱：</p>
        </div>
        <p>${data.Message.ItemName}</p>
    </div>
    <div class="create">
        <div id ="field1"><p>商品顏色：</p>
        </div>
        <p>${data.Message.Color}</p>
    </div>
    <div class="create">
        <div id ="field1"><p>儲存空間：</p>
        </div>
        ${data.Message.Space}
    </div>
    <div class="create">
        <div id ="field1"><p>庫存數量：</p>
        </div>
        <div>
            <div class="numbox">
                <button class="min" type="button" onclick="opera('val', false);"> - </button>
                <input class="num" type="number" id="val" value="0" name="Store"/>
                <button class="plus" type="button" onclick="opera('val', true);"> + </button>
            </div>
        </div> 
    </div>
    <div class="create">
        <div id ="field1"><p>商品單價：</p>
        </div>
        <input type="text" placeholder="NT$xxx,xxx" required id ="field2" name="ItemPrice">
    </div>
    <div class="button">
        <input type="reset" value="重設" id="button1"></input>
        <input type="submit" value="修改完畢" id="button2">
    </div>`
    })
    .catch(error=>{
        console.error(error);
    })
}

function opera(x, y) {
    var rs = new Number(document.getElementById(x).value);
    if (y) {
        document.getElementById(x).value = rs + 1;
    } else if( rs >0) {
        document.getElementById(x).value = rs - 1;
    }
        
}


// 獲取輸入框元素
var inputField = document.getElementById('field2');
                            
// 在輸入時處理值
inputField.addEventListener('input', function(event) {
    // 移除所有非數字字符
    var value = this.value.replace(/\D/g, "");
    // 將數字轉換成千分位格式
    var formattedValue = Number(value).toLocaleString();
    // 將處理後的值設置回輸入框
    this.value = formattedValue;
});