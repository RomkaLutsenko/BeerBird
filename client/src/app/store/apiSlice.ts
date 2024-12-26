import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface PointsResponse {
	points: number
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5173/' }),
	endpoints: builder => ({
		getPoints: builder.query<PointsResponse, void>({
			query: () => 'hamster/points',
		}),
		addPoints: builder.mutation<PointsResponse, number>({
			query: pointsToAdd => ({
				url: 'hamster/points',
				method: 'POST',
				body: pointsToAdd,
			}),
		}),
	}),
})

export const { useGetPointsQuery, useAddPointsMutation } = apiSlice
