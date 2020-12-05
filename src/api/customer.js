import request from '@/utils/request'

export function newCustomer(data) {
  return request({
    url: '/newCustomer',
    method: 'post',
    data
  })
}

export function customerList() {
  return request({
    url: '/customerList',
    method: 'get'
  })
}