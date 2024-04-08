import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY
});

async function gpt(query: string) {
  const completion = await openai.chat.completions.create({
    messages: [
        { role: "system", content: "Summarize the following conversation" }, 
        { role: "user", content: query }
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0]
}

export default { gpt }