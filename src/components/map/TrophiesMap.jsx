import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import countriesData from './countries.geo.json';
import './Map.css'
import MapOverlay from './MapOverlay';

function Map() {

  const [competitions, setCompetitions] = useState([]);
  const [allCompetitions, setAllCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitionsData = async () => {
      try {
        // Fetch competitions from backend when component mounts
        const response = await fetch('http://localhost:5000/api/competitions/group')
        if (!response.ok) {
          throw new Error('Failed to fetch competitions');
        }
        const competitionsData = await response.json();
        setAllCompetitions(competitionsData);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };
  
    fetchCompetitionsData();
  }, []);

  useEffect(() => {
    // Initialize map
    const map = L.map('map', {
      minZoom: 2,
      maxZoom: 100
    }).setView([0, 0], 2);
    var countryJson;
    
    function zoomToFeature(e) {
      if(e?.target?.feature?.properties?.name){
        const country = allCompetitions.find(c => c.country_name === e.target.feature.properties.name);
        if(country?.competitions){
          setCompetitions([]);
          setCompetitions(country.competitions);
        }
        else{
          setCompetitions([])
        }
      }
      else{
        setCompetitions([])
      }
      map.fitBounds(e.target.getBounds());
    }
    function highlightFeature(e) {
      var layer = e.target;
      layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
      });  
      layer.bringToFront();
    }
    function resetHighlight(e) {
      countryJson.resetStyle(e.target);
    }
    function onEachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    countryJson = L.geoJson(countriesData, {
      onEachFeature: onEachFeature
    }).addTo(map);

    // Cleanup function
    return () => {
      // Clean up map when component unmounts
      map.remove();
    };
  }, [allCompetitions]); 
  

  return (
    <div style={{height: '90%', width: '100%'}}>
    <div id="map" style={{ height: '95%', width: '95%', margin: '16px auto' }}></div>
      <MapOverlay competitions={competitions} />
    </div>
  );
}

export default Map;

  