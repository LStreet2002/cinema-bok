firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        var roms = ["A", "B", "C", "D", "E", "F"]
        for (var i = 0; i < roms.length; i++) {
            await db
                .collection(roms[i]).doc("Monday").get().then(function (doc) {
                    document.querySelector("#" + roms[i]).querySelector(".screen").innerText = doc.data().nine
                })
            await db
                .collection(roms[i]).where("type", "==", "seat")
                .get()
                .then(async function (querySnapshot) {
                    querySnapshot.forEach(async function (doc) {
                        var conta = document.createElement("img")
                        conta.classList.add("conta")
                        conta.id = doc.id
                        if (doc.data().mondaynine === "booked") {
                            conta.src = "/pic/book.png"
                        }
                        else {
                            conta.src = "/pic/unbook.png"
                        }

                        document.querySelector("#" + roms[i]).querySelector(".megaseat").appendChild(conta)
                    })
                })
        }
        await db
            .collection("movies")
            .get()
            .then(async function (querySnapshot) {
                var boses = document.querySelectorAll(".filmselec")
                for (var i = 0; i < boses.length; i++) {
                    querySnapshot.forEach(async function (doc) {
                        var opto = document.createElement("option")
                        opto.value = doc.data().title
                        opto.innerText = doc.data().title
                        boses[i].appendChild(opto)

                    })
                }
            })
    }
    else {
        window.location.replace("login.html")
    }
})
var first = document.querySelectorAll(".roomb")
for (var i = 0; i < first.length; i++) {
    first[i].addEventListener("click", function (event) {
        document.querySelector("#subroom").style.display = "block"
        document.querySelector("#" + event.target.innerText).style.display = "grid"
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
            var tt = document.querySelectorAll(".disp")
            for (var i = 0; i < tt.length; i++) {
                tt[i].style.display = "none"
            }
            document.querySelector("#allroom").style.display = "grid"
        }
        else {
            document.querySelector("#times").style.display = "none"
            document.querySelector("#" + document.querySelector("#ident").innerText).style.display = "grid"
            document.querySelector("#subroom").style.display = "block"
        }
    }
}

var timmy = document.querySelectorAll(".timmy")
for (var i = 0; i < timmy.length; i++) {
    timmy[i].addEventListener("click", function (event) {
        document.querySelector("#times").style.display = "grid"
        document.querySelector("#subroom").style.display = "none"
        event.target.parentNode.style.display = "none"
        document.querySelector("#ident").innerText = event.target.parentNode.id

    });
}

async function movvie(e) {
    test = String(e.value)
    dae = e.options[e.selectedIndex].getAttribute("name")
    tillee = dae + test
    e.setAttribute("name", dae)
    await db.collection(e.parentNode.id).doc(e.name).get().then(async function (doc) {
        if (doc.exists) {
            e.parentNode.querySelector(".screen").innerText = doc.data()[test];
            await db
                .collection(e.parentNode.id).where("type", "==", "seat")
                .get()
                .then(async function (querySnapshot) {
                    querySnapshot.forEach(async function (doc) {
                        var reconta = document.querySelector("#" + doc.id)
                        if (doc.data()[tillee] === "booked") {
                            reconta.src = "/pic/book.png"
                        }
                        else {
                            reconta.src = "/pic/unbook.png"
                        }
                    })
                })
        }
    })
}