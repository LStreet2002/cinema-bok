firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        var roms = ["A", "B", "C", "D", "E", "F"]
        trallers()
        roomtimes()
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
        opton[i].value = e.getAttribute("name")

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
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
var teyms = ["nine", "eleven", "thirteen", "fifteen", "seventeen"]
var teymsx = ["9:00", "11:00", "13:00", "15:00", "17:00"]
function trallers() {
    for (var x = 0; x < days.length; x++) {
        var totee = document.createElement("div")
        totee.id = days[x]
        totee.classList.add("days")

        var head = document.createElement("p")
        head.innerText = days[x].toUpperCase()
        head.classList.add("dayid")

        totee.appendChild(head)

        for (var i = 0; i < teyms.length; i++) {
            var sup = document.createElement("div")
            sup.classList.add(teyms[i], "timeput")

            var selt = document.createElement("p")
            selt.setAttribute("name", teyms[i])
            selt.classList.add("daytime")
            selt.innerText = teymsx[i] + "-"

            var drope = document.createElement("select")
            drope.classList.add("filmselec")

            sup.appendChild(selt)
            sup.appendChild(drope)

            totee.appendChild(sup)
        }
        document.querySelector("#times").appendChild(totee)

    }
    var butt = document.createElement("button")
    butt.innerText = "Update"
    butt.setAttribute("onclick", "settimes()")
    butt.id = "butt"

    document.querySelector("#times").appendChild(butt)
}
async function settimes() {
    for (var x = 0; x < days.length; x++) {
        for (var i = 0; i < teyms.length; i++) {
            await db.collection(document.querySelector("#ident").innerText).doc(days[x]).update({
                [teyms[i]]: document.querySelector("#" + days[x]).querySelector("." + teyms[i]).querySelector(".filmselec").value,
            })
        }
    }
}
async function roomtimes() {
    var roomblos = document.querySelectorAll(".yeah")
    for (var y = 0; y < roomblos.length; y++) {
        for (var x = 0; x < days.length; x++) {

            for (var i = 0; i < teyms.length; i++) {
                var dayet = document.createElement("option")
                dayet.setAttribute("value", teyms[i])
                dayet.setAttribute("name", days[x])
                dayet.innerText = days[x] + " " + teymsx[i]
                roomblos[y].appendChild(dayet)
            }
        }

    }
}