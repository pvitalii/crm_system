import { ProjectInfo } from 'src/projects/interfaces/project-info.interface';

export interface GitHost {
  getRepository(path: string): Promise<ProjectInfo>;
}
