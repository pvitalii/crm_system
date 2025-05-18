import { api } from "../common/api";
import { Project } from "./interfaces/project.interface";

export async function getAllProjects() {
  const response = await api.get<Project[]>('/projects', {withCredentials: true});
  return response.data;
}

export async function getOneProject(id: string) {
  const response = await api.get<Project>(`/projects/${id}`, {withCredentials: true}).catch(() => {
    return {data: {id, status: 'failed'} as Project}
  });

  return response.data;
}

export async function createProject(path: string) {
  const response = await api.post<Project>(`/projects`, {
    path,
  }, {withCredentials: true});
  return response.data;
}

export async function refreshProject(id: string, path: string) {
  const response = await api.put<Project>(
    `/projects/${id}`,
    {path},
    { withCredentials: true }
  );
  return response.data;
}

export async function deleteProject(id: string) {
  await api.delete(`/projects/${id}`, {withCredentials: true});
}
