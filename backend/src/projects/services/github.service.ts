import { Injectable } from '@nestjs/common';
import { GitHost } from '../interfaces/git-host.interface';
import { Octokit } from '@octokit/rest';
import { ProjectInfo } from 'src/projects/interfaces/project-info.interface';

@Injectable()
export class GithubService implements GitHost {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }

  async getRepository(path: string): Promise<ProjectInfo> {
    const [owner, repo] = path.split('/');

    const { data } = await this.octokit.repos.get({
      owner,
      repo,
    });

    return {
      name: data.name,
      owner: data.owner.login,
      url: data.html_url,
      starsCount: data.stargazers_count,
      forksCount: data.forks_count,
      issuesCount: data.open_issues_count,
      createdAt: data.created_at,
    };
  }
}
