import styles from './listItem.module.css';
import { Link } from 'react-router-dom';

export default function ListItem() {
    return (
        <li className={styles.container}>
            <Link className={styles.link} to="/:id">
            <h2 className={styles.title}>Название товара</h2>
            <img className={styles.img} src="" alt="" />
            </Link>
            <p className={styles.text}>Цена товара</p>
            <p className={styles.text}>Количество комментариев к товару</p>
        </li>
    )
}
