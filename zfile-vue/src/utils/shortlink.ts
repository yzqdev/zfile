import http from "./http";

export const shortLinkKeyApi = (data: any) => {
  return http.post("/admin/api/short-link/key", data);
};
export const delShortLinkApi = (data: any) => {
  return http.post("/admin/api/short-link", data);
};
export const postShortLinkApi = (data: any) => {
  return http.post("/api/short-link", data);
};

export const getShortLinkApi = (driveId: string, directlink: string) => {
  return http.get("/api/short-link", {
    params: { driveId: driveId, path: directlink },
  });
};
export const delLinkApi = (id: any) => {
  return http.delete(`/admin/link/delete/${id}`);
};
export const linkListApi = (data: any) => {
  return http.post(`/admin/link/list`, data);
};
