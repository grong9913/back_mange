

const form = document.getElementById('CreateForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log(data)
    const url = "http://localhost:5193/api/Back/AddProduct";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
        console.log('新增商品成功:', data);
        alert('新增商品成功');
    })
    .catch(error => {
        console.error('發生錯誤:', error);
        alert('新增商品失敗');
    });
});
