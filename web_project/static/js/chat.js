let input = document.querySelector('#input');

function send_channel() {
    let name = input.value;

    const regex_name = /([A-Z]*|[a-z]*|[0-9]*|[-_]*\s)*/g;
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
            url: "/chat/add_channel/",
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
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        send_channel();
    }
});