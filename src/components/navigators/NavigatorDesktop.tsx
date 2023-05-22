import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { ReactNode, useEffect } from "react";
import { RouteType } from "../../model/RouteType";
export type Props = {
    subnav?: boolean,
    routes: RouteType[]
}
export const NavigatorDesktop: React.FC<Props> = ({ subnav, routes }) => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!subnav) {
            if (routes.length > 0) {
                let routeIndex = routes.findIndex(r => r.path == location.pathname)
                if (routeIndex < 0) {
                    routeIndex = 0;
                }
                navigate(routes[routeIndex].path);
                setValue(routeIndex)
            }
        }

    }, [routes])
    const handleChange = (event: any, newValue: number) => {
        setValue(newValue)
    };
    function getTabs(): ReactNode {
        return routes.map((route, index) => <Tab key={index} component={Link}
            to={route.path} label={route.label} />)
    }
    return <Box sx={{ marginTop: "10vh" }}>
        <AppBar sx={{ backgroundColor: "lightgray" }}>
            <Tabs value={value > routes.length ? 0 : value} onChange={handleChange}>
                {getTabs()}
            </Tabs>
        </AppBar>
        <Outlet></Outlet>
    </Box>
}