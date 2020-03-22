export const NUMBER_PER_PAGE = 30
export const THOTTLE_TIME = 1000

export interface IUserInfo {
  login: string,
  public_repos: number,
}

export interface IRepository {
  id: number,
  stargazers_url: string,
  name: string,
  stargazers_count: number,
}

export interface IStargazer {
  id: number,
  login: string,
}

export interface IStargazerObject { [key: string]: IStargazer[] }