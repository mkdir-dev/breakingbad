import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import './Main.scss';

import Cards from '../Cards/Cards';
import Button from '../Shared/Buttons/Button';

function Main({
  episodes,
  loading,
  errLoad,

  handleGetEpisodes,
}) {
  const handleClick = async () => {
    await handleGetEpisodes();
  };

  useEffect(() => { }, [episodes]);
  return (
    <main className={episodes.length !== 0 ? 'main' : 'main main_empty'}>
      <h2 className="main__title">
        Список эпизодов
      </h2>

      {episodes.length === 0 ? (
        <Button
          text="Загрузить эпизоды"
          textLoad="Загрузка..."
          loading={loading}
          handleClick={handleClick}
          err={errLoad}
        />
      ) : (
        <Cards
          cards={episodes}
        />
      )}
    </main>
  );
}

export default inject(({ Store }) => {
  const {
    episodes,
    loading,
    errLoad,

    handleGetEpisodes,
  } = Store;

  return {
    episodes,
    loading,
    errLoad,

    handleGetEpisodes,
  };
})(observer(Main));
