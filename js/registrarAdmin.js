function comprobarAdmin(){

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/comprobarAdmin.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = xhr.responseText.trim();
            if (response != 1) {
                window.location.href = './errorAdmin.html'
            }
        }
    };
    xhr.send();

}