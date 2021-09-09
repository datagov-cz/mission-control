import React, { ReactNode } from "react";
import {
  Table,
  TableRow,
  TableCell,
  Paper,
  Theme,
  TableBody,
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) => ({
  headCell: {
    minWidth: 200,
    width: "25%",
  },
}));

type KeyValueTableProps = {
  data: {
    key: ReactNode;
    value: ReactNode;
  }[];
  transparent?: boolean;
};

const KeyValueTableInternal: React.FC<KeyValueTableProps> = ({ data }) => {
  const styles = useStyles();
  return (
    <Table>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell variant="head" className={styles.headCell}>
              {row.key}
            </TableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const KeyValueTable: React.FC<KeyValueTableProps> = ({ data, transparent }) =>
  transparent ? (
    <KeyValueTableInternal data={data} />
  ) : (
    <Paper>
      <KeyValueTableInternal data={data} />
    </Paper>
  );

export default KeyValueTable;
