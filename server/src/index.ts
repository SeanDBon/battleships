const express = require("express")
const app = express()
const cors = require("cors")
const http = require("http").Server(app)
const { v4: uuidv4 } = require("uuid")
import { User, Room, ShipTile, HitTile, initialGameState, NewUser } from "./types"
const PORT = 4000
const socketIO = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})
app.use(cors())

let rooms = {}

const createUser = (username: string, socket: any): User => {
    let newUser: User = {
        id: uuidv4(),
        username,
        socket,
    }
    return newUser
}

const createAndJoinRoom = (roomName: string, user: User, socket: any): Room => {
    let room: Room = {
        id: uuidv4(),
        name: roomName,
        playerOne: user,
        playerTwo: null,
        spectators: [],
        gameState: null
    }
    socket.roomId = room.id
    socket.join(room.id)

    rooms[room.id] = room
    return room
}

const joinRoom = (roomId: string, isSpectating: boolean, user: User, socket: any): Room => {
    const room = rooms[roomId]
    if (!isSpectating) {
        if (room.playerTwo !== null) {
            throw new Error("Cannot join room as a player, already has two player.")
        }
        room.playerTwo = user
    } else {
        room.spectators.push(user)
    }
    socket.roomId = room.id
    socket.join(room.id)

    rooms[roomId] = room
    return room
}

socketIO.on("connection", (socket: any) => {
    socket.on("start", (newUser: NewUser) => {
        const user: User = createUser(newUser.username, socket);
        let room: Room;
        if (newUser?.roomId) {
            room = joinRoom(newUser.roomId, newUser.isSpectating, user, socket)
        } else {
            room = createAndJoinRoom(newUser.roomName, user, socket)
        }
    })
})

app.get("/roomlist", (req, res) => {
    let roomList = []
    for (let room in rooms) {
        roomList.push({id: rooms[room].id, name: rooms[room].name})
    }
    res.send(roomList)
})

http.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on ${PORT}`)
})
