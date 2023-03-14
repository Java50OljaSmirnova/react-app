import React, { useState, useEffect, useRef } from "react";
import { Input } from "./Input";
import timeZones from "../time-zones";
type Props = {
    cityCountry: string;
}

export const Timer: React.FC<Props> = ({ cityCountry }) => {
    const styles: React.CSSProperties = { backgroundColor: "lightblue", fontSize: "2em" };
    const timeZone = useRef<string | undefined>();
    const [time, setTime] = useState(new Date());
    const [inputCityCountry, setCityCountry] = useState<string>(cityCountry);
    function tic() {
        setTime(new Date());
        console.log("kuku");
    }

    function getTimeZone(value: string): string | undefined {
        const index = timeZones.findIndex(tz => JSON.stringify(tz).includes(value));
        return index < 0 ? undefined : timeZones[index].name;
    }
    useEffect(
        () => {
            timeZone.current = getTimeZone(cityCountry);
        }, [cityCountry]
    )

    useEffect(() => {
        const interval = setInterval(tic, 2000);
        console.log("useEffect")
        return () => clearInterval(interval);
    }, [])
function submitFn(inputValeu: string): string{
    const tempZone = getTimeZone(inputValeu);
    let res: string = '';
    if(!tempZone){
        res = `${inputValeu} doesn't exist in the time zones`
    } else {
        timeZone.current = tempZone;
        setCityCountry(inputValeu);
    }
    return res;
}
    return <div>
        <Input submitFn={submitFn} placeHolder = {"Enter city or country"}/>
        <h2 >Current Time in {inputCityCountry}</h2>
        <p style={styles}>{time.toLocaleTimeString(undefined,
            { timeZone: timeZone.current })}</p>
    </div>
}
