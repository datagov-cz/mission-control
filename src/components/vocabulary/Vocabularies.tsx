import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { useWindowResize } from "../../hooks/useWindowResize";
import { areEqual, VariableSizeList as List } from "react-window";
import { ReactWindowScroller } from "../../utils/ReactWindowScroller";
import VocabularyListItem from "./VocabularyListItem";
import memoize from "memoize-one";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { BaseVocabularyData } from "../../@types";
import { useIntl } from "react-intl";
import t from "../i18n";

const endAdornment = (
  <InputAdornment position={"end"}>
    <SearchIcon />
  </InputAdornment>
);

interface VocabulariesProps {
  performAction: (vocabulary: BaseVocabularyData) => Promise<void>;
  isWaiting: boolean;
  data: BaseVocabularyData[];
  inProject?: boolean;
}

const Vocabularies: React.FC<VocabulariesProps> = ({
  performAction,
  isWaiting,
  data,
  inProject = false,
}) => {
  const Row = memo(({ data, index, setSize, windowWidth, isWaiting }: any) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const { items } = data;
    const item = items[index];
    const actionLabel = (
      <Typography variant={"subtitle2"}>
        {inProject ? t`addToProject` : t`editVocabulary`}
      </Typography>
    );

    React.useEffect(() => {
      setSize(index, rowRef.current!.getBoundingClientRect().height);
    }, [setSize, index, windowWidth]);

    return (
      <div ref={rowRef}>
        <VocabularyListItem
          labelAction={actionLabel}
          vocabulary={item}
          key={item.label}
          isWating={isWaiting}
          performAction={performAction}
        />
      </div>
    );
  }, areEqual);

  const [filterText, setFilterText] = useState("");

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
  const intl = useIntl();
  return (
    <div>
      <Box>
        <TextField
          value={filterText}
          onChange={handleChange}
          size={"small"}
          fullWidth
          placeholder={`${intl.messages["common.searchVocabulary"]}`}
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
