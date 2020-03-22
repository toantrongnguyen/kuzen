import React, { FC, useCallback, useState, useEffect, useMemo } from 'react'
import { IRepository, IUserInfo } from '../../types'
import * as Services from '../../services'

import usePagination from '../../hooks/usePagination'
import StarazerList from './StarazerList'

type Props = {
  userInfo: IUserInfo,
}

interface IVisibleStargazer {
  [key: string]: boolean,
}

const RepositoryList: FC<Props> = (props) => {
  const {
    userInfo,
  } = props

  const [visibleStargazers, setVisibleStargazers] = useState<IVisibleStargazer>({})

  const fetchRepositories = useMemo(() => {
    return (page: number) => Services.fetchRepositories(userInfo.login, page)
  }, [userInfo])

  const {
    list: repositories,
    isLoading,
    resetList,
    onLoadMore,
    isEndOfList,
  } = usePagination<IRepository>(fetchRepositories, userInfo.public_repos)

  useEffect(() => {
    resetList()
  }, [userInfo, resetList])

  const onLoadStarazers = useCallback((e) => {
    const id = Number(e.target.getAttribute('data-id'))
    const repository = repositories.find((repository) => id === repository.id)
    if (!repository) return
    setVisibleStargazers((state) => ({ ...state, [id]: !state[id] }))
  }, [repositories])

  return (
    <>
      <article className="message">
        <div className="message-body">
          <p>Number reporitories: <strong>{userInfo.public_repos}</strong></p>
          <p>Number loaded reporitories: <strong>{repositories.length}</strong></p>
        </div>
      </article>
      <div className="list is-hoverable">
        {!repositories.length ? (
          <div className="list-item">empty</div>
        ) : (<>
          {repositories.map((item) => (
            <div className="list-item" key={item.id}>
              <span>{item.name}</span>
              <span className="tag is-info ml-2">{item.stargazers_count}</span>
              <button className="button is-text valign-middle ml-2" onClick={onLoadStarazers} data-id={item.id} aria-label="load-stargazers-button">
                {visibleStargazers[item.id] ? 'Hide' : 'Load'} stargazers
              </button>
              {visibleStargazers[item.id] && <StarazerList id={item.id} repository={item} />}
            </div>
          ))}
          {!isEndOfList && <button
            className={`button is-white ${isLoading && 'is-loading'}`}
            onClick={onLoadMore}
            disabled={isLoading}
          >Load more reporitories</button>}
        </>)}
      </div>
    </>
  )
}

export default RepositoryList
