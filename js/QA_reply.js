fetch("http://localhost:5193/api/Back/QA/Reply",{credentials: 'include'})
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })

    .then(data => {
        const tableRows = document.querySelectorAll(".tbody");

        // 將每個未回覆的 QA 添加到表格中
        if (data.Message && data.Message.length > 0) {
            data.Message.forEach((qa, index) => {
            const row = tableRows[index]; // 透過索引選擇對應的表格行
            row.innerHTML = `
                <td>${qa.ItemName}</td>
                <td>${qa.Account}</td>
                <td>${qa.Content}</td>
                <td>${qa.CreateTime ? formatDateTime(qa.CreateTime) : ''}</td>
                <td>${qa.Reply}</td>
                <td>${qa.ReplyTime ? formatDateTime(qa.ReplyTime) : ''}</td>                
            `;
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