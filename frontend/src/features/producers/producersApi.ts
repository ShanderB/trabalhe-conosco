import { apiSlice } from '../../services/apiSlice';
import type { Producer } from '../../types/domain';

export interface CreateProducerDto {
  document: string;
  name: string;
}

export type UpdateProducerDto = Partial<CreateProducerDto>;

export const producersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listProducers: builder.query<Producer[], void>({
      query: () => '/producers',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Producer' as const, id })),
              { type: 'Producer' as const, id: 'LIST' },
            ]
          : [{ type: 'Producer' as const, id: 'LIST' }],
    }),
    getProducer: builder.query<Producer, string>({
      query: (id) => `/producers/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Producer', id }],
    }),
    createProducer: builder.mutation<Producer, CreateProducerDto>({
      query: (body) => ({ url: '/producers', method: 'POST', body }),
      invalidatesTags: [{ type: 'Producer', id: 'LIST' }, 'Dashboard'],
    }),
    updateProducer: builder.mutation<Producer, { id: string; data: UpdateProducerDto }>({
      query: ({ id, data }) => ({ url: `/producers/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Producer', id },
        { type: 'Producer', id: 'LIST' },
      ],
    }),
    deleteProducer: builder.mutation<void, string>({
      query: (id) => ({ url: `/producers/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Producer', id },
        { type: 'Producer', id: 'LIST' },
        'Dashboard',
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useListProducersQuery,
  useGetProducerQuery,
  useCreateProducerMutation,
  useUpdateProducerMutation,
  useDeleteProducerMutation,
} = producersApi;
