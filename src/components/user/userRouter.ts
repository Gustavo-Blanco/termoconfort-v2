import {Router} from 'express';
import { authorization } from '../../middlewares/authorization';
import { uploadMulter } from '../../services/images/Multer';
import { all, signUp, signIn, byId, hasEnterprise, update, getEnterprise, orders } from './userController';

const router: Router = Router();


router.route('/all').get(all);
router.route('/sign-up').post(signUp);
router.route('/sign-in').post(signIn);
router.route('/by-id/:id').get(authorization,byId);
router.route('/has-enterprise/:id').get(authorization,hasEnterprise);
router.route('/update/:id').put(authorization,uploadMulter.single('image'),update);
router.route('/get-enterprise/:id').get(getEnterprise);
router.route('/get-orders/:id').get(orders);

export default router;