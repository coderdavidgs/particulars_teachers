import { TeacherContext } from "@data/contexts/TeacherContext";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import { UserHeaderMenuContainer, UserMenu } from "./styles";
import { Icon, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface UserHeaderMenuProps {

}

export default function UserHeaderMenu(props: UserHeaderMenuProps) {
    const router = useRouter();
    const { TeacherState } = useContext(TeacherContext);
    const containerRef = useRef(null);

    return(
        <UserHeaderMenuContainer ref={containerRef}>
            Avatar
            <UserMenu open={true} anchorEl={containerRef.current}
                anchorOrigin={{
                    vertical:'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <ListItem>
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