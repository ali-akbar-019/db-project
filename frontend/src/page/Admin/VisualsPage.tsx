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

const dataBar = [
  { name: "Jan", uv: 4000, pv: 2400 },
  { name: "Feb", uv: 3000, pv: 1398 },
  { name: "Mar", uv: 2000, pv: 9800 },
  { name: "Apr", uv: 2780, pv: 3908 },
];

const dataPie = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const dataLine = [
  { name: "Jan", uv: 400, pv: 2400 },
  { name: "Feb", uv: 300, pv: 1398 },
  { name: "Mar", uv: 200, pv: 9800 },
  { name: "Apr", uv: 278, pv: 3908 },
];

const VisualsPage = () => {
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
          <BarChart data={dataBar}>
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
              data={dataPie}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {dataPie.map((entry, index) => (
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
          <LineChart data={dataLine}>
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
