import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"

interface Props {
    socket: any
}

const Home = ({socket}: Props) => {
    const navigate = useNavigate()
    const [roomId, setRoomId] = useState("")
    const [username, setUsername] = useState("")
    const [roomName, setRoomName] = useState("")
    const [roomList, setRoomList] = useState<any[]>([])
    const [isSpectating, setSpectating] = useState(false)
    const [hasClickedNext, setHasClickedNext] = useState(false)
    const [hasClickedJoinGame, setHasClickedJoinGame] = useState(false)
    const [hasClickedCreateGame, setHasClickedCreateGame] = useState(false)

    useEffect(() => {
        fetchRoomList();
    },[])

    const fetchRoomList = async () => {
        const response = await fetch("http://localhost:4000/roomlist")
        const roomList = await response.json()
        setRoomId(roomList[0].id)
        setRoomList(roomList)
    }

    const toggleSpectating = () => {
        setSpectating(!isSpectating)
    }

    const handleSubmit = () => {
        let newUser = {username, roomId, roomName, isSpectating}
        socket.emit("start", newUser)
        navigate("/game")
    }

    return (
        <div className='home__container'>
            <h2 className='home__header'>Sign in to Battleships</h2>

            
            <label htmlFor="username">Username</label>
            <input type="text"
                minLength={4}
                name="username"
                id='username'
                className='home__input'
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={hasClickedNext}
            />

            {
            !hasClickedNext || hasClickedCreateGame || hasClickedJoinGame
            ? (<></>) 
            : (<div className='room_container'>
                    <button className='home__room_button' onClick={() => {setHasClickedCreateGame(true)}}>CREATE GAME</button>
                    <button className='home__room_button' disabled={roomList.length === 0} title={roomList.length === 0 ? "No existing room": ""} onClick={() => {setHasClickedJoinGame(true)}}>JOIN GAME</button>
                </div>)
            }

            {
            hasClickedNext && hasClickedCreateGame
            ? (<>
                <label htmlFor="roomName">Room Name</label>
                <input type="text"
                    minLength={4}
                    name="roomName"
                    id='roomName'
                    className='home__input'
                    value={roomName}
                    onChange={e => setRoomName(e.target.value)}
                /></>)
            : (<></>)
            }

            {
            hasClickedNext && hasClickedJoinGame
            ? (<>
                <select className='dropdown' onChange={(e) => {setRoomId(e.target.value)}}>
                    {roomList.map( room => (
                        <option className='dropdown__option' value={room.id}>{room.name}</option>
                    ))}
                </select>
                <label>
                    Spectating
                    <input type='checkbox'
                        className='home__checkbox'
                        defaultChecked={isSpectating}
                        onClick={toggleSpectating}
                    />
                </label>
                </>)
            : (<></>)
            }

            {
            !hasClickedNext 
            ? (<button className='home__button' disabled={!username} onClick={() => {setHasClickedNext(true)}}>NEXT</button>) 
            : hasClickedNext && !hasClickedCreateGame && !hasClickedJoinGame ? (<></>) : (<button className='home__button' disabled={!roomId && !roomName} onClick={handleSubmit}>PLAY</button>)
            }
        </div>
    )
}

export default Home
