import request from '@/utils/request'

export function newOrg(data) {
  return request({
    url: '/newOrg',
    method: 'post',
    data
  })
}

export function orgListByUser() {
  return request({
    url: '/orgListByUser',
    method: 'get'
  })
}

// export function applyJoinOrg(data) {
//   return request({
//     url: '/newDevice',
//     method: 'post',
//     data
//   })
// }

