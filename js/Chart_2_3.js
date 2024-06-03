    const ctx2 = document.getElementById('charttest2');
    fetch(`http://localhost:5193/api/Back/GetAllBrandMonthNum`,{
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
        
          new Chart(ctx2, {
            type: 'doughnut',
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
                        text: '當月各品牌規格銷售量', // 圖表標題文字
                        font: {
                            size:18 // 字體大小
                        },
                        color: 'brown' // 字體顏色
                    }
                }
            }
          });
    })
    .catch(error=>{
        console.error(error);
    }) 


// 創建圖表
const ctx3 = document.getElementById('charttest3');
let Chart3 = null;

// 監聽選擇更改
const selectElement = document.getElementById('select');
selectElement.addEventListener('change', function(event) {
    const selectedBrand = event.target.value;

    fetch(`http://localhost:5193/api/Back/GetBrandYearNum?Brand=${selectedBrand}`, {
        method: 'GET',
        credentials: 'include',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('無法取得圖表所需資料');
        }
        return response.json();
    })
    .then(data => {
        // 更新圖表數據
        Chart3.data.labels = data.Message.Labels;
        Chart3.data.datasets[0].data = data.Message.Datasets[0].Data;
        Chart3.options.plugins.title.text = '今年 ' + selectedBrand + ' 各商品規格銷售量';

        // 重新繪製圖表
        Chart3.update();
    })
    .catch(error => {
        console.error(error);
    });
});

// 在初始加載時創建圖表
fetch(`http://localhost:5193/api/Back/GetBrandYearNum?Brand=Apple`, {
    method: 'GET',
    credentials: 'include',
})
.then(response => {
    if (!response.ok) {
        throw new Error('Fail');
    }
    return response.json();
})
.then(data => {
    Chart3 = new Chart(ctx3, {
        type: 'doughnut',
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
                    text: '今年 Apple 各商品規格銷售量',
                    font: {
                        size: 18
                    },
                    color: 'brown'
                }
            }
        }
    });
})
.catch(error => {
    console.error(error);
});




document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');

    menuIcon.addEventListener('click', function() {
        console.log('Menu icon clicked');
        sidebar.classList.toggle('show-sidebar');
    });
});