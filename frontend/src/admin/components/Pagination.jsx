import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Pagination = ({ itemCount, pageSize, currentPage, onPageChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("itemCount:", itemCount);
  console.log("pageSize:", pageSize);
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return;

  const changePage = (page) => {
    if (page < 1 || page > pageCount || page === currentPage) {
      return;
    }
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    navigate({ search: params.toString() });
    onPageChange(page);
  };

  return (
    <Flex align="center" gap="2" mt="1">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <FaAngleDoubleLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <FaAngleLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <FaAngleRight />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <FaAngleDoubleRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
