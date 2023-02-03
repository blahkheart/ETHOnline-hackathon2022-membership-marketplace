import { BigInt, store } from "@graphprotocol/graph-ts"
// import { store } from '@graphprotocol/graph-ts'
import {
  NewOrder,
  DoneOrder,
  Register
} from "../generated/ETHDenverAdmin/ETHDenverAdmin"

import { Order, Attendee,Vendor } from "../generated/schema"

export function handleNewOrder(event: NewOrder): void {
  
  //  order creator
  let orderCreatorId = event.params.userId.toHex()
  let orderCreator = Attendee.load(orderCreatorId)
  if (orderCreator == null) {
    orderCreator = new Attendee(orderCreatorId)
    orderCreator.ordersCount = BigInt.fromI32(1)
  } else {
    orderCreator.ordersCount = orderCreator.ordersCount.plus(BigInt.fromI32(1))
  }
  orderCreator.address = event.params.userId
  orderCreator.save()

  // order vendor
  let orderVendorId = event.params.vendorId.toHex()
  let orderVendor = Vendor.load(orderVendorId)
  if (orderVendor == null) {
    orderVendor = new Vendor(orderVendorId)
    orderVendor.ordersCount = BigInt.fromI32(1)
  } else {
    orderVendor.ordersCount = orderVendor.ordersCount.plus(BigInt.fromI32(1))
  }
  orderVendor.address = event.params.vendorId
  orderVendor.save()
  
  // order
  let orderId = event.params.id
  let order = Order.load(orderId)
  if (order == null) {
    order = new Order(orderId)
  }
  order.orderId = event.params.id
  order.creator = orderCreatorId
  order.vendor = event.params.vendorId.toHex()
  order.amount = event.params.amount
  order.createdAt = event.block.timestamp
  order.completed = event.params.done
  order.transactionHash = event.transaction.hash.toString()
  order.save()
}

export function handleRegister(event: Register): void {
  
  // Register
  let userId = event.params.userId.toHex()
  let attendee = Attendee.load(userId)
  if (attendee == null) {
    attendee = new Attendee(userId)
    attendee.ordersCount = BigInt.fromI32(0)
  }
  attendee.address = event.params.userId
  attendee.createdAt = event.block.timestamp
  attendee.save()
    
  //membership
  // let membership = new Membership(
  //   event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  // );
  // membership.membershipAddress = event.params.membershipAddress;
  // membership.creator = userId;
  // membership.createdAt = event.block.timestamp;
  // membership.transactionHash = event.transaction.hash.toHex();
  // membership.relatedorders = event.params.relatedorders.map<string>(
  //   (item) => item.toString()
  // )
  // membership.save();
}

export function handleDoneOrder(event: DoneOrder): void {
  // Done order
  let orderId = event.params.id
  let order = Order.load(orderId)
  if (order == null) {
    return
  } else {
    order.completed = event.params.done
    order.createdAt = event.block.timestamp
    order.save()
  }
}