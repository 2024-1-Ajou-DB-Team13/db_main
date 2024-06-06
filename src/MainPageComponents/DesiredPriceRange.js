import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border-bottom: 1px solid #000;
  padding: 10px;
  text-align: center;
  font-size: 16px;
`;

const Td = styled.td`
  border-bottom: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  font-size: 16px;
`;

function DesiredPriceRange() {
  var desired_price = localStorage.getItem('desired_price')
  const [properties, setProperties] = useState([]);
  const [noData, setNoData] = useState(false);

  const callApi = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user_reservations_process", {desired_price}, { withCredentials: true });
      if (Array.isArray(response.data)) {
        console.log(response.data);
        setProperties(response.data);
        setNoData(false);
      } else if (response.data.code === 404) {
        setNoData(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 404) {
        setNoData(true);
      } else {
        setNoData(false);
      }
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
      <Header>
        <Title>가격대 검색({desired_price > 10000 ?
                    (Math.floor(desired_price / 10000) + '억' + Math.floor(desired_price / 1000 % 10) + '천') :
                    (Math.floor(desired_price / 1000 % 10) + '천')})</Title>
        <CloseButton onClick={handleClose}>×</CloseButton>
      </Header>
      <Table>
        <thead>
          <tr>
            <Th>번호</Th>
            <Th>부동산 명</Th>
            <Th>등급</Th>
            <Th>주소</Th>
            <Th>전화번호</Th>
            <Th>가격대</Th>
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <tr key={property.PropertyID}>
              <Td>{property.PropertyID}</Td>
              <Td>{property.PropertyName}</Td>
              <Td>{property.Grade}</Td>
              <Td>{property.Address}</Td>
              <Td>{property.LandlordContact}</Td>
              <Td>{property.PriceRange}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default DesiredPriceRange;
