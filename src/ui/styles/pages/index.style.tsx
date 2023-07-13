import { styled } from "@mui/material";

export const HomeContainer = styled('form')`
    max-width: ${({theme}) => theme.breakpoints.values.md}px;
    margin: auto;
`;

export const BoxButton = styled('div')`
    max-width: ${({theme}) => theme.breakpoints.values.md}px;
    margin: auto;
    text-align: center;
    margin-top: ${({theme}) => theme.spacing(2)};
`;