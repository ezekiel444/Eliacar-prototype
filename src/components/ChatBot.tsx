import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize, Maximize } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I\'m your virtual assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Thanks for your message! A sales representative will reach out to you shortly.",
        "I'd be happy to help you find the perfect vehicle. Would you prefer to buy or rent?",
        "Great question! Our inventory is updated daily. Would you like me to check for specific models?",
        "We offer financing options with competitive rates. Would you like more information?",
        "We have a wide range of luxury and economy vehicles available. What's your budget range?",
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed z-50 bottom-20 right-4 p-4 rounded-full shadow-lg transition-colors duration-200 ${
          isOpen ? 'bg-red-600 text-white' : 'bg-white text-red-500'
        }`}
        aria-label="Chat with us"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed z-40 bottom-20 right-4 sm:right-6 w-full sm:w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 transform translate-y-0'
            : 'opacity-0 transform translate-y-8 pointer-events-none'
        } ${isMinimized ? 'h-14' : 'h-[480px] max-h-[calc(100vh-200px)]'}`}
      >
        {/* Chat Header */}
        <div className="bg-slate-800 text-white px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <MessageSquare size={18} className="mr-2" />
            <h3 className="font-medium">Chat with us</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMinimize}
              className="text-gray-200 hover:text-white transition-colors"
              aria-label={isMinimized ? 'Maximize' : 'Minimize'}
            >
              {isMinimized ? <Maximize size={16} /> : <Minimize size={16} />}
            </button>
            <button
              onClick={toggleChat}
              className="text-gray-200 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        {!isMinimized && (
          <div className="flex flex-col h-[calc(100%-112px)]">
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-3 max-w-[80%] ${
                    msg.sender === 'user' ? 'ml-auto' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 inline-block ${
                      msg.sender === 'user'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div
                    className={`text-xs text-gray-500 mt-1 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={sendMessage} className="border-t p-3">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-r-md transition-colors duration-200"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBot;