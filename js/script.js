//функция, которая принимает значение type  и массив значений, затем фильтрует массив и записывает в новый (value === type)
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
//функция hideAllResponseBlocks
	hideAllResponseBlocks = () => {
		//создали масси и привязали к элементу на странице
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//перебрали масси в и присвоили каждому элементу знычение display = 'none'
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	//функция
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//запускаем функцию hideAllResponseBlocks
		hideAllResponseBlocks();
		//ищем элемент по переданному селектору и присваиваем значение display = 'block'
		document.querySelector(blockSelector).style.display = 'block';
		//условие если spanSelector есть
		if (spanSelector) {
			//выводим сообщение на страницу
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	//функция, которая выводит сообщение об ошибке
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	//функция, которая выводит сообщение об успешном выполнении
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	//функция, которая выводит сообщение если результата нет
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	//функция, принимающая 2 параметра
	tryFilterByType = (type, values) => {
		//отслеживание ошибок
		try {
			//Метод eval() выполняет JavaScript код, представленный строкой, запускаем функцию filterByType и передаем значение type и values и переводим в массив 
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
	//условие есть ли массив valuesArray 
			const alertMsg = (valuesArray.length) ?
	//если тернарный оператор вернет true, то выведется сообщение
				`Данные с типом ${type}: ${valuesArray}` :
	// в ином случае выведется другое сообщение
				`Отсутствуют данные типа ${type}`;
	//запуск функции showResults с параметром alertMsg
			showResults(alertMsg);
			//если возникнет ошибка
		} catch (e) {
			//то вывести на экран
			showError(`Ошибка: ${e}`);
		}
	};
//получили элемент со страницы (кнопка) по id
const filterButton = document.querySelector('#filter-btn');
//вешаем на кнопку слушатель событий клик
filterButton.addEventListener('click', e => {
	//получили элемент со страницы по id
	const typeInput = document.querySelector('#type');
	//получили элемент со страницы по id
	const dataInput = document.querySelector('#data');
//если в dataInput пустая строка
	if (dataInput.value === '') {
		//то выводится выводится сообщение
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//запуск функции showNoResults
		showNoResults();
		//в ином случае
	} else {
		//очищаем сообщение валидации
		dataInput.setCustomValidity('');
		//отменяем стандартное поведение браузера
		e.preventDefault();
		//запускаем функция tryFilterByType со значенями typeInput и dataInput без пробелов
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

