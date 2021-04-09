import React, { Suspense } from "react";
import { useObservableSuspense } from "observable-hooks";
import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import t from "components/i18n";
import formatDate from "utils/formatDate";
import UserChip from "components/users/UserChip";
import KeyValueTable from "components/KeyValueTable";

import { workspaceResource } from "data/workspaces";

const WorkspaceInformationData: React.FC = () => {
  const workspace = useObservableSuspense(workspaceResource);

  const data = [
    {
      key: t`label`,
      value: workspace.label,
    },
    {
      key: t`owner`,
      value: <UserChip {...workspace.author} />,
    },
    {
      key: t`lastEditor`,
      value: workspace.lastEditor && <UserChip {...workspace.lastEditor} />,
    },
    {
      key: t`lastModified`,
      value: workspace!.lastModified && formatDate(workspace.lastModified),
    },
  ];

  return <KeyValueTable data={data} />;
};

const WorkspaceInformation: React.FC = () => {
  const skeletonData = [
    {
      key: t`label`,
      value: <Skeleton />,
    },
    {
      key: t`owner`,
      value: <Skeleton />,
    },
    {
      key: t`lastEditor`,
      value: <Skeleton />,
    },
    {
      key: t`lastModified`,
      value: <Skeleton />,
    },
  ];

  return (
    <>
      <Typography variant="h5" paragraph>
        {t`workspaceInformation`}
      </Typography>
      <Suspense fallback={<KeyValueTable data={skeletonData} />}>
        <WorkspaceInformationData />
      </Suspense>
    </>
  );
};

export default WorkspaceInformation;
