# Carousel Product Recommendation Project

This project is a simple implementation of a carousel that displays recommended products. The products are fetched from a remote API and stored locally in the browser for caching. Users can interact with the carousel to view products, open product links, and mark favorites.

## Features

- **Dynamic Carousel:**
  - Automatically adjusts the number of visible items based on the screen size.
  - Responsive design with smooth transitions.
- **Favorites Functionality:**
  - Users can favorite/unfavorite items.
  - Favorites are saved in `localStorage`.
- **Product Caching:**
  - Fetches products from a remote API.
  - Products are cached in `localStorage` to minimize redundant API calls.
- **Cross-Device Compatibility:**
  - Designed to work seamlessly on mobile, tablet, and desktop screens.

## Technologies Used

- **HTML:** Page structure and carousel layout.
- **CSS:** Responsive and adaptive styles.
- **JavaScript:**
  - Fetch API for data retrieval.
  - Event handling for interactivity.
  - Local storage for caching and saving user preferences.

## Installation

1. Clone this repository or copy the provided script into your project.
2. Ensure you have a modern browser with JavaScript enabled.

## Usage

1. Copy and paste the provided script into an HTML file or include it in your project.
2. Load the page in a browser. The carousel will automatically initialize.
3. Use the left and right arrows to navigate the carousel.
4. Click on a product to open its link.
5. Click the heart icon to favorite/unfavorite a product.

## API Endpoint

The products are fetched from the following URL:

```
https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json
```

The JSON structure for products is expected to be:

```json
[
  {
    "id": "1",
    "name": "Product Name",
    "img": "Image URL",
    "price": 100.00,
    "url": "Product Link"
  }
]
```

## Key Functions

### `fetchProducts`
- Fetches products from the API or retrieves them from `localStorage` if already cached.

### `buildPageStructure`
- Dynamically generates the basic HTML structure for the carousel.

### `buildCarouselHTML`
- Builds the carousel's inner HTML using the fetched product data.

### `setCarouselEvents`
- Adds click and resize event listeners for interactivity.

### `toggleFavorite`
- Handles the logic for marking products as favorites.

### `restoreFavorites`
- Restores favorite items from `localStorage` on page load.

### `adjustCarouselDimensions`
- Adjusts the carousel's item dimensions based on screen size.

## Responsive Design

| Screen Size            | Visible Items |
|------------------------|---------------|
| Desktop (1367px+)      | 6.5 items     |
| Tablet (768px-1366px)  | 4.5 items     |
| Mobile (481px-767px)   | 3.5 items     |
| Small Mobile (<480px)  | 1.5 items     |

## Future Improvements

- **Server-Side Caching:** Reduce load on the client by caching data server-side.
- **Accessibility Enhancements:** Add ARIA roles and keyboard navigation.
- **Unit Tests:** Include tests for core functionalities.
- **Advanced Features:** Implement filtering, sorting, or product categories.



