// Var
allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.'.split('');

// Verification for sign in
let btnIn = document.querySelector("#btnSignIn");

btnIn.addEventListener('click', signInVerification);
function signInVerification () {
    let pseudo = document.getElementById("pseudonymeSignIn").value;
    let password = document.getElementById("passwordSignIn").value;
    let verification = true;

    if (pseudo == "") {
        document.getElementById("pseudonymeSignIn").style.border = "solid 2px red";
        alert("Merci de renseigner un pseudonyme.");
        verification = false;
    }
    else{
        document.getElementById("pseudonymeSignIn").style.border = "none";
    }

    if (password == "") {
        document.getElementById("passwordSignIn").style.border = "solid 2px red";
        alert("Merci d'entrer votre un mot de passe.");
        verification = false;
    }
    else if (password.length < 6 || password.length > 20) {
        document.getElementById("passwordSignIn").style.border = "solid 2px red";
        alert("Mauvais mot de passe.");
        verification = false;
    }
    else{
        document.getElementById("passwordSignIn").style.border = "none";
    }

    if (verification === true)
    {
        // [Verification si bonnes données dans la base]
        alert("Comming soon...");
        return true;
    }
    else{
        return false;
    }
}

// Verification for sign up
let btnUp = document.querySelector("#btnSignUp");

btnUp.addEventListener('click', signUpVerification);
function signUpVerification () {
    let pseudo = document.getElementById("pseudonymeSignUp").value;
    let password = document.getElementById("passwordSignUp").value;
    let passwordVerif = document.getElementById("passwordSignUpVerif").value;
    let verification = true;

    if (pseudo == "") {
        document.getElementById("pseudonymeSignUp").style.border = "solid 2px red";
        alert("Merci de renseigner un pseudonyme.");
        verification = false;
    }
    else {
        for (let i=0; i < pseudo.length; i++) {
            if (!(pseudo[i] in allowed)){
                alert("Votre pseudonyme ne remplit pas les critères.");
            }
        }
        if ('b'=='a') {
            alert("hello.")
        }
        else {
            document.getElementById("pseudonymeSignUp").style.border = "none";
        }
    }
    if (password == "") {
        document.getElementById("passwordSignUp").style.border = "solid 2px red";
        document.getElementById("passwordSignUpVerif").style.border = "solid 2px red";
        alert("Merci de renseigner un mot de passe.");
        verification = false;
    }
    else if (password.length < 6) {
        document.getElementById("passwordSignUp").style.border = "solid 2px red";
        document.getElementById("passwordSignUpVerif").style.border = "solid 2px red";
        alert("Le mot de passe doit comporter six caractères au minimum.");
        verification = false;
    }
    else{
        document.getElementById("passwordSignUp").style.border = "none";
        if (passwordVerif == "") {
            document.getElementById("passwordSignUpVerif").style.border = "solid 2px red";
            alert("Merci de confirmer le mot de passe.");
            verification = false;
        }
        else if (password !== passwordVerif) {
            document.getElementById("passwordSignUpVerif").style.border = "solid 2px red";
            alert("Merci de renseigner le même mot de passe.");
            verification = false;
        }
        else{
            document.getElementById("passwordSignUpVerif").style.border = "none";
        }
    }

    if (verification === true)
    {
        // Verification si bonnes données dans la base
        alert("Comming soon...");
        return true;
    }
    else{
        return false;
    }
}

// Notes :
    /*
    // Password verification before send to server
    if ((password.lenght < 6)) {
        alert ("Le mot de passe doit faire au moins 6 caractères.");
        return False;
    }
    if ((password.lenght < 6)) {
        alert ("Le mot de passe doit faire au moins 6 caractères.");
        return False;
    }

     */
    /*
    var caracSpé = 0;
    if (password(0)!=1){
        caracSpé += 1;
    }
    */
