import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  assets: service(),

  async init() {
    this._super(...arguments);

    const waitPromise = await this.get('assets.assetsPromise');

    console.log('init', waitPromise);
  }
});
