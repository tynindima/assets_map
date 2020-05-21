import React, { FC } from 'react';
import './styles/delete.css';

interface Props {
  name: string;
  deleteAsset: (name: string) => void;
  close: () => void;
}

export const Delete: FC<Props> = (props) => {
  const { name, deleteAsset, close } = props;

  return (
    <div className="wrapper">
      <div className="box delete-container">
        <h3 className="title is-5">Warning</h3>
        <h4 className="title is-6">
          {`Are you sure you want to delete ${name}`}
        </h4>
        <div className=" buttons delete-block">
          <button
            className="cancel button is-warning "
            onClick={close}
            type="button"
          >
            Cancel
          </button>
          <button
            className="button is-danger"
            onClick={() => deleteAsset(name)}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
