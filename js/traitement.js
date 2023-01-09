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
}
