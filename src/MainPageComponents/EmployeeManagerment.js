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

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const callApi = async () => {
    try {
      const response = await axios.post("http://localhost:5000/employee_process", {}, { withCredentials: true });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const currentData = employees.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < employees.length) {
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
      <Header>직원 관리</Header>
      <Table>
        <thead>
          <tr>
            <Th>번호</Th>
            <Th>이름</Th>
            <Th>아이디</Th>
            <Th>유저 유형</Th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((employee, index) => (
            <tr key={index}>
              <Td>{currentPage * itemsPerPage + index + 1}</Td>
              <Td>{employee.UserName}</Td>
              <Td>{employee.UserID}</Td>
              <Td>{employee.UserType}</Td>
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

export default EmployeeManagement;
