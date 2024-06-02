const ctx = document.getElementById('charttest1');
    fetch(`http://localhost:5193/api/Back/GetAllMonthsell`,{
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
        
          new Chart(ctx, {
            type: 'line',
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
                        text: '今年每月銷售額折線圖', // 圖表標題文字
                        font: {
                            size:14 // 字體大小
                        },
                        color: 'blue' // 字體顏色
                    }
                },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
    })
    .catch(error=>{
        console.error(error);
    }) 
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
                        text: '今年每月新增會員數量', // 圖表標題文字
                        font: {
                            size:14 // 字體大小
                        },
                        color: 'blue' // 字體顏色
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
                            size:14 // 字體大小
                        },
                        color: 'blue' // 字體顏色
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
                        size: 14
                    },
                    color: 'blue'
                }
            }
        }
    });
})
.catch(error => {
    console.error(error);
});


// 創建圖表
const ctx4 = document.getElementById('charttest4').getContext('2d');
let Chart4 = null;
const selectedBrand1Element = document.getElementById('Cselect1');
const selectedBrand2Element = document.getElementById('Cselect2');

selectedBrand1Element.addEventListener('change', function(event) {
    const selectedBrand1 = event.target.value;
    const selectedBrand2 = selectedBrand2Element.value;
    chart4set(selectedBrand1, selectedBrand2);
});

selectedBrand2Element.addEventListener('change', function(event) {
    const selectedBrand1 = selectedBrand1Element.value;
    const selectedBrand2 = event.target.value;
    chart4set(selectedBrand1, selectedBrand2);
});

function createComparisonChart(brand1, brand2) {
    fetch(`http://localhost:5193/api/Back/CompareTwoBrand?brand1=${brand1}&brand2=${brand2}`, {
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
        Chart4 = new Chart(ctx4, {
            type: 'line',
            data: {
                labels: data.Message.Labels,
                datasets: [
                    {
                        label: data.Message.Datasets[0].Label,
                        data: data.Message.Datasets[0].Data,
                        borderWidth: data.Message.Datasets[0].BorderWidth
                    },
                    {
                        label: data.Message.Datasets[1].Label,
                        data: data.Message.Datasets[1].Data,
                        borderWidth: data.Message.Datasets[1].BorderWidth
                    }
                ]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: `今年度${brand1}、${brand2}品牌銷售量比較`,
                        font: {
                            size: 14
                        },
                        color: 'blue'
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error(error);
    });
}

// 一開始創建的圖表
createComparisonChart("Apple", "Nokia");
