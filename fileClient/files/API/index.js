import request from './request'

export const getUserAPI = () => {
    return request({
        url:'/file/main'
    })
}

export const getUserFileAPI = (name) => {
    return request({
        url: `/file/user?name=${name}`
    })
}

export const createFileAPI = ({filename, protect}) => {
    return request({
        url: '/file/create',
        method: 'post',
        data: {
            filename,
            protect
        }
    })
}


export const deleteFileAPI = (filename) => {
    const url = `/file/delete/${filename}`
    return request({
        url,
        method: 'delete',
    })
}

export const getOpenFileAPI = () => {
    return request({
        url: '/file/open'
    })
}

export const openFileAPI = ({filename,protect, user}) => {
    return request({
        url: '/file/openfile',
        method:'post',
        data: {
            filename,
            protect,
            user
        }
    })
}

export const closeFileAPI = (filename,user) => {
    return request({
        url: `/file/close?name=${filename}&user=${user}`,
        method:'delete'
    })
}

export const readFileAPI = ({filename,protect, user}) => {
    return request({
        url: '/file/read',
        method:'post',
        data: {
            filename,
            protect,
            user
        }
    })
}

export const writeFileAPI = ({filename,protect, user}) => {
    return request({
        url: '/file/write',
        method:'post',
        data: {
            filename,
            protect,
            user
        }
    })
}