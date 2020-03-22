import React, { FC, useCallback, useState, useEffect, useRef } from 'react'
import RepositoryList from './containers/RepositoryList'
import * as Services from '../services'
import { IUserInfo, THOTTLE_TIME } from '../types'

type Props = {}

const RepositoryContainer: FC<Props> = () => {
  const [username, setUsername] = useState('')
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)

  const requestId = useRef<NodeJS.Timeout>()

  const fetchUserInfo = async (username: string) => {
    try {
      const user = await Services.fetchUserInfo(username)
      setUserInfo(user.data)
    } catch {
      setUserInfo(null)
    }
  }

  useEffect(() => {
    if (!username.trim()) return

    requestId.current = setTimeout(() => fetchUserInfo(username), THOTTLE_TIME)

    return () => {
      if (requestId.current) {
        clearTimeout(requestId.current)
      }
    }
  }, [username])

  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value)
  }, [])

  return (
    <div className="container">
      <div className="field">
        <label className="label">Github username</label>
        <div className="control">
          <input className="input" type="text" aria-label="username-input" onChange={onChangeUsername} value={username} />
        </div>
      </div>

      {userInfo && <RepositoryList userInfo={userInfo} />}
    </div>
  )
}

export default RepositoryContainer
