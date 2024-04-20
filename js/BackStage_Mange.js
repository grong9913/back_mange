fetch("http://localhost:5193/api/Back/Items", { credentials: 'include' })
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
        console.log("123");
        console.log(tableBody);
        
        const tableBody = document.querySelector("table tbody");

        if (data && data.length > 0) {
            console.log("888");
            data.forEach(item => {
                const newRow = document.createElement('tr');
                newRow.classList.add('tbody'); 
                newRow.innerHTML = `
                <td><a href="">${item.ItemName}</a></td>
                <td>${item.CreateTime}</td>
                <td>${item.DownTime}</td>
                <td>${item.IsAvailable}</td>
                <td>
                  <input type="button" value="下架" id="button_down">
                </td>              
                `;
                tableBody.appendChild(newRow);
            });
        };
        
    })    
    .catch(error => {
        console.error('發生錯誤:', error);
    });
