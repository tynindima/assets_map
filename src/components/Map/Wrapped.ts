import { withGoogleMap, withScriptjs } from 'react-google-maps';
import Map from './Map';

export const WrappedMap = withScriptjs(withGoogleMap(Map)) as any;
