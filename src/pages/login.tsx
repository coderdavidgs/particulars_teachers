import PageTitle from "@components/data-display/PageTitle";
import useLogin from "@data/hooks/pages/useLogin";
import { Box, Button, Card, CircularProgress, Snackbar, TextField } from "@mui/material";
import { BoxButtons, ButtonRecAccount } from "@styles/pages/login.style";

export default function LoginPage(){
    const {setSnackMessage, setValuesLogin, messageError, snackMessage, handleLogin, loading} = useLogin();

    return (
        <Box sx={{maxWidth: 'md', 
            mx: 'auto', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'    
        }}>

            <PageTitle title="Do it your Login" subtitle="See your classes"/>

            <Card 
                sx={{py: 2, px: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                component={"form"}
                onSubmit={handleLogin}
            >

                <TextField 
                    label={'Email'} 
                    sx={{my: 2}} 
                    type={'email'} 
                    fullWidth
                    error={messageError?.email !== undefined}
                    helperText={messageError?.email}
                    onChange={({target: {value}})=> setValuesLogin((prevState) =>{ 
 
                        return {...prevState, email: value}
                        
                    })}
                />

                <TextField 
                    label={'Password'} 
                    type={'password'} 
                    fullWidth
                    error={messageError?.password !== undefined}
                    helperText={messageError?.password}
                    onChange={({target: {value }})=> setValuesLogin((prevState) =>{ 

                        return {...prevState, password: value}
                        
                    })}
                />

                <BoxButtons>
                    <Button sx={{my: 2}} variant={"contained"} fullWidth type={"submit"}>
                        {!loading ? "Login" : <CircularProgress  color={'primary'} />}
                    </Button>
                    <ButtonRecAccount size={"small"} fullWidth>
                        Dont have an account? Register here
                    </ButtonRecAccount>
                </BoxButtons>

            </Card>
            
            <Snackbar 
                open={snackMessage.length > 0}
                message={snackMessage}
                onClose={() => setSnackMessage('')}
                autoHideDuration={4000}
            />
        </Box>
    )
}