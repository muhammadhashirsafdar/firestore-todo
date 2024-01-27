import { initializeApp  } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'


import {
   getFirestore,
   collection,
   addDoc,
   query,
   getDocs,
   onSnapshot 
  } 
  from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js'




// firebase config

const firebaseConfig = {
    apiKey: "AIzaSyD2PVxnr3oMF3l4xlW7I2pomzfvSrf5GFE",
    authDomain: "todoapp-firebase-project.firebaseapp.com",
    projectId: "todoapp-firebase-project",
    storageBucket: "todoapp-firebase-project.appspot.com",
    messagingSenderId: "349477254340",
    appId: "1:349477254340:web:39eb82f7f1ebba629f4591",
    measurementId: "G-LHFRSERZJ9"
  };


  // innitialize firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const todoinput =  document.getElementById("object-input");
const addData = document.getElementById("add-object-btn");
const inputlist = document.getElementById("object-list");

// function to add data to firestore

const adddatainfirestore = async () => {

  // get input value and current time stamp
  const inputvalue = todoinput.value;
  const timestamp = new Date().getTime()


  if(inputvalue.trim()){

    
  // create payload
  const payload = {
    id:timestamp,
    todos: inputvalue,
    timestamp,
  };

  try {

    // add document to todos collection

    const docRef = await addDoc(collection(db, "todos"), payload);
    console.log("Document written with ID: ", docRef.id);

    // clear input field

    todoinput.value="";

   // fetch and update the list

    const q = query(collection(db, "todos"));
    let arr =[];
    let list =""
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    arr.push(doc.data())
    console.log(doc.id, " => ", doc.data());
    list+=`<li>${doc.data().todos}</li>`
    inputlist.innerHTML=list;

  });

  



  } catch (e) {
    console.error("Error adding document: ", e);
  }

  } else{
     alert("please input")
}

};

// Function to listen for real-time updates and update the UI

const realtimedata = async ()=> {
      let item ="";
      const q = query(collection(db, "todos"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
      todos.push(doc.data());
   });
      item=todos.map((todo)=>`<li>${todo.todos}</li>`).join("")
      inputlist.innerHTML=item;
});

}



realtimedata();
addData.addEventListener("click",adddatainfirestore);




