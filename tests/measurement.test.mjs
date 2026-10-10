import test from 'node:test';
import assert from 'node:assert/strict';
import { measurementLocation } from '../src/lib/measurement-location.ts';

test('paid landing pages retain campaign attribution while unrelated query data is omitted', () => {
  assert.equal(measurementLocation('https://jeffreysuffian.com/services/business-advisory?utm_source=google&utm_medium=cpc&utm_campaign=advisory&gclid=click123&email=private%40example.com#form'), 'https://jeffreysuffian.com/services/business-advisory?utm_source=google&utm_medium=cpc&utm_campaign=advisory&gclid=click123');
});
test('organic locations do not acquire invented campaign parameters', () => {
  assert.equal(measurementLocation('https://jeffreysuffian.com/contact#main-content'), 'https://jeffreysuffian.com/contact');
});
