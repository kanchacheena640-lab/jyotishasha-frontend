// lib/domains/financial-astrology/_index.ts
// Assembles the complete AuthorityDomain for Financial Astrology.
// To add a topic: import it here and add slug → export entry.
// Skeletons (private-job, work-from-home, stable-career) are excluded until built.

import type { AuthorityDomain } from '@/lib/authority-engine/types'
import { mapDomainTopicToEngine } from '@/lib/domains/_shared/domain-topic-adapter'
import { financialAstrologyMeta }  from './_meta'

import { newJobChances }        from './topics/new-job-chances'
import { jobChangePrediction }  from './topics/job-change-prediction'
import { promotionChances }     from './topics/promotion-chances'
import { careerGrowth }         from './topics/career-growth'
import { careerChallenges }     from './topics/career-challenges'
import { bestCareer }           from './topics/best-career'
import { jobVsBusiness }        from './topics/job-vs-business'
import { governmentJob }        from './topics/government-job'
import { salaryGrowth }         from './topics/salary-growth'
import { careerAfter40 }        from './topics/career-after-40'
import { careerAfterMarriage }  from './topics/career-after-marriage'

export const financialAstrologyDomain: AuthorityDomain = {
  ...financialAstrologyMeta,
  topics: {
    'new-job-chances':       mapDomainTopicToEngine(newJobChances),
    'job-change-prediction': mapDomainTopicToEngine(jobChangePrediction),
    'promotion-chances':     mapDomainTopicToEngine(promotionChances),
    'career-growth':         mapDomainTopicToEngine(careerGrowth),
    'career-challenges':     mapDomainTopicToEngine(careerChallenges),
    'best-career':           mapDomainTopicToEngine(bestCareer),
    'job-vs-business':       mapDomainTopicToEngine(jobVsBusiness),
    'government-job':        mapDomainTopicToEngine(governmentJob),
    'salary-growth':         mapDomainTopicToEngine(salaryGrowth),
    'career-after-40':       mapDomainTopicToEngine(careerAfter40),
    'career-after-marriage': mapDomainTopicToEngine(careerAfterMarriage),
  },
}
