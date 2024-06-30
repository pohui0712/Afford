import { Table, Skeleton } from "@radix-ui/themes";
import React from "react";

const SkeletonTable = () => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            <Skeleton />
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Skeleton />
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Skeleton />
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>
            <Skeleton />
          </Table.RowHeaderCell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>
            <Skeleton />
          </Table.RowHeaderCell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>
            <Skeleton />
          </Table.RowHeaderCell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

export default SkeletonTable;
