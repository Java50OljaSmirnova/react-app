import { CellType } from "../model/CellType";

export default interface GameRow {
    getInitialRow(): CellType[];
    move(id: number): Array<CellType> | string;
    isOver(): boolean;
}