import { Plant } from "@/types/Plant";

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  // For AI messages that contain plant data
  introMarkdown?: string;
  jsonPlants?: Plant[];
  summaryMarkdown?: string;
  status?: string;
}
export const ChatAi = async ({
  userPrompt,
  conversations,
}: {
  userPrompt: string;
  conversations: Message;
}) => {
  try {
    const response = await fetch(`http://localhost:8000/ai-deepseek2/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        new_message: userPrompt,
        conversation: conversations,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
