export class CommonConst {
    static DOMAIN_CONNECTION_TOKEN = "Domain-DbConnectionToken";
    static QUERY_CONNECTION_TOKEN = "Query-DbConnectionToken";

    static DOMAIN_MODEL_TOKEN = "Domain-ModelToken";
    static QUERY_MODEL_TOKEN = "Query-ModelToken";

    static PRODUCT_DOMAIN_MODEL_TOKEN = "Product-Domain-ModelToken";
    static PRODUCT_QUERY_MODEL_TOKEN = "Product-Query-ModelToken";


    static PRODUCT_EVENTS_DOMAIN = "events-product";
    static PRODUCT_COLLECTION_QUERY = "products";
    static PRODUCT_AGGREGATE_NAME = "product";


    //Code Generate
    static CODE_GENERATE_COLLECTION = "code-generates";

    static AGGREGATES = {
        PRODUCT: {
            NAME: CommonConst.PRODUCT_AGGREGATE_NAME,
            CREATED: CommonConst.PRODUCT_AGGREGATE_NAME + "Created",
            UPDATED: CommonConst.PRODUCT_AGGREGATE_NAME + "Updated",
            DELETED: CommonConst.PRODUCT_AGGREGATE_NAME + "Deleted",
            EVENTS: "events-" + CommonConst.PRODUCT_AGGREGATE_NAME,
            COLLECTION: CommonConst.PRODUCT_AGGREGATE_NAME,
        },
    }

    static AGGREGATE_NAMES(): Object[] {
        return Object.keys(this.AGGREGATES).map((key) => this.AGGREGATES[key].NAME);
    }




    //Microservice
    static PRODUCT_AMPQ_SERVICE = "product_ampq";
    static PRODUCT_AMPQ_QUEUE = "product_queue";
    static PRODUCT_AMPQ_PATTERN = "product_created_ampq";


    static PRODUCT_REDIS_SERVICE = "product_ampq";
    static PRODUCT_REDIS_PATTERN = "product_created_redis";
}