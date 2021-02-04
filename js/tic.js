var roms = ["A", "B", "C", "D", "E", "F"]
var dal = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var howers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "nine", "10", "eleven", "12", "thirteen", "14", "fifteen", "16", "seventeen", "18", "19", "20", "21", "22", "23", "24"]
firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        trallers()
        roomtimes()
        for (var i = 0; i < roms.length; i++) {
            await db
                .collection(roms[i]).doc("Monday").get().then(function (doc) {
                    document.querySelector("#" + roms[i]).querySelector(".screen").innerText = doc.data().nine
                })
            await db
                .collection(roms[i]).orderBy("number", "asc").get().then(async (querySnapshot) => {
                    querySnapshot.forEach(async (doc) => {
                        var conta = document.createElement("img")
                        conta.id = doc.id
                        if (doc.exists) {
                            await db
                                .collection(roms[i]).doc(doc.id).collection("txmes").doc("Mondaynine").get().then((doc) => {
                                    if (doc.exists) {
                                        conta.classList.add("conta")
                                        conta.setAttribute("onclick", "seatinfo(this)")
                                        if (doc.data().status === "booked") {
                                            conta.src = "/pic/book.png"
                                            conta.setAttribute("name", "booked")
                                        }
                                        else {
                                            conta.src = "/pic/unbook.png"
                                            conta.setAttribute("name", "unbooked")
                                        }
                                        document.querySelector("#" + roms[i - 1]).querySelector(".megaseat").appendChild(conta)
                                    }
                                })
                        }
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
        resetimer()
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
    timmy[i].addEventListener("click", async function (event) {
        document.querySelector("#times").style.display = "grid"
        document.querySelector("#subroom").style.display = "none"
        event.target.parentNode.style.display = "none"
        document.querySelector("#ident").innerText = event.target.parentNode.id
        for (var x = 0; x < days.length; x++) {

            for (var i = 0; i < teyms.length; i++) {
                var ti = document.querySelector("#times")

                await db.collection(ti.querySelector("#ident").innerText).doc(days[x]).get().then(async function (doc) {
                    if (doc.exists) {
                        ti.querySelector("#" + days[x]).querySelector("." + teyms[i]).querySelector(".filmselec").value = doc.data()[teyms[i]]
                    }
                })
            }
        }

    });
}

async function movvie(e) {
    test = String(e.value)
    dae = e.options[e.selectedIndex].getAttribute("name")
    tillee = dae + test
    e.setAttribute("name", dae)
    console.log(e.parentNode.id)
    await db
        .collection(e.parentNode.id).orderBy("number", "asc").get().then(async (querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                var reconta = e.parentNode.querySelector("#" + doc.id)
                if (doc.exists) {
                    await db
                        .collection(e.parentNode.id).doc(doc.id).collection("txmes").doc(tillee).get().then((doc) => {
                            if (doc.exists) {
                                console.log(doc.data())

                                if (doc.data().status === "booked") {
                                    reconta.src = "/pic/book.png"
                                    reconta.setAttribute("name", "booked")
                                }
                                else {
                                    reconta.src = "/pic/unbook.png"
                                    reconta.setAttribute("name", "unbooked")
                                }
                            }
                        })
                }
            })
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
            selt.setAttribute("value", teymsx[i])

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
    butt.classList.add("hovv")
    butt.setAttribute("onclick", "settimes()")
    butt.id = "butt"

    document.querySelector("#times").appendChild(butt)
}
async function settimes() {
    document.querySelector("#butt").innerText = "Updating..."
    for (var x = 0; x < days.length; x++) {
        for (var i = 0; i < teyms.length; i++) {
            await db.collection(document.querySelector("#ident").innerText).doc(days[x]).update({
                [teyms[i]]: document.querySelector("#" + days[x]).querySelector("." + teyms[i]).querySelector(".filmselec").value,
            })
        }
    }
    await db
        .collection("movies")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
                var sss = document.querySelectorAll(".filmselec");
                tempa = []
                tempax = []
                for (var i = 0; i < sss.length; i++) {

                    if (sss[i].options[sss[i].selectedIndex].innerText === doc.id) {

                        var timt = sss[i].parentNode.parentNode.id + ":" + sss[i].options[sss[i].selectedIndex].parentNode.parentNode.querySelector(".daytime").getAttribute("value")
                        timtx = sss[i].parentNode.parentNode.id + sss[i].options[sss[i].selectedIndex].parentNode.parentNode.querySelector(".daytime").getAttribute("name")
                        tempa.push(timt)
                        tempax.push(timtx)
                    }
                }
                db.collection("movies").doc(doc.id).collection("Rooms").doc(document.querySelector("#ident").innerText).set({
                    times: tempa,
                    timesx: tempax
                })
            })
        })
    document.querySelector("#butt").innerText = "Update"
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
async function seatinfo(e) {
    document.querySelector("#seatinfo").style.display = "block"
    document.querySelector("#seatinfo").setAttribute("value", e.id)
    document.querySelector("#seatinfo").setAttribute("name", e.parentNode.parentNode.id)
    document.querySelector("#greyed").style.display = "block"
    document.querySelector("#seatio").innerText = "I display the information for Room " + e.parentNode.parentNode.id + " Seat " + e.id + " at " + e.parentNode.parentNode.querySelector(".yeah").options[e.parentNode.parentNode.querySelector(".yeah").selectedIndex].innerText
    document.querySelector("#confirm").style.display = "none"
    if (e.getAttribute("name") === "booked") {
        document.querySelector("#seatinfo").querySelector("#unbok").style.display = "block"
    }
    else {
        document.querySelector("#seatinfo").querySelector("#unbok").style.display = "none"
    }
}
var tem = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
/*async function slapseats() {
    for (var y = 0; y < roms.length; y++) {
        for (var f = 0; f < tem.length; f++) {
            for (var x = 0; x < days.length; x++) {
                for (var i = 0; i < teyms.length; i++) {
                    var itsit = days[x] + teyms[i]
                    await db
                        .collection(roms[y]).doc(tem[f]).collection("txmes").doc(itsit).set({
                            status: "booked",
                        })
                    await db
                        .collection(roms[y]).doc(tem[f]).set({
                            number: f,
                        })
                }
            }
        }
    }
}*/

function antiseat() {
    document.querySelector("#seatinfo").style.display = "none"
    document.querySelector("#greyed").style.display = "none"
    document.querySelector("#bigone").style.display = "none"
}
function credent() {
    document.querySelector("#confirm").style.display = "grid"
}
async function refuns(e) {
    const logins = document.querySelector("#confirm");


    const email = "authsender@gmail.com";
    const password = logins.querySelector("#passowrd").value;

    dopper = document.querySelector("#" + e.parentNode.parentNode.getAttribute("name")).querySelector(".yeah")

    // firebase login
    auth.signInWithEmailAndPassword(email, password).then(async (cred) => {
        console.log(e.parentNode.parentNode.getAttribute("name"))
        console.log(e.parentNode.parentNode.getAttribute("value"))
        console.log(dopper.options[dopper.selectedIndex].getAttribute("name") + dopper.value)

        await db.collection(e.parentNode.parentNode.getAttribute("name")).doc(e.parentNode.parentNode.getAttribute("value")).collection("txmes").doc(dopper.options[dopper.selectedIndex].getAttribute("name") + dopper.value).update({
            status: "unbooked"
        }).then(async function resez() {
            document.querySelector("#" + e.parentNode.parentNode.getAttribute("name")).querySelector("#" + e.parentNode.parentNode.getAttribute("value")).src = "pic/unbook.png"
            document.querySelector("#" + e.parentNode.parentNode.getAttribute("name")).querySelector("#" + e.parentNode.parentNode.getAttribute("value")).setAttribute("unbooked")
            antiseat()
        });
    }).catch(error => console.log(error));
    ;
}
function refunsM(e) {
    document.querySelector("#bigone").style.display = "grid"
    document.querySelector("#bigone").setAttribute("name", e.parentNode.id)
    document.querySelector("#greyed").style.display = "block"
}
async function unirefun(e) {
    const logins = document.querySelector("#bigone");


    const email = "authsender@gmail.com";
    const password = logins.querySelector("#posswo").value;

    roomie = e.parentNode.getAttribute("name")

    dast = document.querySelector("#" + roomie).querySelector(".yeah")

    // firebase login
    auth.signInWithEmailAndPassword(email, password).then(async (cred) => {
        for (var i = 0; i < tem.length; i++) {
            e.style.backgroundColor = "#ce7272"
            e.innerText = "updating:" + tem[i]
            await db.collection(roomie).doc(tem[i]).update({
                [dast.options[dast.selectedIndex].getAttribute("name") + dast.value]: "unbooked"
            })
        } location.reload()
    }).catch(error => e.innerText = "Wrong password",
        setTimeout(function () { e.innerText = " CONFIRM" }, 1500));
}


async function resetimer() {
    setInterval(async function () {
        var d = new Date();
        var n = d.getDay();
        var h = d.getHours();
        var m = d.getMinutes()
        if (m === 10) {
            console.log("reset")
            for (var i = 0; i < roms.length; i++) {
                var ides = []
                await db
                    .collection(roms[i]).orderBy("number", "asc").get().then(async (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            ides.push(doc.id)
                        })
                        for (var l = 0; l < ides.length; l++) {
                            await db.collection(roms[i]).doc(ides[l]).collection("txmes").doc(dal[n] + howers[h]).get().then(async function (doc) {
                                if (doc.exists) {
                                    await db.collection(roms[i]).doc(ides[l]).collection("txmes").doc(dal[n] + howers[h]).update({
                                        status: "unbooked"
                                    })
                                }
                            })

                        }

                    })
            }
        }
        else {
            console.log("no reset")
        }
    }, 60 * 1000);
}