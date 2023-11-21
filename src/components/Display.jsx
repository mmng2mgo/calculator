import styles from './Calculator.module.css';

export function Display({selectedValue}){
    return(
        <div className={styles.display}>
            {selectedValue}
        </div>
    );
}