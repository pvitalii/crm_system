import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectStatus } from '../enums/project-status.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Project } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: number): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: { userId },
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async delete(id: number): Promise<Project> {
    return this.prisma.project.delete({
      where: { id },
    });
  }

  async create(userId: number, payload: CreateProjectDto) {
    const { path } = payload;
    const [owner, name] = path.split('/');

    const initialProject = await this.prisma.project.create({
      data: {
        status: ProjectStatus.SYNCING,
        owner,
        name,
        user: {
          connect: { id: userId },
        },
      },
    });

    return initialProject;
  }

  async refresh(id: number) {
    const updatedProject = await this.prisma.project.update({
      where: { id },
      data: { status: ProjectStatus.SYNCING },
    });

    return updatedProject;
  }

  async update(id: number, payload: Prisma.ProjectUpdateInput) {
    return this.prisma.project.update({
      where: { id },
      data: payload,
    });
  }
}
