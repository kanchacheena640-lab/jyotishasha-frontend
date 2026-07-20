// lib/domains/marriage-astrology/_index.ts
// Assembles the complete AuthorityDomain for Marriage Astrology.
// To add a topic: import it here and add slug → export entry.
//
// Registry: this domain is NOT yet in lib/authority-engine/registry.ts.
// To activate: uncomment 'marriage-astrology' in DOMAIN_MANIFEST and the two
// associated lines in registry.ts once all 12 topics have content.

import type { AuthorityDomain } from '@/lib/authority-engine/types'
import { mapDomainTopicToEngine } from '@/lib/domains/_shared/domain-topic-adapter'
import { marriageAstrologyMeta }  from './_meta'

import { marriagePrediction }  from './topics/marriage-prediction'
import { marriageTiming }      from './topics/marriage-timing'
import { loveMarriage }        from './topics/love-marriage'
import { arrangedMarriage }    from './topics/arranged-marriage'
import { delayedMarriage }     from './topics/delayed-marriage'
import { earlyMarriage }       from './topics/early-marriage'
import { secondMarriage }      from './topics/second-marriage'
import { divorcePossibility }  from './topics/divorce-possibility'
import { spouseNature }        from './topics/spouse-nature'
import { marriedLife }         from './topics/married-life'
import { compatibility }       from './topics/compatibility'
import { intercasteMarriage }  from './topics/intercaste-marriage'

export const marriageAstrologyDomain: AuthorityDomain = {
  ...marriageAstrologyMeta,
  topics: {
    'marriage-prediction':  mapDomainTopicToEngine(marriagePrediction),
    'marriage-timing':      mapDomainTopicToEngine(marriageTiming),
    'love-marriage':        mapDomainTopicToEngine(loveMarriage),
    'arranged-marriage':    mapDomainTopicToEngine(arrangedMarriage),
    'delayed-marriage':     mapDomainTopicToEngine(delayedMarriage),
    'early-marriage':       mapDomainTopicToEngine(earlyMarriage),
    'second-marriage':      mapDomainTopicToEngine(secondMarriage),
    'divorce-possibility':  mapDomainTopicToEngine(divorcePossibility),
    'spouse-nature':        mapDomainTopicToEngine(spouseNature),
    'married-life':         mapDomainTopicToEngine(marriedLife),
    'compatibility':        mapDomainTopicToEngine(compatibility),
    'intercaste-marriage':  mapDomainTopicToEngine(intercasteMarriage),
  },
}
