import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  getDoc,
  collection,
  addDoc,
  where,
  getDocs,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxexIVk-29HlNg2vuET9Qp7BE7gh7HW88",
  authDomain: "test-83715.firebaseapp.com",
  projectId: "test-83715",
  storageBucket: "test-83715.appspot.com",
  messagingSenderId: "223048712070",
  appId: "1:223048712070:web:4812d16b3d7c4321b17607",
  measurementId: "G-LRJW40PLQ9",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

// var logInBtn = document.getElementById("login");
// var logOutBtn = document.getElementById("logout");
// var addUserBtn = document.getElementById("addUser");
var getQuery = document.getElementById("getQuery");
var getAllDatabtn = document.getElementById("getAllData")
var addAlbumBtn = document.getElementById("addAlbum")

// logInBtn.addEventListener("click", login);
// logOutBtn.addEventListener("click", logout);
// addUserBtn.addEventListener("click", addUserToDB);
getQuery.addEventListener("click", getQuerydata);
getAllDatabtn.addEventListener("click", getAllData)
addAlbumBtn.addEventListener("click", addAlbumToDB)

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in", user);
  } else {
    console.log("no user");
  }
});

function addUserToDB() {
  let fn = document.getElementById("fname").value.toLowerCase();
  let ln = document.getElementById("lname").value.toLowerCase();
  let em = document.getElementById("email").value.toLowerCase();
  let pw = document.getElementById("pw").value.toLowerCase();

  let person = {
    firstname: fn,
    lastname: ln,
    email: em,
    password: pw,
  };

  addData(person);

  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("pw").value = "";
}

function addAlbumToDB() {
    let albumName = document.getElementById("albumName").value.toLowerCase();
    let albumArtist = document.getElementById("albumArtist").value.toLowerCase();
    let albumURL = document.getElementById("albumURL").value.toLowerCase();
    let Genre = document.getElementById("Genre").value.toLowerCase();
  
    let album = {
      albumName: albumName,
      albumArtist: albumArtist,
      albumURL: albumURL,
      genre: Genre
    };
  
    addDataAlbum(album);
  
    document.getElementById("albumName").value = "";
    document.getElementById("albumArtist").value = "";
    document.getElementById("albumURL").value = "";
    document.getElementById("Genre").value = "";
    
  }

async function addData(person) {
  try {
    const docRef = await addDoc(collection(db, "Peeps"), person);

    console.log("doc id:", docRef.id);
  } catch (e) {
    console.log(e);
  }
}

async function addDataAlbum(album) {
    try {
      const docRef = await addDoc(collection(db, "Albums"), album);
  
      console.log("doc id:", docRef.id);
    } catch (e) {
      console.log(e);
    }
  }
function login() {
  signInAnonymously(auth)
    .then(() => {
      console.log("signed In");
    })
    .catch((error) => {
      console.log("help");
    });
}

function logout() {
  signOut(auth)
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      console.log("help");
    });
}

async function getQuerydata() {
  
    let searchName = $("#query-input").val().toLowerCase();
    const q = query(
      collection(db, "Albums"),
      where("genre", "==", searchName)
    );

    const querySnapshot = await getDocs(q);
    console.log("query:", querySnapshot.docs)
    if(querySnapshot.docs.length > 0){
        querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      document.getElementById("alldata").innerHTML = "";
      querySnapshot.forEach((doc) =>{
        console.log("work?")
        document.getElementById("alldata").innerHTML += `<div class="album-card">
        <img src="${doc.data().albumURL}" class="album-img">
        <p class="album-title">${doc.data().albumName}</p>
        <p class="album-artist">${doc.data().albumArtist}</p>
        </div>`
    })

    });
    }else{
        console.log("no Data")
        document.getElementById("alldata").innerHTML = "";
        document.getElementById("alldata").innerHTML += `<h1 class="header-text">No Albums match your Genre</h1>`
    }
    
  } 



async function getAllData(){
    document.getElementById("alldata").innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "Albums"));
    
    querySnapshot.forEach((doc) =>{
        console.log("get all data")
        document.getElementById("alldata").innerHTML += `<div class="album-card">
        <img src="${doc.data().albumURL}" class="album-img">
        <p class="album-title">${doc.data().albumName}</p>
        <p class="album-artist">${doc.data().albumArtist}</p>
        </div>`
    })
  }

  function addAlbumModal() {

    $("#home").on("click", (e) =>{
        $("#modal").toggle();
        console.log("help")
    })
    $(".close").on("click", (e) =>{
        $("#modal").toggle();
        console.log("help")
    })
}


 
$(document).ready(function () {
addAlbumModal();
getAllData();
});