const { json } = require("express");

class APIFeatures {
  constructor(query, querStr) {
    this.querStr = querStr;
    this.query = query;
  }
   
  search() {
    const keyword = ""+this.querStr.keyword;
    
    if (keyword) {
      const keywordRegex = new RegExp(keyword, "i");
      this.query = this.query.find({
        $or: [
          { Name: keywordRegex },
          { RollNo: keywordRegex },
          { Department: keywordRegex },
          { dateOfJoining: keywordRegex },
          { category: keywordRegex },
          { fellowship: keywordRegex },
          { nameOfInstitute: keywordRegex },
          { typeOfInstitute: keywordRegex },
          { scaleOfPayAndBasicPay: keywordRegex },
          { presentResidentialAddress: keywordRegex },
          { permanentAddress: keywordRegex },
          { maritalStatus: keywordRegex },
          { dateOfMarriage: keywordRegex },
          { contact: keywordRegex },
        ],
      });
    }
    return this;
  }
  search2() {
    const keyword = ""+this.querStr.keyword;
    
    if (keyword) {
      const keywordRegex = new RegExp(keyword, "i");
      this.query = this.query.find({
        $or: [
          { name: keywordRegex },
          { email: keywordRegex },
          { staffNumber: keywordRegex },
          { designation: keywordRegex },
          { department: keywordRegex },
          { presentResidentialAddress: keywordRegex },
          { maritalStatus: keywordRegex },
          { applicationType: keywordRegex },
          { scOrST: keywordRegex },
        ],
      });
    }
    return this;
  }

  filter() {
    const queryCopy = { ...this.querStr };
    // remove fields from query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // advance filter for price and rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    console.log(queryStr);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.querStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
