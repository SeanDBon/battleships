import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import GameBoatBar from './components/GameBoatBar'
import GameHeader from './components/GameHeader'
import GameSettings from './components/GameSettings'
import './Game.css'
import GameBoardBetter from './components/GameBoardBetter'

const Game = ({socket}: any) => {
    return (
        
        <div className="wrapper">
            <div className="headerLeft"><GameHeader/></div>
            <div className="headerRight"><GameSettings/></div>
            <DndProvider backend={HTML5Backend}>
                <div className="gameContainer"><GameBoardBetter/></div>
                <div className="rightbar"><GameBoatBar/></div>
            </DndProvider>
        </div>
        
    )
}

export default Game