let input_data = document.querySelector('#chat_box');
let input_add_user = document.querySelector('#add_user');
let input_ban_user = document.querySelector('#ban_user')
let input_unban_user = document.querySelector('#unban_user');
let input_rem_user_channel = document.querySelector('#rem_user_channel');

let scrollbar = document.querySelector('#chat_zone_inside');
scrollbar.scrollTo(0, scrollbar.scrollHeight);

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
            scrollbar.scrollTo(0, scrollbar.scrollHeight);

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
            input_add_user.value = '';
            if(data === "True") {
                $("#members").load(" #members > *");
                alert(username + " a bien été ajouté au salon.")
            } else if (data === "Not_owner") {
                alert("Vous n'êtes pas le créateur de ce salon, vous ne pouvez pas faire cette action");
            }
            else {
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
            input_ban_user.value = '';
            if (data === "True") {
                $("#members").load(" #members > *");
                alert(username + " a bien été banni du salon.")
            } else if (data === "Not_owner") {
                alert("Vous n'êtes pas le créateur de ce salon, vous ne pouvez pas faire cette action");
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

function unban_user() {
    let username = input_unban_user.value;

    $.ajax({
        url: "unban_user/",
        type: "POST",
        headers: {'X-CSRFToken': csrftoken},
        data: {
            username: username,
        },
        success: function (data, textStatus, jqXHR)
        {
            input_unban_user.value = '';
            if (data === "True") {
                $("#members").load(" #members > *");
                alert(username + " a bien été débanni du salon.")
            } else if (data === "Not_owner") {
                alert("Vous n'êtes pas le créateur de ce salon, vous ne pouvez pas faire cette action");
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

function rem_user_channel() {
    let username = input_rem_user_channel.value;

    $.ajax({
        url: "rem_user_channel/",
        type: "POST",
        headers: {'X-CSRFToken': csrftoken},
        data: {
            username: username,
        },
        success: function (data, textStatus, jqXHR)
        {
            input_rem_user_channel.value = '';
            if (data === "True") {
                $("#members").load(" #members > *");
                alert(username + " a bien été expulsé du salon.")
            } else if (data === "Not_owner") {
                alert("Vous n'êtes pas le créateur de ce salon, vous ne pouvez pas faire cette action");
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
function send_leave() {
    if (confirm("Vous êtes sur le point de quitter ce salon. Si vous êtes encore propriétaire, " +
        "ce salon sera supprimé également. Si vous ne voulez pas le détruire, pensez à transférer vos droits avant.")) {

        $.ajax({
        url: "leave/",
        type: "POST",
        headers: {'X-CSRFToken': csrftoken},
        error: function (data, textStatus, jqXHR)
            {
                alert("There was an issue. Data not sent.");
            }
        });
    }
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

input_unban_user.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && input_unban_user.value.length !== 0) {
        unban_user();
    }
});

input_rem_user_channel.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && input_rem_user_channel.value.length !== 0) {
        rem_user_channel();
    }
});
