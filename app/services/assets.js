import Service from '@ember/service';
import { Promise } from 'rsvp';
import { computed } from '@ember/object';
import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default Service.extend({
  assets: null,
  fastboot: service(),

  init() {
    this._super(...arguments);

    const fastboot = this.get('fastboot');
    if (fastboot.isFastBoot) {
      const waitPromise = this.get('assetsPromise');
      fastboot.deferRendering(waitPromise);
    }
  },

  assetsPromise: computed(function() {
    let promise;

    if (this.assets) {
      console.log('already loaded');
      promise = new Promise(resolve => {
        return resolve(this.assets);
      });
    } else {
      console.log('loading');
      promise = new Promise(resolve => {
        return setTimeout(() => {
          return resolve("assets");
        }, 2000);
      }).then(result => {
        this.set('assets', result);
        return result;
      });
    }

    return DS.PromiseObject.create({ promise });
  })
});
