import { Router } from 'express';
import { all, store, update, deactive, search } from './postController'

const router: Router = Router();

router.route('/all').get(all);
router.route('/store').post(store);
router.route('/update/:id').put(update);
router.route('/deactivate/:id').put(deactive);
router.route('/search').post(search);

export default router;
