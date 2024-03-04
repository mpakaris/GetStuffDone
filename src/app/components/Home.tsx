import { useLottie } from "lottie-react";
import { useEffect, useState } from "react";
import CelebrationAnimation from "../../../public/images/CelebrationAnimation.json";
import WelcomeMsg from "./WelcomeMsg";

const Home = ({
  userEntries,
  isAuthenticated,
}: {
  userEntries: any;
  isAuthenticated: boolean;
}) => {
  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
    }, 1000);
  });

  const options = {
    animationData: CelebrationAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  const countAccomplishments = () => {
    let counter = 0;
    if (userEntries) {
      userEntries.forEach((entry: any) => {
        counter += entry.structuredResults ? entry.structuredResults.length : 0;
      });
    }
    return counter;
  };
  return (
    <>
      <div className="relative flex flex-col items-center justify-center h-full overflow-auto bg-stone-200">
        {/* Current Entries */}
        {isAuthenticated && (
          <div
            className="max-w-sm rounded-xl shadow-lg mb-2
          bg-white mx-auto p-3 border border-gray-800 w-full"
          >
            <p className="font-bold text-lg text-gray-700">
              Current Entries: {userEntries?.length || 0}
            </p>
          </div>
        )}

        {/* Accomplished Tasks Overall */}

        {isAuthenticated && (
          <div
            className="max-w-sm rounded-xl shadow-lg 
          bg-white mb-5 mx-auto p-3 border border-gray-800 w-full"
          >
            <p className="font-bold text-lg text-gray-700">
              Tasks Accomplished: {countAccomplishments()}
            </p>
          </div>
        )}

        {/* How this works */}
        <WelcomeMsg isAuthenticated={isAuthenticated} />
      </div>
      {/* Celebration Animation */}
      {isAuthenticated && animation && (
        <div className="absolute inset-0 z-50">{View}</div>
      )}{" "}
    </>
  );
};

export default Home;
