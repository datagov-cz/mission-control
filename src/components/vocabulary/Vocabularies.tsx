import React, { memo, useState } from "react";
import { useVocabularies } from "../../api/VocabularyApi";
import { areEqual, FixedSizeList as List } from "react-window";
import { Typography } from "@mui/material";
import t from "../i18n";
import VocabularyListItem from "./VocabularyListItem";
import { ReactWindowScroller } from "../../utils/ReactWindowScroller";
import CreateVocabulary from "./CreateVocabulary";
import memoize from "memoize-one";

const Vocabularies: React.FC = () => {
  const { data = [], isLoading } = useVocabularies();
  const [isWaiting, setIsWaiting] = useState(false);

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

  const createItemData = memoize((items) => ({
    items,
  }));

  const itemdata = createItemData(data);
  return (
    <div>
      <Typography variant={"h4"} mb={1}>{t`vocabularies`}</Typography>
      <CreateVocabulary />
      <ReactWindowScroller>
        {({ ref, outerRef, style, onScroll }: any) => (
          <List
            ref={ref}
            width={10}
            outerRef={outerRef}
            style={style}
            height={window.innerHeight}
            itemCount={data.length}
            itemData = {itemdata}
            itemSize={60}
            onScroll={onScroll}
            overscanCount={30}
          >
            {Row}
          </List>
        )}
      </ReactWindowScroller>
    </div>
  );
};

export default Vocabularies;
