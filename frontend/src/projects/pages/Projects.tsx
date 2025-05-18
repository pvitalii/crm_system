import React from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useProjects } from '../project.hooks';
import { useLogout } from '../../auth/auth.hooks';
import { ProjectTable } from '../components/ProjectTable';
import { AddProjectModal } from '../components/AddProjectModal';

export function Projects() {
  const [open, setOpen] = React.useState(false);
  const { data: projects, isLoading, error } = useProjects();
  const logout = useLogout();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error loading projects</Typography>
      </Box>
    );
  }

  return (
    <div className="page">
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Projects
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
                variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
            >
              Add Project
            </Button>

            <Button 
              variant="contained"
              onClick={() => logout.mutate()}
            >
              Logout
            </Button>
          </Box>
        </Box>

        <ProjectTable projects={projects || []} />
      </Box>
  
      <AddProjectModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </div>
  );
}
