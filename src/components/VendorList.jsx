import React, { useState, useEffect } from "react";
import VendorCard from "./VendorCard";
import VendorListContainer from "./VendorListContainer";
import Loader from "./Loader";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);

  useEffect(() => {
    fetchVendors();
  }, []);

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

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !loading &&
      !reachedEnd
    ) {
      fetchVendors();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      <div>
        <h2>Available Vendors</h2>
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="Photographer">Photographer</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Musician">Musician</option>
            <option value="Catering">Catering</option>
          </select>
          <label htmlFor="minPrice">Min Price:</label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          <label htmlFor="minRating">Min Rating:</label>
          <input
            type="number"
            id="minRating"
            value={minRating}
            onChange={handleMinRatingChange}
          />
          <label htmlFor="maxRating">Max Rating:</label>
          <input
            type="number"
            id="maxRating"
            value={maxRating}
            onChange={handleMaxRatingChange}
          />
        </div>
        <VendorListContainer>
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </VendorListContainer>
        <Loader loading={loading} />
      </div>
    </div>
  );
};

export default VendorList;
