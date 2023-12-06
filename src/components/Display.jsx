import './Display.css';

export function Display({ selectedValue, displayTextClass }){
    let textClassName;
    if(displayTextClass === "zeroError"){
        textClassName = "zeroErrorText"
    }
    else if(displayTextClass === "limitOverError"){
        textClassName = "limitOverErrorText"
    }
    else if(displayTextClass === ""){
        textClassName = "defaultText"
    }
    return(
        <div className={"display"}>
            <div className={textClassName}>
                {selectedValue}
            </div>
        </div>
    );
}