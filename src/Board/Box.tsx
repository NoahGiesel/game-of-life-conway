import React, { useState } from "react"


interface Props {
    unique: string;
    boxPressed: (x: string) => void;
}

const Box: React.FC<Props> = (props) => {
    const [isActive, setIsActive] = useState<Boolean>(false);

    const pressed = (x: any) => {
        let key: string = x.target.id
        setIsActive(!isActive)
        props.boxPressed(key);
        // console.log(key)
    }

    return (
        <>
            <div
                id={props.unique}
                key={props.unique}
                className={isActive ? "box box-active" : "box box-inactive"}
                onClick={e => pressed(e)}
            />
        </>
    )
}


export default Box