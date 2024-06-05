import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import {Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import DesiredPriceRange from './DesiredPriceRange';

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

const PriceButton = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #73D116; /* 버튼 배경색 */
  color: white; /* 버튼 텍스트 색상 */
  border: 1px solid #73D116; /* 버튼 테두리 색상 */
  border-radius: 5px; /* 버튼 모서리 둥글게 */
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #66b914; /* 호버 시 배경색 */
    color: #fff; /* 호버 시 텍스트 색상 */
  }
`;

function Reservations() {
  const tableRef = useRef(null);
  const reservations = [
    { cusID: 1, Name: "John Doe", ReservationTime: "12:00", DesiredPriceRange: "3억" },
    { cusID: 2, Name: "Jane Smith", ReservationTime: "15:00", DesiredPriceRange: "3억" },
    { cusID: 3, Name: "John Doe", ReservationTime: "12:00", DesiredPriceRange: "3억" },
    { cusID: 4, Name: "John Doe", ReservationTime: "12:00", DesiredPriceRange: "3억" },
    { cusID: 5, Name: "John Doe", ReservationTime: "12:00", DesiredPriceRange: "3억" },
    { cusID: 6, Name: "John Doe", ReservationTime: "12:00", DesiredPriceRange: "3억" },
  ];

  

  useEffect(()=>{
      callApi();
    }, []);

  const openPriceRangeWindow = () => {
    const tableRect = tableRef.current.getBoundingClientRect();
    const width = tableRect.width;
    const height = tableRect.height;
    window.open("/price", "_blank", `width=${width},height=${height},left=${window.screen.width - width},top=0`);
  };

  return (
    <Container>
      <Header>금일 예약 고객님</Header>
      <Table ref={tableRef}>
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
              <Td><PriceButton onClick={openPriceRangeWindow}>{reservation.DesiredPriceRange}</PriceButton></Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path="/price" element={<DesiredPriceRange />} />
      </Routes>
    </Container>
  );
}

export default Reservations;