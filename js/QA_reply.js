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
