// import { HiChevronDoubleDown } from 'react-icons/hi';
// import arrow from './assets/arrow-down-icon.gif';

import './App.css'
import { useState, useEffect } from 'react';
import arrow from './assets/ggg.gif';

// Moment and Axios library imports
import moment from 'moment';
import axios from 'axios';


// React icons imports
import { MdAddPhotoAlternate, MdDeleteForever } from 'react-icons/md';
import { BiSearchAlt } from 'react-icons/bi';

// Firebase imports
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, deleteDoc,
  addDoc, getDocs, doc, orderBy,
  onSnapshot, query, serverTimestamp,
  updateDoc, deleteField
} from "firebase/firestore";



// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAyiRAqCg7lpMN_8C3HGRvkxY1CuoTxtrA",
  authDomain: "hello-world-data-base.firebaseapp.com",
  projectId: "hello-world-data-base",
  storageBucket: "hello-world-data-base.appspot.com",
  messagingSenderId: "850233580943",
  appId: "1:850233580943:web:31c62c3e1ace683190fffa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);









function App() {


  const [value, setValue] = useState("");
  const [posts, setPosts] = useState([]);
  // const [classId, setClassId] = useState('');
  const [ip, setIP] = useState('');
  const ClassIds = ["web", "ai", "b3"];


  // ----- Get Ip Address -----
  const getIp = () => {

    axios.get('https://api.db-ip.com/v2/free/self')
      .then(res => {
        setIP(res.data.ipAddress);
      })
      .catch(err => {
        console.log(err);
        setIP(err);
      })

  }



  useEffect(() => {



    const classIdchecker = (e) => {
      e.preventDefault();

      // for (let i = 0; i < ClassIds.length; i++) {
      //   // const element = array[i];
      //   if

      // }

    }










    getIp();

    // const getData = async () => {
    //   const querySnapshot = await getDocs(collection(db, "posts"));
    //   querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => `, doc.data());

    //     // setPosts([...posts, doc.data()]);

    //     setPosts((prev) => {
    //       let newArray = [...prev, doc.data()];

    //       return newArray
    //     });


    //   });
    // }

    // getData();

    let unsubscribe = null;

    // const = checkIds = () => {

    //   if (classId === "") {
    //     return;
    //   }
    //   else if ()
    // }


    const getRealtimeData = () => {
      const q = query(collection(db, "posts"), orderBy("createdOn", "desc"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), id: doc.id };
          posts.push(data);
        });

        setPosts(posts);
        console.log("posts: ", posts);
      });
    }

    getRealtimeData();

    return () => {
      console.log("CleanUp functions");
      unsubscribe();
    }

  }, [])



  const sendPost = async (e) => {
    e.preventDefault();

    console.log("Save post function running and value is ", value);


    if (value === "" || value === " ") {
      return;
    }
    else {
      try {
        const docRef = await addDoc(collection(db, "posts"), {
          text: value,
          createdOn: serverTimestamp(),
          userIp: ip,
        });
        console.log("Document written with ID: ", docRef.id);
      }
      catch (e) {
        console.error("Error adding document: ", e);
      }
      setValue("");
      document.getElementById("mainInp").value = null;

    }

  }

  // const test = () => {


  // }


  const deletePost = async (postId) => {

    let password = prompt("Please Enter a password to delete this data.");

    if (password === "123delete") {
      await deleteDoc(doc(db, "posts", postId));
      console.log("Document deleted with ID: ", postId);
    }
    else {
      alert("Sorry wrong password");
    }
  }


  const deleteAll = async () => {

    console.log("Delete all function running");
    const cityRef = doc(db, "posts");

    await updateDoc(cityRef, {
      capital: deleteField()
    });

  }

  return (
    <div className='container'>

      <nav className='navbar'>

        <div className="class_id nav-child">
          <form onSubmit={sendPost}>
            <label htmlFor="classId-Inp" className='class_id_label'>Class Id</label>
            <div className='searchClassBar'>
              <input type="text" className="class_id_label" id="classId-Inp" />
              <button type='submit'><BiSearchAlt /></button>
            </div>
          </form>
        </div>

        <div className="add_file_inp nav_mid_child">
          <form onSubmit={sendPost}>
            <input type="text" id="mainInp" placeholder='Enter any text or Link'
              onChange={(e) => {
                console.log("onchange");
                setValue(e.target.value);
              }} />
            <label htmlFor="addFile"><MdAddPhotoAlternate /></label>
            <input type="file" id='addFile' className='hide' />
            <button><img src={arrow} alt="Submit button" /></button>
          </form>
        </div>

        <div className="del_all_btn nav-child">
          <button onClick={deleteAll}>Delete All</button>
        </div>

      </nav>



      <div className="content">

        <div className="texts">


          {posts.map((eachPost, i) => (

            <div className="textcontent" key={i}>
              <p id='dbIP'>{eachPost?.userIp}</p>

              {
                (eachPost.text.slice(0, 5) === "https" || eachPost.text.slice(0, 4) === "http")
                  ?
                  <p id='text_link'>
                    <a href={eachPost?.text} rel="noreferrer" target="_blank">{eachPost?.text}</a>
                  </p>
                  :
                  <p id='text_link'>{eachPost?.text}</p>
              }

              <div id="fromNow">
                <p>{moment((eachPost?.createdOn?.seconds)
                  ? eachPost?.createdOn?.seconds * 1000
                  :
                  undefined).fromNow()}</p>

                <div>
                  <MdDeleteForever id='delLogo' onClick={() => {
                    deletePost(eachPost?.id);
                  }}></MdDeleteForever>
                </div>

              </div>
            </div>

          ))
          }


        </div>

      </div>

    </div>
  )
}

export default App
