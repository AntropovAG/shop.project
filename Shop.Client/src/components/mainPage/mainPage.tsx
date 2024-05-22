import styles from './mainPage.module.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { fetchInfo } from '../../redux/productsSlice';
import Loader from '../loader/loader';

export default function MainPage() {
    const dispatch = useAppDispatch();
    const overview = useAppSelector((state) => state.products.overview);
    const loading = useAppSelector((state) => state.products.loading);

    useEffect(() => {
        dispatch(fetchInfo());
    }, [dispatch]);

    return (
        <main className={styles.container}>
            {loading && <Loader />}
            <h1 className={styles.title}>Shop.Client</h1>
            <p className={styles.text}>В базе данных находится {overview?.count} товаров общей стоимостью {overview?.sum} &#8381;</p>
            <Link to="/products-list" className={styles.link}>Перейти к списку товаров</Link>
            <Link to="/admin/auth/login" className={styles.link} target='_blank'>Перейти в систему администрирования</Link>
        </main>
    )
}
