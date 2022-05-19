
// ===== Подсветка блоков при наведении на подсказку =====

const num1 = document.getElementById('num1')
const keywordsDiv = document.getElementById('keywordsDiv')
num1.addEventListener('mouseover', function(event) {
    keywordsDiv.classList.add("highlight")
})
num1.addEventListener('mouseout', function(event) {
    keywordsDiv.classList.remove("highlight")
})

const num2 = document.getElementById('num2')
const handleDiv = document.getElementById('handleDiv')
num2.addEventListener('mouseover', function(event) {
    handleDiv.classList.add("highlight")
})
num2.addEventListener('mouseout', function(event) {
    handleDiv.classList.remove("highlight")
})

const num3 = document.getElementById('num3')
const filterDiv = document.getElementById('filterDiv')
const selectWords = document.getElementById('selectWords')
num3.addEventListener('mouseover', function(event) {
    filterDiv.classList.add("highlight")
    selectWords.classList.add("highlight")
})
num3.addEventListener('mouseout', function(event) {
    filterDiv.classList.remove("highlight")
    selectWords.classList.remove("highlight")
})

const num4 = document.getElementById('num4')
const minusshowSel = document.getElementById('minusshowSel')
num4.addEventListener('mouseover', function(event) {
    minusshowSel.classList.add("highlight")
})
num4.addEventListener('mouseout', function(event) {
    minusshowSel.classList.remove("highlight")
})

const num5 = document.getElementById('num5')
const exportID = document.getElementById('exportID')
num5.addEventListener('mouseover', function(event) {
    exportID.classList.add("highlight")
})
num5.addEventListener('mouseout', function(event) {
    exportID.classList.remove("highlight")
})

// ===== Работа кнопки Обработать =====

