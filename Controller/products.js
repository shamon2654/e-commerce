const Product=require("../Models/products")


const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({price:{$gt:30}}).sort("name").select("name price")
    res.status(200).json({products,nbHits:products.length})
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort,fields,page,limit,numericFilter } = req.query;
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
    if (numericFilter) {// only filter number value is called numeric filteraization
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        }
        const reqExp = /\b(>|<|>=|=|<=)\b/g;//which expression  are  avilable inthe reqular expresion denoted
        let filters = numericFilter.replace(reqExp, (match) => `-${operatorMap[match]}-`);//replace using to replace the value to another
        console.log(filters)

        const options = ["price", "rate"];//numeric ayitt varunna value kodukunna thane options
         
        filters = filters.split(",").forEach((item) => {//forEach using iterating array elements
            const [field, operator, value] = item.split("-")//destucture array elements
            if (options.includes(field)) {
                queryObject[field]={[operator]:Number(value)}
            }
        })

    }
    console.log(queryObject)

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