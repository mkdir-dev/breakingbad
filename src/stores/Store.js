import { makeAutoObservable, runInAction } from 'mobx';

import { getEpisodes } from '../utils/Api/Api';

export default class Store {
  episodes = [];

  loading = false;

  errLoad = '';

  constructor() {
    makeAutoObservable(this);
  }

  handleGetEpisodes = async () => {
    this.loading = true;
    this.errLoad = '';

    await getEpisodes()
      .then((res) => {
        const arr = res.map((item) => ({
          ...item,
          countCharacters: item.characters.length,
        }));

        runInAction(() => {
          this.episodes = arr;
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);

        runInAction(() => {
          this.episodes = [];
          this.errLoad = 'Что-то пошло не так. Попробуйте еще раз';
        });
      })
      .finally(() => {
        runInAction(() => {
          this.loading = false;
        });
      });
  };

  minusCountCharacters = (episode, arrEpisodes) => {
    const arr = arrEpisodes.map((item) => {
      if (
        item.episode_id === episode.episode_id
        && item.countCharacters !== 0
      ) {
        return {
          ...item,
          countCharacters: item.countCharacters - 1,
        };
      }
      return {
        ...item,
      };
    });

    runInAction(() => {
      this.episodes = arr;
    });
  };

  plusCountCharacters = async (episode, arrEpisodes) => {
    const arr = arrEpisodes.map((item) => {
      if (item.episode_id === episode.episode_id) {
        return {
          ...item,
          countCharacters: item.countCharacters + 1,
        };
      }
      return {
        ...item,
      };
    });

    runInAction(() => {
      this.episodes = arr;
    });
  };

  sortDescending = (arrEpisodes) => {
    const arr = arrEpisodes.sort((a, b) => {
      if (a.countCharacters > b.countCharacters) {
        return -1;
      }
      if (a.countCharacters < b.countCharacters) {
        return 1;
      }
      return 0;
    });

    runInAction(() => {
      this.episodes = arr;
    });
  };

  sortAscending = (arrEpisodes) => {
    const arr = arrEpisodes.sort((a, b) => {
      if (a.countCharacters > b.countCharacters) {
        return 1;
      }
      if (a.countCharacters < b.countCharacters) {
        return -1;
      }
      return 0;
    });

    runInAction(() => {
      this.episodes = arr;
    });
  };

  deleteEpisode = (episode, arrEpisodes) => {
    runInAction(() => {
      this.episodes = arrEpisodes.filter((item) => item.episode_id !== episode.episode_id);
    });
  };
}
