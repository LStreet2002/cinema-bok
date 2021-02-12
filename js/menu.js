var roms = ["A", "B", "C", "D", "E", "F"]
var dal = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var howers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "nine", "10", "eleven", "12", "thirteen", "14", "fifteen", "16", "seventeen", "18", "19", "20", "21", "22", "23", "24"]
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        resetimer()
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
async function resetimer() {
    setInterval(async function () {
        var d = new Date();
        var n = d.getDay();
        var p = d.getDate()
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

            await db.collection("dates").doc("dates").get().update({
                [dal[n] + howers[h]]: (p + 7)

            })
        }
        else {
            console.log("no reset")
        }
    }, 60 * 1000);
}

