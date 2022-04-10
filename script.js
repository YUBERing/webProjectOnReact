 //Объявляем нужные нам переменные, находим необходимые нам элементы по Id
let maps = [];                                     
const newmap = document.getElementById("newmap");
const listmap = document.getElementById("listmap");
const route = document.getElementById("route");
const modal = document.getElementById("modalback");
const exit = document.getElementById("exit");
const desc = document.getElementById("description");
const from = document.getElementById("from");
const before = document.getElementById("before");
const cancel = document.getElementById("cancel");
const buttons = document.getElementById("buttons");

//Создаем кнопку "Построить маршрут" и вставляем ее в блок "Маршрут"
var button = document.createElement("button");      
button.id = "makeroute";
button.innerText = "Построить маршрут";
route.appendChild(button);

//Создаем кнопку Добавить
var add = document.createElement("button");
add.id = "add";
add.innerText = "Добавить";

//Создаем кнопку Изменить
var remake = document.createElement("button");
remake.id = "remake";
remake.innerText = "Изменить";

//Переменная для определения номера дочернего элемента в блоке Карточки
var id;

//Обработчик кнопки Отмена в модальном окне
cancel.onclick = ()=>{
    //Отчищаем поля в модальном окне
    from.value = "";
    description.value = "";
    before.value = "";
    //Скрываем модальное окно
    modal.style.display = "none";
}    

//Обработчик кнопки выход в модальном окне
exit.onclick = ()=>{
    //Отчищаем поля в модальном окне
    from.value = "";
    description.value = "";
    before.value = "";
    //Скрываем модальное окно
    modal.style.display = "none";
}

//Обработчик кнопки "новая карта"
newmap.onclick=()=>{
    //Добавляем кнопку Добавить в блок кнопок в модальном окне
    buttons.appendChild(add);
    //Показываем модальное окно
    modal.style.display = "block";
}

//Обработчик кнопки добавить в модальном окне
add.onclick = ()=>{
    //Проверка на заполненность полей
    if(from.value == "" || description.value == "" || before.value == "")
    {
        alert("Заполните все поля.")
    }
    else{
        //Отчищаем блок Маршут
        while (route.firstChild){
            route.removeChild(route.firstChild);
        }
        route.appendChild(button); //Вставляем кнопку "Построить маршрут" в блок "Маршрут"
        let a = new Map (from.value, description.value, before.value);//Создаем объект класса Map
        maps.push(a);//Всавляем в массив

        //Создаем поле для описания маршрута
        var div = document.createElement("div");
        div.className = "map";
        div.innerHTML="<p>От "+from.value+". "+description.value+" До "+before.value+".</p>";
        
        //Создаем кнопку удалить для поля описание
        var remove = document.createElement("button");
        remove.className = "rem";
        remove.id = "remove";
        remove.innerText = "Удалить";

        //Создаем кнопку изменить для поля описание
        var transform = document.createElement("button");
        transform.className = "rem";
        transform.id = "transform";
        transform.innerText = "Изменить";
        
        //Собираем все вместе и вставляем в блок Карточки
        div.appendChild(transform);
        div.appendChild(remove);
        listmap.appendChild(div);

        //Отчищаем поля в модальном окне, скрываем его и удаляем кнопку Добавить
        from.value = "";
        description.value = "";
        before.value = "";
        modal.style.display = "none";
        buttons.removeChild(add);
    }
}

//Обработчик нажатия кнопок в полях описания
listmap.onclick = event => {
    if (event.target.id == "remove") //для кнопки удалить
    {
        var parent = event.target.parentElement;//Определяем родителя кнопки
        
        //Ищем номер дочернего элемента (поля описания), которое хотим удалить
        for(var i = 0; i<listmap.children.length; i++){
            if(listmap.children[i] == parent) id=i;
        }
        //Удаляем элементы по найденному номеру
        maps.splice(id, 1);
        listmap.removeChild(event.target.parentElement);
        //Отчищаем блок Маршрут
        while (route.firstChild){
            route.removeChild(route.firstChild);
        }

        //Добавляем в блок маршрут кнопку Построить маршрут
        route.appendChild(button);
    }
    if(event.target.id == "transform")//Для кнопки изменить
    {
        modal.style.display="block";//Показываем модальное окно
        //Ищем номер дочернего элемента (поля описания), которое хотим удалить
        var parent = event.target.parentElement;
        for(var i = 0; i<listmap.children.length; i++){
            if(listmap.children[i] == parent) id=i;
        }
        //Заполняем поля в модальном окне
        from.value = maps[id].off;
        description.value = maps[id].name;
        before.value = maps[id].on;
        buttons.appendChild(remake);//Добавляем кнопку изменить в модальном окне
    }
}

//Обработчик Для кнопки изменить в модальном окне
remake.onclick = ()=>{
    //Проверка на заполненность полей
    if(from.value == "" || description.value == "" || before.value == "")
    {
        alert("Заполните все поля.")
    }
    else{
        while (route.firstChild){
        //Отчищаем блок Маршрут
        route.removeChild(route.firstChild);
        }
        //Добавляем в блок маршрут кнопку Построить маршрут
        route.appendChild(button);
        //Изменяем данные в элементе массива по найденному номеру описания
        maps[id].off = from.value;
        maps[id].name = description.value;
        maps[id].on = before.value;
        
        //Обновляем данные в блоке описания, которое изменяем
        listmap.children[id].innerHTML="<p>От "+from.value+". "+description.value+" До "+before.value+".</p>";

        //Добавляем кнопки для этого блока
        var remove = document.createElement("button");
        remove.className = "rem";
        remove.id = "remove";
        remove.innerText = "Удалить";

        var transform = document.createElement("button");
        transform.className = "rem";
        transform.id = "transform";
        transform.innerText = "Изменить";
        
        listmap.children[id].appendChild(transform);
        listmap.children[id].appendChild(remove);

        //Отчищаем поля в модальном окне
        from.value = "";
        description.value = "";
        before.value = "";
        modal.style.display = "none";//Скрываем модальное окно
        buttons.removeChild(remake);//Удаляем кнопку изменить в модальном окне
    }
}

//Обработчик кнопки Построить маршрут
makeroute.onclick=()=>{
    route.removeChild(makeroute);// Удаляем кнопку Построить маршрут
    //Создаем массив и копируем данные из массива maps в него
    var a = [];
    for(var p in maps){
        a.push(maps[p]);
    }
    //Сортируем массив по маршрутам
    for (var i=0; i<a.length; i++){
        for(var j=0; j<a.length; j++){
            if(a[i].on==a[j].off){
                if(i==a.length-1){
                    a.push(a[j]);
                    a.splice(j,1);
                    j-=1;
                }
                else{
                    t=a[i+1];
                    a[i+1]=a[j];
                    a[j]=t;
                }
            }
        }
    }

    //Заполняем Блок маршрут отсортированными карточками
        for(var p in a){
        var div = document.createElement("div");
        div.className = "map";
        div.innerHTML="<p>От "+a[p].off+". "+a[p].name+" До "+a[p].on+".</p>";
        route.appendChild(div);
    }
}

//Класс для объекта Карта
class Map {
    constructor(off, name, on){
        this.offname = off;
        this.namename = name;
        this.onname = on;
    }
    set off(value) {
        this.offname = value;
    }
    set name(value) {
        this.namename = value;
    }
    set on(value) {
        this.onname = value;
    }
    get off() {
        return this.offname;
    }
    get name()
    {
        return this.namename;
    }
    get on()
    {
        return this.onname;
    }
}