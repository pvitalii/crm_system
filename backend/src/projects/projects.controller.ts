import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { RefreshProjectDto } from './dto/refresh-project.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { Project } from '@prisma/client';
import { GithubService } from './services/github.service';
import { ProjectStatus } from './enums/project-status.enum';

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
    private githubService: GithubService,
  ) {}

  @Get()
  async findAll(@Request() req: AuthenticatedRequest): Promise<Project[]> {
    return this.projectsService.findByUserId(req.user.sub);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body()
    data: CreateProjectDto,
  ): Promise<Project> {
    const project = await this.projectsService.create(req.user.sub, data);

    this.fetchRepositoryInfo(project.id, data);

    return project;
  }

  @Put(':id')
  async refresh(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: RefreshProjectDto,
  ): Promise<Project> {
    const project = await this.projectsService.refresh(id);

    this.fetchRepositoryInfo(id, data);

    return project;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectsService.delete(id);
  }

  private async fetchRepositoryInfo(id: number, payload: RefreshProjectDto) {
    const { path } = payload;

    try {
      const repositoryData = await this.githubService.getRepository(path);

      await this.projectsService.update(id, {
        ...repositoryData,
        status: ProjectStatus.READY,
      });
    } catch (error) {
      if (error.status === 404) {
        await this.projectsService.delete(id);
      } else {
        await this.projectsService.update(id, {
          status: ProjectStatus.FAILED,
        });
      }
    }
  }
}
