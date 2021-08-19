import React, { useCallback, useTransition } from "react";
import { useAuth } from "@opendata-mvcr/assembly-line-shared";

import { Workspace } from "@types";
import Routes from "app/routes";

import t from "components/i18n";
import {
  DataColumn,
  DataTableObservableResource,
  DataTableSuspense,
} from "components/DataTable";
import UserChip from "components/users/UserChip";
import Tools from "./Tools";
import formatDate from "utils/formatDate";
import useGoTo from "hooks/useGoTo";

import { workspacesResource } from "data/workspaces";

type WorkspacesTableProps = {
  currentUserOnly?: boolean;
};

const WorkspacesTable: React.FC<WorkspacesTableProps> = ({
  currentUserOnly = false,
}) => {
  const goTo = useGoTo();
  const [, startTransition] = useTransition();

  const {
    user: {
      profile: { sub },
    },
  } = useAuth();

  const columns: DataColumn[] = [
    {
      renderHeader: () => t`label`,
      field: "label",
      width: 300,
    },
    {
      field: "owner",
      renderHeader: () => t`owner`,
      renderCell: (params) => <UserChip {...params.row.author} />,
      width: 150,
    },
    {
      field: "lastEditor",
      renderHeader: () => t`lastEditor`,
      renderCell: (params) =>
        params.row.lastEditor && <UserChip {...params.row.lastEditor} />,
      width: 150,
    },
    {
      field: "lastModified",
      renderHeader: () => t`lastModified`,
      renderCell: (params) =>
        params.row.lastModified && formatDate(params.row.lastModified),
      width: 200,
    },
    {
      field: "actions",
      renderHeader: () => t`actions`,
      renderCell: (params) => <Tools workspaceUri={params.row.uri} />,
      width: 350,
    },
  ];

  if (currentUserOnly) {
    columns.splice(1, 1);
  }

  const onRowClick = useCallback(
    (rowData: any) => {
      if (rowData) {
        startTransition(() => {
          goTo(Routes.Workspace, rowData);
        });
      }
    },
    [goTo, startTransition]
  );

  const dataFilter = (data: any[]) =>
    data.filter((workspace) => (workspace as Workspace).author.id === sub);

  return (
    <DataTableSuspense
      columns={columns}
      resource={workspacesResource as unknown as DataTableObservableResource}
      filter={currentUserOnly ? dataFilter : undefined}
      onRowClick={onRowClick}
      disableSelectionOnClick
    />
  );
};

export default WorkspacesTable;
