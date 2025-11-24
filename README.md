# Weather-App-React

A lightweight weather app built with React + Zustand that displays real-time weather information for user-selected cities.

## About This Project

This project started as a pure frontend React application to help me practice UI development, client-side state management, and working with external API's

## Features

- Add and remove city weather cards
- Fetch real-time weather data from the OpenWeather and Geoapify API's
- Local state management with Zustand
- Modal views for detailed weather information
- Temperature and UV graphs in the modal view
- Duplicate city detection
- Client-side persistence using localStorage

## Tech Stack

- React
- Zustand (with Immer middleware)
- Vite
- Tailwind CSS
- OpenWeather / Geoapify API's

## To Run Locally

1. Clone repo to your local environment

2. `npm i`

3. Create a `.env` file and add your weather API keys:

```
VITE_OPENWEATHER_KEY=your_key_here

VITE_GEOAPIFY_KEY=your_key_here
```

3. `npm run dev`

4. Play around!

## Limitations

- No backend or database

- No user accounts or persistent storage across devices

- Error handling could be expanded

## Next Steps

This project is the starting point for a full-stack rebuild. The next version will be available on my Github and will use Next.js, Postgres, and OAuth