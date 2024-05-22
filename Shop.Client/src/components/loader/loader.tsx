import styles from './loader.module.css';

export default function Loader() {
    return (
        <div className={styles.container}>
            <p className={styles.text}>Loading...</p>
            <div className={styles.mainSpinner}>
                <div className={styles.additionalSpinner}></div>
            </div>
        </div>
    )
}
