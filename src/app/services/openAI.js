import axios from "axios";

export const fetchOpenAIResponse = async (context) => {
  console.log(context);
  const finalPrompt = `
   Reference: ${context}
   ===
   Focus on finding Personal Goals and Achievements in the Reference. 
   Analyse and return the reference data appended in a structured way. 
   We want to use your generated response in our Software program. 
   Categorize the activities in the following categories and a rough duration. 
   If no duration is given in the context, assume a realistic time that task may have taken. 
   
   Categories: 
   Secular Work
   House work & Home Maintenance
   Health & Fitness
   Spirituality & Mindfulness
   Education & Learning
   Social & Family Life
   Creative Projects
   Personal Care & Well-being
   Volunteering & Community Service
   Financial Management
   Entertainment & Leisure
   Professional Development
   Travel & Exploration
   Cooking & Nutrition
   Pet Care
   Environmental Sustainability
   Leisure & Relaxation
   Hobbies & Creative Projects
   
   Answer direct. Do not explain. Do not make any data up. Only use the referenced information.
   Return an Array of JSON Objects with the following structure / key-value pairs: 
   Make sure that the keys are also in quotatin marks, otherwise we throw an Error! 

   If you cant extract any information from the context, do not make anything up! 
   It is very important not to invent any data. Just return an empty Array: []
   
   Here is an example: 
   [{
    "activity": Summary of what the User did,
    "category": See Categories,
    "duration": in minutes,
    "desc": any remarks if the context provides for example: It made him happy, anxious or similar otherwise it should remain ""
   }, 
   {
    "activity": Summary of what the User did,
    "category": See Categories,
    "duration": in minutes,
    "desc": any remarks if the context provides for example: It made him happy, anxious or similar otherwise it should remain ""
   }],
  `;

  const openAiApiUrl = "https://api.openai.com/v1/chat/completions";
  const model = "gpt-3.5-turbo";
  try {
    const response = await axios.post(
      openAiApiUrl,
      {
        model: model,
        messages: [
          {
            role: "user",
            content: finalPrompt,
          },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer sk-`,
        },
      }
    );
    return response.data.choices[0];
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};
