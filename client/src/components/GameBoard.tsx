import { useState } from "react"

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
    long: number
}

type DefenceTile = {
    content: DefenderContent
    lat: number,
    long: number
}


const Tile = ({state, tilesOnClick, tileOnDragOver, tileOnDragLeave, tileOnDrop}: any) => {
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

    return(
        <div
            style={styles}
            onDragOver={(e)=>tileOnDragOver(e, state.lat, state.long)}
            onDragLeave={(e)=>tileOnDragLeave(e, state.lat, state.long)}
            onDrop={(e)=>tileOnDrop(e, state.lat, state.long)}
            onMouseEnter={() => console.log('asdfasdf')}
            onClick={(e)=>tilesOnClick(e, state.lat, state.long)}
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
                long: i
            }
            attackerTiles[i].push(initialTile)
        }
    }
    return attackerTiles
}

const GameBoard = () => {
    const [tiles, setTiles] = useState<any[]>(generateAttackerTiles())

    const tileOnClick = (e: any, lat: number, long: number) => {
        var copy = tiles.map(function(arr) {
            return arr.slice()
        })

        copy[long][lat].content = AttackContent.HIT
        copy[long+1][lat].content = AttackContent.HIT
        copy[long+2][lat].content = AttackContent.HIT

        setTiles(copy)
    }

    const tileOnDragOver = (e: any, lat: number, long: number) => {
        console.log('a')
        e.preventDefault()
        e.stopPropagation()
        var copy = tiles.map(function(arr) {
            return arr.slice()
        })

        copy[long][lat].content = AttackContent.MISS
        copy[long+1][lat].content = AttackContent.MISS
        copy[long+2][lat].content = AttackContent.MISS

        setTiles(copy)
    }

    const tileOnDragLeave = (e: any, lat: number, long: number) => {
        e.preventDefault()
        e.stopPropagation()
        var copy = tiles.map(function(arr) {
            return arr.slice()
        })

        copy[long][lat].content = AttackContent.EMPTY
        copy[long+1][lat].content = AttackContent.EMPTY
        copy[long+2][lat].content = AttackContent.EMPTY

        setTiles(copy)
    }

    const tileOnDrop = (e: any, lat: number, long: number) => {
        e.preventDefault()
        e.stopPropagation()
        var copy = tiles.map(function(arr) {
            return arr.slice()
        })

        copy[long][lat].content = AttackContent.SCANNED
        copy[long+1][lat].content = AttackContent.SCANNED
        copy[long+2][lat].content = AttackContent.SCANNED

        setTiles(copy)
    }

    return (
        <div className='gameBoard'>
            {tiles.map(
                tileRow => tileRow.map(
                    (tile: any) => (
                        <Tile
                            state={tile}
                            tilesOnClick={tileOnClick}
                            tileOnDragOver={tileOnDragOver}
                            tileOnDragLeave={tileOnDragLeave}
                            tileOnDrop={tileOnDrop}
                        />
                    )
                )
            )}
        </div>
    )
}

export default GameBoard
