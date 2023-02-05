import { useState } from "react"

interface Props {
    lat: number,
    long: number
}

const styles = {
    tile: {
        
    },
    container: {
        width: 1102,
        display: 'flex',
        flexFlow: "row wrap"

    }
}

const Tile = ({lat, long}: Props) => {
    let defaultStyle = {
        width: 100,
        height: 100,
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'solid',
        backgroundColor: 'white'
    }
    const [style, setStyle] = useState(defaultStyle)
    let content = ""
    let lat_dict = ["0","A","B","C","D","E","F","G","H","I","J"]
    if (lat == 0 && long != 0) {content = long.toString()}
    if (long == 0 && lat != 0) {content = lat_dict[lat]}
    const tileClick = () => {
        if (lat !=0 && long != 0){
            setStyle({
                ...style,
                backgroundColor: 'red'
            })
        }
    }
    return (
        <div style={style} onClick={tileClick}>
            {content}
        </div>
    )
}

const GameBoard = ({socket}: any) => {
    let temp_tiles = []
    let width = 11
    let height = 11
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            temp_tiles.push(<Tile lat={j} long={i} />)
        }
    }
    
    return (
        
        <div style={styles.container}>
            {temp_tiles}
        </div>
        
    )
}

export default GameBoard