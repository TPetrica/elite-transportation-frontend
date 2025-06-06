import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ApiService from '@/services/api.service';
import { message } from 'antd';
import calendarService from '@/services/calendar.service';

// ================= SERVICES HOOKS ===================

/**
 * Hook to fetch services
 */
export const useServices = (params = {}) => {
  return useQuery({
    queryKey: ['services', params],
    queryFn: async () => {
      const response = await ApiService.get('/services', { params });
      return response.data;
    },
  });
};

/**
 * Hook to fetch a single service
 */
export const useService = (serviceId) => {
  return useQuery({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      const response = await ApiService.get(`/services/${serviceId}`);
      return response.data;
    },
    enabled: !!serviceId,
  });
};

/**
 * Hook to create a service
 */
export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceData) => ApiService.post('/services', serviceData),
    onSuccess: () => {
      message.success('Service created successfully');
      queryClient.invalidateQueries(['services']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to create service');
      console.error('Error creating service:', error);
    },
  });
};

/**
 * Hook to update a service
 */
export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ serviceId, data }) => ApiService.patch(`/services/${serviceId}`, data),
    onSuccess: () => {
      message.success('Service updated successfully');
      queryClient.invalidateQueries(['services']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to update service');
      console.error('Error updating service:', error);
    },
  });
};

/**
 * Hook to delete a service
 */
export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceId) => ApiService.delete(`/services/${serviceId}`),
    onSuccess: () => {
      message.success('Service deleted successfully');
      queryClient.invalidateQueries(['services']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to delete service');
      console.error('Error deleting service:', error);
    },
  });
};

// ================= EXTRAS HOOKS ===================

/**
 * Hook to fetch extras with caching
 */
export const useExtras = () => {
  return useQuery({
    queryKey: ['extras'],
    queryFn: async () => {
      try {
        const response = await ApiService.get('/extras');
        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        return {
          success: false,
          error: error.response?.data?.message || 'Failed to fetch extras',
        };
      }
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
};

/**
 * Hook to fetch a single extra
 */
export const useExtra = (extraId) => {
  return useQuery({
    queryKey: ['extra', extraId],
    queryFn: async () => {
      const response = await ApiService.get(`/extras/${extraId}`);
      return response.data;
    },
    enabled: !!extraId,
  });
};

/**
 * Hook to create an extra
 */
export const useCreateExtra = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (extraData) => ApiService.post('/extras', extraData),
    onSuccess: () => {
      message.success('Extra created successfully');
      queryClient.invalidateQueries(['extras']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to create extra');
      console.error('Error creating extra:', error);
    },
  });
};

/**
 * Hook to update an extra
 */
export const useUpdateExtra = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ extraId, data }) => ApiService.patch(`/extras/${extraId}`, data),
    onSuccess: () => {
      message.success('Extra updated successfully');
      queryClient.invalidateQueries(['extras']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to update extra');
      console.error('Error updating extra:', error);
    },
  });
};

/**
 * Hook to delete an extra
 */
export const useDeleteExtra = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (extraId) => ApiService.delete(`/extras/${extraId}`),
    onSuccess: () => {
      message.success('Extra deleted successfully');
      queryClient.invalidateQueries(['extras']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to delete extra');
      console.error('Error deleting extra:', error);
    },
  });
};


// ================= BLOG HOOKS ===================

/**
 * Hook to fetch blogs
 */
export const useBlogs = (params = {}) => {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: async () => {
      const response = await ApiService.get('/blogs', { params });
      return response.data;
    },
  });
};

/**
 * Hook to fetch a single blog
 */
export const useBlog = (blogId) => {
  return useQuery({
    queryKey: ['blog', blogId],
    queryFn: async () => {
      const response = await ApiService.get(`/blogs/${blogId}`);
      return response.data;
    },
    enabled: !!blogId,
  });
};

/**
 * Hook to create a blog
 */
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blogData) => ApiService.post('/blogs', blogData),
    onSuccess: () => {
      message.success('Blog created successfully');
      queryClient.invalidateQueries(['blogs']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to create blog');
      console.error('Error creating blog:', error);
    },
  });
};

/**
 * Hook to update a blog
 */
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ blogId, data }) => ApiService.patch(`/blogs/${blogId}`, data),
    onSuccess: () => {
      message.success('Blog updated successfully');
      queryClient.invalidateQueries(['blogs']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to update blog');
      console.error('Error updating blog:', error);
    },
  });
};

/**
 * Hook to delete a blog
 */
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blogId) => ApiService.delete(`/blogs/${blogId}`),
    onSuccess: () => {
      message.success('Blog deleted successfully');
      queryClient.invalidateQueries(['blogs']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to delete blog');
      console.error('Error deleting blog:', error);
    },
  });
};

// ================= AFFILIATE HOOKS ===================

/**
 * Hook to fetch affiliates
 */
export const useAffiliates = (params = {}) => {
  return useQuery({
    queryKey: ['affiliates', params],
    queryFn: async () => {
      const response = await ApiService.get('/affiliates', { params });
      return response.data;
    },
  });
};

