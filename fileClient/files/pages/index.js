import React, {useState} from 'react'
import { Spin } from 'antd'
import { useRequest } from 'ahooks'
import { getUserAPI } from '@/API'
import ListItem from '@/components/ListItem'
function Home() {
  const {data,loading} = useRequest(getUserAPI)
  if(!data && loading) return <Spin />
  return (
    <ListItem data = {data} />
  )
}

export default Home