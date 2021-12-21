import { Router } from 'express';
import { all, store, update, get, search } from './enterpriseController'

const router: Router = Router();

router.route('/all').get(all);
router.route('/store').post(store);
router.route('/update/:id').put(update);
router.route('/by-id/:id').get(get);
router.route('/search').post(search);


export default router;
