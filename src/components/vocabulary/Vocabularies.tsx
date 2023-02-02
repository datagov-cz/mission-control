import React, { memo, useMemo, useState } from "react";
import { useVocabularies } from "../../api/VocabularyApi";
import { areEqual, FixedSizeList as List } from "react-window";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import t from "../i18n";
import VocabularyListItem from "./VocabularyListItem";
import { ReactWindowScroller } from "../../utils/ReactWindowScroller";
import CreateVocabulary from "./CreateVocabulary";
import memoize from "memoize-one";
import SearchIcon from "@mui/icons-material/Search";

const endAdornment = (
  <InputAdornment position={"end"}>
    <SearchIcon />
  </InputAdornment>
);

const Vocabularies: React.FC = () => {
  const { data = [], isLoading } = useVocabularies();
  const [isWaiting, setIsWaiting] = useState(false);
  const [filterText, setFilterText] = useState("");

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

  const createItemData = memoize((items) => ({
    items,
  }));

  const itemdata = createItemData(filteredVocabularies);

  const Scroller = useMemo(() => {
    return (
      <ReactWindowScroller>
        {({ ref, outerRef, style, onScroll }: any) => (
          <List
            ref={ref}
            width={10}
            outerRef={outerRef}
            style={style}
            height={window.innerHeight}
            itemCount={filteredVocabularies.length}
            itemData={itemdata}
            itemSize={60}
            onScroll={onScroll}
            overscanCount={15}
          >
            {Row}
          </List>
        )}
      </ReactWindowScroller>
    );
  }, [filteredVocabularies, isWaiting]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };
  if (isLoading) return <Typography variant={"h4"}>{t`loading`}</Typography>;

  const Row = memo(({ data, index, style }: any) => {
    const { items } = data;
    const item = items[index];
    return (
      <div style={style}>
        <VocabularyListItem
          vocabulary={item}
          key={item.label}
          setIsWaiting={setIsWaiting}
          isWating={isWaiting}
        />
      </div>
    );
  }, areEqual);

  return (
    <div>
      <Typography variant={"h4"} mb={1}>{t`vocabularies`}</Typography>
      <CreateVocabulary />
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
      {Scroller}
    </div>
  );
};

export default Vocabularies;
