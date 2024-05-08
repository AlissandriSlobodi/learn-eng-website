import programs from './data.js';

const programDOM = document.querySelector(".singleProgram-wrapper");

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const programId = urlParams.get('id');

  // find the program with the matching ID
  const selectedResort = programs.find((program) => program.id == programId);

  // display the information about the selected program
  if (selectedResort) {
    displayResortInfo(selectedResort);
  } else {
    console.error('Resort not found');
  }
});

// display program description
function displayResortInfo(program) {
  const { title, category, date, img, desc } = program;

  programDOM.innerHTML = `<div class="singleProgram-container">
              <img src=${img} alt=${title} class="singleProgram-img" />
              <div class="singleProgram-info">
                <h4 class="singleProgram-area">${category}</h4>
                <h3 class="singleProgram-name">${title}</h3>
                <p class="singleProgram-date">${date}</p>
                <p class="singleProgram-desc">${desc}</p>
              </div>
            </div>`;
}

// relocate back to main page
const btnBackHome = document.querySelector('.program-btn');
btnBackHome.addEventListener('click', (e) => {
  e.preventDefault();

  history.go(-1);
});
