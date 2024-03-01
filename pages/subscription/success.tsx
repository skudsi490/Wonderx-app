const Success: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl mb-8">Subscription Successful</h1>

      <p className="text-lg mb-8 text-center">
        Thank you for subscribing! You can now enjoy all the premium features.
        Explore and start learning.
      </p>

      <button
        onClick={() => {
          /* Redirect to the user's dashboard or main page */
        }}
        className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition duration-200"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Success;
