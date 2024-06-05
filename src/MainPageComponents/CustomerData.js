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

function CustomerData() {
  const customer = [
    {CusID:1, DesiredPriceRange:7005, Name:"Customer_1", ReservationTime:"2025-03-15T17:01:19.000Z"},
    {CusID:1, DesiredPriceRange:7005, Name:"Customer_1", ReservationTime:"2025-03-15T17:01:19.000Z"},
    {CusID:1, DesiredPriceRange:7005, Name:"Customer_1", ReservationTime:"2025-03-15T17:01:19.000Z"},
    {CusID:1, DesiredPriceRange:7005, Name:"Customer_1", ReservationTime:"2025-03-15T17:01:19.000Z"},
    {CusID:1, DesiredPriceRange:7005, Name:"Customer_1", ReservationTime:"2025-03-15T17:01:19.000Z"},
  ];

  const callApi = async()=>{
    try {
      const response = await axios.post("http://localhost:5000/customer_process", { withCredentials: true } );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
      callApi();
    }, []);

  return (
    <Container>
      <Header>전체 고객 데이터</Header>
      <Table>
        <thead>
          <tr>
            <Th>번호</Th>
            <Th>성 함</Th>
            <Th>예약 시간</Th>
            <Th>희망 가격대</Th>
          </tr>
        </thead>
        <tbody>
          {customer.map(customer => (
            <tr key={customer.cusID}>
              <Td>{customer.CusID}</Td>
              <Td>{customer.Name}</Td>
              <Td>{customer.ReservationTime}</Td>
              <Td>{customer.DesiredPriceRange}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default CustomerData;