import request from '@/utils/request'

export function activateDevice(data) {
  return request({
    url: '/activateDevice',
    method: 'post',
    data
  })
}

export function getDevicesByOrg(data) {
  return request({
    url: '/getDevicesByOrg',
    method: 'post',
    data
  })
}

// export function newDeviceModel(data) {
//   return request({
//     url: '/newDeviceModel',
//     method: 'post',
//     data
//   })
// }
// export function newDevice(data) {
//   return request({
//     url: '/newDevice',
//     method: 'post',
//     data
//   })
// }

// export function deviceList() {
//   return request({
//     url: '/deviceList',
//     method: 'get'
//   })
// }

// export function removeDevice(data) {
//   return request({
//     url: '/removeDevice',
//     method: 'post',
//     data
//   })
// }
// export function toggleDevice(data) {
//   return request({
//     url: '/toggleDevice',
//     method: 'post',
//     data
//   })
// }

// export function deviceModelList(data) {
//   return request({
//     url: '/deviceModelList',
//     method: 'get'
//   })
// }

// export function removeDeviceModel(data) {
//   return request({
//     url: '/removeDeviceModel',
//     method: 'post',
//     data
//   })
// }
// export function updateDeviceModel(data) {
//   return request({
//     url: '/updateDeviceModel',
//     method: 'post',
//     data
//   })
// }

