const SmallCustomerCard = ({
  name,
  imageUrl,
  amount,
}: {
  name: string;
  imageUrl: string;
  amount: number;
}) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <img
          src={imageUrl}
          alt="name of the customer"
          className="w-[50px] h-[50px] object-cover rounded-xl"
        />
        <strong className="text-gray-500 capitalize">{name}</strong>
        <span className="bg-gray-200/90 text-gray-400 font-semibold text-[.8rem]  px-4 rounded-lg">
          ${amount}.0
        </span>
      </div>
    </>
  );
};

export default SmallCustomerCard;
