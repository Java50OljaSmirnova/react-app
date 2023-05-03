import { useSelector } from "react-redux"
import { ShoppingDataType } from "../../model/ShoppingDataType"
import { ProductType } from "../../model/ProductType"
import { ShoppingProductType } from "../../model/ShoppingProductType";
import { GridColDef, DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Alert, Avatar, Box, Snackbar, Typography } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { ordersService } from "../../config/orders-service-config";
import { Delete } from "@mui/icons-material";

export const ShoppingCart: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const alertMessage = useRef<string>('');
    const products = useSelector<any, ProductType[]> (state => state.productsState.products);
    const shopping = useSelector<any, ShoppingProductType[]> (state => state.shoppingState.shopping);
    const authUser = useSelector<any, string> (state => state.auth.authUser);
    const columns: GridColDef[] = [
        {field: "image", headerName: "", flex: 0.5, sortable: false, 
        renderCell: (params) => <Avatar src={`images/${params.value}`}
        sx={{width: "50%", height: "80px"}}/>, align: "center", headerAlign: "center"},
        {field: "title", headerName: "Title", flex: 0.8, align: 'center', headerAlign: 'center'},
        {field: "unit", headerName: "Unit", flex: 0.3},
        {field: "cost", headerName: "Cost (ILS)", flex: 0.3, type: 'number'},
        {field: "count", headerName: "Count", flex: 0.2, editable: true, type: 'number'},
        {field: "price", headerName: "Price", flex: 0.3, type: 'number'},
        {field: "actions", type: 'actions', flex: 0.1, getActions: (params) => [
            <GridActionsCellItem label="remove" icon={<Delete></Delete>} 
            onClick={async () => await ordersService.removeShoppingProduct(authUser, params.id as string)}/>
        ]}
    ]
    const tableData = useMemo(() => getTableData(), [products, shopping]); 
    const total = useMemo(() => getTotalCost(), [tableData]);
    async function ubdateCount(newRow: any): Promise<any> {
        const rowData: ShoppingDataType = newRow;
        if (rowData.count < 1) {
            throw 'count must be greater than 0'
        }
        await ordersService.addShoppingProduct(authUser, rowData.id!, {id: rowData.id!, count: rowData.count})
        return newRow;
    }
    function getTotalCost(): number {
        return tableData.reduce((res, cur) => res + cur.price, 0);
    }
    function getTableData(): ShoppingDataType[] {
        const shoppingData:ShoppingDataType[] = shopping.map(s => getProductData(s))
        return shoppingData.filter(sd => !!sd.id)
    }
    function getProductData(shoppingProduct: ShoppingProductType): ShoppingDataType {
        const product: ProductType | undefined = products.find(p => p.id == shoppingProduct.id )
        let res: ShoppingDataType = {id: '', category: '', cost: 0, count: 0, title: '', 
        image: '', price: 0, unit: ''};
        if(!product){
            ordersService.removeShoppingProduct(authUser, shoppingProduct.id);
        } else {
            res = {...product, count:shoppingProduct.count, price: +(product.cost * shoppingProduct.count).toFixed(2)};
        }
        return res;
    }
    return <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh', alignItems: 'center'}}>
        <Box sx={{width: "70vw", heigth: "60vh"}}>
        <DataGrid columns={columns} rows={tableData} getRowHeight={() => 'auto'} 
        processRowUpdate={ubdateCount} onProcessRowUpdateError={(error) => {
            alertMessage.current = error;
            setOpen(true)
        }}/>
        </Box>
        <Typography variant="h6">Total cost: {total.toFixed(2)}{' '}
        <img src="images/israeli-shekel-icon.svg" width="3%" /></Typography>
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
  <Alert severity="error" sx={{ width: '100%', fontSize: "1.5em" }}>
    {alertMessage.current}
  </Alert>
</Snackbar>
    </Box>
}