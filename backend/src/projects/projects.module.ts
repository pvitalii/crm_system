import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './services/projects.service';
import { AuthModule } from 'src/auth/auth.module';
import { GithubService } from './services/github.service';

@Module({
  controllers: [ProjectsController],
  imports: [AuthModule],
  providers: [ProjectsService, GithubService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
