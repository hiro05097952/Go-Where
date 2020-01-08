/* eslint-disable camelcase */
import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW';

Vue.use(VeeValidate, {
  inject: true,
  delay: 500,
});
Validator.localize('zh_TW', zh_TW);
