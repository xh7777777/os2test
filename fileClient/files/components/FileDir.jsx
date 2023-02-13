import React, { useContext, useRef, useState } from "react";
import classes from './FileDir.module.scss'
import {Card, Row, Col, Modal, Form, Input, Button,message } from 'antd'
import OpenList from "./OpenList";
import { useRouter } from "next/router";
import { createFileAPI } from "@/API";
import { setUserContext, setFileContext,messageAPIcontext,messageHolderContext } from "./ContextProvider";
function FileDir({children}) {
  const router = useRouter()
  const btnRef = useRef(null)
  const [open, setOpen] = useState(false)
  const setUser = useContext(setUserContext)
  // const [messageApi, contextHolder] = message.useMessage();
  const contextHolder = useContext(messageHolderContext)
  const messageApi = useContext(messageAPIcontext)
  const setFile = useContext(setFileContext)
  async function onFinish(formData) {
    const {data:res} = await createFileAPI({filename:formData.filename, protect: formData.protect})
    console.log(res)
    if(res.ok === 1) {
      messageApi.info('创建成功')
      setFile(res.data)
      setOpen(false)
    } else {
      messageApi.info(res.msg)
    }
  }
  function handleCreate() {
    setOpen(true)
  }
  function handleCancel() {
    setOpen(false)
  }
  function handleOk() {
    btnRef.current.click()
  }
  function handleBack() {
    setUser(null)
    router.replace('/')
  }
  return (
    <div className={classes.container}>
      {contextHolder}
      <Row gutter={20} justify='space-between'>
        <Col span = {14}>
          <Card className={classes.mainfile} title={router.asPath === '/'? '主目录' : <a onClick={handleBack}>文件目录{router.asPath.slice(5)}</a>} 
          extra = {router.asPath === '/' ?null : <a onClick={handleCreate}>新建</a>}>
            {children}
          </Card>
        </Col>
        <Col span= {8}>
        <Card className={classes.openfile} title = '打开文件目录'>
          <OpenList messageApi={messageApi}/>
        </Card>
        </Col>
      </Row>
      <Modal open={open} onOk={handleOk} onCancel={handleCancel} title='创建文件'>
      <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="文件名"
      name="filename"
      rules={[{ required: true, message: '不能为空' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="权限设置"
      name="protect"
      rules={[{ required: true, message: '不能为空' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" ref={btnRef} style={{display:'none'}}>
        Submit
      </Button>
    </Form.Item>
  </Form>
      </Modal>
    </div>
  )
}

export default FileDir

