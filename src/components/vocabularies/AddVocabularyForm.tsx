import React, { useCallback } from "react";
import { useObservableSuspense } from "observable-hooks";
import { Box, Tabs, Tab } from "@material-ui/core";

import t from "components/i18n";
import Dialog from "components/form/Dialog";
import ImportVocabularyForm from "components/vocabularies/ImportVocabularyForm";
import CreateVocabularyForm from "components/vocabularies/CreateVocabularyForm";
import { workspaceResource } from "data/workspaces";

type TabPanelProps = {
  index: number;
  currentIndex: number;
  children: React.ReactElement;
};

const TabPanel: React.FC<TabPanelProps> = ({
  index,
  currentIndex,
  children,
}) => <div hidden={index !== currentIndex}>{children}</div>;

type AddVocabularyFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddVocabularyForm: React.FC<AddVocabularyFormProps> = ({
  isOpen,
  onClose,
}) => {
  const workspace = useObservableSuspense(workspaceResource);

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, newValue: number) => {
      setTabIndex(newValue);
    },
    [setTabIndex]
  );

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t`addVocabulary`}
      maxWidth="sm"
    >
      <Tabs value={tabIndex} onChange={handleChange} variant="fullWidth">
        <Tab label={t`importVocabulary`} />
        <Tab label={t`createVocabulary`} />
      </Tabs>
      <Box style={{ height: 480 }}>
        <TabPanel index={0} currentIndex={tabIndex}>
          <ImportVocabularyForm setTabIndex={setTabIndex} onClose={onClose} />
        </TabPanel>
        <TabPanel index={1} currentIndex={tabIndex}>
          <CreateVocabularyForm workspace={workspace} onClose={onClose} />
        </TabPanel>
      </Box>
      <Box my={1} />
    </Dialog>
  );
};

export default AddVocabularyForm;
