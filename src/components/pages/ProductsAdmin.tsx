import { Alert, Avatar, Box, Snackbar, Button } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { ProductType } from "../../model/ProductType"
import { Delete, Add } from "@mui/icons-material"
import { productsService } from "../../config/products-service-config"
import { useRef, useState } from "react"
import { ProductForm } from "../forms/ProductForm"
export const ProductsAdmin: React.FC = () => {
    const alertMessage = useRef<string>('');
    const [open, setOpen] = useState<boolean>(false)
    const [flAdd, setFlAdd] = useState<boolean>(false)
    const products: ProductType[] =
        useSelector<any, ProductType[]>(state => state.productsState.products);
    const columns: GridColDef[] = [
        { field: "image", headerName: "", flex: 0.3, align: "center", headerAlign: "center", editable: true,
            renderCell: (params) => <Avatar src={params.value} sx={{ width: "90%", height: "80px" }} />},
        { field: "title", headerName: "Title", flex: 0.6,  align: "center", headerAlign: "center" },
        { field: "category", headerName: "Category", flex: 0.5, align: "center", headerAlign: "center" },
        { field: "unit", headerName: "Unit", flex: 0.3 },
        { field: "cost", headerName: "Cost (ILS)", flex: 0.3, editable: true, type: 'number' },
        {
            field: 'actions', type: 'actions', flex: 0.2, getActions: (params) => [
                <GridActionsCellItem label="remove" icon={<Delete></Delete>}
                    onClick={async () => await productsService.removeProduct(params.id as string)} />
            ]
        }
    ]
    async function ubdateCost(newRow: any, oldRow: any): Promise<any> {
        const rowDataNew: ProductType = newRow;
        const rowDataOld: ProductType = oldRow;
        if (rowDataNew.cost < 1 || rowDataNew.cost > rowDataOld.cost * 1.5) {
            throw 'cost must be greater than 0 and cannot be greater than on 50% from the existing cost'
        }
        await productsService.changeProduct(rowDataNew, rowDataNew.id as string)
        return newRow;
    }
    function submitAddProduct(product: ProductType){
        let res = '';
        if (products.find(p => p.title == product.title && p.unit == product.unit)) {
            res = `product ${product.title} with unit ${product.unit} already exists`
        } else {
            productsService.addProduct(product);
        setFlAdd(false);
        }
        
        return res;
    }

    return !flAdd ? <Box sx={{
        width: "100vw", display: "flex", flexDirection: 'column',
        justifyContent: "center", alignItems: 'center'
    }}>
        <Box sx={{ width: "80vw", height: "80vh" }}>
            <DataGrid columns={columns} rows={products} getRowHeight={() => 'auto'}
                processRowUpdate={ubdateCost} onProcessRowUpdateError={(error) => {
                    alertMessage.current = error;
                    setOpen(true);
                }}
            />
        </Box>
        <Button onClick={() => setFlAdd(true)}>
            <Add></Add>
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert severity="error" sx={{ width: '100%', fontSize: "1.5em" }}>
                {alertMessage.current}
            </Alert>
        </Snackbar>
    </Box> : <ProductForm submitFn={submitAddProduct}></ProductForm>
}