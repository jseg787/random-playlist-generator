const express = require('express');
const router = express.Router();


// Load each controller
// const postsController = require('./posts.js');
const appConfigController = require('./appConfig.js');
const songsController = require("./songs.js")

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
// router.use('/posts', postsController);
router.use("/songs", songsController);
router.use('/application-configuration', appConfigController);


module.exports = router;