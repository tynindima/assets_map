import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Add } from './components/Add';
import { Delete } from './components/Delete';
import { WrappedMap } from './components/Map/Wrapped';

import './App.css';
import { setAsset } from './store';
import { Header } from './components/Header';

const googleURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&
libraries=geometry,drawing,places`;

interface Props {
  setAssetsCord: (lat: number, lng: number) => void;
}

const App: FC<Props> = (props) => {
  const { setAssetsCord } = props;

  const firstAsset = {
    id: '123', name: 'Truck 1', latitude: 48, longitude: 31,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deletedName, setDeletedName] = useState('');
  const [assets, setAssets] = useState<Asset[]>([firstAsset]);
  const [visibleAssets, setVisibleAssets] = useState<Asset[]>([firstAsset]);

  const toggleAdd = () => {
    setIsOpen(!isOpen);
  };

  const toggleDelete = (name: string) => {
    setDeletedName(name);
    setIsDelete(!isDelete);
  };

  const addAssets = (asset: Asset) => {
    setAssets([...assets, asset]);
    setVisibleAssets([...visibleAssets, asset]);
  };

  const deleteAsset = (name: string) => {
    setIsDelete(!isDelete);
    setAssets(assets.filter(asset => asset.name !== name));
    setVisibleAssets(visibleAssets.filter(asset => asset.name !== name));
  };

  const closeAsset = () => {
    setIsDelete(!isDelete);
  };

  const handleCheckAsset = (asset: Asset) => {
    const { latitude, longitude } = asset;

    setAssetsCord(latitude, longitude);
  };

  const handleSearch = (track: string) => {
    setVisibleAssets([...assets]
      .filter((asset) => asset.name.toLowerCase().includes(track)));
  };

  return (
    <div className="container">
      {isOpen
      && ReactDOM.createPortal(
        <Add
          onClose={toggleAdd}
          addAssets={addAssets}
        />,
        document.getElementById('portal') as HTMLElement,
      )}
      {isDelete
      && ReactDOM.createPortal(
        <Delete
          name={deletedName}
          deleteAsset={deleteAsset}
          close={closeAsset}
        />,
        document.getElementById('portal_2') as HTMLElement,
      )}
      <Header toggleAdd={toggleAdd} handleSearch={handleSearch} />

      <main className="main">
        <div className="map border">
          <h3 className="map-title">Map</h3>
          <WrappedMap
            googleMapURL={googleURL}
            loadingElement={(
              <div style={{
                height: '100%',
              }}
              />
            )}
            containerElement={(
              <div style={{
                height: '100%',
              }}
              />
            )}
            mapElement={(
              <div style={{
                height: '100%',
              }}
              />
            )}
          />
        </div>
        <div className="assets border">
          <h3 className="title is-6">Assets</h3>
          <ul className="menu-assets">
            {visibleAssets.map(asset => (
              <li className="assets-item" key={asset.id}>
                <label className="assets-text" htmlFor={asset.id}>
                  {asset.name}
                </label>
                <input
                  className="checkbox"
                  onChange={() => handleCheckAsset(asset)}
                  type="checkbox"
                  id={asset.id}
                />
                <button
                  className="delete is-medium"
                  type="button"
                  onClick={() => toggleDelete(asset.name)}
                >
                  Close
                </button>
              </li>
            ))}
          </ul>
        </div>

      </main>
    </div>
  );
};

const mapDispatchToProps = {
  setAssetsCord: setAsset,
};

export default connect(null, mapDispatchToProps)(App);
