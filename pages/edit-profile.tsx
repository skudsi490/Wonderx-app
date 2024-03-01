// E:\NEW\wonderx\pages\edit-profile.tsx
import { useRouter } from "next/router";
import { useState } from "react";

const EditProfile = () => {
  const router = useRouter();
  const [name, setName] = useState(""); // Assuming only the name is editable for now

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic to update the profile's details in the database
    // Once successful, redirect the user back to the profiles page
    router.push("/profiles");
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
