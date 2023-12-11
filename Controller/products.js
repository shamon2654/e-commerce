const Product=require("../Models/products")


const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort("name").select("name price").limit(10).skip(1)
    res.status(200).json({products,nbHits:products.length})
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort,fields,page,limit } = req.query;
    console
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }
    if (company) {
        queryObject.company = {$regex: company, $options: "i"};
    }
    if (name) {
        queryObject.name = {$regex: name, $options: "i" }//regex=search function method and filter the value .is called query operator. options is also qu ery operator
    }


    // let product = await Product.find(queryObject).sort(sortValue);
    let result =  Product.find(queryObject);
    if (sort) {
        const sortValue=sort.split(",").join(" ")//split using to split two or more value when the using (,or-ect) and it conver into an array and join methode using to join the split values to join we give  notation like (, , . ,space etc) =this all process called data massage
        result= result.sort(sortValue)
    }
    if (fields) {
        const fieldList = fields.split(",").join(" ");
        result = result.select(fieldList);//select particular fields unsing select method
    }
    const pageValue = Number(page) || 1;
    const limitValue = Number(limit) || 10;
    const skip = (pageValue - 1) * limitValue;
    result=result.limit(limitValue).skip(skip)//pagenation using sort ,skip,limit methods
    
    let product = await result;
    res.status(200).json({product,nbHits:product.length })
};


module.exports = {
    getAllProductsStatic,
    getAllProducts 
}