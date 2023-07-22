import Link from "@components/navigation/Link";
import { AppBar, Box, Container, Drawer, Icon, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { BoxDrawer, ButtonStyle } from "./styles";
import { useTheme } from "@mui/material";
import { Router } from "@routes/routes";
import { useRouter } from "next/router";

function LinkLogo(){
    return(
        <Link href="/">
            <Image src="/logo.png" alt="yourteacher" width={200} height={30}/>
        </Link>
    )
}

export default function Base({children}: PropsWithChildren){
    const { breakpoints, palette: {common} } = useTheme();
    const isSmDevice = useMediaQuery(breakpoints.up('sm'));
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const router = useRouter();

    function onRegisterTeacher() {
        Router.registerTeacher.push(router);
    }

    return(
        <Box sx={{height: "100%", minHeight: "100vh", width: "100%", bgcolor: common.white}}>
            <AppBar position="static">
                <Toolbar component={Container}>

                    {isSmDevice ? (

                            <Box sx={{display: "flex", justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>

                                                    
                            <Link href="/">
                                <LinkLogo />
                            </Link>


                            <Box sx={{display: 'flex', alignItems: 'center'}}> 
                                <Link href="/"  color={'inherit'}>
                                    HOME
                                </Link>

                                <Link href="/login"  color={'inherit'} sx={{ml: 5, mr: 5}}>
                                    LOGIN
                                </Link>

                                <ButtonStyle variant="outlined" onClick={onRegisterTeacher}>
                                    BECOME A TEACHER
                                </ButtonStyle>
                            </Box>
                            </Box>

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

                                <BoxDrawer>
                                    <div className="linkImage">
                                        <Link href="/">
                                            <LinkLogo />
                                        </Link>
                                    </div> 

                                    <Box sx={{display: 'flex', 
                                        flexDirection: 'column',
                                        ml: 3,
                                        mr: 5
                                    }}>
                                        <Link href="/" sx={{my: 3}}>
                                            Home
                                        </Link>

                                        <Link href="/login" sx={{my: 3}}>
                                            Login
                                        </Link>

                                        <Link href="/" sx={{my: 3}}>
                                            Become a teacher
                                        </Link>
                                    </Box>
                                    
                                </BoxDrawer>
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