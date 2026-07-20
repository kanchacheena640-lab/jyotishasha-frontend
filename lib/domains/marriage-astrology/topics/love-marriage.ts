import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const loveMarriage: DomainTopic = {

  identity: {
    id:         'marriage-astrology:love-marriage',
    slug:       'love-marriage',
    title:      'Love Marriage in Vedic Astrology',
    title_hi:   'वैदिक ज्योतिष में प्रेम विवाह',
    domain:     'astrology',
    subdomain:  'marriage-astrology',
    category:   'marriage',
    entityType: 'concept',
    status:     'draft',
  },

  routing: {
    canonicalPath: '/marriage-astrology/love-marriage',
    breadcrumbs: [
      { label: 'Home',               label_hi: 'होम',           href: '/' },
      { label: 'Marriage Astrology', label_hi: 'विवाह ज्योतिष', href: '/marriage-astrology' },
      { label: 'Love Marriage',      label_hi: '',              href: '/marriage-astrology/love-marriage' },
    ],
  },

  seo: {
    metaTitle:       'Love Marriage in Vedic Astrology: Planets, Yogas & Signs',
    metaDescription: 'Explore how Vedic astrology identifies love marriage tendencies through the 5th-7th house link, Venus-Rahu combinations, and key planetary yogas.',
    robots:          'noindex,follow',
  },

  hero: {
    headline:    'Love Marriage in Vedic Astrology: What Your Chart Reveals',
    headline_hi: 'वैदिक ज्योतिष में प्रेम विवाह: आपकी कुंडली क्या बताती है',
    subtext:     'Discover how the connection between your 5th and 7th houses, Venus, Rahu, and key marriage yogas reveal your karmic blueprint for a love-based union.',
    subtext_hi:  'जानें कैसे पंचम और सप्तम भाव का संबंध, शुक्र, राहु और प्रमुख विवाह योग आपके प्रेम-आधारित विवाह के कार्मिक ब्लूप्रिंट को प्रकट करते हैं।',
  },

  taxonomy: {
    tags:        ['love-marriage', 'vedic-astrology', 'marriage-yogas', '5th-house', '7th-house', 'venus', 'rahu'],
    keywords:    ['love marriage astrology', 'love marriage in vedic astrology', 'love marriage yoga', '5th house 7th house connection', 'venus rahu love marriage', 'gandharva vivah'],
    keywords_hi: ['प्रेम विवाह ज्योतिष', 'वैदिक ज्योतिष में प्रेम विवाह', 'प्रेम विवाह योग', 'शुक्र राहु प्रेम विवाह'],
    hubPriority: 'featured',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'intro',
        title:    'Love Marriage as a Karmic Choice',
        title_hi: 'प्रेम विवाह एक कार्मिक चुनाव के रूप में',
        layout:   'list',
        items: [
          {
            id:       'intro-karmic-agency',
            label:    'A Karmic Choice, Not a Modern Anomaly',
            label_hi: 'एक कार्मिक चुनाव, आधुनिक विसंगति नहीं',
            body:     'In Vedic astrology, the love marriage — what traditional texts call the Gandharva Vivah — is the movement of matrimonial decision-making from family structure (the 9th and 10th houses) into the seat of individual romantic agency (the 5th and 7th houses). This is not a modern development; mutual attraction as the basis for union has always existed in the Vedic tradition. What changes is only the degree to which societal structures support or resist it.',
            body_hi:  'वैदिक ज्योतिष में, प्रेम विवाह — जिसे पारंपरिक ग्रंथ गंधर्व विवाह कहते हैं — वैवाहिक निर्णय-लेने का पारिवारिक संरचना (9वें और 10वें भाव) से व्यक्तिगत रोमांटिक एजेंसी (5वें और 7वें भाव) की ओर स्थानांतरण है।',
          },
          {
            id:       'intro-astrological-shift',
            label:    'The Astrological Shift: From Tradition to Agency',
            label_hi: 'ज्योतिषीय बदलाव: परंपरा से एजेंसी की ओर',
            body:     'An arranged marriage is rooted in the 9th house (tradition, dharma, father) and 10th house (societal standing, duty) — a structural union. A love marriage is rooted in the 5th house (Purva Punya — past life merits, romance, emotional attraction). When the 5th house exerts more influence over the 7th house than the 9th or 10th houses do, the chart shifts from "Whom am I expected to marry?" to "Whom am I emotionally bound to?"',
            body_hi:  'एक अरेंज विवाह 9वें भाव (परंपरा, धर्म) और 10वें भाव (सामाजिक प्रतिष्ठा) में निहित होता है। एक प्रेम विवाह 5वें भाव (पूर्व पुण्य — भावनात्मक आकर्षण) में निहित होता है। जब 5वां भाव 7वें भाव पर अधिक प्रभाव डालता है, तो कुंडली प्रेम-आधारित संघ की ओर झुकती है।',
          },
        ],
      },

      {
        id:       'houses-of-attraction',
        title:    'The Houses of Attraction: 5th and 7th',
        title_hi: 'आकर्षण के भाव: पंचम और सप्तम',
        layout:   'cards',
        items: [
          {
            id:       'house-5th',
            icon:     '🔥',
            label:    '5th House — The Engine of Romance',
            label_hi: 'पंचम भाव — रोमांस का इंजन',
            body:     'The 5th house is the Purva Punya — the fruits of past lives. If you have been karmically drawn to a specific soul in previous lifetimes, the energy often manifests here. It is the house of intense attraction, emotional fervor, and the "falling in love" phase. A strong 5th house lord in a favorable position is the first thing to look for.',
            body_hi:  'पंचम भाव पूर्व पुण्य है — पिछले जन्मों के फल। यह तीव्र आकर्षण, भावनात्मक उत्साह और "प्यार में पड़ने" का भाव है। किसी विशिष्ट आत्मा की ओर कार्मिक खिंचाव अक्सर यहाँ प्रकट होता है।',
          },
          {
            id:       'house-7th',
            icon:     '🏠',
            label:    '7th House — The Seat of Partnership',
            label_hi: 'सप्तम भाव — साझेदारी की सीट',
            body:     'The 7th house is where romantic energy seeks to land. It is the house of long-term commitment and the legal or social acknowledgment of the partner. Romance without the 7th house anchor often remains an experience — intense but without the formal gravity of marriage.',
            body_hi:  'सप्तम भाव वह है जहाँ रोमांटिक ऊर्जा स्थायित्व पाना चाहती है। यह दीर्घकालिक प्रतिबद्धता और साझेदार की कानूनी या सामाजिक मान्यता का भाव है।',
          },
          {
            id:       'house-5th-7th-link',
            icon:     '🔗',
            label:    'The Vital 5th-7th Link',
            label_hi: 'आवश्यक पंचम-सप्तम संबंध',
            body:     'The link between the 5th and 7th houses is non-negotiable for a love-based union. Three primary forms: Parivartana Yoga — the 5th lord sits in the 7th and the 7th lord sits in the 5th (exchange of energies, almost always indicates a self-chosen marriage); Conjunction — the 5th and 7th lords sit together, fusing passion with commitment; Mutual Aspect — the lords aspect each other, creating a bridge between romance and partnership.',
            body_hi:  'पंचम और सप्तम भाव के बीच संबंध प्रेम-आधारित विवाह के लिए अनिवार्य है: परिवर्तन योग (स्थान विनिमय), युति (दोनों स्वामी एक साथ), या परस्पर दृष्टि — ये तीन रूप इस कड़ी को बनाते हैं।',
          },
        ],
      },

      {
        id:       'planetary-actors',
        title:    'Key Planetary Actors in Love Marriage',
        title_hi: 'प्रेम विवाह में प्रमुख ग्रह कारक',
        layout:   'cards',
        items: [
          {
            id:       'planet-venus',
            icon:     '✨',
            label:    'Venus — The Architect of Attraction',
            label_hi: 'शुक्र — आकर्षण का वास्तुकार',
            body:     'Venus is the natural significator of beauty, love, and intimacy. In love marriages, Venus often sits in an angular house or is connected to the 5th or 7th lord. When Venus is associated with Rahu, the attraction becomes obsessive and intensely magnetic — often pushing the individual toward a partner against societal expectations.',
            body_hi:  'शुक्र प्रेम और आकर्षण का प्राकृतिक कारक है। प्रेम विवाह में, शुक्र प्रायः एक कोणीय भाव में या 5वें/7वें स्वामी से जुड़ा होता है। शुक्र-राहु संयोग आकर्षण को चुंबकीय और तीव्र बनाता है।',
          },
          {
            id:       'planet-mars',
            icon:     '🔴',
            label:    'Mars — The Passionate Driver',
            label_hi: 'मंगल — जुनून का चालक',
            body:     'Mars brings the heat. Attraction without Mars is often lukewarm. A connection between Venus and Mars is a classic signature for active romance — it gives the courage to pursue the desired person regardless of hurdles. Charts where the individual "fought" for their union almost always feature a Venus-Mars connection.',
            body_hi:  'मंगल गर्मी लाता है। शुक्र-मंगल का संबंध सक्रिय रोमांस की क्लासिक पहचान है — यह बाधाओं के बावजूद चाहे गए व्यक्ति का पीछा करने का साहस देता है।',
          },
          {
            id:       'planet-rahu',
            icon:     '🌑',
            label:    'Rahu — The Boundary Breaker',
            label_hi: 'राहु — सीमाओं का तोड़ने वाला',
            body:     'Rahu is perhaps the most important planet for modern love marriages. When Rahu influences the 7th house, the 5th house, or Venus, it compels the individual to break social norms. This is the primary signature for inter-caste, inter-religion, or cross-cultural unions. Rahu does not care about family expectations; it only cares about the intensity of the experience.',
            body_hi:  'राहु आधुनिक प्रेम विवाह के लिए सबसे महत्वपूर्ण ग्रह है। जब राहु 7वें भाव, 5वें भाव, या शुक्र पर प्रभाव डालता है, तो यह व्यक्ति को सामाजिक मानदंड तोड़ने के लिए प्रेरित करता है — यह अंतर-जाति और अंतर-धर्म विवाह का प्राथमिक संकेत है।',
          },
          {
            id:       'planet-jupiter',
            icon:     '🪐',
            label:    'Jupiter — The Ethical Anchor',
            label_hi: 'गुरु — नैतिक लंगर',
            body:     'Jupiter is the planet of traditional values. A very strong Jupiter influence on the 5th or 7th house can act against a love marriage — or ensure that it is conducted in a way that respects tradition. However, when Jupiter is in a sign ruled by a love-marriage-inducing planet, it can bridge the gap between romantic choice and family acceptance.',
            body_hi:  'गुरु परंपरागत मूल्यों का ग्रह है। 5वें या 7वें भाव पर मजबूत गुरु का प्रभाव प्रेम विवाह के विरुद्ध कार्य कर सकता है। हालांकि, जब गुरु प्रेम विवाह-प्रेरक ग्रह की राशि में हो, तो यह पारिवारिक स्वीकृति में पुल का काम कर सकता है।',
          },
          {
            id:       'planet-moon',
            icon:     '🌙',
            label:    'The Moon — The Emotional Compass',
            label_hi: 'चंद्रमा — भावनात्मक दिशासूचक',
            body:     'Never overlook the Moon. It rules the mind and emotions. For a love marriage to persist, there must be deep emotional compatibility. If the Moon is poorly placed or afflicted, the intense passion of a love marriage can quickly burn out, leading to instability over time.',
            body_hi:  'चंद्रमा को कभी नजरअंदाज न करें। यह मन और भावनाओं पर शासन करता है। प्रेम विवाह के टिके रहने के लिए गहरी भावनात्मक अनुकूलता आवश्यक है। पीड़ित चंद्रमा प्रेम विवाह की तीव्र भावनाओं को अस्थिर कर सकता है।',
          },
        ],
      },

      {
        id:       'love-marriage-yogas',
        title:    'Critical Love Marriage Yogas',
        title_hi: 'महत्वपूर्ण प्रेम विवाह योग',
        layout:   'checklist',
        items: [
          {
            id:       'yoga-gandharva',
            label:    'Gandharva Vivah Yoga',
            label_hi: 'गंधर्व विवाह योग',
            body:     'When the 5th lord and 7th lord are both strong and placed in a Kendra (angular house: 1st, 4th, 7th, 10th) or Trikona (trine: 1st, 5th, 9th) with benefic influence, this yoga supports a successful love marriage. It suggests the couple carries the karmic merit to sustain the union despite the challenges they face.',
            body_hi:  'जब पंचमेश और सप्तमेश दोनों मजबूत हों और शुभ प्रभाव के साथ केंद्र या त्रिकोण भाव में स्थित हों, तो यह सफल प्रेम विवाह का समर्थन करता है। यह दर्शाता है कि युगल में चुनौतियों के बावजूद मिलन को बनाए रखने का कार्मिक पुण्य है।',
          },
          {
            id:       'yoga-venus-rahu-mars',
            label:    'Venus-Rahu and Venus-Mars Conjunctions',
            label_hi: 'शुक्र-राहु और शुक्र-मंगल युति',
            body:     'These are the heaviest indicators of active love marriage pursuit. Venus-Rahu is the magnetic pull combination — unconventional, boundary-crossing attraction. Venus-Mars is the pursuit combination — the drive and courage to act on romantic desire. Both are almost always present when the love marriage was the result of a deliberate, active choice.',
            body_hi:  'ये सक्रिय प्रेम विवाह के सबसे मजबूत संकेत हैं। शुक्र-राहु चुंबकीय खिंचाव का संयोजन है। शुक्र-मंगल पीछा करने का संयोजन है। दोनों लगभग हमेशा उपस्थित होते हैं जब प्रेम विवाह एक जानबूझकर, सक्रिय चुनाव था।',
          },
          {
            id:       'yoga-navamsa',
            label:    '5th/7th Lord Connection in the Navamsa (D9)',
            label_hi: 'नवांश (D9) में पंचमेश/सप्तमेश संबंध',
            body:     'The Rashi (D1) chart shows the potential; the Navamsa (D9) shows the actualized union. If the 5th-7th link is weak in the Rashi chart but strong in the Navamsa, the person will likely end up in a love-based union even if it seemed unlikely earlier in life. The Navamsa is the ultimate validator of whether love-marriage potential actually manifests.',
            body_hi:  'राशि कुंडली संभावना दिखाती है; नवांश वास्तविक विवाह दिखाता है। यदि राशि कुंडली में 5वें-7वें का संबंध कमजोर है लेकिन नवांश में मजबूत है, तो व्यक्ति प्रेम-आधारित विवाह में समाप्त हो सकता है।',
          },
        ],
      },

      {
        id:       'obstacles',
        title:    'The Obstacles: Opposition and Tension',
        title_hi: 'बाधाएं: विरोध और तनाव',
        layout:   'checklist',
        items: [
          {
            id:       'obstacle-saturn-ketu',
            label:    'Saturn or Ketu Afflicting the 9th or 10th House',
            label_hi: 'शनि या केतु का 9वें/10वें भाव पर पीड़न',
            body:     'Opposition to a love marriage usually stems from conflict with the 9th house (father, religion) or 10th house (society, status). If Saturn or Ketu severely afflicts the 9th lord or 10th lord, the family will likely struggle to accept the chosen partner — creating the classic "family opposition" scenario.',
            body_hi:  'प्रेम विवाह के विरोध की उत्पत्ति सामान्यतः 9वें भाव (पिता, धर्म) या 10वें भाव (समाज, प्रतिष्ठा) से होती है। यदि शनि या केतु इन भावों को गंभीर रूप से पीड़ित करे, तो परिवार चुने गए साथी को स्वीकार करने में संघर्ष करेगा।',
          },
          {
            id:       'obstacle-sun-rahu',
            label:    'The Sun-Rahu Affliction',
            label_hi: 'सूर्य-राहु पीड़न',
            body:     'The Sun represents the father and authority. If Rahu sits with or aspects the Sun or the 9th lord, there is almost always significant tension with the father regarding the marriage choice. This combination indicates that the individual must navigate a genuine conflict between their romantic agency and paternal authority.',
            body_hi:  'सूर्य पिता और अधिकार का प्रतिनिधित्व करता है। यदि राहु सूर्य या 9वें स्वामी के साथ बैठे या उन्हें देखे, तो विवाह के बारे में पिता के साथ महत्वपूर्ण तनाव लगभग हमेशा होता है।',
          },
          {
            id:       'obstacle-inter-caste',
            label:    'Inter-Caste and Inter-Religion Indications',
            label_hi: 'अंतर-जाति और अंतर-धर्म संकेत',
            body:     'Inter-caste or inter-religion unions are almost exclusively the domain of Rahu. When Rahu forms a relationship with the 7th house, the 7th lord, or Venus, the "otherness" of the partner is highlighted — the partner may be from a different background, culture, or faith. Rahu does not respect the social categories that define traditional alliances.',
            body_hi:  'अंतर-जाति या अंतर-धर्म विवाह लगभग विशेष रूप से राहु के क्षेत्र में आते हैं। जब राहु 7वें भाव, 7वें स्वामी, या शुक्र से संबंध बनाता है, तो साथी की "भिन्नता" उजागर होती है।',
          },
        ],
      },

      {
        id:       'practical-guidance',
        title:    'Practical Guidance for Analyzing Your Chart',
        title_hi: 'अपनी कुंडली का विश्लेषण करने के लिए व्यावहारिक मार्गदर्शन',
        layout:   'checklist',
        items: [
          {
            id:       'guidance-map-connection',
            label:    'Step 1: Map the 5th-7th Connection',
            label_hi: 'चरण 1: पंचम-सप्तम संबंध मानचित्रण',
            body:     'Is there a clear link between your 5th and 7th house lords — through conjunction, exchange, or mutual aspect? If not visible in the Rashi chart, check the Navamsa. The absence of this link in both charts significantly weakens the love-marriage tendency.',
            body_hi:  'क्या आपके पंचमेश और सप्तमेश के बीच एक स्पष्ट कड़ी है — युति, विनिमय, या परस्पर दृष्टि के माध्यम से? यदि राशि कुंडली में स्पष्ट नहीं है, तो नवांश कुंडली देखें।',
          },
          {
            id:       'guidance-rahu',
            label:    "Step 2: Evaluate Rahu's Position",
            label_hi: 'चरण 2: राहु की स्थिति का मूल्यांकन',
            body:     "Where is Rahu placed, and does it aspect your Venus, 5th lord, or 7th lord? Rahu's involvement is the biggest indicator of breaking social conventions in marriage — including cross-cultural or cross-community unions. Note which house it occupies and which planets it influences.",
            body_hi:  'राहु कहाँ स्थित है, और क्या वह शुक्र, पंचमेश या सप्तमेश को देखता है? राहु की संलिप्तता विवाह में सामाजिक परंपराओं को तोड़ने का सबसे बड़ा संकेतक है।',
          },
          {
            id:       'guidance-strength',
            label:    "Step 3: Check the 5th Lord's Strength",
            label_hi: 'चरण 3: पंचमेश की शक्ति जाँचें',
            body:     'Is the 5th lord powerful? A weak 5th lord may produce intense attractions that never actualize into marriage. The attraction exists but lacks the structural energy to reach the 7th house and become a formal union. Combust, debilitated, or highly afflicted 5th lords frequently indicate this pattern.',
            body_hi:  'क्या पंचमेश शक्तिशाली है? कमजोर पंचमेश तीव्र आकर्षण पैदा कर सकता है जो कभी विवाह में नहीं बदलता। दग्ध, नीच, या अत्यधिक पीड़ित पंचमेश अक्सर इस पैटर्न का संकेत देते हैं।',
          },
          {
            id:       'guidance-benefic',
            label:    'Step 4: Look for Benefic Support',
            label_hi: 'चरण 4: शुभ ग्रह समर्थन खोजें',
            body:     'Are there benefic planets (Jupiter or Venus) supporting the love-marriage combinations? The presence of benefics determines whether the love marriage will be relatively smooth or turbulent. Malefic-heavy love-marriage charts often indicate intense opposition, public scrutiny, or a difficult path to family acceptance.',
            body_hi:  'क्या शुभ ग्रह (गुरु या शुक्र) प्रेम विवाह के संयोजनों का समर्थन कर रहे हैं? शुभ ग्रहों की उपस्थिति निर्धारित करती है कि प्रेम विवाह अपेक्षाकृत सहज होगा या कठिन।',
          },
        ],
      },

      {
        id:       'misconceptions',
        title:    'Common Misconceptions',
        title_hi: 'सामान्य भ्रांतियाँ',
        layout:   'checklist',
        items: [
          {
            id:       'myth-no-love-chart',
            label:    "Myth: My chart doesn't show love marriage",
            label_hi: 'मिथक: मेरी कुंडली में प्रेम विवाह नहीं दिखता',
            body:     'Many believe they have a "guaranteed arranged marriage" chart. That is a misunderstanding. Most charts indicate a tendency, not a fixed outcome. In the modern world, the choice is ultimately yours — the chart shows which path has karmic ease and which requires more effort to navigate.',
            body_hi:  'बहुत से लोग मानते हैं कि उनकी कुंडली में "अरेंज्ड विवाह की गारंटी" है। यह गलतफहमी है। अधिकांश कुंडलियाँ एक प्रवृत्ति दर्शाती हैं, कोई निश्चित परिणाम नहीं।',
          },
          {
            id:       'myth-love-better',
            label:    'Myth: Love marriage is always better',
            label_hi: 'मिथक: प्रेम विवाह हमेशा बेहतर होता है',
            body:     "Astrology does not judge the quality of happiness. A love marriage can be just as difficult, or as blissful, as an arranged one. The chart simply describes the nature and origin of the union — success in marriage is determined by the Moon's placement (emotional maturity) and the Navamsa's strength (sustainability of the bond).",
            body_hi:  'ज्योतिष खुशी की गुणवत्ता का निर्णय नहीं करता। एक प्रेम विवाह एक अरेंज्ड विवाह जितना कठिन या आनंदमय हो सकता है। विवाह की सफलता चंद्रमा की स्थिति और नवांश की शक्ति से निर्धारित होती है।',
          },
          {
            id:       'myth-rahu-disaster',
            label:    'Myth: Rahu combinations mean disaster',
            label_hi: 'मिथक: राहु के संयोजन विपदा का संकेत हैं',
            body:     'Rahu means unconventional — not destructive. It can lead to an incredibly exciting and rewarding partnership when both individuals are prepared to handle the unconventional aspects of their life together. The key is awareness: understanding that Rahu-driven attractions operate outside ordinary social scripts, and planning accordingly.',
            body_hi:  'राहु का अर्थ अपरंपरागत है — विनाशकारी नहीं। यह एक अविश्वसनीय रूप से रोमांचक और पुरस्कृत साझेदारी का कारण बन सकता है जब दोनों व्यक्ति अपने जीवन के अपरंपरागत पहलुओं को संभालने के लिए तैयार हों।',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Frequently Asked Questions',
        title_hi: 'अक्सर पूछे जाने वाले प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-arranged-to-love',
            label:    'Can a person with an arranged marriage chart have a love marriage?',
            label_hi: 'क्या अरेंज्ड मैरिज कुंडली वाला व्यक्ति प्रेम विवाह कर सकता है?',
            body:     'Absolutely. Astrology describes tendencies and karmic ease, not fixed outcomes. A person with an "arranged" chart can choose to follow their heart — they may simply face more hurdles or find that the journey to that union is more unconventional than those with "love" charts.',
            body_hi:  'बिल्कुल। ज्योतिष प्रवृत्तियों का वर्णन करता है, निश्चित परिणामों का नहीं। "अरेंज्ड" कुंडली वाला व्यक्ति अपने दिल की सुन सकता है — उन्हें केवल अधिक बाधाओं का सामना करना पड़ सकता है।',
          },
          {
            id:       'faq-rahu-necessary',
            label:    'Is Rahu necessary for a love marriage?',
            label_hi: 'क्या प्रेम विवाह के लिए राहु आवश्यक है?',
            body:     'Not necessary, but very common in the modern context. Rahu breaks rules, and love marriage is often a rule-breaking event. Without Rahu, love marriages tend to be more traditional or conform more closely to societal standards — closer to a consensual arranged marriage in practice.',
            body_hi:  'आवश्यक नहीं, लेकिन आधुनिक संदर्भ में बहुत सामान्य। राहु नियम तोड़ता है, और प्रेम विवाह अक्सर एक नियम-तोड़ने वाली घटना है। राहु के बिना, प्रेम विवाह अधिक पारंपरिक होते हैं।',
          },
          {
            id:       'faq-no-5th-7th-link',
            label:    'What if my 5th and 7th houses have no connection?',
            label_hi: 'क्या होगा यदि मेरे पंचम और सप्तम भाव का कोई संबंध नहीं है?',
            body:     'Then the love-marriage tendency is weak. You might still have a love marriage, but it may occur later in life, or the decision may be heavily influenced by family circumstances — making it a hybrid between love and arranged, where emotional connection exists but family structures guide the process.',
            body_hi:  'तो प्रेम विवाह की प्रवृत्ति कमजोर है। आप फिर भी प्रेम विवाह कर सकते हैं, लेकिन यह बाद में हो सकता है, या परिवार की परिस्थितियों से भारी प्रभावित हो सकता है।',
          },
          {
            id:       'faq-love-inter-caste',
            label:    'Does a love marriage always involve inter-caste or inter-religion?',
            label_hi: 'क्या प्रेम विवाह में हमेशा अंतर-जाति या अंतर-धर्म शामिल होता है?',
            body:     'No. But because love marriages often break societal norms, the Rahu influence that facilitates such unions is frequently present. A love marriage within the same community is entirely possible — in that case, Rahu may be less prominent while the Venus-Mars link or the 5th-7th connection does the work.',
            body_hi:  'नहीं। लेकिन चूंकि प्रेम विवाह अक्सर सामाजिक मानदंड तोड़ते हैं, इसलिए राहु प्रभाव अक्सर मौजूद होता है। एक ही समुदाय में प्रेम विवाह पूरी तरह संभव है — उस स्थिति में शुक्र-मंगल या पंचम-सप्तम कड़ी यह काम करती है।',
          },
          {
            id:       'faq-remedies',
            label:    'Can planetary remedies ensure a love marriage?',
            label_hi: 'क्या ग्रह उपाय प्रेम विवाह सुनिश्चित कर सकते हैं?',
            body:     'No. Remedies cannot force another person to love you or compel your family to agree. Remedies are tools to help manage planetary energy — bringing clarity, patience, and balance to your own decisions. They support your inner state; they do not rewrite external events.',
            body_hi:  'नहीं। उपाय किसी अन्य व्यक्ति को आपसे प्यार करने के लिए मजबूर नहीं कर सकते या आपके परिवार को सहमत होने के लिए बाध्य नहीं कर सकते। उपाय आपकी आंतरिक स्थिति का समर्थन करते हैं; वे बाहरी घटनाओं को नहीं बदलते।',
          },
          {
            id:       'faq-infatuation-vs-love',
            label:    'What is the difference between infatuation and love marriage in astrology?',
            label_hi: 'ज्योतिष में आकर्षण और प्रेम विवाह में क्या अंतर है?',
            body:     'Infatuation is often driven by intense, transient transits or the activation of the 5th house without a lasting connection to the 7th house or the Navamsa. True love-marriage indicators involve a firm, long-term anchoring of 5th house energy into the 7th — the passion finds a formal, committed destination.',
            body_hi:  'आकर्षण अक्सर क्षणिक गोचर या नवांश/7वें भाव से स्थायी संबंध के बिना 5वें भाव की सक्रियता से संचालित होता है। सच्चे प्रेम विवाह के संकेतों में 5वें भाव की ऊर्जा का 7वें भाव में दीर्घकालिक लंगर शामिल है।',
          },
          {
            id:       'faq-family-opposition',
            label:    'Why does my family oppose my love marriage?',
            label_hi: 'मेरा परिवार मेरे प्रेम विवाह का विरोध क्यों करता है?',
            body:     'Look for afflictions to your 9th house (father, tradition, religion) and 10th house (social status, duty). These houses are the traditional guardians of matrimonial alliances. When they conflict with your 5th and 7th house energy, opposition is an astrological expectation — not a personal failure or a signal to give up.',
            body_hi:  '9वें भाव (पिता, परंपरा) और 10वें भाव (सामाजिक प्रतिष्ठा) में पीड़न देखें। जब ये आपके 5वें और 7वें भाव की ऊर्जा से टकराते हैं, तो विरोध एक ज्योतिषीय अपेक्षा है — व्यक्तिगत विफलता नहीं।',
          },
          {
            id:       'faq-dasha-love-marriage',
            label:    'Does the Dasha system determine love marriage?',
            label_hi: 'क्या दशा प्रणाली प्रेम विवाह निर्धारित करती है?',
            body:     'The Dasha determines the time when the opportunity arises. It cannot convert an arranged-marriage chart into a love-marriage chart — it can only manifest the potential already present in the natal chart. A strong love-marriage chart in the wrong Dasha will not produce the event until the correct Dasha activates.',
            body_hi:  'दशा वह समय निर्धारित करती है जब अवसर आता है। यह एक अरेंज्ड-मैरिज कुंडली को प्रेम-विवाह कुंडली में नहीं बदल सकती — यह केवल जन्म कुंडली में मौजूद संभावना को प्रकट कर सकती है।',
          },
          {
            id:       'faq-love-vs-arranged-success',
            label:    'Are love marriages more successful than arranged ones?',
            label_hi: 'क्या प्रेम विवाह अरेंज्ड विवाह से अधिक सफल होते हैं?',
            body:     "Astrology does not make this distinction. Success in marriage is determined by the emotional maturity of the individuals (Moon placement) and the sustainability of the union (Navamsa chart strength), not by how the couple met. Both paths carry equal potential for fulfillment and difficulty.",
            body_hi:  'ज्योतिष यह भेद नहीं करता। विवाह में सफलता भावनात्मक परिपक्वता (चंद्रमा की स्थिति) और मिलन की स्थिरता (नवांश कुंडली) से निर्धारित होती है — युगल कैसे मिले, इससे नहीं।',
          },
          {
            id:       'faq-success-indicators',
            label:    'Can I see the success of a love marriage in the chart?',
            label_hi: 'क्या मैं कुंडली में प्रेम विवाह की सफलता देख सकता हूं?',
            body:     'Yes. A love marriage that will endure shows strong benefic influences (Jupiter or Venus) on the link between the 5th and 7th houses, and a solid, stable Navamsa chart. Heavy malefic afflictions (Rahu, Saturn, Mars) on those same points indicate a turbulent path — intense but requiring significant sustained effort.',
            body_hi:  'हाँ। एक टिकाऊ प्रेम विवाह 5वें और 7वें भाव के बीच की कड़ी पर मजबूत शुभ प्रभाव (गुरु या शुक्र) और एक ठोस नवांश कुंडली दिखाता है। उन्हीं बिंदुओं पर भारी पापी पीड़न एक उथल-पुथल भरे मार्ग का संकेत देती है।',
          },
        ],
      },

    ],
    ctas: [],
  },

  aiMetadata: {
    searchIntent:   'informational',
    difficulty:     'beginner',
    authorityLevel: 'standard',
  },

  schemaSignals: {
    expertise: 'Authored by experienced Vedic astrologers specializing in love marriage indicators, the 5th-7th house dynamic, Venus-Rahu-Mars combinations, and Gandharva Vivah yogas.',
  },

  authority: {
    reviewStatus:   'not-reviewed',
    contentVersion: 1,
  },

  publishing: {
    isIndexable:     false,
    isSearchEnabled: false,
    visibility:      'private',
  },

}
