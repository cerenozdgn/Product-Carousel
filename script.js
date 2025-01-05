(() => {
  const PRODUCT_URL =
    "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

  const isProductPage = () =>
    document.querySelector(".product-detail") !== null;

  const fetchProducts = async () => {
    const cachedProducts = localStorage.getItem("products");
    if (cachedProducts) {
      return JSON.parse(cachedProducts);
    }
    try {
      const response = await fetch(PRODUCT_URL);
      const products = await response.json();
      localStorage.setItem("products", JSON.stringify(products));
      return products;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  };

  const buildCarouselHTML = (products) => {
    const carouselHTML = `
      <div class="carousel-container">
        <h2 class="carousel-title">You Might Also Like</h2>
        <button class="arrow-btn left">&#10094;</button>
        <div class="carousel-wrapper">
          <div class="carousel">
            ${products
              .map(
                (product) => `
              <div class="carousel-item" data-url="${product.url}">
                <img src="${product.img}" alt="${product.name}">
                <div data-full-text="${product.name}">${product.name}</div>
                <div class="price">${product.price.toFixed(2)} TL</div>
                <span class="heart-icon" data-id="${product.id}">&#10084;</span>
              </div>`
              )
              .join("")}
          </div>
        </div>
        <button class="arrow-btn right">&#10095;</button>
      </div>
    `;
    document
      .querySelector(".product-detail")
      .insertAdjacentHTML("afterend", carouselHTML);
    restoreFavorites();
  };

  const setCarouselEvents = () => {
    const carousel = document.querySelector(".carousel");
    const items = document.querySelectorAll(".carousel-item");
    const leftButton = document.querySelector(".arrow-btn.left");
    const rightButton = document.querySelector(".arrow-btn.right");

    let itemWidth;
    let visibleItems;
    let currentIndex = 0;

    const calculateDimensions = () => {
      itemWidth = items[0].offsetWidth + 15;
      visibleItems = Math.floor(carousel.parentNode.offsetWidth / itemWidth);
    };

    const slide = (direction) => {
      currentIndex += direction;
      if (currentIndex < 0) {
        currentIndex = items.length - visibleItems;
      } else if (currentIndex > items.length - visibleItems) {
        currentIndex = 0;
      }
      carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    };

    const handleResize = () => {
      calculateDimensions();
      currentIndex = 0;
      carousel.style.transform = `translateX(0px)`;
    };

    leftButton.addEventListener("click", () => slide(-1));
    rightButton.addEventListener("click", () => slide(1));

    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target.classList.contains("heart-icon")) {
          toggleFavorite(e.target);
          e.stopPropagation();
        } else {
          const productUrl = item.dataset.url;
          window.open(productUrl, "_blank");
        }
      });
    });

    window.addEventListener("resize", handleResize);
    calculateDimensions();
  };
  const isTabletDevice = () => {
    const ua = navigator.userAgent.toLowerCase();
    const isIpad = ua.includes("ipad");
    const isTablet =
      isIpad || (window.innerWidth >= 768 && window.innerWidth <= 1024);
    return isTablet;
  };

  const adjustCarouselDimensions = () => {
    const items = document.querySelectorAll(".carousel-item");
    let visibleItems;

    if (isTabletDevice()) {
      visibleItems = 4.5;
    } else if (window.innerWidth >= 1367) {
      visibleItems = 6.5;
    } else if (window.innerWidth <= 480) {
      visibleItems = 1.5;
    } else {
      visibleItems = 3.5;
    }

    const itemWidth =
      document.querySelector(".carousel-wrapper").offsetWidth / visibleItems;
    items.forEach((item) => {
      item.style.flex = `0 0 ${itemWidth}px`;
    });
  };

  window.addEventListener("resize", adjustCarouselDimensions);
  document.addEventListener("DOMContentLoaded", adjustCarouselDimensions);

  const toggleFavorite = (heartIcon) => {
    const productId = heartIcon.dataset.id;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(productId)) {
      favorites = favorites.filter((id) => id !== productId);
      heartIcon.classList.remove("favorited");
    } else {
      favorites.push(productId);
      heartIcon.classList.add("favorited");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const restoreFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    document.querySelectorAll(".heart-icon").forEach((icon) => {
      if (favorites.includes(icon.dataset.id)) {
        icon.classList.add("favorited");
      }
    });
  };

  const initCarousel = async () => {
    if (!isProductPage()) return;

    const products = await fetchProducts();
    buildCarouselHTML(products);
    setCarouselEvents();
  };

  initCarousel();
})();
