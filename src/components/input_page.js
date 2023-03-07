import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { NodeInput } from './nodeInput.js';
import { useState } from 'react';
import axios from 'axios'

export const InputPage = () => {

    const location = useLocation();
    let navigate = useNavigate();

    let nodes = location.state;
    // console.log(location.state)

    // const [values, setvalues] = useState({
    //     data: []
    // })

    const [details, setdetails] = useState(Array(nodes.length).fill({
        node : 1,
        checked : true,
        N : 0.0,
        P : 0.0,
        K : 0.0,
    }))

    let handleSubmit = async (e) => {
        e.preventDefault();
        try{
            // const response = await axios.post('http://192.168.1.75:8000/first-page', values);
            // console.log(response.data)
            // console.log(typeof(response.data.nodes))
            // setdata1(response.data.nodes)
            // console.log(data1)
            // console.log(details)
            
            const res = {
                data: details
            }
            console.log(res)
            await axios.post('https://api-crop-backend.onrender.com/form-submit', res)
            .then((response) => {
                console.log("input page results");
                console.log(response.data.result)
                const temp = response.data;
                console.log(temp.result)

                navigate(`/results`,{state : response.data.result});
            })
        }
        catch(error){
            console.log(error);
        }
    }

  return (
    <div> 
        <h1 className='first_page_heading'>Select your nodes</h1>
        <form onSubmit={handleSubmit} className='first_form'>
            <div>
                {nodes.map( (node,i) => {return <NodeInput
                    node={node}
                    details = {details[i]}
                    setCurrentDetails = {(value) => {
                        const details_copy = [...details]
                        details_copy[i] = value;
                        details_copy[i].node = node; 
                        setdetails(details_copy)
                    }}
                />} )}
            </div>
            <div >
                <input type="submit" value="Submit" className='login_button2'/>
            </div>
        </form>
    </div>
  )
}
