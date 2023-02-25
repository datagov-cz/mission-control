import React from "react";
import { CenteredSpacedOutBox } from "../common/CenteredSpacedOutBox";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import t from "../i18n";
import SearchIcon from "@mui/icons-material/Search";
import { useIntl } from "react-intl";

const endAdornment = (
  <InputAdornment position={"end"}>
    <SearchIcon />
  </InputAdornment>
);

interface ProjectListHeaderProps {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProjectListHeader: React.FC<ProjectListHeaderProps> = ({value, handleChange}) => {
  const intl = useIntl();
  return (
    <>
      <CenteredSpacedOutBox mt={2}>
        <Box flex={3}>
          <Typography
            variant={"subtitle1"}
            color={"gray"}
          >{t`label`}</Typography>
        </Box>
        <Box flex={1}>
          <Typography
            variant={"subtitle1"}
            color={"gray"}
          >{t`lastModified`}</Typography>
        </Box>
        <Box flex={1}>
          <Typography
            variant={"subtitle1"}
            color={"gray"}
          >{t`lastEditor`}</Typography>
        </Box>
        <Box flex={1}>
          <TextField
            size={"small"}
            placeholder={`${intl.messages["common.search"]}`}
            fullWidth={true}
            value={value}
            onChange={handleChange}
            InputProps={{
              endAdornment: endAdornment,
            }}
          />
        </Box>
      </CenteredSpacedOutBox>
      <hr />
    </>
  );
};

export default ProjectListHeader;
