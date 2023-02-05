import React, { useEffect, useState, useRef} from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

interface Props {
    socket: any
}

const ChatPage = ({socket}: Props) => {
    const [messages, setMessages] = useState<any[]>([])
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef<null | HTMLDivElement>(null)

    useEffect(()=> {
        socket.on("roomUserList", (data: any) => console.log(data))
    }, [socket, messages])

    useEffect(()=> {
        socket.on("errorJoining", (data: any) => console.log(data))
    }, [socket])

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    return (
        <div className="chat">
            <ChatBar socket={socket}/>
            <div className='chat__main'>
                <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
                <ChatFooter socket={socket}/>
            </div>
        </div>
    )
}

export default ChatPage
