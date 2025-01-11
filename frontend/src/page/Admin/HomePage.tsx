// @ts-nocheck
import { useGetAllOrders } from "@/api/orderApi";
import { useGetAllProducts } from "@/api/productsApi";
import SmallCustomerCard from "@/components/SmallCustomerCard";
import { Separator } from "@/components/ui/separator";
import { ChartColumn } from "lucide-react";
import { useEffect, useState } from "react";
import DateObject from "react-date-object";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const HomePage = () => {
  //
  const { data: allProducts, isLoading: allProductsLoading } =
    useGetAllProducts();
  //
  const { orders, isLoading: ordersLoading } = useGetAllOrders();
  const [allData, setAllData] = useState({
    totalProducts: 0,
    ordersInfo: {
      totalOrders: 0,
      totalEarned: 0,
      cancelled: 0,
      placed: 0,
      sold: 0,
    },
    charts: {
      chartData: [],
      linechartData: [],
    },
  });

  const generateChartData = (orders) => {
    // Calculate frequency of orders in specific totalAmount ranges
    const ranges = [
      { range: "0-10", min: 0, max: 1000 },
      { range: "10-20", min: 1000, max: 2000 },
      { range: "20-30", min: 2000, max: 30000 },
      { range: "30-40", min: 30000, max: 4000 },
      { range: "40-50", min: 4000, max: 5000 },
      { range: "50-60", min: 5000, max: 6000 },
    ];
    const chartData = ranges.map((r) => ({
      range: r.range,
      frequency: orders.filter(
        (order) => order.totalAmount >= r.min && order.totalAmount < r.max
      ).length,
    }));

    return chartData;
  };

  const generateLineChartData = (orders) => {
    // Group orders by month
    const monthMap = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };

    const monthlyData = orders.reduce((acc, order) => {
      const month = new Date(order.createdAt).getMonth();
      if (!acc[month]) acc[month] = 0;
      acc[month] += order.totalAmount;
      return acc;
    }, {});

    const linechartData = Object.keys(monthlyData).map((month) => ({
      month: monthMap[month],
      value: monthlyData[month],
    }));

    return linechartData;
  };

  useEffect(() => {
    if (!allProductsLoading && !ordersLoading && orders && allProducts) {
      setAllData((prev) => ({
        totalProducts: allProducts?.products?.length,
        ordersInfo: {
          totalOrders: orders.length,
          totalEarned: orders.reduce((acc, curr) => acc + curr.totalAmount, 0),
          cancelled: orders.filter((order) => order.status === "CANCELLED")
            .length,
          placed: orders.filter((order) => order.status === "PLACED").length,
          sold: orders.filter((order) => order.status === "PAID").length,
        },
        charts: {
          chartData: generateChartData(orders),
          linechartData: generateLineChartData(orders),
        },
      }));
    }
  }, [orders, allProducts, allProductsLoading, ordersLoading]);

  //
  const [formatedDate, setFormatedDate] = useState({
    year: "",
    day: "",
    month: "",
  });
  var date = new DateObject({
    date: new Date(),
  });

  useEffect(() => {
    // @ts-ignore
    setFormatedDate((prev) => {
      return {
        year: date.year,
        day: date.format("dddd"),
        month: date.format("MMMM"),
      };
    });
    //
    // console.log(formatedDate);
  }, [date.day]);
  //
  if (formatedDate.year === "") {
    // @ts-ignore
    setFormatedDate((prev) => {
      return {
        year: date.year,
        day: date.format("dddd"),
        month: date.format("MMMM"),
      };
    });
    //
  }
  console.log("charts :: ", allData.charts);
  // //
  // const chartData = [
  //   { range: "0-10", frequency: 20 },
  //   { range: "10-20", frequency: 45 },
  //   { range: "20-30", frequency: 35 },
  //   { range: "30-40", frequency: 60 },
  //   { range: "40-50", frequency: 50 },
  //   { range: "50-60", frequency: 30 },
  // ];

  // const linechartData = [
  //   { month: "Jan", value: 400 },
  //   { month: "Feb", value: 300 },
  //   { month: "Mar", value: 200 },
  //   { month: "Apr", value: 278 },
  //   { month: "May", value: 189 },
  //   { month: "Jun", value: 239 },
  //   { month: "Jul", value: 349 },
  //   { month: "Aug", value: 420 },
  // ];

  return (
    <>
      <div className="h-[100vh] overflow-y-scroll">
        <div className="grid grid-cols-3 ">
          <div className="border p-5">
            <p className="font-bold text-gray-700 text-xl pb-5">
              Recent Customers
            </p>
            {/* customers */}
            <div className="  ">
              <div className="flex items-center gap-2">
                <SmallCustomerCard
                  amount={23}
                  imageUrl="/imgs/horizontal_01.jpg"
                  name="Ali"
                />
                <SmallCustomerCard
                  amount={200}
                  imageUrl="/imgs/horizontal_02.jpg"
                  name="Laiba"
                />
                <SmallCustomerCard
                  amount={34}
                  imageUrl="/imgs/horizontal_03.jpg"
                  name="Zainab"
                />
                <SmallCustomerCard
                  amount={23}
                  imageUrl="/imgs/horizontal_04.jpg"
                  name="Umair"
                />
                <SmallCustomerCard
                  amount={23}
                  imageUrl="/imgs/horizontal_05.jpg"
                  name="Aliza"
                />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="border p-5">
            <p className="font-bold text-gray-700 text-xl pb-5">Weekly Sales</p>

            <div className=" ">
              <p className="text-gray-500 font-semibold text-sm">
                {formatedDate.day} - {formatedDate.month} - {formatedDate.year}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">
                  ${allData.ordersInfo.totalEarned}
                </p>
                <span>
                  <ChartColumn className="text-purple-600 w-20 h-16" />
                </span>
              </div>
              {/*  */}
              <small className="text-gray-500">14% increase</small>
            </div>
          </div>
          {/*  */}
          <div className="border p-5">
            <p className="font-bold text-gray-700 text-xl pb-5">
              Store Overview
            </p>
            {/* customers */}
            <div className="  ">
              <p className="font-bold text-gray-400 ">
                Total Products In Store
                <span className="text-gray-600 ms-4">
                  {allData.totalProducts}
                </span>
              </p>
              <Link to={"/admin/products"}>
                <button className="border px-5 text-white font-bold py-2 rounded-xl mt-3 bg-purple-400 transition-all hover:bg-purple-500">
                  Add New Product
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-10 bg-slate-50">
          {/*  */}
          <div className="flex items-center gap-2 justify-center">
            <div className="hero-bg  text-white rounded-2xl w-[400px]">
              <div className="border-b p-5">
                <p className="text-sm font-semibold  mb-3">Total Orders</p>
                <p className="text-white/80 font-semibold text-sm">
                  {formatedDate.day} - {formatedDate.month} -{" "}
                  {formatedDate.year}
                </p>
                <p className="text-3xl font-bold">
                  ${allData.ordersInfo.totalEarned}
                </p>
              </div>
              {/*  */}
              <div className="flex items-center justify-around p-5">
                <div className="flex flex-col  ">
                  <span className="text-white/80 text-sm font-semibold">
                    Cancelled
                  </span>
                  <span className="font-bold">
                    {allData.ordersInfo.cancelled}
                  </span>
                </div>

                <div className="flex flex-col  ">
                  <span className="text-white/80 text-sm font-semibold">
                    Placed
                  </span>
                  <span className="font-bold">{allData.ordersInfo.placed}</span>
                </div>
                {/*  */}
                <div className="flex flex-col  ">
                  <span className="text-white/80 text-sm font-semibold">
                    Sold
                  </span>
                  <span className="font-bold">{allData.ordersInfo.sold}</span>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
        {/*charts  */}
        <div className="p-10 bg-slate-50">
          <div className="grid grid-cols-2  bg-white">
            <div className="bg-white p-5 ">
              <p className="font-bold text-gray-900">History Sales Stat</p>
              <p className="text-sm text-gray-400 font-semibold">
                Since Jan 2022
              </p>
              <Separator className="my-3" />
              {/*  */}
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={allData.charts.linechartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    {/* Grid */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    {/* Axes */}
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    {/* Tooltip */}
                    <Tooltip
                      cursor={{ stroke: "#8884d8", strokeWidth: 2 }}
                      contentStyle={{
                        backgroundColor: "#f9f9f9",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    {/* Line */}
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="url(#lineGradient)"
                      strokeWidth={3}
                      dot={{ r: 5, stroke: "#8884d8", strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                    />
                    {/* Gradient */}
                    <defs>
                      <linearGradient
                        id="lineGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#8884d8" />
                        <stop offset="100%" stopColor="#82ca9d" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white ">
              <div className="bg-white p-5 col-span-2">
                <p className="font-bold text-gray-900">Daily Sales Stat</p>
                <p className="text-sm text-gray-400 font-semibold">
                  Since Jan 2022
                </p>
                <Separator className="my-3" />
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={allData.charts.chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      barCategoryGap="20%"
                    >
                      {/* Grid */}
                      <CartesianGrid strokeDasharray="3 3" />
                      {/* Axes */}
                      <XAxis dataKey="range" stroke="#666" />
                      <YAxis stroke="#666" />
                      {/* Tooltip */}
                      <Tooltip
                        cursor={{ fill: "#e0e0e0" }}
                        contentStyle={{
                          backgroundColor: "#f9f9f9",
                          border: "none",
                        }}
                      />
                      <Legend />
                      {/* Bars */}
                      <Bar
                        dataKey="frequency"
                        fill="url(#barGradient)"
                        barSize={30}
                        radius={[10, 10, 0, 0]}
                      />
                      {/* Gradient */}
                      <defs>
                        <linearGradient
                          id="barGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#8884d8" />
                          <stop offset="100%" stopColor="#82ca9d" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
