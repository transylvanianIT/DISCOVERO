import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', '91a0f0e987mshd75eaa404a387eap10cd83jsn6202a5e5ebd5')
        
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world?country_code=DZ'})
    })
  });

export const {
    
    useGetTopChartsQuery,
 
} = shazamCoreApi;