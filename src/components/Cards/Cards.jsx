import React from 'react';
import { inject, observer } from 'mobx-react';

import './Cards.scss';

import Card from './Card/Card';
import Button from '../Shared/Buttons/Button';

function Cards({
  cards,

  loading,

  sortDescending,
  sortAscending,
}) {
  return (
    <section className="cards">
      <div className="cards__wrap-btn">
        <Button
          text="Сортировать по убыванию количества персонажей"
          textLoad="Сортировка..."
          loading={loading}
          handleClick={() => sortDescending(cards)}
        />
        <Button
          text="Сортировать по возрастанию количества персонажей"
          textLoad="Сортировка..."
          loading={loading}
          handleClick={() => sortAscending(cards)}
        />
      </div>

      <ul className="cards__list">
        {cards.map((card) => (
          <Card
            key={card.episode_id}
            card={card}
            cards={cards}
          />
        ))}
      </ul>
    </section>
  );
}

export default inject(({ Store }) => {
  const {
    loading,

    sortDescending,
    sortAscending,
  } = Store;

  return {
    loading,

    sortDescending,
    sortAscending,
  };
})(observer(Cards));