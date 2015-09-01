# Сортування петицій

Цей [букмарклет](https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%BA%D0%BC%D0%B0%D1%80%D0%BA%D0%BB%D0%B5%D1%82) створено для сортування петицій на сайті [електронних петицій до Президента України](https://petition.president.gov.ua/)

Для того, щоб сортувати та фільтрувати записи петицій треба:
 - відкрити головну сторінку сайту петицій (https://petition.president.gov.ua/petition/archive)
 - у адресній строчці (там де відображається адреса сайту) ввести (або скопіювати та вставити) ``javascript:var s = document.createElement('script');s.type='text/javascript';document.body.appendChild(s);s.src='https://cdn.rawgit.com/paragraff/petition/master/petition-tools.js';void(0);``
 - **увага!** при вставці до адресної строки браузери вирізають початкове слово ``javasctipt:``. Треба обов'язково ввести його з клавіатури!
 - нажати ``Enter``

Для спрощення додавання букмарклету можна створити закладку у браузері. Для цього треба відкрити для редагування
будь-яку закладку та замість адресу ввести ``javascript:var s = document.createElement('script');s.type='text/javascript';document.body.appendChild(s);s.src='https://cdn.rawgit.com/paragraff/petition/master/petition-tools.js';void(0);``
Таку закладку треба зберегти і переходити до цієї закладки з сторінку архіву петицій https://petition.president.gov.ua/petition/archive

Усе! Фільтрація без перезавантаження сторінки та сортування петицій доступно!