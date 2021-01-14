firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    }
    else {
        window.location.replace("login.html")
    }
})
// User is signed in.
function back() {
    window.location.replace("login.html")
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}
function tab(e) {
    window.location.replace(e.parentNode.id + ".html")
}
