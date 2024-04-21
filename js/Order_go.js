fetch("http://localhost:5193/api/Back/OrderShowSent", { credentials: 'include' })
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
                    row.innerHTML += `<td rowspan="${order.Items.length}">運送中</td>`;
                    table.appendChild(row);
                }
            });

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
    return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
}
