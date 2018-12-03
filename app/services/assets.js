import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { Promise } from 'rsvp';
import DS from 'ember-data';
import fetch from 'fetch';

export default Service.extend({
  assets: null,
  isLoaded: alias('assetsPromise.isFulfilled'),
  fastboot: service(),

  init() {
    this._super(...arguments);

    const fastboot = this.get('fastboot');
    const shoebox = this.get('fastboot.shoebox');
    const shoeboxAssets = shoebox.retrieve('assets-store');

    let promise;

    if (this.assets) {
      promise = new Promise(resolve => resolve(this.assets));
    } else if (shoeboxAssets) {
      this.set('assets', shoeboxAssets);
      promise = new Promise(resolve => resolve(this.assets));
    } else {
      // promise = new Promise(resolve => {
      //   return setTimeout(() => {
      //     return resolve("assets");
      //   }, 2000);
      // })
      promise = this.loadAssetMap()
      .then(result => {
        if (fastboot.isFastBoot) {
          shoebox.put('assets-store', result);
        }
        this.set('assets', result);
        return result;
      });
    }

    this.assetsPromise = DS.PromiseObject.create({ promise });
    if (fastboot.isFastBoot) { fastboot.deferRendering(this.assetsPromise) }
  },

  loadAssetMap() {
    let path = '/assets/assetMap.json';

    if (this.fastboot.isFastBoot) {
      const headers = this.fastboot.request.headers;
      let host = headers.get('host');
      // needs http because currently Prember doesn't include protocol
      path = `http://${host}${path}`;
    }

    return fetch(path).then(res => {
      return res.json();
    });
  }
});
