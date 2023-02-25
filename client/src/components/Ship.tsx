import { useState } from "react"

const Ship = ({ship, rotateShip}: any) => {
    const [isMoving, setIsMoving] = useState(false)
    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(0)
    const [offsetX, setOffsetX] = useState(0)
    const [offsetY, setOffsetY] = useState(0)
    const [backgroundColor, setBackgroundColor] = useState('black')

    const direction = 'rotate(' + ship.direction * 90 +  'deg)';

    const style = {
        position: 'relative' as 'relative',
        transform: direction,
        backgroundColor,
        left,
        top,
    }

    const handleMouseDown = (e: any) => {
        setIsMoving(true)
        setOffsetX(e.clientX - offsetX)
        setOffsetY(e.clientY - offsetY)
        setBackgroundColor('green')
    }

    const handleMouseUp = (e: any) => {
        if (!isMoving) return
        setIsMoving(false)
        setOffsetX(e.clientX - offsetX)
        setOffsetY(e.clientY - offsetY)
        setBackgroundColor('black')
    }

    const handleDrag = (e: any) => {
        if (!isMoving) return

        setLeft(e.clientX - offsetX)
        setTop(e.clientY - offsetY)
    }

    const handleKeyPress = (e: any) => {
        if (!isMoving || e.key !== "r") return

        rotateShip(ship.name)
    }


    return(
        <div
            onMouseDown={(e) => handleMouseDown(e)}
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseMove={(e) => handleDrag(e)}
            onMouseLeave={(e) => handleMouseUp(e)}
            onKeyDown={(e) => handleKeyPress(e)}
            style={style}
            tabIndex={0}
            className='ship'>
                {ship.name}
        </div>
    )
}

export default Ship
