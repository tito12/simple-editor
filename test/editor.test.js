import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import {
  fetchAllImages,
  FETCH_IMAGES
} from '../src/actions/editor';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions async', () => {

  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('should fetch images', () => {

    let data = [{
      "id": "0",
      "author": "Alejandro Escamilla",
      "width": 5616,
      "height": 3744,
      "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
      "download_url": "https://picsum.photos/id/0/5616/3744"
    }, {
      "id": "1",
      "author": "Alejandro Escamilla",
      "width": 5616,
      "height": 3744,
      "url": "https://unsplash.com/photos/LNRyGwIJr5c",
      "download_url": "https://picsum.photos/id/1/5616/3744"
    }, {
      "id": "10",
      "author": "Paul Jarvis",
      "width": 2500,
      "height": 1667,
      "url": "https://unsplash.com/photos/6J--NXulQCs",
      "download_url": "https://picsum.photos/id/10/2500/1667"
    }, {
      "id": "100",
      "author": "Tina Rataj",
      "width": 2500,
      "height": 1656,
      "url": "https://unsplash.com/photos/pwaaqfoMibI",
      "download_url": "https://picsum.photos/id/100/2500/1656"
    }];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: data
      });
    });

    const expectedAction = [{
      type: FETCH_IMAGES,
      images: data
    }];

    const store = mockStore({
      images: {}
    });

    return store.dispatch(fetchAllImages()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});