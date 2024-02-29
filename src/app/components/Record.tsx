"use client";
import { useLottie } from "lottie-react";
import RecordingAnimation from "../../../public/images/RecordingAnimation.json";

const Record = ({
  isRecording,
  recording,
  sendToLLM,
  aiResults,
  saveEntryInDB,
  isSaved,
  screen,
}: {
  isRecording: boolean;
  recording: any;
  sendToLLM: any;
  aiResults: any;
  saveEntryInDB: any;
  isSaved: boolean;
  screen: string;
}) => {
  const options = {
    animationData: RecordingAnimation,
    loop: true,
  };
  const { View } = useLottie(options);

  function transcriptDisplay() {
    const combinedTranscript = recording
      .map((item: any) => item.transcript)
      .join(" ");
    return `"` + combinedTranscript + `"`;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-stone-200 px-5">
      {screen === "transcript" && (
        <div className="bg-white shadow-lg rounded-lg py-4 px-5 w-full max-w-md">
          <h5 className="text-lg font-bold text-gray-800 mb-4">
            Your Transcript:{" "}
          </h5>
          <p className="text-sm font-semibold mb-10">{transcriptDisplay()}</p>
          <div className="card-footer flex justify-between space-x-4 mb-5">
            <button className="rounded-lg py-2 px-4 bg-red-800 text-white">
              DELETE ALL
            </button>
            <button
              onClick={sendToLLM}
              className="rounded-lg py-2 px-4 bg-teal-800 text-white
            "
            >
              SEND TO AI
            </button>
          </div>
          <p className="text-sm font-semibold  text-gray-600 mb-5">
            <strong>Why use AI?</strong> <br />
            We will use AI to structure your transcript into achievements.
          </p>
          <p className="text-sm font-semibold  text-gray-600">
            <strong>Did you know?</strong> <br />
            You may continue recording by pressing the Mic button again!
          </p>
        </div>
      )}

      {screen === "aiResult" && (
        <div className="bg-white shadow-lg rounded-lg px-4 pt-6 pb-4 w-full max-w-md">
          <h5 className="text-xl text-teal-600 font-semibold my-3">
            Your Achievements Today:
          </h5>
          <ul className="list-decimal list-inside mb-2">
            {aiResults &&
              aiResults.map((entry: any, index: any) => (
                <li key={index} className="text-gray-600 text-base">
                  <strong>{entry.activity}</strong> | {entry.duration || 30}{" "}
                  min.
                </li>
              ))}
          </ul>
          {!isSaved && (
            <div className="card-footer flex justify-between space-x-4 my-5">
              <button className="rounded-lg py-2 px-4 bg-red-800 text-white">
                DELETE
              </button>
              <button
                onClick={saveEntryInDB}
                className="rounded-lg py-2 px-4 bg-teal-800 text-white
            "
              >
                SAVE
              </button>
            </div>
          )}
          <p className="text-sm font-semibold  text-gray-600">
            <strong>Did you know?</strong> <br />
            You may continue recording by pressing the Mic button again!
          </p>
        </div>
      )}

      {screen === "noEntry" && (
        <div className="bg-white shadow-lg rounded-lg px-4 pt-6 pb-4 w-full max-w-md">
          <h5 className="text-lg font-bold text-teal-800 mb-4 text-center">
            Make a Recording for Today{" "}
          </h5>
          <p className="text-sm font-semibold  text-gray-600">
            <strong>Did you know?</strong> <br />
            <br />
            You may start recording by pressing the Mic button! <br />
            <br />
            Just talk naturally about your day and your achievements.
          </p>
          <p className="text-sm font-semibold  text-gray-600">
            <br />
            <strong>What</strong> did you do today?
          </p>
          <p className="text-sm font-semibold  text-gray-600">
            <strong>How</strong> long did it take?
          </p>
          <p className="text-sm font-semibold  text-gray-600">
            <strong>How</strong> did it affect you?
          </p>
        </div>
      )}

      {/* Recording Animation when Microphone is On */}
      {isRecording && (
        <div className="p-20 relative">
          <p className="text-center font-bold text-3xl text-red-800 animate-bounce mb-3">
            REC
          </p>
          <div>{View}</div>
        </div>
      )}
    </div>
  );
};

export default Record;
