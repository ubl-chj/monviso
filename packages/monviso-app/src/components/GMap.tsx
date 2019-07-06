import React, {ReactElement, useRef} from 'react'
import GoogleMapReact from 'google-map-react'
import {google} from 'google-maps'
import {getCurrentImageId, getImageHeight, getImageTiles, getImageWidth} from '@monviso/core'
import uuidv5 from 'uuidv5'
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

export const MapContainer: React.FC<any> = (): ReactElement => {
  let coordsDiv: any = useRef()
  const currentImageId = getCurrentImageId()
  const currentImageIdBase = currentImageId.substring(0, currentImageId.lastIndexOf("/"))
  const currentImageUUID = currentImageId && uuidv5('url', currentImageId)
  const imageWidth = getImageWidth(currentImageUUID)
  const imageHeight = getImageHeight(currentImageUUID)
  const imageTiles = getImageTiles(currentImageUUID)
  const tileWidth = imageTiles && imageTiles[0].width
  const tileHeight = (imageTiles && imageTiles[0].height) || (imageTiles && imageTiles[0].width)
  const scaleFactors = imageTiles && imageTiles[0].scaleFactors

  interface ICoord {
    x: number;
    y: number;
  }

  const getNormalizedCoord = (coord: ICoord, zoom: number): ICoord | null => {
    const y = coord.y;
    const x = coord.x;
    const tileRange = 1 << zoom;
    if (y < 0 || y >= tileRange) {
      return null;
    }
    if (x < 0 || x >= tileRange) {
      return null;
    }
    return {x, y};
  }

  const getTileUrl = (coord: google.maps.Point, zoom: number): string | null => {
    const normalizedCoord = getNormalizedCoord(coord, zoom)
    const maxScaleFactor = Math.max.apply(null, scaleFactors)
    const maxLevel = Math.round(Math.log(maxScaleFactor) * Math.LOG2E)
    const IIIF_ROTATION = '0'
    const scale = Math.pow(0.5, maxLevel - zoom)
    const levelWidth = Math.ceil(imageWidth * scale)
    const levelHeight = Math.ceil(imageHeight * scale)
    const iiifTileSizeWidth = Math.ceil(tileWidth / scale);
    const iiifTileSizeHeight = Math.ceil(tileHeight / scale);
    let iiifRegion
    let iiifSize
    if (levelWidth < tileWidth && levelHeight < tileHeight) {
      iiifSize = levelWidth + ",";
      iiifRegion = 'full';
    } else if (normalizedCoord) {
      const iiifTileX = normalizedCoord.x * iiifTileSizeWidth;
      const iiifTileY = normalizedCoord.y * iiifTileSizeHeight;
      const iiifTileW = Math.min(iiifTileSizeWidth, Math.abs(imageWidth - iiifTileX))
      const iiifTileH = Math.min(iiifTileSizeHeight, Math.abs(imageHeight - iiifTileY))
      iiifSize = Math.ceil(iiifTileW * scale) > 0 ? Math.ceil(iiifTileW * scale) + "," : tileWidth + ",";
      iiifRegion = [iiifTileX, iiifTileY, iiifTileW, iiifTileH].join(',');
    }
    if (iiifRegion && iiifSize) {
      return [currentImageIdBase, iiifRegion, iiifSize, IIIF_ROTATION, 'default.jpg'].join('/')
    } else {
      return null
    }
  }

  const addCoordsDiv = (map: any, maps: any): void => {
    map.controls[maps.ControlPosition.BOTTOM_CENTER].push(coordsDiv.current);
    map.addListener('mousemove', (event: any): void => {
      coordsDiv.current.textContent =
        'lat: ' + Math.round(event.latLng.lat()) + ', ' +
        'lng: ' + Math.round(event.latLng.lng());
    })
  }

  const buildImageMap = (maps: any): google.maps.ImageMapType => {
    return new maps.ImageMapType({
      maxZoom: 10,
      minZoom: 3,
      name: 'Manuscript',
      getTileUrl,
      tileSize: new maps.Size(128, 128),
    })
  }

  const handleApiLoaded = ({map, maps}: any): void => {
    addCoordsDiv(map, maps)
    map.mapTypes.set('image', buildImageMap(maps))
    map.setMapTypeId('image')
  };

  const buildOptions = (maps: any): {} => {
    return {
      gestureHandling: 'greedy',
      minZoom: 3,
      zoomControl: true,
      zoomControlOptions: {
        position: maps.ControlPosition.LEFT_TOP
      },
    }
  }

  return currentImageId && scaleFactors ? (
    <div style={{height: 'calc(100vh - 88px)'}}>
      <div ref={coordsDiv}/>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY as string }}
        defaultCenter={{lat: 78, lng: -107}}
        defaultZoom={3}
        key={currentImageId}
        options={buildOptions}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
      />
    </div>
  ) : <></>
}
