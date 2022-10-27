import './App.css'
import { useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { BiSearchAlt } from 'react-icons/bi';
import arrow from './assets/ggg.gif';
// import { HiChevronDoubleDown } from 'react-icons/hi';
// import arrow from './assets/arrow-down-icon.gif';

function App() {

  const [value, setValue] = useState("");

  const classId = (e) => {
    e.preventDefault();
  }

  const adding = (e) => {
    e.preventDefault();

    console.log("Funtion running");
    console.log("Value ", value);
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
          <form onSubmit={adding}>
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

          <div className="textcontent">
            <p id='dbIP'>10.1.29.162</p>
            <p id='text_link'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, amet.</p>
            <p id='fromNow'>14 hour ago</p>
          </div>

          <div className="textcontent">
            <p id='dbIP'>10.1.40.150</p>
            <p id='text_link'>https://www.microsoft.com/en-us/software-download/windows10.</p>
            <p id='fromNow'>9 hour ago</p>
          </div>

          <div className="textcontent">
            <p id='dbIP'>10.1.3.231</p>
            <p id='text_link'>https://newsappbyabrar.web.app/</p>
            <p id='fromNow'>2 days ago</p>
          </div>

          <div className="textcontent">
            <p id='dbIP'>10.1.25.206</p>
            <p id='text_link'>https://github.com/Aahad-Ali/complete-news-app</p>
            <p id='fromNow'>1 month ago</p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default App
