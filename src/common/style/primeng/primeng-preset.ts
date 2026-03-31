// This is the entry file for PrimeNG design token customization.
// This approach should be considered before the `primeng-override.scss` approach.

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
