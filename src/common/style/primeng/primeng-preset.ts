import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/Lara';
import semantic from 'common/style/primeng/primeng-semantic';
import primitive from './primeng-primitive';
import components from './primeng-components';
import { BaseDesignTokens, Preset } from '@primeuix/themes/types';

export const preset = definePreset(Lara, {
  primitive,
  semantic,
  components,
} as Preset<BaseDesignTokens>);
