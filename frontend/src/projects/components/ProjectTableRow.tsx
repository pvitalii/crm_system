import React, { useEffect } from 'react';
import { TableCell, TableRow, IconButton, Box, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useQueryClient } from '@tanstack/react-query';
import { useProjectPolling, useDeleteProject, useRefreshProject } from '../project.hooks';
import { projectsQueryKey } from '../project.hooks';
import { Project } from '../interfaces/project.interface';
import { ProjectStatuses } from '../enums/project-statuses.enum';

interface ProjectTableRowProps {
  project: Project;
}

export function ProjectTableRow({ project }: ProjectTableRowProps) {
  const queryClient = useQueryClient();
  const deleteProject = useDeleteProject();
  const refreshProject = useRefreshProject();
  const { data } = useProjectPolling(project.id, project.status);

  const handleDelete = () => {
    deleteProject.mutate(project.id);
  };

  const handleRefresh = () => {
    refreshProject.mutate({ 
      id: project.id, 
      path: `${project.owner}/${project.name}` 
    });
  };

  useEffect(() => {
    if (data) {
      queryClient.setQueryData([projectsQueryKey], (old: Project[]) => {
        if (!old) return old
        return old.map((oldProject) => (oldProject.id === data.id ? {...oldProject, ...data} : oldProject))
      })
    }
  }, [queryClient, data])

  const isSyncing = project.status === ProjectStatuses.SYNCING;

  return (
    <TableRow 
      key={project.id}
      sx={{
        position: 'relative',
        pointerEvents: isSyncing ? 'none' : 'auto',
      }}
    >
      <TableCell align="center">{project.owner}</TableCell>
      <TableCell align="center">{project.name}</TableCell>
      <TableCell align="center">
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          {project.url}
        </a>
      </TableCell>
      <TableCell align="center">{project.starsCount}</TableCell>
      <TableCell align="center">{project.forksCount}</TableCell>
      <TableCell align="center">{project.issuesCount}</TableCell>
      <TableCell align="center">{project.createdAt}</TableCell>
      <TableCell align="center" sx={{ minWidth: '150px' }}>
        {isSyncing ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <CircularProgress size={20} />
            {project.status}
          </Box>
        ) : (
          project.status
        )}
      </TableCell>
      <TableCell align="center">
        <IconButton
          color="primary"
          onClick={handleRefresh}
          size="small"
          disabled={refreshProject.isPending || isSyncing}
        >
          <RefreshIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={handleDelete}
          size="small"
          disabled={deleteProject.isPending || isSyncing}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
} 