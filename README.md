# Carousel Product Recommendation Project

This project showcases a product carousel that dynamically fetches product data and displays it in an interactive and responsive layout. The JavaScript code is designed to be executed directly within the Chrome Developer Tools console, where it dynamically generates the HTML and CSS structures. Additionally, for convenience, standalone HTML, CSS, and JS files are also provided.

## Project Features

- Dynamically fetches product data from a remote API.
- Fully responsive layout that adjusts to different screen sizes and devices.
- Allows users to mark products as favorites, with state saved in localStorage.
- Smooth sliding transitions for carousel navigation.
- Lightweight and easy-to-integrate implementation.

## Files Included

### 1. **Ceren_Özdoğan.js**
   - The primary JavaScript file containing all logic for:
     - Building the HTML and CSS structures dynamically.
     - Fetching product data from the API.
     - Handling carousel functionality and favorite toggling.
   - In this file, the HTML, CSS, and JS have been combined to make it executable directly within the Chrome Developer Tools console.
   - The contents of `index.html`, `styles.css`, and `script.js` have been merged into this file, but all the files are also provided separately for convenience.

### 2. **index.html**
   - A standalone HTML file for running the project as a webpage.
   - Includes links to the CSS and JS files.

### 3. **styles.css**
   - Contains the CSS styles used to design the carousel.

### 4. **script.js**
   - The same JavaScript logic as in `ceren_özdoğan.js` but formatted to work with the HTML file.

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

## How to Run the Project

### Option 1: Using Chrome Developer Tools Console
1. Copy the contents of `ceren_özdoğan.js`.
2. Open a webpage in Chrome and press `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Option+J` (Mac) to open Developer Tools.
3. Paste the code into the console and press Enter.
4. The carousel will be built and displayed on the page.

### Option 2: Using Standalone Files
1. Open `index.html` in a web browser.
2. The carousel will load and display using the linked `styles.css` and `script.js` files.

## Responsive Design

| Screen Size            | Visible Items |
|------------------------|---------------|
| Desktop (1367px+)      | 6.5 items     |
| Tablet (768px-1366px)  | 4.5 items     |
| Mobile (481px-767px)   | 3.5 items     |
| Small Mobile (<480px)  | 1.5 items     |

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

## Future Improvements

- **Server-Side Caching:** Reduce load on the client by caching data server-side.
- **Accessibility Enhancements:** Add ARIA roles and keyboard navigation.
- **Unit Tests:** Include tests for core functionalities.
- **Advanced Features:** Implement filtering, sorting, or product categories.

## Additional Notes
- Ensure an active internet connection to fetch product data from the API.
- The carousel layout and interactions are optimized for both desktop and mobile devices.
- Modifications to the product data or styling can be made in the respective JavaScript or CSS files.

