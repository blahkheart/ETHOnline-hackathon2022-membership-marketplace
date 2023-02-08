import { BigInt} from "@graphprotocol/graph-ts"
import {
  Transfer as TransferEvent
} from "../generated/BuidlBuxx/BuidlBuxx"

import { Order, Customer, Vendor } from "../generated/schema"

// NOTE: Addresses should be in the lowercase format
const vendors = [
  "0x2d4bbcc282ea9167d1d24df9b92227f7b2c060a8",
  "0x0dc01c03207fb73937b4ac88d840fbbb32e8026d",
]

export function handleNewOrder(event: TransferEvent): void {
  // check if the transfer is to one of the vendor addresses
  if (!vendors.includes(event.params.to.toHexString())) {
    return;
  }

  let order = new Order(event.transaction.hash.toHex())
  order.creator = event.params.from.toHexString()
  order.vendor = event.params.to.toHexString()
  order.amount = event.params.value
  order.createdAt = event.block.timestamp
  order.transactionHash = event.transaction.hash.toHex()
  order.save()

  //  order creator/ customer
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
  let orderVendorId = event.params.to.toHexString()
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
}