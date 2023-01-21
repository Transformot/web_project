let input_data = document.querySelector('#chat_box');
let input_add_user = document.querySelector('#add_member');
let input_ban_user = document.querySelector('#ban_user')

function send_message() {
    let data = input_data.value;

    $.ajax({
        url: "add_message/",
        type: "POST",
        headers: {'X-CSRFToken': csrftoken},
        data: {
            data: data,
        },
        success: function (data, textStatus, jqXHR)
        {
            input_data.value = '';
            $("#chat_zone_inside").load(" #chat_zone_inside > *");

        },
        error: function (data, textStatus, jqXHR)
        {
            alert("There was an issue. Data not sent.");
        }
    });
}

function add_user() {
    let username = input_add_user.value;

    $.ajax({
        url: "add_user/",
        type: "POST",
        headers: {'X-CSRFToken': csrftoken},
        data: {
            username: username,
        },
        success: function (data, textStatus, jqXHR)
        {
            if(data === "True") {
                input_add_user.value = '';
                $("#members").load(" #members > *");
                alert(username + " a bien été ajouté au salon.")
            } else {
                alert("Le pseudo n'est pas valide ou l'utilisateur n'existe pas.")
            }
        },
        error: function (data, textStatus, jqXHR)
        {
            alert("There was an issue. Data not sent.");
        }
    });
}

function ban_user() {
    let username = input_ban_user.value;

    $.ajax({
        url: "ban_user/",
        type: "POST",
        headers: {'X-CSRFToken': csrftoken},
        data: {
            username: username,
        },
        success: function (data, textStatus, jqXHR)
        {
            if (data === "True") {
                input_ban_user.value = '';
                $("#members").load(" #members > *");
                alert(username + " a bien été banni du salon.")
            } else {
                alert("Le pseudo n'est pas valide ou l'utilisateur n'est pas dans ce salon.")
            }
        },
        error: function (data, textStatus, jqXHR)
        {
            alert("There was an issue. Data not sent.");
        }
    });
}

input_data.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && input_data.value.length !== 0) {
        send_message();
    }
});

input_add_user.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && input_add_user.value.length !== 0) {
        add_user();
    }
});


input_ban_user.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && input_ban_user.value.length !== 0) {
        ban_user();
    }
});


