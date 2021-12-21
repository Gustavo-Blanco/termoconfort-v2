import { Router } from "express";
import userRouter from '../components/user/userRouter';
import enterpriseRouter from '../components/enterprise/enterpriseRouter';

const router: Router = Router({ mergeParams: true });

router.use('/user',userRouter);
router.use('/enterprise',enterpriseRouter);

export default router;
