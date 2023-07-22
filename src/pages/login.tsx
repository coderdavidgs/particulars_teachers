import PageTitle from "@components/data-display/PageTitle";
import { Box, Button, Card, TextField } from "@mui/material";
import { BoxButtons, ButtonRecAccount } from "@styles/pages/login.style";

export default function LoginPage(){

    return (
        <Box sx={{maxWidth: 'md', 
            mx: 'auto', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'    
        }}>

            <PageTitle title="Do it your Login" subtitle="See your classes"/>

            <Card sx={{py: 2, px: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <TextField label={'Email'} sx={{my: 2}} type={'email'} fullWidth/>
                <TextField label={'Password'} type={'password'} fullWidth/>
                <BoxButtons>
                    <Button sx={{my: 2}} variant={"contained"} fullWidth>
                        Login
                    </Button>
                    <ButtonRecAccount size={"small"} fullWidth>
                        Dont have an account? Register here
                    </ButtonRecAccount>
                </BoxButtons>
            </Card>

        </Box>
    )
}