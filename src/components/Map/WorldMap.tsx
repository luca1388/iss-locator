import React, { useRef, useEffect, useCallback } from 'react';

import { Map as OLMap, View, Feature } from "ol";
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import TileLayer from "ol/layer/Tile";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from "ol/source/OSM";
import "ol/ol.css";

interface WorldMapProps {
    zoom: number,
    center: {
        lat: number,
        lng: number
    }
};

const WorldMap: React.FC<WorldMapProps> = ({ zoom, center }): React.ReactElement => {
    const mapRef = useRef<HTMLDivElement>(null);
    const objectRef = useRef<any>(null);
    const layerRef = useRef<any>(null);

    const initMap = useCallback(() => {
        if (objectRef.current) {
            return;
        }
        objectRef.current = new OLMap({
            target:mapRef.current?.id,
            layers: [
              new TileLayer({
                source: new OSM({
                    attributions: [ 'Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>' ], 
                }),
              }),
            ],
            view: new View({
              center: fromLonLat([center.lng, center.lat]),
              zoom: zoom,
            }),
          });
    }, [center, zoom]);

    useEffect(() => {
        initMap();
    }, [initMap]);

    useEffect(() => {
        const layer = new VectorLayer({
            source: new VectorSource({
                features: [
                    new Feature({
                        geometry: new Point(fromLonLat([center.lng, center.lat]))
                    })
                ]
            })
        });
        objectRef.current.removeLayer(layerRef.current);
        layerRef.current = layer;
        objectRef.current.addLayer(layer); 
    }, [center]);

    return (<div id="map-container" style={{height: '100vh', width: '100%'}} ref={mapRef}></div>);
};

export default WorldMap;