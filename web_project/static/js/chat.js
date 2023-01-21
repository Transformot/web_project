let input_channel = document.querySelector('#input_channel');
let input_username = document.querySelector('#input_username');

function send_channel() {
    let name = input_channel.value;

    const regex_name = /([A-Z]*|[a-z]*|[0-9]*|[-_\s\[\]#])*/g;
    const found_name = name.match(regex_name);

    if (name === "") {
        alert("Merci de renseigner un nom.");
    } else if (name.length > 20) {
        alert("Le nom choisi doit être inférieur à 20 caractères.");
    } else if (found_name[0].length !== name.length) {
        alert("Merci de sélectionner des caractères valides pour le nom.")
    }
    else {
        $.ajax({
            url: "add_channel/",
            type: "POST",
            headers: {'X-CSRFToken': csrftoken},
            data: {
                name: name,
            },
            success: function (data, textSatus, jqXHR)
            {
                open(data, '_self');
            },
            error: function (data, textStatus, jqXHR)
            {
                alert("There was an issue. Data not sent.");
            }
        });
    }
}

function send_username() {
    let username = input_username.value;

    const regex_username = /([A-Z]*|[a-z]*|[0-9]*|[-_])*/g;
    const found_username = username.match(regex_username);

    if (username === "") {
        alert("Merci de renseigner un pseudonyme.");
    } else if (username.length > 20) {
        alert("Le nom choisi doit être inférieur à 20 caractères.");
    } else if (username.length < 6) {
        alert("Le nom choisi doit être supérieur à 6 caractères.");
    } else if (found_username[0].length !== username.length) {
        alert("Merci de sélectionner des caractères valides pour le nom.")
    }
    else {
        $.ajax({
            url: "chg_username/",
            type: "POST",
            headers: {'X-CSRFToken': csrftoken},
            data: {
                username: username,
            },
            success: function (data, textSatus, jqXHR)
            {
                 if(data === "True") {
                    open('/chat', '_self');
                } else {
                    alert("Ce pseudo est déjà utilisé. Choisissez-en un autre.");
                }
            },
            error: function (data, textStatus, jqXHR)
            {
                alert("There was an issue. Data not sent.");
            }
        });
    }
}

input_channel.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        send_channel();
    }
});

input_username.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        send_username();
    }
});