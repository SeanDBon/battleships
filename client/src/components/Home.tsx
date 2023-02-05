import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"

interface Props {
    socket: any
}

const Home = ({socket}: Props) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [room, setRoom] = useState("")
    const [isSpectating, setSpectating] = useState(false)

    const toggleSpectating = () => {
        setSpectating(!isSpectating)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        localStorage.setItem("userName", userName)
        localStorage.setItem("room", room)
        socket.emit("joinRoom", {userName, room, isSpectating, socketID: socket.id})
        navigate("/chat")
    }
    return (
        <form className='home__container' onSubmit={handleSubmit}>
            <h2 className='home__header'>Sign in to Battleships</h2>
            <label htmlFor="username">Username</label>
            <input type="text"
                   minLength={4}
                   name="username"
                   id='username'
                   className='home__input'
                   value={userName}
                   onChange={e => setUserName(e.target.value)}
            />
            <label htmlFor="room">Room</label>
            <input type="text"
                   minLength={2}
                   name="room"
                   id='room'
                   className='home__input'
                   value={room}
                   onChange={e => setRoom(e.target.value)}
            />
            <label>
                Spectating
                <input type='checkbox'
                       className='home__checkbox'
                       defaultChecked={isSpectating}
                       onClick={toggleSpectating}
                />
            </label>
            <button className='home__cta'>SIGN IN</button>
        </form>
    )
}

export default Home
