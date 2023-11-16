import styled from "@emotion/styled";
import { Container } from "@mui/material";

export const CustomAppContainer = styled(Container)(({ theme }) => ({
    padding: { xs: "0" },
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}));
