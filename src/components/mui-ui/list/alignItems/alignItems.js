import "./_alignItems.scss";
import { crossCutting } from "@utils/crossCutting";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const AlignItemsList = ({ itemlist }) => {
  const [arrayValue, setArrayValue] = React.useState([]);

  React.useEffect(() => {
    setArrayValue(itemlist);
  }, [itemlist]);

  const renderListItem = () => {
    return (
      <>
        <List>
          {arrayValue.map((item, index) => {
            return (
              <React.Fragment key={item.key}>
                {index > 0 ? <Divider variant="inset" component="li" /> : <></>}
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={item.text} src={item.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h4" gutterBottom>
                        {item.primaryText}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.name}
                        </Typography>
                        {" — " + item.desc}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </React.Fragment>
            );
          })}
          {/* <Divider variant="inset" component="li" />
           <ListItem alignItems="flex-start">
             <ListItemAvatar>
               <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
             </ListItemAvatar>
             <ListItemText
               primary="Summer BBQ"
               secondary={
                 <React.Fragment>
                   <Typography
                     sx={{ display: "inline" }}
                     component="span"
                     variant="body2"
                     color="text.primary"
                   >
                     to Scott, Alex, Jennifer
                   </Typography>
                   {" — Wish I could come, but I'm out of town this…"}
                 </React.Fragment>
               }
             />
           </ListItem> */}
        </List>
      </>
    );
  };

  return <>{arrayValue?.length > 0 ? renderListItem() : <></>}</>;
};

export default React.memo(AlignItemsList, (props, nextProps) => {
  if (crossCutting.check.isEquals(props, nextProps)) {
    //  return true if you don't need re-render
    return true;
  }
});
