import axios from "axios";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 10px; // 버튼 사이의 간격
`;

function PropertyData() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;  // 한 페이지에 표시할 아이템 수

  const callApi = async () => {
    try {
      const response = await axios.post("http://localhost:5000/property_process", {}, {
        withCredentials: true
      });
      setProperties(response.data);  // 전체 데이터 저장
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  // 현재 페이지에 표시할 데이터 계산
  const currentData = properties.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < properties.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container>
      <Header>전체 매물 데이터</Header>
      <Table>
        <thead>
          <tr>
            <Th>번호</Th>
            <Th>매물 이름</Th>
            <Th>가격대</Th>
            <Th>임대인 연락처</Th>
            <Th>등급</Th>
            <Th>주소</Th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(property => (
            <tr key={property.PropertyID}>
              <Td>{property.PropertyID}</Td>
              <Td>{property.PropertyName}</Td>
              <Td>{property.PriceRange}</Td>
              <Td>{property.LandlordContact}</Td>
              <Td>{property.Grade}</Td>
              <Td>{property.Address}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationContainer>
        <PageButton onClick={previousPage}>이전</PageButton>
        <PageButton onClick={nextPage}>다음</PageButton>
      </PaginationContainer>
    </Container>
  );
}

export default PropertyData;
