/* ========== Products Slider =========== */
const swiper = new Swiper(".mySwiper", {
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".custom-pagination",
    clickable: true,
  },
  breakpoints: {
    567: {
      slidesPerView: 2,
    },
    996: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});

/* ========== Fetch the Products =========== */

const getProducts = async () => {
  try {
    const results = await fetch("./data/products.json");
    const data = await results.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};

const ProductsWrapper = document.getElementById("products-wrapper");

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  displayProductItems(products);
});

/* ========== Display Products =========== */
const displayProductItems = (items) => {
  let displayProduct = items.map(
    (product) => ` 
                <div class="swiper-slide">
                <div class="card d-flex">
                  <div class="image"><img src=${product.url} alt=""></div>
                  <div class="rating">
                  <span><i class="bx bxs-star"></i></span>
                  <span><i class="bx bxs-star"></i></span>
                  <span><i class="bx bxs-star"></i></span>
                  <span><i class="bx bxs-star"></i></span>
                  <span><i class="bx bxs-star"></i></span>
                  </div>
                  <h4>${product.title}</h4>
                  <div class="price">
                    <span>Price</span><span class="color">$${product.price}</span>
                  </div>
                  <div class="button btn">Add To Cart+</div>
                </div>
              </div>
                  `
  );

  displayProduct = displayProduct.join("");
  if (ProductsWrapper) {
    ProductsWrapper.innerHTML = displayProduct;
  }
};

/* ========== Filter Products =========== */
const filters = [...document.querySelectorAll(".filters span")];

filters.forEach((filter) => {
  filters[0].classList.add("active");
  filter.addEventListener("click", async (e) => {
    const id = e.target.getAttribute("data-filter");
    const target = e.target;
    const products = await getProducts();
    filters.forEach((btn) => {
      btn.classList.remove("active");
    });
    target.classList.add("active");

    let menuCategory = products.filter((product) => {
      if (product.category === id) {
        return product;
      }
    });

    if (id === "All Product") {
      displayProductItems(products);
      swiper.update();
    } else {
      displayProductItems(menuCategory);
      swiper.update();
    }
  });
});
