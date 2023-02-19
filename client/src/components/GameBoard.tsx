import { useEffect, useState } from "react"

interface Props {
    lat: number,
    long: number,
    socket: any,
}

const styles = {
    tile: {

    },
    container: {
        display: 'flex',
        flexFlow: "row wrap"
    }
}

const Tile = ({lat, long, socket}: Props) => {
    let defaultStyle = {
        width: 50,
        height: 50,
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
            socket.emit("updateGame", {long, lat, attack: 'woosh'} )
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
            temp_tiles.push(<Tile socket={socket} lat={j} long={i} />)
        }
    }

    useEffect(()=> {
        socket.on("gameStateChange", (data: any) => console.log(data))
    }, [socket])

    useEffect(()=> {
        socket.on("playerAttack", (data: any) => console.log(data))
    }, [socket])

    return (

        <div style={styles.container}>
            {temp_tiles}
        </div>

    )
}

export default GameBoard
