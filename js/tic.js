firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    }
    else {
        window.location.replace("login.html")
    }
})
var first = document.querySelectorAll(".roomb")
for (var i = 0; i < first.length; i++) {
    first[i].addEventListener("click", function (event) {
        document.querySelector("#subroom").style.display = "block"
        document.querySelector("#" + event.target.innerText).style.display = "block"
        event.target.parentNode.style.display = "none"
    });
}
function back() {
    if (document.querySelector("#allroom").style.display === "grid") {
        window.location.replace("menu.html")
    }
    else {
        if (document.querySelector("#subroom").style.display === "block") {
            document.querySelector("#subroom").style.display = "none"
            document.querySelector("#allroom").style.display = "grid"
        }
        else {
            document.querySelector("#times").style.display = "none"
            document.querySelector("#subroom").style.display = "block"
        }
    }
}

var disp = document.querySelectorAll(".disp")
for (var i = 0; i < disp.length; i++) {
    disp[i].addEventListener("click", function (event) {
        console.log("hhh")
        document.querySelector("#times").style.display = "grid"
        document.querySelector("#subroom").style.display = "none"
        event.target.parentNode.style.display = "none"
        document.querySelector("#ident").innerText = event.target.id
    });
}
