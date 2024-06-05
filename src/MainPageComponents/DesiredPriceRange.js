import React from 'react';
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
  const properties = [
    { id: 1, name: "호반베르디움 아파트", grade: "A", address: "서울시 관악구 관악로", phone: "010-1234-5678" },
    { id: 2, name: "abc 아파트", grade: "A", address: "서울시 관악구 관악로", phone: "010-1234-5678" },
    { id: 3, name: "**시 def 주택", grade: "A", address: "서울시 관악구 관악로", phone: "010-1234-5678" },
    { id: 4, name: "blahblah 집", grade: "A", address: "서울시 관악구 관악로", phone: "010-1234-5678" },
  ];

  const handleClose = () => {
    window.close();
  };

  return (
    <Container>
      <Header>
        <Title>가격대 검색(3억 2천)</Title>
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
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <tr key={property.id}>
              <Td>{property.id}</Td>
              <Td>{property.name}</Td>
              <Td>{property.grade}</Td>
              <Td>{property.address}</Td>
              <Td>{property.phone}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default DesiredPriceRange;
