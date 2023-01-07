document.addEventListener( 'load', horaire(1) );  // UTC+1 : heure francaise

document.addEventListener( 'keydowm', function(event) {
    if (event.key == 'r' && (event.ctrlKey || event.metaKey)) {
        horaire(2);
    }
} );  // UTC+1 : heure francaise

function horaire(n) {
    var h, m;
    h = new Date().getUTCHours() + n;
    m = new Date().getMinutes();
    this.document.getElementById ("date").innerHTML = "(" + h + "h" + m + ")" ;
    // return "(" + h + "h" + m + ")" ;
}






















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

var code = 0;

/* jeu qui sert a rien */
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
}
