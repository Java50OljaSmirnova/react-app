import { CellType } from "../model/CellType";
import GameRowSimpleColors from "./GameRowSimpleColors";

export default class GameRowSwapColors extends GameRowSimpleColors {
    private countFields: number = 0;
    private firstIndex: number = -1
    constructor(nCells: number) {
        super(nCells)
    }
    isOver(): boolean {
        return this.countFields >= this.row.length / 2;
    }
    move(id: number): string | CellType[] {
        let res: string | CellType[] = 'game is over';

        if (!this.isOver()) {
            if (this.firstIndex == -1) {
                this.firstIndex = id;
                res = this.row;
                
            } else {
                res = JSON.parse(JSON.stringify(this.row));
                const resAr = res as CellType[]; 
                const tmpColor = resAr[this.firstIndex].cellColor
                resAr[id].cellColor = tmpColor
                resAr[this.firstIndex].cellColor = resAr[id].cellColor
                this.row = resAr;
                this.firstIndex = -1;
                this.countFields++;
            }

        }
        return res;
    }


}