import {useEffect, useRef} from 'react'

export const usePrevious = (value: any): any => {
  const ref = useRef()
  useEffect((): void => {
    ref.current = value
  })
  return ref.current
}
