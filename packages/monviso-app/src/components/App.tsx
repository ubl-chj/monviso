import React from 'react'
import { hot } from "react-hot-loader/root";
import {Viewer, ImageryLayer} from "resium";
import { WebMapTileServiceImageryProvider } from "cesium";

const imageryProvider = new WebMapTileServiceImageryProvider({
  url: 'https://ids.lib.harvard.edu/ids/iiif/20347557/full/full/0/default.jpg',
  layer: 'USGSShadedReliefOnly',
  style: 'default',
  format: 'image/jpeg',
  tileMatrixSetID: 'default028mm',
  maximumLevel: 19,
});

const App = () => (
  <Viewer full>
    <ImageryLayer imageryProvider={imageryProvider} />
  </Viewer>
);

export default hot(App);
