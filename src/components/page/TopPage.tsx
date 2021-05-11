import React from "react";
import HeroSection from "../organisms/HeroSection";
import Footer from "../atoms/Footer";

const TopPage = () => (
  <>
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection />
      </main>
      <Footer />
    </div>
  </>
);
export default TopPage;
