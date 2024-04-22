fetch("http://localhost:5193/api/Back/QA/Unreply", {credentials: 'include'})
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
        const tableRows = document.querySelectorAll(".tbody");

        console.log(data);

        // 將每個未回覆的 QA 添加到表格中
        if (data.Message && data.Message.length > 0) {
            Array.from(tableRows).forEach((row, index) => {
                const qa = data.Message[index]; // 取得對應索引的 QA 物件
                row.innerHTML = `
                    <td>${qa.ItemName}</td>
                    <td>${qa.Account}</td>
                    <td>${qa.Content}</td>
                    <td>${qa.CreateTime ? formatDateTime(qa.CreateTime) : ''}</td> <!-- 注意這裡是 qa.CreateTime -->
                    <td>
                        <input type="button" value="回覆" class="button_reply">
                    </td>
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
