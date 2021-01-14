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
function sage(e) {
    var rese = document.querySelectorAll(".agi")
    console.log(rese)
    for (i = 0; i < rese.length; i++) {
        rese[i].style.backgroundColor = "rgba(0,0,0,0)"
        rese[i].style.color = "rgb(0,0,0)"
        rese[i].setAttribute("name", "")
    }
    e.style.backgroundColor = "#0A0903"
    e.style.color = "white"
    e.setAttribute("name", "active")
}