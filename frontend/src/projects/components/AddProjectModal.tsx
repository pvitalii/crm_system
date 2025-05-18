import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useCreateProject } from '../project.hooks';

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddProjectModal({
  open,
  onClose,
}: AddProjectModalProps) {
  const [projectPath, setProjectPath] = React.useState('');
  const createProject = useCreateProject();

  const handleCreate = () => {
    createProject.mutate(projectPath, {
      onSuccess: () => {
        setProjectPath('');
        onClose();
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { minWidth: 500 } }}>
      <DialogTitle>Add New Project</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Project Path"
          type="text"
          fullWidth
          variant="outlined"
          value={projectPath}
          onChange={(e) => setProjectPath(e.target.value)}
          placeholder="owner/repository"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleCreate} 
          variant="contained"
          disabled={createProject.isPending}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
} 