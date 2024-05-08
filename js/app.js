import programs from './data.js';

// Numbers
const items = [...document.querySelectorAll('#number')];
const updateCount = (el) => {
  const value = parseInt(el.dataset.value);
  const increment = Math.ceil(value / 1000);
  let initial = 0;

  const increaseCount = setInterval(() => {
    initial += increment;

    if (initial > value) {
      el.textContent = value;
      clearInterval(increaseCount);
      return;
    }

    el.textContent = initial;
  }, 10);
};

items.forEach((i) => updateCount(i));

// Slides
const slides = document.querySelectorAll('.single-slide');
slides.forEach((el) => {
  el.addEventListener('mouseover', () => {
    removeFocus();
    el.classList.add('selected');
  });

  const removeFocus = () => {
    slides.forEach((item) => {
      item.classList.remove('selected');
    });
  };
});

// Questions
const questions = document.querySelectorAll('.question');
questions.forEach((question) => {
  const btn = question.querySelector('.question-btn');

  btn.addEventListener('click', () => {
    questions.forEach((item) => {
      if (item !== question) {
        item.classList.remove('show-text');
      }
    });
    question.classList.toggle('show-text');
  });
});

// Hamburger Button
const hamburger = document.querySelector('.hamburger-btn');
const navMenu = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

const links = document.querySelectorAll('.nav-link');
links.forEach((link) =>
  link.addEventListener('click', function () {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  })
);

document.querySelector('.nav-logo').addEventListener('click', () => {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
});

// Header Background change on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY >= window.innerHeight - 500) {
    document.querySelector('.navbar').classList.add('active');
    document.querySelector('.nav-logo').classList.add('logo-active');
  } else {
    document.querySelector('.navbar').classList.remove('active');
    document.querySelector('.nav-logo').classList.remove('logo-active');
  }
});

/*------------------- Program buttons ------------------*/
const areasContainer = document.querySelector('.programs-container');
const btnAreas = document.querySelector('.areas-btn');

// load items
window.addEventListener('DOMContentLoaded', function () {
  displayAllPrograms(programs);
  displayAreasButtons();
});

// display programs buttons
function displayAreasButtons() {
  const areas = programs.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ['all']
  );

  const categoryBtns = areas
    .map((item) => {
      return `<button class="filter-btn" type="button" data-id=${item}>${item}</button>`;
    })
    .join('');

  btnAreas.innerHTML = categoryBtns;

  // filter programs
  const filterBtns = btnAreas.querySelectorAll('.filter-btn');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const category = e.currentTarget.dataset.id;
      filterAndDisplayPrograms(category);
    });
  });
}

displayAreasButtons();

// filter programs based on category and display them
function filterAndDisplayPrograms(category) {
  const areasCategory =
    category === 'all'
      ? programs
      : programs.filter((item) => item.category === category);

  displayAllPrograms(areasCategory);
}

// display programs
function displayAllPrograms(programs) {
  let displayProgram = programs
    .map((item) => {
      const { id, title, category, date, img, price } = item;
      return `<a href="#" class="single-program" data-program-id="${id}">
                <img src="${img}" alt="${title}" class="program-img" />
                <div class="program-info">
                  <p class="program-area">${category}</p>
                  <h4>${title}</h4>
                  <p class="program-date">${date}</p>
                  <p class="program-price">${price}</p>
                </div>
                <button class="see-more">See More</button>
              </a>`;
    })
    .join("");

  areasContainer.innerHTML = displayProgram;

  // redirect users to a single program page when clicked
  const singleProgram = document.querySelectorAll(".single-program");
  singleProgram.forEach((item) => {
    item.addEventListener("click", handleResortClick);
  });
}

// Handles the click event on a program element and redirects the user to the single program page
function handleResortClick(event) {
  const programId = event.currentTarget.dataset.programId;
  window.location.href = `program.html?id=${programId}`;
}
