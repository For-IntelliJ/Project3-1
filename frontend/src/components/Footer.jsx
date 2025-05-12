import React from "react";
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-24">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} My Website. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
