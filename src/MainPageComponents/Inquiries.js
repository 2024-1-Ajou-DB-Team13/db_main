import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Route, Routes, NavLink } from "react-router-dom";
import AdToPro from "./AdToPro";

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

const StyledNavLink = styled(NavLink)`
  display: table-row;
  text-decoration: none;
  color: inherit;

  &:hover,
  &.active {
    background-color: #73d116;
    color: white;

    & td {
      background-color: #73d116;
    }
  }
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

function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const callApi = async () => {
    try {
      const response = await axios.post("http://localhost:5000/advertisement_process", {}, { withCredentials: true });
      setInquiries(response.data); // Assuming the data is an array of inquiries
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const currentData = inquiries.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < inquiries.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sendData = (inquiry) => {
    localStorage.setItem('property_name', inquiry)
  }

  return (
    <Container>
      <Header>광고 매체별 문의</Header>
      <Table>
        <thead>
          <tr>
            <Th>번호</Th>
            <Th>매물명</Th>
            <Th>광고 매체 명</Th>
            <Th>문의 횟수</Th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((inquiry, index) => (
            <StyledNavLink to="/adtopro" key={index} onClick={() => sendData(inquiry.PropertyName)}>
              <Td>{currentPage * itemsPerPage + index + 1}</Td>
              <Td>{inquiry.PropertyName}</Td>
              <Td>{inquiry.Media}</Td>
              <Td>{inquiry.InquiryCount}</Td>
            </StyledNavLink>
          ))}
        </tbody>
      </Table>
      <PaginationContainer>
        <PageButton onClick={previousPage}>이전</PageButton>
        <PageButton onClick={nextPage}>다음</PageButton>
      </PaginationContainer>
      <Routes>
        <Route path="/adtopro" element={<AdToPro />} />
      </Routes>
    </Container>
  );
}

export default Inquiries;
