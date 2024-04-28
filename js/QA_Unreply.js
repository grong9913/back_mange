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
                            <a href=""><input type="button" value="回覆" class="button_reply" data-Id="${qa.Id}"></a>
                        </td>
                    `;

                    table.appendChild(row); // 將表格行添加到表格中
                });
                
            }

            setButtonEventHandlers();

    })
    .catch(error => {
        console.error('發生錯誤:', error);
    });


    const searchButton = document.querySelector('.search-container button[name="search"]');
    const searchInput = document.getElementById('search_text');
    
    // 添加點擊事件監聽器
    searchButton.addEventListener('click', async () => {
        // 獲取搜尋關鍵字
        const searchValue = searchInput.value;
        
        try {
            // 使用Fetch API發送GET請求
            const response = await fetch(`http://localhost:5193/api/Back/SearchQA?Search=${searchValue}`, {
                credentials: 'include'
            });
    
            // 檢查響應是否成功
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // 解析JSON響應
            const data = await response.json();
    
            var table = document.getElementById('qaTable');
            var rows = table.querySelectorAll('.tbody');

            rows.forEach(function(row) {
                row.parentNode.removeChild(row);
            });
            
            // 如果有符合搜尋條件的資料，則顯示在表格中
            if (data.Message && data.Message.length > 0) {
                data.Message.forEach(Search => {
                    if(Search.Reply==null){

                        const row = document.createElement('tr'); // 創建新的表格行
                        row.classList.add('tbody'); // 為表格行添加類別
                        row.innerHTML = `
                            <td>${Search.ItemName}</td>
                            <td>${Search.Account}</td>
                            <td>${Search.Content}</td>
                            <td>${Search.CreateTime ? formatDateTime(Search.CreateTime) : ''}</td>
                            <td>
                                <a href=""><input type="button" value="回覆" class="button_reply" data-Id="${Search.Id}"></a>
                            </td>             
                        `;
                        table.appendChild(row); // 將表格行添加到表格中

                    }
                });
                setButtonEventHandlers();
            }
            
            else {
                // 如果沒有符合搜尋條件的資料，顯示提示信息
                console.log('No matching data found.');
            }
        } catch (error) {
            // 處理錯誤
            console.error('Error:', error);
        }
    });

    function setButtonEventHandlers() {
        const detailButtons = document.querySelectorAll('.button_reply');
        var modal = document.getElementById("myModal");
        var closeBtn = document.getElementsByClassName("close")[0];

        detailButtons.forEach(button => {
            button.addEventListener('click', function() {

                event.preventDefault();
                event.stopPropagation();


                //抓取彈跳視窗資料
                const Id = button.getAttribute("data-Id");
                getItem(Id);

                //關閉彈跳視窗
                modal.style.display = "block";
                closeBtn.addEventListener('click', function() {
                    modal.style.display = "none";
                });

                window.addEventListener('click', function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                });

                //抓取彈跳視窗表單資料
                const form = document.getElementById('Reply_Form');

                form.addEventListener('submit', function(event) {
                    event.preventDefault();
                    
                    const formData = new FormData(form);
                    
                    const data = '"' + document.querySelector('.Reply[name="Reply"]').value + '"';

                    console.log(data)
                    
                    fetch(`http://localhost:5193/api/Back/QA/Reply/${Id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: data,
                        credentials: 'include',
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('伺服器回應錯誤');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('回覆成功', data);
                        alert('回覆成功');
                        location.reload();
                    })
                    .catch(error => {
                        console.error('發生錯誤:', error);
                        alert('回覆失敗');
                    });
                });
            });
        });
    }



    

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



function getItem(Id){
    fetch(`http://localhost:5193/api/Back/QA/Unreply/${Id}`,{
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
        <div id ="field1"><p>商品名稱：</p>
        </div >
        <div id="ItemName"></div>
        ${data.Message.ItemName}
    </div>
    <div class="create">
        <div id ="field1"><p>會員帳號：</p>
        </div>
        ${data.Message.Account}
    </div>
    <div class="create">
        <div id ="field1"><p>提問內容：</p>
        </div>
        ${data.Message.Content}
    </div>
    <div class="create">
        <div id ="field1"><p>提問時間：</p>
        </div>
        ${data.Message.CreateTime}
    </div>
    <div class="create">
        <div id ="field1"><p>回覆內容：</p>
        </div>
        <textarea rows="5" cols="40" required id ="field4" name="Reply" class="Reply"></textarea>
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

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');

    menuIcon.addEventListener('click', function() {
        console.log('Menu icon clicked');
        sidebar.classList.toggle('show-sidebar');
    });
});

