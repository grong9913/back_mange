fetch("http://localhost:5193/api/Back/OrderShowUnsend", { credentials: 'include' })
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
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

        let prevOrder = null;
        let rowspanCounter = 0;

        data.Message.forEach((order, index) => {
            const row = document.createElement('tr');

            if (prevOrder && prevOrder.Account === order.Account && prevOrder.TotalPrice === order.TotalPrice && prevOrder.Address === order.Address) {
                rowspanCounter++;
                // Increment rowspan for each item
                row.innerHTML += '';
            } else {
                rowspanCounter = 1;
                row.innerHTML += `<td rowspan="${order.Items.length}">${order.OrderId}</td>`;
                row.innerHTML += `<td rowspan="${order.Items.length}">${formatDateTime(order.OrderTime)}</td>`;
                row.innerHTML += `<td rowspan="${order.Items.length}">${order.Account}</td>`;
            }

            // Displaying each item in a separate row
            order.Items.forEach((item, itemIndex) => {
                if (itemIndex !== 0) {
                    const itemRow = document.createElement('tr');
                    itemRow.innerHTML += `<td>${item.ItemName}</td>`;
                    itemRow.innerHTML += `<td>${item.ItemFormat}</td>`;
                    itemRow.innerHTML += `<td>${item.ItemPrice}</td>`;
                    itemRow.innerHTML += `<td>${item.ItemNum}</td>`;
                    table.appendChild(itemRow);
                } else {
                    row.innerHTML += `<td>${item.ItemName}</td>`;
                    row.innerHTML += `<td>${item.ItemFormat}</td>`;
                    row.innerHTML += `<td>${item.ItemPrice}</td>`;
                    row.innerHTML += `<td>${item.ItemNum}</td>`;
                    row.innerHTML += `<td rowspan="${order.Items.length}">${order.TotalPrice}</td>`;
                    row.innerHTML += `<td rowspan="${order.Items.length}">${order.Address}</td>`;
                    row.innerHTML += `
                        <td rowspan="${order.Items.length}">
                            <a href=""><input type="button" value="確認訂單" id="button_go" data-OrderId="${order.OrderId}"></a>
                        </td>
                    `;
                    table.appendChild(row);
                }
            });

            prevOrder = order;


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
        });
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
