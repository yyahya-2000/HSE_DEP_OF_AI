import { Box, Pagination } from "@mui/material";
import { FC } from "react";
import { usePagingStyles } from "./Paging.style";
import { PagingProps } from "./Paging.types";

const Paging: FC<PagingProps> = ({ paging, onChange }) => {
  const { classes } = usePagingStyles();
  const handlePageChange = (_, page: number) => {
    if (page - 1 === paging.page) return;
    onChange(page - 1);
  };

  if (paging.count < 2) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" paddingTop={"30px"}>
      <Pagination
        className={classes.root}
        count={paging.count}
        page={paging.page + 1}
        boundaryCount={paging.count > 10 ? 1 : undefined}
        onChange={handlePageChange}
        showFirstButton={paging.count > 10 && paging.page > 0}
        showLastButton={paging.count < paging.psize && paging.count > 10}
        hidePrevButton={paging.page === 0}
        hideNextButton={paging.page + 1 === paging.count}
      />
    </Box>
  );
};

export default Paging;
