import React, { Suspense } from "react";
import { range } from "lodash";
import { Skeleton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRowData,
  GridRowsProp,
} from "@material-ui/data-grid";
import { ObservableResource, useObservableSuspense } from "observable-hooks";
//import { useIntl } from "react-intl";

const simpleTableOptions = {
  toolbar: false,
  pageSize: 5,
  emptyRowsWhenPaging: false,
  paging: false,
};

const complexTableOptions = {
  toolbar: false,
  pageSize: 10,
  emptyRowsWhenPaging: true,
  paging: true,
};

export type DataColumn = GridColDef;

type DataTableProps = Omit<DataGridProps, "rows"> & {
  type?: "simple" | "complex";
  data: GridRowsProp;
  isLoading: boolean;
};

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
  },
});

const DataTable = ({
  isLoading = false,
  columns,
  data,
  // options = {},
  type = "complex",
  ...rest
}: DataTableProps) => {
  //const intl = useIntl();

  /*const tableLocalization: Localization = {
    body: {
      emptyDataSourceMessage: intl.formatMessage({
        id: "common.noRecordsFound",
      }),
    },
  };*/

  const tableColumns = !isLoading
    ? columns
    : columns.map((column) => ({
        ...column,
        render: () => <Skeleton />,
      }));

  const options = {};
  const tableOptions =
    type === "complex"
      ? { ...complexTableOptions, ...options }
      : { ...simpleTableOptions, ...options };

  const tableData = !isLoading
    ? data
    : (range(tableOptions.pageSize!).map((id) => ({ id })) as GridRowData[]);

  const classes = useStyles();

  return (
    <DataGrid
      // options={tableOptions}
      //localization={tableLocalization}
      {...rest}
      className={classes.root}
      columns={tableColumns}
      rows={tableData}
      autoHeight
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
  filter?: (data: GridRowData[]) => GridRowData[];
};

const DataTableSuspenseInner = ({
  resource,
  filter,
  ...rest
}: DataTableSuspenseProps) => {
  const data = useObservableSuspense(resource);
  const filteredData = filter ? filter(data) : data;
  return (
    <DataTable
      disableColumnMenu
      disableColumnSelector
      disableSelectionOnClick
      {...rest}
      data={filteredData}
      isLoading={false}
    />
  );
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
