import React, { useRef } from "react"
import { useEffect, useState } from "react"
import ReactDOM from "react-dom"

enum AttackContent {
    EMPTY = "EMPTY",
    HIT = "HIT",
    MISS = "MISS",
    SCANNED = "SCANNED",
}

enum DefenderContent {
    EMPTY = "EMPTY",
    HIT = "HIT",
    BOAT = "BOAT",
}

type AttackTile = {
    content: AttackContent,
    lat: number,
    long: number,
    boundingBox: DOMRect | null
}

type DefenceTile = {
    content: DefenderContent
    lat: number,
    long: number
}


const Tile = ({state, setBoundingBox}: any) => {
    const inputRef = useRef<HTMLInputElement>(null);

    let backgroundColor
    if (state.content === AttackContent.EMPTY) {
        backgroundColor = 'black'
    } else if (state.content === AttackContent.MISS) {
        backgroundColor = 'yellow'
    } else if (state.content === AttackContent.HIT) {
        backgroundColor = 'green'
    } else if (state.content === AttackContent.SCANNED) {
        backgroundColor = 'red'
    }

    let styles = {
        "gridColumn": state.long + 1,
        "gridRow": state.lat,
        "backgroundColor": backgroundColor,
        "margin":5
    }

    useEffect(() => {
        setBoundingBox(state.lat, state.long, inputRef.current?.getBoundingClientRect())
    },[]);

    return(
        <div
            ref={inputRef}
            style={styles}
        />
    )
}

const generateAttackerTiles = () => {
    let attackerTiles: any[] = []
    for (let i = 0; i <= 10; i++) {
        attackerTiles.push([])
        for (let j = 0; j <= 10; j++) {
            const initialTile: AttackTile = {
                content: AttackContent.EMPTY,
                lat: j,
                long: i,
                boundingBox: null
            }
            attackerTiles[i].push(initialTile)
        }
    }
    return attackerTiles
}

const GameBoard = () => {
    const [tiles, setTiles] = useState<any[]>(generateAttackerTiles())

    const checkCollision = (e: MouseEvent) => {
        for (let i = 0; i <= 10; i++) {
            for (let j = 0; j <= 10; j++) {
                let inX = tiles[i][j].boundingBox.x < e.clientX && e.clientX < tiles[i][j].boundingBox.x + tiles[i][j].boundingBox.width
                let inY = tiles[i][j].boundingBox.y < e.clientY && e.clientY < tiles[i][j].boundingBox.y + tiles[i][j].boundingBox.height
                if (inX && inY) {
                    var copy = tiles.map(function(arr) {
                        return arr.slice()
                    })
                    copy[i][j].content = AttackContent.MISS
                    setTiles(copy)
                }
            }
        }
    }

    useEffect(() => {
        window.addEventListener("mouseup",(e)=>checkCollision(e))
    },[]);

    const setBoundingBox = (lat: number, long: number, rect: DOMRect) => {
        var copy = tiles.map(function(arr) {
            return arr.slice()
        })
        copy[long][lat].boundingBox = rect
        setTiles(copy)
    }

    return (
        <div className='gameBoard'>
            {tiles.map(
                tileRow => tileRow.map(
                    (tile: any) => (
                        <Tile
                        state={tile}
                        setBoundingBox = {setBoundingBox}
                        />
                    )
                )
            )}
        </div>
    )
}

export default GameBoard
