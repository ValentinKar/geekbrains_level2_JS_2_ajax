// адрес запрашиваемого файла посредством AJAX-запроса
var requestAddress = './gallery.json';

/**
 * Функция возвращает созданный элемент image.
 * @param {string} picture - Источник картинки.
 */
function buildImage(picture) {
    // создает новый обьект - image
    const galleryImage = new Image();
    // помещает картинку внутрь созданного image
    galleryImage.src = picture;
    return galleryImage;
}

/**
 * Функция возвращает созданную ссылку <a href>.
 * @param {string} reference - Адрес ссылки.
 */
function buildAnchor(reference) {
    const anchorElement = document.createElement('a');
    anchorElement.href = reference;
    anchorElement.target = "_blank";
    return anchorElement;
}

/**
 * Функция возвращает созданный элемент div с классом.
 * @param {string} className - Класс, который добавляется в div.
 */
function buildDiv(className) {
    var div = document.createElement('div');
    div.classList.add(className);
    return div;
}

//Синхронный запрос AJAX запрос к json (серверу).
console.log('---sync---');
var xhr = new XMLHttpRequest();
xhr.open('POST', requestAddress, false); //false - Синхронный запрос
xhr.send();
if(xhr.status !== 200)
{
    console.log('Error', xhr.status, xhr.statusText);
} else {
    var data = xhr.responseText;
    // console.log('ok', data);
    var myGallery = JSON.parse(data);
}

window.onload = function () {
    // id элемента div, в который помещается галерея
    this.elementId = 'gallery';
    // обьект, который получается после парсинга json-файла
    this.myGallery =  myGallery;
    // html-элемент div, в который помещается каждая картинка галереи
    this.classDivName = 'img-container';

    var containerGallery = document.getElementById(this.elementId);

    for (let i = 0; i < this.myGallery.length; i++) {
        // div, внутрь которого помещаем каждую картинку галереи
        var divElement = buildDiv(this.classDivName);
        // ссылка на большое изображение
        var hrefElement = buildAnchor(this.myGallery[i].max);

        hrefElement.appendChild(buildImage(this.myGallery[i].min));
        divElement.appendChild(hrefElement);
        containerGallery.appendChild(divElement);
    };
}