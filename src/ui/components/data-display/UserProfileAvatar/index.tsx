import { teacher } from "@data/@types/teacher";
import { Button, Grid, Icon, Skeleton } from "@mui/material";
import { UserAvatar } from "./style";

interface UserProfileAvatarProps{
    onClick?: () => void;
    teacher?: teacher;
}

export default function UserProfileAvatar({ onClick, teacher }: UserProfileAvatarProps){

    const hasUser = teacher !== undefined && teacher.nome.length > 0;

    return(
        <>
            <Button color="inherit" onClick={onClick}>
                <Grid container spacing={1} wrap={"nowrap"}>
                    <Grid item>
                        {hasUser ? (
                            <UserAvatar alt={teacher?.nome} src={teacher?.foto_perfil}>
                                {teacher?.nome[0]}
                            </UserAvatar>
                        ) : (
                            <Skeleton width={40} height={40} variant={'circular'} animation={"wave"}/>
                        )}
                        
                    </Grid>

                    <Grid item container spacing={1} alignItems={'center'}>
                            {hasUser ? (
                                <Grid item>
                                    {teacher?.nome}
                                </Grid>
                            ): (
                                <Skeleton width={100} variant={'text'} animation={"wave"}/>
                            )}

                            <Grid item>
                                <Icon>
                                    arrow_drop_down
                                </Icon>
                            </Grid>
                    </Grid>
                </Grid>
            </Button>
        </>
    )
}