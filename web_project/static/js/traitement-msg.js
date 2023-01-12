
var message = document.getElementById("barre_chat");
message.rows = 3;
message.maxLength = 25;
message.style.resize = 'none';

function maxLength(el){
    if ( !('maxLength' in el) ){
        var max = el.maxLength.value;
        el.onkeypress = function (){
            if (this.value.length >= max) return false;
        };
    }
}
maxLength(message);

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
    if (message.value !== "\n" ) {
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

















/* ------------------------- requete --------------------------- */
// // https://www.freecodecamp.org/news/here-is-the-most-popular-ways-to-make-an-http-request-in-javascript-954ce8c95aaa/
/*
function init_salon(){
    $.ajax({
        url: "",
        method: "GET",
        dataType : "json",
    })
    .done(function(response){
        let data = JSON.stringify(response);
        convertion(data);  //$("div#res").append(data);
    })
    .fail(function(error){
        alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
    })
    .always(function(){
        alert("Requête effectuée");
    });
}

function convertion( x ){
    $.getJSON( x, function( data ) {
        $.each( data, function( message ) {
            $( "#message_data" ).append( "<p class='message'>" + message +"</p>" );

            $.each(data.message, function( Date, User, Role, Msg) {
                $( "#message_data .message" ).append( Date );
                if (Role == 0) $( "#message_data .message" ).append( " <span style='color:red'>");
                $( "#message_data .message" ).append( " "+ User +": " );
                if (Role == 0) $( "#message_data .message" ).append( "</span>");
                $( "#message_data .message" ).append( Msg );
                //$( "#titanic_data .personne" ).append( "<td>" + Survived +"</td>" );
            });
        });
    });
}

var obj = '[{"availability_id":"109465","date":"2017-02-21","price":"430000"},{...};
var stringify = JSON.parse(obj);
for (var i = 0; i < stringify.length; i++) {
    console.log(stringify[i]['price']);
}
*/

/* -- exemple format json
{
    "historique_message":[
        {
        "Date": "('HH'h'mm')",
        "User": "User_NameXX",
        "Role": 0 ou 1; // 0=chef ; 1=soldat ; 2=banni
        "Msg": "Voici unmessage",
        },
        {
        "Date": "(10h30)"
        "User": "mr_braun",
        "Role": 1;
        "Msg": "fdvfdsv dfvsvfvdsv fvdssvfdfs",
        },
        {
        "Date": "(10h35)"
        "User": "Transformot",
        "Role": 1;
        "Msg": "Comment ca mon reuf ?",
        },
        {
        "Date": "(10h55)"
        "User": "mr_braun",
        "Role": 1;
        "Msg": "fdvfdsv dfvsvfvdsv fvdssvfdfs",
        },
        {
        "Date": "(11h24)"
        "User": "Transformot",
        "Role": 1;
        "Msg": "Ta mère je la baise",
        },
    ]
}

{
    "my_channels":[
        {
        "Name": "salon1",
        "Id": xxxx,
        "Role": 0 ou 1;
        },
        {"Name": "Ensisa_Meca",
        "Id": 22,
        "Role": 1;
        },
        {"Name": "Info",
        "Id": 1,
        "Role": 0;
        },
    ]
}
*/


/* ------------------------- jeu ----------------------------------- */
/*
function test() {
    var a = test;
    alert(a);
}
test();

function test() {
    var a = "test";
    alert(a);
}
test();

function test2() {
    var i, j;
    for ( i = 0; i < 3; i++) {
        j = i * 2;
    }
    alert( "i = " + i + ", j = " + j );
}
test2();*/
/*
var code = 0;

// jeu qui sert a rien
document.addEventListener( 'keydown', function(event) {
    if (event.key == 'a' || event.key == 'z') {
        code ++;
        if (code >= 2){
            jeu();
            code = 0;
        }
    }
} );
document.addEventListener( 'keyup', function(event) {
    if (event.key == 'a' || event.key == 'z') {
        code = 0;
    }
} );

function jeu() {
    if ( confirm( "Voulez-vous commencer le jeu ?" ) ) {
        var nombreMagique = Math.round( Math.random() + 10 );
        var coup = 0;
        while (true) {
            coup ++;
            var val = prompt( "Votre chiffre ?" );
            if (val) {
                if (val == nombreMagique ) {
                    alert( "Félicitation, vous avez mis " + coup + " coup(s)" );
                    break;
                } else
                if ( val > nombreMagique ) {
                    alert( "Il est plus petit" );
                } else
                    alert( "Il est plus grand" );
            } else
                break;
        }
    }
} */
