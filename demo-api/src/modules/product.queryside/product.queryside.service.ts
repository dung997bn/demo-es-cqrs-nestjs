import { Injectable } from '@nestjs/common';
import { ProductQueryRepository } from './repositories/product.query.repository';

@Injectable()
export class ProductQuerySideService {
    constructor(
        private readonly repository: ProductQueryRepository
    ) { }

    async findById(id: string) {
        return await this.repository.findOne({ id });
    }

    // async findAll(query, user) {
    //     const _query: any = {};
    //     if (query._fields) {
    //         _query._fields = query._fields;
    //     }
    //     if (query.q) {
    //         _query.$or = [
    //             { name: { $regex: query.q, $options: "i" } },
    //             { code: { $regex: query.q, $options: "i" } },
    //         ];
    //     }
    //     if (query.projectIds) {
    //         _query['project.id'] = { $in: query.projectIds.split(',') }
    //     }
    //     if (query.categories) {
    //         _query['category.id'] = { $in: query.categories.split(',') }
    //     }
    //     if (query.hasProject) {
    //         _query['project'] = { $nin: [null, {}], $exists: true }
    //     }
    //     if (query.hasFavorite) {
    //         _query['favorites'] = user.id
    //     }
    //     if (query.status) {
    //         _query['status'] = query.status
    //     }
    //     if (query["page"] && query["pageSize"]) {
    //         const page = parseInt(query["page"]) || 1;
    //         const pageSize = parseInt(query["pageSize"]) || 10;
    //         _query.page = page;
    //         _query.pageSize = pageSize;
    //         _query.isPaging = true;
    //         return Promise.all([
    //             await this.repository.findAll(_query),
    //             await this.repository.countAll(_query),
    //         ]).then((res) => ({
    //             rows: res[0],
    //             total: res[1],
    //             page,
    //             pageSize,
    //             totalPages: Math.floor((res[1] + pageSize - 1) / pageSize),
    //         }));
    //     } else {
    //         return await this.repository.findAll(_query);
    //     }
    // }
}
