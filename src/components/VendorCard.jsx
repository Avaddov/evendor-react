// // VendorCard.jsx
import React from "react";
// import styled from "styled-components";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


//Bootstrap card with vendor details fetching data from SQL

// VendorCard component renders a Bootstrap card with vendor details fetched from SQL
const VendorCard = ({ vendor }) => {
  return (
    // Render Bootstrap Card component with vendor details
    <Card style={{ width: '20rem' }}>
      {/* Render vendor image */}
      <Card.Img variant="top" src={vendor.image_url} height="280px"/>
      <Card.Body>
        {/* Render vendor name, type, price, and rating */}
        <Card.Title>{vendor.vendor_name}</Card.Title>
        <Card.Text>
          <p>{vendor.vendor_type}</p>
          <p> ${vendor.vendor_price}</p>
          <p> {vendor.vendor_rating} ★</p>
        </Card.Text>
        {/* Button to book the vendor */}
        <Button variant="primary">Book Vendor</Button>
      </Card.Body>
    </Card>
  );
}

export default VendorCard; 

///FAKER VERSION

// // VendorCard.jsx
// import React from "react";
// import styled from "styled-components";
// import { faker } from "@faker-js/faker/locale/en";
// const CardContainer = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   padding: 20px;
// `;
// const VendorCard = React.memo(({ vendor }) => {
//   return (
//     <CardContainer>
//       <img
//         src={faker.image.urlLoremFlickr({ category: "business" })}
//         alt=""
//         height="50px"
//       />
//       <h3>{faker.company.name()}</h3>
//       <p>Type: {faker.company.buzzNoun()}</p>
//       <p>Price: ${Math.ceil(Math.random() * 1000)}</p>
//       <p>Rating: {Math.ceil(Math.random() * 5)}</p>
//     </CardContainer>
//   );
// });
// export default VendorCard;
