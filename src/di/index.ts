import { AppController } from '../controller/appController';
import { AppService } from '../service/appService';

const appService = new AppService()
const appController = new AppController(appService);

export { appController };