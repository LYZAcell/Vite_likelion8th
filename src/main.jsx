import React, { useEffect, useState } from 'react';

const App = () => {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [keyword, setKeyword] = useState('병원');

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new window.kakao.maps.Map(container, options);
    setMap(map);
  }, []);

  const searchPlaces = () => {
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);
        displayMarkers(data);
      }
    });
  };

  const displayMarkers = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    places.forEach(place => {
      const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map
      });
      bounds.extend(markerPosition);
    });
    map.setBounds(bounds);
  };

  return (
    <div>
      <h1>Kakao Map Hospital Search</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={searchPlaces}>Search</button>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <ul>
        {places.map((place, index) => (
          <li key={index}>
            <h2>{place.place_name}</h2>
            <p>{place.road_address_name || place.address_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
