import styles from './Calculator.module.css';
import './Display.css';

export function Display({selectedValue}){
    return(
        <div className={"display"}>
            {selectedValue}
        </div>
    );
}