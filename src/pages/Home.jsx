// src/pages/Home.jsx

import React from 'react';
import HeroBanner from '../components/HeroBanner';
import FeatureSection from '../components/FeatureSection';
import PortfolioGallery from '../components/PortfolioGallery';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <FeatureSection />
      <PortfolioGallery />
      <Testimonials />
    </div>
  );
};

export default Home;
