import { Router } from 'express';
import { all, store, update } from './enterpriseController'

const router: Router = Router();

router.route('/all').get(all);
router.route('/store').post(store);
router.route('/update/:id').put(update);


export default router;
