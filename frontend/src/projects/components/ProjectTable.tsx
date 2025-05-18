import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { ProjectTableRow } from './ProjectTableRow';
import { Project } from '../interfaces/project.interface';

interface ProjectTableProps {
  projects: Project[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="projects table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Owner</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">URL</TableCell>
            <TableCell align="center">Stars</TableCell>
            <TableCell align="center">Forks</TableCell>
            <TableCell align="center">Issues</TableCell>
            <TableCell align="center">Created</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <ProjectTableRow
              key={project.id}
              project={project}
            />
          ))}
          {projects.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No projects found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 