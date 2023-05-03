import { Observable } from "rxjs";
import { ShoppingProductType } from "../model/ShoppingProductType";

export default interface OrdersService {
    addShoppingProduct(collectionName: string, id: string, shoppingProduct: ShoppingProductType): Promise<void>;
    addShoppingProductUnit(collectionName: string, id: string): Promise<void>;
    removeShoppingProduct(collectionName: string, id: string): Promise<void>;
    removeShoppingProductUnit(collectionName: string, id: string): Promise<void>;
    getShoppingCard(collectionName: string): Observable<ShoppingProductType[]>;
}
