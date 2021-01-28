

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
                    var storage = firebase.storage();

                    await storageRef
                        .child("trailers/" + doc.data().trailer)
                        .getDownloadURL()
                        .then(function (url) {
                            var pocket = document.createElement("div")
                            pocket.setAttribute("onclick", "edit(this)")
                            pocket.classList.add("pocket")
                            pocket.setAttribute("name", doc.data().genre)

                            var trai = document.createElement("video");
                            trai.setAttribute("name", doc.data().trailer)
                            trai.classList.add("prev");
                            trai.src = url;

                            var age = document.createElement("img");
                            age.classList.add("agg");
                            age.setAttribute("name", doc.data().age)
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
                });
            })
    }
    else {
        window.location.replace("login.html")
    }
})
function edit(e) {
    document.querySelector("#form").style.display = "grid"
    document.querySelector("#helder").style.display = "none"
    document.querySelector("#seletor").style.display = "none"
    document.querySelector("#trai").src = e.querySelector(".prev").src
    document.querySelector("#trai").setAttribute("name", e.querySelector(".prev").getAttribute("name"))
    document.querySelector("#trai").setAttribute("value", e.querySelector(".prev").getAttribute("name"))
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
function chose() {
    chooser.click()
}
async function delet() {
    await storageRef
        .child("trailers/" + document.querySelector("#trai").getAttribute("name")).delete().then(async function () {
            await db.collection("movies").doc(document.querySelector("#title").querySelector(".pbawx").innerText).delete().then(function () {
                var toph = document.querySelectorAll(".litle")
                for (i = 0; i < toph.length; i++) {
                    if (toph[i].innerText === document.querySelector("#title").querySelector(".pbawx").innerText)
                        toph[i].parentNode.style.display = "none"
                }
                back();
            })
        })
}
async function updat() {
    if (document.querySelector("#trai").getAttribute("name") === document.querySelector("#trai").getAttribute("value")) {
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
}
function file(e) {
    var lod = document.querySelectorAll(".pocket")
    var tes = document.getElementsByName(e.value)
    console.log(tes)
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