/**
 * Hook to fetch a single affiliate
 */
export const useAffiliate = (affiliateId) => {
  return useQuery({
    queryKey: ['affiliate', affiliateId],
    queryFn: async () => {
      const response = await ApiService.get(`/affiliates/${affiliateId}`);
      return response.data;
    },
    enabled: !!affiliateId,
  });
};

/**
 * Hook to create an affiliate
 */
export const useCreateAffiliate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (affiliateData) => ApiService.post('/affiliates', affiliateData),
    onSuccess: () => {
      message.success('Affiliate created successfully');
      queryClient.invalidateQueries(['affiliates']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to create affiliate');
      console.error('Error creating affiliate:', error);
    },
  });
};

/**
 * Hook to update an affiliate
 */
export const useUpdateAffiliate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ affiliateId, data }) => ApiService.patch(`/affiliates/${affiliateId}`, data),
    onSuccess: () => {
      message.success('Affiliate updated successfully');
      queryClient.invalidateQueries(['affiliates']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to update affiliate');
      console.error('Error updating affiliate:', error);
    },
  });
};

/**
 * Hook to delete an affiliate
 */
export const useDeleteAffiliate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (affiliateId) => ApiService.delete(`/affiliates/${affiliateId}`),
    onSuccess: () => {
      message.success('Affiliate deleted successfully');
      queryClient.invalidateQueries(['affiliates']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to delete affiliate');
      console.error('Error deleting affiliate:', error);
    },
  });
};

/**
 * Hook to track affiliate visit
 */
export const useTrackAffiliateVisit = () => {
  return useMutation({
    mutationFn: (code) => ApiService.get(`/affiliates/track/${code}`),
    onSuccess: (data) => {
      // Return the redirect path
      return data;
    },
    onError: (error) => {
      console.error('Error tracking affiliate visit:', error);
    },
  });
};

/**
 * Hook to validate affiliate code
 */
export const useValidateAffiliateCode = () => {
  return useMutation({
    mutationFn: (code) => ApiService.post(`/affiliates/validate/${code}`),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error('Error validating affiliate code:', error);
    },
  });
};

// ================= AVAILABILITY HOOKS ===================

/**
 * Hook to fetch available time slots with caching
 */
export const useTimeSlots = (date) => {
  return useQuery({
    queryKey: ['timeSlots', date],
    queryFn: async () => {
      const result = await calendarService.getAvailableTimeSlots(date);
      return result; // Return the full result object with success/data/error properties
    },
    enabled: !!date,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    keepPreviousData: true,
  });
};

// ================= MANUAL BOOKINGS HOOKS ===================

/**
 * Hook to fetch manual bookings
 */
export const useManualBookings = (params = {}) => {
  return useQuery({
    queryKey: ['manualBookings', params],
    queryFn: async () => {
      const response = await ApiService.get('/manual-bookings', { params });
      return response.data;
    },
  });
};

/**
 * Hook to fetch a single manual booking
 */
export const useManualBooking = (bookingId) => {
  return useQuery({
    queryKey: ['manualBooking', bookingId],
    queryFn: async () => {
      const response = await ApiService.get(`/manual-bookings/${bookingId}`);
      return response.data;
    },
    enabled: !!bookingId,
  });
};

/**
 * Hook to create a manual booking
 */
export const useCreateManualBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingData) => ApiService.post('/manual-bookings', bookingData),
    onSuccess: () => {
      message.success('Manual booking created successfully');
      queryClient.invalidateQueries(['manualBookings']);
      queryClient.invalidateQueries(['timeSlots']); // Invalidate time slots cache
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to create manual booking');
      console.error('Error creating manual booking:', error);
    },
  });
};

/**
 * Hook to update a manual booking
 */
export const useUpdateManualBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => ApiService.patch(`/manual-bookings/${id}`, data),
    onSuccess: () => {
      message.success('Manual booking updated successfully');
      queryClient.invalidateQueries(['manualBookings']);
      queryClient.invalidateQueries(['timeSlots']); // Invalidate time slots cache
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to update manual booking');
      console.error('Error updating manual booking:', error);
    },
  });
};

/**
 * Hook to delete a manual booking
 */
export const useDeleteManualBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId) => ApiService.delete(`/manual-bookings/${bookingId}`),
    onSuccess: () => {
      message.success('Manual booking deleted successfully');
      queryClient.invalidateQueries(['manualBookings']);
      queryClient.invalidateQueries(['timeSlots']); // Invalidate time slots cache
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to delete manual booking');
      console.error('Error deleting manual booking:', error);
    },
  });
};

/**
 * Hook to check time conflict for manual bookings
 */
export const useCheckTimeConflict = () => {
  return useMutation({
    mutationFn: (conflictData) => ApiService.post('/manual-bookings/check-conflict', conflictData),
    onError: (error) => {
      console.error('Error checking time conflict:', error);
    },
  });
};