import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { EMPTY_BASIC_FILTERS, buildUsersQuery } from './usersApi';
import { appliedFiltersToCriteria, criteriaToEditor, editedCriteria, criteriaSummary } from './audiencesApi';
for (const language of [[], ['en'], ['hi'], ['hi','en','hi']]) {
 test(`language query and criteria round trip: ${language}`, () => {
  const filters={...structuredClone(EMPTY_BASIC_FILTERS),language};
  const criteria=appliedFiltersToCriteria('',filters);
  const canonical=[...new Set(language)].sort();
  assert.equal(new URLSearchParams(buildUsersQuery('',filters,2,20)).get('language'),canonical.length?canonical.join(','):null);
  assert.deepEqual(criteria.filters.language,canonical.length?canonical:undefined);
  const editor=criteriaToEditor(criteria);
  assert.deepEqual(editedCriteria(editor.search,editor.filters,criteria),criteria);
 });
}
test('malformed language fails closed',()=>{
 for(const language of [[],null,'en',['HI'],['fr'],[true],[{}]]) assert.throws(()=>criteriaToEditor({version:1,filters:{language}} as never));
 for(const language of [null,'en',['HI'],['fr'],[true]]) assert.throws(()=>appliedFiltersToCriteria('',{...structuredClone(EMPTY_BASIC_FILTERS),language} as never));
});
test('historical criteria stays unchanged',()=>{
 const original={version:1 as const,filters:{moon_sign:['Aries'],ask_now_buyer:false}};
 const editor=criteriaToEditor(original);
 assert.deepEqual(editedCriteria(editor.search,editor.filters,original,editor.booleans),original);
});
test('human language labels in summary',()=>{
 const summary=criteriaSummary({version:1,filters:{language:['en','hi']}}).join(' ');
 assert(summary.includes('English')); assert(summary.includes('Hindi'));
});
