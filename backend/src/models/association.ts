import User from "./User.model";
import SellerRequest from "./SellerRequest.model";
import SamplePack from "./SamplePack.model";
import Sample from "./Sample.model";

User.hasMany(SellerRequest, {
  foreignKey: "user_id",
  as: "sellerRequests",
});

SellerRequest.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
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