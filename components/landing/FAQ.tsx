import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What can I watch on WonderX?",
    answer: "On WonderX, you can dive into a broad range of courses encompassing web development, programming, data science, design, and much more. Our platform is continuously updated with the latest content to ensure our users always have access to the best and latest knowledge."
  },
  {
    question: "What is WonderX?",
    answer: "WonderX is a leading online learning platform designed to empower individuals to upgrade their skills, deepen their knowledge, and achieve their professional and personal learning goals. With high-quality courses from top-tier instructors and a user-friendly interface, WonderX is the go-to destination for comprehensive learning."
  },
  {
    question: "How much does WonderX cost?",
    answer: "WonderX offers various subscription models to cater to different needs. We have monthly and annual plans, and occasionally, we offer lifetime access deals. Prices may vary based on region and promotions. For detailed pricing, please visit our subscription page."
  },
  {
    question: "Where can I watch?",
    answer: "You can access WonderX on a variety of devices including desktops, laptops, tablets, and smartphones. Our platform is web-based, so all you need is an internet connection and a modern browser. We're also working on mobile apps for an even more seamless learning experience on the go."
  },
  {
    question: "How do I cancel?",
    answer: "Canceling your WonderX subscription is straightforward. Go to your account settings, navigate to the subscription section, and follow the prompts to cancel. Although we'd hate to see you go, you can cancel anytime without any hidden charges."
  },
  {
    question: "Is WonderX good for kids?",
    answer: "Absolutely! WonderX offers a range of beginner-friendly courses that are suitable for kids and teenagers. We believe in fostering a love for learning from a young age, and our platform is designed to be engaging and intuitive for learners of all ages."
  }
];


const FAQ = () => {
    return (
      <div className="my-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqData.map((item, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-9 py-4 text-lg font-medium text-left text-white bg-gray-700 hover:bg-gray-600 rounded focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>{item.question}</span>
                      {open ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-6 py-4 text-base text-white bg-gray-800 rounded-b mb-6">
                      {item.answer}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default FAQ;