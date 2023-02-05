const express = require("express")
const app = express()
const cors = require("cors")
const http = require("http").Server(app)
const { v4: uuidv4 } = require("uuid")
import {User, Room, ShipTile, HitTile, initialGameState} from "./types"
const PORT = 4000
const socketIO = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000"
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
        room = createNewRoom(socket, joiningUser)
    }

    let user = room.users.find(user => user.socket.id == socket.id)
    if (!user) {
        if (!joiningUser.isSpectating && getPlayersFromRoom(room).length > 1) {
            throw new Error("Cannot join room as a player, already at two players")
        } else if (!joiningUser.isSpectating && getPlayersFromRoom(room).length == 1) {
            room.playerTwo = socket.id
            rooms[joiningUser.room] = room
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

const createNewRoom = (socket, user) => {
    let newRoom: Room = {
        id: uuidv4(),
        playerOne: socket.id,
        playerTwo: null,
        users: [],
        gameState: initialGameState
    }
    rooms[user.room] = newRoom
    return newRoom
}

const addUserToRoom = (socket, user, room) => {
    room.users.push(user)
    socket.roomId = room.id
    socket.join(room.id)
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

const updateGame = (socket, data) => {
    let room = null
    for (let name in rooms) {
        if (rooms[name].id == socket.roomId) {
            room = rooms[name]
         }
    }
    if (room == null) {
        throw new Error("Room not found with id: " + socket.roomId)
    }
    let user = null
    user = room.users.find( user => user.socket.id == socket.id)
    if (user == null) {
        throw new Error("User not found with id: " + socket.id)
    }

    updateBoards(socket, room, user, data)
    return room
}

const updateBoards = (socket, room, user, data) => {
    let hitBoard = null
    let shipBoard = null
    if (room.playerOne == socket.id) {
        hitBoard = room.gameState.playOneHitBoard
        shipBoard = room.gameState.playTwoShipBoard
    } else if (room.playerTwo == socket.id) {
        hitBoard = room.gameState.playTwoHitBoard
        shipBoard = room.gameState.playOneShipBoard
    }

    if (!hitBoard || !shipBoard) {
        throw new Error("Something went drastically wrong :/")
    }

    if (shipBoard[data.lat][data.long] == ShipTile.FULL_PRISTINE) {
        shipBoard[data.lat][data.long] = ShipTile.FULL_HIT
        hitBoard[data.lat][data.long] = HitTile.HIT
    } else if (shipBoard[data.lat][data.long] == ShipTile.FULL_HIT) {
        // what, your an idiot, who does that.
    } else {
        shipBoard[data.lat][data.long] = ShipTile.EMPTY_HIT
        hitBoard[data.lat][data.long] = HitTile.MISS
    }


    if (room.playerOne == socket.id) {
        room.gameState.playOneHitBoard = hitBoard
        room.gameState.playTwoShipBoard = shipBoard
    } else if (room.playerTwo == socket.id) {
        room.gameState.playTwoHitBoard = hitBoard
        room.gameState.playOneShipBoard = shipBoard
    }

    rooms[room.name] = room
}

socketIO.on("connection", (socket) => {
    socket.on("joinRoom", user => {
        try {
            let room = handleJoinRoom(socket, user)
            let players = getPlayersFromRoom(room)
            let spectators = getSpectatorsFromRoom(room)
            socketIO.in(room.id).emit("roomUserList", { players, spectators })
            socketIO.in(room.id).emit("gameStateChange", { gameState: room.gameState })
        } catch (e) {
            console.log(e.message)
            socket.emit("errorJoining", { message: e.message })
        }
    })

    socket.on("leaveRoom", user => {
        handleLeaveRoom(socket, user)
    })

    socket.on("updateGame", data => {
        let room = updateGame(socket, data)
        socketIO.in(room.id).emit("playerAttack", { lat: data.lat, long: data.long, attack: data.attack})
        socketIO.in(room.id).emit("gameStateChange", { gameState: room.gameState })
    })
})

http.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on ${PORT}`)
})
