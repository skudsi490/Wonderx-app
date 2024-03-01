const Canceled: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl mb-8">Subscription Canceled</h1>

      <p className="text-lg mb-8 text-center">
        Your subscription process was canceled. If you faced any issues, please
        contact our support.
      </p>

      <button
        onClick={() => {
          /* Redirect to the main page or plans page */
        }}
        className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition duration-200"
      >
        Return to Plans
      </button>
    </div>
  );
};

export default Canceled;
