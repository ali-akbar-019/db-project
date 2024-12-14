import { Separator } from "@/components/ui/separator";

const AdminCustomersPage = () => {
  return (
    <div className="h-[100vh] overflow-y-auto bg-slate-50">
      <div className="bg-white p-5 text-2xl font-bold text-gray-900 shadow-sm">
        <h3>Customers</h3>
      </div>
      {/*  */}
      <div className="bg-white mt-5 rounded-xl p-5 m-10">
        <div className="">
          <p className="font-semibold capitalize"> Customers list</p>
        </div>
        <Separator className="my-5" />
        {/*table  */}
      </div>
    </div>
  );
};

export default AdminCustomersPage;
