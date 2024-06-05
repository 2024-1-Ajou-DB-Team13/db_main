import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Route, Routes, NavLink } from "react-router-dom";
import AdToPro from "./AdToPro";

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

function Inquiries() {
  const inquiries = [
    { PropertyName: "Property_38", Media: "직방", InquiryCount: 32 },
    { PropertyName: "Property_36", Media: "네이버", InquiryCount: 131 },
    { PropertyName: "Property_36", Media: "네이버", InquiryCount: 131 },
    { PropertyName: "Property_36", Media: "네이버", InquiryCount: 131 },
    { PropertyName: "Property_36", Media: "네이버", InquiryCount: 131 },
  ];

  const callApi = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/advertisement_process",
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);
  var index = 1;
  return (
    <Container>
      <Header>광고 매체별 문의</Header>
      <Table>
        <thead>
          <tr>
            <Th>순위</Th>
            <Th>매물명</Th>
            <Th>광고 매체 명</Th>
            <Th>문의 횟수</Th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiries) => (
            <StyledNavLink to="/adtopro" key={index}>
              <Td>{index++}</Td>
              <Td>{inquiries.PropertyName}</Td>
              <Td>{inquiries.Media}</Td>
              <Td>{inquiries.InquiryCount}</Td>
            </StyledNavLink>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path="adtopro" element={<AdToPro />} />
      </Routes>
    </Container>
  );
}

export default Inquiries;
