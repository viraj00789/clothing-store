const AboutUs = () => {
  return (
    <div className="px-3.75 xl:px-12.5 space-y-3 lg:space-y-[27px] my-6 lg:mt-[85px] rounded-[10px] pb-6 lg:pb-29">
      <h3 className="text-light-black font-bold text-2xl lg:text-4xl">
        About Us
      </h3>
      <div className="flex gap-0 lg:gap-7">
        <div className="w-full lg:w-1/2 space-y-3 lg:space-y-7">
          <p className="text-medium text-md xl:text-2xl">Business Name</p>
          <p className="font-normal text-md xl:text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui vel
            morbi cursus sed sodales molestie proin dictum gravida. Porttitor
            maecenas tincidunt ipsum semper malesuada. In sapien feugiat laoreet
            convallis eu sed. Sapien et montes, duis tempor euismod augue cras
            eu eget. Risus suspendisse mauris ullamcorper felis a, quam. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Dui vel morbi
            cursus sed sodales molestie proin dictum gravida. Porttitor maecenas
            tincidunt ipsum semper malesuada. In sapien feugiat laoreet
            convallis eu sed. Sapien et montes, duis tempor euismod augue cras
            eu eget. Risus suspendisse mauris ullamcorper felis a, quam.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Dui vel morbi
            cursus sed sodales molestie proin dictum gravida. Porttitor maecenas
          </p>
          <div className="space-y-2 lg:space-y-[15px]">
            <p className="text-respo-24">Contact Information</p>
            <p className="font-normal text-md xl:text-2xl">+91 1256378409</p>
            <p className="font-normal text-md xl:text-2xl">
              Someting@random.com
            </p>
          </div>
          <button className="border border-mid-gray py-1 px-3 lg:px-9.5 rounded-[10px] cursor-pointer font-normal text-lg hover:bg-black hover:text-white transition ease-in-out duration-300 max-w-[172px] whitespace-nowrap">
            Directions
          </button>
        </div>
        <div className="hidden lg:inline lg:w-1/2 min-h-[655px]">
          <img
            src="https://images.unsplash.com/photo-1573612664822-d7d347da7b80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="ayushi"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
