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

function Reservations() {
  const reservations = [
    { cusID: 1, Name: "John Doe", ReservationTime: "12:00", DesiredPriceRange: "3억" },
    { cusID: 2, Name: "Jane Smith", ReservationTime: "15:00", DesiredPriceRange: "3억" },
    { cusID: 3, Name: "John Doe", ReservationTime: "12:00", DesiredPriceRange: "3억" },
    { cusID: 4, Name: "John Doe", ReservationTime: "12:00", DesiredPriceRange: "3억" },
    { cusID: 5, Name: "John Doe", ReservationTime: "12:00", DesiredPriceRange: "3억" },
    { cusID: 6, Name: "John Doe", ReservationTime: "12:00", DesiredPriceRange: "3억" },
  ];

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

  return (
    <Container>
      <Header>금일 예약 고객님</Header>
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
          {reservations.map(reservation => (
            <tr key={reservation.cusID}>
              <Td>{reservation.cusID}</Td>
              <Td>{reservation.Name} 님</Td>
              <Td>{reservation.ReservationTime}</Td>
              <Td>{reservation.DesiredPriceRange}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Reservations;