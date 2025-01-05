(() => {
  const PRODUCT_URL =
    "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

  const buildPageStructure = () => {
    document.body.innerHTML = `
        <div class="product-detail"></div>
        <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
            }

            .carousel-container {
              position: relative;
              margin: 20px auto;
              max-width: 90%;
              background: white;
              padding: 15px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }

            .carousel-title {
              font-size: 20px !important;
              font-weight: bold;
              margin-bottom: 15px;
            }

            .carousel-wrapper {
              overflow: hidden;
            }

            .carousel {
              display: flex;
              transition: transform 0.5s ease-in-out;
              gap: 15px;
            }

            .carousel-item {
              flex: 0 0 calc((100% - 90px) / 6.5); 
              max-width: calc(100% / 6.5);
              border: 1px solid #ddd;
              border-radius: 8px;
              overflow: hidden;
              background: #fff;
              text-align: center;
              cursor: pointer;
              position: relative;
            }

            .carousel-item img {
              width: 100%;
              height: auto;
            }

            .carousel-item div {
              overflow: visible;
              white-space: normal;
              text-overflow: ellipsis;
              padding: 8px;
              font-size: 14px;
              position: relative;
              text-overflow: clip;
            }

            .carousel-item .price {
              font-size: 16px !important; 
              font-weight: bold;
              color: #333;
            }

            .heart-icon {
              position: absolute;
              top: 10px;
              right: 10px;
              font-size: 1.5em; 
              color: grey;
              cursor: pointer;
            }

            .heart-icon.favorited {
              color: blue;
            }

            .arrow-btn {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              background: #fff;
              border: none;
              padding: 10px;
              z-index: 2;
              cursor: pointer;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .arrow-btn.left {
              left: 10px;
            }

            .arrow-btn.right {
              right: 10px;
            }

            @media (min-width: 768px) and (max-width: 1366px) and (orientation: portrait),
              (min-width: 1024px) and (max-width: 1366px) and (orientation: landscape) {
              .carousel-item {
                flex: 0 0 calc((100% - 60px) / 4.5); 
                max-width: calc((100% - 60px) / 4.5);
              }
              .carousel-item div {
                font-size: 14px !important; 
              }
              .carousel-item .price {
                font-size: 16px !important; 
              }
              .heart-icon {
                font-size: 1.3em; 
              }
            }


            @media (min-width: 1367px) {
              .carousel-item {
                flex: 0 0 calc((100% - 90px) / 6.5); 
                max-width: calc((100% - 90px) / 6.5);
              }
              .carousel-item div {
                font-size: 16px !important; 
              }
              .carousel-item .price {
                font-size: 18px !important; 
              }
            }
            @media (min-width: 481px) and (max-width: 1024px) {
              .carousel-item {
                flex: 0 0 calc((100% - 45px) / 3.5);
                max-width: calc((100% - 45px) / 3.5);
              }
              .carousel-item div {
                font-size: 13px !important; 
              }
              .carousel-item .price {
                font-size: 14px !important; 
              }
              .heart-icon {
                font-size: 1.2em; 
              }
            }

            @media (max-width: 480px) {
              .carousel-item {
                flex: 0 0 calc((100% - 15px) / 1.5);
                max-width: calc((100% - 15px) / 1.5);
              }
              .carousel-item div {
                font-size: 12px !important; 
              }
              .carousel-item .price {
                font-size: 12px !important; 
              }
              .heart-icon {
                font-size: 1em; 
              }
            }
        </style>
      `;
  };

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
    buildPageStructure();
    const products = await fetchProducts();
    buildCarouselHTML(products);
    setCarouselEvents();
  };

  initCarousel();
})();
