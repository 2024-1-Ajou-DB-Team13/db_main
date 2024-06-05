import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import DesiredPriceRange from './DesiredPriceRange';

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

const PriceButton = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #73D116;
  color: white;
  border: 1px solid #73D116;
  border-radius: 5: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #66b914;
    color: #fff;
  }
`;

const NoDataMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: #666;
  margin-top: 20px;
`;

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [noData, setNoData] = useState(false);
  const tableRef = useRef(null);

  const callApi = async () => {
    try {
      const response = await axios.post("http://localhost:5000/reservations_process", {}, { withCredentials: true });
      if (response.data.code === 202 && Array.isArray(response.data)) {
        setReservations(response.data);
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

  const openPriceRangeWindow = () => {
    const tableRect = tableRef.current.getBoundingClientRect();
    const width = tableRect.width;
    const height = tableRect.height;
    window.open("/price", "_blank", `width=${width},height=${height},left=${window.screen.width - width},top=0`);
  };

  return (
    <Container>
      <Header>금일 예약 고객님</Header>
      {noData ? (
        <NoDataMessage>금일 손님이 없습니다.</NoDataMessage>
      ) : (
        <Table ref={tableRef}>
          <thead>
            <tr>
              <Th>번호</Th>
              <Th>성 함</Th>
              <Th>예약 시간</Th>
              <Th>희망 가격대</Th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{reservation.Name} 님</Td>
                <Td>{reservation.ReservationTime}</Td>
                <Td>
                  <PriceButton onClick={openPriceRangeWindow}>{reservation.DesiredPriceRange}</PriceButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Routes>
        <Route path="/price" element={<DesiredPriceRange />} />
      </Routes>
    </Container>
  );
}

export default Reservations;
