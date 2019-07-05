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
  console.log(currentImageIdBase)
  const currentImageUUID = currentImageId && uuidv5('url', currentImageId)
  console.log(currentImageUUID)
  const imageWidth = getImageWidth(currentImageUUID)
  const imageHeight = getImageHeight(currentImageUUID)
  const imageTiles = getImageTiles(currentImageUUID)
  const tileWidth = imageTiles && imageTiles[0].width
  console.log(tileWidth)
  const tileHeight = (imageTiles && imageTiles[0].height) || (imageTiles && imageTiles[0].width)
  const scaleFactors = imageTiles && imageTiles[0].scaleFactors

  const getNumTiles =(level: number) => {
      const x = Math.ceil( level * imageWidth / tileWidth )
      const y = Math.ceil( level * imageHeight / tileHeight )

    return {x, y};
  }

  const getTileUrl = (coord: google.maps.Point, zoom: number) => {
    console.log('zoom: ' + zoom)
    const maxScaleFactor = Math.max.apply(null, scaleFactors)
    const maxLevel = Math.round(Math.log(maxScaleFactor) * Math.LOG2E)
    console.log('maxLevel: ' + maxLevel)
    const IIIF_ROTATION = '0'
    const scale = Math.pow(0.5, maxLevel - zoom)
    const levelWidth = Math.ceil(imageWidth * scale)
    const levelHeight = Math.ceil(imageHeight * scale)
    const iiifTileSizeWidth = Math.ceil(tileWidth / scale);
    console.log('iiifTileSizeWidth: ' + iiifTileSizeWidth)
    const iiifTileSizeHeight = Math.ceil(tileHeight / scale);
    let iiifRegion
    let iiifSize
    if (levelWidth < tileWidth && levelHeight < tileHeight) {
      iiifSize = levelWidth + ",";
      iiifRegion = 'full';
    } else {
      const iiifTileX = coord.x * iiifTileSizeWidth;
      const iiifTileY = coord.y * iiifTileSizeHeight;
      const iiifTileW = Math.min( iiifTileSizeWidth, Math.abs(imageWidth - iiifTileX))
      const iiifTileH = Math.min( iiifTileSizeHeight, Math.abs(imageHeight - iiifTileY))
      iiifSize = Math.ceil(iiifTileW * scale) > 0 ? Math.ceil(iiifTileW * scale) + "," : tileWidth + ",";
      console.log('size: ' + iiifSize)
      iiifRegion = [iiifTileX, iiifTileY, iiifTileW, iiifTileH].join(',');
      console.log('region: ' + iiifRegion)
      console.log('scale: ' + scale)
      console.log('level: ' + zoom)
    }
    return [currentImageIdBase, iiifRegion, iiifSize, IIIF_ROTATION, 'default.jpg'].join('/')
  }

  const addCoordsDiv = (map: any, maps: any) => {
    map.controls[maps.ControlPosition.TOP_CENTER].push(coordsDiv.current);
    map.addListener('mousemove', function(event: any) {
      coordsDiv.current.textContent =
        'lat: ' + Math.round(event.latLng.lat()) + ', ' +
        'lng: ' + Math.round(event.latLng.lng());
    })
  }

  const buildImageMap = (maps: any) => {
    return new maps.ImageMapType({
      maxZoom: 10,
      minZoom: 1,
      name: 'Manuscript',
      getTileUrl: getTileUrl,
      tileSize: new maps.Size(256, 256),
    })
  }

  const handleApiLoaded = (map: any, maps: any) => {
    addCoordsDiv(map, maps)
    map.mapTypes.set('image', buildImageMap(maps))
    map.setMapTypeId('image')
  };

  const buildOptions = (maps: any) => {
    return {
      zoom: 1,
      zoomControl: true,
      zoomControlOptions: {
        position: maps.ControlPosition.LEFT_TOP
      },
    }
  }

  return currentImageId && scaleFactors ? (
    <div style={{ height: '100vh'}}>
      <div ref={coordsDiv}/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY as string }}
          defaultCenter={{lat: 0, lng: 0}}
          defaultZoom={1}
          key={currentImageId}
          options={buildOptions}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        />
      </div>
  ) : <></>
}
