import { useEffect, useState } from "react";

const MyTest = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [language, setLanguage] = useState<string>("en-US");
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.lang = language;

    recognitionInstance.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(
        (prevTranscript) => prevTranscript + " " + currentTranscript
      );
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };

    setRecognition(recognitionInstance);

    // Cleanup function to stop recognition when component unmounts
    return () => {
      recognitionInstance.stop();
    };
  }, [language]); // Re-initialize recognition when language changes

  const toggleListening = () => {
    if (!isListening) {
      recognition.start();
      setIsListening(true);
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Function to handle language change
  const handleLanguageChange = (event: any) => {
    if (isListening) {
      recognition.stop();
    }
    setLanguage(event.target.value);
    setTranscript("");
    setIsListening(false);
  };

  return (
    <div>
      <select
        value={language}
        onChange={handleLanguageChange}
        className="mb-4 px-4 py-2 border rounded-lg"
      >
        <option value="en-US">English - US</option>
        <option value="de-DE">German - DE</option>
        <option value="hu-HU">Hungarian - HU</option>
      </select>
      <button
        onClick={toggleListening}
        className="px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-400 w-full"
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p className="my-10">Transcript: {transcript}</p>
      <button
        onClick={() => setTranscript("")}
        className="px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-400 w-full"
      >
        Clear Transcript
      </button>
    </div>
  );
};

export default MyTest;
