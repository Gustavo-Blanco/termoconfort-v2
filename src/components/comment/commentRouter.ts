import { Router } from 'express';
import { all, store, update, byUserPost } from './commentController'

const router: Router = Router();

router.route('/all').get(all);
router.route('/store').post(store);
router.route('/update/:id').put(update);
router.route('/by-user-post').post(byUserPost);

export default router;
