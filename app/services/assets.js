import Service from '@ember/service';
import { Promise } from 'rsvp';
import { computed } from '@ember/object';
import DS from 'ember-data';

export default Service.extend({
  assets: null,

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
