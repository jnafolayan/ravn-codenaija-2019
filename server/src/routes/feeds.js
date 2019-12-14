import FeedsController from "../controllers/feeds";

export default function(router, reportsModel){

    router.get('/', (req, res) => { FeedsController.getFeed(req, res, reportsModel) });
    router.post('/', (req, res) => {FeedsController.saveFeed(req, res, reportsModel)});
    router.patch('/', (req, res) => {FeedsController.approveFeed(req, res, reportsModel)});

    return router;
}