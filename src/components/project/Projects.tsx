import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import memoize from "memoize-one";
import { useProjects } from "../../api/ProjectAPI";
import { areEqual, VariableSizeList as List } from "react-window";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import ProjectListItem from "./ProjectListItem";
import t, { Namespace } from "../i18n";
import { ReactWindowScroller } from "../../utils/ReactWindowScroller";
import ProjectListHeader from "./ProjectListHeader";
import { useWindowResize } from "../../hooks/useWindowResize";
import SearchIcon from "@mui/icons-material/Search";

const endAdornment = (
  <InputAdornment position={"end"}>
    <SearchIcon />
  </InputAdornment>
);

const Row = memo(({ data, index, setSize, windowWidth }: any) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const { items } = data;
  const item = items[index];

  React.useEffect(() => {
    setSize(index, rowRef.current!.getBoundingClientRect().height);
  }, [setSize, index, windowWidth]);
  return (
    <div ref={rowRef}>
      <ProjectListItem project={item} key={item.uri} />
    </div>
  );
}, areEqual);

const createItemData = memoize((items) => ({
  items,
}));

const Projects: React.FC = () => {
  const { data = [], isLoading, isRefetching } = useProjects();
  const [filterText, setFilterText] = useState("");
  const filteredProjects = useMemo(() => {
    return data.filter((project) => {
      if (filterText === "") return true;
      else {
        return project.label.toLowerCase().includes(filterText.toLowerCase());
      }
    });
  }, [data, filterText]);
  const itemdata = createItemData(filteredProjects);
  const listRef = useRef<List>();

  const sizeMap = useRef({});
  const setSize = useCallback((index: number, size: number) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    listRef.current!.resetAfterIndex(index);
  }, []);
  // @ts-ignore
  const getSize = (index: number) => sizeMap.current[index] + 8 || 60;
  const [windowWidth] = useWindowResize();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  if (isLoading || isRefetching)
    return <Typography variant={"h4"}>{t`loading`}</Typography>;
  return (
    <Namespace.Provider value={"workspaces"}>
      <Typography
        variant={"h5"}
        sx={{ paddingTop: 2, paddingBottom: 1 }}
      >{t`projects`}</Typography>
      <Box>
        <TextField
          value={filterText}
          onChange={handleChange}
          size={"small"}
          fullWidth
          placeholder="Zadejte hledaný slovník"
          InputProps={{
            endAdornment: endAdornment,
          }}
        />
      </Box>
      <ProjectListHeader />
      <div>
        <ReactWindowScroller>
          {({ ref, outerRef, style, onScroll }: any) => (
            <List
              ref={(list) => {
                ref.current = list;
                // @ts-ignore
                listRef.current = list;
              }}
              width={10}
              outerRef={outerRef}
              style={style}
              height={window.innerHeight}
              itemCount={filteredProjects.length}
              itemSize={getSize}
              itemData={itemdata}
              onScroll={onScroll}
              overscanCount={15}
            >
              {({ data, index, style }) => (
                <div style={style}>
                  <Row
                    data={data}
                    index={index}
                    setSize={setSize}
                    windowWidth={windowWidth}
                  />
                </div>
              )}
            </List>
          )}
        </ReactWindowScroller>
      </div>
    </Namespace.Provider>
  );
};

export default Projects;
