'use client'

import styles from './WeightList.module.css'
import { WeightListEntry } from './WeightListEntry/WeightListEntry'
import { useWeight } from '@/hooks/api/useWeight'
import { Loading } from '@gymapp/gymui/Loading'
import { Card } from '@gymapp/gymui/Card'
import { IWeightData } from '@/types'

export const WeightList = () => {
  const { data, isLoading } = useWeight()
  var weight: IWeightData[]
  if (isLoading == false && data.status == 'success') {
    weight = data.data
  } else {
    // add toast error message
  }

  const reversedIndexes = weight ? [...weight.keys()].reverse() : []
  const reversedWeight = weight?.slice().reverse()

  return (
    <Card sx={{ height: 'calc(100% - 32px)', overflow: 'scroll' }}>
      <Card.Content>
        <span className={styles.heading}>Entries</span>
        <div className={styles.list_entries}>
          {isLoading ? (
            <Loading.Text
              fontSize='26px'
              pulseSize={10}
              sx={{
                justifyContent: 'center',
                fontWeight: '500',
                position: 'absolute',
                inset: '0',
              }}
            >
              Gathering Data
            </Loading.Text>
          ) : data.length == 0 ? (
            <span className={styles.no_data}>No Data</span>
          ) : (
            reversedWeight?.map((value, index) => {
              const prev = reversedWeight[index + 1]
              const difference = prev ? (value.weight - prev.weight).toFixed(1) : null

              return (
                <WeightListEntry
                  key={index}
                  value={value}
                  id={reversedIndexes[index] + 1}
                  difference={difference ? Number(difference) : undefined}
                />
              )
            })
          )}
        </div>
      </Card.Content>
    </Card>
  )
}
