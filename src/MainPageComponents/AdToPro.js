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
  const [property, setProperty] = useState({});

  const p_name = localStorage.getItem('property_name');

  const callApi = async () => {
    try {
      const response = await axios.post("http://localhost:5000/adtopro_process", {p_name}, { withCredentials: true });
      console.log(response.data[0]);
      setProperty(response.data[0])
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

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
          <tr key={property.PropertyID}>
            <Td>{property.PropertyName}</Td>
            <Td>{property.Grade}</Td>
            <Td>{property.Address}</Td>
            <Td>{property.PriceRange}</Td>
            <Td>{property.LandlordContact}</Td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default AdToPro;
