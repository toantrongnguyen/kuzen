import axios from 'axios'

axios.defaults.baseURL = 'https://api.github.com'

export const fetchUserInfo = (username: string) => axios.get(`users/${username}`)

export const fetchRepositories = (username: string, page: number = 1) => axios.get(
  `users/${username}/repos`, {
    params: {
      page,
    },
  })

export const fetchStargazers = (url: string, page: number = 1) => axios.get(
  url, {
    params: {
      page,
    },
  })
