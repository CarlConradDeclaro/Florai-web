import { Plant } from "@/types/Plant";
import { error } from "console";

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;

  introMarkdown?: string;
  jsonPlants?: Plant[];
  summaryMarkdown?: string;
  status?: string;
}

export async function get_ai_chat_response(
  userPrompt: string,
  conversations: Message[]
) {
  const res = await fetch(`http://localhost:8000/ai-deepseek2_json/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      new_message: userPrompt,
      conversation: conversations,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ai reponse");
  }

  return res;
}
