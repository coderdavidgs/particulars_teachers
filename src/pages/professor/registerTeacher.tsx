import PageTitle from "@components/data-display/PageTitle";
import useRegisterTeacher from "@data/hooks/pages/professor/useRegisterTeacher";
import { Box, Button, Card, CircularProgress, Snackbar, TextField } from "@mui/material";
import { BoxButtons } from "@styles/pages/teacher/registerTeacher.style";
import CurrencyInputMask from "@components/inputs/CurrencyInputMask";

export default function RegisterTeacherPage(){
    const {
        valuesRegister,
        setSnackMessage, 
        messageError,
        snackMessage,
        setValuesRegister,
        handleSubmit,
        loading
    } = useRegisterTeacher();

    return(
        <>
            <PageTitle title="Register Teacher" />
            <Box sx={{maxWidth: 'md', mx: 'auto', my: 3}}>

                <Card sx={{p: 3}}>

                    <TextField 
                        label={'Name'}
                        sx={{my: 2}}
                        fullWidth
                        error={messageError?.nome != undefined}
                        helperText={messageError?.nome}
                        onChange={({target: {value}}) => setValuesRegister((prevState) => {
                            return {...prevState, nome: value}
                        })}
                    />

                    <TextField 
                        label={'Age'}
                        sx={{my: 2}}
                        type={'number'}
                        fullWidth
                        error={messageError?.idade != undefined}
                        helperText={messageError?.idade}
                        onChange={({target: {value}}) => setValuesRegister((prevState) => {
                            return {...prevState, idade: Number(value)}
                        })}
                    />

                    <TextField 
                        label={'Price'}
                        sx={{my: 2}}
                        fullWidth
                        error={messageError?.valor_hora != undefined}
                        helperText={messageError?.valor_hora}
                        onChange = {({ target: { value } }) => {
                            setValuesRegister((prevState) => ({
                                ...prevState,
                                valor_hora: value,
                            }));
                        }}
                    />

                    <TextField 
                        label={'Description'}
                        sx={{my: 2}}
                        fullWidth
                        rows={4}
                        multiline
                        error={messageError?.descricao != undefined}
                        helperText={messageError?.descricao}
                        onChange={({target: {value}}) => setValuesRegister((prevState) => {
                            return {...prevState, descricao: value}
                        })}
                    />

                </Card>

                <Card sx={{p:3, my: 5}}>

                    <TextField 
                        label={'Email'}
                        type={"email"}
                        sx={{my: 2}}
                        fullWidth
                        error={messageError?.email != undefined}
                        helperText={messageError?.email}
                        onChange={({target: {value}}) => setValuesRegister((prevState) => {
                            return {...prevState, email: value}
                        })}
                    />

                    <TextField 
                        label={'Password'}
                        type={"password"}
                        sx={{my: 2}}
                        fullWidth
                        error={messageError?.password != undefined}
                        helperText={messageError?.password}
                        onChange={({target: {value}}) => setValuesRegister((prevState) => {
                            return {...prevState, password: value}
                        })}
                    />

                    <TextField 
                        label={'Confirm Password'}
                        type={"password"}
                        sx={{my: 2}}
                        fullWidth
                        error={messageError?.password_confirmation != undefined}
                        helperText={messageError?.password_confirmation}
                        onChange={({target: {value}}) => setValuesRegister((prevState) => {
                            return {...prevState, password_confirmation: value}
                        })}
                    />

                </Card>

                <BoxButtons>
                    <Button variant={"contained"} fullWidth onClick={handleSubmit}>
                        {!loading ? 'Register' : <CircularProgress color="primary" />}
                    </Button>
                </BoxButtons>
            </Box>
            <Snackbar 
                open={snackMessage.length > 0}
                message={snackMessage}
                autoHideDuration={4000}
                onClose={() => setSnackMessage('')}
            />
        </>
    )
}