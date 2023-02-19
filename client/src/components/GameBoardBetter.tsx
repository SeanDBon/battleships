import React, { useState } from "react"
import { useDrop } from 'react-dnd'

interface Props {
    lat: number,
    long: number,
}

const Tile = ({lat, long}: Props) => {
    let styles = {
        "gridColumn": long, 
        "gridRow": lat, 
        "backgroundColor":"black",
        "margin":5
    }

    const [{ isOver }, dropRef] = useDrop({
        accept: 'boat',
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
        hover(item, monitor) {
            console.log(lat, long)
        }
    })

    return(
        <div style={styles} ref={dropRef}></div>
    )
}

const generateGrid = () => {
    let temp_tiles = []
    for (let i = 1; i <= 11; i++) {
        for (let j = 1; j <= 11; j++) {
            temp_tiles.push(<Tile lat={j} long={i} />)
        }
    }
    return temp_tiles
}

const GameBoardBetter = () => {
    return (
            <div className='gameBoard'>
                {generateGrid()}
            </div>
    )
}

export default GameBoardBetter