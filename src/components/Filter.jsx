import React, { useState } from "react";

// Filters component to manage filtering options
const Filters = ({ onSearch }) => {
  // State variables for selected category, minimum and maximum price, minimum and maximum rating
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);

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

  // Function to handle search action
  const handleSearch = () => {
    // Call the onSearch function passed from parent component with filter inputs
    onSearch({
      category: selectedCategory,
      minPrice: minPrice,
      maxPrice: maxPrice,
      minRating: minRating,
      maxRating: maxRating,
    });
  };

  // Render filtering options with input fields, select element, and search button
  return (
    <div className="filters">
      <div>
        {/* Select element for category filtering */}
        <label htmlFor="category">Category:</label>
        <select id="category" onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="Photographer">Photographer</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Musician">Musician</option>
          <option value="Catering">Catering</option>
        </select>
        {/* Input fields for min and max price, min and max rating */}
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
        {/* Search button */}
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Filters; // Export Filters component
