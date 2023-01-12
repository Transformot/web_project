let signup = document.querySelector(".signUp-btn");
let signin = document.querySelector(".signIn-btn");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".sections");

signin.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("sections-move");
});

signup.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("sections-move");
});

function openForm(evt) {
    document.getElementById("popupForm").style.display="block";
}
function closeForm(evt) {
    document.getElementById("popupForm").style.display = "none";
}

/*
window.onclick = function (event) {
    if (event.target.id !== "popupForm" && document.getElementById("popupForm").style.display === "block") {
        document.getElementById("popupForm").style.display = "none";
    }
}
*/
