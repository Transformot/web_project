let signup_form = document.querySelector('#signup_data');
let signin_form = document.querySelector('#signin_data');

signup_form.addEventListener("submit", function (event) {
    event.preventDefault();

    let username = signup_form.elements["username_up"].value;
    let password = signup_form.elements["password_up"].value;
    let c_password = signup_form.elements["c_password_up"].value;

    //Code de vérification, si tous ok, effectuer la requête suivante
    const regex_user = /([A-Z]*|[a-z]*|[0-9]*|[-_])*/g;
    const found_user = username.match(regex_user);

    const regex_pswd = /([A-Z]*|[a-z]*|[0-9]*|[-_*])*/g;
    const found_pswd = password.match(regex_pswd);

    //Code de vérification, si tous ok, effectuer la requête suivante
    if (username === "") {
        document.getElementById("username_up").style.border = "solid 2px red";
        alert("Merci de renseigner un pseudonyme.");
    }
    else if(username.length < 6 || username.length > 20) {
        document.getElementById("username_up").style.border = "solid 2px red";
        alert("Votre pseudonyme doit faire entre 6 et 20 caractères.");
    }
    else {
        if (found_user[0].length === username.length) {
            document.getElementById("username_up").style.border = "none";
        }
        else {
            alert("Merci de sélectionner des caractères valides pour le pseudonyme.")
            document.getElementById("username_up").style.border = "solid 2px red";
        }
    }

    if (password === "" || c_password === "") {
        document.getElementById("password_up").style.border = "solid 2px red";
        document.getElementById("c_password_up").style.border = "solid 2px red";
        alert("Merci de renseigner un mot de passe.");
    }
    else if(password.length < 6 || password.length > 20) {
        document.getElementById("password_up").style.border = "solid 2px red";
        document.getElementById("c_password_up").style.border = "solid 2px red";
        alert("Votre mot de passe doit faire entre 6 et 20 caractères.");
    }
    else {
        document.getElementById("password_up").style.border = "solid 2px red";
        document.getElementById("c_password_up").style.border = "solid 2px red";
        if (found_pswd[0].length !== password.length) {
            alert("Merci de sélectionner des caractères valides pour le mot de passe.");
        }
        else if(password.match(/[A-Z]/g) == null) {
            alert("Votre mot de passe doit contenir au moins une lettre majuscule.");
        }
        else if(password.match(/[a-z]/g) == null) {
            alert("Votre mot de passe doit contenir au moins une lettre minuscule.");
        }
        else if(password.match(/[0-9]/g) == null) {
            alert("Votre mot de passe doit contenir au moins un chiffre.");
        }
        else if(password.match(/[-_*]/g) == null) {
            alert("Votre mot de passe doit contenir au moins un acractère spécial : -_*")
        }

        else if(password !== c_password) {
            alert("Merci de renseigner deux fois le même mot de passe.");
        }

        else
        {
            document.getElementById("password_up").style.border = "none";
            document.getElementById("c_password_up").style.border = "none";
        }
    }

    if (document.getElementById("username_up").style.border !== "none" || document.getElementById("password_up").style.border !== "none") {
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
            if(data === "True") {
                open('/chat', '_self');
            }
            else{
                alert("Ce pseudonyme est déjà pris.")
                document.getElementById("username_up").style.border = "solid 2px red";
            }
        },
        error: function (data, textStatus, jqXHR)
        {
            alert("There was an issue. Data not sent.");
        }
    });
});

signin_form.addEventListener("submit", function (event) {
    event.preventDefault();

    let username = signin_form.elements["username_in"].value;
    let password = signin_form.elements["password_in"].value;

    //Code de vérification, si tous ok, effectuer la requête suivante
    const regex_user = /([A-Z]*|[a-z]*|[0-9]*|[-_])*/g;
    const found_user = username.match(regex_user);

    const regex_pswd = /([A-Z]*|[a-z]*|[0-9]*|[-_*])*/g;
    const found_pswd = password.match(regex_pswd);

    if (username === "") {
        document.getElementById("username_in").style.border = "solid 2px red";
        alert("Merci de renseigner un pseudonyme.");
        return 0;
    }
    else if(username.length < 6 || username.length > 20) {
        document.getElementById("username_in").style.border = "solid 2px red";
    }
    else if (found_user[0].length === username.length) {
        document.getElementById("username_in").style.border = "none";
    }
    else {
        document.getElementById("username_in").style.border = "solid 2px red";
    }

    if (password === "") {
        document.getElementById("password_in").style.border = "solid 2px red";
        alert("Merci de renseigner un mot de passe.");
        return 0;
    }
    else if(password.length < 6 || password.length > 20) {
        document.getElementById("password_in").style.border = "solid 2px red";
    }
    else if ((found_pswd[0].length !== password.length) || (password.match(/[A-Z]/g) == null) || (password.match(/[a-z]/g) == null) || (password.match(/[0-9]/g) == null) || (password.match(/[-_*]/g) == null)) {
        document.getElementById("password_in").style.border = "solid 2px red";
    }
    else {
        document.getElementById("password_in").style.border = "none";
    }

    if (document.getElementById("username_in").style.border !== "none" || document.getElementById("password_in").style.border !== "none") {
        document.getElementById("username_in").style.border = "solid 2px red";
        document.getElementById("password_in").style.border = "solid 2px red";
        alert("Mauvais pseudonyme/mot de passe.")
        return 0;
    }

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
            if(data === "True") {
                open('/chat', '_self');
            }
            else {
                document.getElementById("username_in").style.border = "solid 2px red";
                document.getElementById("password_in").style.border = "solid 2px red";
                alert("Mauvais pseudonyme/mot de passe.");
            }
        },
        error: function (data, textStatus, jqXHR)
        {
            alert("There was an issue. Data not sent.");
        }
    });
});
