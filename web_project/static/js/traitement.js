let signin_form = document.querySelector('#signin_data');
let signup_form = document.querySelector('#signup_data');
signin_form.addEventListener("submit", function (event) {
    event.preventDefault();

    let username = signin_form.elements["username"].value;
    let password = signin_form.elements["password"].value;

    //Code de vérification, si tous ok, effectuer la requête suivante
    //data pour la fonction success correspond au return de la vue django, ici True si l'utilisateur est connecté, False sinon

    $.ajax({
        url: "signin/",
        type: "POST",
        data: {
            username: username,
            password: password,
        },
        success: function (data, textSatus, jqXHR)
        {
            open('/test', '_self');
        },
        error: function (data, textStatus, jqXHR)
        {
            alert("There was an issue. Data not sent.");
        }
    });
});

signup_form.addEventListener("submit", function (event) {
    let verification = true;

    event.preventDefault();

    let username = signup_form.elements["username"].value;
    let password = signup_form.elements["password"].value;
    let c_password = signup_form.elements["c_password"].value;

    //Code de vérification, si tous ok, effectuer la requête suivante
    if (username === "") {
        document.getElementById("username").style.border = "solid 2px red";
        alert("Merci de renseigner un pseudonyme.");
        verification = false;
    }
    else {
        document.getElementById("username").style.border = "none";
    }

    if (password === "") {
        document.getElementById("password").style.border = "solid 2px red";
        document.getElementById("c_password").style.border = "solid 2px red";
        alert("Merci de renseigner un mot de passe.");
        verification = false;
    }
    else {
        document.getElementById("password").style.border = "none";
        document.getElementById("c_password").style.border = "none";
    }

    if (verification !== true) {
        return 0;
    }
    //data pour la fonction success correspond au return de la vue django, ici True si l'utilisateur est connecté, False sinon

    $.ajax({
        url: "signup/",
        type: "POST",
        data: {
            username: username,
            password: password,
        },
        success: function (data, textSatus, jqXHR)
        {
            open('/test', '_self');
        },
        error: function (data, textStatus, jqXHR)
        {
            alert("There was an issue. Data not sent.");
        }
    });
});
