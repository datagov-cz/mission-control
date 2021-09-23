import React, { ReactNode } from "react";
import { Table, TableRow, TableCell, Paper, TableBody } from "@mui/material";

type KeyValueTableProps = {
  data: {
    key: ReactNode;
    value: ReactNode;
  }[];
  transparent?: boolean;
};

const KeyValueTableInternal: React.FC<KeyValueTableProps> = ({ data }) => {
  return (
    <Table>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell variant="head" sx={{ minWidth: "200px", width: "25%" }}>
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
