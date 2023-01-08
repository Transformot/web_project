
var message = document.getElementById("barre_chat");
message.rows = 3;
message.maxLength = 5;
message.style.resize = 'none';

function maxLength(el) {    
    if (!('maxLength' in el)) {
        var max = el.maxLength.value;
        el.onkeypress = function () {
            if (this.value.length >= max) return false;
        };
    }
}

maxLength(message);

function init() {

}

function horaire(n) {
    var h, m;
    h = new Date().getUTCHours() + n;
    m = new Date().getMinutes();
    var hor = "(" + h + "h";
    if (m < 10) {
        hor += "0";
    }
    return hor + m + ")" ;
}

function name_user(){
    return "<span style='color:red'>admin</span>";
}

function chat() {
    var msg = "<p>";
    msg += horaire(1) + " " + name_user() + ": ";
    msg += message.value;
    msg += "</p>";
    document.getElementById("chat_box").innerHTML += msg;
    message.value = '';
}


message.addEventListener( 'keyup', function(event) {
    if (event.key == 'Enter') {
        chat();
    }
});

document.addEventListener( 'load', init() );  // UTC+1 : heure francaise





/* --------------------- js json ---------------------------- */

/*
$.getJSON( "../data/titanic.json", function( data ) {

    $.each( data, function( passenger ) {

        $( "#titanic_data" ).append( "<tr class='personne'>" + passenger +"</tr>" );

        $.each(data.passenger, function( PassengerId, Survived) {
            $( "#titanic_data .personne" ).append( "<td>" + PassengerId +"</td>" );
            $( "#titanic_data .personne" ).append( "<td>" + Survived +"</td>" );
        });
    });
});*/

/* -- exemple format json 
{
    "message_historique":[
        {
        "Date_h": 10,
        "Date_m": 30,
        "User": "mr_braun",
        "Msg": "fdvfdsv dfvsvfvdsv fvdssvfdfs",
        },
        {
        "Date_h": 10,
        "Date_m": 30,
        "User": "mr_braun",
        "Msg": "fdvfdsv dfvsvfvdsv fvdssvfdfs",
        },
        {
        "Date_h": 10,
        "Date_m": 30,
        "User": "mr_braun",
        "Msg": "fdvfdsv dfvsvfvdsv fvdssvfdfs",
        },
        {
        "Date_h": 10,
        "Date_m": 30,
        "User": "mr_braun",
        "Msg": "fdvfdsv dfvsvfvdsv fvdssvfdfs",
        },
        {
        "Date_h": 10,
        "Date_m": 30,
        "User": "mr_braun",
        "Msg": "fdvfdsv dfvsvfvdsv fvdssvfdfs",
        }
    ]
}*/


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
