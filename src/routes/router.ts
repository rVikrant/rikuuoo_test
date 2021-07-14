import * as Router from "koa-router";
import authentication from "../middleware/auth";
import { demoRouter as demoget} from "./demo/demo"
const router = new Router();

router.use('/demo', authentication, demoget);
export const routes = router.routes();
// export { routes};