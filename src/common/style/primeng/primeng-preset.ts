import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/Lara';
import { primengSemantic } from 'common/style/primeng/primeng-semantic';
import { primengPrimitive } from './primeng-primitive';
import { primengComponents } from './primeng-components';
import { BaseDesignTokens, Preset } from '@primeuix/themes/types';

export const preset = definePreset(Lara, {
  primitive: primengPrimitive,
  semantic: primengSemantic,
  components: primengComponents,
} as Preset<BaseDesignTokens>);
