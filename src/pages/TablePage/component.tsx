import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Direction } from "re-resizable/lib/resizer";
import { NumberSize, Resizable } from "re-resizable";

import { Table } from "@/components/Table";
import { DataItem } from "@/models/DataModel";
import { CommentsDataAction } from "@/actions/CommentsActionTypes";
import { useLocalStorage } from "@/utils";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "asideLeft header header header asideRight"
    "asideLeft header header header asideRight"
    "asideLeft header header header asideRight"
    "asideLeft content content content asideRight"
    "asideLeft content content content asideRight";
  grid-template-rows: repeat(5, minmax(auto, auto));
  grid-template-columns: repeat(5, 1fr);
  position: absolute;
  width: 100%;
  height: 100%;
`;

const AsideLeft = styled.aside`
  grid-area: asideLeft;
  background: red;
`;
const AsideRight = styled.aside`
  grid-area: asideRight;
  background: green;
`;
const Div1 = styled.div`
  grid-area: header;
`;

const columns = [
  {
    Header: "Name",
    accessor: "name",
    filter: "fuzzyText",
  },
  {
    Header: "Email",
    accessor: "email",
    filter: "fuzzyText",
  },
  {
    Header: "Body",
    accessor: "body",
    filter: "fuzzyText",
  },
];

interface Props {
  data: DataItem[];
  getCommentsDataAction: CommentsDataAction;
}

const defaultTableHeight = 500;

export default ({ data, getCommentsDataAction }: Props) => {
  const [numberPage, setNumberPage] = useState(1);
  const [tableHeight, setTableHeight] = useLocalStorage<number>(
    `tableHeight`,
    defaultTableHeight
  );

  useEffect(() => {
    getCommentsDataAction(numberPage);
  }, []);

  const handleResize = useCallback(
    (
      event: MouseEvent | TouchEvent,
      direction: Direction,
      elementRef: HTMLElement,
      delta: NumberSize
    ) => {
      const { height } = delta;
      setTableHeight(tableHeight + height);
    },
    [setTableHeight, tableHeight]
  );

  const fetchMoreData = () => {
    const newNumberPage = numberPage + 1;
    getCommentsDataAction(newNumberPage);
    setNumberPage(newNumberPage);
  };
  return (
    <Container>
      <AsideLeft />
      <Div1 />
      <Resizable
        defaultSize={{
          width: "auto",
          height: tableHeight,
        }}
        style={{
          gridArea: "content",
          overflow: "hidden",
          background: "#f0f0f0",
        }}
        onResizeStop={handleResize}
      >
        <Table<DataItem>
          name="testTable"
          columns={columns}
          data={data}
          fetchMoreData={fetchMoreData}
          tableHeight={tableHeight}
        />
      </Resizable>
      <AsideRight />
    </Container>
  );
};
