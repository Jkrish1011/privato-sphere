import EmojiPicker from 'emoji-picker-react';
import { useState, useRef, useEffect } from 'react';
import { GrAttachment } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerLine } from 'react-icons/ri';

const MessageBar = () => {
  const emojiRef = useRef();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if(emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  }

  const handleSendMessage = async () => {

  }

  return (
    <div className="h-[10vh] bg-[#1C1D25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2A2B33] rounded-md items-center gap-5 pr-5">
        <input type="text" className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus: outline-none" placeholder="Enter Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className='text-neutral-500 focus:border-none focus:text-white duration-300 transition-all'>
          <GrAttachment className='text-2xl' />
        </button>
        <div className="relative">
        <button className='text-neutral-500 focus:border-none focus:text-white duration-300 transition-all' onClick={()=> setEmojiPickerOpen(true)}>
          <RiEmojiStickerLine className='text-2xl' />
        </button>
        <div className='absolute bottom-16 right-0' ref={emojiRef}>
          <EmojiPicker theme='dark' open={emojiPickerOpen} onEmojiClick={handleAddEmoji} autoFocusSearch={false} />
        </div>
      </div>
    </div>
    <button className='bg-[#8417FF] rounded-md flex items-center justify-center p-5 hover:bg-[#741BDA] focus:bg-[#741BDA] focus:border-none focus:text-white duration-300 transition-all' onClick={handleSendMessage}>
      <IoSend className='text-2xl' />
    </button>
    </div>
  )
}

export default MessageBar