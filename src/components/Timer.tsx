import React, { useState, useEffect, useRef } from "react";
import timeZones from "../time-zones";
type Props = {
    cityCountry: string;
}

export const Timer: React.FC<Props> = ({ cityCountry }) => {
    const styles: React.CSSProperties = { backgroundColor: "lightblue", fontSize: "2em" };
    const timeZone = useRef<string | undefined>();
    const [time, setTime] = useState(new Date());
    function tic() {
        setTime(new Date());
        console.log("kuku");
    }

    function getTimeZone(): string | undefined {
        const index = timeZones.findIndex(tz => JSON.stringify(tz).includes(cityCountry));
        return index < 0 ? undefined : timeZones[index].name;
    }
    useEffect(
        () => {
            timeZone.current = getTimeZone();
        }, [cityCountry]
    )

    useEffect(() => {
        const interval = setInterval(tic, 2000);
        console.log("useEffect")
        return () => clearInterval(interval);
    }, [])

    return <div>
        <h2 >Current Time in {cityCountry}</h2>
        <p style={styles}>{time.toLocaleTimeString(undefined, 
            {timeZone : timeZone.current})}</p>
    </div>
}
