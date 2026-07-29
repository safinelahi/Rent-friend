import React, { useState, useEffect } from 'react';
import { FiSend, FiUser, FiZap, FiMoreHorizontal, FiPaperclip } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SignalHub = () => {
  // State for storing active messages and current chat
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  /* 
    BACKEND SYNC: 
    Fetch conversation history from the database.
    API Endpoint Proposal: GET /api/messages/:bookingId
    Integration: Real-time sync using Socket.io is recommended.
  */
  useEffect(() => {
    // Logic to load chat history will be placed here
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    /* 
      BACKEND SYNC: 
      Post new message to the server.
      API Endpoint Proposal: POST /api/messages/send
      Body: { bookingId, text, senderId }
    */
    console.log("Sending message:", inputText);
    setInputText("");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-10 px-6 md:px-12 lg:px-16 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto h-[75vh] flex flex-col md:flex-row bg-white border border-gray-100 rounded-[48px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.03)]">
        
        {/* --- CONVERSATION LIST (SIDEBAR) --- */}
        <aside className="w-full md:w-80 lg:w-96 border-r border-gray-50 flex flex-col bg-[#FDFDFC]/50">
          <div className="p-8 border-b border-gray-50">
            <h3 className="text-xl font-black uppercase tracking-tighter italic">Signal Hub</h3>
            <p className="text-[9px] font-bold text-paragraph/30 uppercase tracking-[0.3em] mt-2 text-accent">Active Transmissions</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Active chat item example */}
            <div className="p-6 bg-white border border-gray-100 rounded-[32px] cursor-pointer hover:border-accent transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-[14px] flex items-center justify-center">
                  <FiUser className="text-accent" />
                </div>
                <div>
                  <h5 className="text-[11px] font-black uppercase tracking-widest text-txt">Safin Elahi</h5>
                  <p className="text-[9px] font-bold text-paragraph/40 uppercase tracking-widest">Ongoing: DSLR Kit</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* --- MAIN CHAT INTERFACE --- */}
        <main className="flex-1 flex flex-col relative">
          {/* Chat Header */}
          <header className="p-8 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em]">Transmission: Safin Elahi</h4>
            </div>
            <button className="text-paragraph/20 hover:text-accent transition-colors">
              <FiMoreHorizontal size={20} />
            </button>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {/* Incoming Message Example */}
            <div className="flex flex-col items-start max-w-[80%]">
              <div className="p-6 bg-secondary/30 rounded-t-[24px] rounded-br-[24px] text-xs font-medium leading-relaxed">
                Is the equipment available for pickup at Dhanmondi?
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-paragraph/20 mt-2 ml-2">10:42 AM</span>
            </div>

            {/* Outgoing Message Example */}
            <div className="flex flex-col items-end ml-auto max-w-[80%]">
              <div className="p-6 bg-[#111] text-white rounded-t-[24px] rounded-bl-[24px] text-xs font-medium leading-relaxed">
                Yes, it's ready. Please bring your NID for verification.
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-paragraph/20 mt-2 mr-2">10:45 AM</span>
            </div>
          </div>

          {/* Message Input - Studio Style */}
          <form onSubmit={sendMessage} className="p-8 border-t border-gray-50 bg-white">
            <div className="relative">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your signal..."
                className="w-full h-16 bg-[#FDFDFC] border border-gray-100 rounded-[24px] px-8 pr-32 outline-none focus:border-accent transition-all text-xs font-bold"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button type="button" className="p-3 text-paragraph/20 hover:text-accent">
                   <FiPaperclip size={18} />
                </button>
                <button type="submit" className="bg-[#111] text-white px-6 py-3 rounded-[16px] text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-accent hover:text-[#111] transition-all">
                  Send <FiSend />
                </button>
              </div>
            </div>
          </form>
        </main>

      </div>
    </div>
  );
};

export default SignalHub;