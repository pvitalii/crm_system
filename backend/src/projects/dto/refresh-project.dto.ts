import { IsString, Matches } from 'class-validator';
import { repositoryPathPattern } from '../constants';

export class RefreshProjectDto {
  @IsString()
  @Matches(repositoryPathPattern, { message: 'Path must follow the pattern "owner/name"' })
  path: string;
}
