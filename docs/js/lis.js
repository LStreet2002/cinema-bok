
var roms = ["A", "B", "C", "D", "E", "F"]
var dal = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var howers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "nine", "10", "eleven", "12", "thirteen", "14", "fifteen", "16", "seventeen", "18", "19", "20", "21", "22", "23", "24"]
function back() {
    if (document.querySelector("#form").style.display === "grid") {
        document.querySelector("#form").style.display = "none"
        document.querySelector("#helder").style.display = "block"
        document.querySelector("#seletor").style.display = "block"
    }
    else {
        window.location.replace("menu.html")
    }
}
firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        await db
            .collection("movies")
            .get()
            .then(async function (querySnapshot) {
                querySnapshot.forEach(async function (doc) {
                    if (doc.id === "none") { }
                    else {
                        var storage = await firebase.storage();

                        await storageRef
                            .child("poster/" + doc.data().photo)
                            .getDownloadURL()
                            .then(async function (url) {
                                var pocket = document.createElement("div")
                                pocket.setAttribute("onclick", "edit(this)")
                                pocket.classList.add("pocket")
                                pocket.setAttribute("name", doc.data().genre)

                                var trai = document.createElement("img");
                                trai.setAttribute("name", doc.data().photo)
                                trai.setAttribute("label", doc.data().trailer)
                                trai.classList.add("prev");
                                trai.src = url;

                                await storageRef
                                    .child("trailers/" + doc.data().trailer)
                                    .getDownloadURL()
                                    .then(function (url) {
                                        trai.setAttribute("value", url)

                                    })

                                var age = document.createElement("img");
                                age.classList.add("agg");
                                age.setAttribute("name", doc.data().age)
                                age.setAttribute("alt", doc.data().title + " poster")
                                age.src = "pic/" + doc.data().age + ".png";

                                var litle = document.createElement("p")
                                litle.classList.add("litle")
                                litle.innerText = doc.data().title

                                var time = document.createElement("p")
                                time.classList.add("time")
                                time.innerText = doc.data().length

                                var dess = document.createElement("p")
                                dess.classList.add("dess")
                                dess.innerText = doc.data().description

                                var adie = document.createElement("p")
                                adie.classList.add("adie")
                                adie.innerText = doc.data().additional

                                pocket.appendChild(trai)
                                pocket.appendChild(litle)
                                pocket.appendChild(time)
                                pocket.appendChild(age)
                                pocket.appendChild(dess)
                                pocket.appendChild(adie)

                                document.querySelector("#helder").appendChild(pocket)


                            })
                    }
                });
            })
        resetimer()
    }
    else {
        window.location.replace("login.html")
    }
})
function edit(e) {
    document.querySelector("#form").style.display = "grid"
    document.querySelector("#helder").style.display = "none"
    document.querySelector("#seletor").style.display = "none"
    document.querySelector("#trai").src = e.querySelector(".prev").getAttribute("value")
    document.querySelector("#trai").setAttribute("value", e.querySelector(".prev").getAttribute("label"))
    document.querySelector("#trai").setAttribute("name", e.querySelector(".prev").getAttribute("label"))
    document.querySelector("#traipo").src = e.querySelector(".prev").src
    document.querySelector("#traipo").setAttribute("name", e.querySelector(".prev").getAttribute("name"))
    document.querySelector("#traipo").setAttribute("value", e.querySelector(".prev").getAttribute("name"))
    document.querySelector("#title").querySelector(".pbawx").innerText = e.querySelector(".litle").innerText
    document.querySelector("#length").querySelector(".bawx").value = e.querySelector(".time").innerText
    document.getElementById('gen').value = e.getAttribute("name")
    document.querySelector("#descrip").querySelector(".bawx").value = e.querySelector(".dess").innerText
    document.querySelector("#addit").querySelector(".bawx").value = e.querySelector(".adie").innerText
    var rese = document.querySelectorAll(".agi")
    for (i = 0; i < rese.length; i++) {
        if (rese[i].innerText === e.querySelector(".agg").name) {
            rese[i].style.backgroundColor = "#0A0903"
            rese[i].style.color = "white"
            rese[i].setAttribute("name", "active")
        }
        else {
            rese[i].style.backgroundColor = "rgba(0,0,0,0)"
            rese[i].style.color = "#000000"
            rese[i].setAttribute("name", "")
        }
    }
}
function sage(e) {
    var rese = document.querySelectorAll(".agi")
    for (i = 0; i < rese.length; i++) {
        rese[i].style.backgroundColor = "rgba(0,0,0,0)"
        rese[i].style.color = "rgb(0,0,0)"
        rese[i].setAttribute("name", "")
    }
    e.style.backgroundColor = "#0A0903"
    e.style.color = "white"
    e.setAttribute("name", "active")
}
var chooser = document.querySelector("#pseu")
chooser.addEventListener("change", function (e) {
    // Get file
    file = e.target.files[0];

    output = document.getElementById("trai");
    output.setAttribute("value", file.name)
    var tempurl = URL.createObjectURL(event.target.files[0]);
    output.src = tempurl
    tempimage = tempurl
    output.onload = function () { // free memory
    }
});
var chooserpo = document.querySelector("#pseupo")
chooserpo.addEventListener("change", function (e) {
    // Get file
    filepo = e.target.files[0];

    outputpo = document.getElementById("traipo");
    outputpo.setAttribute("value", filepo.name)
    var tempurlpo = URL.createObjectURL(event.target.files[0]);
    outputpo.src = tempurlpo
    tempimagepo = tempurlpo
    outputpo.onload = function () { // free memory
    }
});
function chose() {
    chooser.click()
}
function chosepo() {
    chooserpo.click()
}
async function delet() {
    document.querySelector("#delete").innerText = "Deleting..."
    await storageRef
        .child("trailers/" + document.querySelector("#trai").getAttribute("name")).delete().then(async function () {
            await storageRef
                .child("poster/" + document.querySelector("#traipo").getAttribute("name")).delete().then(async function () {
                    await db.collection("movies").doc(document.querySelector("#title").querySelector(".pbawx").innerText).delete().then(function () {
                        var toph = document.querySelectorAll(".litle")
                        for (i = 0; i < toph.length; i++) {
                            if (toph[i].innerText === document.querySelector("#title").querySelector(".pbawx").innerText)
                                toph[i].parentNode.style.display = "none"
                        }
                        document.querySelector("#update").innerText = "UPDATE"
                        back();
                    })
                })
        })
}
async function updat() {
    if (document.querySelector("#title").querySelector(".pbawx").innerText === "") {
        document.querySelector("#add").innerText = "NO TITLE"
        document.querySelector("#add").style.backgroundColor = "red"
        setTimeout(function () { document.querySelector("#add").style.backgroundColor = " #0A0903"; document.querySelector("#add").innerText = "ADD" }, 1500)
        return
    }
    else {
        if (document.querySelector("#length").querySelector(".bawx").value === "") {
            document.querySelector("#add").innerText = "NO TIME"
            document.querySelector("#add").style.backgroundColor = "red"
            setTimeout(function () { document.querySelector("#add").style.backgroundColor = " #0A0903"; document.querySelector("#add").innerText = "ADD" }, 1500)
            return
        }
        else {
            if (document.querySelector("#descrip").querySelector(".bawx").value === "") {
                document.querySelector("#add").innerText = "NO DESC"
                document.querySelector("#add").style.backgroundColor = "red"
                setTimeout(function () { document.querySelector("#add").style.backgroundColor = " #0A0903"; document.querySelector("#add").innerText = "ADD" }, 1500)
                return
            }
            else {
                if (document.querySelector("#addit").querySelector(".bawx").value === "") {
                    document.querySelector("#add").innerText = "NO ADDITONAL"
                    document.querySelector("#add").style.backgroundColor = "red"
                    setTimeout(function () { document.querySelector("#add").style.backgroundColor = " #0A0903"; document.querySelector("#add").innerText = "ADD" }, 1500)
                    return
                }
                else {
                    if (document.getElementsByName("active")[0] == null) {
                        document.querySelector("#add").innerText = "NO AGE"
                        document.querySelector("#add").style.backgroundColor = "red"
                        setTimeout(function () { document.querySelector("#add").style.backgroundColor = " #0A0903"; document.querySelector("#add").innerText = "ADD" }, 1500)
                        return
                    }
                    else {
                        if (document.getElementById("gen").value === "") {
                            document.querySelector("#add").innerText = "NO GENRE"
                            document.querySelector("#add").style.backgroundColor = "red"
                            setTimeout(function () { document.querySelector("#add").style.backgroundColor = " #0A0903"; document.querySelector("#add").innerText = "ADD" }, 1500)
                            return
                        }
                    }
                }
            }
        }
    }
    document.querySelector("#update").innerText = "Updating..."
    if (document.querySelector("#trai").getAttribute("name") === document.querySelector("#trai").getAttribute("value")) {
        if (document.querySelector("#traipo").getAttribute("name") === document.querySelector("#traipo").getAttribute("value")) {
            console.log("pair")
            await db.collection("movies").doc(document.querySelector("#title").querySelector(".pbawx").innerText)
                .update({
                    length: document.querySelector("#length").querySelector(".bawx").value,
                    description: document.querySelector("#descrip").querySelector(".bawx").value,
                    additional: document.querySelector("#addit").querySelector(".bawx").value,
                    age: document.getElementsByName("active")[0].innerText,
                    genre: document.getElementById("gen").value,
                }).then(function () {
                    location.reload()
                })
        }
        else {
            console.log("change")
            await db.collection("movies").doc(document.querySelector("#title").querySelector(".pbawx").innerText)
                .update({
                    length: document.querySelector("#length").querySelector(".bawx").value,
                    description: document.querySelector("#descrip").querySelector(".bawx").value,
                    additional: document.querySelector("#addit").querySelector(".bawx").value,
                    age: document.getElementsByName("active")[0].innerText,
                    genre: document.getElementById("gen").value,
                    photo: document.querySelector("#traipo").getAttribute("value")
                }).then(async function () {
                    await storageRef
                        .child("poster/" + document.querySelector("#traipo").getAttribute("name")).delete().then(async function (docRef) {
                            var storageRefpo = firebase.storage().ref("poster/" + filepo.name);
                            // Upload file
                            var taskpo = await storageRefpo.put(filepo);;

                        }).then(function () {
                            location.reload()
                        })
                })
        }
    }
    else {
        if (document.querySelector("#traipo").getAttribute("name") === document.querySelector("#traipo").getAttribute("value")) {
            console.log("change")
            await db.collection("movies").doc(document.querySelector("#title").querySelector(".pbawx").innerText)
                .update({
                    length: document.querySelector("#length").querySelector(".bawx").value,
                    description: document.querySelector("#descrip").querySelector(".bawx").value,
                    additional: document.querySelector("#addit").querySelector(".bawx").value,
                    age: document.getElementsByName("active")[0].innerText,
                    genre: document.getElementById("gen").value,
                    trailer: document.querySelector("#trai").getAttribute("value")
                }).then(async function () {
                    await storageRef
                        .child("trailers/" + document.querySelector("#trai").getAttribute("name")).delete().then(async function (docRef) {
                            var storageRef = firebase.storage().ref("trailers/" + file.name);
                            // Upload file
                            var task = await storageRef.put(file);;

                        }).then(function () {
                            location.reload()
                        })
                })
        }
        else {
            await db.collection("movies").doc(document.querySelector("#title").querySelector(".pbawx").innerText)
                .update({
                    length: document.querySelector("#length").querySelector(".bawx").value,
                    description: document.querySelector("#descrip").querySelector(".bawx").value,
                    additional: document.querySelector("#addit").querySelector(".bawx").value,
                    age: document.getElementsByName("active")[0].innerText,
                    genre: document.getElementById("gen").value,
                    trailer: document.querySelector("#trai").getAttribute("value"),
                    photo: document.querySelector("#traipo").getAttribute("value")
                }).then(async function () {
                    await storageRef
                        .child("trailers/" + document.querySelector("#trai").getAttribute("name")).delete().then(async function (docRef) {
                            await storageRef
                                .child("poster/" + document.querySelector("#traipo").getAttribute("name")).delete().then(async function (docRef) {
                                    var storageRef = firebase.storage().ref("trailers/" + file.name);
                                    // Upload file
                                    var task = await storageRef.put(file);
                                    var storageRefpo = firebase.storage().ref("poster/" + filepo.name);
                                    // Upload file
                                    var taskpo = await storageRefpo.put(filepo);
                                })
                        })
                }).then(function () {
                    location.reload()
                })
        }
    }
}
function file(e) {
    var lod = document.querySelectorAll(".pocket")
    var tes = document.getElementsByName(e.value)
    if (e.value === "All") {
        for (var d = 0; d < lod.length; d++) {
            lod[d].style.display = "grid"
        }
    }
    else {
        for (var d = 0; d < lod.length; d++) {
            lod[d].style.display = "none"
        }
        for (var l = 0; l < tes.length; l++) {
            tes[l].style.display = "grid"
        }
    }
}
async function resetimer() {
    setInterval(async function () {
        var d = new Date();
        var n = d.getDay();
        var p = d.getDate()
        var h = d.getHours();
        var m = d.getMinutes()
        var y = d.getFullYear()
        var er = (d.getMonth() + 1)
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
                                    if ((p + 7) > mons[er]) {
                                        if (er == 12) {
                                            await db.collection("dates").doc("dates").update({
                                                [dal[n] + howers[h]]: ((p + 7) - mons[er]) + "/" + "1" + "/" + (y + 1)

                                            })
                                        }
                                        else {
                                            await db.collection("dates").doc("dates").update({
                                                [dal[n] + howers[h]]: ((p + 7) - mons[er]) + "/" + (er + 1) + "/" + y

                                            })
                                        }
                                    }
                                    else {
                                        await db.collection("dates").doc("dates").update({
                                            [dal[n] + howers[h]]: (p + 7) + "/" + er + "/" + y

                                        })
                                    }

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

