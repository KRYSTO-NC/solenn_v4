import { COMMENTS_URL } from '../constants' // Assurez-vous d'avoir la bonne URL pour les messages
import { apiSlice } from './apiSlice'

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => ({
        url: COMMENTS_URL,
      }),
      providesTags: ['Comment'],
      keepUnusedDataFor: 5,
    }),

    getCommentDetails: builder.query({
      query: (id) => ({
        url: `${COMMENTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createComment: builder.mutation({
      query: (data) => ({
        url: COMMENTS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Comment'],
    }),

    updateComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENTS_URL}/${data.commentId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Comment'],
    }),

    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `${COMMENTS_URL}/${commentId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetCommentsQuery,
  useGetCommentDetailsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentsApiSlice
