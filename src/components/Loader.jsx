import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  text-align: center;
  margin: 20px;
  visibility: ${(props) => (props.loading ? "visible" : "hidden")};
`;

const Loader = ({ loading }) => {
  return <LoaderContainer loading={loading}>Loading...</LoaderContainer>;
};

export default Loader;
