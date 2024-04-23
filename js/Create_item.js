let FileName = [];

function GetFileName(event){
    const fileList = event.target.files;
    FileName = [];
    for(let i = 0 ; i<fileList.length;i++){
        FileName.push(fileList[i].name);
    }
}
const form = document.getElementById('CreateForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(FileName);
    const formData = new FormData(form);
    const data = {};
    const ItemImg = "ItemImg";
    formData.forEach((value, key) => {
        data[key] = value;
    });
    data[ItemImg] = FileName;
    data["Store"] = parseInt(data["Store"]);
    data["ItemPrice"] = parseInt(data["ItemPrice"].replace(/,/g, ''));
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
        location.reload();
    })
    .catch(error => {
        console.error('發生錯誤:', error);
        alert('新增商品失敗');
    });
});
