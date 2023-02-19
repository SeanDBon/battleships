import React, { useState } from "react"

interface Props {
    lat: number,
    long: number,
}

type AttackTile = {
    content: "empty" | "hit" | "miss" | "scanned"
}
type DefenceTile = {
    content: "empty" | "boat"  | "boatHit",
}

const onDragOver = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.background = 'red'
}
const onDragLeave = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.background = 'black';
}
const onDrop = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.background = 'yellow'
}

const GameBoardBetter = () => {
    const Tile = ({lat, long}: Props) => {
        let styles = {
            "gridColumn": long+1, 
            "gridRow": lat, 
            "backgroundColor":"black",
            "margin":5
        }
    
        return(
            <div 
                style={styles} 
                onDragOver={(e)=>onDragOver(e)} 
                onDragLeave={(e)=>onDragLeave(e)} 
                onDrop={(e)=>onDrop(e)} 
                onClick={(e)=>onClick(e, lat, long)}
            />
        )
    }

    const generateGrid = () => {
        let temp_tiles : any[]= []
        for (let i = 0; i <= 10; i++) {
            temp_tiles.push([])
            for (let j = 0; j <= 10; j++) {
                temp_tiles[i].push(<Tile lat={j} long={i} />)
            }
        }
        return temp_tiles
    }

    const [tiles, setTiles] = useState(generateGrid())

    const onClick = (e:any, lat:number, long:number) => {
        
        let currentTile = tiles[lat][long]

        console.log(currentTile)
    }

    return (
        <div className='gameBoard'>
            {tiles}
        </div>
    )
}

export default GameBoardBetter