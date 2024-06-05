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

function PropertyData() {

  const property = [
    {Address: "서울시 관악구 테헤란로 35-75", Grade: "C", LandlordContact:"01000650217", PriceRange: 33433, PropertyID: 1, PropertyName: "Property_1"},
    {Address: "서울시 관악구 테헤란로 35-75", Grade: "C", LandlordContact:"01000650217", PriceRange: 33433, PropertyID: 1, PropertyName: "Property_1"},
    {Address: "서울시 관악구 테헤란로 35-75", Grade: "C", LandlordContact:"01000650217", PriceRange: 33433, PropertyID: 1, PropertyName: "Property_1"},
    {Address: "서울시 관악구 테헤란로 35-75", Grade: "C", LandlordContact:"01000650217", PriceRange: 33433, PropertyID: 1, PropertyName: "Property_1"},
  ];

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

  return (
    <Container>
      <Header>전체 매물 데이터</Header>
      <Table>
        <thead>
          <tr>
            <Th>번호</Th>
            <Th>매물명</Th>
            <Th>가격대</Th>
            <Th>주인 연락처</Th>
            <Th>등급</Th>
            <Th>주소</Th>
          </tr>
        </thead>
        <tbody>
          {property.map(property => (
            <tr key={property.cusID}>
              <Td>{property.PropertyID}</Td>
              <Td>{property.PropertyName}</Td>
              <Td>{property.PriceRange}</Td>
              <Td>{property.LandlordContact}</Td>
              <Td>{property.Address}</Td>
              <Td>{property.Grade}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default PropertyData;