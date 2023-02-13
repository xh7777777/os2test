import React, { useContext, useEffect, useState } from 'react'
import { getUserFileAPI } from '@/API'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
import FileTable from '@/components/FileTable'
import { useRouter } from 'next/router'
import { userContext, fileContext, setFileContext,setUserContext } from '@/components/ContextProvider'
function Users() {
    const user = useContext(userContext)
    const file = useContext(fileContext)
    const setFile = useContext(setFileContext)
    const [send,setSend] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if(!send) {
            (async function() {
                const {data:res} = await getUserFileAPI(user)
                res.data.forEach((item,index) => {
                    item.key = item.filename+index
                })
                setFile(res.data)
                setSend(true)
            })()
        }
    }, )
  return (
    <FileTable data={file}/>
  )
}

export default Users