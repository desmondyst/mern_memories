import React from "react";

import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Paginate = ({ currentPage }) => {
    const { numberOfPages } = useSelector((state) => state.posts);

    return (
        // refer to MUI documentation under Router integration
        <Pagination
            sx={{ marginTop: "1rem" }}
            count={numberOfPages}
            page={Number(currentPage)}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${item.page}`}
                />
            )}
        />
    );
};

export default Paginate;
