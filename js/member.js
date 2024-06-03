fetch("http://localhost:5193/api/Back/GetAllAccountInfo", { credentials: 'include' })
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
        const table = document.querySelector('#memberTable'); // 取得表格元素

        console.log(data.Message);

        if (data.Message && data.Message.length > 0) {
            data.Message.forEach(member => {
                const row = document.createElement('tr'); // 創建新的表格行
                row.classList.add('tbody'); // 為表格行添加類別

                let permissions = '';
                console.log(member.CanUse);
                if (member.CanUse == "False") {
                    permissions = `<button class="button_use" data-account="${member.Account1}">解除</button>`;
                } else {
                    permissions = `<button class="button_unuse" data-account="${member.Account1}">停權</button>`;
                }

                if(member.MemberKind==null || member.MemberTime=="null"){
                    member.MemberKind="一般會員";
                    member.MemberTime="永久";
                    row.innerHTML = `
                        <td>${member.Account1}</td>
                        <td>${member.Name}</td>
                        <td>${member.Cellphone}</td>
                        <td>${member.Email}</td>
                        <td>一般會員</td>
                        <td>永久</td>
                        <td>${permissions}</td>
                    `;
                } else {                    
                    row.innerHTML = `
                        <td>${member.Account1}</td>
                        <td>${member.Name}</td>
                        <td>${member.Cellphone}</td>
                        <td>${member.Email}</td>
                        <td>${member.MemberKind}</td>
                        <td>${formatDateTime(member.MemberTime)}</td>
                        <td>${permissions}</td>
                    `;
                }

                table.appendChild(row); // 將表格行添加到表格中
            });

            // 添加事件監聽器到所有的停權和解除按鈕
            document.querySelectorAll('.button_use').forEach(button => {
                button.addEventListener('click', handleUnsuspend);
            });

            document.querySelectorAll('.button_unuse').forEach(button => {
                button.addEventListener('click', handleSuspend);
            });
        }
    })
    .catch(error => {
        console.error('發生錯誤:', error);
    });

function handleSuspend(event) {
    const account = event.target.getAttribute('data-account');
    console.log(`Suspending account: ${account}`);

    fetch('http://localhost:5193/api/Back/UnUse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(account)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('停權請求失敗');
        }
        return response.json();
    })
    .then(data => {
        console.log('Suspend response:', data);
        alert(data.message);
        if (data.Status === 200) {
            const button = event.target;
            button.textContent = '解除';
            button.className = 'button_use';
            button.removeEventListener('click', handleSuspend);
            button.addEventListener('click', handleUnsuspend);
        }
    })
    .catch(error => {
        console.error('停權錯誤:', error);
    });
}

function handleUnsuspend(event) {
    const account = event.target.getAttribute('data-account');
    console.log(`Unsuspending account: ${account}`);

    fetch('http://localhost:5193/api/Back/CanUse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(account)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('解除停權請求失敗');
        }
        return response.json();
    })
    .then(data => {
        console.log('Unsuspend response:', data);
        alert(data.message);
        if (data.Status === 200) {
            const button = event.target;
            button.textContent = '停權';
            button.className = 'button_unuse';
            button.removeEventListener('click', handleUnsuspend);
            button.addEventListener('click', handleSuspend);
        }
    })
    .catch(error => {
        console.error('解除停權錯誤:', error);
    });
}

function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
    const date = ('0' + dateTime.getDate()).slice(-2);

    return `${year}-${month}-${date} `;
}

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');

    menuIcon.addEventListener('click', function() {
        console.log('Menu icon clicked');
        sidebar.classList.toggle('show-sidebar');
    });
});