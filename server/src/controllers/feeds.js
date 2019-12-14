

export default class FeedsController {
    static async saveFeed(req, res, feedsModel){
        const data = await feedsModel.create({...req.body});
        return res.status(201).json({
            data,
            message: "Feed created successfully",
            status: "FEEDS_CREATE_OK"
        })
    }


    static async approveFeed(req, res, feedsModel){
        const data = await feedsModel.findOneAndUpdate({_id: req.body._id}, { ...req.body }, { "upsert": true, "new": true });
        process.socket.sockets.emit('feed', data);
        return res.status(200).json({
            data,
            message: "All feeds updated successfully",
            status: "FEEDS_UPDATE_OK"
        });
    }

    static async getFeed(req, res, feedsModel) {
        return res.status(200).json({
            data: await feedsModel.find({}).exec(),
            message: "All feeds fetched successfully",
            status: "FEEDS_GET_OK"
        });
    }
}