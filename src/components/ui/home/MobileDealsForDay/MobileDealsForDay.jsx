import { dealsForDayProducts } from "../../../../../data/productsDealsForDay";

const MobileDealsForDay = () => {
  return (
    <div className="grid md:hidden grid-cols-2 gap-4.5 p-3.75 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {dealsForDayProducts.map((product) => (
        <div key={product.id} className="cursor-grab rounded-10">
          <div className="rounded-b-[10px] shadow-sm bg-white">
            <img
              className="h-[298px] w-full object-cover rounded-t-[10px]"
              src={product.image}
              alt={product.title}
              loading="lazy"
            />

            <div className="pt-2 pb-2.5 xl:py-7.5 flex flex-col items-center space-y-4 xl:space-y-10.75">
              <div className="space-y-3 xl:space-y-5.75 text-light-black text-center">
                <p className="font-normal text-sm lg:text-4xl text-light-black">Tops</p>
                <p className="font-medium text-xl text-light-black">
                  Under Rs. 700
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileDealsForDay;
