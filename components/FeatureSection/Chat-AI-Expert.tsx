const Chat_Ai_Export = () => {
  return (
    <div className=" w-[500px] bg-white rounded-[20px] shadow-2xl p-6">
      <div className="flex flex-col gap-4">
        {/* Chat messages */}
        <div className="self-end max-w-[80%]">
          <p className="text-white bg-[#2E7D32] p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl shadow-sm">
            How often should I water my Monstera?
          </p>
        </div>

        {/* AI message */}

        <div className="max-w-[80%]">
          <p className="text-black bg-[#F3F4F6] p-3 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl shadow-sm">
            For a Monstera Deliciosa, water when the top 2-3 inches of soil
            feels dry. Typically this means watering every 1-2 weeks, but it
            depends on your environment. Make sure the pot has good drainage!
          </p>
        </div>

        <div className="self-end max-w-[80%]">
          <p className="text-white bg-[#2E7D32] p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl shadow-sm">
            What about light requirements?
          </p>
        </div>
        <div className="max-w-[80%]">
          <p className="text-black bg-[#F3F4F6] p-3 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl shadow-sm">
            Monsteras thrive in bright, indirect light. They can tolerate some
            direct morning sun, but avoid harsh afternoon sunlight as it can
            burn the leaves. A few feet away from a bright window is ideal.
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ask about plant care"
            className="w-[100%]  border border-gray-300 rounded-[10px] p-2  "
          />
          <button className="bg-green-700 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat_Ai_Export;
