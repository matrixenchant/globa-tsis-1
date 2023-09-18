import MapLibreGL from 'maplibre-gl';

const map = new MapLibreGL.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/satellite/style.json?key=zAuOcOjUPxx3HebSBAXD', // style URL
  center: [26.166918502684638, 15.122206545363994], // starting position [lng, lat]
  zoom: 4, // starting zoom
  interactive: false,
});

const makeSmootherLine = (line) => {
  function interpolatePoints(point1, point2, numPoints) {
    const interpolatedPoints = [];
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const lat = point1[0] + (point2[0] - point1[0]) * t;
      const lng = point1[1] + (point2[1] - point1[1]) * t;
      interpolatedPoints.push([lat, lng]);
    }
    return interpolatedPoints;
  }

  const smoothedPath = [];
  for (let i = 0; i < line.length - 1; i++) {
    const currentPoint = line[i];
    const nextPoint = line[i + 1];
    const interpolatedPoints = interpolatePoints(currentPoint, nextPoint, 10); // Интерполируем 10 точек между каждой парой точек
    smoothedPath.push(...interpolatedPoints);
  }

  // Добавьте последнюю точку из исходного пути
  smoothedPath.push(line[line.length - 1]);

  return smoothedPath;
};

const mainPath = makeSmootherLine([
  [26.166918502684638, 15.122206545363994],
  [25.551118410139225, 16.718704810476964],
  [25.156770935340433, 19.11720702845568],
  [25.540455219610493, 21.343089178962273],
  [26.411465570171003, 22.742915108645334],
  [28.033200690392675, 24.712028388071346],
  [28.795076540410435, 26.167792549077575],
  [29.765750768285102, 28.13370570730605],
  [31.208460148397933, 30.018510628706352],
  [32.2730383945445, 30.50419431365603],
  [34.301318024282295, 30.793926489353268],
  [35.56117214476308, 31.030741026190782],
  [37.006638846905815, 31.853303297353378],
  [37.76905408482341, 32.71759837418078],
  [38.26276849187684, 34.06480344260487],
  [38.367743749042575, 35.21801628301603],
  [38.087281938720935, 36.3267922670948],
  [37.47278587723682, 37.22574359477977],
  [36.401801914495735, 38.3892990734673],
  [33.69385672810375, 39.37594875384582],
  [31.224896123410275, 40.2493028425923],
  [28.603094545328105, 41.10434960817463],
  [26.62272249815385, 42.186466806145546],
  [23.846842364205884, 43.012125937785925],
  [21.870252173660617, 44.1908581560796],
  [20.00782491917701, 45.37997407032671],
  [18.38740830993629, 46.29682662138862],
  [16.989393253087854, 46.59546515299567],
  [14.976115137553109, 46.72048731000197],
  [13.034269858612191, 46.52264583884414],
  [11.52730470845421, 46.182225487036845],
  [10.947669788371769, 45.7139465105366],
  [10.056121863362819, 45.068255306840314],
  [9.169504198211172, 44.88474430543519],
  [7.9654292840967855, 44.68933995951548],
  [6.996373796955766, 44.66518970121513],
  [5.522591232699654, 44.79088482390674],
  [4.250469599369126, 45.14621523732478],
  [3.1113010446669023, 45.55910052687469],
  [2.564411045336101, 45.82383851523329],
  [2.0932561967830736, 46.56759858739025],
  [1.7291259289883385, 47.56256306094377],
]);

// Создайте GeoJSON для линии
const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [],
      },
    },
  ],
};

// Добавьте линию на карту
map.on('load', function () {
  map.addSource('line', {
    type: 'geojson',
    data: geojson,
  });

  map.addLayer({
    id: 'line223',
    type: 'line',
    source: 'line',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': 'rgba(255, 255, 255, 0.8)',
      'line-width': 15,
    },
  });
});

function animateLine(index) {
  if (!map.getSource('line')) return;

  map.getSource('line').setData({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: mainPath.slice(0, index),
        },
      },
    ],
  });
}

export const animateMap = (progress) => {
  const index = Math.floor(mainPath.length * progress);

  animateLine(index);
  map.easeTo({
    center: mainPath[index],
    duration: 0,
  });
};
