import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { tokens } from '../src/design-system/tokens.js';

describe('VEDIC TREE OS — DESIGN SYSTEM & TOKENS TEST SUITE', () => {
  it('1.1 Verifies Vedic Tree Heritage brand palette tokens', () => {
    assert.equal(tokens.colors.brand[900], '#0F4C35', 'Primary brand green must be #0F4C35');
    assert.equal(tokens.colors.brand[950], '#0A2E20', 'Deep green surface must be #0A2E20');
    assert.equal(tokens.colors.accent[500], '#F59E0B', 'Primary saffron accent must be #F59E0B');
    assert.equal(tokens.colors.accent[600], '#D97706', 'Saffron gold accent must be #D97706');
  });

  it('1.2 Verifies enterprise slate neutral scale', () => {
    assert.ok(tokens.colors.slate[50], 'Must contain slate 50');
    assert.ok(tokens.colors.slate[900], 'Must contain slate 900');
    assert.equal(tokens.colors.slate[950], '#090D16', 'Dark mode canvas must be #090D16');
  });

  it('1.3 Verifies semantic status feedback colors', () => {
    assert.ok(tokens.colors.semantic.success.solid, 'Must have semantic success');
    assert.ok(tokens.colors.semantic.warning.solid, 'Must have semantic warning');
    assert.ok(tokens.colors.semantic.danger.solid, 'Must have semantic danger');
    assert.ok(tokens.colors.semantic.info.solid, 'Must have semantic info');
    assert.ok(tokens.colors.semantic.ai.solid, 'Must have semantic ai color');
  });

  it('1.4 Verifies typography font family specifications', () => {
    assert.ok(tokens.typography.fontFamilies.sans.includes('Inter'), 'Sans font must use Inter');
    assert.ok(tokens.typography.fontFamilies.mono.includes('JetBrains Mono'), 'Mono font must include JetBrains Mono');
  });

  it('1.5 Verifies spacing and elevation tokens', () => {
    assert.equal(tokens.spacing[4], '1rem', 'Spacing 4 must be 1rem (16px)');
    assert.equal(tokens.spacing[6], '1.5rem', 'Spacing 6 must be 1.5rem (24px)');
    assert.ok(tokens.shadows.sm, 'Must define small elevation shadow');
    assert.ok(tokens.shadows.elevated, 'Must define elevated modal shadow');
  });
});
