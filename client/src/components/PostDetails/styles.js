import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomPaper = styled(Paper)(() => ({
    borderRadius: "1rem",
}));

export const CustomImage = styled("img")(() => ({
    borderRadius: "1rem",
    height: "300px",
    width: "100%",
    objectFit: "cover",
}));
