import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/Lara';
import { semantic } from 'common/style/primeng/primeng-semantic';
import { primitive } from './primeng-primitive';
import { components } from './primeng-components';

export const preset = definePreset(Lara, {
  primitive,
  semantic,
  components,
});
