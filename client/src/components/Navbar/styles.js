import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
}));

export const CustomTypography = styled(Typography)(({ theme }) => ({
    color: "rgba(0,183,255, 1)",
}));
