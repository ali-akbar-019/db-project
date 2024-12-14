import SmallCustomerCard from "@/components/SmallCustomerCard";
import { Separator } from "@/components/ui/separator";
import { ChartColumn } from "lucide-react";
import { useEffect, useState } from "react";
import DateObject from "react-date-object";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";

const HomePage = () => {
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
    console.log(formatedDate);
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
  //
  const chartData = [
    { range: "0-10", frequency: 20 },
    { range: "10-20", frequency: 45 },
    { range: "20-30", frequency: 35 },
    { range: "30-40", frequency: 60 },
    { range: "40-50", frequency: 50 },
    { range: "50-60", frequency: 30 },
  ];

  const linechartData = [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 300 },
    { month: "Mar", value: 200 },
    { month: "Apr", value: 278 },
    { month: "May", value: 189 },
    { month: "Jun", value: 239 },
    { month: "Jul", value: 349 },
    { month: "Aug", value: 420 },
  ];

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
                <SmallCustomerCard />
                <SmallCustomerCard />
                <SmallCustomerCard />
                <SmallCustomerCard />
                <SmallCustomerCard />
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
                <p className="text-3xl font-bold">$20,323.32</p>
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
                <span className="text-gray-600 ms-4">124</span>
              </p>
              <button className="border px-5 text-white font-bold py-2 rounded-xl mt-3 bg-purple-400 transition-all hover:bg-purple-500">
                Add New Product
              </button>
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
                <p className="text-3xl font-bold">$14,920.54</p>
              </div>
              {/*  */}
              <div className="flex items-center justify-around p-5">
                <div className="flex flex-col  ">
                  <span className="text-white/80 text-sm font-semibold">
                    Cancelled
                  </span>
                  <span className="font-bold">224</span>
                </div>

                <div className="flex flex-col  ">
                  <span className="text-white/80 text-sm font-semibold">
                    Placed
                  </span>
                  <span className="font-bold">224</span>
                </div>
                {/*  */}
                <div className="flex flex-col  ">
                  <span className="text-white/80 text-sm font-semibold">
                    Sold
                  </span>
                  <span className="font-bold">224</span>
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
                    data={linechartData}
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
                      data={chartData}
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
