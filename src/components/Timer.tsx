import React from "react"
export const Timer: React.FC = () => {
const styles: React.CSSProperties = {backgroundColor: "lightblue", fontSize: "2em"};
const hStylesRed: React.CSSProperties = {color: 'red', fontSize: "2em"}
const hStylesBlue: React.CSSProperties = {color: 'blue', fontSize: "2em"}
setTimeout(tic, 1000);
const timeInterval: number = 10000 ;
const [time, setTime] = React.useState(new Date());
function tic() {
    setTime(new Date())
}
const [changer, setChange] = React.useState(hStylesBlue);
setTimeout(switchStyle, timeInterval);
function switchStyle(){
    changer === hStylesBlue ? setChange (hStylesRed) : setChange(hStylesBlue)
}

    return <div>
        <h2 style={changer}>Current Time</h2>
        <p style={styles}>{time.toLocaleTimeString()}</p>
    </div>
}
