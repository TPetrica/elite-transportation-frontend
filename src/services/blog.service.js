import ApiService from './api.service'

const BlogService = {
  /**
   * Fetch all published blogs
   * @param {Object} params - Query parameters
   * @returns {Promise} - API response
   */
  getPublishedBlogs: (params = {}) => {
    return ApiService.get('/blogs/public', { params })
  },

  /**
   * Fetch a published blog by slug
   * @param {string} slug - Blog slug
   * @returns {Promise} - API response
   */
  getBlogBySlug: (slug) => {
    return ApiService.get(`/blogs/public/slug/${slug}`)
  },

  /**
   * Fetch blogs by category
   * @param {string} category - Blog category
   * @param {Object} params - Query parameters
   * @returns {Promise} - API response
   */
  getBlogsByCategory: (category, params = {}) => {
    return ApiService.get(`/blogs/public/category/${category}`, { params })
  },

  /**
   * Fetch related blogs
   * @param {string} blogId - Blog ID
   * @param {number} limit - Number of related blogs to fetch
   * @returns {Promise} - API response
   */
  getRelatedBlogs: (blogId, limit = 3) => {
    return ApiService.get(`/blogs/public/related/${blogId}`, { params: { limit } })
  },

  // Admin API endpoints
  /**
   * Fetch all blogs (including drafts)
   * @param {Object} params - Query parameters
   * @returns {Promise} - API response
   */
  getAllBlogs: (params = {}) => {
    return ApiService.get('/blogs', { params })
  },

  /**
   * Fetch a blog by ID
   * @param {string} id - Blog ID
   * @returns {Promise} - API response
   */
  getBlogById: (id) => {
    return ApiService.get(`/blogs/${id}`)
  },

  /**
   * Create a new blog
   * @param {Object} blog - Blog data
   * @returns {Promise} - API response
   */
  createBlog: (blog) => {
    return ApiService.post('/blogs', blog)
  },

  /**
   * Update a blog
   * @param {string} id - Blog ID
   * @param {Object} blog - Updated blog data
   * @returns {Promise} - API response
   */
  updateBlog: (id, blog) => {
    return ApiService.patch(`/blogs/${id}`, blog)
  },

  /**
   * Delete a blog
   * @param {string} id - Blog ID
   * @returns {Promise} - API response
   */
  deleteBlog: (id) => {
    return ApiService.delete(`/blogs/${id}`)
  }
}

export default BlogService
