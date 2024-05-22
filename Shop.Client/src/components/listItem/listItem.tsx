import styles from './listItem.module.css';
import { Link } from 'react-router-dom';
import { IProduct } from '@Shared/types';

interface ListItemProps {
    product: IProduct;
}

export default function ListItem({product}: ListItemProps) {
    const { id, title, price, thumbnail, comments } = product;

    return (
        <li className={styles.container}>
            <Link className={styles.link} to={`/${id}`}>
            <h2 className={styles.title}>{title}</h2>
            <img className={styles.img} src={thumbnail ? thumbnail.url : "/product-placeholder.png"} alt="product image" />
            </Link>
            <p className={styles.text}>{price} &#8381;</p>
            <p className={styles.text}>Количество комментариев к товару: {comments?.length || 0}</p>
        </li>
    )
}
