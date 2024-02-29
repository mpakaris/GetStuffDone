import { FaSpa } from "react-icons/fa";

const ActivityCard = ({
  activity,
  category,
  duration,
}: {
  activity: string;
  category: string;
  duration: string;
}) => {
  return (
    <div className="relative max-w-sm mb-2 rounded overflow-hidden shadow-lg bg-white w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="absolute top-3 right-2 p-2">
        <FaSpa className="text-gray-500 text-xl" />
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-700">{activity}</div>
        <p className="text-gray-700 text-base">
          <strong>Category:</strong> {category}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Duration:</strong> {duration} minutes
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
