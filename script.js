// =============================================================================
// ОБЩИЕ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ И КОНСТАНТЫ (Scope & Hoisting demo)
// =============================================================================

// Глобальные константы для Задания 3 (доступны всем функциям ниже через Lexical Environment)
const MALE_OFFSET = 5;
const FEMALE_OFFSET = -161;

// =============================================================================
// Задание 1: Калькулятор ИМТ
// =============================================================================

// Выбрал Function Declaration, так как это классический способ определения функции.
// Благодаря Hoisting, её можно объявить в конце файла, а вызвать в начале.
function calculateBMI(weight, height) {
  let heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

// Функция для определения категории (согласно чек-листу: "ИМТ с категорией")
function getBMICategory(bmi) {
  if (bmi < 18.5) return "Дефицит массы тела";
  if (bmi < 25) return "Норма";
  if (bmi < 30) return "Избыточный вес";
  return "Ожирение";
}

function handleBMI() {
  // 1. Получить значения веса и роста
  let weight = parseFloat(document.getElementById("weightBMI").value);
  let height = parseFloat(document.getElementById("heightBMI").value);
  let resultElement = document.getElementById("bmiResult");

  // 2. Проверить валидность (согласно "Валидация полей форм.docx")
  if (isNaN(weight) || isNaN(height)) {
    resultElement.innerText = "Ошибка: Поля не могут быть пустыми";
    return;
  }
  if (!isFinite(weight) || !isFinite(height)) {
    resultElement.innerText =
      "Ошибка: Введено слишком большое значение (Infinity)";
    return;
  }
  if (weight < 2 || weight > 500 || height < 30 || height > 300) {
    resultElement.innerText =
      "Ошибка: Введены нелогичные данные (Вес 2-500кг, Рост 30-300см)";
    return;
  }

  // 3. Рассчитать ИМТ
  let bmi = calculateBMI(weight, height);
  let category = getBMICategory(bmi);

  // 4. Вывести результат в #bmiResult
  resultElement.innerText =
    "Ваш ИМТ: " + bmi.toFixed(1) + " (" + category + ")";
  console.log("handleBMI вызвана");
}

// =============================================================================
// Задание 2: Конвертер веса
// =============================================================================

// Выбрал Function Expression.
// Это защищает код: функцию нельзя вызвать до того, как она будет инициализирована в скрипте (нет Hoisting).
const convertKgToLbs = function (kg) {
  return kg * 2.20462;
};

const convertLbsToKg = function (lbs) {
  return lbs / 2.20462;
};

function handleKgToLbs() {
  // Получить значение кг
  let kg = parseFloat(document.getElementById("weightInput").value);
  let res = document.getElementById("weightResult");

  // Проверить валидность
  if (isNaN(kg) || !isFinite(kg) || kg <= 0 || kg > 1000000) {
    res.innerText = "Ошибка: Введите число от 0 до 1 000 000";
    return;
  }

  // Конвертировать в фунты и вывести результат
  res.innerText = kg + " кг = " + convertKgToLbs(kg).toFixed(2) + " фунтов";
  console.log("handleKgToLbs вызвана");
}

function handleLbsToKg() {
  // Аналогично, конвертация фунтов в кг
  let lbs = parseFloat(document.getElementById("weightInput").value);
  let res = document.getElementById("weightResult");

  if (isNaN(lbs) || !isFinite(lbs) || lbs <= 0 || lbs > 1000000) {
    res.innerText = "Ошибка: Введите корректный вес";
    return;
  }

  res.innerText = lbs + " фунтов = " + convertLbsToKg(lbs).toFixed(2) + " кг";
  console.log("handleLbsToKg вызвана");
}

// =============================================================================
// Задание 3: Калькулятор калорий (BMR)
// =============================================================================

// Выбрал Function Declaration.
// Демонстрирует область видимости: функция берет MALE_OFFSET и FEMALE_OFFSET из внешней (глобальной) области.
function calculateBMR(weight, height, age, gender) {
  let baseBMR = 10 * weight + 6.25 * height - 5 * age;

  if (gender === "male") {
    return baseBMR + MALE_OFFSET;
  } else {
    return baseBMR + FEMALE_OFFSET;
  }
}

function handleBMR() {
  // Получить вес, рост, возраст, пол
  let w = parseFloat(document.getElementById("weightBMR").value);
  let h = parseFloat(document.getElementById("heightBMR").value);
  let a = parseFloat(document.getElementById("ageBMR").value);
  let g = document.getElementById("genderBMR").value;
  let res = document.getElementById("bmrResult");

  // Проверить валидность (По документу: целое число для возраста, макс. 200 лет, Infinity)
  if (isNaN(w) || isNaN(h) || isNaN(a) || g === "") {
    res.innerText = "Ошибка: Заполните все поля";
    return;
  }
  if (!isFinite(w) || !isFinite(h) || !isFinite(a)) {
    res.innerText = "Ошибка: Введены слишком большие числа";
    return;
  }
  if (!Number.isInteger(a)) {
    res.innerText = "Ошибка: Возраст должен быть целым числом";
    return;
  }
  if (a < 1 || a > 200) {
    res.innerText = "Ошибка: Возраст не может превышать 200 лет";
    return;
  }

  // Рассчитать BMR и вывести результат
  let bmrResult = calculateBMR(w, h, a, g);
  res.innerText = "Ваша норма: " + Math.round(bmrResult) + " ккал/день";
  console.log("handleBMR вызвана");
}

// =============================================================================
// Задание 4: Конвертер роста
// =============================================================================

// Выбрал стрелочные функции (Arrow Functions).
// Они максимально лаконичны для простых математических операций и не создают своего контекста (this).
const cmToInches = (cm) => cm / 2.54;
const feetInchesToCm = (ft, inc) => (ft * 12 + inc) * 2.54;

function handleCmToFeet() {
  // Получить рост в см
  let cm = parseFloat(document.getElementById("heightInput").value);
  let res = document.getElementById("heightResult");

  // Проверить валидность
  if (isNaN(cm) || !isFinite(cm) || cm < 30 || cm > 300) {
    res.innerText = "Ошибка: Укажите рост от 30 до 300 см";
    return;
  }

  // Конвертировать в футы и дюймы
  let totalInches = cmToInches(cm);
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches % 12);

  // Вывести результат
  res.innerText = feet + " футов " + inches + " дюймов";
  console.log("handleCmToFeet вызвана");
}

function handleFeetToCm() {
  // Конвертация фунтов и дюймов в кг
  let ft = parseFloat(document.getElementById("feetInput").value);
  let inc = parseFloat(document.getElementById("inchesInput").value);
  let res = document.getElementById("heightResult2");

  // Валидация (целые числа, логические диапазоны)
  if (isNaN(ft) || isNaN(inc)) {
    res.innerText = "Ошибка: Заполните оба поля";
    return;
  }
  if (!Number.isInteger(ft) || !Number.isInteger(inc)) {
    res.innerText = "Ошибка: Введите целые числа";
    return;
  }
  if (ft < 0 || ft > 10 || inc < 0 || inc > 11) {
    res.innerText = "Ошибка: Футы (0-10), Дюймы (0-11)";
    return;
  }

  let cmResult = feetInchesToCm(ft, inc);
  res.innerText = Math.round(cmResult) + " см";
  console.log("handleFeetToCm вызвана");
}
