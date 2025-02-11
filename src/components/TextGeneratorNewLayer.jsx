"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState } from "react";
import axiosInstance from '../API/axios-config';

const TextGeneratorNewLayer = () => {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    
    try {
      const response = await axiosInstance.post("/api/Questions/AskQuestion", { Content: input });
      const aiMessage = { sender: "ai", text: response.data.aiResponse };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response", error);
    }
  };

  const resetMessageForNewChat = () => {
    setMessages('');
  };
  
  return (
    <div className='row gy-4 flex-wrap-reverse'>
      <div className='col-xxl-3 col-lg-4'>
        <div className='card h-100 p-0'>
          <div className='card-body p-0'>
            <div className='p-24'>
              <button onClick={resetMessageForNewChat} className='btn btn-primary text-sm btn-sm px-12 py-12 w-100 radius-8 d-flex align-items-center justify-content-center gap-2'>
                <i className='ri-messenger-line' />
                New Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='col-xxl-9 col-lg-8'>
        <div className='chat-main card overflow-hidden'>
          <div className='chat-sidebar-single gap-8 justify-content-between cursor-default flex-nowrap'>
            <div className='d-flex align-items-center gap-16'>
              <Link href='/text-generator-new' className='text-primary-light text-2xl line-height-1'>
                <i className='ri-arrow-left-line' />
              </Link>
              <h6 className='text-lg mb-0 text-line-1'>New Chat</h6>
            </div>
          </div>

          <div className='chat-message-list max-h-612-px min-h-612-px position-relative'>
            {messages.length === 0 ? (
              <div className='d-flex align-items-center justify-content-center flex-column h-100 position-absolute top-50 start-50 translate-middle'>
                <img src='assets/images/chatgpt/empty-message-icon1.png' alt='' />
                <span className='text-secondary-light text-md mt-16'>Type New Message</span>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`d-flex align-items-start gap-16 border-bottom border-neutral-200 pb-16 mb-16 ${msg.sender === "user" ? "justify-content-end" : ""}`}>
                  <div className='img overflow-hidden flex-shrink-0'>
                    <img src={msg.sender === "user" ? "assets/images/chat/1.png" : "assets/images/wow-dash-favicon.png"} alt='avatar' className='w-44-px h-44-px rounded-circle object-fit-cover' />
                  </div>
                  <div className='info flex-grow-1'>
                    <h6 className='text-lg mb-4'>{msg.sender === "user" ? "You" : "JTM Assistant"}</h6>
                    <p className='mb-0 text-secondary-light text-sm'>{msg.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <form className='chat-message-box' onSubmit={sendMessage}>
            <input type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Message Church AI...' />
            <button type='submit' className='w-44-px h-44-px d-flex justify-content-center align-items-center radius-8 bg-primary-600 text-white bg-hover-primary-700 text-xl'>
              <Icon icon='f7:paperplane' />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TextGeneratorNewLayer;
