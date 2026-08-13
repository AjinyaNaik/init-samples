import User from "./user.model";
import SellerRequest from "./seller-request.model";
import SamplePack from "./sample-pack.model";
import Sample from "./sample.model";
import Order from "./order.model";
import OrderItem from "./order_item.model";
import Payment from "./payment.model";

User.hasMany(SellerRequest, {
  foreignKey: "user_id",
  as: "sellerRequests",
});

User.hasMany(SellerRequest, {
  foreignKey: "reviewed_by",
  as: "reviewedSellerRequests",
});

SellerRequest.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

SellerRequest.belongsTo(User, {
  foreignKey: "reviewed_by",
  as: "reviewer",
});

SamplePack.hasMany(Sample, {
  foreignKey: "sample_pack_id",
  sourceKey: "id",
  as: "samples", 
});

Sample.belongsTo(SamplePack, {
  foreignKey: "sample_pack_id",
  targetKey: "id",
  as: "sample_pack", 
});

User.hasMany(Order, {
  foreignKey: "user_id",
  as: "orders",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

/*
 * Order → OrderItems
 *
 * One order can contain many items.
 */
Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  as: "items",
});

OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

/*
 * Sample → OrderItems
 *
 * One sample can appear in many order items
 * because different users can purchase it.
 */
Sample.hasMany(OrderItem, {
  foreignKey: "sample_id",
  as: "order_items",
});

OrderItem.belongsTo(Sample, {
  foreignKey: "sample_id",
  as: "sample",
});

Order.hasOne(Payment, {
  foreignKey: "order_id",
  as: "payment",
});

Payment.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});