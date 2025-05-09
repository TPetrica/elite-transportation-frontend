import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ApiService from '@/services/api.service';
import { message } from 'antd';

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

// ================= VEHICLES HOOKS ===================

/**
 * Hook to fetch vehicles
 */
export const useVehicles = (params = {}) => {
  return useQuery({
    queryKey: ['vehicles', params],
    queryFn: async () => {
      const response = await ApiService.get('/vehicles', { params });
      return response.data;
    },
  });
};

/**
 * Hook to fetch a single vehicle
 */
export const useVehicle = (vehicleId) => {
  return useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: async () => {
      const response = await ApiService.get(`/vehicles/${vehicleId}`);
      return response.data;
    },
    enabled: !!vehicleId,
  });
};

/**
 * Hook to create a vehicle
 */
export const useCreateVehicle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (vehicleData) => ApiService.post('/vehicles', vehicleData),
    onSuccess: () => {
      message.success('Vehicle created successfully');
      queryClient.invalidateQueries(['vehicles']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to create vehicle');
      console.error('Error creating vehicle:', error);
    },
  });
};

/**
 * Hook to update a vehicle
 */
export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ vehicleId, data }) => ApiService.patch(`/vehicles/${vehicleId}`, data),
    onSuccess: () => {
      message.success('Vehicle updated successfully');
      queryClient.invalidateQueries(['vehicles']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to update vehicle');
      console.error('Error updating vehicle:', error);
    },
  });
};

/**
 * Hook to delete a vehicle
 */
export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (vehicleId) => ApiService.delete(`/vehicles/${vehicleId}`),
    onSuccess: () => {
      message.success('Vehicle deleted successfully');
      queryClient.invalidateQueries(['vehicles']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to delete vehicle');
      console.error('Error deleting vehicle:', error);
    },
  });
};

// ================= BOOKINGS HOOKS ===================

/**
 * Hook to fetch bookings
 */
export const useBookings = (params = {}) => {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: async () => {
      const response = await ApiService.get('/bookings', { params });
      return response.data;
    },
  });
};

/**
 * Hook to fetch a single booking
 */
export const useBooking = (bookingId) => {
  return useQuery({
    queryKey: ['booking', bookingId],
    queryFn: async () => {
      const response = await ApiService.get(`/bookings/${bookingId}`);
      return response.data;
    },
    enabled: !!bookingId,
  });
};

/**
 * Hook to create a booking
 */
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bookingData) => ApiService.post('/bookings', bookingData),
    onSuccess: () => {
      message.success('Booking created successfully');
      queryClient.invalidateQueries(['bookings']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to create booking');
      console.error('Error creating booking:', error);
    },
  });
};

/**
 * Hook to update a booking
 */
export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ bookingId, data }) => ApiService.patch(`/bookings/${bookingId}`, data),
    onSuccess: () => {
      message.success('Booking updated successfully');
      queryClient.invalidateQueries(['bookings']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to update booking');
      console.error('Error updating booking:', error);
    },
  });
};

/**
 * Hook to delete a booking
 */
export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bookingId) => ApiService.delete(`/bookings/${bookingId}`),
    onSuccess: () => {
      message.success('Booking deleted successfully');
      queryClient.invalidateQueries(['bookings']);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to delete booking');
      console.error('Error deleting booking:', error);
    },
  });
};

// ================= EXTRAS HOOKS ===================

/**
 * Hook to fetch extras
 */
export const useExtras = (params = {}) => {
  return useQuery({
    queryKey: ['extras', params],
    queryFn: async () => {
      const response = await ApiService.get('/extras', { params });
      return response.data;
    },
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
 * Hook to fetch published blogs
 */
export const usePublishedBlogs = (params = {}) => {
  return useQuery({
    queryKey: ['publishedBlogs', params],
    queryFn: async () => {
      const response = await ApiService.get('/blogs/public', { params });
      return response.data;
    },
  });
};

/**
 * Hook to fetch all blogs (admin)
 */
export const useAllBlogs = (params = {}) => {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: async () => {
      const response = await ApiService.get('/blogs', { params });
      return response.data;
    },
  });
};

/**
 * Hook to fetch a blog by slug
 */
export const useBlogBySlug = (slug) => {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const response = await ApiService.get(`/blogs/public/slug/${slug}`);
      return response.data;
    },
    enabled: !!slug,
  });
};

/**
 * Hook to fetch a blog by id (admin)
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

/**
 * Hook to fetch related blogs
 */
export const useRelatedBlogs = (blogId, limit = 3) => {
  return useQuery({
    queryKey: ['relatedBlogs', blogId, limit],
    queryFn: async () => {
      const response = await ApiService.get(`/blogs/public/related/${blogId}`, { 
        params: { limit } 
      });
      return response.data;
    },
    enabled: !!blogId,
  });
};

/**
 * Hook to fetch blogs by category
 */
export const useBlogsByCategory = (category, params = {}) => {
  return useQuery({
    queryKey: ['blogsByCategory', category, params],
    queryFn: async () => {
      const response = await ApiService.get(`/blogs/public/category/${category}`, { params });
      return response.data;
    },
    enabled: !!category,
  });
};
