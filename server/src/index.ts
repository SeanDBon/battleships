const express = require("express")
const app = express()
const cors = require("cors")
const http = require("http").Server(app)
const { v4: uuidv4 } = require("uuid")
import {User, Room, initialGameState} from "@/types"
const PORT = 4000
const socketIO = require("socket.io")(http, {
    cors: {
        origin: "http://192.168.1.91:3000"
    }
})
app.use(cors())

let rooms = {}

const handleJoinRoom = (socket, joiningUser) => {
    let room = rooms[joiningUser.room]
    if (!room) {
        if (joiningUser.isSpectating) {
            throw new Error("Cannot create a new room as a spectator")
        }
        room = createNewRoom(joiningUser)
    }

    let user = room.users.find(user => user.socket.id == socket.id)
    if (!user) {
        if (!joiningUser.isSpectating && getPlayersFromRoom(room).length > 1) {
            throw new Error("Cannot join room as a player, already at two players")
        }
        user = createNewUser(socket, joiningUser)
        addUserToRoom(socket, user, room)
    }
    return room
}

const createNewUser = (socket, joiningUser) => {
    let newUser: User = {
        socket,
        name: joiningUser.userName,
        isSpectating: joiningUser.isSpectating,
    }
    return newUser
}

const createNewRoom = (user) => {
    let newRoom: Room = {
        id: uuidv4(),
        users: [],
        gameState: initialGameState
    }
    rooms[user.room] = newRoom
    return newRoom
}

const addUserToRoom = (socket, user, room) => {
    room.users.push(user)
    socket.join(room.id, () => {
        socket.roomId = room.id
    })
}

const getPlayersFromRoom = (room: Room) => {
    return room.users.filter(user => !user.isSpectating).map(user => user.name)
}

const getSpectatorsFromRoom = (room: Room) => {
    return room.users.filter(user => user.isSpectating).map(user => user.name)
}

const handleLeaveRoom = (socket, leavingUser) => {
    let room = rooms[leavingUser.room]
    room.users = room.users.filter(user => user.socket.id !== socket.id)
    rooms[leavingUser.room] = room
    socket.leave(room.id)

    if (getPlayersFromRoom(room).length == 0) {
        delete rooms[leavingUser.room]
    }
}

socketIO.on("connection", (socket) => {
    socket.on("joinRoom", user => {
        try {
            let room = handleJoinRoom(socket, user)
            let players = getPlayersFromRoom(room)
            let spectators = getSpectatorsFromRoom(room)
            socketIO.in(room.id).emit("roomUserList", { players, spectators })
            socketIO.in(room.id).emit("gameState", { gameState: room.gameState })
        } catch (e) {
            console.log(e.message)
            socket.emit("errorJoining", { message: e.message })
        }
    })

    socket.on("leaveRoom", user => {
        handleLeaveRoom(socket, user)
    })
})

http.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on ${PORT}`)
})
