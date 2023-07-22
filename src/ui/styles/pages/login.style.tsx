import { Button, styled } from "@mui/material";

export const BoxButtons = styled('div')`
    max-width: /*${({theme}) => theme.breakpoints.values.xs}*/300px;
`;

export const ButtonRecAccount = styled(Button)`
    &.MuiButton-root{
        text-decoration: underline;
    }
`;