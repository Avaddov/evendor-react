import React, { useState, useEffect } from "react";
import InfiniteScroll from "./InfiniteScroll"; // Importing InfiniteScroll component for infinite scrolling functionality
import Filters from "./Filter"; // Importing Filters component for filtering options
import VendorCard from "./VendorCard"; // Importing VendorCard component to render vendor details

// VendorList component to display a list of vendors
const VendorList = () => {
  // State variables to manage vendors data, loading state, page number, and end of data flag
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  // State variables for filtering options: selected category, min and max price, min and max rating
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);

  // Function to fetch vendors data from the server
  const fetchVendors = async () => {
    if (!reachedEnd) {
      setLoading(true);
      try {
        let url = `http://localhost:8080/vendors?page=${pageNumber}`;
        // Add filters to the URL if they are set
        if (selectedCategory !== "" && selectedCategory !== "All") {
          url += `&category=${selectedCategory}`;
        }
        if (minPrice !== 0) {
          url += `&minPrice=${minPrice}`;
        }
        if (maxPrice !== 1000) {
          url += `&maxPrice=${maxPrice}`;
        }
        if (minRating !== 0) {
          url += `&minRating=${minRating}`;
        }
        if (maxRating !== 5) {
          url += `&maxRating=${maxRating}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          console.error("Vendors data is not an array:", data);
          setReachedEnd(true);
          setLoading(false);
          return;
        }
        if (data.length === 0) {
          setReachedEnd(true);
        } else {
          setVendors([...vendors, ...data]);
          setPageNumber(pageNumber + 1);
        }
        setLoading(false);
      } catch (error) {
        console.error("Fetch request failed:", error);
        setLoading(false);
      }
    }
  };

  // useEffect hook to fetch vendors data when the component mounts
  useEffect(() => {
    fetchVendors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to fetch more vendors data when scrolling
  const loadMoreVendors = () => {
    fetchVendors();
  };

  // Event handlers for changes in category, min price, max price, min rating, and max rating
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
  };

  const handleMinRatingChange = (event) => {
    setMinRating(Number(event.target.value));
  };

  const handleMaxRatingChange = (event) => {
    setMaxRating(Number(event.target.value));
  };

  // Render the component with filters and list of vendors using InfiniteScroll component
  return (
    <div>
      <h2>Available Vendors</h2>
      {/* Render Filters component with event handlers and filter state variables */}
      <Filters
        handleCategoryChange={handleCategoryChange}
        handleMinPriceChange={handleMinPriceChange}
        handleMaxPriceChange={handleMaxPriceChange}
        handleMinRatingChange={handleMinRatingChange}
        handleMaxRatingChange={handleMaxRatingChange}
        selectedCategory={selectedCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        minRating={minRating}
        maxRating={maxRating}
      />
      {/* Render InfiniteScroll component to load more vendors */}
      <InfiniteScroll loadMore={loadMoreVendors} hasMore={!reachedEnd}>
        {/* Map through vendors data and render VendorCard for each vendor */}
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default VendorList; // Export VendorList component
