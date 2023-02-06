import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { useWindowResize } from "../../hooks/useWindowResize";
import { areEqual, VariableSizeList as List } from "react-window";
import { ReactWindowScroller } from "../../utils/ReactWindowScroller";
import VocabularyListItem from "./VocabularyListItem";
import { useVocabularies } from "../../api/VocabularyApi";
import memoize from "memoize-one";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import t from "../i18n";
import SearchIcon from "@mui/icons-material/Search";

const endAdornment = (
  <InputAdornment position={"end"}>
    <SearchIcon />
  </InputAdornment>
);

const Vocabularies: React.FC = () => {
  const Row = memo(
    ({ data, index, setSize, windowWidth, isWaiting, setIsWaiting }: any) => {
      const rowRef = useRef<HTMLDivElement>(null);
      const { items } = data;
      const item = items[index];

      React.useEffect(() => {
        setSize(index, rowRef.current!.getBoundingClientRect().height);
      }, [setSize, index, windowWidth]);

      return (
        <div ref={rowRef}>
          <VocabularyListItem
            vocabulary={item}
            key={item.label}
            setIsWaiting={setIsWaiting}
            isWating={isWaiting}
          />
        </div>
      );
    },
    areEqual
  );

  const [isWaiting, setIsWaiting] = useState(false);
  const [filterText, setFilterText] = useState("");

  const { data = [], isLoading } = useVocabularies();
  const createItemData = memoize((items) => ({
    items,
  }));
  const filteredVocabularies = useMemo(() => {
    return data.filter((vocabulary) => {
      if (filterText === "") return true;
      else {
        return vocabulary.label
          .toLowerCase()
          .includes(filterText.toLowerCase());
      }
    });
  }, [data, filterText]);
  const itemdata = createItemData(filteredVocabularies);

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

  if (isLoading) return <Typography variant={"h4"}>{t`loading`}</Typography>;
  return (
    <div>
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
            itemCount={filteredVocabularies.length}
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
                  isWaiting={isWaiting}
                  setIsWaiting={setIsWaiting}
                />
              </div>
            )}
          </List>
        )}
      </ReactWindowScroller>
    </div>
  );
};

export default Vocabularies;
