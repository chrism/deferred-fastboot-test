import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  assets: service(),
  fastboot: service(),

  init() {
    this._super(...arguments);

    const fastboot = this.get('fastboot');
    if (fastboot.isFastBoot) {
      const waitPromise = this.get('assets.assetsPromise');
      fastboot.deferRendering(waitPromise);
    }
  }
});
