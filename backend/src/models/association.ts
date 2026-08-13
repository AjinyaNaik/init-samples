import User from "./user.model";
import SellerRequest from "./seller-request.model";
import SamplePack from "./sample-pack.model";
import Sample from "./sample.model";

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