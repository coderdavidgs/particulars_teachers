import PageTitle from '@components/data-display/PageTitle'
import { TextField, Icon, Button } from '@mui/material'
import { BoxButton, HomeContainer } from '@styles/pages/index.style'
import useIndex from '@data/hooks/pages/useIndex'

export default function Home() {
  
  const {messageError, setSearch, onSearchTeacher } = useIndex();

  return (
    <HomeContainer onSubmit={onSearchTeacher}>
      <PageTitle 
        title="FIND THE PERFECT TEACHER FOR YOU" 
        subtitle='Search right now'
      />

      <TextField 
        sx={{mt: 3, mb: 1}} 
        label={'Find one Teacher'}
        error={messageError.length > 0}
        helperText={messageError} 
        InputProps={{
          startAdornment: (
            <Icon sx={{mr: 1}}>
              search
            </Icon>
          )
        }}
        fullWidth
        required
        onChange={({target: {value}}) => setSearch(value)}  
      />
      <BoxButton>
        <Button variant='contained' type='submit'>
          Search the perfect teacher
        </Button>
      </BoxButton>
      
    </HomeContainer>
  )
}
