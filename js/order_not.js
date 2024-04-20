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
        data.Message.forEach((order, index) => {
            const row = document.createElement('tr');
            
            
            if (prevOrder && prevOrder.Account === order.Account && prevOrder.TotalPrice === order.TotalPrice && prevOrder.Address === order.Address) {
                row.innerHTML += `<td rowspan="0"></td>`;
                row.innerHTML += `<td rowspan="0"></td>`;
                row.innerHTML += `<td rowspan="0"></td>`;
                row.innerHTML += `<td rowspan="0"></td>`;
            } else {
                row.innerHTML += `<td>${order.Id}</td>`;
                row.innerHTML += `<td>${formatDateTime(order.Date)}</td>`;
                row.innerHTML += `<td>${order.Account}</td>`;
                row.innerHTML += `<td>${order.ProductName}</td>`;
                row.innerHTML += `<td>${order.Specification}</td>`;
                row.innerHTML += `<td>${order.Price}</td>`;
                row.innerHTML += `<td>${order.Quantity}</td>`;
                row.innerHTML += `<td>${order.TotalPrice}</td>`;
                row.innerHTML += `<td>${order.Address}</td>`;
            }
            
            row.innerHTML += `
                <td>
                    <a href=""><input type="button" value="確認訂單" id="button_go"></a>
                </td>
            `;
            table.appendChild(row);

            prevOrder = order; 
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
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}
