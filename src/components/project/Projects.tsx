import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import memoize from "memoize-one";
import { useProjects } from "../../api/ProjectAPI";
import { areEqual, VariableSizeList as List } from "react-window";
import ProjectListItem from "./ProjectListItem";
import t, { Namespace } from "../i18n";
import { ReactWindowScroller } from "../../utils/ReactWindowScroller";
import ProjectListHeader from "./ProjectListHeader";
import { useWindowResize } from "../../hooks/useWindowResize";
import SimpleBackdrop from "../common/SimpleBackdrop";
import IconHeader from "../common/IconHeader";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { useAuth } from "@datagov-cz/assembly-line-shared";

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
  const { user } = useAuth();
  const { data = [], isLoading, isRefetching } = useProjects();
  const [filterText, setFilterText] = useState("");
  const filteredProjects = useMemo(() => {
    return data.filter((project) => {
      if (
        (user.profile.realm_access &&
          user.profile.realm_access.roles.includes("view_all_workspaces")) ||
        project.author.id === user.profile.sub ||
        project.lastEditor?.id === user.profile.sub
      ) {
        return filterText === ""
          ? true
          : project.label.toLowerCase().includes(filterText.toLowerCase());
      } else return false;
    });
  }, [data, filterText, user]);
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

  if (isLoading || isRefetching) return <SimpleBackdrop show={true} />;
  return (
    <Namespace.Provider value={"workspaces"}>
      <IconHeader
        icon={
          <LibraryBooksOutlinedIcon
            fontSize={"large"}
            sx={{ marginRight: 1 }}
          />
        }
        label={t`projects`}
      />
      <ProjectListHeader value={filterText} handleChange={handleChange} />
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
