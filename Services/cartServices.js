
 exports.deleteProduct=(userid,productid)=>{
    const cart=Cart.findOne({user_id:userid});
    const product=cart.products.filter(product=>product.product_id!==productid);
    cart.products=product;
    cart.save();
}


