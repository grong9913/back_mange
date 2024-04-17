fetch("http://localhost:5193/api/Paradise/QA/Unreply")
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.querySelector("table tbody");

        // 清空之前的內容
        tableBody.innerHTML = '';

        // 將每個未回覆的 QA 添加到表格中
        data.Message.forEach(qa => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${qa.ProductName}</td>
                <td>${qa.Account}</td>
                <td>${qa.Question}</td>
                <td>${qa.QuestionTime}</td>
                <td>
                    <input type="button" value="回覆" class="button_reply">
                </td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('發生錯誤:', error);
    });
