import { Octokit } from 'octokit';

import { Endpoints } from '@octokit/types';
export class Github {
  static api = new Octokit({ auth: '' });

  static searchForOrganizations(query: string) {
    return Github.api.rest.orgs.get({ org: query, per_page: 5 });
  }

  static getReposForOrg(
    params: Endpoints['GET /orgs/{org}/repos']['parameters']
  ) {
    return Github.api.rest.repos.listForOrg({ ...params, per_page: 12 });
  }
}
