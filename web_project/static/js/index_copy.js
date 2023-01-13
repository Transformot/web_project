const bckg = document.querySelector('#background');

function show_window() {
    bckg.style.display = 'block'
}
function hide_window() {
    bckg.style.display = 'none'
}

$('#background').on('click', function(event) {
    if (event.target !== this)
        return;
    hide_window()
});