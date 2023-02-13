import React, { useContext } from 'react'
import classes from './ListItem.module.scss'
import { List, Spin, Table,Space,message } from 'antd'
import Link from 'next/link'
import { deleteFileAPI , openFileAPI} from '@/API'
import { setFileContext, setFreshContext,freshContext, userContext } from './ContextProvider'
import { messageAPIcontext } from './ContextProvider'
function FileTable({data}) {
  const setFile = useContext(setFileContext)
  const fresh = useContext(freshContext)
  const setFresh = useContext(setFreshContext)
  const user = useContext(userContext)
  const messageApi = useContext(messageAPIcontext)
  async function handleDelete(filename) {
    const {data:res} = await deleteFileAPI(filename)
    if(res.ok === 1) {
      setFile(res.data)
    } else {
      messageApi.info('文件已经打开不能删除')
    }
  }
  async function handleOpen(filename,protect) {
    const {data:res} = await openFileAPI({filename,protect,user })
    if(res.ok === 1) {
      setFresh(!fresh)
      messageApi.info('打开文件成功')
    } else {
      messageApi.info(res.msg)
    }
  }
  const columns = [
    {
      title: '文件名',
      dataIndex: 'filename',
      key: 'filename',
    },
    {
      title: '权限',
      dataIndex: 'protect',
      key: 'protect',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleOpen(record.filename,record.protect)}>打开</a>
          <a onClick={() => handleDelete(record.filename,record.protect)}>删除</a>
        </Space>
      ),
    },
  ];
    return <Table columns={columns} dataSource={data.map(item => { return {...item,key:item.filename}})}/>
  }

export default FileTable