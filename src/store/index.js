import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const useStore = create(persist(
  devtools(immer((set) => {
    return {
      citiesWeather: [],

      // replace whole array
      setCitiesWeather: (newCitiesWeather) => set((draftState) => { draftState.citiesWeather = newCitiesWeather; }, false, 'weather/setCitiesWeather'),
    };
  })),
  {
    name: 'weather-storage', // key in localStorage
  },
));

export default useStore;
