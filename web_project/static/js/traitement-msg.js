
/* ---------------- longeur max ---------------- */

function maxLength(el){
    if ( !('maxLength' in el) ){
        let max = el.maxLength.value;
        el.onkeypress = function (){
            if (this.value.length >= max) return false;
        };
    }
}

/* --------------- salon --------------------- */

var barre_channel = document.querySelector("#barre_salon");
barre_channel.maxLength = 10;
barre_channel.style.resize = 'none';
maxLength(barre_channel);

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

/* --------------- message --------------------- */

var bouton_message = document.querySelector("#button_chat");
var barre_message = document.querySelector("#barre_chat");
barre_message.rows = 3;
barre_message.maxLength = 25;
barre_message.style.resize = 'none';
maxLength(barre_message);

function chat(){
    if (barre_message.value != "\n" ) {
        let msg = "<p>";
        msg += " " + ": ";
        msg += barre_message.value;
        msg += "</p>";
        document.querySelector("#zone_msg").innerHTML += msg;
    }
}

function send_msg(){
    $.ajax({
        url: "/test/login/data",
        type: "POST",
        data: {
           message : barre_message.value,
        },
        success: function (data, textSatus, jqXHR)
        {
            open('/chat', '_self');
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

/* ---------------- membre ------------------- */

var barre_membre = document.querySelector("#barre_membre");
barre_membre.maxLength = 10;
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
            open('/chat', '_self');
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
});*/