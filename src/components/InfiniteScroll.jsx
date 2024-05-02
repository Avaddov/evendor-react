import React, { useEffect } from "react";
import VendorListContainer from "./VendorListContainer";
import Loader from "./Loader";

const InfiniteScroll = ({ loadMore, hasMore, children }) => {
  // Function to handle scroll events
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

  useEffect(() => {
    // Add event listener for scroll events when the component mounts
    window.addEventListener("scroll", handleScroll);
    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures that the event listener is added/removed only once

  // Render the component with child elements and a Loader component
  return (
    <div>
      <VendorListContainer>{children}</VendorListContainer>
      <Loader loading={!hasMore} />
    </div>
  );
};

export default InfiniteScroll;
