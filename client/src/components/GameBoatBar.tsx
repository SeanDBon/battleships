import { useState } from "react"
import Ship from "./Ship"

type Ship = {
    name: string,
    isDestroyed: boolean,
    length: number,
    direction: number,
    part1: ShipPart,
    part2: ShipPart
    part3?: ShipPart,
    part4?: ShipPart,
    part5?: ShipPart,
}

type ShipPart = {
    posX: number,
    posY: number,
    isHit: boolean,
    hitBy?: Attack,
}

enum Attack {
    MISSLE = "MISSLE",
    TORPEDO = "TORPEDO",
}


const defaultShips: any = {
    "cruiser": {
        quantity: 4,
        length: 2,
        isDestroyed: false,
        direction: 0,
    },
    "frigate":{
        quantity: 3,
        length: 3,
        isDestroyed: false,
        direction: 0,
    },
    "destroyer":{
        quantity: 2,
        length: 4,
        isDestroyed: false,
        direction: 0,
    },
    "carrier":{
        quantity: 1,
        length: 5,
        isDestroyed: false,
        direction: 0,
    }
}

const GameBoatBar = ({selectedShip, setSelectedShip}: any) => {
    const [ships, setShips] = useState(defaultShips)

    const rotateShip = () => {
        if (selectedShip.direction === 3) {
            selectedShip.direction = 0
        } else {
            selectedShip.direction++
        }

        setShips((prev: any) => ({
            ...prev,
            selectedShip
        }))
    }

    return(
        <div className="gameBar">
            <Ship ship={ships.cruiser} rotateShip={rotateShip} setSelectedShip={setSelectedShip}/>
            <Ship ship={ships.frigate} rotateShip={rotateShip} setSelectedShip={setSelectedShip}/>
            <Ship ship={ships.destroyer} rotateShip={rotateShip} setSelectedShip={setSelectedShip}/>
            <Ship ship={ships.carrier} rotateShip={rotateShip} setSelectedShip={setSelectedShip}/>
        </div>
    )
}

export default GameBoatBar
