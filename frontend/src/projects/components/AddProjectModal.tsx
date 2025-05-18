import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useCreateProject } from '../project.hooks';
import { useFormik } from 'formik';
import { projectValidationSchema } from '../utils/project-validation.util';

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddProjectModal({
  open,
  onClose,
}: AddProjectModalProps) {
  const createProject = useCreateProject();

  const handleCreate = (path: string) => {
    createProject.mutate(path, {
      onSuccess: () => {
        formik.resetForm();
        onClose();
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      path: '',
    },
    validationSchema: projectValidationSchema,
    onSubmit: (values) => handleCreate(values.path),
  });

  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { minWidth: 500 } }}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            id="path"
            name="path"
            label="Project Path"
            value={formik.values.path}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.path && Boolean(formik.errors.path)}
            helperText={formik.touched.path && formik.errors.path}
            sx={{
              '& .MuiFormHelperText-root': {
                position: 'absolute',
                bottom: '-20px'
              }
            }}
            placeholder="owner/repository"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit"
            variant="contained"
            disabled={createProject.isPending}
          >
            Create
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
} 