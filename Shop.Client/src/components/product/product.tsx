import styles from './product.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { fetchProductById, saveComment } from '../../redux/productsSlice';
import Loader from '../loader/loader';
import { Link } from 'react-router-dom';

export default function Product() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const product = useAppSelector((state) => state.products.productById);
    const loading = useAppSelector((state) => state.products.loading);
    const {title, description, price, thumbnail, comments, images, similarProducts } = product;
    const [comment, setComment] = useState({
        name: "",
        email: "",
        body: "",
    });

    const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id !== undefined) {
        const commentSet = { ...comment, productId: id };
        dispatch(saveComment(commentSet));
        setComment({
            name: "",
            email: "",
            body: "",
        });
        dispatch(fetchProductById(id));
    }
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setComment((prevComment) => ({
            ...prevComment,
            [name]: value,
        }));
        }

    useEffect(() => {
        if (id !== undefined)
            dispatch(fetchProductById(id));
    }, [id, dispatch]);

    return (
        <main className={styles.container}>
            {loading && <Loader />}
            <h2 className={styles.title}>{title}</h2>
            <img className={styles.mainImg} src={thumbnail ? thumbnail.url : "/product-placeholder.png"} alt="product image" />
            {images &&
                (<ul className={styles.list}>
                    {images.map((image) => (<li><img className={styles.smallImg} src={image.url} alt="product image" /></li>))}
                </ul>)}

            <p className={styles.text}>{description}</p>
            <p className={styles.text}>{price} &#8381;</p>
            {similarProducts &&
                (<ul className={styles.list}>
                    Похожие товары
                    {similarProducts.map((product) =>
                    (<li>
                        <Link className={styles.similarProduct} to={`/${product.id}`}>
                            <p className={styles.text}>{product.title}</p>
                            <p className={styles.price}>{product.price} &#8381;</p>
                        </Link>
                    </li>))}
                </ul>)}

            {comments &&
                (<ul className={styles.commentsList}>
                    Список комментариев
                    {comments.map((comment) => 
                    (<li className={styles.commentContainer}>
                        <p className={styles.text}>Name: {comment.name}</p>
                        <p className={styles.text}>Email: {comment.email}</p>
                        <p className={styles.text}>{comment.body}</p>
                    </li>))}
                </ul>)}

            <form className={styles.form} onSubmit={handleCommentSubmit}>
                <input className={styles.input} type="text" name='name' placeholder="Заголовок" onChange={handleCommentChange} value={comment.name} />
                <input className={styles.input} type="text" name='email' placeholder="Email" onChange={handleCommentChange} value={comment.email}/>
                <textarea className={styles.textArea} name='body' placeholder="Ваш комментарий" onChange={handleCommentChange} value={comment.body}/>
                <button className={styles.button}>Сохранить</button>
            </form>
        </main>
    )
}
