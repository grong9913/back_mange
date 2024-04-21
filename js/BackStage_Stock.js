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
            table.innerHTML = '';

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

            let prevOrder = null;

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
                    console.log("123");
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
                            console.log("123");
                            setButtonEventHandlers();
                        }
                    }
                    
                });

                prevOrder = order;

            });


        })
        .catch(error => {
            console.error('Error:', error);
        });

    // 函數：設置按鈕的事件處理器
    function setButtonEventHandlers() {
        const detailButtons = document.querySelectorAll('.button_edit');
        detailButtons.forEach(button => {
            button.addEventListener('click', function() {
                const FormatId = button.getAttribute("data-FormatId");  

                const form = document.getElementById('UpdateForm');

                form.addEventListener('submit', function(event) {
                    event.preventDefault();

                    console.log("123");
                    
                    const formData = new FormData(form);
                    
                    const data = {};
                    formData.forEach((value, key) => {
                        data[key] = value;
                    });
                    
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
