import { Avatar, Box } from "@mui/material"
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { ProductType } from "../../model/ProductType"
export const ProductsAdmin: React.FC = () => {
    const products: ProductType[] = 
        useSelector<any, ProductType[]>(state => state.productsState.products);
    const columns: GridColDef[] = [
        {field: "image", headerName: "Image", flex: 1, 
        renderCell: (params) => <Avatar src={`images/${params.value}`}
        sx={{width: "30%", height: "80px"}}/>, align: "center", headerAlign: "center"},
        {field: "title", headerName: "Title", flex: 0.8},
        {field: "category", headerName: "Category", flex: 0.5},
        {field: "unit", headerName: "Unit", flex: 0.4},
        {field: "cost", headerName: "Cost (ILS)", flex: 0.3}
    ]
    return <Box sx={{width: "80vw", heigth: "80%"}}>
        <DataGrid columns={columns} rows={products} getRowHeight={() => 'auto'}/>
    </Box>
}