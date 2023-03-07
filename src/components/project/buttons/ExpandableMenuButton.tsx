import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ListItemText, styled, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import t from "../../i18n";
import { ProjectData } from "../../../@types";
import {
  getEditRelationsLink,
  getEditTermLink,
} from "../../../utils/QueryUtil";

interface ExpandableMenuButtonProps {
  project: ProjectData;
}
const ExpandableMenuButton: React.FC<ExpandableMenuButtonProps> = ({
  project,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <CustomIconButton onClick={handleClick} size={"small"}>
        <MoreVertIcon />
      </CustomIconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          disabled={project.vocabularyContexts.length === 0}
          disableRipple
          href={getEditTermLink(project)}
          component={"a"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <EditIcon />
          <ListItemText sx={{ marginLeft: 2 }}>
            <Typography variant={"subtitle2"}>{t`editTerms`}</Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem
          disabled={project.vocabularyContexts.length === 0}
          disableRipple
          component={"a"}
          href={getEditRelationsLink(project)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AccountTreeIcon />
          <ListItemText sx={{ marginLeft: 2 }}>
            <Typography variant={"subtitle2"}>{t`editRelations`}</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

const CustomIconButton = styled(IconButton)(() => ({
  color: "black",
  backgroundColor: "white",
  marginLeft: 16,
  "&:hover": {
    color: "black",
    backgroundColor: "white",
  },
}));

export default ExpandableMenuButton;
