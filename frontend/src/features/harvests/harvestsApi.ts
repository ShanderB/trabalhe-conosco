import { apiSlice } from '../../services/apiSlice';
import type { Harvest } from '../../types/domain';

export interface CreateHarvestDto {
  year: number;
}

export const harvestsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listHarvests: builder.query<Harvest[], void>({
      query: () => '/harvests',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Harvest' as const, id })),
              { type: 'Harvest' as const, id: 'LIST' },
            ]
          : [{ type: 'Harvest' as const, id: 'LIST' }],
    }),
    createHarvest: builder.mutation<Harvest, CreateHarvestDto>({
      query: (body) => ({ url: '/harvests', method: 'POST', body }),
      invalidatesTags: [{ type: 'Harvest', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const { useListHarvestsQuery, useCreateHarvestMutation } = harvestsApi;
