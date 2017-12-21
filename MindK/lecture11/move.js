/**
 * Created by User on 021 21.12.17.
 */
document.onmousedown = function(e) {

    var target = e.target;
    if (!target.classList.contains('dragable')) return false;
    var coords = target.getBoundingClientRect();
    var boxCoords = document.querySelector('.box').getBoundingClientRect();
    // смещение мыши на квадрате
    var shiftX = e.pageX - pageXOffset - coords.left;
    //pageY - позиция мыши относительно документа, учитывающая прокрутку
    //pageYOffset - Прокрутка окна
    var shiftY = e.pageY - pageYOffset - coords.top;
    document.querySelector('.box').appendChild(target);

    moveAt(e);

    target.style.zIndex = 1000; // над другими элементами

    function moveAt(e) {

        var newX = e.pageX - pageXOffset - boxCoords.left - shiftX;
        target.style.left = Math.max(10, Math.min(newX, boxCoords.width - coords.width - 10)) + 'px';

        var newY = e.pageY - pageYOffset - boxCoords.top - shiftY;
        //offsetHeight - внешняя высота блока
        target.style.top = Math.max(10, Math.min(newY, boxCoords.height - coords.height - 10)) + 'px';
        //console.log(document.documentElement.clientHeight - target.offsetHeight + pageYOffset);
    }

    document.onmousemove = function(e) {
        //target.classList.toggle('move');
        moveAt(e);
    };

    document.onmouseup = function() {
        document.onmousemove = null;
    };
    return false;
}

document.ondragstart = function() {
    return false;
};