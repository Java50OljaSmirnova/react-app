import { Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, IconButton } from "@mui/material"
import { useSelector } from "react-redux"
import { ProductType } from "../../model/ProductType"
import { ReactNode } from "react";
import { Add, Remove } from "@mui/icons-material";

export const ProductsClient: React.FC = () => {
    const products = useSelector<any, ProductType[]>
        (state => state.productsState.products);

    function getProductCards(): ReactNode {
        return products.map(p => <Grid item xs={8} sm={5} md={3}>
            <Card>
                <CardMedia sx={{ height: 180 }} image={`images/${p.image}`} />
                <CardContent sx={{
                    textAlign: "center",
                    backgroundColor: "aliceblue"
                }}>
                    <Typography gutterBottom sx={{ fontSize: "1.3em" }} >
                        {p.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: "1.1em" }}>
                        {p.unit}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: "1.1em" }}>
                        {p.cost} <img src="images/israeli-shekel-icon.svg" width="6%" />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container spacing={0} justifyContent="center" >
                        <Grid item xs={4}><Button size="large" ><Add/></Button></Grid>
                        <Grid item xs={4}><Typography sx={{fontSize: "1.2em",display: "flex",width: "100%",height:"100%",alignItems: "center", justifyContent: "center"}}>0</Typography></Grid>
                        <Grid item xs={4}><Button size="large"><Remove></Remove></Button></Grid>
                    </Grid>
                    
                    
                    
                </CardActions>
            </Card>
        </Grid>)
    }

    return <Grid container spacing={6} justifyContent="center">
        {getProductCards()}
    </Grid>
}