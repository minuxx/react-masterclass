import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { toDoState } from './atoms'
import DraggableCard from './components/DraggableCard'
import Board from './components/Board'

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = (info: DropResult) => {
    const { draggableId, destination, source } = info
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]
        boardCopy.splice(source.index, 1)
        boardCopy.splice(destination?.index, 0, draggableId)
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        }
      })
    }
    // if (!destination) return // 같은 자리에 놓을 때
    //
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
