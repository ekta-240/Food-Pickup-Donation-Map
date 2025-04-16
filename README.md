# Food Pickup & Donation Map

This project is a web-based application that visualizes food pickup and donation locations on an interactive map using [Leaflet.js](https://leafletjs.com/). It aims to connect food donors and seekers to promote sharing meals and spreading kindness.

## Features

- Interactive map with markers for food pickup and donation locations.
- Separate icons and colors for food donors and seekers.
- Clickable list of locations to fly to the respective marker on the map.
- Popups with detailed information about each location, including address and contact number.

## Technologies Used

- **HTML, CSS, JavaScript**: For the frontend.
- **Leaflet.js**: For map rendering and interactivity.
- **GeoJSON**: For storing location data.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ekta-240/Pickup-Donation-Map.git
   cd food-pickup-donation-map
   ```

2. Open the project folder and ensure the following files are present:
   - `index.html`
   - `style.css`
   - `app.js`
   - `stores.js`
   - Marker images (`red marker.png`, `green marker.png`)

3. Open `index.html` in your browser to view the application.

## Folder Structure

```
leaflet/
├── index.html       # Main HTML file
├── style.css        # Stylesheet for the application
├── app.js           # JavaScript logic for map and interactivity
├── stores.js        # GeoJSON data for locations
├── marker.png       # Default marker icon
├── red marker.png   # Marker icon for food seekers
├── green marker.png # Marker icon for food donors
```

## How It Works

1. **Map Initialization**: The map is initialized using Leaflet.js with OpenStreetMap tiles.
2. **Location Data**: Locations are stored in `stores.js` as GeoJSON features.
3. **Markers**: Custom markers are used to differentiate between food donors and seekers.
4. **List and Popups**: A list of locations is displayed, and clicking on a location flies to the respective marker and shows a popup with details.


## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.# Pickup-Donation-Map
