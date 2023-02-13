import React, { createContext, useState } from 'react'
export const freshContext = createContext(null)
export const setFreshContext = createContext(null)
export const userContext = createContext(null)
export const setUserContext = createContext(null)
export const fileContext = createContext([])
export const setFileContext = createContext(null)
export const messageAPIcontext = createContext(null)
export const messageHolderContext = createContext(null)
import { message } from 'antd'
function ContextProvider({children}) {
    const [fresh,setFresh] = useState(false)
    const [user,setUser] = useState(null)
    const [file,setFile] = useState([])
    const [messageApi, contextHolder] = message.useMessage()
  return (
     <freshContext.Provider value={fresh}>
        <setFreshContext.Provider value={setFresh}>
            <userContext.Provider value={user}>
                <setUserContext.Provider value={setUser}>
                    <fileContext.Provider value={file}>
                        <setFileContext.Provider value={setFile}>
                            <messageAPIcontext.Provider value={messageApi}>
                                <messageHolderContext.Provider value={contextHolder}>
                                    {children}
                                </messageHolderContext.Provider>
                            </messageAPIcontext.Provider>
                        </setFileContext.Provider>
                    </fileContext.Provider>
                </setUserContext.Provider>
            </userContext.Provider>
        </setFreshContext.Provider>
     </freshContext.Provider>
  )
}

export default ContextProvider