import GameBoard from './components/GameBoard'
import GameBoatBar from './components/GameBoatBar'
import GameHeader from './components/GameHeader'
import GameSettings from './components/GameSettings'
import './Game.css'

const Game = ({socket}: any) => {
    return (
        <div className="wrapper">
            <div className="headerLeft"><GameHeader/></div>
            <div className="headerRight"><GameSettings/></div>
            <div className="gameContainer"><GameBoard/></div>
            <div className="rightbar"><GameBoatBar/></div>
        </div>
    )
}

export default Game
