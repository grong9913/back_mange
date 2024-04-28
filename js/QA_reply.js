fetch("http://localhost:5193/api/Back/QA/Reply",{credentials: 'include'})
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
        const table = document.querySelector('#qa_ok_Table'); // 取得表格元素
        
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
                    <td>${qa.Reply}</td>
                    <td>${qa.ReplyTime ? formatDateTime(qa.ReplyTime) : ''}</td>                
                `;
                table.appendChild(row); // 將表格行添加到表格中
            });
        }
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
    
            var table = document.getElementById('qa_ok_Table');
            var rows = table.querySelectorAll('.tbody');

            rows.forEach(function(row) {
                row.parentNode.removeChild(row);
            });
            
            // 如果有符合搜尋條件的資料，則顯示在表格中
            if (data.Message && data.Message.length > 0) {
                data.Message.forEach(qa => {
                    if(qa.Reply!=null){ 
                        const row = document.createElement('tr'); // 創建新的表格行
                        row.classList.add('tbody'); // 為表格行添加類別
                        row.innerHTML = `
                            <td>${qa.ItemName}</td>
                            <td>${qa.Account}</td>
                            <td>${qa.Content}</td>
                            <td>${qa.CreateTime ? formatDateTime(qa.CreateTime) : ''}</td>
                            <td>${qa.Reply}</td>
                            <td>${qa.ReplyTime ? formatDateTime(qa.ReplyTime) : ''}</td>                
                        `;
                        table.appendChild(row); // 將表格行添加到表格中
                    }
                    
                });
            } else {
                // 如果沒有符合搜尋條件的資料，顯示提示信息
                console.log('No matching data found.');
            }
        } catch (error) {
            // 處理錯誤
            console.error('Error:', error);
        }
    });
    
      
      
// const searchInput = document.getElementById('search_text');
// const searchButton = document.querySelector('.search-container button[name="search"]');

// // 添加點擊事件監聽器
// searchButton.addEventListener('click', () => {
//     // 獲取搜尋關鍵字
//     const searchValue = searchInput.value;
    
//     // 使用Fetch API發送GET請求
//     fetch("http://localhost:5193/api/Back/SearchQA", {
//         credentials: 'include'
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('伺服器回應錯誤');
//         }
//         return response.json();
//     })
//     .then(data => {
//         const table = document.querySelector('#qa_ok_Table'); // 取得表格元素
//             console.log(data);
            
//             // 清空表格
//             table.innerHTML = '';
    
//             // 過濾資料
//             const filteredData = data.Message.filter(qa => {
//                 return qa.ItemName === searchValue || qa.Account === searchValue || qa.Content === searchValue || qa.Reply === searchValue;
//             });

//             // 顯示搜尋結果
//             data.Message.forEach(qa => {
//                 const row = document.createElement('tr'); // 創建新的表格行
//                 row.classList.add('tbody'); // 為表格行添加類別
//                 row.innerHTML = `
//                     <td>${qa.ItemName}</td>
//                     <td>${qa.Account}</td>
//                     <td>${qa.Content}</td>
//                     <td>${qa.CreateTime ? formatDateTime(qa.CreateTime) : ''}</td>
//                     <td>${qa.Reply}</td>
//                     <td>${qa.ReplyTime ? formatDateTime(qa.ReplyTime) : ''}</td>                
//                 `;
//                 table.appendChild(row); // 將表格行添加到表格中
//             });
//         console.log(data);
//     })
//     .catch(error => {
//         // 處理錯誤
//         console.error('Error:', error);
//     });
// });


    

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

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');

    menuIcon.addEventListener('click', function() {
        console.log('Menu icon clicked');
        sidebar.classList.toggle('show-sidebar');
    });
});
