import { TeacherContext } from "@data/contexts/TeacherContext";
import { useRouter } from "next/router";
import { useContext, useMemo, useRef } from "react";
import { UserHeaderMenuContainer, UserMenu } from "./styles";
import { Icon, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import UserProfileAvatar from "@components/data-display/UserProfileAvatar";
import { Router } from "@routes/routes";
import { RouterTypeKeyOf } from "@data/@types/router";

interface UserHeaderMenuProps {
    isMenuOpen?: boolean;
    onClick?: () => void;
    onMenuClick?: (event: React.MouseEvent) => void;
    onMenuClose?: (event: React.MouseEvent) => void;
    handleLogout?: () => void;
}

export default function UserHeaderMenu({isMenuOpen = false, 
    onClick,
    onMenuClick,
    onMenuClose,
    handleLogout
    }: UserHeaderMenuProps) {
        const _router = useRouter();
        const { TeacherState: teacher } = useContext(TeacherContext);
        const containerRef = useRef(null);
        const listMenu = useMemo(() => {
            return handleMenuRouter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [teacher])

        function handleMenuRouter(){

            return Object.keys(Router).map((value) => {
                const _value = value as RouterTypeKeyOf;
                return{
                    nome: value.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase(),
                    router: Router[_value],
                }
            }).filter(({ router }) => {
                return !router.icon;
            })
        }

        return(
            <UserHeaderMenuContainer ref={containerRef}>
                <UserProfileAvatar teacher={teacher} onClick={onClick}/>
                <UserMenu 
                    open={isMenuOpen} 
                    anchorEl={containerRef.current}
                    onClose={onMenuClose}
                    onClick={onMenuClick}
                    anchorOrigin={{
                        vertical:'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                >

                    {listMenu.map(({nome, router}) => {
                        return(
                            <ListItem key={nome} onClick={() => {
                                router.push(_router);
                            }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Icon>
                                            {router.icon}
                                        </Icon>
                                        <ListItemText primary={nome} />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem> 
                        )
                    })}
                    <ListItem onClick={handleLogout}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon>
                                    logout
                                </Icon>
                                <ListItemText primary={'Logout'} />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </UserMenu>
            </UserHeaderMenuContainer>
        )
}