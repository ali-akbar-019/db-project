const SmallCustomerCard = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <img
          src="/imgs/horizontal_01.jpg"
          alt="name of the customer"
          className="w-[50px] h-[50px] object-cover rounded-xl"
        />
        <strong className="text-gray-500 capitalize">ali</strong>
        <span className="bg-gray-200/90 text-gray-400 font-semibold text-[.8rem]  px-4 rounded-lg">
          $20.0
        </span>
      </div>
    </>
  );
};

export default SmallCustomerCard;
