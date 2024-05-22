import styles from './productsList.module.css';
import ListItem from '../listItem/listItem';

export default function ProductsList() {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Список товаров(n)</h1>
            <form className={styles.form} action="">
                <input className={styles.input} type="text" placeholder="Название товара" />
                <input className={styles.input} type="text" placeholder="Описание товара" />
                <input className={styles.input} type="text" placeholder="Цена от" />
                <input className={styles.input} type="text" placeholder="Цена до" />
                <button className={styles.button}>Поиск</button>
            </form>
            <ul className={styles.list}>
                <ListItem />
                <ListItem />
                <ListItem />
            </ul>
        </main>
    )
}
