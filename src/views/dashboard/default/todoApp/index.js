import "./_todoApp.scss";
import { hook } from "@utils/crossCutting";
import { useTheme, styled } from "@mui/material/styles";
import MainCard from "@components/mui-ui/cards";
import SubCard from "@components/mui-ui/cards/subCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { gridSpacing } from "@constants";
//#region components
import AnimateButton from "@components/mui-ui/extended/animateButton";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fakeTodoData } from "./fakeTodoData";
import ColumnsTodo from "./components/columnsTodo";

const TodoApp = (props) => {
  const theme = useTheme();
  const [columns, setColumns] = React.useState(fakeTodoData);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const updateTodoData = (itemValue) => {
    let newObj = {};
    const newColsData = Object.values(columns).map((col) => {
      const newItem = col.items?.map((v) =>
        v.id === itemValue.id ? itemValue : v
      );

      // assign new data object
      newObj[col.id] = {
        ...col,
        items: newItem,
      };
    });

    setColumns(newObj);
  };

  return (
    <>
      <Grid item xs={12}>
        <SubCard title="TodoApp">
          <Grid container direction="column">
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
              <Grid
                container
                className="todo-app-container"
                spacing={gridSpacing}
              >
                {/** Columns Todo/InProgress/Done */}
                <ColumnsTodo cols={columns} updateTodoData={updateTodoData} />
              </Grid>
            </DragDropContext>
          </Grid>
        </SubCard>
      </Grid>
    </>
  );
};

export default TodoApp;
