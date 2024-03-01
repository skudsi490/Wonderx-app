import React, { useState, useEffect } from 'react';

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={`py-40 bg-black text-white transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto text-center px-4">
        <h2 className="text-5xl mb-16">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <blockquote className="p-6 border border-gray-700 rounded shadow-lg hover:shadow-xl transform transition-transform hover:scale-105">
            “WonderX has transformed the way I learn. The variety of courses and the quality of instructors are unparalleled!”<br />
            <span className="text-xl mt-4 block">- A Satisfied Learner</span>
          </blockquote>
          <blockquote className="p-6 border border-gray-700 rounded shadow-lg hover:shadow-xl transform transition-transform hover:scale-105">
            “The flexibility to learn at my own pace, anytime, anywhere, is a game changer. WonderX has become my learning sanctuary.”<br />
            <span className="text-xl mt-4 block">- A Lifelong Explorer</span>
          </blockquote>
          {/* Add more testimonials as needed */}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
