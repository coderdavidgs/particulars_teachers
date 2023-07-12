import { styled } from '@mui/material/styles';
import  Typography  from '@mui/material/Typography';
import { TypographyProps } from '@mui/material/Typography';

export const PageTitleContainer = styled('div')`
    margin: ${(props) => props.theme.spacing(5, 0)};
    text-align: center;
`;

export const PageTitleStyled = styled((props) => ( 

    <Typography variant='h5' component={"h2"} {...props} />

    ))<TypographyProps>`
    text-transform: uppercase;
    font-weight: bold;
    
    ${({theme}) => theme.breakpoints.down('md')}{
        font-size: ${({theme}) => theme.typography.body1.fontSize};
    }
`;

export const PageSubTitleStyled = styled((props) => (
    <Typography variant='body1' component={"h3"} {...props} />
))<TypographyProps>`
    color: ${({theme}) => theme.palette.text.primary};
    text-transform: lowercase;
    ${({theme}) => theme.breakpoints.down('md')}{
        font-size: ${({theme}) => theme.typography.body2.fontSize};
    }
`;