if (screen.width < 600) {
    window.location.replace("index.html");
}
var firebaseConfig = {
    apiKey: "AIzaSyAFtLYZ_Kbg8My7RC-CgaZEsXohl4cZ4cM",
    authDomain: "ogle-data.firebaseapp.com",
    projectId: "ogle-data",
    storageBucket: "ogle-data.appspot.com",
    messagingSenderId: "574554470490",
    appId: "1:574554470490:web:33f085d94333f01e99c063",
    measurementId: "G-LC58VHCHKQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
auth = firebase.auth()
storage = firebase.storage();
var storageRef = storage.ref();
var db = firebase.firestore();


