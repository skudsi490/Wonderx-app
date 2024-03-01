import React from 'react';

const GradientBanner = () => (
  <section className="py-8 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
    <div className="container mx-auto text-center flex flex-col md:flex-row items-center justify-between">
      <div className="w-full md:w-3/4">
        <h2 className="text-3xl mb-4">Unleash the potential that knowledge holds.</h2>
        <p className="text-xl mb-4">Subscribe to WonderX and redefine the way you learn.</p>
      </div>
      <div className="w-1/4 mt-4 md:mt-0">
        {/* Placeholder for Small Picture */}
        <img src="https://img1.picmix.com/output/stamp/normal/7/6/6/5/1765667_d3b84.png" alt="Small Banner Image" className="w-20 md:w-28 lg:w-40 rounded mx-auto" />
      </div>
    </div>
  </section>
);

export default GradientBanner;
