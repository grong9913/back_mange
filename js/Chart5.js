    const ctx5 = document.getElementById('charttest5');
    fetch(`http://localhost:5193/api/Back/GetAllMonthMenber`,{
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
        
          new Chart(ctx5, {
            type: 'bar',
            data: {
                labels: data.Message.Labels,
                datasets: [{
                  label: data.Message.Datasets[0].Label,
                  data: data.Message.Datasets[0].Data,
                  borderWidth: data.Message.Datasets[0].BorderWidth
                }]
              },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: '今年每月會員新增數量', // 圖表標題文字
                        font: {
                            size:18 // 字體大小
                        },
                        color: 'brown' // 字體顏色
                    }
                },
              scales: {
                y: {
                  beginAtZero: true,
                  min: 0,
                  max:20
                }
              }
            }
          });
    })
    .catch(error=>{
        console.error(error);
    })
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');

    menuIcon.addEventListener('click', function() {
        console.log('Menu icon clicked');
        sidebar.classList.toggle('show-sidebar');
    });
});