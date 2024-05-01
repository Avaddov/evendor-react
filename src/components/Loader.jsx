import React from "react";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import Spinner from 'react-bootstrap/Spinner'; // Importing Spinner component from react-bootstrap

// Loader component renders a spinner indicating loading state
function Loader() {
  return (
    // Render a Spinner component with animation and role attributes
    <Spinner animation="border" role="status" text-align="center" margin="20px">
      {/* Hidden text for accessibility */}
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loader; // Export Loader component
