// lib/domains/_shared/domain-topic-adapter.ts
// Converts DomainTopic → AuthorityTopic for the engine registry.
// This is the ONLY file that imports from both the engine and the domain layer.
// No unsafe casts. Full type safety via DomainTopicMapper<AuthorityTopic>.

import type {
  AuthorityTopic,
  PageSection,
  SectionItem,
  Cta,
  CrossDomainLink,
  TopicIntent,
  SectionLayout,
} from '@/lib/authority-engine/types'

import type {
  DomainTopicMapper,
  ContentBlock,
  ContentBlockItem,
  TopicCta,
  TopicRelationship,
} from './domain-topic.types'

// SearchIntent → TopicIntent mapping. 'remedial' has no SearchIntent equivalent;
// topics that need it should set it explicitly via a custom adapter variant.
const INTENT_MAP: Record<string, TopicIntent> = {
  informational: 'discovery',
  commercial:    'decision',
  comparison:    'comparative',
  transactional: 'timing',
}

function adaptItem(item: ContentBlockItem): SectionItem {
  return {
    id:           item.id,
    label:        item.label,
    label_hi:     item.label_hi ?? '',   // engine requires this field
    body:         item.body,
    body_hi:      item.body_hi,
    badge:        item.badge,
    badge_hi:     item.badge_hi,
    badgeVariant: item.badgeVariant,
    icon:         item.icon,
    href:         item.href,
  }
}

function adaptSection(block: ContentBlock): PageSection {
  return {
    id:       block.id,
    title:    block.title,
    title_hi: block.title_hi ?? '',      // engine requires this field
    // ContentBlockLayout values are identical to SectionLayout values.
    layout:   block.layout as SectionLayout,
    columns:  block.columns,
    items:    block.items.map(adaptItem),
  }
}

function adaptCta(cta: TopicCta): Cta | null {
  // Engine only renders 'tool' and 'report'. Other CtaDestinationType values
  // ('topic', 'page', 'external') require renderer support not yet in the engine.
  if (cta.type !== 'tool' && cta.type !== 'report') return null
  return {
    type:           cta.type,
    slug:           cta.slug,
    label:          cta.label,
    label_hi:       cta.label_hi       ?? '',   // engine requires this field
    description:    cta.description    ?? '',   // engine requires this field
    description_hi: cta.description_hi ?? '',   // engine requires this field
  }
}

function adaptCrossLink(link: TopicRelationship): CrossDomainLink {
  return {
    domainSlug: link.domain,
    topicSlug:  link.slug,
    label:      link.label    ?? '',
    label_hi:   link.label_hi ?? '',
  }
}

export const mapDomainTopicToEngine: DomainTopicMapper<AuthorityTopic> = (topic) => {
  const crossDomainLinks = topic.relationships?.crossLinks?.map(adaptCrossLink)

  return {
    slug:               topic.identity.slug,
    category:           topic.identity.category,
    title:              topic.identity.title,
    title_hi:           topic.identity.title_hi        ?? '',
    subtitle:           topic.hero.subtext,
    subtitle_hi:        topic.hero.subtext_hi,
    metaDescription:    topic.seo.metaDescription,
    metaDescription_hi: topic.seo.metaDescription_hi   ?? '',
    keywords:           [...topic.taxonomy.keywords],
    keywords_hi:        [...(topic.taxonomy.keywords_hi ?? [])],
    sections:           topic.content.contentBlocks.map(adaptSection),
    ctas:               topic.content.ctas
                          .map(adaptCta)
                          .filter((c): c is Cta => c !== null),
    tags:               [...topic.taxonomy.tags],
    intent:             INTENT_MAP[topic.aiMetadata.searchIntent] ?? 'discovery',
    difficulty:         topic.aiMetadata.difficulty,
    publishedAt:        topic.schemaSignals.datePublished ?? topic.lineage?.firstAuthoredAt ?? '',
    updatedAt:          topic.authority.lastUpdated       ?? '',
    ...(crossDomainLinks?.length ? { crossDomainLinks } : {}),
  }
}
