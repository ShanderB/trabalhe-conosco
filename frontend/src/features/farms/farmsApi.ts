import { apiSlice } from '../../services/apiSlice';
import type { Farm } from '../../types/domain';

export interface FarmInputDto {
  producerId: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  agricultableArea: number;
  vegetationArea: number;
}

export type UpdateFarmDto = Partial<FarmInputDto>;

export const farmsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listFarms: builder.query<Farm[], string | void>({
      query: (producerId) => (producerId ? `/farms?producerId=${encodeURIComponent(producerId)}` : '/farms'),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Farm' as const, id })), { type: 'Farm' as const, id: 'LIST' }]
          : [{ type: 'Farm' as const, id: 'LIST' }],
    }),
    getFarm: builder.query<Farm, string>({
      query: (id) => `/farms/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Farm', id }],
    }),
    createFarm: builder.mutation<Farm, FarmInputDto>({
      query: (body) => ({ url: '/farms', method: 'POST', body }),
      invalidatesTags: [{ type: 'Farm', id: 'LIST' }, 'Dashboard'],
    }),
    updateFarm: builder.mutation<Farm, { id: string; data: UpdateFarmDto }>({
      query: ({ id, data }) => ({ url: `/farms/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Farm', id },
        { type: 'Farm', id: 'LIST' },
        'Dashboard',
      ],
    }),
    deleteFarm: builder.mutation<void, string>({
      query: (id) => ({ url: `/farms/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Farm', id },
        { type: 'Farm', id: 'LIST' },
        'Dashboard',
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useListFarmsQuery,
  useGetFarmQuery,
  useCreateFarmMutation,
  useUpdateFarmMutation,
  useDeleteFarmMutation,
} = farmsApi;
