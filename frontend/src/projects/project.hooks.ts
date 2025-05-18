import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Project } from './interfaces/project.interface';
import { ProjectStatuses } from './enums/project-statuses.enum';
import { createProject, deleteProject, getAllProjects, getOneProject, refreshProject } from './projects.service';

export const projectsQueryKey = 'projects';

export const useProjects = () => {
  return useQuery<Project[]>({
    queryKey: [projectsQueryKey],
    queryFn: getAllProjects,
  });
};

export const useProjectPolling = (projectId: string, projectStatus: string) => {
  return useQuery<Project>({
    queryKey: [projectsQueryKey, projectId],
    queryFn: () => getOneProject(projectId),
    refetchInterval: (query) => {
      const project = query.state.data;
      return project?.status === ProjectStatuses.SYNCING ? 5000 : false;
    },
    refetchIntervalInBackground: true,
    enabled: projectStatus === ProjectStatuses.SYNCING
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (newProject) => {
      queryClient.setQueryData<Project[]>([projectsQueryKey], (oldProjects = []) => {
        return [...oldProjects, newProject];
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Project[]>([projectsQueryKey], (oldProjects = []) => {
        return oldProjects.filter(project => project.id !== deletedId);
      });
    },
  });
};

export const useRefreshProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, path }: { id: string; path: string }) => refreshProject(id, path),
    onSuccess: (updatedProject) => {
      queryClient.setQueryData<Project[]>([projectsQueryKey], (oldProjects = []) => {
        return oldProjects.map(project => 
          project.id === updatedProject.id ? updatedProject : project
        );
      });
    },
  });
}; 