const handleBtn = document.getElementById('handleBtn')                  // Кнопка Обработать
const keywordsFld = document.getElementById('keywordsFld')              // Текстовое поле с фразами
handleBtn.addEventListener('click', function(event) {                   // Событие по нажатию кнопки
    handleKeywords()                                                    // Функция обработки ключевых фраз
    minusFld.value = ''
})
function clearArr(arg) {                                                // Удаляет пустые строки из массива фраз
    let index = -1;
    const arr_length = arg ? arg.length : 0;
    let resIndex = -1;
    const result = [];
    while (++index < arr_length) {
        const value = arg[index];
        if (value) {
            result[++resIndex] = value;
        }
    }
    return result;
}
let keywordsArr                                                         // Массив из строк текстового поля с ключевыми словами
function handleKeywords() {                                             // Функция обработки ключевых фраз
    // keywordsArr = keywordsFld.value.toLowerCase().replace(/\r\n/g,"\n").split("\n")   // Строки в массив
    let s = keywordsFld.value.toLowerCase()
        .replace(/ +(?= )/g,'')
        .replace(/,/g,"\n")
        .replace(/\n /g,"\n")
        .replace(/ \n/g,"\n")
        .replace(/\r\n/g,"\n")
        .trim()
    keywordsArr = s.split("\n")   // Строки в массив

    keywordsArr.sort()                                                  // Удаляем из массива дубли
    keywordsArr = clearArr(keywordsArr)
    let i = 0
    do {
        if (keywordsArr[i] === keywordsArr[i+1]) {
            keywordsArr.splice(i, 1)
        } else { ++i }
    } while (i < (keywordsArr.length-1));

    i = 0                                                               // Элементам массива добавляем строку для сортировки
    keywordsArr.forEach(function(element) {
        let strByWordsArr = element.split(" ")
        strByWordsArr.sort()
        keywordsArr[i] = { sort: strByWordsArr.join(' '), original: element }
        ++i
    });

    keywordsArr.sort(function (a, b) {                                  // Сортируем массив по подобию фраз
        if (a.sort > b.sort) {
          return 1;
        }
        if (a.sort < b.sort) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });

    setKwFld(keywordsArr)                                               // Выводим обработанные фразы и количество строк
                                          
    let wordsStr = originalKwArr.join(" ")                              // Формируем список слов из фраз
    let wordsArr = wordsStr.split(" ")
    wordsArr.sort()
    wordsStat = []                                                      // Обнуляем массив слов для сортировки
    wordsStat.push({ word: wordsArr[0], stat: 1 })                      // Записываем новые значения массива слов, из которых состоят фразы
    for (var j=1; j < wordsArr.length; j++) {
        if (wordsArr[j] == wordsArr[j-1]) {
            wordsStat[wordsStat.length-1].stat = wordsStat[wordsStat.length-1].stat + 1
        } else {
            wordsStat.push({ word: wordsArr[j], stat: 1 })
        }
    }

    if ( sortByFreq.checked == true ) {
        sortWordsByFreq()
    } else { sortWordsByAbc() }                                         // Сортируем слова в массиве по алфавиту
}
let originalKwArr                                                       // Массив отсортированных ключевых фраз
function setKwFld(arg) {                                                   // Функция вывода количества и самих ключевых фраз в интерфейсе
    originalKwArr = arg.map((element) => {return element.original})
    keywordsFld.value = originalKwArr.join("\n")
    keywordsCount.innerHTML = arg.length
}
const wordsList = document.getElementById('wordsList')                  // Список слов в интерфейсе
function clearWordsList() {                                             // Очистка списка слов в интерфейсе
    while (wordsList.length>0) {
        wordsList.remove(0)
    }
}
const keywordsCount = document.getElementById('keywordsCount')          // Количество строк в интерфейсе
function setKwCount() {                                                 // Функция вывода количества фраз
    let textToArr = keywordsFld.value.split("\n")
    textToArr = clearArr(textToArr)
    keywordsCount.innerHTML = textToArr.length
}
keywordsFld.addEventListener('keyup', function(event) {                 // Обновляем количество введённых фраз при изменении в текстовом поле
    setKwCount()
})
let wordsStat = []                                                      // Массив слов для сортировки
function sortWordsByFreq() {
    wordsStat.sort(function (a, b) {                                    
        if (a.stat < b.stat) {
          return 1;
        }
        if (a.stat > b.stat) {
          return -1;
        }
        // a должно быть равным b
        return 0;
    });
    setNewWordsToSelect()
    sortByFreq.checked = true
}
function sortWordsByAbc() {
    wordsStat.sort(function (a, b) {                                    
        if (a.word > b.word) {
          return 1;
        }
        if (a.word < b.word) {
          return -1;
        }
        // a должно быть равным b
        return 0;
    });
    setNewWordsToSelect()
    sortByAbc.checked = true
}
function setNewWordsToSelect() {
    clearWordsList()
    for (var j=0; j < wordsStat.length; j++) {
        let opt = document.createElement("option")
        opt.value = j
        opt.text = wordsStat[j].word + ' - ' + wordsStat[j].stat
        wordsList.add(opt, null)
    }
}

// ===== Инструменты сортировки слов по-порядку и частоте =====

const sortByAbc = document.getElementById('sortByAbc')
const sortByFreq = document.getElementById('sortByFreq')
sortByAbc.addEventListener('change', function(event) {                  // 
    sortWordsByAbc()                                                    // 
})
sortByFreq.addEventListener('change', function(event) {                 // 
    sortWordsByFreq()                                                   // 
})

// ===== Инструменты фильтрации =====

