fetch("http://localhost:5193/api/Back/Items", { credentials: 'include' })
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message)
        const tableBody = document.querySelector("table tbody");
        if (data.message && data.message.length > 0) {
            console.log("888");
            data.message.forEach(item => {
                const newRow = document.createElement('tr');
                newRow.classList.add('tbody');
                for(let i=0;i<5;i++){
                    const td = document.createElement('td');
                    switch(i){
                        case 0:
                            const a =document.createElement('text')
                            a.textContent = item.ItemName;
                            td.appendChild(a);
                            break;
                        case 1:
                            if(item.UPTime != null)
                                td.textContent = formatDateTime(item.UPTime);
                            else
                                td.textContent = "-";
                            break;
                        case 2:
                            if(item.DownTime != null)
                                td.textContent = formatDateTime(item.DownTime);
                            else
                                td.textContent = "-";
                            break;
                        case 3:
                            if(item.IsAvailable)
                                td.textContent = "已上架";
                            else
                                td.textContent = "已下架";
                            break;
                        case 4:
                            const input = document.createElement('input')
                            input.type = "button";
                            if(item.IsAvailable){
                                input.value = "下架";
                                input.id = "button_down"
                            }
                            else{
                                input.value = "上架";
                                input.id = "button_down"
                            }
                            input.addEventListener('click',function(event){
                                event.preventDefault();
                                console.log('123')
                                let url;
                                if(item.IsAvailable){
                                    url = `http://localhost:5193/api/Back/Down?ItemId=${item.ItemId}`;
                                }
                                else{
                                    url = `http://localhost:5193/api/Back/UP?ItemId=${item.ItemId}`;
                                }
                                fetch(url,{
                                    method: 'POST',
                                    credentials: 'include'
                                })
                                .then(response=>{
                                    if(!response.ok){
                                        throw new Error('錯誤')
                                    }
                                    return response.json();
                                })
                                .then(data=>{
                                    console.log(data);
                                    window.location.reload();
                                })
                                .catch(error=>{
                                    console.error(error);
                                })
                            })
                            td.appendChild(input);
                            break;
                    }
                    newRow.appendChild(td);
                }
                tableBody.appendChild(newRow);
                /*newRow.innerHTML = `
                <td><a href="">${item.ItemName}</a></td>
                <td>${item.CreateTime}</td>
                <td>${item.DownTime}</td>
                <td>${item.IsAvailable}</td>
                <td>
                  <input type="button" value="下架" id="button_down">
                </td>              
                `;
                tableBody.appendChild(newRow);*/
            });
        };
        
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