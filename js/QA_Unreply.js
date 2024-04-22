fetch("http://localhost:5193/api/Back/QA/Unreply", {credentials: 'include'})
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
        const table = document.querySelector('#qaTable'); // 取得表格元素
        
        console.log(data);

        // 如果資料庫有未回覆的 QA 資料
        if (data.Message && data.Message.length > 0) {
            data.Message.forEach(qa => {
                const row = document.createElement('tr'); // 創建新的表格行
                row.classList.add('tbody'); // 為表格行添加類別
                row.innerHTML = `
                    <td>${qa.ItemName}</td>
                    <td>${qa.Account}</td>
                    <td>${qa.Content}</td>
                    <td>${qa.CreateTime ? formatDateTime(qa.CreateTime) : ''}</td>
                    <td>
                        <input type="button" value="回覆" class="button_reply">
                    </td>
                `;
                table.appendChild(row); // 將表格行添加到表格中
            });
        }
    })
    .catch(error => {
        console.error('發生錯誤:', error);
    });



    

function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString); // 解析日期時間字符串
    const year = dateTime.getFullYear();
    const month = ('0' + (dateTime.getMonth() + 1)).slice(-2); //.slice(-2)取末兩位的數字
    const date = ('0' + dateTime.getDate()).slice(-2);
    const hours = ('0' + dateTime.getHours()).slice(-2);
    const minutes = ('0' + dateTime.getMinutes()).slice(-2);
    const seconds = ('0' + dateTime.getSeconds()).slice(-2);

    const formattedDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}

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
        </div >
        <p>${data.Message.ItemName}</p>
    </div>
    <div class="create">
        <div id ="field1"><p>會員帳號：</p>
        </div>
        <p>${data.Message.Account}</p>
    </div>
    <div class="create">
        <div id ="field1"><p>提問內容：</p>
        </div>
        <p>${data.Message.Content}</p>
    </div>
    <div class="create">
        <div id ="field1"><p>提問時間：</p>
        </div>
        <p>${data.Message.CreateTime}</p>
    </div>
    <div class="create">
        <div id ="field1"><p>回覆內容：</p>
        </div>
        <textarea name="mytext" rows="5" cols="40" required id ="field4"></textarea>
    </div>
    <div class="button">
        <input type="reset" value="重設" id="button1"></input>
        <input type="submit" value="回覆" id="button2">
    </div>`
    })
    .catch(error=>{
        console.error(error);
    })
}

// 獲取輸入框元素
var inputField = document.getElementById('field1');