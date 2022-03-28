import React from 'react';
import './index.css';
import {useState,useEffect} from 'react';
import request from './request';

function Ansok() {


    const U_API_URL = "http://localhost:3500/utb"  
    const A_API_URL = "http://localhost:3500/ansokar"  

    const [utb, setUtb] = useState([]);
    const [ansok,setAnsok] = useState([]);

    useEffect (() => {
  
        const fetchItems = async () =>{
          try
          {
            const response = await fetch (A_API_URL);
            if (!response.ok) throw Error('Did not recieve expected data');
            const listItems = await response.json();
            setAnsok(listItems);
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
  

  const [input,setInput] = useState('');
  const [input1,setInput1] = useState('');
  const [input2,setInput2] = useState('');


  function updateUtb(items){
    
    const utb = items.map(({id,name})=>
    
        <option key={"idk"+id} value={name}>{name}</option>
    )

    return(
    <select id={'utb-name'}>
        {utb}
      </select>
    )
  }

  const addAnsok = async(name,sirname,mail,utbildning) =>
  {

    const id = ansok.length ? ansok[ansok.length-1].id +1 : 1;
    const ansokar = {
      "id" : id,
      "name": name,
      "sirname" : sirname,
      "email" : mail,
      "utb": utbildning
      
    }
    const listItems = [...ansok,ansokar];
    setAnsok(listItems);

    const postOptions = {
      method: 'POST',
      headers:{
        'Content-Type' : ' application/json'
      },
      body: JSON.stringify(ansokar)
    }
    const result = await request(A_API_URL, postOptions);
    if (result) console.log(result);
    
  }
  return (
    <div className="Ansok">
        <form className='center'>
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
        <p>Utbildning:</p>
        {updateUtb(utb)}
        <br></br>
        <br></br>
        <button className='btn' onClick={()=> addAnsok(input,input1,input2,document.getElementById('utb-name').value)}> Ansök </button>
      </form>
    </div>
  );
}

export default Ansok;
