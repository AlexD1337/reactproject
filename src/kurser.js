import React from 'react';
import './index.css';
import {useState, useEffect} from 'react';
import request from './request';

function Kurser() {


  const API_URL = "http://localhost:3500/items";
  const K_API_URL = "http://localhost:3500/kurser"  

  const [items, setItems] = useState([]);
  const [kurser, setKurser] = useState([]);

  useEffect (() => {

      const fetchItems = async () =>{
        try
        {
          const response = await fetch (API_URL);
          if (!response.ok) throw Error('Did not recieve expected data');
          const listItems = await response.json();
          setItems(listItems);
          console.log(listItems);
        }
        catch(err)
        {
          console.log(err)
        }
        finally {
          console.log("done")
        }
      }

      setTimeout(() => fetchItems(), 0);
  }, [])

  useEffect (() => {

    const fetchItems = async () =>{
      try
      {
        const response = await fetch (K_API_URL);
        if (!response.ok) throw Error('Did not recieve expected data');
        const listItems = await response.json();
        setKurser(listItems);
        console.log(listItems);
      }
      catch(err)
      {
        console.log(err)
      }
      finally {
        console.log("done")
      }
    }

    setTimeout(() => fetchItems(), 0);
}, [])

  const [input,setInput] = useState('');
  const [input1,setInput1] = useState(1);

  function updateTeachers(items){
    
    const teachers = items.map(({id,name,sirname})=>
    
        <option key={"idk"+id} value={id}>{name + " "+sirname}</option>
    )

    return(
    <select id={'teacher-name'}>
        {teachers}
      </select>
    )
  }


  function updateKurser(items){
    
    const kurser = items.map(({id,name,kursansvarig,length})=>
    
    <tr key={"whatever"+id} className='entire-row text-align-center'>
        <td id={'kurs'+id}>{name}</td>
        <td >{kursansvarig}</td>
        <td>{"Course Length: " +length}</td>
        <button className="btn" onClick={()=>deleteKurs(id)}> Delete</button>
    </tr>
    )

    return(
      kurser
    )
  }


  const addKurs = async(name,teacherid,leng) =>
  {
      if (leng > 0){
      const idNumber = Number(teacherid);
      console.log(items)
      var x = items.find(x => x.id === idNumber);

    const id = kurser.length ? kurser[kurser.length-1].id +1 : 1;
    const kurs = {
      "id" : id,
      "name": name,
      "kursansvarig" : x.name + " " +x.sirname,
      "length" : leng  
    }
    const listItems = [...kurser,kurs];
    setKurser(listItems);

    const postOptions = {
      method: 'POST',
      headers:{
        'Content-Type' : ' application/json'
      },
      body: JSON.stringify(kurs)
    }
    const result = await request(K_API_URL, postOptions);
    if (result) console.log(result);
}
  }


  const deleteKurs = async (id) => {
    const listItems = kurser.filter((kurser) => kurser.id !== id);
    setKurser(listItems);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${K_API_URL}/${id}`;
    const result = await request(reqUrl, deleteOptions);
    if (result)  console.log(result);
  }

  return (
    <div className="Kurser">
      <p className='center'>Lägg till ny Kurs</p>
      <form className='personal-form'>
          <br/>
          <p>Namn:</p>
        <input type={'text'} className='personal-input' value={input} onInput={e => setInput(e.target.value)} required/>
        <br/>

          <p>Längd:</p>
        <input type={'number'} className='personal-input' value={input1} onInput={e => setInput1(e.target.value)} required/>
        <br/>

        <p>Kursansvarig:</p>
        {updateTeachers(items)}
        <button className='btn' onClick={()=> addKurs(input,document.getElementById('teacher-name').value, input1)}> setdata </button>
      </form>

      <table className='teacher-table'>
        <tr>
        <th>Course Name</th>
        <th>Course ansvarig</th>
        <th>Length</th>
        <th>Delete</th>
          
        </tr>
       {updateKurser(kurser)}
       </table>
    </div>
  );
}

export default Kurser;
