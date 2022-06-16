import React from 'react';

import './Button.scss';

function Button({
  text,
  textLoad,
  loading,
  handleClick,
  err,
}) {
  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={loading ? 'btn_disabled' : 'btn'}
        disabled={loading}
      >
        {loading ? textLoad : text}
      </button>
      {err && (
        <span>
          {err}
        </span>
      )}
    </>
  );
}

export default Button;