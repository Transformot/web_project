const form = document.querySelector('#login')

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let username = form.elements["username"].value;
    let password = form.elements["password"].value;

    alert("Username : " + username + "\nPassword : " + password);

    $.ajax({
        url: "signin/",
        type: "POST",
        data: {
            username: username,
            password: password,
        },
        success: function (data, textSatus, jqXHR)
        {
            open('/test', '_self');
        },
        error: function (data, textStatus, jqXHR)
        {
            alert("There was an issue. Data not sent.");
        }
    });
});