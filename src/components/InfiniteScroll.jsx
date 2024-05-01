import React, { useEffect } from "react";
import VendorCard from "./VendorCard";
import VendorListContainer from "./VendorListContainer";
import Loader from "./Loader";

// InfiniteScroll component takes three props:
// - loadMore: a function to load more data when the user reaches the bottom of the page
// - hasMore: a boolean indicating whether there is more data to load
// - children: child elements to be rendered within the component
const InfiniteScroll = ({ loadMore, hasMore, children }) => {
  // Function to handle scrolling events
  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the page and there is more data to load
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      hasMore
    ) {
      // Call the loadMore function to load additional data
      loadMore();
    }
  };

  // useEffect hook to add and remove event listener for scroll events
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Dependencies array ensures that the event listener is added/removed only when handleScroll changes

  // Render the component with child elements and a Loader component
  return (
    <div>
      <VendorListContainer>{children}</VendorListContainer>
      <Loader loading={!hasMore} />
    </div>
  );
};

export default InfiniteScroll;
