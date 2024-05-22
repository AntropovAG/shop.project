import styles from './mainPage.module.css';
import { Link } from 'react-router-dom';

export default function MainPage() {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Shop.Client</h1>
            <p className={styles.text}>В базе данных находится n товаров общей стоимостью m</p>
            <Link to="/products-list" className={styles.link}>Перейти к списку товаров</Link>
            <Link to="/admin" className={styles.link}>Перейти в систему администрирования</Link>
        </main>
    )
}
