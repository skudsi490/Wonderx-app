import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser"; // Import the hook

const images = [
  "/images/default-blue.png",
  "/images/default-red.png",
  "/images/default-slate.png",
  "/images/default-green.png",
];

// Form validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
});

type AddProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddProfileModal: React.FC<AddProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser(); // Use the hook to get current user

  const formik = useFormik({
    initialValues: {
      name: "",
      image: images[Math.floor(Math.random() * 4)], // Assigning a random image from the set of images
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "/api/profiles?userId=" + currentUser?.id,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          onClose();
          router.push("/profiles"); // Reload the profiles page to see the new profile
        } else {
          const errorData = await response.json();
          console.error("Failed to create profile:", errorData.error);
          alert(errorData.error); // Display the error to the user
        }
      } catch (error) {
        console.error("There was an error creating the profile", error);
      }
    },
  });

  return isOpen ? (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={formik.handleSubmit}>
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
              value={formik.values.name}
              onChange={formik.handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.errors.name && formik.touched.name && (
              <div>{formik.errors.name}</div>
            )}
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition mr-4"
            type="submit"
          >
            Add
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded transition"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default AddProfileModal;
