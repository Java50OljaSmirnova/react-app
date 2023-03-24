export function getRandomNumber(min: number, max: number): number {
    return min + Math.trunc(Math.random() * (max - min))
}
export function getRandomElement(array: any[]): any {
    return array[getRandomNumber(0, array.length)];
}
export function getRandomMatrix(rows: number, columns: number, minNumber: number,
    maxNumber: number): number[][] {
    function getRow(): number[] {
        return Array.from(Array(columns)).map(() =>
            getRandomNumber(minNumber, maxNumber + 1))
        /*return Array.from({length:columns}, ()=> getRandomNumber(minNumber, maxNumber + 1));
          this cod is beter*/
    }
    const res: number[][] = Array.from(Array(rows)).map(() => getRow());
    /*  const res: number[][] = Array.from({length: row}, () => getRow()); 
     this cod is beter */
    

    return res;

}