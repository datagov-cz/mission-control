import React from "react";
import {
  GridColDef,
  GridSortModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import { Workspace } from "@types";

import t from "components/i18n";
import {
  DataTableObservableResource,
  DataTableSuspense,
} from "components/DataTable";
import UserChip from "components/users/UserChip";
import RouteLink from "components/RouteLink";
import Tools from "./Tools";
import formatDate from "utils/formatDate";

import { workspacesResource } from "data/workspaces";

const columns: GridColDef[] = [
  {
    renderHeader: () => t`label`,
    field: "label",
    renderCell: (params) => (
      <RouteLink route="/workspace/:id" params={{ id: params.row.id }}>
        {params.row.label}
      </RouteLink>
    ),
    flex: 1,
  },
  {
    field: "owner",
    renderHeader: () => t`owner`,
    renderCell: (params) => <UserChip {...params.row.author} />,
    valueGetter: (cellParams: GridValueGetterParams) =>
      cellParams.row.author.initials,
    width: 150,
  },
  {
    field: "lastEditor",
    renderHeader: () => t`lastEditor`,
    renderCell: (params) =>
      params.row.lastEditor && <UserChip {...params.row.lastEditor} />,
    valueGetter: (cellParams: GridValueGetterParams) =>
      cellParams.row.author.initials,
    width: 150,
  },
  {
    field: "lastModified",
    renderHeader: () => t`lastModified`,
    renderCell: (params) =>
      params.row.lastModified && formatDate(params.row.lastModified),
    valueGetter: (cellParams: GridValueGetterParams) =>
      cellParams.row.lastModified,
    width: 200,
  },
  {
    field: "actions",
    renderHeader: () => t`actions`,
    renderCell: (params) => <Tools workspace={params.row as Workspace} />,
    width: 350,
    sortable: false,
  },
];

const defaultSortModel: GridSortModel = [
  {
    field: "label",
    sort: "asc",
  },
];

const WorkspacesTable: React.FC = () => {
  return (
    <DataTableSuspense
      columns={columns}
      defaultSortModel={defaultSortModel}
      resource={workspacesResource as unknown as DataTableObservableResource}
      disableSelectionOnClick
    />
  );
};

export default WorkspacesTable;
