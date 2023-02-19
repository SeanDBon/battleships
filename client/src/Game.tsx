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
            <div className="gameContainer"><GameBoardBetter/></div>
            <div className="rightbar"><GameBoatBar/></div>
        </div>
    )
}

export default Game
