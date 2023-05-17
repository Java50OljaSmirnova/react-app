import { AppBar, Box, Drawer, IconButton, List, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { MenuOpen, ChevronLeft } from "@mui/icons-material"
import { RouteType } from "../../model/RouteType"
import { ReactNode, useState } from "react"
import { Link, Outlet} from "react-router-dom"

export type Props = {
    subnav?: boolean,
    routes: RouteType[]
}
export const NavigatorPortrait: React.FC<Props> = ({ subnav, routes }) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function getTabs(): ReactNode {
        return routes.map((route, index) => <Tab key={index} component={Link}
            to={route.path} label={route.label} onClick={handleDrawerClose}/>)
    }
    return (
        <Box sx={{ marginTop: "13vh" }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        onClick={handleDrawerOpen}
                        sx={{ color: "white", mr: 2, ...(open && { display: 'none' }) }}>
                        <MenuOpen />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Bakery application
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer 
                variant="persistent"
                anchor="left"
                open={open}
                onClose={handleDrawerClose}>
                <IconButton onClick={handleDrawerClose}>
                <ChevronLeft />
                </IconButton>
                <List sx={{display: "flex", flexDirection: "column"}}>        
                {getTabs()}
                </List>
            </Drawer>
            <Outlet />
        </Box>
    );
}