// import { HiChevronDoubleDown } from 'react-icons/hi';
// import arrow from './assets/arrow-down-icon.gif';

import './App.css'
import arrow from './assets/ggg.gif';
import moment from 'moment';

import { useState, useEffect } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { BiSearchAlt } from 'react-icons/bi';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, onSnapshot, query } from "firebase/firestore";



// TODO: Replace the following with your app's Firebase project configuration
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


  useEffect(() => {

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
    const getRealtimeData = () => {
      const q = query(collection(db, "posts"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
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


  const classId = (e) => {
    e.preventDefault();
    console.log(posts);
  }

  const savePost = async (e) => {
    e.preventDefault();

    console.log("Save post function running and value is ", value);

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        text: value,
        createdOn: new Date().getTime(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // setValue("");

  }


  return (
    <div className='container'>

      <nav className='navbar'>

        <div className="class_id nav-child">
          <form onSubmit={classId}>
            <label htmlFor="classId-Inp" className='class_id_label'>Class Id</label>
            <div className='searchClassBar'>
              <input type="text" className="class_id_label" id="classId-Inp" />
              <button type='submit'><BiSearchAlt /></button>
            </div>
          </form>
        </div>

        <div className="add_file_inp nav_mid_child">
          <form onSubmit={savePost}>
            <input type="text" id="mainInp" placeholder='Enter any text or Link'
              onChange={(e) => {
                console.log("onchange");
                setValue(e.target.value);
              }} />
            <label htmlFor="addFile"><MdAddPhotoAlternate /></label>
            <input type="file" id='addFile' className='hide' />
            <button><img src={arrow} alt="" /></button>
          </form>
        </div>

        <div className="del_all_btn nav-child">
          <button>Delete All</button>
        </div>

      </nav>



      <div className="content">

        <div className="texts">


          {posts.map((eachPost, i) => (

            <div className="textcontent" key={i}>
              <p id='dbIP'>10.1.29.162</p>
              <p id='text_link'>{eachPost?.text}</p>
              <p id='fromNow'>{moment(eachPost?.createdOn).fromNow()}</p>
            </div>

          ))
          }


        </div>

      </div>

    </div>
  )
}

export default App
