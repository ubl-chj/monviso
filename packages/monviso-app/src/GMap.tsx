import React, {ReactElement} from 'react'
import GoogleMapReact from 'google-map-react'
import {google} from 'google-maps'
import {InputForm} from './InputForm'
const imageUri = 'https://iiif.bodleian.ox.ac.uk/iiif/image/6b13a8ee-9abc-43ef-9dac-ed48ce579861'
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
const getNormalizedCoord = (coord: google.maps.Point, zoom: number) => {
  var y = coord.y;
  var x = coord.x;
  var tileRange = 1 << zoom;
  if (y < 0 || y >= tileRange) {
    return null;
  }
  if (x < 0 || x >= tileRange) {
    x = (x % tileRange + tileRange) % tileRange;
  }
  return {x: x, y: y};
}

const getTileUrl = (coord: google.maps.Point, zoom: number) => {
  const IIIF_ROTATION = '0'
  const width = 1818
  const height = 1228
  const scale = Math.pow(0.5, 6 - zoom)
  const levelWidth = Math.ceil(width * scale)
  const levelHeight = Math.ceil(height * scale)
  const tileWidth = 256;
  const tileHeight = 256;
  const iiifTileSizeWidth = Math.ceil(tileWidth / scale);
  const iiifTileSizeHeight = Math.ceil(tileHeight / scale);
  let iiifRegion
  let iiifSize
  const normalizedCoord = getNormalizedCoord(coord, zoom)
  if (!normalizedCoord) {
    return null;
  }
  if (levelWidth < tileWidth && levelHeight < tileHeight) {
    iiifSize = levelWidth + ",";
    iiifRegion = 'full';
  } else {
    const iiifTileX = coord.x * iiifTileSizeWidth;
    const iiifTileY = coord.y * iiifTileSizeHeight;
    const iiifTileW = iiifTileSizeWidth
    const iiifTileH = iiifTileSizeHeight
    iiifSize = Math.ceil(iiifTileW * scale) > 0 ? Math.ceil(iiifTileW * scale) + "," : tileWidth + ",";
    console.log('x: ' + coord.x)
    console.log('levelWidth: ' + levelWidth)
    console.log('size: ' + iiifSize)
    iiifRegion = [iiifTileX, iiifTileY, iiifTileW, iiifTileH].join(',');
    console.log('region: ' + iiifRegion)
    console.log('scale: ' + scale)
    console.log('level: ' + zoom)
  }
  return [imageUri, iiifRegion, iiifSize, IIIF_ROTATION, 'default.jpg'].join('/')
}

export const MapContainer: React.FC<any> = (): ReactElement => {
  let coordsDiv: any = React.createRef()

  const addCoordsDiv = (map: any, maps: any) => {
    map.controls[maps.ControlPosition.TOP_CENTER].push(coordsDiv.current);
    map.addListener('mousemove', function(event: any) {
      coordsDiv.current.textContent =
        'lat: ' + Math.round(event.latLng.lat()) + ', ' +
        'lng: ' + Math.round(event.latLng.lng());
    })
  }

  const handleApiLoaded = (map: any, maps: any) => {
    addCoordsDiv(map, maps)
    console.log('bounds: ' + map.getBounds())
    const sw = new maps.LatLng(82, -180)
    const ne = new maps.LatLng(85, -135)
    const bounds  = new maps.LatLngBounds(sw, ne)
    map.mapTypes.set('image', new maps.ImageMapType({
      maxZoom: 10,
      minZoom: 0,
      name: 'Manuscript',
      getTileUrl: getTileUrl,
      tileSize: new maps.Size(256, 256),
    }))
    map.setMapTypeId('image')
    map.fitBounds(bounds)
  };

  return (
    <div style={{ height: '100vh'}}>
      <InputForm/>
      <div ref={coordsDiv}/>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY as string }}
        defaultCenter={{lat: 0, lng: 0}}
        defaultZoom={6}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
      </GoogleMapReact>
    </div>
  )
}
