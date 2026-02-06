import { dealsForDayProducts } from "../../../../../data/productsDealsForDay";

const MobileDealsForDay = () => {
  return (
    <div className="flex flex-wrap gap-8.5 p-3.75">
      {dealsForDayProducts.map((product) => (
        <div
          key={product.id}
          className="pl-px pb-px cursor-grab rounded-10 w-[179px]"
        >
          <div className="rounded-b-[10px] shadow-sm bg-white">
            <img
              className="h-[298px] w-[179px] object-cover rounded-t-[10px]"
              src={product.image}
              alt={product.title}
              loading="lazy"
            />

            <div className="py-5 xl:py-7.5 flex flex-col items-center space-y-4 xl:space-y-10.75">
              <div className="space-y-3 xl:space-y-5.75 text-light-black text-center">
                <p className="font-normal text-xl lg:text-4xl">Tops</p>
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
