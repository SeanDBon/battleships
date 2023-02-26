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

const getShips = () => {
    const ships: any = {}
    for (let i = 0; i < 5; i++) {
        let current = {
            name: i.toString(),
            isDestroyed: false,
            length: 2,
            direction: 0,
            part1: {
                posX: -1,
                posY: -1,
                isHit: false
            },
            part2: {
                posX: -1,
                posY: -1,
                isHit: false
            }
        }
        ships[current.name] = current
    }
    return ships
}

const GameBoatBar = () => {
    const [ships, setShips] = useState(getShips())

    const rotateShip = (shipName: string) => {
        let current = ships[shipName]
        if (current.direction === 3) {
            current.direction = 0
        } else {
            current.direction++
        }

        setShips((prev: any) => ({
            ...prev,
            shipName: current
        }))
    }

    return(
        <div className="gameBar">
            <Ship ship={ships[0]} rotateShip={rotateShip}/>
            <Ship ship={ships[1]} rotateShip={rotateShip}/>
            <Ship ship={ships[2]} rotateShip={rotateShip}/>
            <Ship ship={ships[3]} rotateShip={rotateShip}/>
            <Ship ship={ships[4]} rotateShip={rotateShip}/>
        </div>
    )
}

export default GameBoatBar
