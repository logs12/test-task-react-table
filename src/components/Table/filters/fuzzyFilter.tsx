import { matchSorter } from "match-sorter";
import { FilterValue, IdType, Row } from "react-table";

export function fuzzyTextFilter<T extends Record<string, unknown>>(
  rows: Array<Row<T>>,
  id: IdType<T>,
  filterValue: FilterValue
): Array<Row<T>> {
  return matchSorter(rows, filterValue, {
    keys: [(row: Row<T>) => row.values[id]],
  });
}

fuzzyTextFilter.autoRemove = (val: string) => !val;
