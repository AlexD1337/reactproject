import React from 'react';
import './index.css';
import {useState, useEffect} from 'react';
import request from './request';


function Utbildningar() {


  const API_URL = "http://localhost:3500/items";
  const K_API_URL = "http://localhost:3500/kurser";
  const U_API_URL = "http://localhost:3500/utb"  

  const [items, setItems] = useState([]);
  const [kurser, setKurser] = useState([]);
  const [utb, setUtb] = useState([]);


  useEffect (() => {

      const fetchItems = async () =>{
        try
        {
          const response = await fetch (API_URL);
          if (!response.ok) throw Error('Did not recieve expected data');
          const listItems = await response.json();
          setItems(listItems);
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
        const response = await fetch (U_API_URL);
        if (!response.ok) throw Error('Did not recieve expected data');
        const listItems = await response.json();
        setUtb(listItems);
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
        const response = await fetch (API_URL);
        if (!response.ok) throw Error('Did not recieve expected data');
        const listItems = await response.json();
        setItems(listItems);
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
  const [input1,setInput1] = useState('');

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
    
    const kurser = items.map(({id,name})=>
    <option key={"idgaf"+id} value={name}>{name}</option>
    )

    return(
    <select id={'kurser-name'}>
      {kurser}
      </select>
    )
  }

  const addUtb = async(name,teacherid,courses, desc) =>
  {

    const idNumber = Number(teacherid);
    console.log(items)
    var x = items.find(x => x.id === idNumber);


    const ids = utb.length ? utb[utb.length-1].id +1 : 1;
    const utbildning = {
      "id" : ids,
      "name": name,
      "kurser" : courses ,
      "ansvarig" : x.name + " " +x.sirname,
      "desc" : desc
    }
    const listItems = [...utb,utbildning];
    setUtb(listItems);

    const postOptions = {
      method: 'POST',
      headers:{
        'Content-Type' : ' application/json'
      },
      body: JSON.stringify(utbildning)
    }
    const result = await request(U_API_URL, postOptions);
    if (result) console.log(result);
    window.location.reload(false);
  }


  const deleteUtb = async (id) => {
    const listItems = utb.filter((utb) => utb.id !== id);
    setUtb(listItems);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${U_API_URL}/${id}`;
    const result = await request(reqUrl, deleteOptions);
    if (result)  console.log(result);
  }

  function updateUtb(items){
    
    const utb = items.map(({id,name,kurser,ansvarig,desc})=>

    <tr key={"irdgaf"+id} className='entire-row text-align-center border'>
        <td id={'utb'+id}>{name}</td>
        <td >{ansvarig}</td>
        <td> 
                {kurser.map((kurs)=><div>{kurs +" "}</div>)}
        </td>
        <td>{desc}</td>
        <td><button className="btn" onClick={()=>deleteUtb(id)}> Delete</button></td>
    </tr>

    )

    return(

      utb
  
    )
  }

  {/**/} 

  function course_list(){
  var kurs_list =[];
  for (var i = 0; i <counter;i++){
      kurs_list.push(document.getElementById('course-count'+i).children[0].value)
  } 
  return(kurs_list)

}


const [counter, setCounter] = useState(0);

function counterPlus(){

    setCounter(counter +1);
}
function counterMinus(){

    if (counter > 0){
    setCounter(counter -1)
    }
}
  return (
    <div className="Kurser">
        <div className='center'>
      <p className='center'>Lägg till ny Utbildning</p>
      <form className='utb-form'>
          <br/>
          <p>Namn:</p>
        <input type={'text'} className='utb-input' value={input} onInput={e => setInput(e.target.value)} required/>
        <br/>

          <p>Discription :</p>
        <textarea className='utb-input' value={input1} onInput={e => setInput1(e.target.value)} required/> 
        <br/>

        <p style={{margin:'5px'}}>Utbildningsledare: </p>
        {updateTeachers(items)}
        <br/>         <br/>
        </form>

        <form>
        <input style={{display:"none"}} required/>
        <button onClick={ ()=> counterPlus()}>Lägg till kurs</button>
        <button onClick={ ()=> counterMinus()}>Ta bort kurs</button>
      {Array.from(Array(counter)).map((c,index) => {
        return <div key={c} id={"course-count"+index}>{updateKurser(kurser)}</div>;
      })}
        <br/>  
        <br/>  
        <button className='btn' style={{margin:'5px'}} onClick={ ()=>addUtb(input,document.getElementById('teacher-name').value,course_list(),input1)}> setdata </button>
      </form>
      </div>

      <table className='utb-table'>
        <tr>
        <th>Utbildnings Namn</th>
        <th>UtbildningsLedare </th>
        <th>Kurser</th>
        <th>Discription</th>
        <th>Delete</th>
        </tr>
        {updateUtb(utb)}
       </table>
    </div>
  );
}

export default Utbildningar;
