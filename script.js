// ==========================================
// ОБЩИЕ ДАННЫЕ (Глобальная область видимости)
// ==========================================
// Эти числа видны всем функциям в файле. Они здесь,
// чтобы не искать их по всему коду, если формулы изменятся.
const MALE_BONUS = 5;
const FEMALE_BONUS = -161;

// ==========================================
// ЗАДАНИЕ 1: КАЛЬКУЛЯТОР ИМТ
// ==========================================

// ТИП: Function Declaration
// ПОЧЕМУ: это классический способ. Главный плюс — "всплытие" (Hoisting).
// Мы можем вызвать эту функцию в коде даже выше того места, где она написана.
function calculateBMI(weight, height) {
  let heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

function handleBMI() {
  let weightInput = document.getElementById("weightBMI");
  let heightInput = document.getElementById("heightBMI");
  let res = document.getElementById("bmiResult");

  // Устанавливаем зеленый цвет по умолчанию (для валидного ответа)
  res.style.color = "green";

  let weight = parseFloat(weightInput.value);
  let height = parseFloat(heightInput.value);

  // ВАЛИДАЦИЯ
  // isNaN проверяет пустоту, isFinite проверяет число на "бесконечность"
  if (
    isNaN(weight) ||
    isNaN(height) ||
    !isFinite(weight) ||
    !isFinite(height)
  ) {
    res.innerText = "Ошибка: Введите правильные числа в оба поля";
    res.style.color = "red";
    return;
  }
  // Проверка логических диапазонов (по заданию и здравому смыслу)
  if (weight < 20 || weight > 300 || height < 50 || height > 250) {
    res.innerText = "Ошибка: Вес должен быть 20-300 кг, рост 50-250 см";
    res.style.color = "red";
    return;
  }

  let bmi = calculateBMI(weight, height);
  res.innerText = "Ваш ИМТ: " + bmi.toFixed(1);
  console.log("handleBMI вызвана");
}

// ==========================================
// ЗАДАНИЕ 2: КОНВЕРТЕР ВЕСА
// ==========================================

// ТИП: Function Expression
// ПОЧЕМУ: Мы записываем функцию в переменную. Она не "всплывает",
// поэтому её нельзя вызвать, пока код до неё не дойдет. Это делает структуру
// кода строже. Функция ожидает своей очереди.
const convertKgToLbs = function (kg) {
  return kg * 2.20462;
};

const convertLbsToKg = function (lbs) {
  return lbs / 2.20462;
};

function handleKgToLbs() {
  let val = parseFloat(document.getElementById("weightInput").value);
  let res = document.getElementById("weightResult");
  res.style.color = "green";

  if (isNaN(val) || !isFinite(val) || val <= 0 || val > 1000000) {
    res.innerText = "Ошибка: Введите число от 0.1 до 1 000 000";
    res.style.color = "red";
    return;
  }

  res.innerText = val + " кг = " + convertKgToLbs(val).toFixed(2) + " фунтов";
  console.log("handleKgToLbs вызвана");
}

function handleLbsToKg() {
  let val = parseFloat(document.getElementById("weightInput").value);
  let res = document.getElementById("weightResult");
  res.style.color = "green";

  if (isNaN(val) || !isFinite(val) || val <= 0 || val > 1000000) {
    res.innerText = "Ошибка: Введите число от 0.1 до 1 000 000";
    res.style.color = "red";
    return;
  }

  res.innerText = val + " фунтов = " + convertLbsToKg(val).toFixed(2) + " кг";
  console.log("handleLbsToKg вызвана");
}

// ==========================================
// ЗАДАНИЕ 3: КАЛЬКУЛЯТОР КАЛОРИЙ (BMR)
// ==========================================

// ТИП: Function Declaration
// ПОЧЕМУ: потому что эти функции отвечают только за логику вычислений
// и не зависят от HTML-разметки. Также из-за хоистинга: такие функции доступны
// в любой части скрипта, что позволяет отделить логику вычислений
// от логики обработки кнопок, делая код более организованным».
function calculateBMR(weight, height, age, gender) {
  let base = 10 * weight + 6.25 * height - 5 * age;
  if (gender === "male") return base + MALE_BONUS;
  return base + FEMALE_BONUS;
}

function handleBMR() {
  let w = parseFloat(document.getElementById("weightBMR").value);
  let h = parseFloat(document.getElementById("heightBMR").value);
  let a = parseFloat(document.getElementById("ageBMR").value);
  let g = document.getElementById("genderBMR").value;
  let res = document.getElementById("bmrResult");

  res.style.color = "green";

  // Валидация веса и роста
  if (
    isNaN(w) ||
    isNaN(h) ||
    !isFinite(w) ||
    !isFinite(h) ||
    w < 20 ||
    w > 300 ||
    h < 50 ||
    h > 250
  ) {
    res.innerText = "Ошибка: Вес (20-300), Рост (50-250)";
    res.style.color = "red";
    return;
  }

  // Валидация возраста (целое число, предел 200 лет)
  if (isNaN(a) || !isFinite(a) || !Number.isInteger(a) || a < 1 || a > 200) {
    res.innerText = "Ошибка: Возраст должен быть целым числом до 200 лет";
    res.style.color = "red";
    return;
  }

  if (g === "") {
    res.innerText = "Ошибка: Выберите пол";
    res.style.color = "red";
    return;
  }

  let result = calculateBMR(w, h, a, g);
  res.innerText = "Ваша норма: " + Math.round(result) + " ккал/день";
  console.log("handleBMR вызвана");
}

// ==========================================
// ЗАДАНИЕ 4: КОНВЕРТЕР РОСТА
// ==========================================

// ТИП: Стрелочные функции (Arrow Functions)
// ПОЧЕМУ: это самый современный и короткий способ. Идеально подходит
// для маленьких функций, которые просто делают одно математическое действие.
const getInches = (cm) => cm / 2.54;
const getCm = (ft, inc) => (ft * 12 + inc) * 2.54;

function handleCmToFeet() {
  let cm = parseFloat(document.getElementById("heightInput").value);
  let res = document.getElementById("heightResult");
  res.style.color = "green";

  if (isNaN(cm) || !isFinite(cm) || cm < 50 || cm > 250) {
    res.innerText = "Ошибка: Рост должен быть от 50 до 250 см";
    res.style.color = "red";
    return;
  }

  let totalInches = getInches(cm);
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches % 12);
  res.innerText = feet + " футов " + inches + " дюймов";
  console.log("handleCmToFeet вызвана");
}

function handleFeetToCm() {
  let ft = parseFloat(document.getElementById("feetInput").value);
  let inc = parseFloat(document.getElementById("inchesInput").value);
  let res = document.getElementById("heightResult2");
  res.style.color = "green";

  // Валидация системы мер (футы и дюймы всегда целые числа)
  if (
    !Number.isInteger(ft) ||
    !Number.isInteger(inc) ||
    ft < 0 ||
    ft > 8 ||
    inc < 0 ||
    inc > 11
  ) {
    res.innerText = "Ошибка: Введите целые футы (0-8) и дюймы (0-11)";
    res.style.color = "red";
    return;
  }

  let cm = getCm(ft, inc);
  res.innerText = Math.round(cm) + " см";
  console.log("handleFeetToCm вызвана");
}
