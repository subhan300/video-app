import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const getMovieApi = createApi({
  reducerPath: 'getMovieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    getMovieApi: builder.query<any, any>({
      query: (name) => `movie/popular?api_key=f2f17df4b381feaaf2e173664ceba22a`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMovieApiQuery } = getMovieApi