function testInput () {
    let pseudo = document.formSign.signInPseudonyme.value;
    //pseudo = pseudo.trim ();

    if ((pseudo == "")) {
        alert ("Merci de renseigner les champs obligatoires.");
        return False;
    }
    else {
        return True;
    }
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

}
