import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { FaBriefcase, FaDumbbell, FaHome } from "react-icons/fa";
import { FiActivity, FiAirplay, FiAlertCircle } from "react-icons/fi";
import { MdEmail, MdFavorite, MdPhone } from "react-icons/md";
import { toast } from "react-toastify";

// Register the components we will use from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = ({ userEntries }: { userEntries: any }) => {
  const icons = [
    { name: "Work", icon: <FaBriefcase /> },
    { name: "Home", icon: <FaHome /> },
    { name: "Fitness", icon: <FaDumbbell /> },
    { name: "Spirituality", icon: <FiActivity /> },
    { name: "Education", icon: <MdEmail /> },
    { name: "Social", icon: <MdPhone /> },
    { name: "Creative", icon: <FiAirplay /> },
    { name: "Health", icon: <FaDumbbell /> },
    { name: "Community", icon: <FiAlertCircle /> },
    { name: "Finance", icon: <FiActivity /> },
    { name: "Leisure", icon: <FaBriefcase /> },
    { name: "Development", icon: <FaHome /> },
    { name: "Travel", icon: <FaDumbbell /> },
    { name: "Nutrition", icon: <FiActivity /> },
    { name: "Pets", icon: <MdEmail /> },
    { name: "Environment", icon: <MdPhone /> },
    { name: "Relax", icon: <FiAirplay /> },
    { name: "Hobbies", icon: <MdFavorite /> },
  ];

  // Inside your component
  const data = useMemo(() => {
    // Your logic to construct the 'data' object goes here.
    // This is just a placeholder; replace it with your actual data construction logic.
    if (userEntries) {
      return {
        labels: userEntries.map((entry: any) => entry.id),
        datasets: [
          {
            label: "Tasks Completed",
            data: userEntries.map(
              (entry: any) => entry.structuredResults.length
            ),
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      };
    }
  }, [userEntries]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      display: false,
    },
    elements: {
      line: {
        tension: 0.2,
      },
    },
  };

  const handleClick = () => {
    toast(`Not implemented yet. \nFunction coming soon.`);
  };

  return (
    <>
      {userEntries ? (
        <div className="flex flex-col justify-start items-center bg-stone-200 h-full max-h-[90vh] p-6">
          <div className="grid grid-cols-5 gap-2 justify-center items-start">
            {icons.map((category) => (
              <div key={category.name} className="mt-5 text-center">
                <button
                  className="rounded-full p-4 bg-white shadow"
                  onClick={handleClick}
                >
                  {category.icon}
                </button>
                <p className="mt-2 text-xs text-center">{category.name}</p>
              </div>
            ))}
          </div>
          <div className="bg-white p-4 mx-3 rounded-lg shadow-lg mt-10 max-w-md w-full">
            <Line data={data} options={options} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center bg-stone-200 min-h-screen p-6">
          <div className="bg-white p-4 mx-3 rounded-lg shadow-lg mt-10 max-w-md w-full">
            <p className="text-red-800 font-semibold text-base mb-3 text-center">
              Currently No Data available.{" "}
            </p>
            <p className="font-semibold text-center text-sm">
              Make a few entries over the next days and come back to see the
              statistics of your achievements.
            </p>
            <p className="font-bold mt-5 text-base text-center text-teal-600">
              Now is the Time to
              <br />
              Stop Looking at ToDos and
              <br />
              Start Getting S*** Done.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Statistics;
