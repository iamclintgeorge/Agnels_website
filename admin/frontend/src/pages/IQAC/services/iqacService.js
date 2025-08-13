import api from "../../../services/api";

const basePath = "/api/iqac";

const iqacService = {
  async getAllSections() {
    const res = await api.get(`${basePath}/sections`);
    return res.data;
  },
  async getSection(sectionKey) {
    const res = await api.get(`${basePath}/sections/${encodeURIComponent(sectionKey)}`);
    return res.data;
  },
  async updateSection(sectionKey, contentObject) {
    const res = await api.put(`${basePath}/sections/${encodeURIComponent(sectionKey)}`, contentObject);
    return res.data;
  },
  async deleteSection(sectionKey) {
    const res = await api.delete(`${basePath}/sections/${encodeURIComponent(sectionKey)}`);
    return res.data;
  },
};

export default iqacService;


