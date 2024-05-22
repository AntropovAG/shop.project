import styles from './product.module.css';

export default function Product() {
    return (
        <main className={styles.contaoner}>
            <h2>Название товара</h2>
            <img src="" alt="" />
            <ul>
                Изображения товара
                <li><img src="" alt="" /></li>
                <li><img src="" alt="" /></li>
            </ul>
            <p>Описание товара</p>
            <p>Стоимость товара</p>
            <ul>
                Похожие товары
                <li>похожий товар</li>
                <li>похожий товар</li>
            </ul>
            <ul>
                Список комментариев
                <li>комментарий</li>
                <li>комментарий</li>
            </ul>
            <form action="">
                <input type="text" placeholder="Заголовок" />
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Ваш комментарий" />
                <button>Сохранить</button>
            </form>
        </main>
    )
}
