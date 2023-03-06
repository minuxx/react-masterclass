import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { IToDo } from '../atoms'

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? '#74b9ff' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? '0px 2px 10px rgba(0,0,0, 0.5)' : 'none'};
`
interface IDragableCardProps {
  toDoId: number
  toDoText: string
  index: number
}

function DraggableCard({ toDoId, toDoText, index }: IDragableCardProps) {
  return (
    <Draggable key={toDoId} draggableId={String(toDoId)} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DraggableCard)
