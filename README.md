


# Пеп проект ювелирный интернет-магазин

Бэкенд проекта [тут](https://github.com/VoskresenskayaM/jewelryShopServer?tab=readme-ov-file)!
![Главная](https://github.com/VoskresenskayaM/jewelryShopFrontend/blob/main/src/images/imagesForReadme/%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.jpg )

## Функциональность
- на главной странице реализован слайдер



https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/a70932d8-a909-4c58-b0b8-524b0ec28631



- Защищенность роутов( неавторизованный пользователь не может перейти на страницы: корзина)
- Ограниченная функциональность у неавторизованного пользователя.
  Авторизованный пользователь может:  
  - ставить лайки понравившемуся товару
  - добавлять товар в корзину
  - добавлять отзывы о товаре


https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/2c3f50c7-ef03-4fa2-8d23-c1806f84aa93


- Валидация форм
  
![валидация](https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/bdc03186-9f14-426a-a103-4896fae8142b)


- Возможность поиска товаров с фильтрацией по типу материалу и бренду
  


https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/2ff55caf-611f-4fa4-adc1-2f6eda27b435



- Пользователь администратор может добавлять бренды, типы материалы и товары. У пользователя с ролью user доступа к админ панели нет
  
![админпанель1](https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/e82ee71d-f09d-4f43-acb9-9bba56e9221b)

- реализована пагинация для перехода по страницам
  


https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/eddc9506-0ba0-4927-840a-aed06ab7a036


- авторизиванный пользователь может добавлять и удалять товары в корзину, изменять колличество товара, общая стоимость корзины пересчитывается
  


https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/0f108636-6206-451d-8e36-377b4cae0447



- запоминание состояния входа пользователя (при обновлении страницы будет выполнен автоматический вход)


![регистрация](https://github.com/VoskresenskayaM/jewelryShopFrontend/assets/57997785/507d2d34-336c-4cb7-b2b3-e97b25e56611)

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
