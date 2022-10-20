import React, { memo } from "react";
import memoize from "memoize-one";
import { useProjects } from "../api/ProjectAPI";
import { areEqual, FixedSizeList as List } from "react-window";
import { Typography } from "@mui/material";
import ProjectListItem from "./ProjectListItem";
import t, { Namespace } from "./i18n";
import { ReactWindowScroller } from "../utils/ReactWindowScroller";

const Row = memo(({ data, index, style }: any) => {
  const { items } = data;
  const item = items[index];
  return (
    <div
      style={style}
    >
      <ProjectListItem project={item} key={item.uri} />
    </div>
  );
}, areEqual);

const createItemData = memoize((items) => ({
  items
}));

const Projects: React.FC = () => {
  const { data = [], isLoading } = useProjects();
  if (isLoading) return <Typography variant={"h4"}>{t`loading`}</Typography>;
  const itemData = createItemData(data);
  return (
    <Namespace.Provider value={"workspaces"}>
      <Typography variant={"h5"} sx={{paddingTop:2,paddingBottom:1}}>{t`projects`}</Typography>
      <ReactWindowScroller>
        {({ ref, outerRef, style, onScroll }: any) => (
          <List
            ref={ref}
            width={10}
            outerRef={outerRef}
            style={style}
            height={window.innerHeight}
            itemCount={data.length}
            itemData={itemData}
            itemSize={50}
            onScroll={onScroll}
            overscanCount={30}
          >
            {Row}
          </List>
        )}
      </ReactWindowScroller>
    </Namespace.Provider>
  );
};

export default Projects;
