import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, 1fr));
  gap: 20px;
  grid-auto-rows: 2fr;
`;

const VendorListContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default VendorListContainer;
