import React, { useContext } from 'react'
import { List, Spin } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getOpenFileAPI , closeFileAPI, readFileAPI, writeFileAPI} from '@/API'
import { useRequest } from 'ahooks'
import { freshContext,setFreshContext,userContext } from './ContextProvider'
function OpenList({messageApi}) {
    const fresh = useContext(freshContext)
    const setFresh = useContext(setFreshContext)
    const user = useContext(userContext)
    const {data,loading} = useRequest(getOpenFileAPI, {refreshDeps: [fresh]})
    const router = useRouter()
    if(!data && loading) return <Spin />
    async function handleClose(filename) {
        const {data:res} = await closeFileAPI(filename,user)
        if(res.ok === 1) {
            setFresh(!fresh)
            messageApi.info('关闭成功')
        } else {
            messageApi.info(res.msg)
        }
    }
    async function handleRead(filename,protect) {
        const {data:res} = await readFileAPI({filename,protect,user })
        if(res.ok === 1) {
        //   setFresh(!fresh)
          messageApi.info('成功，正在读...')
        } else {
          messageApi.info(res.msg)
        }
      }
    async function handleWrite(filename,protect) {
        const {data:res} = await writeFileAPI({filename,protect,user })
        if(res.ok === 1) {
        //   setFresh(!fresh)
          messageApi.info('成功,正在写...')
        } else {
          messageApi.info(res.msg)
        }
      }
    return <>
    <List
    itemLayout="horizontal"
    dataSource={data.data.data}
    renderItem={(item) => (
      <List.Item>
            <div style={{width: '100%'}}>
                {item.filename + '  opened by  ' + item.user}
                <a onClick={() => handleRead(item.filename,item.protect)} style={{paddingLeft:'50px'}}>读</a>
                <a onClick={() => handleWrite(item.filename,item.protect)} style={{paddingLeft:'10px'}}>写</a>
                <a onClick={() => handleClose(item.filename)} style={{paddingLeft:'10px'}}>关闭</a>
            </div>
      </List.Item>
    )}
  /></>
  }

export default OpenList