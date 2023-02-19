import { useDrag } from 'react-dnd'

const Boat = () => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'boat',
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return(
        <div className='boat' ref={dragRef}>
        </div>
    )
}

export default Boat