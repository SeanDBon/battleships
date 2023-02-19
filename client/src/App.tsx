import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import GameBoard from "./components/GameBoard"
import * as io from "socket.io-client"

const socket = io.connect("http://localhost:4000")
function App() {
  return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home socket={socket}/>}/>
            <Route path="/game" element={<GameBoard socket={socket}/>}/>
          </Routes>
        </div>
      </BrowserRouter>

  )
}

export default App
