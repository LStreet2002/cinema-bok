
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
                            pocket.classList.add("pocket")

                            var trai = document.createElement("video");
                            trai.classList.add("prev");
                            trai.src = url;

                            var age = document.createElement("img");
                            age.classList.add("agg");
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

                            pocket.appendChild(trai)
                            pocket.appendChild(litle)
                            pocket.appendChild(time)
                            pocket.appendChild(age)
                            pocket.appendChild(dess)

                            document.querySelector("#helder").appendChild(pocket)


                        })
                });
            })
    }
    else {
        window.location.replace("login.html")
    }
})