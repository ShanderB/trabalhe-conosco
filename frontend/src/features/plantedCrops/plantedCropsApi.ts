import { apiSlice } from '../../services/apiSlice';
import type { PlantedCrop } from '../../types/domain';

export interface CreatePlantedCropDto {
  farmId: string;
  harvestId: string;
  cropName: string;
}

export const plantedCropsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listPlantedCrops: builder.query<PlantedCrop[], void>({
      query: () => '/planted-crops',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'PlantedCrop' as const, id })),
              { type: 'PlantedCrop' as const, id: 'LIST' },
            ]
          : [{ type: 'PlantedCrop' as const, id: 'LIST' }],
    }),
    createPlantedCrop: builder.mutation<PlantedCrop, CreatePlantedCropDto>({
      query: (body) => ({ url: '/planted-crops', method: 'POST', body }),
      invalidatesTags: [{ type: 'PlantedCrop', id: 'LIST' }, 'Dashboard'],
    }),
    deletePlantedCrop: builder.mutation<void, string>({
      query: (id) => ({ url: `/planted-crops/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'PlantedCrop', id: 'LIST' }, 'Dashboard'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useListPlantedCropsQuery,
  useCreatePlantedCropMutation,
  useDeletePlantedCropMutation,
} = plantedCropsApi;
