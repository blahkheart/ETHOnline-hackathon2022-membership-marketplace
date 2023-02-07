import { BigInt, store } from "@graphprotocol/graph-ts"
// import { store } from '@graphprotocol/graph-ts'
import {
  Transfer
} from "../generated/BuidlBuxx/BuidlBuxx"

import { Order, Customer,Vendor } from "../generated/schema"

export function handleNewOrder(event: Transfer): void {
  
  //  order creator
  let customerId = event.params.from.toHex()
  let customer = Customer.load(customerId)
  if (customer == null) {
    customer = new Customer(customerId)
    customer.ordersCount = BigInt.fromI32(1)
    customer.createdAt = event.block.timestamp
  } else {
    customer.ordersCount = customer.ordersCount.plus(BigInt.fromI32(1))
  }
  customer.address = event.params.from
  customer.save()

  // order vendor
  let orderVendorId = event.params.to.toHex()
  let orderVendor = Vendor.load(orderVendorId)
  if (orderVendor == null) {
    orderVendor = new Vendor(orderVendorId)
    orderVendor.ordersCount = BigInt.fromI32(1)
    orderVendor.createdAt = event.block.timestamp
  } else {
    orderVendor.ordersCount = orderVendor.ordersCount.plus(BigInt.fromI32(1))
  }
  orderVendor.address = event.params.to
  orderVendor.save()
  
  // order
  const vendors = [
    "0x2d4BBCc282Ea9167D1d24Df9B92227f7B2C060A8",
    "0x0dc01C03207fB73937B4aC88d840fBBB32e8026d"
  ]

  for (let i = 0; i < vendors.length; i++) {
    let order = new Order(event.transaction.hash.toString() + "-" + event.logIndex.toString())
    if (event.params.to.toHex() === vendors[i]) {
      // order.orderId = event.params.id
      order.creator = customerId
      order.vendor = event.params.to.toHex()
      order.amount = event.params.value
      order.createdAt = event.block.timestamp
      // order.completed = event.params.done
      order.transactionHash = event.transaction.hash.toString()
      order.save()
    }
  }
}
// export function handleRegister(event: Register): void {
  
//   // Register
//   let userId = event.params.userId.toHex()
//   let attendee = Customer.load(userId)
//   if (attendee == null) {
//     attendee = new Customer(userId)
//     attendee.ordersCount = BigInt.fromI32(0)
//   }
//   attendee.address = event.params.userId
//   attendee.createdAt = event.block.timestamp
//   attendee.save()
// }

// export function handleDoneOrder(event: DoneOrder): void {
//   // Done order
//   let orderId = event.params.id
//   let order = Order.load(orderId)
//   if (order == null) {
//     return
//   } else {
//     order.completed = event.params.done
//     order.createdAt = event.block.timestamp
//     order.save()
//   }
// }