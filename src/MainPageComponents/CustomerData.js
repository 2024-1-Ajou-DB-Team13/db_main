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
  margin: 0 10px;
`;

function formatDateTime(dateString) {
  const date = new Date(dateString);
  const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
  };
  return date.toLocaleString('ko-KR', options);
}

function CustomerData() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // 한 페이지에 표시할 아이템 수 조정

  const callApi = async () => {
    try {
      const response = await axios.post("http://localhost:5000/customer_process", {}, { withCredentials: true });
      setCustomers(response.data); // 데이터를 상태에 저장
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  // 현재 페이지에 표시할 데이터 계산
  const currentData = customers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < customers.length) {
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
          {currentData.map((customer, index) => (
            <tr key={index}>
              <Td>{currentPage * itemsPerPage + index + 1}</Td>
              <Td>{customer.Name}</Td>
              <Td>{formatDateTime(customer.ReservationTime)}</Td>
              <Td>{customer.DesiredPriceRange}</Td>
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

export default CustomerData;
