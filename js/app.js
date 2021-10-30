const tabs = [
  {
    title: "Step 1",
    content: "Nullam et dignissim erat, a consectetur risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus maximus vulputate mi a pretium. Curabitur at arcu accumsan, tempus nulla vitae, fermentum ipsum. Praesent cursus iaculis dolor, id porta felis convallis at. Praesent quis sem tristique, accumsan ipsum sed, sollicitudin diam. Suspendisse potenti. Quisque ac nunc nec enim venenatis malesuada. Quisque nec porttitor libero."
  },
  {
    title: "Step 2",
    content: "Vestibulum posuere, eros id imperdiet consectetur, quam ante interdum ipsum, ac posuere orci risus eget diam. Proin rhoncus dolor ipsum, at feugiat tellus sollicitudin at. Quisque eu sapien ac lectus ultricies lacinia et ultrices nunc. Etiam pellentesque eget neque sit amet fermentum. Nulla eget ultrices magna. Nullam fermentum turpis sed augue commodo, at eleifend ligula elementum. Donec id diam at ante commodo eleifend sed non odio. Etiam non nisi ac quam finibus dictum. Sed ullamcorper bibendum tellus, vel imperdiet justo venenatis ut. In sit amet sapien facilisis, finibus felis in, varius ex"
  },
  {
    title: "Step 3",
    content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae."
  },
  {
    title: "Step 4",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    title: "Step 5",
    content: "Ut gravida, diam sit amet euismod tincidunt, massa augue eleifend arcu, non consectetur velit magna nec mi. Aliquam ut tincidunt sem, ut ullamcorper turpis. Sed id quam eu justo accumsan ultricies et eu urna. Fusce tincidunt malesuada pellentesque. In in facilisis lorem. Ut pretium enim at sem sollicitudin, at fringilla nulla eleifend. Maecenas hendrerit velit sed est finibus malesuada. Proin dictum posuere mi, ut lacinia dui sagittis vel. Vivamus luctus sagittis pharetra. Fusce a pulvinar augue. Nulla viverra dapibus massa, sed pretium massa ultrices in. Praesent sed diam lorem."
  }
];

const btnRight = document.querySelector("#btn-right");
const btnLeft = document.querySelector("#btn-left");

const progress = document.querySelector(".progress");
const steps = document.querySelectorAll(".step");

const cardTitle = document.querySelector("h2");
const cardContent = document.querySelector("p");

cardTitle.innerHTML = tabs[0].title;
cardContent.innerHTML = tabs[0].content;

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

  btnStatus(actives);

  changeCard(actives);
}

// Control when a button is disabled or not
const btnStatus = (actives) => {
  // The "continue" button is disabled when step 5 is reached
  // The "return" button is enable when step 5 is reached
  // The "return" button is disabled when step 1 is reached
  // The "continue" button is enable when step 1 is reached
  // Both "return" and "continue" buttons are enabled in steps 2, 3 and 4
  if (actives.length === 5) {
    btnRight.setAttribute("disabled", "");
    btnLeft.removeAttribute("disabled", "");
  } else if (actives.length === 1) {
    btnLeft.setAttribute("disabled", "");
    btnRight.removeAttribute("disabled", "");
  } else {
    btnRight.removeAttribute("disabled", "");
    btnLeft.removeAttribute("disabled", "");
  }
}

// Change the content of the card according to the step that is active
const changeCard = (actives) => {
  cardTitle.innerHTML = tabs[actives.length - 1].title;
  cardContent.innerHTML = tabs[actives.length - 1].content;
}