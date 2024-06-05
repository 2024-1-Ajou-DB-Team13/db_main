import axios from "axios";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border-bottom: 1px solid #000;
  padding: 10px;
  text-align: center;
  font-size: 23px;
`;

const Td = styled.td`
  border-bottom: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  font-size: 23px;
`;

function AdToPro() {
  const properties = [
    { id: 1, name: "호반베르디움 아파트", grade: "A", address: "서울시 관악구 관악로",pricerange: "3억 2000", phone: "010-1234-5678" },
  ];

  const handleClose = () => {
    window.close();
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>매물명</Th>
            <Th>등급</Th>
            <Th>주소</Th>
            <Th>가격</Th>
            <Th>전화번호</Th>
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <tr key={property.id}>
              <Td>{property.name}</Td>
              <Td>{property.grade}</Td>
              <Td>{property.address}</Td>
              <Td>{property.pricerange}</Td>
              <Td>{property.phone}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdToPro;
