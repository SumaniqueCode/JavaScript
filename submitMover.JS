function validator() {
    let username = document.getElementById("InputEmail").value;
    let userpassword = document.getElementById("InputPassword").value;
    if (username == "suman@gmail.com" && userpassword == "12345") {
        confirm("Success");
    }
    else{
        alert("Failed");
    }
}