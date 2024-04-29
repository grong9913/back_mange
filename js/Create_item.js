let FileName = [];
function GetMainFileName(event){
    const fileList = event.target.files;
    FileName = [];
    for(let i = 0 ; i<fileList.length;i++){
        FileName.push(fileList[i].name);
    }
}
function GetFileName(event){
    const fileList = event.target.files;
    //FileName = [];
    for(let i = 0 ; i<fileList.length;i++){
        FileName.push(fileList[i].name);
    }
}
const form = document.getElementById('CreateForm');
form.addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log(FileName);
    console.log("123");
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
        credentials: 'include' ,
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

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData();
    
    // const files = document.getElementById('main ItemImg').files;
    // const files = document.getElementById('field3 ItemImg').files;
    const files1 = document.getElementById('main_ItemImg').files;
    const files2 = document.getElementById('field3_ItemImg').files;
    const files = Array.from(files1).concat(Array.from(files2));

    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }

    try {
        console.log("img uploading")
        const response = await fetch('http://localhost:5193/api/Back/uploadimg', {
            credentials: 'include' ,
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }

        console.log('圖片上傳成功');
    } catch (error) {
        console.error('圖片上傳失敗:', error);
    }
});       
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');

    menuIcon.addEventListener('click', function() {
        console.log('Menu icon clicked');
        sidebar.classList.toggle('show-sidebar');
    });
});