/*
const bckg = document.querySelector('#background');

function maxLength(el){
    if ( !('maxLength' in el) ){
        let max = el.maxLength.value;
        el.onkeypress = function (){
            if (this.value.length >= max) return false;
        };
    }
}

var barre_channel = document.querySelector("#barre_salon");
var channel = document.querySelector(".salon");
barre_channel.maxLength = 10;
barre_channel.rows = 1;
barre_channel.style.resize = 'none';
maxLength(barre_channel);

// ---------- crée salon

function salon(){
    if (barre_channel.value != "\n" ) {
        let sal = "<div class='salon'>";
        sal += "<a>"
        sal += ">_ " + barre_channel.value + "</a>";
        sal += "</div>";
        document.querySelector("#zone_salons").innerHTML += sal;
    }
    else {
        alert("Vous devez metre un mot");
    }
}

function create_channel() {
    $.ajax({
        url: "/test/login/data",
        type: "POST",
        data: {
            name_channel : barre_channel.value,
        },
        success: function (data, textSatus, jqXHR)
        {
            open('/chat', '_self');
        },
        error: function (data, textStatus, jqXHR)
        {
            alert("There was an issue. Data not sent. \n channel name : " + barre_channel.value);
            salon();
        }
    });
    setTimeout(clear_ch, 1000);
}

function clear_ch(){
    barre_channel.value = '';
}

barre_channel.addEventListener('keypress', function (event) {
    if (event.key == 'Enter'){
        create_channel();
    }
});

// ------- aller dans salon


// ------- quitter def salon

function show_window() {
    bckg.style.display = 'block';
}

function hide_window() {
    bckg.style.display = 'none';
}

function quit_channel() {
    $.ajax({
        url: "/test/login/data",
        type: "GET",

        success: function (data, textSatus, jqXHR) {
            open('/chat', '_self');
        },

        error: function (data, textStatus, jqXHR) {
            alert("Vous n'avez pas réussi à partir du salon.");
        }
    });
}

$('#background').on('click', function(event) {
    if (event.target !== this)
        return;
    hide_window()
});

// --------- envoyer message

var bouton_message = document.querySelector("#button_chat");
var barre_message = document.querySelector("#barre_chat");
barre_message.rows = 3;
barre_message.maxLength = 300;
barre_message.style.resize = 'none';
maxLength(barre_message);

function chat(){
    if (barre_message.value != "\n" ) {
        let msg = "<p>";
        msg += " " + ": ";
        msg += barre_message.value +"(envoie loupé)";
        msg += "</p>";
        document.querySelector("#zone_msg").innerHTML += msg;
    }
}

function send_msg(){
    $.ajax({
        url: "/test/login/data",
        type: "POST",
        data: {
           data : barre_message.value,
        },
        success: function (data, textSatus, jqXHR)
        {
            open('/chat/user/channel', '_self');
        },
        error: function (data, textStatus, jqXHR)
        {
            alert("There was an issue. Data not sent. -> " + barre_message.value);
            chat();
        }
    });
    setTimeout(clear_msg, 500);
}

function clear_msg(){
    barre_message.value = '';
}

bouton_message.addEventListener('click', send_msg);
barre_message.addEventListener('keypress', function (event) {
    if (event.key == 'Enter'){
        send_msg();
    }
});

// -------- suprimer message

// inviter utilisateur

var barre_membre = document.querySelector("#barre_membre");
barre_membre.maxLength = 10;
barre_membre.rows = 1;
barre_membre.style.resize = 'none';
maxLength(barre_membre);

function membre(){
    if (barre_membre.value != "\n" ) {
        let usr = "<div class='membre'>";
        usr += "<a>"
        usr += ">_ " + barre_membre.value + "</a>";
        usr += "</div>";
        document.querySelector("#zone_membres").innerHTML += usr;
    }
    else {
        alert("Vous devez metre un mot");
    }
}

function invite_user() {
    $.ajax({
        url: "/test/login/data",
        type: "POST",
        data: {
            username : barre_membre.value,
        },
        success: function (data, textSatus, jqXHR)
        {
            open('/chat/user/channel', '_self');
        },
        error: function (data, textStatus, jqXHR)
        {
            alert("There was an issue. Data not sent. \n user name : " + barre_membre.value);
            membre();
        }
    });
    setTimeout(clear_usr, 500);
}

function clear_usr(){
    barre_membre.value = '';
}

barre_membre.addEventListener('keypress', function (event) {
    if (event.key == 'Enter'){
        invite_user();
    }
});

// ------- bannir membre

var bouton_bannir = document.querySelector("#button_bannished");
var barre_bannir = document.querySelector("#barre_bannished");
barre_bannir.rows = 1;
barre_bannir.maxLength = 25;
barre_bannir.style.resize = 'none';
maxLength(barre_bannir);

// ------- affecter role à un membre

var bouton_rename = document.querySelector("#button_rename");
var barre_rename = document.querySelector("#barre_rename");
barre_rename.rows = 1;
barre_rename.maxLength = 25;
barre_rename.style.resize = 'none';
maxLength(barre_bannir);


/* --------------------------------------------------- */
/* --------------------------------------------------- */
/* ------------------- ------------------------------- */

/* resource
// https://www.pierre-giraud.com/jquery-apprendre-cours/creation-requete-ajax/
// https://analyse-innovation-solution.fr/publication/fr/jquery/les-requetes-ajax-avec-jquery
$(document).ready(function(){
    $.ajax({
        url: "une/url/au/choix", //L'URL de la requête
        method: "GET", //La méthode d'envoi (type de requête)
        // "PUT":mettre dans la base de donné,
        dataType : "json", //Le format de réponse attendu
        beforeSend: function (){
            //code à executé
        }
    })
    //Ce code sera exécuté en cas de succès - La réponse du serveur est passée à done()
    // On peut par exemple convertir cette réponse en chaine JSON et insérer
    // cette chaine dans un div id="res"
    .done(function(response){
        // let data = JSON.stringify(response);
        // $("div#res").append(data);
    })
    //Ce code sera exécuté en cas d'échec - L'erreur est passée à fail()
    //On peut afficher les informations relatives à la requête et à l'erreur
    .fail(function(error){
        alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
    })
    //Ce code sera exécuté que la requête soit un succès ou un échec
    .always(function(){
        alert("Requête effectuée");
    });
});

*/
