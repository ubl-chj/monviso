import {
  IPointAnnotation,
  getCurrentImageId,
  getImageHeight,
  getImageTiles,
  getImageWidth,
  setPointAnnotation
} from '@monviso/core'
import React, {ReactElement, useRef} from 'react'
import {FlagMarker} from '.'
import GoogleMapReact from 'google-map-react'
import {google} from 'google-maps'
import {useDispatch} from "react-redux"
import {useValue} from '../utils'
import uuid from 'uuid'
import uuidv5 from 'uuidv5'

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

export const MapContainer: React.FC<any> = (): ReactElement => {
  let coordsDiv: any = useRef()
  const currentImageId = getCurrentImageId()
  const currentImageIdBase = currentImageId.substring(0, currentImageId.lastIndexOf("/"))
  const currentImageUUID = currentImageId && uuidv5('url', currentImageId)
  const dispatch = useDispatch()
  const imageWidth = getImageWidth(currentImageUUID)
  const imageHeight = getImageHeight(currentImageUUID)
  const imageTiles = getImageTiles(currentImageUUID)
  const [value, setValue] = useValue('annotations', undefined, undefined) as any
  const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let labelIndex = 0
  const scaleFactors = imageTiles && imageTiles[0].scaleFactors
  const maxScaleFactor = Math.max.apply(null, scaleFactors)
  const varTileWidth = Math.ceil(imageWidth / maxScaleFactor)
  const varTileHeight = Math.ceil(imageHeight / maxScaleFactor)

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
    const maxScale = Math.round(Math.log(maxScaleFactor) * Math.LOG2E)
    const IIIF_ROTATION = '0'
    const scale = Math.pow(0.5, maxScale - zoom)
    const scaledTileWidth = Math.ceil(varTileWidth / scale);
    const scaledTileHeight = Math.ceil(varTileHeight / scale)
    if (normalizedCoord) {
      // region
      const rx = normalizedCoord.x * scaledTileWidth
      const ry = normalizedCoord.y * scaledTileHeight
      let rw = scaledTileWidth
      if (rx + rw > imageWidth) {
        rw = Math.abs(imageWidth - rx)
      }
      let rh = scaledTileHeight
      if (ry + rh > imageHeight) {
        rh = Math.abs(imageHeight - ry)
      }
      // size
      let sw = varTileWidth
      if (rx + scaledTileWidth > imageWidth) {
        sw = Math.ceil((imageWidth - rx + scale - 1) * scale)
      }
      let sh = varTileHeight
      if (ry + scaledTileHeight > imageHeight) {
        sh = Math.ceil((imageHeight - ry + scale - 1) * scale)
      }
      const iiifRegion = [rx, ry, rw, rh].join(',')
      const iiifSize = [sw, sh].join(',')
      if (iiifRegion && iiifSize) {
        return [currentImageIdBase, iiifRegion, iiifSize, IIIF_ROTATION, 'default.jpg'].join('/')
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const addCoordsDiv = (map: any, maps: any): void => {
    map.controls[maps.ControlPosition.BOTTOM_CENTER].push(coordsDiv.current);
    map.addListener('mousemove', (event: any): void => {
      coordsDiv.current.textContent =
        'lat: ' + Math.round(event.latLng.lat()) + ', ' +
        'lng: ' + Math.round(event.latLng.lng())
    })
  }

  const addClickListener = (map: any): void => {
    map.addListener('click', (e: any): void => {
      let pointAnnotation = {lat: 0, lng: 0, timestamp: 0}
      pointAnnotation.timestamp = new Date().getTime()
      pointAnnotation.lat = e.latLng.lat()
      pointAnnotation.lng = e.latLng.lng()
      dispatch(setPointAnnotation({pointAnnotation}))
      const annoId = uuid()
      setValue({[annoId]: {...pointAnnotation}})
    })
  }

  const buildPointAnnotations = (): ReactElement[] => {
    console.log(value)
    const pointAnnotations: IPointAnnotation[] = value !== null ? Object.values(value) : []
    return pointAnnotations.map((point, i: number): ReactElement => <FlagMarker
      key={i}
      lat={point.lat}
      lng={point.lng}
      text={labels[labelIndex++ % labels.length]}
    />)
  }

  const buildImageMap = (maps: any): google.maps.ImageMapType => {
    return new maps.ImageMapType({
      getTileUrl,
      maxZoom: 10,
      minZoom: 2,
      name: 'image',
      tileSize: new maps.Size(imageWidth / maxScaleFactor, imageHeight / maxScaleFactor),
    })
  }

  const handleApiLoaded = ({map, maps}: any): void => {
    addCoordsDiv(map, maps)
    addClickListener(map)
    map.mapTypes.set('image', buildImageMap(maps))
    map.setMapTypeId('image')
  }

  const buildOptions = (maps: any): {} => {
    return {
      gestureHandling: 'greedy',
      mapTypeControl: true,
      minZoom: 2,
      streetViewControl: true,
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
        defaultCenter={{lat: 54, lng: -34}}
        defaultZoom={2}
        heatmap={buildPointAnnotations()}
        heatmapLibrary={true}
        key={currentImageId}
        options={buildOptions}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
      >
        {buildPointAnnotations()}
      </GoogleMapReact>
    </div>
  ) : <></>
}
