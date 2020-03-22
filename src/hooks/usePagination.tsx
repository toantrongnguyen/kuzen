import { useCallback, useState, useMemo } from 'react'

export const NUMBER_PER_PAGE = 30

export default function <T>(fetchService: Function, total: number): {
  list: T[],
  isLoading: boolean,
  resetList: Function,
  onLoadMore: (e: React.MouseEvent) => void,
  isEndOfList: boolean,
} {
  const [list, setList] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)

  const fetchList = useCallback(async (p: number) => {
    try {
      setIsLoading(true)
      setPage(p)
      const result = await fetchService(p)
      if (p === 1) {
        setList(result.data)
      } else {
        setList(state => [...state, ...result.data])
      }
    } catch {
      setList([])
    } finally {
      setIsLoading(false)
    }
  }, [fetchService])

  const resetList = useCallback(() => {
    fetchList(1)
  }, [fetchList])

  const onLoadMore = useCallback(() => {
    fetchList(page + 1)
  }, [page, fetchList])

  const isEndOfList = useMemo(() => {
    return page * NUMBER_PER_PAGE >= total
  }, [total, page])

  return { list, isLoading, resetList, onLoadMore, isEndOfList }
}
