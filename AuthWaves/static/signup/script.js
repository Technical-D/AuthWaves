const form = document.querySelector("form")
const pswd = document.querySelector("#floatingPassword")
const cpswd = document.querySelector("#floatingCPassword")
const cmsg = document.querySelector(".cmsg")

const pswd_field = document.getElementById('pswdtoggle')

pswd_field.onclick = function() {
    if (pswd_field.className == "fa-solid fa-eye") {
    pswd_field.className = "fa-solid fa-eye-slash";
    } else {
    pswd_field.className = "fa-solid fa-eye";
    }
    var temp = document.getElementById("floatingPassword");
    if (temp.type === "password") {
        temp.type = "text";
    }
    else {
        temp.type = "password";
    }
}

form.addEventListener("submit", (e) =>{
    e.preventDefault()
    pswd_validation()
    if(pswd_validation()){
        submit_form();
    }
})

function pswd_validation(){
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if((pswd.value.match(regularExpression))){
        if(pswd.value != cpswd.value){
        cmsg.innerHTML = "Password did not match."
        setTimeout(() => {
            cmsg.innerHTML = "";
        }, 5000);
        return false
    } else{
        return true
    }

    } else{
        cmsg.innerHTML = `<ul>
        <li>A special characters</li>
        <li>A number</li>
        <li>Minimun 8 characters</li>
      </ul>`;
        setTimeout(() => {
            cmsg.innerHTML = "";
        }, 5000);
        return false
    }
}

function submit_form(){
    form.submit();
    form.reset();
}