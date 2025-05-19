import ApiService from "./api.service";

class AffiliateService {
  // Create a new affiliate
  async create(data) {
    try {
      const response = await ApiService.post("/affiliates", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get all affiliates
  async getAll(params = {}) {
    try {
      const response = await ApiService.get("/affiliates", { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get single affiliate
  async getById(affiliateId) {
    try {
      const response = await ApiService.get(`/affiliates/${affiliateId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update affiliate
  async update(affiliateId, data) {
    try {
      const response = await ApiService.patch(`/affiliates/${affiliateId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Delete affiliate
  async delete(affiliateId) {
    try {
      await ApiService.delete(`/affiliates/${affiliateId}`);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Track affiliate visit
  async trackVisit(code) {
    try {
      const response = await ApiService.get(`/affiliates/track/${code}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Validate affiliate code
  async validateCode(code) {
    try {
      const response = await ApiService.get(`/affiliates/validate/${code}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new AffiliateService();