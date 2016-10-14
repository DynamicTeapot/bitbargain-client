import { IMAGE_CLEAR, IMAGE_POST, IMAGE_SUCCESS } from '../../app/actions/sellitem.action';
import { imageReducer } from '../../app/reducers/images.reducer';

describe('image reducer', () => {
  const image = { url: 'url' };

  it('should return initial state', () => {
    const result = imageReducer(undefined, {});
    expect(result).toEqual({
      imageStatus: 'ready',
      images: []
    });
  });

  it('should change image status on POST', () => {
    expect(imageReducer({}, { type: IMAGE_POST })).toEqual({
      imageStatus: 'loading'
    });
  });

  it('should update urls with image success and change imageStatus', () => {
    const result = imageReducer({
      imageStatus: 'loading',
      images: []
    }, { type: IMAGE_SUCCESS, image });
    expect(result.imageStatus).toEqual('ready');
    expect(result.images[0]).toEqual(image.url);
    expect(result.images.length).toEqual(1);
  });

  it('should clear images on IMAGE_CLEAR', () => {
    const result = imageReducer({ images: [image.url] }, { type: IMAGE_CLEAR });

    expect(result.images.length).toEqual(0);
  });
});

