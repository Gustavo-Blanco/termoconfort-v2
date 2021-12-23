import { Router } from "express";
import userRouter from '../components/user/userRouter';
import enterpriseRouter from '../components/enterprise/enterpriseRouter';
import productRouter from '../components/product/productRouter';

const router: Router = Router({ mergeParams: true });

router.use('/user',userRouter);
router.use('/enterprise',enterpriseRouter);
router.use('/product',productRouter);

export default router;
