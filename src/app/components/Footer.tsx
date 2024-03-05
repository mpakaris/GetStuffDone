import {
  FaCalendarAlt,
  FaChartBar,
  FaHome,
  FaMicrophone,
  FaStop,
  FaUser,
} from "react-icons/fa";

const Footer = ({
  onMicClick,
  isRecording,
  switchScreen,
}: {
  onMicClick: any;
  isRecording: any;
  switchScreen: any;
}) => {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gray-500 shadow-lg">
      <div className="flex justify-around items-center pb-5 pt-3">
        <button className="rounded-full p-4 bg-stone-200">
          <FaHome className="text-xl" onClick={() => switchScreen("home")} />
        </button>
        <button
          className="rounded-full p-4 bg-stone-200"
          onClick={() => switchScreen("calendar")}
        >
          <FaCalendarAlt className="text-xl" />
        </button>
        <button className="rounded-full p-4 bg-stone-200" onClick={onMicClick}>
          {isRecording ? (
            <FaStop className="text-red-800 text-xl" />
          ) : (
            <FaMicrophone className="text-black text-2xl" />
          )}
        </button>
        <button
          className="rounded-full p-4 bg-stone-200"
          onClick={() => switchScreen("statistics")}
        >
          <FaChartBar className="text-xl" />
        </button>
        <button className="rounded-full p-4 bg-stone-200">
          <FaUser className="text-xl" onClick={() => switchScreen("profile")} />
        </button>
      </div>
    </div>
  );
};

export default Footer;
