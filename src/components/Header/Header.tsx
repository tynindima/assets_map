import React, { FC, useEffect, useState } from 'react';
import './styles/header.css';

interface Props {
  toggleAdd: () => void;
  handleSearch: (track: string) => void;
}

export const Header: FC<Props> = (props) => {
  const { toggleAdd, handleSearch } = props;

  const [track, setTrack] = useState('');

  useEffect(() => {
    handleSearch(track.toLowerCase());
  }, [track]);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTrack(value);
  };

  return (
    <header className="header">
      <h1 className="title is-4">Assets map</h1>
      <div className="panel">
        <input
          className="input panel__input"
          onChange={handleFilter}
          value={track}
          type="text"
          placeholder="Search asset..."
        />
        <button
          className="button is-success"
          type="button"
          onClick={toggleAdd}
        >
          Add assets
        </button>
      </div>
    </header>
  );
};
