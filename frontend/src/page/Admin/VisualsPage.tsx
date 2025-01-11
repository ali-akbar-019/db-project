// @ts-nocheck
import { useGetAllOrders } from "@/api/orderApi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const VisualsPage = () => {
  const { orders, isLoading } = useGetAllOrders();
  console.log("orders :: ", orders);

  if (isLoading || !orders || orders.length === 0) return <div>Loading...</div>;

  // Process data for Bar Chart (Total sales per month)
  const barData = orders.reduce((acc, order) => {
    const month = new Date(order.createdAt).toLocaleString("default", {
      month: "short",
    });
    const existing = acc.find((item) => item.name === month);
    const orderTotal = Number(order.totalAmount); // Ensure total is a number
    if (existing) {
      existing.uv += orderTotal;
    } else {
      acc.push({ name: month, uv: orderTotal });
    }
    return acc;
  }, []);

  // Process data for Pie Chart (Completed vs Pending Orders)
  const pieData = [
    {
      name: "Completed",
      value: orders.filter((order) => order.status === "PAID").length, // Assuming PAID means completed
    },
    {
      name: "Pending",
      value: orders.filter((order) => order.status === "PLACED").length,
    },
  ];

  // Process data for Line Chart (Sales trend over time)
  const lineData = orders.reduce((acc, order) => {
    const month = new Date(order.createdAt).toLocaleString("default", {
      month: "short",
    });
    const existing = acc.find((item) => item.name === month);
    const orderTotal = Number(order.totalAmount);
    if (existing) {
      existing.uv += orderTotal;
    } else {
      acc.push({ name: month, uv: orderTotal });
    }
    return acc;
  }, []);

  return (
    <div className="h-[100vh] overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white p-5 text-2xl font-bold text-gray-900 shadow-sm">
        <h3>Info Graphics</h3>
      </div>

      {/* Main Content */}
      <div className="bg-white mt-5 rounded-xl p-5 mx-10 shadow">
        {/* Bar Chart */}
        <h4 className="text-lg font-semibold text-gray-800">Bar Chart</h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="uv" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white mt-5 rounded-xl p-5 mx-10 shadow">
        {/* Pie Chart */}
        <h4 className="text-lg font-semibold text-gray-800">Pie Chart</h4>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white mt-5 rounded-xl p-5 mx-10 shadow">
        {/* Line Chart */}
        <h4 className="text-lg font-semibold text-gray-800">Line Chart</h4>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VisualsPage;
