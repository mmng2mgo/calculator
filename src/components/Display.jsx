import './Display.css';

export function Display({ selectedValue, displayTextClass }){
    let textColorClassName;
    if(displayTextClass === "zeroError"){
        textColorClassName = "zeroErrorText"
    }
    else if(displayTextClass === "limitOverError"){
        textColorClassName = "limitOverErrorText"
    }
    else if(displayTextClass === ""){
        textColorClassName = "defaultText"
    }
    return(
        <div className={"display"}>
            <div className={textColorClassName}>
                {selectedValue}
            </div>
        </div>
    );
}