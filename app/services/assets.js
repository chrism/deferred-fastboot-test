import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Promise } from 'rsvp';
import DS from 'ember-data';

export default Service.extend({
  assets: null,
  fastboot: service(),

  init() {
    this._super(...arguments);

    const fastboot = this.get('fastboot');
    if (fastboot.isFastBoot) { fastboot.deferRendering(this.assetsPromise) }
  },

  assetsPromise: computed(function() {
    let promise;

    const fastboot = this.get('fastboot');
    const shoebox = this.get('fastboot.shoebox');
    const shoeboxAssets = shoebox.retrieve('assets-store');

    if (this.assets) {
      promise = new Promise(resolve => resolve(this.assets));
    } else if (shoeboxAssets) {
      this.set('assets', shoeboxAssets);
      promise = new Promise(resolve => resolve(this.assets));
    } else {
      promise = new Promise(resolve => {
        return setTimeout(() => {
          return resolve("assets");
        }, 2000);
      }).then(result => {
        if (fastboot.isFastBoot) {
          shoebox.put('assets-store', result);
        }
        this.set('assets', result);
        return result;
      });
    }

    return DS.PromiseObject.create({ promise });
  })
});
