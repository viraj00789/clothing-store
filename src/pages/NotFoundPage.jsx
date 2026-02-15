import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="text-center max-w-xl w-full">
        {/* 404 Text */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-dark-button-blue">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-xl sm:text-2xl font-bold text-gray-800">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
          The page you are looking for doesn’t exist or has been moved. Let’s
          get you back to shopping in style.
        </p>

        {/* Illustration */}
        <div className="mt-8 flex justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1674921631244-66e47b989131?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxjbG90aHN8ZW58MHx8MHx8fDA%3D"
            alt="Fashion Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md mon-h-xs rounded-lg object-cover"
            loading="lazy"
          />
        </div>

        {/* Button */}
        <Link
          className="inline-block mt-8 bg-blue-900 hover:bg-blue-800 active:scale-95 text-white font-semibold px-8 py-3 rounded-lg transition duration-300"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
