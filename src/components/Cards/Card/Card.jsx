/* eslint-disable no-nested-ternary */
import React from 'react';
import { inject, observer } from 'mobx-react';

import './Card.scss';

function Card({
  card,
  cards,

  minusCountCharacters,
  plusCountCharacters,
  deleteEpisode,
}) {
  return (
    <li className="card">
      <h3 className="card__title">
        {`${card.episode_id}. `}
        {card.title}
        {' '}
        {`(сезон ${card.season}, эпизод ${card.episode})`}
      </h3>
      <div className="card__wrap">
        <span className="card__text">
          <button
            type="button"
            aria-label="Минус"
            onClick={() => minusCountCharacters(card, cards)}
            disabled={card.countCharacters === 0}
            className={
              card.countCharacters === 0
                ? 'card__btn card__btn_minus card__btn_disabled'
                : 'card__btn card__btn_minus'
            }
          />
          {' '}
          {card.countCharacters}
          {' '}
          <button
            type="button"
            aria-label="Плюс"
            onClick={() => plusCountCharacters(card, cards)}
            className="card__btn card__btn_plus"
          />
          {' '}
          {card.countCharacters % 10 === 1 && card.countCharacters !== 11 ? 'персонаж'
            : (card.countCharacters > 11
              && card.countCharacters < 15) ? 'персонажей'
              : (card.countCharacters % 10 > 1
                && card.countCharacters % 10 < 5)
                ? 'персонажа'
                : 'персонажей'}
        </span>
      </div>
      <button
        type="button"
        aria-label="Удалить"
        onClick={() => deleteEpisode(card, cards)}
        className="card__btn-delete"
      />
    </li>
  );
}

export default inject(({ Store }) => {
  const {
    minusCountCharacters,
    plusCountCharacters,
    deleteEpisode,
  } = Store;

  return {
    minusCountCharacters,
    plusCountCharacters,
    deleteEpisode,
  };
})(observer(Card));