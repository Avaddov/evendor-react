import React, { useState, useEffect } from "react";
import InfiniteScroll from "./InfiniteScroll";
import Filters from "./Filter";
import VendorCard from "./VendorCard";

const VendorList = () => {
  const [vendors, setVendors] = useState([]); // State for storing vendors data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [pageNumber, setPageNumber] = useState(1); // State for tracking current page number
  const [reachedEnd, setReachedEnd] = useState(false); // State for tracking if all data has been loaded
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category filter
  const [minPrice, setMinPrice] = useState(0); // State for minimum price filter
  const [maxPrice, setMaxPrice] = useState(1000); // State for maximum price filter
  const [minRating, setMinRating] = useState(0); // State for minimum rating filter
  const [maxRating, setMaxRating] = useState(5); // State for maximum rating filter

  // Function to fetch vendors data from the server
  const fetchVendors = async (page) => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/vendors?page=${page}`;
      // Append filter parameters to the URL if set
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
      // Fetch data from the constructed URL
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Check if the response data is an array
      if (!Array.isArray(data)) {
        console.error("Vendors data is not an array:", data);
        setReachedEnd(true);
        setLoading(false);
        return;
      }
      // Update vendors state with fetched data
      if (data.length === 0) {
        setReachedEnd(true);
      } else {
        setVendors([...vendors, ...data]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch request failed:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors(pageNumber);
  }, [pageNumber]);

  // Event handler for category filter change
  const handleCategoryChange = (changes) => {
    // setSelectedCategory(event.target.value);
    setSelectedCategory(changes.selectedCategory);
    setMinPrice(changes.minPrice);
    setMaxPrice(changes.maxPrice);
    setMinRating(changes.minRating);
    setMaxRating(changes.maxRating);
    setPageNumber(1); // Reset page number when category filter changes
    setVendors([]); // Clear existing vendors data
    setReachedEnd(false); // Reset end reached flag
  };

  // Other event handler functions...

  return (
    <div>
      <h2>Available Vendors</h2>
      {/* Render Filters component with event handlers and filter state variables */}
      <Filters
        handleCategoryChange={handleCategoryChange}
        // Other props...
      />
      {/* Render InfiniteScroll component to handle scrolling and load more vendors */}
      <InfiniteScroll
        loadMore={() => setPageNumber(pageNumber + 1)}
        hasMore={!reachedEnd}
      >
        {/* Map through vendors data and render VendorCard for each vendor */}
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default VendorList;