const form = document.querySelector('.form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.querySelector('.text[name="username"]').value;
    const password = document.querySelector('.text[name="password"]').value;
    
    fetch('http://localhost:5193/api/Member/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Account1: username, Password: password }),
        credentials: 'include'
    })
    
    .then(response => {
        if (!response.ok) {
            throw new Error('登入失敗');
        }
        return response.json();
    })

    .then(data => {
        var status = data.Status;
        if (status === 200) {
            window.location.href = './BackStage_Create.html';
        } else {
            console.error('登入失敗', data.Message);
            alert('登入失敗，請檢查您的帳號和密碼');
        }
    })

    .catch(error => {
        console.error('登入失敗:', error.message);
        alert('登入失敗，請檢查您的帳號和密碼');
    });

}); 

function togglePasswordVisibility() {
    var passwordInput = document.getElementsByName("password")[0];
    var toggleIcon = document.getElementById("toggleIcon");
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.src = "./images/view.png";
    } else {
        passwordInput.type = "password";
        toggleIcon.src = "./images/hide.png";
    }
}
// const form = document.querySelector('.form');
//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const username = document.querySelector('.text[name="username"]').value;
//         const password = document.querySelector('.text[name="password"]').value;
//         const xhr = new XMLHttpRequest();
//         xhr.withCredentials = true;
//         xhr.open('POST', 'http://localhost:5193/api/Member/Login', true);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === XMLHttpRequest.DONE) {
//                 if (xhr.status === 200) {
//                     var responseData = JSON.parse(xhr.responseText);
//                     var status = responseData.Status;
//                     var message = responseData.Message;
//                     if(status == 200){
//                         window.location.href = './Index.html';
//                     }
//                     else{
//                         console.error('登入失敗',xhr.responseText);
//                         alert('登入失敗，請檢查您的帳號和密碼');
//                     }
//                 } else {
//                     console.error('登入失敗:', xhr.responseText);
//                     alert('登入失敗，請檢查您的帳號和密碼');
//                 }
//             }
//         };
//         xhr.send(JSON.stringify({ Account1: username, Password: password }));
//     });