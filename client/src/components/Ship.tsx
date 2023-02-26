import { useState } from "react"

const Ship = ({ship, rotateShip, setSelectedShip}: any) => {
    const [isMoving, setIsMoving] = useState(false)
    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(0)
    const [offsetX, setOffsetX] = useState(0)
    const [offsetY, setOffsetY] = useState(0)
    const [backgroundColor, setBackgroundColor] = useState('black')

    // This is perfect in every way.
    const direction = 'rotate(' + ship.direction * 90 +  'deg)'

    const style = {
        position: 'relative' as 'relative',
        transform: direction,
        backgroundColor,
        left,
        top,
        opacity: isMoving? 0.33 : 1
    }

    const handleMouseDown = (e: any) => {
        setIsMoving(true)
        setSelectedShip(ship)
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

        </div>
    )
}

export default Ship
