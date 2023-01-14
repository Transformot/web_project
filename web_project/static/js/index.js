let signUpBtn = document.querySelector(".signUp-btn");
let signInBtn = document.querySelector(".signIn-btn");
let signUpDiv = document.querySelector(".signUp_div");
let signInDiv = document.querySelector(".signIn_div");
const bckg = document.querySelector('#background');

function show_window() {
    bckg.style.display = 'block';
}
function hide_window() {
    bckg.style.display = 'none';
}

function func_signIn() {
    signUpDiv.classList.add("signUp_div_move");
    signInDiv.classList.add("signIn_div_move");

    signUpBtn.style.backgroundImage = "none";
    signInBtn.style.backgroundImage = "linear-gradient(to right, rgb(254, 213, 1), rgb(254, 233, 75))";

    signUpBtn.style.color = "white";
    signInBtn.style.color = "black";
}

function func_signUp() {
    signUpDiv.classList.remove("signUp_div_move");
    signInDiv.classList.remove("signIn_div_move");
    signUpBtn.style.backgroundImage = "linear-gradient(to right, rgb(254, 213, 1), rgb(254, 233, 75))";
    signInBtn.style.backgroundImage = "none";

    signUpBtn.style.color = "black";
    signInBtn.style.color = "white";
}

$('#background').on('click', function(event) {
    if (event.target !== this)
        return;
    hide_window()
});
