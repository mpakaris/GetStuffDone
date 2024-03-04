import axios from "axios";

export const fetchOpenAIResponse = async (context) => {
  const functionsUrl =
    "http://127.0.0.1:5001/getstuffdone-80541/us-central1/openAICompletion";
  const model = "gpt-3.5-turbo";

  try {
    const response = await axios.post(
      functionsUrl,
      {
        context: context,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};
