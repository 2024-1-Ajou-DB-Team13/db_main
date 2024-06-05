import axios from "axios";
import React, { useState, useEffect } from 'react';

function PropertyData() {

  const callApi = async()=>{
    try {
      const response = await axios.post("http://localhost:5000/property_process", { withCredentials: true } );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
      callApi();
    }, []);

  return <div>Property Data Page</div>;
}

export default PropertyData;