import axios from "axios";
import React, { useState, useEffect } from 'react';

function EmployeeManagement() {

  const callApi = async()=>{
    try {
      const response = await axios.post("http://localhost:5000/employee_process", { withCredentials: true } );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

useEffect(()=>{
    callApi();
  }, []);

  return <div>Employee Management Page</div>;
}

export default EmployeeManagement;