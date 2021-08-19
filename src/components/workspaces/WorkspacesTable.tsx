import React, { useCallback, useTransition } from "react";
import { GridColDef, GridSortModel } from "@material-ui/data-grid";

import Routes from "app/routes";

import t from "components/i18n";
import {
  DataTableObservableResource,
  DataTableSuspense,
} from "components/DataTable";
import UserChip from "components/users/UserChip";
import Tools from "./Tools";
import formatDate from "utils/formatDate";
import useGoTo from "hooks/useGoTo";

import { workspacesResource } from "data/workspaces";

const columns: GridColDef[] = [
  {
    renderHeader: () => t`label`,
    field: "label",
    flex: 1,
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

const sortModel: GridSortModel = [
  {
    field: "label",
    sort: "asc",
  },
];

const WorkspacesTable: React.FC = () => {
  const goTo = useGoTo();
  const [, startTransition] = useTransition();

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

  return (
    <DataTableSuspense
      columns={columns}
      sortModel={sortModel}
      resource={workspacesResource as unknown as DataTableObservableResource}
      onRowClick={onRowClick}
      disableSelectionOnClick
    />
  );
};

export default WorkspacesTable;
