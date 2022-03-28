import React from 'react';
import './Personal.css';
import { useEffect, useState } from 'react';
import request from './request';


function Personal() {

  const API_URL = "http://localhost:3500/items";


  const [items, setItems] = useState([]);
 

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

  const [input,setInput] = useState('');
  const [input1,setInput1] = useState('');
  const [input2,setInput2] = useState('');
  const [input3,setInput3] = useState(0);

  const addTeacher = async(name,sirname,mail,number) =>
  {
    if(number > 0){
    const id = items.length ? items[items.length-1].id +1 : 1;
    const teacher = {
      "id" : id,
      "name": name,
      "sirname" : sirname,
      "email" : mail,
      "number" : Number(number)
      
    }
    const listItems = [...items,teacher];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers:{
        'Content-Type' : ' application/json'
      },
      body: JSON.stringify(teacher)
    }
    const result = await request(API_URL, postOptions);
    if (result) console.log(result);
    }
  }

  const addTeacher1 = async(id,name,sirname,mail,number) =>
  {
    if(number > 0){
    const teacher = {
      "id" : id,
      "name": name,
      "sirname" : sirname,
      "email" : mail,
      "number" : Number(number)
      
    }
    const listItems = [...items,teacher];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers:{
        'Content-Type' : ' application/json'
      },
      body: JSON.stringify(teacher)
    }
    const result = await request(API_URL, postOptions);
    if (result)  console.log(result);
    }
  }

{/*#######################I AM HERE ############################*/}
  function updatetesting(id,name,sirname,email,number){
    if (name === "" | sirname ==="" | email === "" | number <= 0){
      alert("please enter valid text")
    }
    else{
    deleteTeacher(id);
    addTeacher1(id,name,sirname,email,number);
    window.location.reload(false);
  }
  }

  function updateInfo(e){
    e.target.nextElementSibling.nextElementSibling.classList.remove('hidden') 
    
  }


  
  function updateTeachers(items){
    
    const teachers = items.map(({id,name,sirname,email,number})=>
    
    <tr key={id} className='entire-row'>
    <td className='width-20'>
      
      <input value={name} readOnly/> <button onClick={updateInfo}> Edit </button> 
      <br/>
      <div className='hidden'>
      <input id={'name'+id}></input><button onClick={() => updatetesting(id,document.getElementById('name'+id).value,sirname,email,number)}>Submit</button>
      </div>
    </td>

    <td className='width-20'>
      
      <input value={sirname} readOnly/> <button onClick={updateInfo}> Edit </button> 
      <br/>
      <div className='hidden'>
      <input id={'sirname'+id}></input><button onClick={() => updatetesting(id,name,document.getElementById('sirname'+id).value,email,number)}>Submit</button>
      </div>
    </td>
    
    <td className='width-20'>
      
      <input value={email} readOnly/> <button onClick={updateInfo}> Edit </button> 
      <br/>
      <div className='hidden'>
      <input id={'mail'+id} type="email"></input><button onClick={() => updatetesting(id,name,sirname,document.getElementById('mail'+id).value,number)}>Submit</button>
      </div>
    
    </td>
    
    <td className='width-20'>
      <input value={number} readOnly/> <button onClick={updateInfo}>  Edit </button>
      <br/> 
      <div className='hidden'>
      <input id={'number'+id} type="number"></input><button onClick={() => updatetesting(id,name,sirname,email,document.getElementById('number'+id).value)}>Submit</button>
      </div>
      </td>

    <td className='width-20'>
    <button onClick={()=> deleteTeacher(id)}>Delete</button> 
    </td>
    </tr>
    )

    return(
      teachers
    )
  }


  const deleteTeacher = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await request(reqUrl, deleteOptions);
    if (result)  console.log(result);
  }

  return (
      
    <div className="Personal">
        <p className='center'>Lägg till ny personal</p>
      <form className='personal-form'>
          <br/>
          <p>Förnamn:</p>
        <input type={'text'} className='personal-input' value={input} onInput={e => setInput(e.target.value)} required/>
        <br/>
        <p>Efternamn:</p>
        <input type={'text'} className='personal-input' value={input1} onInput={e => setInput1(e.target.value)} required/>
        <br/>
        <p>Email:</p>
        <input type={'mail'} className='personal-input' value={input2} onInput={e => setInput2(e.target.value)} required/>
        <br/>
        <p>Bankkonto:</p>
        <input type={'number'} className='personal-input' value={input3} onInput={e => setInput3(e.target.value)} required/>
        <button className='btn' onClick={()=>addTeacher(input,input1,input2,input3)}> setdata </button>
      </form>
      <table className='teacher-table'>
        <tr>
        <th>Teacher Name</th>
        <th>Teacher sirname</th>
        <th>Teacher Email</th>
        <th>Teacher BankNumber</th>
        <th>Delete</th>
          
        </tr>
       {updateTeachers(items)}
       </table>
    </div>
  );
}

export default Personal;
