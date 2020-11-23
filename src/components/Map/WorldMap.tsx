import React, { useRef, useEffect, useCallback } from 'react';

import { Map as OLMap, View, Feature } from "ol";
import {Fill, Stroke, Circle, Style} from 'ol/style';
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
    },
    marker?: {
        lat: number,
        lng: number
    }
};

const WorldMap: React.FC<WorldMapProps> = ({ zoom, center, marker = { lat: 0, lng: 0} }): React.ReactElement => {
    const mapRef = useRef<HTMLDivElement>(null);
    // Initializing refs with an empty instance because if the initial value is null,
    // but the type parameter doesn't, useRef will return an immutable RefObject so
    // it should not be possible to assign a value to ref.current.
    const objectRef = useRef<OLMap>(new OLMap({}));
    const layerRef = useRef<VectorLayer>(new VectorLayer());

    const onInitMap = useCallback(() => {
        objectRef.current = new OLMap({
            target:mapRef.current?.id,
            layers: [
                new TileLayer({
                    source: new OSM({
                        attributions: [ 'Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>' ], 
                    }),
                }),
            ]
        });        
    }, []);

    const onUpdateMapOptions = useCallback(() => {
        objectRef.current.setView(new View({
            center: fromLonLat([center.lng, center.lat]),
            zoom: zoom,
        }));
    }, [center, zoom]);

    const onUpdateMarkerPosition = useCallback(() => {
        const issPoint = new Feature({
            geometry: new Point(fromLonLat([marker.lng, marker.lat]))
        });

        issPoint.setStyle(
            new Style({
                image: new Circle({
                  fill: new Fill({
                    color: 'rgba(255,0,0,0.4)'
                }),
                stroke: new Stroke({
                    color: '#ff0000',
                    width: 1.25
                }),
                radius: 10
                }),
                fill: new Fill({
                    color: 'rgba(255,0,0,0.4)'
                }),
                stroke: new Stroke({
                    color: '#ff0000',
                    width: 1.25
                })
            })
        );

        const layer = new VectorLayer({
            source: new VectorSource({
                features: [
                    issPoint
                ]
            })
        });
        
        objectRef.current.removeLayer(layerRef.current);
        layerRef.current = layer;
        objectRef.current.addLayer(layer); 
    }, [marker]);

    useEffect(() => {
        onInitMap();
    }, [onInitMap]);

    useEffect(() => {
        onUpdateMapOptions();
    }, [onUpdateMapOptions]);

    useEffect(() => {
        onUpdateMarkerPosition();
    }, [onUpdateMarkerPosition]);

    return (<div id="map-container" style={{height: '100vh', width: '100%'}} ref={mapRef}></div>);
};

export default WorldMap;