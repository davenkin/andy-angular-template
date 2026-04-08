// This is the entry file for PrimeNG design token customization.
// This approach should be considered before the `primeng-override.scss` approach.

import { definePreset } from '@primeuix/themes';
import { BaseDesignTokens, Preset } from '@primeuix/themes/types';
import Lara from '@primeuix/themes/Lara';
import { primengSemantic } from './primeng-semantic';
import { primengPrimitive } from './primeng-primitive';
import { primengComponents } from './primeng-components';

export const preset = definePreset(Lara, {
  primitive: primengPrimitive,
  semantic: primengSemantic,
  components: primengComponents,
} as Preset<BaseDesignTokens>);
