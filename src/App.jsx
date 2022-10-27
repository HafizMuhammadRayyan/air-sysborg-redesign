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
            
          </div>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
          <h1>Hello World</h1>
        </div> 

      </div>
    </div>
  )
}

export default App
