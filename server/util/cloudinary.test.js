const cloudinary = require('cloudinary');
const {removeImages} = require("./cloudinary");

const IMAGE_1 = 'eefptkc5daryqy0fy0iq';
const IMAGE_2 = 'rmop89xrpijrx3xqghhx';
jest.mock('cloudinary');

describe('Remove images', () => {
    it('should remove images from Cloudinary', async () => {
        const destroyMock = jest.fn().mockResolvedValue({ result: 'ok' });

        cloudinary.v2.uploader.destroy = destroyMock;

        await removeImages([{name: IMAGE_1}, {name: IMAGE_2}]);

        expect(cloudinary.v2.uploader.destroy).toHaveBeenCalledTimes(2);
        expect(cloudinary.v2.uploader.destroy).toHaveBeenCalledWith(IMAGE_1);
        expect(cloudinary.v2.uploader.destroy).toHaveBeenCalledWith(IMAGE_2);
        expect(destroyMock).toHaveBeenCalled();
    });
});