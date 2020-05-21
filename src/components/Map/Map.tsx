import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  GoogleMap,
  Marker,
} from 'react-google-maps';

import { State } from '../../store';

const Map: FC<State> = (props) => {
  const { lat, lng } = props;

  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={{
        lat, lng,
      }}
    >
      <Marker position={{
        lat, lng,
      }}
      />
    </GoogleMap>
  );
};

const mapStateToProps = (state: State) => ({
  lat: state.lat,
  lng: state.lng,
});

export default connect(mapStateToProps, null)(Map);
