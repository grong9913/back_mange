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
        console.log(data);
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
        console.log(data.Message);
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
                    <td>${numberWithCommas(orderItem.ItemPrice)}</td>
                    <td>${orderItem.ItemNum}</td>`
                    table.appendChild(bodyRow);
                }
                else{
                    OtherItem.innerHTML = `
                    <td>${orderItem.ItemName}</td>
                    <td>${orderItem.ItemFormat}</td>
                    <td>${numberWithCommas(orderItem.ItemPrice)}</td>
                    <td>${orderItem.ItemNum}</td>`;
                }
            })
            bodyRow.innerHTML += `
            <td class="order${item.OrderId}">${item.TotalPrice}</td>
            <td class="order${item.OrderId}">${item.Address}</td>
            <td class="order${item.OrderId}">
                運送中
            </td>`;
            table.appendChild(bodyRow)
            table.appendChild(OtherItem)
            const forRowSpan = document.querySelectorAll(`.order${item.OrderId}`);
            console.log(forRowSpan)
            forRowSpan.forEach(td=>{
                td.rowSpan  = rowspanCounter;
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

const numberWithCommas = (number) => {
    return number.toLocaleString(undefined, { maximumFractionDigits: 0 });
};