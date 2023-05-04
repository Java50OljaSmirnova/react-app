import { Alert, Avatar, Box, Snackbar } from "@mui/material"
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { ProductType } from "../../model/ProductType"
import { Delete } from "@mui/icons-material"
import { productsService } from "../../config/products-service-config"
import { useRef, useState } from "react"
export const ProductsAdmin: React.FC = () => {
    const alertMessage = useRef<string>('');
    const [open, setOpen] = useState<boolean>(false)
    const products: ProductType[] = 
        useSelector<any, ProductType[]>(state => state.productsState.products);
    const columns: GridColDef[] = [
        {field: "image", headerName: "", flex: 0.8, 
        renderCell: (params) => <Avatar src={`images/${params.value}`}
        sx={{width: "30%", height: "80px"}}/>, align: "center", headerAlign: "center"},
        {field: "title", headerName: "Title", flex: 0.8},
        {field: "category", headerName: "Category", flex: 0.5},
        {field: "unit", headerName: "Unit", flex: 0.4},
        {field: "cost", headerName: "Cost (ILS)", flex: 0.3, editable: true, type: 'number'},
        {field: 'actions', type: 'actions', flex: 0.1, getActions: (params) => [
            <GridActionsCellItem label="remove" icon={<Delete></Delete>} 
            onClick={async () => await productsService.removeProduct(params.id as string)}/>
        ]}
    ]
    async function ubdateCost(newRow: any, oldRow: any): Promise<any> {
        const rowDataNew: ProductType = newRow;
        const rowDataOld: ProductType = oldRow;
        if(rowDataNew.cost < 1 || rowDataNew.cost > rowDataOld.cost * 1.5){
            throw 'cost must be greater than 0 and cannot be greater than on 50% from the existing cost'
        }
        await productsService.changeProduct(rowDataNew, rowDataNew.id as string)
        return newRow;
    }
    return <Box sx={{width: "100vw",display: "flex", justifyContent:"center"}}>
    <Box sx={{width: "80vw",height: "80vh"}}>
    <DataGrid columns={columns} rows={products} getRowHeight={() => 'auto'}
    processRowUpdate={ubdateCost} onProcessRowUpdateError={(error) => {
        alertMessage.current = error;
        setOpen(true);
    }}
    />
</Box>
<Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
  <Alert severity="error" sx={{ width: '100%', fontSize: "1.5em" }}>
    {alertMessage.current}
  </Alert>
</Snackbar>
</Box>
}