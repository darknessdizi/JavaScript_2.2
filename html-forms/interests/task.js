const inputs = document.querySelectorAll('input');
inputs.forEach((element) => {
    element.addEventListener('change', () => {
        // определяем состояние дочерних элементов:
        const parent = element.closest('.interest');
        const ul = parent.querySelector('ul');
        if (ul) {
            const inp = ul.querySelectorAll('input');
            inp.forEach((value) => {
                value.indeterminate = false;
                value.checked = element.checked;
            });
        }

        // определяем состояние родительских элементов
        reversLi(parent);
    });
});

function reversLi(element) {
    const parentElementLi = element.closest('.interests').closest('.interest');
    if (parentElementLi) {
        const listElementsLi = element.closest('.interests').children;
        const arrayLi = Array.from(listElementsLi);
        const inputArray = arrayLi.map((item) => {
            return item.querySelector('input');
        });
        const searchElement = inputArray.find((item) => {
            // проверяем: все элементы выбраны (ищем состояние false)
            return !item.checked;
        });
        const parentInput = parentElementLi.querySelector('input');
        if (!searchElement) { // undefined , значит все элементы выбраны
            parentInput.checked = true; 
            parentInput.indeterminate = false;
        } else {
            parentInput.checked = false;
            const searchElement = inputArray.find((item) => {
                // проверяем: все элементы отменены (ищем состояние true)
                return item.checked || item.indeterminate;  
            });
            parentInput.indeterminate = !searchElement ? false : true;
        }
        reversLi(parentElementLi);
    } else {
        return;
    }
}