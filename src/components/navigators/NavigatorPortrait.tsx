import { AppBar, Box, Drawer, IconButton, List, ListItem, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { MenuOpen, ChevronLeft } from "@mui/icons-material"
import { RouteType } from "../../model/RouteType"
import { ReactNode, useEffect, useState } from "react"
import { Link, Outlet, useLocation, useNavigate} from "react-router-dom"

export type Props = {
    subnav?: boolean,
    routes: RouteType[]
}
export const NavigatorPortrait: React.FC<Props> = ({ routes }) => {
    const [flOpen, setOpen] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if(routes.length > 0) {
            let routeIndex = routes.findIndex(r => r.path == location.pathname)
            if(routeIndex < 0) {
                routeIndex = 0;
            }
            navigate(routes[routeIndex].path);
        }
        }, [routes]);
    
    function toggleOpen () {
        setOpen(!flOpen);
    };
    function getTitle(): string {
        const route = routes.find(r => r.path === location.pathname)
        return route ? route.label : '';
    }
    function getListenItems(): ReactNode {
        return routes.map(route => <ListItem onClick={toggleOpen} 
            component={Link} to={route.path} key={route.path}>{route.label}</ListItem>)
    }
    return (
        <Box sx={{ marginTop: "13vh" }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        onClick={toggleOpen}
                        sx={{ color: "white", mr: 2, ...(flOpen && { display: 'none' }) }}>
                        <MenuOpen />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {getTitle()}
                    </Typography>
                    <Drawer 
                // variant="persistent"
                anchor="left"
                open={flOpen}
                onClose={toggleOpen}>
                <IconButton onClick={toggleOpen}>
                <ChevronLeft />
                </IconButton>
                <List sx={{display: "flex", flexDirection: "column"}}>        
                {getListenItems()}
                </List>
            </Drawer>
                </Toolbar>
            </AppBar>
            
            <Outlet />
        </Box>
    );
}