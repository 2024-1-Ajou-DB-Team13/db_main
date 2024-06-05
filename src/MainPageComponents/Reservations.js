import axios from "axios";
import React, { useState, useEffect } from 'react';


function Reservations() {
    const callApi = async()=>{
        try {
          const response = await axios.post("http://localhost:5000/reservations_process", { withCredentials: true } );
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    useEffect(()=>{
        callApi();
      }, []);

    return <div>Reservations Page</div>
}

export default Reservations;