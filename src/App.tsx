import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { toDoState } from './atoms'
import DraggableCard from './components/DraggableCard'
import Board from './components/Board'

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    // if (!destination) return // 같은 자리에 놓을 때
    // setToDos((oldToDos) => {
    //   const toDosCopy = [...oldToDos]
    //   // 1) Delete item on source.index
    //   toDosCopy.splice(source.index, 1)
    //   // 2) Put back the item on the destination.index
    //   toDosCopy.splice(destination?.index, 0, draggableId)
    //   return toDosCopy
    // })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  )
}

export default App
