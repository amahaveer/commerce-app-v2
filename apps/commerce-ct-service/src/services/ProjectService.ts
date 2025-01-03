import { ProjectSettings } from '@royalcyber/global-types';
import { BaseService } from './BaseService';

export class ProjectService extends BaseService {
  async getProjectSettings(): Promise<ProjectSettings> {
    return await this.getProject().then((response) => {
      const projectSettings: ProjectSettings = {
        name: response.name,
        countries: response.countries,
        currencies: response.currencies,
        languages: response.languages,
        projectKey: response.key,
      };

      return projectSettings;
    });
  }
}
