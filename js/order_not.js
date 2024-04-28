fetch("http://localhost:5193/api/Back/OrderShowUnsend", { credentials: 'include' })
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
        const p = document.querySelector('.order_btn_1')
        p.textContent = `未出貨`
        const table = document.querySelector('table');
        table.innerHTML = '';

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>編號</th>
            <th>新增日期</th>
            <th>會員帳號</th>
            <th>商品名稱</th>
            <th>商品規格</th>
            <th>單價</th>
            <th>數量</th>
            <th>總價</th>
            <th>地址</th>
            <th>操作</th>
        `;
        table.appendChild(headerRow);
        let rowspanCounter;
        data.Message.forEach(item=>{
            rowspanCounter = 0;
            console.log(item);
            const bodyRow = document.createElement('tr');
            const OtherItem = document.createElement('tr');
            bodyRow.innerHTML = '';
            bodyRow.innerHTML += `
            <td class="order${item.OrderId}">${item.OrderId}</td>
            <td class="order${item.OrderId}">${formatDateTime(item.OrderTime)}</td>
            <td class="order${item.OrderId}">${item.Account}</td>`;
            item.Items.forEach((orderItem,index)=>{
                rowspanCounter += 1;
                console.log(index);
                if(index == 0){
                    bodyRow.innerHTML +=`
                    <td>${orderItem.ItemName}</td>
                    <td>${orderItem.ItemFormat}</td>
                    <td>${orderItem.ItemPrice}</td>
                    <td>${orderItem.ItemNum}</td>`
                    table.appendChild(bodyRow);
                }
                else{
                    OtherItem.innerHTML = `
                    <td>${orderItem.ItemName}</td>
                    <td>${orderItem.ItemFormat}</td>
                    <td>${orderItem.ItemPrice}</td>
                    <td>${orderItem.ItemNum}</td>`;
                }
            })
            bodyRow.innerHTML += `
            <td class="order${item.OrderId}">${item.TotalPrice}</td>
            <td class="order${item.OrderId}">${item.Address}</td>
            <td class="order${item.OrderId}">
                <a href=""><input type="button" value="確認訂單" id="button_go" data-OrderId="${item.OrderId}"></a>
            </td>`;
            table.appendChild(bodyRow)
            table.appendChild(OtherItem)
            const forRowSpan = document.querySelectorAll(`.order${item.OrderId}`);
            console.log(forRowSpan)
            forRowSpan.forEach(td=>{
                td.rowSpan  = rowspanCounter;
            })
            
        })
        const detailButtons = document.querySelectorAll('#button_go');

            detailButtons.forEach(button => {
    
                button.addEventListener('click', function() {
                    const OrderId = button.getAttribute("data-OrderId");  

                    fetch(`http://localhost:5193/api/Back/OrderSent`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                                },
                                credentials: 'include',
                                body: OrderId, // 將表單資料轉換成 JSON 字串送出
                            })                        
                        
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('伺服器回應錯誤');
                                }
                                return response.json();
                            })
                            .then(data => {
                                alert('完成'); // Alert user upon success
                            })
                            .catch(error => {
                                console.error('發生錯誤:', error.message);
                            });

                    })
                })
    })
    .catch(error => {
        console.error('Error:', error);
    });

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

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');

    menuIcon.addEventListener('click', function() {
        console.log('Menu icon clicked');
        sidebar.classList.toggle('show-sidebar');
    });
});
