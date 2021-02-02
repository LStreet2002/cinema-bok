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

    console.log(file.name);

    output = document.getElementById("trai");
    var tempurl = URL.createObjectURL(event.target.files[0]);
    output.src = tempurl
    tempimage = tempurl
    output.onload = function () { // free memory
    }
});
function chose() {
    chooser.click()
}
async function plu() {
    if (document.querySelector("#title").querySelector(".bawx").value === "") {
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
                        else {
                            if (document.querySelector("#pseu").value === "") {
                                document.querySelector("#add").innerText = "NO TRAILER"
                                document.querySelector("#add").style.backgroundColor = "red"
                                setTimeout(function () { document.querySelector("#add").style.backgroundColor = " #0A0903"; document.querySelector("#add").innerText = "ADD" }, 1500)
                                return
                            }
                        }
                    }
                }
            }
        }
    }


    await db.collection("movies").doc(document.querySelector("#title").querySelector(".bawx").value)
        .set({
            title: document.querySelector("#title").querySelector(".bawx").value,
            length: document.querySelector("#length").querySelector(".bawx").value,
            description: document.querySelector("#descrip").querySelector(".bawx").value,
            additional: document.querySelector("#addit").querySelector(".bawx").value,
            age: document.getElementsByName("active")[0].innerText,
            genre: document.getElementById("gen").value,
            trailer: file.name
        }).then(async function (docRef) {
            var storageRef = firebase.storage().ref("trailers/" + file.name);
            // Upload file
            var task = await storageRef.put(file);;

        }).then(function () {
            location.reload()
        })
}