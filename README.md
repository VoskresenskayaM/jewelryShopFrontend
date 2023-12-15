


# Пеп проект ювелирный интернет-магазин

Бэкенд проекта [тут](https://github.com/VoskresenskayaM/jewelryShopServer?tab=readme-ov-file)!
![Главная](https://github.com/VoskresenskayaM/jewelryShopFrontend/blob/main/src/images/imagesForReadme/%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.jpg )

## Функциональность
- на главной странице реализован слайдер

https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/f0ee8e43-9396-47bd-99dd-e5a6087b59a1

- Защищенность роутов( неавторизованный пользователь не может перейти на страницы: корзина)
- Ограниченная функциональность у неавторизованного пользователя.
  Авторизованный пользователь может:  
  - ставить лайки понравившемуся товару
  - добавлять товар в корзину
  - добавлять отзывы о товаре


https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/dcd81136-a31b-4df2-b487-5b63fe24fd1d


- Валидация форм
  
  ![валидация](https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/5c68f178-715d-489a-aa49-2a4e551b2187)

- Возможность поиска товаров с фильтрацией по типу материалу и бренду
  
https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/0f643afd-bcf8-4337-b28b-8522fcf491e6

- Пользователь администратор может добавлять бренды, типы материалы и товары. У пользователя с ролью user доступа к админ панели нет
![админ панель](https://github.com/VoskresenskayaM/jewelryShopFrontend/blob/main/src/images/imagesForReadme/%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD%D0%BF%D0%B0%D0%BD%D0%B5%D0%BB%D1%8C1.jpg)

- реализована пагинация для перехода по страницам
  
https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/e4bc9b70-a569-444e-aa30-670e6df2360f

- авторизиванный пользователь может добавлять и удалять товары в корзину, изменять колличество товара, общая стоимость корзины пересчитывается
  
https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/87d28fdb-cc11-4cc9-8987-8bdf34e21714

- запоминание состояния входа пользователя (при обновлении страницы будет выполнен автоматический вход)
![регистрация](https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/ec9db039-7209-4b87-ba16-29a219aaa611)

- реализована микроанимация всех ссылок и кнопок
- при верстке использовались flex 
- все данные хранятся на сервере, использовано собственное API


### Используемые технологии
### при реализации front приложения использовались технологии
- React
- Js
- HTML
- Сss
- Redux
### при реализации серверной части приложения использовались технологии
- node.js
- postgresql
- sequelize

### Запуск проекта
- npm i - установка зависимотей
- npm run dev - запуск приложения на 3000 порту
- запуск серверной части на 5000 порту
