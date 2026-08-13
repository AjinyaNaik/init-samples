import User from "./User.model";
import SellerRequest from "./SellerRequest.model";

User.hasMany(SellerRequest, {
  foreignKey: "user_id",
  as: "sellerRequests",
});

SellerRequest.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});