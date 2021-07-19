import { SwaggerRouter } from 'koa-swagger-decorator';
import Api1Router from './v1';

const router = new SwaggerRouter();

// @ts-ignore
router.use('/v1', Api1Router.routes());

export default router;