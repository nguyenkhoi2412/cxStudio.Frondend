import "../_todoApp.scss";
import MainCard from "@components/mui-ui/cards";
import SubCard from "@components/mui-ui/cards/subCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { gridSpacing } from "@constants";
//#region components
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./taskItem";

const ColumnsTodo = (props) => {
  const [lsCol, setLsCol] = React.useState([]);

  React.useEffect(() => {
    setLsCol(Object.values(props.cols));
  }, [props.cols]);

  return (
    <>
      {/** Columns Todo/InProgress/Done */}
      {lsCol?.map((col) => (
        <Droppable key={col.id} droppableId={col.id}>
          {(provided) => (
            <Grid item xs={12} sm={4} className="columns-task">
              <MainCard title={col.title} className="tasks">
                <Grid
                  container
                  spacing={gridSpacing}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {/** Tasks */}
                  {col.items?.map((item, index) => (
                    <TaskItem
                      key={item.id}
                      item={item}
                      index={index}
                      updateTodoData={props.updateTodoData}
                    />
                  ))}
                </Grid>
              </MainCard>
            </Grid>
          )}
        </Droppable>
      ))}
    </>
  );
};

export default ColumnsTodo;
