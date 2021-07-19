import { SwaggerRouter } from "koa-swagger-decorator";

const router = new SwaggerRouter();

let prefix = `/v1`;

// swagger docs avaliable at http://localhost:3000/api/v1/swagger-html
router.swagger({
    title: 'ITT Server',
    description: 'API DOC',
    version: '1.0.0',

    // [optional] default is root path.
    prefix: prefix,

    // [optional] default is /swagger-html
    swaggerHtmlEndpoint: '/swagger-html',

    // [optional] default is /swagger-json
    swaggerJsonEndpoint: '/swagger-json',

    swaggerConfiguration: {
        display: {
            defaultModelsExpandDepth: 4,
            defaultModelExpandDepth: 3,
            docExpansion: 'list',
            defaultModelRendering: 'model'
        }
    }
});

// mapDir will scan the input dir, and automatically call router.map to all Router Class
router.mapDir(__dirname, {
    // default: true. To recursively scan the dir to make router. If false, will not scan subroutes dir
    // recursive: true,
    // default: true, if true, you can call ctx.validatedBody[Query|Params] to get validated data.
    // doValidation: true,
});

export default router;