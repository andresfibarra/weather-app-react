import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const useStore = create(persist(
  devtools(immer((set, get) => {
    return {
      citiesWeather: [],

      // replace whole array
      setCitiesWeather: (newCitiesWeather) => set(
        (draftState) => { draftState.citiesWeather = newCitiesWeather; },
        false,
        'weather/setCitiesWeather',
      ),

      // add city if not duplicate
      addCityWeather: (newObj) => {
        const { citiesWeather } = get();

        // check for duplicates
        const isDuplicate = citiesWeather.some((curr) => curr.location.toLowerCase() === newObj.location.toLowerCase()
        && curr.state_code === newObj.state_code
        && curr.country_code === newObj.country_code);

        if (isDuplicate) {
          return false; // indicate NOT ADDED
        }

        // use Immer to mutate draft
        set(
          (draftState) => {
            draftState.citiesWeather.unshift(newObj);
          },
          false,
          'weather/addCityWeather',
        );

        return true; // indicate ADDED
      },

      // delete city by ID
      deleteCityById: (id) => {
        // use Immer to mutate
        set(
          (draftState) => {
            draftState.citiesWeather = draftState.citiesWeather.filter((card) => card.id !== id);
          },
        );
      },

      // getter
      getCityWeatherById: (id) => {
        const cities = get().citiesWeather;
        const list = Array.isArray(cities) ? cities : [];
        return list.find((c) => c.id === id) || null;
      },
    };
  })),
  {
    name: 'weather-storage', // key in localStorage
  },
));

export default useStore;
