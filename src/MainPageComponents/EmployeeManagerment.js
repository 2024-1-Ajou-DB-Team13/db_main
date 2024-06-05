import axios from "axios";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px;
`;

const Header = styled.h1`
  font-size: 40px;
  color: #333;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const Th = styled.th`
  border-top: 1px solid #000;
  padding: 20px;
  text-align: center;
  font-size: 20px;
`;

const Td = styled.td`
  border-top: 1px solid #000;
  padding: 20px;
  text-align: center;
  font-size: 20px;
`;

function EmployeeManagement() {
  const employee = [
    {UserID: 1, UserType: 'admin', UserName: 'admin', Password: '0000'},
    {UserID: 2, UserType: 'manager', UserName: 'manager', Password: '0000'},
    {UserID: 2, UserType: 'manager', UserName: 'manager', Password: '0000'},
    {UserID: 2, UserType: 'manager', UserName: 'manager', Password: '0000'},
    {UserID: 2, UserType: 'manager', UserName: 'manager', Password: '0000'},
    {UserID: 2, UserType: 'manager', UserName: 'manager', Password: '0000'},
    {UserID: 2, UserType: 'manager', UserName: 'manager', Password: '0000'},
  ];

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
    var index = 0;

  return (
    <Container>
      <Header>직원 관리</Header>
      <Table>
        <thead>
          <tr>
            <Th>번호</Th>
            <Th>이름</Th>
            <Th>아이디</Th>
            <Th>유저 유형</Th>
          </tr>
        </thead>
        <tbody>
          {employee.map(employee => (
            <tr key={employee.cusID}>
              <Td>{index++}</Td>
              <Td>{employee.UserName}</Td>
              <Td>{employee.UserID}</Td>
              <Td>{employee.UserType}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default EmployeeManagement;