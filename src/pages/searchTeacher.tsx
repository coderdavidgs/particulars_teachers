import PageTitle from '@components/data-display/PageTitle'
import { TextField, Icon, Container } from '@mui/material'
import useSearchTeacher from '@data/hooks/pages/useSearchTeacher'
import TeacherCardList from '@components/data-display/TeacherCard/TeacherCardList'

export default function searchTeacherPage() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { teachers, onSearch, selectTeacher } = useSearchTeacher();

    return (
        <Container>
            <TextField
                sx={{mt: 3, mb: 1}}
                label={'Find one Teacher'}
                InputProps={{
                    startAdornment: <Icon sx={{ mr: 1 }}>search</Icon>
                }}
                onChange={({target: {value}}) => onSearch(value)}
                fullWidth
                required                                                                    
            />
            <PageTitle title='Teachers Found' subtitle='Choose Your Teacher Below'/>
            <TeacherCardList teachers={teachers ?? []} onClick={selectTeacher} />
        </Container>
    )
}