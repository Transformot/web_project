
var message = document.getElementById("barre_chat");
message.rows = 3;
message.maxLength = 25;
message.style.resize = 'none';

var channel = document.getElementById("barre_salon");
channel.maxLength = 10;
channel.style.resize = 'none';

var membre = document.getElementById("barre_membre");
membre.maxLength = 10;
membre.style.resize = 'none';

function maxLength(el){
    if ( !('maxLength' in el) ){
        var max = el.maxLength.value;
        el.onkeypress = function (){
            if (this.value.length >= max) return false;
        };
    }
}
maxLength(message);
maxLength(channel);
maxLength(membre);

/* -------- fonction à remplacé par les requête HTTP ---------- */

// UTC+1 : heure francaise
function horaire(n){
    var h, m;
    h = new Date().getUTCHours() + n;
    m = new Date().getMinutes();
    var hor = "(";
    if (h < 10) {
        hor += "0";
    }
    hor += h +"h";
    if (m < 10) {
        hor += "0";
    }
    return hor + m +")" ;
}

function name_user(){
    var x_name = "admin";
    var x_color = "red";
    return "<span style='color:"+ x_color +"'>"+ x_name +"</span>";
}

function chat(){
    if (message.value != "\n" ) {
        var msg = "<p>";
        msg += horaire(1) + " " + name_user() + ": ";
        msg += message.value;
        msg += "</p>";
        document.getElementById("chat_box").innerHTML += msg;
    }
    message.value = '';
}

let btnSend = document.querySelector("#button_chat");
btnSend.addEventListener('click', chat);
message.addEventListener('keyup', function(event){
    if (event.key == 'Enter'){
        chat();
    }
});

function salon(){
    if (channel.value != "\n" ) {
        var sal = "<div class='membre'>";
        sal += "<a>"
        sal += channel.value + "</a>";
        sal += "</div>";
        document.getElementById("zone_salons").innerHTML += sal;
    }
    channel.value = '';
}

channel.addEventListener('keyup', function(event){
    if (event.key == 'Enter'){
        salon();
    }
});

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