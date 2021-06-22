// debounce function, when wrapping checkSlide function, slows the number of events logged for better performance
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// select image elements on the page
const images = document.querySelectorAll(".slide-in");

const checkSlide = (e) => {
  images.forEach((image) => {
    // a variable to check when the scroll is halfway through the image
    const slideInAt = window.scrollY + window.innerHeight - image.height / 2;
    // a variable to check the bottom of the image
    const imageBottom = image.offsetTop + image.height;
    // a variable to check when half of the image is in view on scroll
    const isHalfShown = slideInAt > image.offsetTop;
    // a variable to check that the image is still in view on scroll
    const isNotScrolledPast = window.scrollY < imageBottom;
    // the if/else check that the image is half in view on scroll, and not scrolled past, then adds the class of active to the image element
    if (isHalfShown && isNotScrolledPast) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  });
};

// event listener checking for the user scroll
window.addEventListener("scroll", debounce(checkSlide));
