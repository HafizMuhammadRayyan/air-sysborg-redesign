// import { HiChevronDoubleDown } from 'react-icons/hi';
// import arrow from './assets/arrow-down-icon.gif';

import './App.css'
import { useState, useEffect } from 'react';
import arrow from './assets/animatedArrow.gif';


// Moment and Axios library imports
import moment from 'moment';
import axios from 'axios';


// React icons imports
import { MdAddPhotoAlternate, MdDeleteForever } from 'react-icons/md';
import { BiSearchAlt } from 'react-icons/bi';
import { BsCheckSquareFill } from 'react-icons/bs';
import { AiFillCheckSquare } from 'react-icons/ai';


// Firebase imports
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, deleteDoc,
  addDoc, getDocs, doc, orderBy,
  onSnapshot, query, serverTimestamp
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
  const [classId, setClassId] = useState("Home");
  const [ip, setIP] = useState("");
  const [changeIcon, setChangeIcon] = useState(false);
  const [file, setFile] = useState("");
  const classIds = ["web", "ai", "b3"];



  // ---------- Class ids Checker and Show Result ----------
  const classIdchecker = (e) => {
    e.preventDefault();

    for (let i = 0; i < classIds.length; i++) {
      if (classIds[i] === classId) {
        console.log("hello papa ", classIds[i]);

        let unsubscribe = null;
        const getRealtimeData = () => {
          const q = query(collection(db, classId), orderBy("createdOn", "desc"));
          unsubscribe = onSnapshot(q, (querySnapshot) => {
            const posts = [];

            querySnapshot.forEach((doc) => {
              let data = { ...doc.data(), id: doc.id };
              posts.push(data);
            });

            setPosts(posts);
            console.log("posts: ", classId);
          });
        }

        getRealtimeData();

        return () => {
          console.log("CleanUp functions");
          unsubscribe();
        }

        break
      }
      else {
        console.log("error ");
      }

    }
  }



  // ---------- Get Ip Address ----------
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



  // ---------- Use Effect Running when page load----------
  useEffect(() => {


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


    const getRealtimeData = () => {
      const q = query(collection(db, "Home"), orderBy("createdOn", "desc"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), id: doc.id };
          posts.push(data);
        });

        setPosts(posts);
        console.log("Home: ", posts);
      });
    }

    getRealtimeData();

    return () => {
      console.log("CleanUp functions");
      unsubscribe();
    }

  }, [])




  // ---------- Sending post in Database (Firebase) ----------
  const sendPost = async (e) => {
    e.preventDefault();

    // console.log("Save post function running and value is ", value);

    // console.log("file", typeof file);



    if (file === "" || file === undefined || file === null) {

      try {
        const docRef = await addDoc(collection(db, classId), {
          text: value,
          createdOn: serverTimestamp(),
          userIp: ip,
          // img: imgUrl,
        });
        console.log("Document written with ID: ", docRef.id);
      }
      catch (e) {
        console.error("Error adding document: ", e);
      }
      document.getElementById("mainInp").value = null;
      setFile("");
      setValue("");

    }
    else {
      // Image send on cloudnairy and get url
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "postImage");

      axios.post(`https://api.cloudinary.com/v1_1/dg5fxzdg1/image/upload`, formData)
        .then(async (res) => {
          // console.log(res.data);
          // setimgUrl(res?.data?.url);

          try {
            const docRef = await addDoc(collection(db, classId), {
              text: value,
              createdOn: serverTimestamp(),
              userIp: ip,
              img: res?.data?.url,
            });
            console.log("Document written with ID: ", docRef.id);
          }
          catch (e) {
            console.error("Error adding document: ", e);
          }
          document.getElementById("mainInp").value = null
          setFile("");
          setValue("");

        })
        .catch((err) => {
          console.error("Error adding document: ", err);
        })
    }




    setFile("");
    setChangeIcon(false)
  }



  // ---------- Delete Post ----------
  const deletePost = async (postId) => {

    let password = prompt("Please Enter a Password to Delete This Data.");

    if (password === "123delete") {
      await deleteDoc(doc(db, classId, postId));
      console.log("Document deleted with ID: ", postId);
    }
    else {
      alert("Sorry wrong password");
    }
  }



  // ---------- Delete All Posts ----------
  const deleteAll = async () => {

    console.log("Delete all function running");

    let password = prompt("Please Enter a Password to Delete All Data.");

    if (password === "123delete") {

      posts.map(async (eachPost, i) => {
        await deleteDoc(doc(db, classId, eachPost?.id));
      });

    }
    else {
      alert("Sorry wrong password");
    }

  }


  return (
    <div className='container'>

      <nav className='navbar'>

        <div className="class_id nav-child">
          <form onSubmit={classIdchecker}>
            <label htmlFor="classId-Inp" className='class_id_label'>Class Id</label>
            <div className='searchClassBar'>
              <input type="text" className="class_id_label" id="classId-Inp"
                onChange={(e) => {
                  // console.log("onchange");
                  setClassId(e.target.value);
                }}
              />
              <button type='submit'><BiSearchAlt /></button>
            </div>
          </form>
        </div>


        <div className="add_file_inp nav_mid_child">
          <form onSubmit={sendPost}>
            <input type="text" id="mainInp" placeholder='Enter any text or Link'
              onChange={(e) => {
                // console.log("onchange");
                setValue(e.target.value);
              }} />
            <label htmlFor="addFile" >{(changeIcon) ? <AiFillCheckSquare /> : <MdAddPhotoAlternate />}</label>
            <input type="file" id='addFile' accept="image/png, image/gif, image/jpeg" className='hide'
              onChange={(e) => {

                setFile(e.currentTarget.files[0])
                // console.log(e.currentTarget.files[0])

                if (e.currentTarget.files[0] === '') {
                  setChangeIcon(false)
                  return;
                }
                else {
                  setChangeIcon(true)
                  return;
                }

              }}
            />
            <button><img src={arrow} alt="Submit button" /></button>
          </form>
        </div>


        <div className="del_all_btn nav-child">
          <button onClick={deleteAll}>Delete All</button>
        </div>

      </nav>



      <div className="content">


        <div className="texts">
          <p id='class-id-name'>{classId}</p>


          {posts.map((eachPost, i) => (

            <div className="textcontent" key={i}>
              <p id='dbIP'>{eachPost?.userIp}</p>

              <div className="text_and_image">

                {
                  (eachPost.text.slice(0, 5) === "https" || eachPost.text.slice(0, 4) === "http")
                    ?
                    <p id='text_link'>
                      <a href={eachPost?.text} rel="noreferrer" target="_blank">{eachPost?.text}</a>
                    </p>
                    :
                    <p id='text_link'>{eachPost?.text}</p>
                  //     {
                  //   (eachPost?.text === "" || eachPost.text === " " || eachPost.text === "  ") ?
                  //     null :

                  // }
                }


                {
                  (eachPost?.img === "" || eachPost?.img === undefined) ? null :
                    <img src={eachPost?.img} alt="" />

                }


              </div>



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
