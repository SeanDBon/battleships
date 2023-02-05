import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import ChatPage from "./components/ChatPage"
import * as io from "socket.io-client"

const socket = io.connect("http://192.168.1.91:4000")
function App() {
  return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home socket={socket}/>}/>
            <Route path="/chat" element={<ChatPage socket={socket}/>}/>
          </Routes>
        </div>
      </BrowserRouter>

  )
}

export default App
