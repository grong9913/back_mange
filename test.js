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
function chart4set(brand1, brand2) {
    if (Chart4) {
        Chart4.destroy();
    }
    createComparisonChart(brand1, brand2);
}
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
}

// 一開始創建的圖表
createComparisonChart("Apple", "Nokia");

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');

    menuIcon.addEventListener('click', function() {
        console.log('Menu icon clicked');
        sidebar.classList.toggle('show-sidebar');
    });
});