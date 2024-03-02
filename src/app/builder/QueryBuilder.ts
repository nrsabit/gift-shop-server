import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  constructor(
    public modelQuery: Query<T[], T>,
    public query: Record<string, unknown>,
  ) {}

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields?.map(
          field =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludedQueries = ['email', 'sort', 'limit', 'page', 'fields'];
    excludedQueries.forEach(element => delete queryObj[element]);

    if (queryObj.minPrice || queryObj.maxPrice) {
      const productPrice: Record<string, unknown> = {};
      if (queryObj.minPrice) {
        productPrice.$gte = Number(queryObj.minPrice);
      }
      if (queryObj.maxPrice) {
        productPrice.$lte = Number(queryObj.maxPrice);
      }
      queryObj.productPrice = productPrice;
    }
    queryObj.productQuantity = { $gt: 0 };

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }
}

export default QueryBuilder;
