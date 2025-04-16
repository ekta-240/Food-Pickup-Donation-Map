const map = L.map('map').setView([22.9074872, 79.07306671], 5);
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'; 
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tiles = L.tileLayer(tileUrl, { maxZoom: 19, attribution });
tiles.addTo(map);


const shelterNames = [
    "St. Mary's Shelter",
    "Open Arms Outreach",
    "East Side Community Center",
    "Harlem Family Shelter",
    "Sunrise Youth Home",
    "South Queens Assistance",
    "Unity House",
    "Haven Outreach Services",
    "Brooklyn Family Center",
    "HopeBridge Shelter",
    "Starlight Refuge Home",
    "Mission Hands Food Bank"
];

const mealProviderNames = [
    "Daya Rasoi",
    "Annadatta Kitchen",
    "Prem Bhojan Sewa",
    "Jeevan Meals Trust",
    "Nitya Ahaar Foundation",
    "Sneh Bhojan Kendra",
    "Anugrah Food Point",
    "Bhojan Daan Yojna",
    "Nirmal Aahar Center",
    "Karuna Rasoi",
    "Sewa Bhoj Foundation",
    "Samarpan Meal House",
    "Ujjwal Kitchen Aid",
    "Apna Bhojan Kendra",
    "Aasra Food Relief",
    "Sattva Seva Kitchen",
    "Amrit Bhojan Kendra"
];

let shelterIndex = 0; // Counter to track the current shelter name
let mealProviderIndex = 0; // Counter to track the current meal provider name

function generateList() {
    const ul = document.querySelector('.list');
    storeList.forEach((shop) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const p = document.createElement('p');
        a.addEventListener('click', () => {
            flyToStore(shop);
        });
        div.classList.add('shop-item');
        if (shop.properties.isDonation) {
            shop.properties.shelterName = shelterNames[shelterIndex % shelterNames.length]; // Assign unique shelter name
            shelterIndex++; // Increment the shelter counter
        } else {
            shop.properties.mealProviderName = mealProviderNames[mealProviderIndex % mealProviderNames.length]; // Assign unique meal provider name
            mealProviderIndex++; // Increment the meal provider counter
        }
        a.classList.add(shop.properties.isDonation ? 'red-heading' : 'green-heading'); // Add class based on property
        a.innerText = shop.properties.isDonation ? shop.properties.shelterName : shop.properties.mealProviderName; // Use shelter or meal provider name
        a.href = '#';
        p.innerText = shop.properties.address;

        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);
    });
}

generateList();

function makePopupContent(shop) {
    const headingBackgroundColor = shop.properties.isDonation ? 'red' : 'green'; // Red for food seekers, green for food donors
    const headingText = shop.properties.isDonation ? shop.properties.shelterName : shop.properties.mealProviderName; // Use shelter or meal provider name
    return `
      <div>
          <h4 style="background-color: ${headingBackgroundColor}; color: white; padding: 10px; border-radius: 5px;">
              ${headingText}
          </h4>
          <p>${shop.properties.address}</p>
          <div class="phone-number">
              <a href="tel:${shop.properties.phone}" style="color: ${headingBackgroundColor};">${shop.properties.phone}</a>
          </div>
      </div>
    `;
}

function onEachFeature(feature, layer) {
    const index = storeList.findIndex((shop) => shop === feature); // Find the index of the current feature
    layer.bindPopup(makePopupContent(feature, index), { closeButton: false, offset: L.point(0, -8) });
}

var myIcon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [30, 40]
});

const redIcon = L.icon({
    iconUrl: './red marker.png', // Ensure this image has no background
    iconSize: [20, 30], // Adjust size if needed
    iconAnchor: [10, 30], // Anchor point to align the marker properly
    popupAnchor: [0, -30] // Adjust popup position relative to the marker
});

const greenIcon = L.icon({
    iconUrl: './green marker.png', // Ensure this image has no background
    iconSize: [20, 30], // Adjust size if needed
    iconAnchor: [10, 30], // Anchor point to align the marker properly
    popupAnchor: [0, -30] // Adjust popup position relative to the marker
});

const shopsLayer = L.geoJSON(storeList, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
        const icon = feature.properties.isDonation ? redIcon : greenIcon; // Red for food seekers, green for food donors
        return L.marker(latlng, { icon: icon });
    }
});
shopsLayer.addTo(map);

function flyToStore(store) {
    const lat = store.geometry.coordinates[1];
    const lng = store.geometry.coordinates[0];
    map.flyTo([lat, lng], 14, {
        duration: 3
    });
    setTimeout(() => {
        L.popup({closeButton: false, offset: L.point(0, -8)})
        .setLatLng([lat, lng])
        .setContent(makePopupContent(store))
        .openOn(map);
    }, 3000);
}
