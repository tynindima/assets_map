import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cx from 'classnames';
import './styles/add.css';

interface Props {
  onClose: () => void;
  addAssets: any;
}
export const Add: FC<Props> = (props) => {
  const { onClose, addAssets } = props;
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [nameWarning, setNameWarning] = useState(false);
  const [latWarning, setLatWarning] = useState(false);
  const [lngWarning, setLngWarning] = useState(false);

  const clearSubmit = () => {
    setName('');
    setLatitude('');
    setLongitude('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newAsset = {
      id: uuidv4(),
      name,
      latitude,
      longitude,
    };

    if (name === '' || latitude === '' || longitude === '') {
      setNameWarning(true);
      setLatWarning(true);
      setLngWarning(true);
    } else if (name.length > 15) {
      setNameWarning(true);
    } else if (/([8-9][0-9])|([1-9][0-9][0-9])|([0-9]{4,})|([a-zA-Z])/
      .test(latitude)) {
      setLatWarning(true);
    } else if (/(1[8-9][0-9])|([2-9][0-9][0-9])|([0-9]{4,})|([a-zA-Z])/
      .test(longitude)) {
      setLngWarning(true);
    } else {
      setNameWarning(false);
      setLatWarning(false);
      setLngWarning(false);
      addAssets(newAsset);
      clearSubmit();
      onClose();
    }
  };

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setNameWarning(false);
    setName(value);
  };

  const handleInputLatitude = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setLatWarning(false);
    setLatitude(value);
  };

  const handleInputLongitude = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setLngWarning(false);
    setLongitude(value);
  };

  return (
    <div className="wrapper">
      <div className="box">
        <h2 className="title is-6">Add new assets</h2>

        <form onSubmit={handleSubmit} action="">
          <div className="input-box">
            <label className="asset-label" htmlFor="name">Name</label>
            <input
              className={cx('input is-small', { 'is-danger': nameWarning })}
              onChange={handleInputName}
              value={name}
              type="text"
              name="name"
              id="name"
              placeholder="input name tracker"
            />
          </div>

          <div className="input-box">
            <label className="asset-label" htmlFor="latitude">Latitude</label>
            <input
              className={cx('input is-small', { 'is-danger': latWarning })}
              onChange={handleInputLatitude}
              value={latitude}
              type="text"
              id="latitude"
              placeholder="number from 0 to 80"
            />
          </div>

          <div className="input-box">
            <label className="asset-label" htmlFor="longitude">Longitude</label>
            <input
              className={cx('input is-small', { 'is-danger': lngWarning })}
              onChange={handleInputLongitude}
              value={longitude}
              type="text"
              id="longitude"
              placeholder="number from 0 to 180"
            />
          </div>

          <div className="buttons buttons-delblock">
            <button
              className="button is-warning"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="button is-success" type="submit">Add</button>
          </div>
        </form>

      </div>
    </div>
  );
};
