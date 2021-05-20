import React, { PropsWithChildren, ReactElement, useEffect } from "react";
import styled from "styled-components";
import {
  ColumnInstance,
  FilterProps,
  HeaderProps,
  TableOptions,
  useColumnOrder,
  useFilters,
  useFlexLayout,
  useGroupBy,
  useSortBy,
  useTable,
} from "react-table";
import { TableSortLabel, TextField } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { camelToWords } from "@/utils";
import { FilterChipBar } from "./FilterChipBar";
import { fuzzyTextFilter } from "./filters";
import { TableToolbar } from "./TableToolbar";
import { useStyles } from "./TableStyles";

const findFirstColumn = <T extends Record<string, unknown>>(
  columns: Array<ColumnInstance<T>>
): ColumnInstance<T> =>
  columns[0].columns ? findFirstColumn(columns[0].columns) : columns[0];

function DefaultColumnFilter<T extends Record<string, unknown>>({
  columns,
  column,
}: FilterProps<T>) {
  const { id, filterValue, setFilter, render } = column;
  const [value, setValue] = React.useState(filterValue || "");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  // ensure that reset loads the new value
  useEffect(() => {
    setValue(filterValue || "");
  }, [filterValue]);

  const isFirstColumn = findFirstColumn(columns) === column;
  return (
    <TextField
      name={id}
      label={render("Header")}
      InputLabelProps={{ htmlFor: id }}
      value={value}
      autoFocus={isFirstColumn}
      variant="standard"
      onChange={handleChange}
      onBlur={(e) => {
        setFilter(e.target.value || undefined);
      }}
    />
  );
}

const DefaultHeader: React.FC<HeaderProps<any>> = ({ column }) => (
  <>{column.id.startsWith("_") ? null : camelToWords(column.id)}</>
);

const defaultColumn = {
  Filter: DefaultColumnFilter,
  Header: DefaultHeader,
  minWidth: 30,
  width: 150,
  maxWidth: 200,
};

const Styles = styled.div`
  table {
    border-spacing: 0;
    border: 1px solid black;

    width: 100%;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const filterTypes = {
  fuzzyText: fuzzyTextFilter,
};

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  fetchMoreData: () => void;
  tableHeight: number;
}

export function Table<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
): ReactElement {
  const classes = useStyles();
  const instance = useTable<T>(
    {
      ...props,
      filterTypes,
      defaultColumn,
    },
    useColumnOrder,
    useFilters,
    useGroupBy,
    useSortBy,
    useFlexLayout
  );

  const { fetchMoreData, tableHeight } = props;
  const {
    rows,
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    state: { filters },
  } = instance;
  return (
    <Styles>
      <TableToolbar instance={instance} />
      <FilterChipBar<T> instance={instance} />
      <InfiniteScroll
        dataLength={rows.length}
        next={fetchMoreData}
        hasMore={!filters.length}
        height={tableHeight}
        loader={<h4>Loading more items...</h4>}
      >
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.canSort ? (
                        <TableSortLabel
                          active={column.isSorted}
                          direction={column.isSortedDesc ? "desc" : "asc"}
                          {...column.getSortByToggleProps()}
                          className={classes.tableSortLabel}
                        >
                          {column.render("Header")}
                        </TableSortLabel>
                      ) : (
                        <div className={classes.tableLabel}>
                          {column.render("Header")}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </InfiniteScroll>
    </Styles>
  );
}
