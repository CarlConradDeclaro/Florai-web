"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "next/navigation";

interface Plant {
  common_name: string;
  description: string;
  url: string;
}

const StreamAI: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [introMarkdown, setIntroMarkdown] = useState("");
  const [summaryMarkdown, setSummaryMarkdown] = useState("");
  const [jsonPlants, setJsonPlants] = useState<Plant[]>([]);
  const [status, setStatus] = useState("idle");

  const [isParsingJson, setIsParsingJson] = useState(false);
  const [hasParsedJson, setHasParsedJson] = useState(false);

  useEffect(() => {
    const fetchStream = async () => {
      if (!query) return;

      setIntroMarkdown("");
      setSummaryMarkdown("");
      setJsonPlants([]);
      setStatus("processing...");
      setIsParsingJson(false);
      setHasParsedJson(false);

      try {
        const res = await fetch(
          `http://localhost:8000/ai-deepseek2/?q=${encodeURIComponent(query)}`
        );

        if (!res.ok) {
          setStatus("Error fetching response ❌");
          return;
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder("utf-8");

        let buffer = "";
        let jsonStarted = false;
        let jsonCompleted = false;
        let jsonBlock = "";

        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          if (!jsonStarted) {
            const jsonStartIdx = buffer.indexOf("```json");
            if (jsonStartIdx !== -1) {
              // Stream intro before JSON
              const intro = buffer.slice(0, jsonStartIdx);
              setIntroMarkdown((prev) => prev + intro);
              buffer = buffer.slice(jsonStartIdx);
              jsonStarted = true;
              setIsParsingJson(true);
            } else {
              // Stream intro normally
              setIntroMarkdown((prev) => prev + chunk);
              buffer = ""; // since we processed it all
            }
          }

          if (jsonStarted && !jsonCompleted) {
            const jsonEndIdx = buffer.indexOf("```", 8); // end of ```json block
            if (jsonEndIdx !== -1) {
              jsonBlock = buffer.slice(7, jsonEndIdx); // exclude ```json
              buffer = buffer.slice(jsonEndIdx + 3); // rest is summary
              jsonCompleted = true;
              setIsParsingJson(false);
              setHasParsedJson(true);

              try {
                const parsed: Plant[] = JSON.parse(jsonBlock.trim());
                setJsonPlants(parsed);
              } catch (err) {
                console.error("Error parsing JSON:", err);
              }

              // Start streaming summary
              setSummaryMarkdown(buffer);
              buffer = "";
            }
          }

          if (jsonCompleted && buffer) {
            setSummaryMarkdown((prev) => prev + buffer);
            buffer = "";
          }
        }

        setStatus("done ✅");
      } catch (error) {
        console.error("Stream error:", error);
        setStatus("error ❌");
      }
    };

    fetchStream();
  }, [query]);

  return (
    <div className="p-4 overflow-y-auto h-full">
      <div className="text-sm text-gray-500 italic mb-4">{status}</div>

      {/* Intro streaming */}
      {introMarkdown && (
        <div className="prose prose-sm max-w-none text-gray-800 mb-4">
          <ReactMarkdown>{introMarkdown}</ReactMarkdown>
        </div>
      )}

      {/* Loading placeholder */}
      {isParsingJson && (
        <div className="text-gray-400 italic">
          Finding the best plants for you...
        </div>
      )}

      {/* Cards */}
      {jsonPlants.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
          {jsonPlants.map((plant, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-4 border border-gray-100"
            >
              <img
                src={plant.url}
                alt={plant.common_name}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <h3 className="text-lg font-semibold text-green-700">
                {plant.common_name}
              </h3>
              <p className="text-sm text-gray-600">{plant.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Summary streaming */}
      {hasParsedJson && summaryMarkdown && (
        <div className="prose prose-sm max-w-none text-gray-800">
          <ReactMarkdown>{summaryMarkdown}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default StreamAI;
