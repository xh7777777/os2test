import React, { useContext } from 'react'
import classes from './ListItem.module.scss'
import { List, Spin } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { setUserContext } from './ContextProvider'
function ListItem({data}) {
    const router = useRouter()
    const setUser = useContext(setUserContext)
    function handleClick(name) {
        setUser(name)
        console.log('set', name)
        router.push(`/user/${name}`)
    }
    return <List
    itemLayout="horizontal"
    dataSource={data.data.data}
    renderItem={(item) => (
      <List.Item>
        <a onClick={() => handleClick(item)}>
            <div>{item}</div>
        </a>
      </List.Item>
    )}
  />
  }

export default ListItem