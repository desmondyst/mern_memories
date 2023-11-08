import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomCard = styled(Card)(() => ({
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
    height: "100%",
    position: "relative",
}));

export const CustomCardMedia = styled(CardMedia)(() => ({
    position: "absolute",
    width: "100%",
    height: "50%",
}));

export const CustomContainer = styled(Container)(() => ({
    paddingTop: "1rem",
}));
