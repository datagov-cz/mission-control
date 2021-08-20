import React, { Suspense, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRowData,
  GridRowsProp,
  GridSortModel,
} from "@material-ui/data-grid";
import { ObservableResource, useObservableSuspense } from "observable-hooks";

export type DataColumn = GridColDef;

type DataTableProps = Omit<DataGridProps, "rows"> & {
  data: GridRowsProp;
  isLoading: boolean;
  defaultSortModel?: GridSortModel;
};

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
  },
  row: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  cell: {
    "&:focus": {
      outline: "none !important",
    },
  },
  columnHeader: {
    "&:focus": {
      outline: "none !important",
    },
  },
});

const DataTable = ({
  isLoading = false,
  columns,
  data,
  defaultSortModel,
  ...rest
}: DataTableProps) => {
  const classes = useStyles();
  const [sortModel, setSortModel] = useState(defaultSortModel);

  return (
    <DataGrid
      {...rest}
      classes={classes}
      columns={columns}
      rows={data}
      autoHeight
      loading={isLoading}
      sortModel={sortModel}
      onSortModelChange={(model) => setSortModel(model)}
      sortingOrder={["asc", "desc"]}
      disableColumnMenu
      disableColumnSelector
      disableSelectionOnClick
    />
  );
};

export default DataTable;

export type DataTableObservableResource = ObservableResource<
  GridRowData[],
  GridRowData[]
>;

type DataTableSuspenseProps = Omit<DataTableProps, "data" | "isLoading"> & {
  resource: ObservableResource<GridRowData[], GridRowData[]>;
};

const DataTableSuspenseInner = ({
  resource,
  ...rest
}: DataTableSuspenseProps) => {
  const data = useObservableSuspense(resource);
  return <DataTable {...rest} data={data} isLoading={false} />;
};

export const DataTableSuspense = ({
  resource,
  ...rest
}: DataTableSuspenseProps) => {
  return (
    <Suspense fallback={<DataTable {...rest} data={[]} isLoading={true} />}>
      <DataTableSuspenseInner resource={resource} {...rest} />
    </Suspense>
  );
};
