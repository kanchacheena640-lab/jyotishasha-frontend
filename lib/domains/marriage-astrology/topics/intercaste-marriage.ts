import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const intercasteMarriage: DomainTopic = {

  identity: {
    id:         'marriage-astrology:intercaste-marriage',
    slug:       'intercaste-marriage',
    title:      'Intercaste Marriage in Vedic Astrology: Karmic Analysis',
    title_hi:   'वैदिक ज्योतिष में अंतरजातीय विवाह: एक कार्मिक विश्लेषण',
    domain:     'astrology',
    subdomain:  'marriage-astrology',
    category:   'marriage',
    entityType: 'concept',
    status:     'draft',
  },

  routing: {
    canonicalPath: '/marriage-astrology/intercaste-marriage',
    breadcrumbs: [
      { label: 'Home',                  label_hi: 'होम',           href: '/' },
      { label: 'Marriage Astrology',    label_hi: 'विवाह ज्योतिष', href: '/marriage-astrology' },
      { label: 'Intercaste Marriage',   label_hi: 'अंतरजातीय विवाह',  href: '/marriage-astrology/intercaste-marriage' },
    ],
  },

  seo: {
    metaTitle:       'Intercaste Marriage in Vedic Astrology: Karmic Timing and Analysis',
    metaDescription: 'Understand the astrological promise of intercaste marriage in Vedic Astrology. Explore planetary influences, house analysis, and karmic timing.',
    metaDescription_hi: 'वैदिक ज्योतिष में अंतरजातीय विवाह के संकेत — सप्तम, पंचम और नवम भाव, राहु-केतु, शुक्र, नवांश और दशा। जानें कौन-से योग परंपरा से अलग विवाह से जुड़े माने जाते हैं, और ज्योतिष क्या नहीं बता सकता।',
    robots:          'noindex,follow',
  },

  hero: {
    headline:    'Intercaste Marriage in Vedic Astrology',
    headline_hi: 'वैदिक ज्योतिष में अंतरजातीय विवाह',
    subtext:     'Analyze the karmic promise, planetary conditions, and traditional Vedic framework for intercaste unions.',
    subtext_hi:  'अंतरजातीय विवाह से जुड़े कार्मिक संकेतों, ग्रह स्थितियों और पारंपरिक वैदिक दृष्टिकोण का विश्लेषण करें।',
  },

  taxonomy: {
    tags:        ['vedic-astrology', 'marriage-astrology', 'intercaste-marriage', 'karmic-astrology'],
    keywords:    ['intercaste marriage in vedic astrology', 'astrology of marriage', 'unconventional marriage astrology', 'marriage and dharma', '9th house astrology'],
    keywords_hi: ['वैदिक ज्योतिष में अंतरजातीय विवाह', 'विवाह का ज्योतिष', 'अपरंपरागत विवाह ज्योतिष', 'विवाह और धर्म', 'नौवां घर ज्योतिष'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks:   [
      {
        id: 'what-is-intercaste-marriage',
        title: 'What is Intercaste Marriage in Vedic Astrology?',
        title_hi: 'वैदिक ज्योतिष में अंतरजातीय विवाह क्या है?',
        layout: 'list',
        items: [
          {
            id: 'introduction',
            label: 'Introduction',
            label_hi: 'परिचय',
            body: 'In the foundational framework of Vedic Astrology, marriage—known as Vivaha—is considered the most critical Sanskara (rite of passage) for an individual, serving as the bridge between the pursuit of Dharma (duty) and the experience of worldly life. When we analyze the concept of intercaste marriage, we are essentially looking at how the individual’s natal potential for partnership intersects with their social and cultural environment. In the traditional Vedic worldview, the social order was deeply intertwined with the 9th house, which governs Dharma, ancestral traditions, and social duty. Consequently, an intercaste union is read as a divergence from the conventional expectations of the 9th house, and astrologers explore how an individual’s own karmic needs may outweigh ancestral expectations. For the serious practitioner of Jyotish, an intercaste marriage is not an anomaly to be feared; it is usually read as a sign of karmic currents that encourage the expansion of one’s traditional boundaries, favouring personal agency and the exploration of new social or cultural experiences. This article examines the astrological configurations, timing indicators, and house interactions that are traditionally associated with an intercaste union in the Vedic system, and the interplay between karmic predisposition and the choices we make. It describes tendencies in a chart — a horoscope does not reveal anyone’s caste and does not decide whom a person will marry.',
            body_hi: 'वैदिक ज्योतिष में विवाह को व्यक्ति के जीवन का सबसे महत्वपूर्ण संस्कार माना जाता है, जो धर्म (कर्तव्य) और सांसारिक जीवन के बीच सेतु का काम करता है। अंतरजातीय विवाह का विश्लेषण करते समय हम मूल रूप से यह देखते हैं कि जीवनसाथी से जुड़ी व्यक्ति की जन्मजात प्रवृत्तियाँ उसके सामाजिक और सांस्कृतिक परिवेश से कैसे मेल खाती हैं या अलग होती हैं। पारंपरिक वैदिक दृष्टि में सामाजिक व्यवस्था का गहरा संबंध नवम भाव से माना गया है, जो धर्म, पैतृक परंपराओं और सामाजिक कर्तव्य का भाव है। इसलिए अंतरजातीय विवाह को नवम भाव की पारंपरिक अपेक्षाओं से हटकर चलने के रूप में पढ़ा जाता है, और ज्योतिषी यह देखते हैं कि व्यक्ति की अपनी कार्मिक आवश्यकताएँ पैतृक अपेक्षाओं पर कैसे भारी पड़ सकती हैं। गंभीर ज्योतिषी के लिए अंतरजातीय विवाह डरने की बात नहीं है; इसे आमतौर पर ऐसी कार्मिक धाराओं का संकेत माना जाता है जो पारंपरिक सीमाओं के विस्तार को प्रोत्साहित करती हैं — जिनमें व्यक्तिगत निर्णय और नए सामाजिक या सांस्कृतिक अनुभवों की ओर झुकाव होता है। यह लेख उन ज्योतिषीय योगों, समय के संकेतों और भावों के आपसी संबंधों का विश्लेषण करता है जिन्हें परंपरागत रूप से अंतरजातीय विवाह से जोड़ा जाता है, और यह भी देखता है कि कार्मिक प्रवृत्ति और हमारे अपने निर्णय एक-दूसरे को कैसे प्रभावित करते हैं। यह कुंडली की प्रवृत्तियों का वर्णन है — जन्मकुंडली किसी की जाति नहीं बताती और यह तय नहीं करती कि व्यक्ति किससे विवाह करेगा।'
          },
          {
            id: 'definition',
            label: 'Defining Intercaste Marriage',
            label_hi: 'अंतरजातीय विवाह का अर्थ',
            body: 'In traditional Vedic thought, caste or social lineage is seen as a component of an individual\'s Desha-Kaala-Patra (the specific place, time, and role into which they are born). Marriage within one\'s own lineage was traditionally prescribed to maintain the Samskaras and social order represented by the 9th house. An intercaste marriage, therefore, is any union where the partners belong to different cultural, social, or traditional lineages, creating a dynamic that departs from the conventional 9th house expectations of sameness and continuity. Astrologically, intercaste marriage is traditionally associated with planetary influences that weaken the "sameness" principle of the 9th house in favor of the "individual choice" principle of the 5th and 7th houses. It is a union in which the individual\'s karmic need for growth—often linked with Rahu or Ketu—may outweigh established social or ancestral expectations. The complexity of these unions lies in the tension between the native\'s innate need for a specific type of soul-level partnership and the expectations of their heritage. Astrologers read this divergence not as an error but as part of the soul\'s growth.',
            body_hi: 'पारंपरिक वैदिक विचार में जाति या सामाजिक वंश को व्यक्ति के देश-काल-पात्र (जन्म का स्थान, समय और भूमिका) का एक हिस्सा माना गया है। नवम भाव से जुड़े संस्कारों और सामाजिक व्यवस्था को बनाए रखने के लिए परंपरागत रूप से अपने ही वंश में विवाह का विधान था। इसलिए अंतरजातीय विवाह वह विवाह है जिसमें दोनों साथी अलग-अलग सांस्कृतिक, सामाजिक या पारंपरिक पृष्ठभूमि से आते हैं, और यह नवम भाव की समानता और निरंतरता की पारंपरिक अपेक्षा से अलग राह है। ज्योतिष में अंतरजातीय विवाह को परंपरागत रूप से ऐसे ग्रह प्रभावों से जोड़ा जाता है जो नवम भाव के "समानता" के सिद्धांत को कमज़ोर करते हैं और पंचम व सप्तम भाव के "व्यक्तिगत चुनाव" के सिद्धांत को आगे रखते हैं। इसमें व्यक्ति की विकास की कार्मिक आवश्यकता — जो अक्सर राहु या केतु से जुड़ी होती है — स्थापित सामाजिक या पैतृक अपेक्षाओं पर भारी पड़ सकती है। ऐसे विवाहों की जटिलता इस बात में है कि व्यक्ति की एक विशेष प्रकार के आत्मिक संबंध की सहज आवश्यकता और उसकी विरासत की अपेक्षाओं के बीच तनाव रहता है। ज्योतिषी इस अलग राह को कोई ज्योतिषीय भूल नहीं, बल्कि आत्मा के विकास का हिस्सा मानते हैं।'
          }
        ]
      },
      {
        id: 'astrological-promise-vs-reality',
        title: 'Astrological Promise vs Reality',
        title_hi: 'कुंडली के योग बनाम वास्तविकता',
        layout: 'list',
        items: [
          {
            id: 'promise-nature',
            label: 'Understanding Promise',
            label_hi: 'कुंडली के संकेतों को समझना',
            body: 'A common pitfall in astrological analysis is the confusion between the potential for a marriage and the manifestation of that marriage. Every chart provides a baseline karmic potential. A chart may possess strong indicators for an unconventional partnership (like a connection between Rahu and the 7th lord), but whether this leads to an intercaste marriage depends on the native\'s Dasha-Bhukti sequence and their own environment. The "promise" in the chart is a set of tendencies toward unconventionality. The "reality" of the marriage is the intersection of that potential with the individual\'s free will and societal circumstances. Many individuals have charts showing a potential for intercaste unions but marry within their own social circle because their environment, upbringing, or Dasha timing favored traditional norms. Conversely, some individuals with traditional charts marry outside their caste due to specific, intense transit triggers that occur at a pivotal moment in their lives. The astrologer must distinguish between the inner potential for unconventionality and the external event of marriage. This distinction is crucial for both the astrologer and the client: potential is karmic; manifestation is situational.',
            body_hi: 'ज्योतिषीय विश्लेषण में एक आम भूल विवाह की संभावना और उसके वास्तव में घटित होने को एक मान लेना है। हर कुंडली एक आधारभूत कार्मिक संभावना दिखाती है। किसी कुंडली में अपरंपरागत साझेदारी के मज़बूत संकेत हो सकते हैं (जैसे राहु और सप्तमेश का संबंध), लेकिन इससे अंतरजातीय विवाह होगा या नहीं, यह जातक की दशा-भुक्ति और उसके अपने परिवेश पर निर्भर करता है। कुंडली में दिखने वाला योग अपरंपरागत झुकाव की प्रवृत्तियों का एक समूह है। विवाह की "वास्तविकता" इन संभावनाओं, व्यक्ति की अपनी इच्छा और सामाजिक परिस्थितियों के मेल से बनती है। कई लोगों की कुंडली में अंतरजातीय विवाह की संभावना होती है, फिर भी वे अपने ही सामाजिक दायरे में विवाह करते हैं, क्योंकि उनका परिवेश, परवरिश या दशा-काल परंपरा के पक्ष में रहा। इसके विपरीत, पारंपरिक कुंडली वाले कुछ लोग जीवन के किसी निर्णायक मोड़ पर विशेष और तीव्र गोचर के समय अपनी जाति से बाहर विवाह करते हैं। ज्योतिषी को अपरंपरागत झुकाव की आंतरिक संभावना और विवाह की बाहरी घटना में अंतर करना चाहिए। यह भेद ज्योतिषी और जातक दोनों के लिए महत्वपूर्ण है: संभावना कार्मिक है; घटना परिस्थितियों पर निर्भर है।'
          }
        ]
      },
      {
        id: 'key-house-analysis',
        title: 'Key House Analysis',
        title_hi: 'प्रमुख भाव विश्लेषण',
        layout: 'accordion',
        items: [
          {
            id: '2nd-house',
            label: '2nd House',
            label_hi: 'दूसरा भाव',
            body: 'The 2nd house represents the Kutumba (family unit). It is the house that sustains the marital structure after the union. In the context of intercaste marriages, the 2nd house is where astrologers look for family-related tension. If the 2nd lord is afflicted by malefic planets, or if it has a difficult relationship with the 7th house, the chart may indicate friction with family over the choice of partner. Astrologers link this to the 2nd house’s role in maintaining the lineage — a role the family may feel is challenged by an intercaste union. How a particular family actually responds, however, depends on the people involved, not on the chart alone.',
            body_hi: 'द्वितीय भाव कुटुंब (परिवार) का भाव है। विवाह के बाद पारिवारिक ढांचे को संभालने वाला भाव यही है। अंतरजातीय विवाह के संदर्भ में ज्योतिषी पारिवारिक तनाव के संकेत मुख्य रूप से इसी भाव में देखते हैं। यदि द्वितीयेश पाप ग्रहों से पीड़ित हो, या उसका सप्तम भाव से कठिन संबंध हो, तो कुंडली साथी के चुनाव को लेकर परिवार से मतभेद का संकेत दे सकती है। ज्योतिषी इसे द्वितीय भाव की वंश-परंपरा बनाए रखने की भूमिका से जोड़ते हैं — एक भूमिका जिसे परिवार अंतरजातीय विवाह से चुनौती महसूस कर सकता है। लेकिन कोई विशेष परिवार वास्तव में कैसी प्रतिक्रिया देगा, यह उन लोगों पर निर्भर करता है, केवल कुंडली पर नहीं।'
          },
          {
            id: '5th-house',
            label: '5th House',
            label_hi: 'पांचवां भाव',
            body: 'The 5th house governs Purva Punya (past-life merit) and, crucially, personal romantic choice. A strong 5th house, connected to the 7th house, suggests that the native’s personal desire for a specific partner may hold more weight than family or social pressure. When the 5th house is dominant, the native is more likely to pursue their internal compass than external mandate. The 5th house is the house of Prema, or love, which often disregards social stratification in favor of soulful resonance.',
            body_hi: 'पंचम भाव पूर्व पुण्य और व्यक्तिगत प्रेम-चुनाव का भाव है। सप्तम भाव से जुड़ा मज़बूत पंचम भाव बताता है कि किसी विशेष साथी के लिए जातक की अपनी इच्छा पारिवारिक या सामाजिक दबाव से अधिक महत्व रख सकती है। जब पंचम भाव प्रबल हो, तो जातक बाहरी अपेक्षाओं के बजाय अपने मन की आवाज़ के अनुसार चलने की अधिक संभावना रखता है। पंचम भाव प्रेम का भाव है, जो अक्सर सामाजिक भेदों से ऊपर उठकर आत्मिक जुड़ाव को महत्व देता है।'
          },
          {
            id: '7th-house',
            label: '7th House',
            label_hi: 'सातवां भाव',
            body: 'The 7th house is the primary seat of the partner. In charts associated with an unconventional marriage, astrologers usually find an active 7th house that receives influence from planets traditionally linked with divergence from norms (usually Rahu or Ketu). The strength of the 7th house lord, its dispositor, and its connection to the 9th house are important. If the 7th lord is connected to the 9th lord in a way that suggests tension (such as through a malefic aspect), it can strengthen the indication of an unconventional union, suggesting that the choice of partner may differ from ancestral tradition.',
            body_hi: 'सप्तम भाव जीवनसाथी का मुख्य भाव है। अपरंपरागत विवाह से जुड़ी कुंडलियों में ज्योतिषी आमतौर पर सक्रिय सप्तम भाव देखते हैं, जिस पर ऐसे ग्रहों का प्रभाव हो जिन्हें परंपरागत रूप से लीक से हटने से जोड़ा जाता है (आमतौर पर राहु या केतु)। सप्तमेश की शक्ति, उसका राशि स्वामी और नवम भाव से उसका संबंध महत्वपूर्ण हैं। यदि सप्तमेश का नवमेश से ऐसा संबंध हो जो तनाव दर्शाए (जैसे पाप ग्रह की दृष्टि), तो यह अपरंपरागत विवाह के संकेत को और मज़बूत कर सकता है — यानी साथी का चुनाव पैतृक परंपरा से अलग हो सकता है।'
          },
          {
            id: '8th-house',
            label: '8th House',
            label_hi: 'आठवां भाव',
            body: 'The 8th house governs transformation and the hidden side of marital life. Intercaste marriages can involve significant cultural or lifestyle adjustment for the native, which astrologers associate with the 8th house. If the 8th house is active around the time of marriage, the native may experience significant life changes. This transformation can be emotionally demanding, as it may involve leaving behind old habits and ways of living, and calls for a deep process of adaptation from both partners.',
            body_hi: 'अष्टम भाव परिवर्तन और वैवाहिक जीवन के छिपे पहलुओं का भाव है। अंतरजातीय विवाह में जातक को अक्सर बड़े सांस्कृतिक या जीवनशैली संबंधी बदलावों से गुज़रना पड़ता है, जिन्हें ज्योतिषी अष्टम भाव से जोड़ते हैं। यदि विवाह के समय अष्टम भाव सक्रिय हो, तो जीवन में बड़े बदलाव आ सकते हैं। यह परिवर्तन भावनात्मक रूप से थकाने वाला हो सकता है, क्योंकि इसमें पुरानी आदतें और जीने के तरीके पीछे छोड़ने पड़ सकते हैं, और दोनों साथियों को गहराई से एक-दूसरे के अनुरूप ढलना पड़ता है।'
          },
          {
            id: '9th-house',
            label: '9th House',
            label_hi: 'नौवां भाव',
            body: 'The 9th house is the anchor of tradition. It represents ancestral lineage, family tradition and the customs of one’s community — though it does not reveal a person’s caste. In charts associated with intercaste unions, the 9th house is often less connected to the 7th house, or its lord is weaker, which astrologers read as more freedom to step outside the expected social circle. A strong, well-connected 9th house tends to favour marriage within the familiar community, although personal choice and circumstances still play a large part. This house represents the community’s "rulebook"; when its influence over the 7th house is weaker, the chart is read as leaving more room for personal choice.',
            body_hi: 'नवम भाव परंपरा का आधार है। यह पैतृक वंश, पारिवारिक परंपरा और समुदाय के रीति-रिवाजों का भाव है — हालांकि यह किसी व्यक्ति की जाति नहीं बताता। अंतरजातीय विवाह से जुड़ी कुंडलियों में अक्सर नवम भाव का सप्तम भाव से संबंध कम होता है या नवमेश कमज़ोर होता है, जिसे ज्योतिषी तय सामाजिक दायरे से बाहर कदम रखने की अधिक स्वतंत्रता के रूप में पढ़ते हैं। मज़बूत और सप्तम से जुड़ा नवम भाव परिचित समुदाय में विवाह की ओर झुकाव दिखाता है, फिर भी व्यक्तिगत चुनाव और परिस्थितियाँ बड़ी भूमिका निभाती हैं। यह भाव समुदाय की "नियम-पुस्तिका" जैसा है; जब सप्तम भाव पर इसका प्रभाव कम हो, तो कुंडली में व्यक्तिगत चुनाव के लिए अधिक जगह मानी जाती है।'
          },
          {
            id: '11th-house',
            label: '11th House',
            label_hi: 'ग्यारहवां भाव',
            body: 'The 11th house is the house of fulfilled desires. When the 11th house lord connects with the 5th or 7th house, it is read as giving the native the determination to follow through on their romantic choices, even when others disagree. This house acts as an accelerator, supporting the resources and energy needed to turn a choice into reality.',
            body_hi: 'एकादश भाव इच्छाओं की पूर्ति का भाव है। जब एकादशेश पंचम या सप्तम भाव से जुड़ता है, तो इसे जातक को अपने प्रेम-चुनाव पर टिके रहने का संकल्प देने वाला माना जाता है, भले ही दूसरे सहमत न हों। यह भाव गति देने वाले कारक की तरह काम करता है, जो किसी चुनाव को वास्तविकता में बदलने के लिए ज़रूरी साधन और ऊर्जा का समर्थन करता है।'
          }
        ]
      },
      {
        id: 'planetary-influences',
        title: 'Planetary Influences',
        title_hi: 'ग्रहों का प्रभाव',
        layout: 'accordion',
        items: [
          { id: 'sun', label: 'Sun', label_hi: 'सूर्य', body: 'The Sun represents the father, ancestors, and ego. An afflicted Sun in the chart suggests that the native may struggle with ancestral authority, making them more willing to ignore family dictates in their choice of partner. It signifies a person who seeks validation from within rather than from their father’s line, suggesting an independent ego structure that is not dependent on family prestige.', body_hi: 'सूर्य पिता, पूर्वजों और अहं का प्रतिनिधित्व करता है। कुंडली में पीड़ित सूर्य बताता है कि जातक को पैतृक अधिकार के साथ तालमेल बैठाने में कठिनाई हो सकती है, जिससे साथी के चुनाव में वह परिवार के निर्देशों को कम महत्व दे सकता है। यह ऐसे व्यक्ति को दर्शाता है जो अपनी पहचान पिता के वंश से नहीं, अपने भीतर से पाना चाहता है — उसका आत्मविश्वास पारिवारिक प्रतिष्ठा पर निर्भर नहीं होता।' },
          { id: 'moon', label: 'Moon', label_hi: 'चंद्र', body: 'The Moon is the mind and emotional comfort. An afflicted Moon often points toward a native who feels alienated from their own cultural community, finding more emotional comfort in the unfamiliar. Their emotional security is not tethered to their caste, but to their personal resonance with another person, which makes the prospect of an intercaste union emotionally liberating.', body_hi: 'चंद्रमा मन और भावनात्मक सुरक्षा का कारक है। पीड़ित चंद्रमा अक्सर ऐसे जातक की ओर इशारा करता है जो अपने ही सांस्कृतिक समुदाय से कुछ दूरी महसूस करता है और अपरिचित माहौल में अधिक सहज होता है। उसकी भावनात्मक सुरक्षा जाति से नहीं, बल्कि किसी दूसरे व्यक्ति के साथ आत्मीय जुड़ाव से बंधी होती है, इसलिए अंतरजातीय विवाह का विचार उसे भावनात्मक रूप से मुक्त करने वाला लग सकता है।' },
          { id: 'mars', label: 'Mars', label_hi: 'मंगल', body: 'Mars is the planet of courage. Intercaste marriages often face significant social hurdles; Mars is read as the drive needed to face these hurdles calmly and firmly. A weak Mars may indicate that holding one’s ground under social pressure feels harder. A strong Mars gives the courage to stand by one’s choice in the face of family disapproval and helps the couple keep their resolve.', body_hi: 'मंगल साहस का ग्रह है। अंतरजातीय विवाहों में अक्सर बड़ी सामाजिक बाधाएँ आती हैं; मंगल को इनका शांति और दृढ़ता से सामना करने की ऊर्जा माना जाता है। कमज़ोर मंगल यह संकेत दे सकता है कि सामाजिक दबाव में अपनी बात पर टिके रहना कठिन लगे। मज़बूत मंगल परिवार की असहमति के बीच भी अपने निर्णय पर टिके रहने का साहस देता है और जोड़े का संकल्प बनाए रखने में मदद करता है।' },
          { id: 'mercury', label: 'Mercury', label_hi: 'बुध', body: 'Mercury is the planet of logic. It governs how the native rationalizes their choices to their family. A strong Mercury helps the native navigate the social complexities and communications required in an intercaste union. They can explain their choices as reasonable, even if those choices defy social norms, helping to mitigate the friction created by the union.', body_hi: 'बुध तर्क और संवाद का ग्रह है। यह बताता है कि जातक अपने निर्णय को परिवार के सामने कैसे समझाता है। मज़बूत बुध अंतरजातीय विवाह से जुड़ी सामाजिक जटिलताओं और बातचीत को समझदारी से संभालने में मदद करता है। ऐसे लोग अपने निर्णय को तर्कसंगत ढंग से रख पाते हैं, भले ही वह सामाजिक परंपराओं से अलग हो, और इससे होने वाले मतभेद कम करने में मदद मिलती है।' },
          { id: 'jupiter', label: 'Jupiter', label_hi: 'गुरु', body: 'Jupiter is the planet of traditional wisdom. When Jupiter is afflicted, the native may prioritize personal experience over the wisdom of their elders, facilitating a departure from traditional marriage norms. Jupiter’s role in an intercaste union often shifts from being a custodian of traditional dharma to a seeker of universal dharma, where the native realizes that wisdom exists outside their own cultural framework.', body_hi: 'गुरु पारंपरिक ज्ञान का ग्रह है। जब गुरु पीड़ित हो, तो जातक बड़ों की सीख से अधिक अपने अनुभव को महत्व दे सकता है, जिससे पारंपरिक विवाह की रीतियों से हटना आसान हो जाता है। अंतरजातीय विवाह में गुरु की भूमिका अक्सर पारंपरिक धर्म के संरक्षक से बदलकर सार्वभौमिक धर्म के खोजी की हो जाती है, जहाँ जातक समझता है कि ज्ञान अपने सांस्कृतिक दायरे के बाहर भी मौजूद है।' },
          { id: 'venus', label: 'Venus', label_hi: 'शुक्र', body: 'Venus is the Karaka of the partner. If Venus is connected to Rahu or placed in a dual-natured sign (like Gemini or Sagittarius), the native is often drawn to partners who are fundamentally different from themselves. They seek a partner who expands their experience of love beyond their own social reality, prioritizing the connection with the person over their societal background.', body_hi: 'शुक्र जीवनसाथी का कारक है। यदि शुक्र राहु से जुड़ा हो या द्विस्वभाव राशि (जैसे मिथुन या धनु) में हो, तो जातक अक्सर ऐसे साथियों की ओर आकर्षित होता है जो उससे मूल रूप से अलग हों। वह ऐसा साथी चाहता है जो उसके प्रेम के अनुभव को उसकी अपनी सामाजिक दुनिया से आगे ले जाए, और सामाजिक पृष्ठभूमि से अधिक व्यक्ति के साथ जुड़ाव को महत्व देता है।' },
          { id: 'saturn', label: 'Saturn', label_hi: 'शनि', body: 'Saturn represents the law and established structure. Saturn in the 7th house often brings long-term commitment, even if the marriage starts under unconventional circumstances or faces social friction. Saturn is read as giving the union the endurance to get through early family opposition, acting as a stabilizer that can strengthen the couple\'s bond through shared effort.', body_hi: 'शनि नियम और स्थापित व्यवस्था का प्रतिनिधित्व करता है। सप्तम भाव में शनि अक्सर दीर्घकालिक प्रतिबद्धता लाता है, भले ही विवाह अपरंपरागत परिस्थितियों में शुरू हो या सामाजिक मतभेदों का सामना करे। शनि को शुरुआती पारिवारिक विरोध से पार पाने की सहनशक्ति देने वाला माना जाता है — एक स्थिर करने वाली शक्ति, जो साझा प्रयास से जोड़े के बंधन को मज़बूत कर सकती है।' },
          { id: 'rahu', label: 'Rahu', label_hi: 'राहु', body: 'Rahu is the planet most traditionally associated with intercaste and cross-cultural unions. It represents obsession, the forbidden, and the desire to break out of established social boxes. Rahu in the 7th house is one of the most commonly cited indicators for such marriages — though it does not decide the outcome on its own — as it pushes the individual to seek the "forbidden fruit": that which lies outside their karmic comfort zone.', body_hi: 'राहु को परंपरागत रूप से अंतरजातीय और अंतर-सांस्कृतिक विवाहों से सबसे अधिक जोड़ा जाता है। यह तीव्र आकर्षण, वर्जित चीज़ों और स्थापित सामाजिक दायरों से बाहर निकलने की इच्छा का प्रतिनिधित्व करता है। सप्तम भाव में राहु ऐसे विवाहों के सबसे अधिक बताए जाने वाले संकेतों में से एक है — हालांकि यह अकेले परिणाम तय नहीं करता — क्योंकि यह व्यक्ति को "वर्जित फल" की ओर, यानी अपने कार्मिक सुविधा-क्षेत्र से बाहर की चीज़ों की ओर, धकेलता है।' },
          { id: 'ketu', label: 'Ketu', label_hi: 'केतु', body: 'Ketu represents detachment from established social norms. A native with a strong Ketu influence on the 9th house is often indifferent to caste or social distinctions, which can make a partner from a different background feel natural to them, as they feel less of the karmic pull of tradition. Ketu makes the native feel that cultural background is a secondary, or even irrelevant, factor in soul-level connection.', body_hi: 'केतु स्थापित सामाजिक मान्यताओं से वैराग्य का प्रतिनिधित्व करता है। नवम भाव पर केतु के प्रबल प्रभाव वाला जातक अक्सर जाति या सामाजिक भेदों के प्रति उदासीन होता है, इसलिए अलग पृष्ठभूमि का साथी उसे स्वाभाविक लग सकता है — वह परंपरा का कार्मिक खिंचाव कम महसूस करता है। केतु जातक को यह अनुभव कराता है कि आत्मिक जुड़ाव में सांस्कृतिक पृष्ठभूमि गौण, या बिल्कुल अप्रासंगिक, है।' }
        ]
      },
      {
        id: 'advanced-indicators',
        title: 'Advanced Indicators',
        title_hi: 'उन्नत संकेतक',
        layout: 'list',
        items: [
          { id: 'navamsa', label: 'Navamsa (D9)', label_hi: 'नवांश (D9)', body: 'The Navamsa is the essential confirmation. If the Rashi chart (D1) indicates an unconventional union, astrologers look to the Navamsa to corroborate this through similar connections (e.g., 5th/7th/9th house interactions, or Rahu/Ketu influences). A strong Rashi chart indication with a weak Navamsa may show a desire for such a marriage that does not necessarily materialise. The Navamsa reveals the inner fruit — if the indication is repeated here, it is read as a deeper karmic theme.', body_hi: 'नवांश सबसे ज़रूरी पुष्टि है। यदि राशि कुंडली (D1) अपरंपरागत विवाह का संकेत दे, तो ज्योतिषी नवांश में भी ऐसे ही संबंध देखते हैं (जैसे पंचम/सप्तम/नवम भावों का आपसी संबंध, या राहु/केतु का प्रभाव)। राशि कुंडली में मज़बूत संकेत लेकिन कमज़ोर नवांश ऐसे विवाह की इच्छा तो दिखा सकता है, जो ज़रूरी नहीं कि पूरी हो। नवांश आंतरिक फल दिखाता है — यदि संकेत यहाँ भी दोहराया जाए, तो उसे गहरा कार्मिक विषय माना जाता है।' },
          { id: 'darakaraka', label: 'Darakaraka (DK)', label_hi: 'दारकारक (DK)', body: 'In the Jaimini system, the Darakaraka is the significator of the spouse. If the Darakaraka is associated with Rahu or occupies an unconventional sign, it may suggest a spouse from a background outside the native\'s usual circle. The Darakaraka shows the soul-type of the spouse, which is often purposefully different from the native to encourage growth.', body_hi: 'जैमिनी पद्धति में दारकारक जीवनसाथी का कारक है। यदि दारकारक राहु से जुड़ा हो या किसी अपरंपरागत राशि में हो, तो यह जातक के सामान्य दायरे से बाहर की पृष्ठभूमि वाले जीवनसाथी का संकेत दे सकता है। दारकारक जीवनसाथी की आत्मिक प्रकृति दिखाता है, जो अक्सर विकास को प्रोत्साहित करने के लिए जातक से अलग होती है।' },
          { id: 'upapada', label: 'Upapada Lagna (UL)', label_hi: 'उपपद लग्न (UL)', body: 'The Upapada Lagna is the house of the marital partner. The placement of the Upapada lord in an unconventional or afflicted house is read as an indication that the marital relationship itself may depart from social conventions. It tracks the actual marriage rather than just the desire for partnership.', body_hi: 'उपपद लग्न वैवाहिक संबंध का भाव है। उपपद के स्वामी का किसी अपरंपरागत या पीड़ित भाव में होना इस बात का संकेत माना जाता है कि वैवाहिक संबंध स्वयं सामाजिक परंपराओं से अलग हो सकता है। यह केवल साझेदारी की इच्छा नहीं, बल्कि वास्तविक विवाह को दर्शाता है।' }
        ]
      },
      {
        id: 'dasha-analysis',
        title: 'Dasha and Transit Timing',
        title_hi: 'दशा और गोचर से समय का विश्लेषण',
        layout: 'list',
        items: [
          { id: 'dasha-timing', label: 'Dasha as Timing Mechanism', label_hi: 'समय के मुख्य आधार के रूप में दशा', body: 'The Dasha system is the main timing tool. An indication of an unconventional union tends to become active when the Dasha-Bhukti activates the relevant houses. Astrologers consider the strongest timing for an intercaste marriage to be a Dasha lord that is connected to the 7th house and also has a relationship with Rahu or Ketu. Even if an individual has the natal indication, they may marry within their community if their formative years run through Dasha periods of planets that strongly uphold 9th house traditions. The Dasha serves as the condition in which the karmic seed can sprout.', body_hi: 'विवाह के समय के लिए दशा पद्धति मुख्य साधन है। अपरंपरागत विवाह का संकेत तब सक्रिय होने की संभावना रखता है जब दशा-भुक्ति संबंधित भावों को सक्रिय करे। ज्योतिषी अंतरजातीय विवाह के लिए सबसे प्रबल समय उसे मानते हैं जब दशा स्वामी सप्तम भाव से जुड़ा हो और राहु या केतु से भी उसका संबंध हो। जन्मकुंडली में संकेत होने पर भी व्यक्ति अपने ही समुदाय में विवाह कर सकता है, यदि उसके निर्णायक वर्षों में ऐसे ग्रहों की दशा चले जो नवम भाव की परंपराओं को दृढ़ता से बनाए रखते हैं। दशा वह परिस्थिति है जिसमें कार्मिक बीज अंकुरित हो सकता है।' },
          { id: 'transit-trigger', label: 'Transits as Triggers', label_hi: 'घटनाओं को सक्रिय करने वाले गोचर', body: 'Transits act as the final trigger. Jupiter transiting the 7th house is traditionally seen as supporting marriage; if Rahu is involved at the same time, astrologers may read it as support for an unconventional union. Saturn’s transit over the 9th house or its lord can bring social expectations to the fore — a period in which the native may feel pressed to weigh tradition against personal choice. Rahu transiting the 7th house can create a period of intense focus on unconventional partnerships, often speeding up decisions.', body_hi: 'गोचर अंतिम सक्रियता का काम करते हैं। सप्तम भाव में गुरु का गोचर परंपरागत रूप से विवाह के लिए सहायक माना जाता है; यदि उसी समय राहु भी शामिल हो, तो ज्योतिषी इसे अपरंपरागत विवाह के लिए सहायक मान सकते हैं। नवम भाव या नवमेश पर शनि का गोचर सामाजिक अपेक्षाओं को सामने ला सकता है — ऐसा समय जब जातक को परंपरा और अपने चुनाव के बीच संतुलन तय करने का दबाव महसूस हो सकता है। सप्तम भाव में राहु का गोचर अपरंपरागत संबंधों पर गहरे ध्यान का समय ला सकता है, जिससे निर्णय अक्सर तेज़ी से होते हैं।' }
        ]
      },
      {
        id: 'astrological-combinations',
        title: 'Astrological Combinations',
        title_hi: 'ज्योतिषीय योग',
        layout: 'list',
        items: [
          { id: 'strong', label: 'Strong Combinations', label_hi: 'मज़बूत योग', body: 'A well-placed Rahu influencing the 7th house lord, while the 5th and 11th houses are strong, is traditionally read as showing both the desire and the determination to sustain an intercaste union. It is called a "strong" combination because the inner drive for the union is supported by the necessary willpower.', body_hi: 'जब अच्छी स्थिति में राहु सप्तमेश को प्रभावित करे और पंचम व एकादश भाव मज़बूत हों, तो इसे परंपरागत रूप से अंतरजातीय विवाह की इच्छा और उसे निभाने के संकल्प — दोनों का संकेत माना जाता है। इसे "मज़बूत" योग इसलिए कहा जाता है क्योंकि विवाह की आंतरिक इच्छा को आवश्यक इच्छाशक्ति का साथ मिलता है।' },
          { id: 'weak', label: 'Weak Combinations', label_hi: 'कमज़ोर योग', body: 'If the 7th lord is afflicted by malefic planets and the 2nd and 9th houses are also weak, the native may desire an unconventional marriage but find it harder to gather the social or emotional support to sustain it when family members resist.', body_hi: 'यदि सप्तमेश पाप ग्रहों से पीड़ित हो और द्वितीय व नवम भाव भी कमज़ोर हों, तो जातक अपरंपरागत विवाह की इच्छा तो रख सकता है, लेकिन परिवार के विरोध की स्थिति में उसे निभाने के लिए सामाजिक या भावनात्मक सहारा जुटाना कठिन लग सकता है।' },
          { id: 'mixed', label: 'Mixed Combinations', label_hi: 'मिश्रित योग', body: 'When the 7th house is supported but the 9th lord is also strong, the union may still take place, but it may involve ongoing tension with families that takes time and patience to resolve.', body_hi: 'जब सप्तम भाव को समर्थन मिले लेकिन नवमेश भी मज़बूत हो, तो विवाह हो सकता है, पर परिवारों के साथ लंबे समय तक तनाव रह सकता है, जिसे सुलझाने में समय और धैर्य लगता है।' }
        ]
      },
      {
        id: 'family-opposition-acceptance',
        title: 'Family Opposition and Acceptance',
        title_hi: 'पारिवारिक विरोध और स्वीकृति',
        layout: 'list',
        items: [
          { id: 'tension', label: 'The Core Tension', label_hi: 'मूल तनाव', body: 'In the chart, family themes are read mainly from the 2nd house and tradition from the 9th house, so astrologers often describe the tension in an intercaste chart as one between the 7th house (the choice of partner) and the 2nd house (the family’s reaction). Supportive periods, such as a favourable Jupiter transit, are traditionally associated with that tension easing, often after the couple has shown long-term commitment. But a chart cannot tell how a specific family will respond: acceptance depends on the people involved — their values, their circumstances and how the couple communicates with them — and is usually built over time.', body_hi: 'कुंडली में परिवार से जुड़े विषय मुख्य रूप से द्वितीय भाव से और परंपरा नवम भाव से देखी जाती है, इसलिए ज्योतिषी अंतरजातीय विवाह की कुंडली में तनाव को अक्सर सप्तम भाव (साथी का चुनाव) और द्वितीय भाव (परिवार की प्रतिक्रिया) के बीच का तनाव बताते हैं। गुरु के अनुकूल गोचर जैसी सहायक अवधियों को परंपरागत रूप से इस तनाव के कम होने से जोड़ा जाता है, अक्सर तब जब जोड़ा लंबे समय तक अपनी प्रतिबद्धता दिखा चुका हो। लेकिन कुंडली यह नहीं बता सकती कि कोई विशेष परिवार कैसी प्रतिक्रिया देगा: स्वीकृति उन लोगों पर निर्भर करती है — उनके मूल्यों, उनकी परिस्थितियों और जोड़ा उनसे कैसे संवाद करता है — और आमतौर पर समय के साथ बनती है।' }
        ]
      },
      {
        id: 'love-vs-intercaste',
        title: 'Love Marriage vs Intercaste Marriage',
        title_hi: 'प्रेम विवाह बनाम अंतरजातीय विवाह',
        layout: 'comparison',
        items: [
          { id: 'love', label: 'Love Marriage', label_hi: 'प्रेम विवाह', body: 'Primarily defined by 5th house choice of personal romantic partner.', body_hi: 'मुख्य रूप से पंचम भाव से जुड़े व्यक्तिगत प्रेम-चुनाव से पहचाना जाता है।' },
          { id: 'intercaste', label: 'Intercaste Marriage', label_hi: 'अंतरजातीय विवाह', body: 'Defined by divergence from societal norms (9th house/Rahu/Ketu influence).', body_hi: 'सामाजिक परंपराओं से अलग राह (नवम भाव/राहु/केतु का प्रभाव) से पहचाना जाता है।' }
        ]
      },
      {
        id: 'common-misconceptions',
        title: 'Common Misconceptions',
        title_hi: 'सामान्य भ्रांतियां',
        layout: 'list',
        items: [
          { id: 'rahu-happy', label: 'Rahu ensures happiness', label_hi: 'राहु खुशी सुनिश्चित करता है', body: 'Rahu creates intensity, not stability.', body_hi: 'राहु तीव्रता पैदा करता है, स्थिरता नहीं।' },
          { id: 'parents-oppose', label: 'Parents always oppose', label_hi: 'माता-पिता हमेशा विरोध करते हैं', body: 'Family responses depend on the family itself. The 2nd house describes family themes in the chart, not a specific family’s decision.', body_hi: 'परिवार की प्रतिक्रिया स्वयं परिवार पर निर्भर करती है। द्वितीय भाव कुंडली में परिवार से जुड़े विषय दिखाता है, किसी विशेष परिवार का निर्णय नहीं।' },
          { id: 'planets-fixed', label: 'Planets are fixed', label_hi: 'ग्रह स्थिर हैं', body: 'Planets show potential, not a fixed outcome.', body_hi: 'ग्रह क्षमता दिखाते हैं, कोई निश्चित परिणाम नहीं।' }
        ]
      },
      {
        id: 'practical-remedies',
        title: 'Practical Remedies',
        title_hi: 'व्यावहारिक उपाय',
        layout: 'checklist',
        items: [
          { id: 'remedy-1', label: 'Selfless Service (Seva)', label_hi: 'निस्वार्थ सेवा', body: 'Balances 6th/8th house energy to reduce marital friction.', body_hi: 'वैवाहिक मतभेद कम करने के लिए षष्ठ/अष्टम भाव की ऊर्जा को संतुलित करती है।' },
          { id: 'remedy-2', label: 'Mantra Japa', label_hi: 'मंत्र जप', body: 'Aligns 9th and 7th house energies.', body_hi: 'नवम और सप्तम भाव की ऊर्जाओं में तालमेल लाता है।' },
          { id: 'remedy-3', label: 'Cultivating Humility', label_hi: 'विनम्रता विकसित करना', body: 'Helps manage family conflict.', body_hi: 'पारिवारिक संघर्ष का प्रबंधन करने में मदद करता है।' },
          { id: 'remedy-4', label: 'Patience', label_hi: 'धैर्य', body: 'Gives the relationship time to strengthen and gives families time to adjust.', body_hi: 'रिश्ते को मज़बूत होने और परिवारों को नई स्थिति के अनुरूप ढलने का समय देता है।' }
        ]
      },
      {
        id: 'ethical-interpretation',
        title: 'Ethical Interpretation',
        title_hi: 'नैतिक व्याख्या',
        layout: 'list',
        items: [
          { id: 'ethics', label: 'Astrological Responsibility', label_hi: 'ज्योतिषीय जिम्मेदारी', body: 'An astrologer must never use their knowledge to validate or condemn a client\'s choice. The ethical role is to map the karmic landscape, explain the potential challenges, and offer perspective that empowers the client. In the case of intercaste unions, the ethical astrologer highlights the nature of the karmic lesson, allowing the native to approach their union with eyes wide open and a mature heart.', body_hi: 'ज्योतिषी को अपने ज्ञान का उपयोग कभी भी किसी के निर्णय को सही ठहराने या उसकी निंदा करने के लिए नहीं करना चाहिए। उसकी नैतिक भूमिका कुंडली के कार्मिक संकेत समझाना, संभावित चुनौतियाँ बताना और ऐसा दृष्टिकोण देना है जो व्यक्ति को सशक्त बनाए। अंतरजातीय विवाह के मामले में नैतिक ज्योतिषी कार्मिक सीख की प्रकृति स्पष्ट करता है, ताकि जातक खुली आँखों और परिपक्व मन से अपने विवाह की ओर बढ़ सके।' }
        ]
      },
      {
        id: 'summary',
        title: 'Summary',
        title_hi: 'सारांश',
        layout: 'list',
        items: [
          { id: 'summary-final', label: 'Karmic Evolution', label_hi: 'कार्मिक विकास', body: 'Vedic Astrology reads an intercaste marriage as an expression of an individual’s soul-level need to go beyond the limits of their ancestral background. It is traditionally associated in the chart with the houses of personal choice (5th and 7th) being stronger than the house of social tradition (9th), often alongside the unconventional energy of Rahu or Ketu. Analysing these indicators carefully gives insight into why such unions happen and the effort needed to sustain them — as tendencies, not certainties. These marriages are not mistakes; they are often a meaningful part of an individual’s growth.', body_hi: 'वैदिक ज्योतिष अंतरजातीय विवाह को व्यक्ति की उस आत्मिक आवश्यकता की अभिव्यक्ति मानता है जो उसे पैतृक पृष्ठभूमि की सीमाओं से आगे ले जाती है। कुंडली में इसे परंपरागत रूप से इस बात से जोड़ा जाता है कि व्यक्तिगत चुनाव के भाव (पंचम और सप्तम) सामाजिक परंपरा के भाव (नवम) से अधिक प्रबल हों, अक्सर राहु या केतु की अपरंपरागत ऊर्जा के साथ। इन संकेतों का सावधानी से विश्लेषण यह समझने में मदद करता है कि ऐसे विवाह क्यों होते हैं और उन्हें निभाने के लिए किस प्रयास की ज़रूरत है — प्रवृत्तियों के रूप में, निश्चितता के रूप में नहीं। ये विवाह कोई भूल नहीं हैं; ये अक्सर व्यक्ति के विकास का एक सार्थक हिस्सा होते हैं।' }
        ]
      },
      {
        id: 'faq-section',
        title: 'Frequently Asked Questions',
        title_hi: 'अक्सर पूछे जाने वाले प्रश्न',
        layout: 'faq',
        items: [
          { id: 'faq-1', label: 'Can a horoscope show whether my marriage will be intercaste?', body: 'Not with certainty. Astrologers look for combinations traditionally associated with an unconventional union — for example Rahu or Ketu influencing the 7th house or its lord, a strong 5th–7th connection and a 9th house that is less connected to marriage — and check them in the Navamsa and the running Dasha. These describe a tendency; a horoscope does not reveal anyone’s caste, and the actual choice of partner depends on the person and their circumstances.', label_hi: 'क्या कुंडली से पता चल सकता है कि मेरा विवाह अंतरजातीय होगा?', body_hi: 'निश्चित रूप से नहीं। ज्योतिषी ऐसे योग देखते हैं जिन्हें परंपरागत रूप से अपरंपरागत विवाह से जोड़ा जाता है — जैसे सप्तम भाव या सप्तमेश पर राहु या केतु का प्रभाव, पंचम और सप्तम भाव का मज़बूत संबंध और विवाह से कम जुड़ा नवम भाव — और इनकी पुष्टि नवांश और चल रही दशा में करते हैं। ये एक प्रवृत्ति बताते हैं; जन्मकुंडली किसी की जाति नहीं बताती, और साथी का वास्तविक चुनाव व्यक्ति और उसकी परिस्थितियों पर निर्भर करता है।' },
          { id: 'faq-2', label: 'Can astrology tell whether my family will accept my partner?', body: 'No. The 2nd and 9th houses describe family and tradition themes in your chart, and supportive periods can be identified, but astrology cannot know how a particular family will respond. Acceptance depends on the people involved — their values, their circumstances and how the couple communicates with them — and often grows over time.', label_hi: 'क्या ज्योतिष बता सकता है कि मेरा परिवार मेरे साथी को स्वीकार करेगा?', body_hi: 'नहीं। द्वितीय और नवम भाव आपकी कुंडली में परिवार और परंपरा से जुड़े विषय दिखाते हैं, और सहायक अवधियाँ पहचानी जा सकती हैं, लेकिन ज्योतिष यह नहीं जान सकता कि कोई विशेष परिवार कैसी प्रतिक्रिया देगा। स्वीकृति उन लोगों पर निर्भर करती है — उनके मूल्यों, उनकी परिस्थितियों और जोड़ा उनसे कैसे संवाद करता है — और अक्सर समय के साथ बढ़ती है।' },
          { id: 'faq-3', label: 'Is an intercaste marriage more likely to result in divorce?', body: 'Not necessarily. Divorce depends on the overall strength of the marital house and the couple\'s maturity, not just the social background.', label_hi: 'क्या अंतरजातीय विवाह में तलाक की संभावना अधिक है?', body_hi: 'जरूरी नहीं। तलाक कुल चार्ट शक्ति और जोड़े की परिपक्वता पर निर्भर करता है, न कि केवल सामाजिक पृष्ठभूमि पर।' },
          { id: 'faq-4', label: 'Can I use remedies to make my parents accept my partner?', body: 'You can use remedies (like service and mantra) to balance the energy, but family acceptance is a complex social event that is rarely fully within one\'s control.', label_hi: 'क्या उपायों के ज़रिए मैं अपने माता-पिता से अपने साथी को स्वीकार करवा सकता हूँ?', body_hi: 'आप ऊर्जा को संतुलित करने के लिए उपायों (जैसे सेवा और मंत्र) का उपयोग कर सकते हैं, लेकिन पारिवारिक स्वीकृति एक जटिल सामाजिक घटना है जो शायद ही कभी पूरी तरह से किसी के नियंत्रण में होती है।' },
          { id: 'faq-5', label: 'Why does Jupiter’s influence matter in an intercaste marriage?', body: 'Jupiter provides the wisdom and emotional maturity to handle the complexities of cultural and traditional differences.', label_hi: 'अंतरजातीय विवाह में गुरु का प्रभाव क्यों मायने रखता है?', body_hi: 'गुरु सांस्कृतिक और पारंपरिक मतभेदों की जटिलताओं को संभालने के लिए ज्ञान और भावनात्मक परिपक्वता प्रदान करता है।' },
          { id: 'faq-6', label: 'Are all intercaste marriages difficult?', body: 'No. If the 5th and 7th houses are strong and harmonious, the couple’s bond can be deep and resilient, regardless of social friction.', label_hi: 'क्या सभी अंतरजातीय विवाह कठिन होते हैं?', body_hi: 'नहीं। यदि पांचवां और सातवां घर मजबूत और सामंजस्यपूर्ण हैं, तो जोड़े का बंधन सामाजिक घर्षण के बावजूद गहरा और लचीला हो सकता है।' },
          { id: 'faq-7', label: 'Can the 9th house be strengthened to improve family acceptance?', body: 'Performing remedies for the 9th lord can help harmonize the native\'s relationship with tradition and ancestors, which may indirectly influence how they are perceived.', label_hi: 'क्या पारिवारिक स्वीकृति में सुधार के लिए नौवें घर को मजबूत किया जा सकता है?', body_hi: 'नौवें स्वामी के लिए उपाय करने से जातक के परंपरा और पूर्वजों के साथ संबंधों में सामंजस्य स्थापित करने में मदद मिल सकती है, जो परोक्ष रूप से इस बात को प्रभावित कर सकता है कि उन्हें कैसे देखा जाता है।' },
          { id: 'faq-8', label: 'Is every intercaste marriage a love marriage in astrology?', body: 'No. The two overlap but are read differently. A love marriage is read mainly through the 5th house of personal choice connecting with the 7th; an intercaste union is read mainly as a departure from 9th-house tradition, often with Rahu or Ketu involved. A marriage can be both, only one of them, or arranged by families across communities.', label_hi: 'क्या ज्योतिष में हर अंतरजातीय विवाह प्रेम विवाह होता है?', body_hi: 'नहीं। दोनों एक-दूसरे से जुड़े हैं, पर इन्हें अलग तरह से पढ़ा जाता है। प्रेम विवाह मुख्य रूप से व्यक्तिगत चुनाव के पंचम भाव और सप्तम भाव के संबंध से देखा जाता है, जबकि अंतरजातीय विवाह मुख्य रूप से नवम भाव की परंपरा से हटने के रूप में देखा जाता है, जिसमें अक्सर राहु या केतु शामिल होते हैं। कोई विवाह दोनों हो सकता है, केवल एक हो सकता है, या परिवारों द्वारा अलग समुदायों के बीच तय किया गया विवाह भी हो सकता है।' },
          { id: 'faq-9', label: 'Is it "bad" astrology to have a chart that supports intercaste marriage?', body: 'It is simply a karmic reality. In Vedic Astrology, there is no good or bad—only the movement of the soul through the karmic journey.', label_hi: 'क्या अंतरजातीय विवाह का समर्थन करने वाला चार्ट होना "बुरा" ज्योतिष है?', body_hi: 'यह केवल एक कार्मिक वास्तविकता है। वैदिक ज्योतिष में, कोई अच्छा या बुरा नहीं है—केवल कार्मिक यात्रा के माध्यम से आत्मा की गति है।' },
          { id: 'faq-10', label: 'Does Rahu in the 7th house guarantee an intercaste union?', body: 'No. It is one of the most commonly cited indicators, but it needs corroboration from other house configurations, the Navamsa and the current Dasha sequence.', label_hi: 'क्या सातवें घर में राहु अंतरजातीय मिलन की गारंटी देता है?', body_hi: 'नहीं। यह सबसे अधिक बताए जाने वाले संकेतों में से एक है, लेकिन इसकी पुष्टि अन्य भावों की स्थिति, नवांश और वर्तमान दशा से होनी चाहिए।' }
        ]
      }
    ],
    ctas: [
      {
        id:             'cta-marriage-path',
        type:           'tool',
        slug:           'marriage-path',
        label:          'Check Your Marriage Path',
        label_hi:       'अपना विवाह मार्ग जांचें',
        description:    'A free check of your 7th house — the planets placed there, Venus and Jupiter, and the strongest influence on your marriage.',
        description_hi: 'आपके सप्तम भाव की निःशुल्क जाँच — उसमें स्थित ग्रह, शुक्र और गुरु, और विवाह पर सबसे प्रबल प्रभाव।',
        variant:        'primary',
      },
      // The Love Marriage Report is offered only as a contextual card after 'love-vs-intercaste'
      // (_landing.ts). It reads love-marriage tendency; it does not assess caste or family acceptance.
    ],
  },

  aiMetadata: {
    searchIntent:  'informational',
    difficulty:    'beginner',
    authorityLevel: 'expert',
  },

  schemaSignals: {
    expertise: 'Expert analysis of karmic blueprints and unconventional marital unions in Vedic Astrology.',
  },

  authority: {
    reviewStatus:   'approved',
    contentVersion: 1,
  },

  publishing: {
    isIndexable:     false,
    isSearchEnabled: false,
    visibility:      'private',
  },

}
