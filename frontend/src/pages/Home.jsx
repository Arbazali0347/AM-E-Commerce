import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';
import Saving from '../components/SavingBundles';


const Home = () => {
  return (
    <div>
      <Hero/>
      <Saving/>
      <BestSeller/>
      <LatestCollection/>
      <OurPolicy/>
    </div>
  )
}

export default Home;