import { AxiosResponse } from 'axios'
import { IUserInfo } from '../../types'

// load our test.json file. This can be copied to the local 
// folder. Can be a short version of your actual data set.
const data : IUserInfo = {
  login: 'hi',
  public_repos: 10,
}

// Our mocked response
const axiosResponse: AxiosResponse = {
  data,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
}

// axios mocked
export default {
  // Typescript requires a 'default'
  default: {
    get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse)),
  },
  defaults: {},
  get: jest.fn(() => Promise.resolve(axiosResponse)),
}
