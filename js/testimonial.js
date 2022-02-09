/* ========== Get Testimonials =========== */
const getTestimonials = async () => {
  try {
    const results = await fetch('./data/testimonials.json');
    const data = await results.json();
    const testimonials = data.testimonials;
    return testimonials;
  } catch (err) {
    console.log(err);
  }
};

const testimonialsWrapper = document.querySelector('.test-wrapper');
const cards = [...document.querySelectorAll('.testimonials .card')];

window.addEventListener('DOMContentLoaded', async function () {
  const testimonials = await getTestimonials();
  displayTestimonials(testimonials);
  filter();
});

/* ========== Display Testimonials =========== */
const displayTestimonials = (items) => {
  let testimonials = items.map(
    (item) => ` 
                <div class="testimonial" data-id="${item.firstName}">
            <div class="d-flex">
              <div>
                <h4>${item.name}</h4>
                <span>${item.position}</span>
              </div>

              <div class="rating">
                <span><i class="bx bxs-star"></i></span>
                <span><i class="bx bxs-star"></i></span>
                <span><i class="bx bxs-star"></i></span>
                <span><i class='bx bxs-star-half' ></i></i></span>
                <span><i class='bx bxs-star-half' ></i></i></span>
              </div>
            </div>

            <p>
             ${item.info}
            </p>
          </div>
                  `
  );

  testimonials = testimonials.join('');
  testimonialsWrapper.innerHTML = testimonials;
};

/* ========== Filter Testimonials =========== */
function filter() {
  const testimonial = [...document.querySelectorAll('.testimonial')];
  for (let i = 0; i < cards.length; i++) {
    cards[0].classList.add('active');
    testimonial[0].classList.add('active');
    cards[i].onclick = function () {
      for (let x = 0; x < cards.length; x++) {
        cards[x].classList.remove('active');
      }
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      for (let z = 0; z < testimonial.length; z++) {
        testimonial[z].style.bottom = '-80%';
        testimonial[z].style.opacity = 0;

        if (testimonial[z].getAttribute('data-id') === filter) {
          testimonial[z].style.bottom = '0%';
          testimonial[z].style.opacity = 1;
        }
      }
    };
  }
}
