import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContainerLayout from "../layout/ContainerLayout";
import { useLocation, useNavigate } from "react-router";
import { IoArrowBackSharp } from "react-icons/io5";
import { nanoid } from "@reduxjs/toolkit";
import {
  addAddress,
  editAddress,
  selectSelectedAddress,
  selectAddress,
  deleteAddress,
} from "../store/slices/addressSlice";
import { FaAngleDown } from "react-icons/fa";
import { useWindow } from "../hooks/useWidth";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const countries = ["India", "USA", "Germany", "Canada", "Australia"];

const DeliveryAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const width = useWindow();
  const location = useLocation();
  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (items.length === 0) {
      toast.error("Please review your cart before selecting delivery address.");
      navigate("/cart", { replace: true });
    }
  }, [location.key, navigate]);

  const { addresses } = useSelector((state) => state.address);
  const selectedAddress = useSelector(selectSelectedAddress);
  const [open, setopen] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    country: countries[0],
    city: "",
    zip: "",
    street: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  // 🔹 Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.zip) newErrors.zip = "ZIP code is required";
    else if (form.zip.length !== 6) newErrors.zip = "ZIP code must be 6 digits";
    if (!form.street.trim()) newErrors.street = "Street address is required";
    else if (form.street.length > 250)
      newErrors.street = "Street must be less than 250 characters";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone number must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setForm({
      country: countries[0],
      city: "",
      zip: "",
      street: "",
      phone: "",
    });
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingId) {
      dispatch(editAddress({ id: editingId, data: form }));
      setEditingId(null);
    } else {
      const newId = nanoid();
      dispatch(addAddress({ ...form, id: newId }));
      dispatch(selectAddress(newId)); // auto-select newly added address
    }

    resetForm();
  };

  const handleEdit = (address) => {
    setForm(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleDeliver = (address) => {
    dispatch(selectAddress(address.id));
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const handlePay = () => {
    if (!selectedAddress) {
      if (addresses.length > 0) {
        toast.error("Please select an address before proceeding to payment.");
      } else {
        toast.error("Please add an address before proceeding to payment.");
      }
      return;
    }

    // navigate("/payment", { state: { comingFrom: "address" } });
    navigate("/payment");
  };

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      dispatch(selectAddress(addresses[0].id));
    }
  }, [addresses, dispatch, selectedAddress]);

  return (
    <ContainerLayout>
      {items.length > 0 && (
        <div className="w-full flex flex-col px-3 md:px-25 lg:px-20 xl:px-10 2xl:px-85 pt-20 lg:pt-30 pb-15 lg:pb-20 space-y-6 xl:space-y-12">
          {/* Header */}
          <div className="flex items-center gap-3">
            {width >= 768 && (
              <IoArrowBackSharp
                size={30}
                className="cursor-pointer"
                onClick={() => navigate("/cart")}
              />
            )}
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
              Choose Address
            </h1>
          </div>

          {/* Address List */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="space-y-6 w-full">
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer ${
                      selectedAddress?.id === address.id
                        ? "border-dark-button-blue bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleDeliver(address)}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        checked={selectedAddress?.id === address.id}
                        onChange={() => handleDeliver(address)}
                        className="mt-2 p-3"
                      />

                      <div className="flex-1">
                        <p className="font-bold text-lg">
                          Street:
                          <span className="text-dark-gray text-lg">
                            {" "}
                            {address.street}
                          </span>
                        </p>
                        <p className="font-bold text-lg">
                          City:{" "}
                          <span className="text-dark-gray text-lg">
                            {" "}
                            {address.city}, {address.zip}
                          </span>
                        </p>
                        <p className="font-bold text-lg">
                          Country:{" "}
                          <span className="text-dark-gray text-lg">
                            {" "}
                            {address.country}
                          </span>
                        </p>
                        <p className="font-bold text-lg">
                          Phone:{" "}
                          <span className="text-dark-gray text-lg">
                            +91 {address.phone}
                          </span>
                        </p>{" "}
                        {/* Display phone number */}
                        <div className="flex gap-4 mt-3 items-center">
                          <MdEdit
                            onClick={() => handleEdit(address)}
                            className="text-light-black"
                            fontSize={24}
                          />
                          <FaTrashAlt
                            fontSize={20}
                            disabled={editingId === address.id}
                            onClick={() => {
                              dispatch(deleteAddress(address.id));
                              if (editingId === address.id) resetForm();
                            }}
                            className={`text-red-600 ${
                              editingId === address.id
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            } `}
                          />

                          {/* <button
                      disabled={editingId === address.id}
                      onClick={() => {
                        dispatch(deleteAddress(address.id));
                        if (editingId === address.id) resetForm();
                      }}
                      className={`text-red-600 text-sm ${
                        editingId === address.id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Delete
                    </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center gap-4 mt-10">
                  <img
                    src={
                      "https://static.vecteezy.com/system/resources/previews/038/826/250/non_2x/analyze-errors-on-the-web-error-not-found-concept-flat-illustration-vector.jpg"
                    }
                    alt="No addresses"
                    className="w-64"
                    loading="lazy"
                  />
                  <p className="text-2xl font-bold text-dark-button-blue">
                    No addresses found
                  </p>
                </div>
              )}
            </div>
            {/* Address Form */}
            {showForm && (
              <>
                <div
                  className={`w-full ${width < 1091 ? "max-w-full" : "max-w-lg"}`}
                >
                  <div className="space-y-4 border p-4 rounded-lg border-gray-300">
                    {/* Country */}
                    <label className="block font-medium mb-1">Country</label>
                    <div className="relative w-full">
                      <div
                        className="border border-gray-300 p-2 rounded cursor-pointer flex justify-between items-center"
                        onClick={() => setopen((prev) => !prev)}
                      >
                        <span>{form.country}</span>
                        <FaAngleDown
                          className={`transition-transform duration-200 ${
                            open ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </div>

                      {open && (
                        <div className="absolute z-10 w-full border border-gray-300 rounded bg-white mt-1 max-h-40 overflow-y-auto">
                          {countries.map((c) => (
                            <div
                              key={c}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                handleChange("country", c);
                                setopen(false);
                              }}
                            >
                              {c}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block font-medium mb-1">City</label>
                      <input
                        type="text"
                        placeholder="City"
                        value={form.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className={`w-full border p-2 rounded ${errors.city ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    {/* ZIP */}
                    <div>
                      <label className="block font-medium  mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        placeholder="ZIP Code (6 digits)"
                        maxLength={6}
                        value={form.zip}
                        onChange={(e) =>
                          handleChange("zip", e.target.value.replace(/\D/g, ""))
                        }
                        className={`w-full border p-2 rounded ${errors.zip ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.zip && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.zip}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="Phone Number (10 digits)"
                        maxLength={10}
                        value={form.phone}
                        onChange={(e) =>
                          handleChange(
                            "phone",
                            e.target.value.replace(/\D/g, ""),
                          )
                        }
                        className={`w-full border p-2 rounded ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Street */}
                    <div>
                      <label className="block font-medium mb-1">
                        Street Address
                      </label>
                      <textarea
                        placeholder="Street Address"
                        maxLength={250}
                        value={form.street}
                        onChange={(e) => handleChange("street", e.target.value)}
                        className={`w-full border p-2 rounded ${errors.street ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.street && (
                        <p className="text-red-500 text-sm">{errors.street}</p>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleSubmit}
                        className="bg-dark-button-blue text-white px-4 py-2 rounded cursor-pointer"
                      >
                        {editingId ? "Update Address" : "Save Address"}
                      </button>
                      <button
                        onClick={resetForm}
                        className="border px-4 py-2 rounded cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Add New Address Button and Pay Button */}
          {width >= 1024 && (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (!showForm) {
                    setEditingId(null);
                    setForm({
                      country: countries[0],
                      city: "",
                      zip: "",
                      street: "",
                      phone: "",
                    });
                    setShowForm(true);
                  } else if (editingId === null) {
                    setShowForm(false);
                  }
                }}
                className="mt-6 w-full bg-dark-button-blue text-white py-3 rounded font-bold hover:bg-blue-900 cursor-pointer"
              >
                +{"  "} Add new address
              </button>
              <button
                onClick={() => handlePay()}
                className="mt-6 w-full bg-white text-dark-blue py-3 rounded font-bold border border-dark-blue cursor-pointer hover:bg-gray-50"
              >
                Continue
              </button>
            </div>
          )}

          <div
            className="fixed bottom-0 left-0 right-0 z-13 h-[65px] bg-white border-t border-gray-200 flex lg:hidden justify-center items-center gap-2 px-3 w-full shadow-[0_-1px_6px_rgba(0,0,0,0.06)]
        "
          >
            <button
              onClick={() => {
                if (!showForm) {
                  setEditingId(null);
                  setForm({
                    country: countries[0],
                    city: "",
                    zip: "",
                    street: "",
                    phone: "",
                  });
                  setShowForm(true);
                } else if (editingId === null) {
                  setShowForm(false);
                }
              }}
              className="w-full bg-dark-button-blue text-white py-3 rounded font-bold hover:bg-blue-900 cursor-pointer"
            >
              +{"  "} Add new address
            </button>
            <button
              onClick={handlePay}
              className="w-full bg-white text-dark-blue py-3 rounded font-bold border border-dark-blue cursor-pointer hover:bg-gray-50"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </ContainerLayout>
  );
};

export default DeliveryAddress;
