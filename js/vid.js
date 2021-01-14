firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    }
    else {
        window.location.replace("login.html")
    }
})

function back() {
    window.location.replace("menu.html")
}