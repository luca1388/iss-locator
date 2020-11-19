import React from 'react';

interface WorldMapProps {
    zoom: number,
    center: {
        lat: number,
        lng: number
    }
};

const WorldMap: React.FC<WorldMapProps> = (): React.ReactElement => {
    return (<div>map</div>);
};

export default WorldMap;