import { describe, expect, it } from 'vitest';
import { getSingleRouteParam } from '@/shared/lib/route-params';

describe('getSingleRouteParam', () => {
  it('normalizes a scalar value', () => {
    expect(getSingleRouteParam('  user-1  ')).toBe('user-1');
  });

  it('uses the first array value', () => {
    expect(getSingleRouteParam(['first', 'second'])).toBe('first');
  });

  it('rejects missing and blank values', () => {
    expect(getSingleRouteParam(undefined)).toBeUndefined();
    expect(getSingleRouteParam('   ')).toBeUndefined();
  });
});
