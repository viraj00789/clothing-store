import { FiLogOut, FiChevronRight } from "react-icons/fi";
import { getItem } from "../utils/localStorage";
import { useNavigate } from "react-router";
import useLogout from "../hooks/logout";
import { ProfileMenuItems } from "../../data/profileMenuItems";

const Profile = () => {
  const { name, email } = getItem("user") || {};
  const navigate = useNavigate();
  const logout = useLogout();

  return (
    <div className="w-full max-w-2xl mx-auto bg-white  sm:rounded-xl flex flex-col justify-between mb-8 md:mb-20 mt-20 md:mt-41 p-3 md:p-10 md:border border-light-gray-2">
      {/* Top Section */}
      <div>
        {/* Profile Info */}
        <div className="flex items-center gap-4 mb-7.5">
          <img
            src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tbWV8ZW58MHx8MHx8fDA%3D"
            alt="User"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-lg text-black">{name}</h3>
            <p className="text-sm text-dark-gray font-normal">{email}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {ProfileMenuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              onClick={() => navigate(item.href)}
            >
              <div className="flex items-center gap-3 text-gray-700">
                <img src={item.icon} className="w-5 h-5" alt={item.label} />
                <span className="text-sm font-medium text-light-black">
                  {item.label}
                </span>
              </div>

              <FiChevronRight className="text-light-black-2" size={20} />
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="mt-4">
          <div
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-50 transition cursor-pointer text-red-600"
            onClick={() => logout()}
          >
            <FiLogOut />
            <span className="text-sm font-medium">Log Out</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-xs text-center text-gray-400 mt-6">
        Privacy Policy | Terms and Conditions
      </div>
    </div>
  );
};

export default Profile;
