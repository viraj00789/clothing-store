import { useNavigate } from "react-router";

const NoClothesFound = ({ clearFilters }) => {
  const Navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <img
        src="https://images.unsplash.com/photo-1702586364049-84998b258417?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG5vJTIwY2xvdGh8ZW58MHx8MHx8fDA%3D"
        alt="No products found"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-xl mb-6 object-cover"
        loading="lazy"
      />

      <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
        No Clothes Found
      </h3>

      <p className="text-gray-500 text-sm md:text-base max-w-md">
        We couldn’t find any clothes matching your filters. Try adjusting your
        filters or clearing them.
      </p>

      <button
        onClick={() => {
          clearFilters();
          Navigate("/search/all");
        }}
        className="mt-6 bg-dark-button-blue hover:bg-blue-900 transition text-white px-6 py-2 rounded-lg font-medium cursor-pointer"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default NoClothesFound;
