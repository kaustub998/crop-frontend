import React from 'react'
import "./First_page.css"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const FirstPage = () => {

    const [values, setph_no] = useState({
        phone_no: '',
    })
    const [data1, setdata1] = useState({
        nodes: []
    })

    let navigate = useNavigate();

    const handleChange = (event) => {
        setph_no({
          ...values,
          [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            // const response = await axios.post('http://192.168.1.75:8000/first-page', values);
            // console.log(response.data)
            // console.log(typeof(response.data.nodes))
            // setdata1(response.data.nodes)
            // console.log(data1)

            await axios.post('https://api-crop-backend.onrender.com/first-page', values)
            .then((response) => {
                console.log(response.data)
                const temp = response.data;
                setdata1(temp.nodes);
                console.log(temp.nodes);

                navigate(`/input`,{state : response.data.nodes});
            })
            console.log(data1)
        }
        catch(error){
            console.log(error);
        }

    }

  return (
    <div id='first_page_all'>
        <h1 className='first_page_heading'>Crop Recommendation</h1>

        <form onSubmit={handleSubmit} className='first_form'>

            <div>
                <label className='first_page_ph_no'>Phone number </label>
                <input type = "text" name = 'phone_no' placeholder='Your phone number' maxLength="10" minLength="10" value= {values.phone_no} onChange={handleChange} className='form_input' required/>
            </div>

            <div className='login_div'>
                <input type="submit" value="Login" className='login_button'/>
            </div>
            
        </form>
    </div>
  )
}
