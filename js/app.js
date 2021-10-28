const btnRight = document.querySelector("#btn-right");
const btnLeft = document.querySelector("#btn-left");

const progress = document.querySelector(".progress");
const steps = document.querySelectorAll(".step");

let stepActive = 1;

// When the button "continue" is clicked,
// there is a movement of one step to the right
btnRight.addEventListener("click", () => {
  stepActive++;

  if (stepActive > steps.length) {
    stepActive === steps.length;
  }

  update();
});

// When the button "return" is clicked,
// there is a movement of one step to the left
btnLeft.addEventListener("click", () => {
  stepActive--;

  if (stepActive > steps.length) {
    stepActive === steps.length;
  }

  update();
});

// Update step status
const update = () => {
  steps.forEach((step, i) => {
    if (i < stepActive) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  let bigSize = window.matchMedia("(min-width: 1200px)");

  resizeWidth(bigSize);
  bigSize.addEventListener("change", resizeWidth);
}

// Control what happens when the width size changes
const resizeWidth = (bigSize) => {
  const actives = document.querySelectorAll(".active");

  if (bigSize.matches) {
    progress.style.width = (actives.length - 1) / (steps.length - 1) * 60 + "%";
  } else {
    progress.style.width = (actives.length - 1) / (steps.length - 1) * 90 + "%";
  }

  // The "continue" button is disabled when step 5 is reached
  // The "return" button is enable when step 5 is reached
  if (actives.length === 5) {
    btnRight.setAttribute("disabled", "");
    btnLeft.removeAttribute("disabled", "");
  };
}


