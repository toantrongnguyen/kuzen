import React, { FC, useMemo, useEffect } from 'react'
import { IStargazer, IRepository } from '../../types'
import usePagination from '../../hooks/usePagination'
import * as Services from '../../services'

type Props = {
  id: number,
  repository: IRepository,
}

const StarazerList: FC<Props> = ({ repository }) => {
  const fetchRepositories = useMemo(() => {
    return (page: number) => Services.fetchStargazers(repository.stargazers_url, page)
  }, [repository])

  const {
    list: stargazers,
    isLoading,
    resetList,
    onLoadMore,
    isEndOfList,
  } = usePagination<IStargazer>(fetchRepositories, repository.stargazers_count)

  useEffect(() => {
    resetList()
  }, [repository, resetList])

  return (
    <div>
      {stargazers.map((item) => (
        <div className="list-item" key={item.id}>
          <span>{item.login}</span>
        </div>
      ))}
      {!isEndOfList && <button
        className={`button is-white ${isLoading && 'is-loading'}`}
        onClick={onLoadMore}
        disabled={isLoading}
      >Load more starazers</button>}
    </div>
  )
}

export default StarazerList
