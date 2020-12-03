import request from '@/utils/request'

export function newDeviceModel(data) {
  return request({
    url: '/newDeviceModel',
    method: 'post',
    data
  })
}
export function newDevice(data) {
  return request({
    url: '/newDevice',
    method: 'post',
    data
  })
}

export function deviceModelList(data) {
  return request({
    url: '/deviceModelList',
    method: 'get'
  })
}

export function removeDeviceModel(data) {
  return request({
    url: '/removeDeviceModel',
    method: 'post',
    data
  })
}
export function updateDeviceModel(data) {
  return request({
    url: '/updateDeviceModel',
    method: 'post',
    data
  })
}
