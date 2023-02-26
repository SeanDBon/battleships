import { useRef } from "react"
import { useEffect, useState } from "react"

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


const Tile = ({state, setBoundingBox, selectedShip}: any) => {
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
        "margin": 5,
        backgroundColor
    }

    useEffect(() => {
        setBoundingBox(state.lat, state.long, inputRef.current?.getBoundingClientRect())
    }, []);

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

const GameBoard = ({selectedShip, setSelectedShip}: any) => {
    const [tiles, setTiles] = useState<any[]>(generateAttackerTiles())

    const placeShip = (lat: number, long: number) => {
        var copy = tiles.map(function(arr) {
            return arr.slice()
        })
        if (selectedShip.direction % 2 === 0) {
            for (let i = 0; i < selectedShip.length; i++) {
                copy[lat + i][long].content = AttackContent.MISS
            }
        } else {
            for (let i = 0; i < selectedShip.length; i++) {
                copy[lat][long + i].content = AttackContent.MISS
            }
        }
        setTiles(copy)
    }

    const checkCollision = (e: MouseEvent) => {
        console.log(selectedShip)
        for (let i = 0; i <= 10; i++) {
            for (let j = 0; j <= 10; j++) {
                let inX = tiles[i][j].boundingBox.x < e.clientX && e.clientX < tiles[i][j].boundingBox.x + tiles[i][j].boundingBox.width
                let inY = tiles[i][j].boundingBox.y < e.clientY && e.clientY < tiles[i][j].boundingBox.y + tiles[i][j].boundingBox.height
                if (inX && inY && selectedShip) {
                    placeShip(i, j)
                }
            }
        }
        setSelectedShip(null)
    }

    useEffect(() => {
        window.addEventListener("mouseup", checkCollision)
        return () => {
            window.removeEventListener('mouseup', checkCollision);
          };
    }, [selectedShip]);

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
