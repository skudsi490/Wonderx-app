import React from 'react';
import { FaRocket, FaChalkboardTeacher, FaPlayCircle } from 'react-icons/fa';  // Sample icons

const MarketingMaterialSection = () => (
  <section className="py-40 bg-black text-white">
    <div className="container mx-auto text-center">
      <h2 className="text-5xl mb-8">Why Choose WonderX?</h2>
      <div className="flex flex-wrap justify-center gap-12">
        {/* SVG Icon 1 */}
        <div className="w-1/4 text-center">
          <FaRocket className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl mb-4">Interactive Courses</h3>
          <p className="text-base">Engage with our interactive tutorials and enhance your learning experience.</p>
        </div>
        {/* SVG Icon 2 */}
        <div className="w-1/4 text-center">
          <FaChalkboardTeacher className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl mb-4">Expert Instructors</h3>
          <p className="text-base">Learn from industry experts who bring professional experience into the classroom.</p>
        </div>
        {/* SVG Icon 3 */}
        <div className="w-1/4 text-center">
          <FaPlayCircle className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl mb-4">On-Demand Streaming</h3>
          <p className="text-base">Stream courses anytime, anywhere, with our on-demand platform.</p>
        </div>
      </div>
    </div>
  </section>
);

export default MarketingMaterialSection;
