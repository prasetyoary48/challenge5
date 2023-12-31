const express = require('express');
const router = express.Router();
const storage = require('../utils/multer')
const controller = require('../app/controller')
const multer = require('multer')();

router.get('/images', express.static('public/images'))

router.post('/api/v2/upload/image', storage.image.single('image'),controller.media.uploadImage)
router.post('/api/v2/upload/video', storage.video.single('video'),controller.media.uploadVideo)
router.post('/api/v2/upload/documents', storage.document.single('doc'),controller.media.uploadDocument)

//qrcode
router.post('/api/v2/qrcode', controller.media.qrcode)

//imagekit
router.post('/api/v2/upload/imagekit',multer.single('image'),controller.media.imagekitUpload
)


module.exports = router;