import { useState } from "react";

const ProductDetailsPin = () => {
  const [pincode, setPincode] = useState("");
  return (
    <div className="space-y-2 max-w-[400px]">
      <p className="font-semibold text-lg text-light-black">Delivery Details</p>
      <div className="relative border border-dark-gray py-3.5 px-5.5 rounded-10">
        <input
          type="number"
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.slice(0, 6);
            setPincode(val);
          }}
          placeholder="Enter Pincode"
          className="input focus:outline-none placeholder:text-light-black placeholder:text-sm placeholder:font-normal"
        />
        <button className="absolute w-fit right-5 text-sm text-light-black cursor-pointer">
          Check
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPin;
