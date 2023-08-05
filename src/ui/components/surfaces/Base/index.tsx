import Link from "@components/navigation/Link";
import { AppBar, Box, Container, Drawer, Icon, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { PropsWithChildren, useContext, useState } from "react";
import { BoxDrawer, ButtonStyle } from "./styles";
import { useTheme } from "@mui/material";
import { Router } from "@routes/routes";
import { NextRouter, useRouter } from "next/router";
import UserHeaderMenu from "@components/navigation/UserHeaderMenu";
import { TeacherContext } from "@data/contexts/TeacherContext";
import { teacher } from "@data/@types/teacher";
import { ApiService } from "@data/services/ApiService";

function LinkLogo({ teacher }: {teacher?: teacher}){
    return(
        <Link href={teacher?.id ? '/teacher' : '/'}>
            <Image src="/logo.png" alt="yourteacher" width={200} height={30}/>
        </Link>
    )
}

export default function Base({children}: PropsWithChildren){
    const { breakpoints, palette: {common} } = useTheme();
    const isSmDevice = useMediaQuery(breakpoints.up('sm'));
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const router = useRouter();
    const { TeacherState, TeacherDispatch } = useContext(TeacherContext);

    async function handleLogout(){
        await ApiService.post('/api/auth/logout', { refresh_token: localStorage.getItem('refresh_token_yourteacher')}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_yourteacher')}`
            } })
            .then(() => {
                localStorage.removeItem('token_yourteacher');
                localStorage.removeItem('refresh_token_yourteacher');
                TeacherDispatch(undefined);
                Router.login.push(router);
            });
    }

    return(
        <Box sx={{height: "100%", minHeight: "100vh", width: "100%", bgcolor: common.white}}>
            <AppBar position="static">
                <Toolbar component={Container}>

                    {isSmDevice ? (

                        <HeaderDesktop router={router} teacherState={TeacherState} onLogout={handleLogout}/>

                    ) : (
                        <>
                            <IconButton color={'inherit'} sx={{mr: 2}} onClick={() => setIsOpenDrawer(true)}>
                                <Icon >
                                    menu
                                </Icon>
                            </IconButton>
                            <Drawer open={isOpenDrawer} 
                                onClick={() => setIsOpenDrawer(false)} 
                                onClose={() => setIsOpenDrawer(false)}
                            >

                                <HeaderMobile teacherState={TeacherState} onLogout={handleLogout}/>
                            </Drawer>
                            <Link href="/">
                                <LinkLogo />
                            </Link>
                        </>
                    )}

                    
                </Toolbar>
            </AppBar>
            <Container component={'main'}>
                {children}
            </Container>
        </Box>
    )
}

interface HeaderDesktopProps{
    router: NextRouter;
    teacherState?: teacher;
    onLogout?: () => void;
}

function HeaderDesktop({ router, teacherState, onLogout }: HeaderDesktopProps) {
    const [openMenu, setOpenMenu] = useState(false);

    function onRegisterTeacher() {
        Router.registerTeacher.push(router);
    }


    return (
        <Box sx={{display: "flex", justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>

                                                    
             
            <LinkLogo teacher={teacherState}/>


            <Box sx={{display: 'flex', alignItems: 'center'}}> 
                {teacherState?.id ? (
                    <>
                        <Link href="/professor"  color={'inherit'} sx={{mx: 2}}>
                            Student List
                        </Link>

                        <UserHeaderMenu 
                            isMenuOpen={openMenu} 
                            onMenuClick={() => setOpenMenu(false)} 
                            onMenuClose={() => setOpenMenu(false)}
                            onClick={() => setOpenMenu(true)}
                            handleLogout={onLogout}
                        />
                    </>
                ) : (
                    <>
                        <Link href="/"  color={'inherit'}>
                            HOME
                        </Link>

                        <Link href="/login"  color={'inherit'} sx={{ml: 5, mr: 5}}>
                            LOGIN
                        </Link>

                        <ButtonStyle variant="outlined" onClick={onRegisterTeacher}>
                            BECOME A TEACHER
                        </ButtonStyle>
                    </>
                )}
            </Box>
        </Box>
    )
}

interface HeaderMobileProps{
    teacherState?: teacher;
    onLogout?: () => void;
}

function HeaderMobile({ teacherState, onLogout }: HeaderMobileProps){

    return(
        <BoxDrawer>
            <div className="linkImage">
                <Link href="/">
                    <LinkLogo teacher={teacherState}/>
                </Link>
            </div> 

            {teacherState?.id ? (
                <MenuListDrawerLinks>
                    <Link href="/teacher">
                        Student List
                    </Link>

                    <Link href="/" sx={{my: 3}}>
                        Become a teacher
                    </Link>

                    <Link href="/login" onClick={onLogout}>
                        Logout
                    </Link>
                </MenuListDrawerLinks>
            ) : (
                <MenuListDrawerLinks>
                    <Link href="/" sx={{my: 3}}>
                        Home
                    </Link>

                    <Link href="/login" sx={{my: 3}}>
                        Login
                    </Link>

                    <Link href="/" sx={{my: 3}}>
                        Become a teacher
                    </Link>
                </MenuListDrawerLinks>
            )}
            
        </BoxDrawer>
    )
}

function MenuListDrawerLinks({children}: PropsWithChildren){

    return(
        <Box sx={{display: 'flex', 
            flexDirection: 'column',
            ml: 3,
            mr: 5}}
        >
            {children}
        </Box>
    )
}