const searchFld = document.getElementById('searchFld')
let filteredArrBySearchStr
searchFld.addEventListener('keyup', function(event) {                   // Фильтр по подстроке, введённой в инпут
    wordsList.selectedIndex = -1
    function filterByOriginal(item) {
        let s = item.original
        let s2 = searchFld.value.toLowerCase()                          // В нижний регистр
        return s.includes(s2)
    }
    filteredArrBySearchStr = keywordsArr.filter(filterByOriginal);
    setKwFld(filteredArrBySearchStr)
})
function listChangeClick() {
    searchFld.value = ''
    function filterByOriginal(item) {
        let s = ' ' + item.original + ' '                               // Чтобы искать по слову, добавим пробелы вначале и вконце фразы
        let s2 = ' ' + wordsStat[wordsList.selectedIndex].word + ' '    // Добавим пробелы, чтобы искало по целому слову
        return s.includes(s2)
    }
    filteredArrBySearchStr = keywordsArr.filter(filterByOriginal);
    setKwFld(filteredArrBySearchStr)
}
wordsList.addEventListener('change', function(event) {                  // Фильтр по целому слову из селекта
    listChangeClick()
})
wordsList.addEventListener('click', function(event) {                   // Фильтр по целому слову из селекта
    listChangeClick()
})
const showallBtn = document.getElementById('showallBtn')                // Показать все слова
showallBtn.addEventListener('click', function(event) {
    searchFld.value = ''
    setKwFld(keywordsArr)
})

// ===== Минус и удаление слов =====
// Фильтр в строке фильтрует по списку слов тоже?

const minusBtn = document.getElementById('minusBtn')
const minusFld = document.getElementById('minusFld')
minusBtn.addEventListener('click', function(event) {
    if (wordsList.selectedIndex >= 0) { minusFld.value = minusFld.value + wordsStat[wordsList.selectedIndex].word + '\n' }

    Array.prototype.diff = function (a) {
        return this.filter(function (i) {
            return a.indexOf(i) === -1;
        });
    };
    let minusedArr = keywordsArr.diff(filteredArrBySearchStr)
    keywordsArr = minusedArr
    setKwFld( keywordsArr )
    handleKeywords()

    if (searchFld.value != '') {
        minusFld.value = minusFld.value + searchFld.value + '\n'
        searchFld.value = ''
    }
})

// ===== Экспорт данных =====

const forMetaTag = document.getElementById('forMetaTag')
const googleMod = document.getElementById('googleMod')
const yandexMod = document.getElementById('yandexMod')
const exportFld = document.getElementById('exportFld')
forMetaTag.addEventListener('click', function(event) {
    sortWordsByFreq()
    let a = wordsStat.map((element) => {return element.word})
    let s = a.join(" ")
    exportFld.value = s
})
function googlePlus(str) {
    str = str.replace(/\s/g," +")
    str = '+' + str
    return str
}
function googleSqBr(str) {
    str = '[' + str + ']'
    return str
}
googleMod.addEventListener('click', function(event) {
    let a = []
    a.push( googlePlus(keywordsArr[0].sort) )
    a.push( googleSqBr(keywordsArr[0].original) )
    for (var i=1; i<keywordsArr.length; i++) {
        if ( keywordsArr[i].sort !== keywordsArr[i-1].sort ) { 
            a.push( googlePlus(keywordsArr[i].sort) ) 
        }
        a.push( googleSqBr(keywordsArr[i].original) )
    }
    exportFld.value = a.join("\n")
})
function yandexPlus(str) {
    str = '"' + str + '"'
    return str
}
function yandexSqBr(str) {
    str = str.replace(/\s/g," !")
    str = '"!' + str + '"'
    return str
}
yandexMod.addEventListener('click', function(event) {
    let a = []
    a.push( yandexPlus(keywordsArr[0].sort) )
    a.push( yandexSqBr(keywordsArr[0].original) )
    for (var i=1; i<keywordsArr.length; i++) {
        if ( keywordsArr[i].sort !== keywordsArr[i-1].sort ) { 
            a.push( yandexPlus(keywordsArr[i].sort) ) 
        }
        a.push( yandexSqBr(keywordsArr[i].original) )
    }
    exportFld.value = a.join("\n")
})
const sortExport = document.getElementById('sortExport')
sortExport.addEventListener('click', function(event) {
    let a = exportFld.value.split("\n")
    a.sort()
    exportFld.value = a.join("\n")
})






    // console.log(wordsStat.length)
    // wordsStat.forEach( (element) => {console.log(element)} )


