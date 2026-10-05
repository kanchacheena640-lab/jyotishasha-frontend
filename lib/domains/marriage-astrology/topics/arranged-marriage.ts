import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const arrangedMarriage: DomainTopic = {

  identity: {
    id:         'marriage-astrology:arranged-marriage',
    slug:       'arranged-marriage',
    title:      'Arranged Marriage in Vedic Astrology: Will I Have an Arranged Marriage?',
    title_hi:   'वैदिक ज्योतिष में अरेंज मैरिज: क्या मेरी अरेंज मैरिज होगी?',
    domain:     'astrology',
    subdomain:  'marriage-astrology',
    category:   'marriage',
    entityType: 'concept',
    status:     'draft',
  },

  routing: {
    canonicalPath: '/marriage-astrology/arranged-marriage',
    breadcrumbs: [
      { label: 'Home',                  label_hi: 'होम',           href: '/' },
      { label: 'Marriage Astrology',    label_hi: 'विवाह ज्योतिष', href: '/marriage-astrology' },
      { label: 'Arranged Marriage',     label_hi: 'व्यवस्थित विवाह', href: '/marriage-astrology/arranged-marriage' },
    ],
  },

  seo: {
    metaTitle:          'Arranged Marriage in Vedic Astrology: Karmic Timing and Analysis',
    metaDescription:    'Will I have an arranged marriage? See how Vedic astrology reads arranged-marriage indications in a kundli — the 7th, 2nd, 9th and 11th houses, Jupiter, Venus, Navamsa and Dasha.',
    metaDescription_hi: 'क्या मेरी अरेंज मैरिज होगी? जानें कुंडली में अरेंज मैरिज (व्यवस्थित विवाह) के योग कैसे देखे जाते हैं — सप्तम, द्वितीय, नवम और एकादश भाव, गुरु, शुक्र, नवांश और दशा।',
    robots:             'noindex,follow',
  },

  hero: {
    headline:    'Arranged Marriage in Vedic Astrology',
    headline_hi: 'वैदिक ज्योतिष में व्यवस्थित विवाह',
    subtext:     'How a kundli is read for arranged-marriage indications — the 7th, 2nd, 9th and 11th houses, Jupiter and Venus, the Navamsa and Dasha — and what kind of answer it can realistically give.',
    subtext_hi:  'कुंडली में अरेंज मैरिज (व्यवस्थित विवाह) के योग कैसे देखे जाते हैं — सप्तम, द्वितीय, नवम और एकादश भाव, गुरु और शुक्र, नवांश और दशा — और इससे किस तरह का उत्तर मिल सकता है।',
  },

  taxonomy: {
    tags:        ['vedic-astrology', 'marriage-astrology', 'arranged-marriage', 'karmic-astrology'],
    keywords:    ['arranged marriage astrology', 'arranged marriage in vedic astrology', 'will i have an arranged marriage', 'arranged marriage prediction by kundli', 'arranged marriage yog in kundli', 'houses for arranged marriage', 'love or arranged marriage astrology'],
    keywords_hi: ['अरेंज मैरिज ज्योतिष', 'क्या मेरी अरेंज मैरिज होगी', 'कुंडली में अरेंज मैरिज के योग', 'वैदिक ज्योतिष में व्यवस्थित विवाह', 'विवाह अरेंज होगा या लव'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'what-it-means',
        title:    'What Arranged Marriage Means in a Birth Chart',
        title_hi: 'कुंडली में अरेंज मैरिज का अर्थ',
        layout:   'list',
        items: [
          {
            id:       'family-assisted-path',
            label:    'A Family-Assisted Path to Marriage',
            label_hi: 'परिवार की सहायता से विवाह का मार्ग',
            body:     'In Vedic astrology, an arranged marriage means a marriage in which family members, elders or the wider community play an active part in finding, introducing or approving the partner. Traditionally, marriage is a Sanskara — a rite that joins two individuals and two families — so astrologers read it through the houses of family, tradition and community as well as the 7th house of partnership. A chart is read for how strongly it supports this family-assisted path, not for whether that path is better or worse than a self-chosen one.',
            body_hi:  'वैदिक ज्योतिष में अरेंज मैरिज (व्यवस्थित विवाह) का अर्थ है ऐसा विवाह जिसमें परिवार, बड़े-बुज़ुर्ग या समाज जीवनसाथी को खोजने, मिलवाने या स्वीकृति देने में सक्रिय भूमिका निभाते हैं। परंपरा में विवाह एक संस्कार है, जो दो व्यक्तियों के साथ दो परिवारों को भी जोड़ता है। इसलिए ज्योतिषी इसे साझेदारी के सप्तम भाव के साथ-साथ परिवार, परंपरा और समाज से जुड़े भावों से भी पढ़ते हैं। कुंडली से यह देखा जाता है कि वह परिवार की सहायता वाले इस मार्ग का कितना समर्थन करती है — यह नहीं कि यह मार्ग स्वयं चुने गए विवाह से बेहतर है या कमतर।',
          },
          {
            id:       'promise-and-real-life',
            label:    'Chart Promise and Real Life',
            label_hi: 'कुंडली का संकेत और वास्तविक जीवन',
            body:     'A birth chart shows tendencies, not a fixed script. Whether a marriage actually comes about through family introductions also depends on personal choice, family circumstances, culture and opportunity. Some people with strong family-path indications choose their own partner, and some with romance-leaning charts marry through introductions made by their families. The astrologer’s task is to describe which path the chart supports more easily — and to read that alongside real life.',
            body_hi:  'जन्मकुंडली प्रवृत्तियाँ दिखाती है, कोई तय पटकथा नहीं। विवाह वास्तव में परिवार के माध्यम से होगा या नहीं, यह व्यक्तिगत पसंद, पारिवारिक परिस्थितियों, संस्कृति और अवसरों पर भी निर्भर करता है। कुछ लोग जिनकी कुंडली में परिवार-मार्ग के मज़बूत संकेत होते हैं, स्वयं साथी चुनते हैं, और कुछ जिनकी कुंडली प्रेम की ओर झुकी होती है, परिवार द्वारा मिलवाए गए रिश्ते में विवाह करते हैं। ज्योतिषी का काम यह बताना है कि कुंडली किस मार्ग का अधिक सहज समर्थन करती है — और इसे वास्तविक जीवन के साथ मिलाकर देखना।',
          },
        ],
      },

      {
        id:       'arranged-indications',
        title:    'Arranged-Marriage Indications in a Kundli',
        title_hi: 'कुंडली में अरेंज मैरिज के योग और संकेत',
        layout:   'cards',
        items: [
          {
            id:       'no-single-placement',
            icon:     '🧩',
            label:    'No Single Placement Decides It',
            label_hi: 'कोई एक ग्रह-स्थिति निर्णय नहीं करती',
            body:     'There is no one "arranged marriage yog" that settles the question. Astrologers look for several of the indications below appearing together, then weigh them against any romance-leaning factors in the same chart. One placement on its own only adds to the picture.',
            body_hi:  'कोई एक "अरेंज मैरिज योग" ऐसा नहीं है जो इस प्रश्न का अंतिम उत्तर दे। ज्योतिषी देखते हैं कि नीचे दिए गए कई संकेत एक साथ मौजूद हैं या नहीं, और फिर उन्हें उसी कुंडली के प्रेम-संबंधी संकेतों के साथ तौलते हैं। अकेली कोई ग्रह-स्थिति केवल पूरे चित्र में एक कड़ी जोड़ती है।',
          },
          {
            id:       'seventh-lord-family-links',
            icon:     '🏠',
            label:    '7th Lord Linked With the 2nd, 9th or 11th',
            label_hi: 'सप्तमेश का द्वितीय, नवम या एकादश भाव से संबंध',
            body:     'When the 7th lord connects with the lords of the 2nd house (family), the 9th house (tradition, elders) or the 11th house (wider social and community network) — by placement, conjunction, exchange or aspect — the chart tends to support a partner who arrives through family or community channels. This is one of the most commonly cited arranged-marriage indications.',
            body_hi:  'जब सप्तमेश का संबंध द्वितीय भाव (परिवार), नवम भाव (परंपरा, बड़े-बुज़ुर्ग) या एकादश भाव (व्यापक सामाजिक और सामुदायिक दायरा) के स्वामियों से बनता है — स्थिति, युति, परिवर्तन या दृष्टि द्वारा — तो कुंडली ऐसे जीवनसाथी का समर्थन करती है जो परिवार या समाज के माध्यम से जीवन में आए। यह अरेंज मैरिज के सबसे अधिक बताए जाने वाले संकेतों में से एक है।',
          },
          {
            id:       'jupiter-on-seventh',
            icon:     '🪐',
            label:    'Jupiter’s Influence on the 7th',
            label_hi: 'सप्तम भाव पर गुरु का प्रभाव',
            body:     'Jupiter represents tradition, elders and guidance. Its aspect or placement on the 7th house or the 7th lord tends to support a marriage that follows a traditional process and receives the family’s blessing. It supports a family-assisted path; it does not decide it on its own.',
            body_hi:  'गुरु परंपरा, बड़ों और मार्गदर्शन का प्रतिनिधि है। सप्तम भाव या सप्तमेश पर गुरु की दृष्टि या स्थिति ऐसे विवाह का समर्थन करती है जो पारंपरिक प्रक्रिया से हो और जिसे परिवार का आशीर्वाद मिले। यह परिवार की सहायता वाले मार्ग का समर्थन करता है; अकेले निर्णय नहीं करता।',
          },
          {
            id:       'saturn-structure',
            icon:     '⏳',
            label:    'Saturn: Structure and Maturity',
            label_hi: 'शनि: व्यवस्था और परिपक्वता',
            body:     'Saturn connected with the 7th house or its lord is often read as a practical, duty-minded approach to marriage — a preference for structure, family consultation and a considered decision. It is not automatically a sign of delay or difficulty; it describes the style of the path more than its outcome.',
            body_hi:  'सप्तम भाव या सप्तमेश से जुड़ा शनि अक्सर विवाह के प्रति व्यावहारिक और कर्तव्य-प्रधान दृष्टिकोण दिखाता है — व्यवस्था, परिवार से परामर्श और सोच-समझकर लिए गए निर्णय की ओर झुकाव। यह अपने-आप देरी या कठिनाई का संकेत नहीं है; यह परिणाम से अधिक मार्ग की शैली बताता है।',
          },
          {
            id:       'weaker-fifth-seventh',
            icon:     '🔗',
            label:    'A Weaker 5th–7th Emphasis',
            label_hi: 'पंचम–सप्तम संबंध का कमज़ोर होना',
            body:     'A strong link between the 5th house of romance and the 7th house tends to support a self-chosen partner. When that link is weak or absent while the family houses are prominent, the balance may tilt toward a family-assisted path. This is a supporting contrast only — never proof of an arranged marriage.',
            body_hi:  'प्रेम के पंचम भाव और सप्तम भाव का मज़बूत संबंध स्वयं चुने गए साथी का समर्थन करता है। जब यह संबंध कमज़ोर या अनुपस्थित हो और परिवार से जुड़े भाव प्रमुख हों, तो संतुलन परिवार की सहायता वाले मार्ग की ओर झुक सकता है। यह केवल एक सहायक तुलना है — अरेंज मैरिज का प्रमाण नहीं।',
          },
          {
            id:       'tenth-house-navamsa-support',
            icon:     '🏛️',
            label:    'Supporting Factors: 10th House and Navamsa',
            label_hi: 'सहायक कारक: दशम भाव और नवांश',
            body:     'A 7th lord connected with the 10th house (social standing, duty) can add weight to a traditional, status-conscious match. The Navamsa (D9) is then used as a supporting check: when the D9 repeats the same family-oriented themes, the indication is considered stronger. Neither is a verdict on its own.',
            body_hi:  'दशम भाव (सामाजिक प्रतिष्ठा, कर्तव्य) से जुड़ा सप्तमेश पारंपरिक और प्रतिष्ठा-सजग रिश्ते के संकेत को बल दे सकता है। इसके बाद नवांश (D9) को सहायक जाँच के रूप में देखा जाता है: जब नवांश में भी परिवार-केंद्रित वही विषय दोहराए जाएँ, तो संकेत अधिक मज़बूत माना जाता है। इनमें से कोई भी अकेले अंतिम निर्णय नहीं है।',
          },
        ],
      },

      {
        id:       'key-house-analysis',
        title:    'Key Houses for Arranged Marriage',
        title_hi: 'अरेंज मैरिज के प्रमुख भाव',
        layout:   'accordion',
        items: [
          {
            id:       '2nd-house',
            label:    '2nd House — Family (Kutumba)',
            label_hi: 'द्वितीय भाव — परिवार (कुटुंब)',
            body:     'The 2nd house is Kutumba — the family unit, family values and the voice of the household. Because an arranged marriage is discussed and approved through families, this house is central to the reading. A strong, well-supported 2nd lord connected with the 7th house or the 7th lord tends to support a marriage that comes through family channels and is welcomed by the family. The 2nd house also describes how easily a person adapts to a new family’s customs, which matters when both families are closely involved. An afflicted 2nd house or lord may suggest differences over family expectations that need patience and clear conversation. Astrologers read the 2nd house together with the 7th and 9th: the family house, the partnership house and the tradition house describe, between them, how strongly the chart leans toward a family-assisted match.',
            body_hi:  'द्वितीय भाव कुटुंब है — परिवार, पारिवारिक मूल्य और घर की वाणी। अरेंज मैरिज की बातचीत और स्वीकृति परिवारों के माध्यम से होती है, इसलिए इस विश्लेषण में यह भाव केंद्रीय है। सप्तम भाव या सप्तमेश से जुड़ा मज़बूत और शुभ प्रभाव वाला द्वितीयेश ऐसे विवाह का समर्थन करता है जो परिवार के माध्यम से हो और जिसका परिवार स्वागत करे। द्वितीय भाव यह भी बताता है कि व्यक्ति नए परिवार के रीति-रिवाज़ों में कितनी सहजता से ढलता है, जो तब महत्वपूर्ण है जब दोनों परिवार निकटता से जुड़े हों। पीड़ित द्वितीय भाव या द्वितीयेश पारिवारिक अपेक्षाओं पर मतभेद का संकेत दे सकता है, जिसके लिए धैर्य और स्पष्ट बातचीत ज़रूरी होती है। ज्योतिषी द्वितीय भाव को सप्तम और नवम के साथ पढ़ते हैं: परिवार, साझेदारी और परंपरा के ये तीन भाव मिलकर बताते हैं कि कुंडली परिवार की सहायता वाले रिश्ते की ओर कितना झुकती है।',
          },
          {
            id:       '7th-house',
            label:    '7th House — Marriage and Partnership',
            label_hi: 'सप्तम भाव — विवाह और साझेदारी',
            body:     'The 7th house is the primary house of marriage and partnership, and its lord describes how the marriage comes about. For the arranged-marriage question, the key is not only the strength of the 7th house but its connections: a 7th lord linked with the 2nd, 9th or 11th lords tends to point toward family or community introductions, while a 7th lord bound closely to the 5th tends to point toward a self-chosen partner. Benefics such as Jupiter or Venus influencing the 7th generally support a smoother, well-accepted union; heavy affliction from Saturn, Rahu or Mars may suggest a longer search or more negotiation before agreement. The nature of the spouse, also read from the 7th house, is covered in the Spouse Nature guide.',
            body_hi:  'सप्तम भाव विवाह और साझेदारी का मुख्य भाव है, और सप्तमेश बताता है कि विवाह किस तरह होता है। अरेंज मैरिज के प्रश्न में केवल सप्तम भाव की शक्ति ही नहीं, उसके संबंध भी मुख्य हैं: द्वितीयेश, नवमेश या एकादशेश से जुड़ा सप्तमेश परिवार या समाज के माध्यम से रिश्ते की ओर संकेत करता है, जबकि पंचमेश से गहराई से जुड़ा सप्तमेश स्वयं चुने गए साथी की ओर। सप्तम भाव पर गुरु या शुक्र जैसे शुभ ग्रहों का प्रभाव सामान्यतः सहज और स्वीकार्य विवाह का समर्थन करता है; शनि, राहु या मंगल का भारी पीड़न सहमति से पहले लंबी खोज या अधिक बातचीत का संकेत दे सकता है। जीवनसाथी का स्वभाव, जो सप्तम भाव से भी देखा जाता है, जीवनसाथी के स्वभाव वाली मार्गदर्शिका में बताया गया है।',
          },
          {
            id:       '9th-house',
            label:    '9th House — Tradition and Elders',
            label_hi: 'नवम भाव — परंपरा और बड़े-बुज़ुर्ग',
            body:     'The 9th house represents Dharma, tradition, elders, the father and the values a family passes down. It is the house most closely associated with a marriage guided by elders. When the 9th lord connects with the 7th house or the 7th lord, the chart tends to support a union that follows family tradition and receives the blessing of elders. A strong 9th house can also describe a person who values that guidance and is comfortable with it. An afflicted 9th house or lord may suggest tension between personal preference and family tradition — not a forced outcome, but a decision that needs negotiation. The 9th house is read together with the 2nd: tradition and family side by side.',
            body_hi:  'नवम भाव धर्म, परंपरा, बड़े-बुज़ुर्ग, पिता और परिवार द्वारा आगे बढ़ाए गए मूल्यों का भाव है। इसे बड़ों के मार्गदर्शन वाले विवाह से सबसे निकटता से जोड़ा जाता है। जब नवमेश का संबंध सप्तम भाव या सप्तमेश से बनता है, तो कुंडली ऐसे विवाह का समर्थन करती है जो पारिवारिक परंपरा के अनुसार हो और जिसे बड़ों का आशीर्वाद मिले। मज़बूत नवम भाव ऐसे व्यक्ति को भी दर्शा सकता है जो इस मार्गदर्शन को महत्व देता है और इसमें सहज रहता है। पीड़ित नवम भाव या नवमेश व्यक्तिगत पसंद और पारिवारिक परंपरा के बीच खिंचाव का संकेत दे सकता है — कोई थोपा हुआ परिणाम नहीं, बल्कि ऐसा निर्णय जिसमें बातचीत की ज़रूरत हो। नवम भाव को द्वितीय भाव के साथ पढ़ा जाता है: परंपरा और परिवार एक साथ।',
          },
          {
            id:       '11th-house',
            label:    '11th House — Social Network and Fulfilment',
            label_hi: 'एकादश भाव — सामाजिक दायरा और इच्छापूर्ति',
            body:     'The 11th house governs gains, the fulfilment of desires and the wider social circle — relatives, friends, community and professional networks. In an arranged-marriage reading it describes the channels through which proposals and introductions arrive. A 7th lord linked with the 11th, or a well-placed 11th lord connected to the 7th, tends to support a partner met through relatives, family friends or community networks. Because the 11th is also the house of fulfilled wishes, a strong 11th–7th connection is read as support for a marriage that meets the person’s own hopes as well as the family’s. An afflicted 11th house may suggest that introductions take longer to bring the right match.',
            body_hi:  'एकादश भाव लाभ, इच्छापूर्ति और व्यापक सामाजिक दायरे — रिश्तेदार, मित्र, समाज और पेशेवर संपर्क — का भाव है। अरेंज मैरिज के विश्लेषण में यह बताता है कि रिश्ते और परिचय किन माध्यमों से आते हैं। एकादश भाव से जुड़ा सप्तमेश, या सप्तम से जुड़ा अच्छी स्थिति वाला एकादशेश, रिश्तेदारों, पारिवारिक मित्रों या सामाजिक दायरे के माध्यम से मिले साथी का समर्थन करता है। एकादश भाव इच्छापूर्ति का भी भाव है, इसलिए एकादश–सप्तम का मज़बूत संबंध ऐसे विवाह का समर्थन माना जाता है जो परिवार के साथ-साथ व्यक्ति की अपनी आशाओं को भी पूरा करे। पीड़ित एकादश भाव यह संकेत दे सकता है कि सही रिश्ता मिलने में अधिक समय लगे।',
          },
          {
            id:       '4th-house',
            label:    '4th House — Home and Settling In',
            label_hi: 'चतुर्थ भाव — घर और नए परिवार में रचना-बसना',
            body:     'The 4th house is home, mother and inner contentment. In a family-assisted marriage it describes how comfortably a person settles into a new household and how much the home environment supports the marriage. A 4th house connected favorably with the 7th or the 2nd tends to support a smooth transition between families. Its deeper role — domestic happiness over the years — belongs to the reading of married life.',
            body_hi:  'चतुर्थ भाव घर, माता और आंतरिक संतोष का भाव है। परिवार की सहायता से हुए विवाह में यह बताता है कि व्यक्ति नए घर में कितनी सहजता से रचता-बसता है और घर का वातावरण विवाह का कितना साथ देता है। सप्तम या द्वितीय भाव से अनुकूल रूप से जुड़ा चतुर्थ भाव परिवारों के बीच सहज बदलाव का समर्थन करता है। वर्षों तक घरेलू सुख में इसकी गहरी भूमिका वैवाहिक जीवन के विश्लेषण का विषय है।',
          },
          {
            id:       '5th-house',
            label:    '5th House — Romance and Personal Choice',
            label_hi: 'पंचम भाव — प्रेम और व्यक्तिगत पसंद',
            body:     'The 5th house is romance, attraction and personal choice. In an arranged-marriage reading it acts as the counterweight: a strong 5th–7th link tends to support a self-chosen partner, while a 5th house that is not strongly tied to the 7th leaves more room for family introductions. A well-placed 5th lord can also suggest that genuine affection develops within an arranged match. The love-marriage side of this house is explained in the Love Marriage guide.',
            body_hi:  'पंचम भाव प्रेम, आकर्षण और व्यक्तिगत पसंद का भाव है। अरेंज मैरिज के विश्लेषण में यह संतुलन का काम करता है: पंचम–सप्तम का मज़बूत संबंध स्वयं चुने गए साथी का समर्थन करता है, जबकि सप्तम से कम जुड़ा पंचम भाव परिवार द्वारा परिचय के लिए अधिक जगह छोड़ता है। अच्छी स्थिति वाला पंचमेश यह भी संकेत दे सकता है कि अरेंज रिश्ते में भी सच्चा स्नेह विकसित हो। इस भाव का प्रेम विवाह वाला पक्ष प्रेम विवाह मार्गदर्शिका में समझाया गया है।',
          },
        ],
      },

      {
        id:       'planetary-influences',
        title:    'Planetary Influences on an Arranged Marriage',
        title_hi: 'अरेंज मैरिज पर ग्रहों का प्रभाव',
        layout:   'accordion',
        items: [
          {
            id:       'jupiter',
            label:    'Jupiter — Tradition and Guidance',
            label_hi: 'गुरु — परंपरा और मार्गदर्शन',
            body:     'Jupiter is the natural significator of Dharma, wisdom, elders and tradition, and classical texts give it special weight in marriage — particularly in a woman’s chart. Its influence on the 7th house or the 7th lord is one of the most frequently cited supports for a traditional, family-blessed marriage. A well-placed Jupiter tends to describe a person who values guidance from elders and approaches marriage as a shared responsibility. An afflicted or weak Jupiter does not rule out an arranged marriage; it may suggest that the person weighs their own judgment more heavily than family advice. Jupiter is an important factor, but it is read together with the 7th lord and the family houses rather than on its own.',
            body_hi:  'गुरु धर्म, ज्ञान, बड़ों और परंपरा का प्राकृतिक कारक है, और शास्त्रीय ग्रंथ विवाह में इसे विशेष महत्व देते हैं — विशेषकर स्त्री की कुंडली में। सप्तम भाव या सप्तमेश पर इसका प्रभाव पारंपरिक, परिवार के आशीर्वाद वाले विवाह के सबसे अधिक बताए जाने वाले सहायक कारकों में से एक है। अच्छी स्थिति वाला गुरु ऐसे व्यक्ति को दर्शाता है जो बड़ों के मार्गदर्शन को महत्व देता है और विवाह को साझा ज़िम्मेदारी मानता है। पीड़ित या कमज़ोर गुरु अरेंज मैरिज को नकारता नहीं; यह संकेत दे सकता है कि व्यक्ति परिवार की सलाह की तुलना में अपने निर्णय को अधिक महत्व देता है। गुरु एक महत्वपूर्ण कारक है, पर इसे अकेले नहीं, बल्कि सप्तमेश और परिवार से जुड़े भावों के साथ पढ़ा जाता है।',
          },
          {
            id:       'venus',
            label:    'Venus — Partnership and Harmony',
            label_hi: 'शुक्र — साझेदारी और सामंजस्य',
            body:     'Venus is the natural significator (karaka) of marriage, partnership and affection. For the love-or-arranged question, Venus is neutral on its own — it supports marriage either way. What matters is its connections: Venus linked with the 5th house or Rahu tends to lean toward romance-led choices, while Venus linked with Jupiter, the 2nd or the 9th tends to lean toward a family-approved match. A strong, unafflicted Venus supports attraction and warmth developing between the couple even when they were introduced by their families; an afflicted Venus may suggest the bond takes more time to warm up.',
            body_hi:  'शुक्र विवाह, साझेदारी और स्नेह का प्राकृतिक कारक है। लव या अरेंज के प्रश्न पर शुक्र अकेले तटस्थ है — यह दोनों ही स्थितियों में विवाह का समर्थन करता है। मुख्य बात इसके संबंध हैं: पंचम भाव या राहु से जुड़ा शुक्र प्रेम-आधारित चुनाव की ओर झुकता है, जबकि गुरु, द्वितीय या नवम भाव से जुड़ा शुक्र परिवार द्वारा स्वीकृत रिश्ते की ओर। मज़बूत और अपीड़ित शुक्र परिवार द्वारा मिलवाए गए युगल में भी आकर्षण और आत्मीयता विकसित होने का समर्थन करता है; पीड़ित शुक्र संकेत दे सकता है कि संबंध में गर्माहट आने में अधिक समय लगे।',
          },
          {
            id:       'saturn',
            label:    'Saturn — Duty, Structure and Patience',
            label_hi: 'शनि — कर्तव्य, व्यवस्था और धैर्य',
            body:     'Saturn stands for duty, structure, patience and long-term commitment. When it influences the 7th house or its lord, it is often read as a practical, responsibility-minded approach to marriage — taking time, consulting family and preferring a considered decision over a sudden one. This is why Saturn appears so often in discussions of arranged marriage. Saturn is not automatically a sign of a difficult marriage or of delay; supported by benefics, it tends to describe a steady, dependable bond that grows over time. Heavy affliction may suggest a slower search or more formality at first.',
            body_hi:  'शनि कर्तव्य, व्यवस्था, धैर्य और दीर्घकालिक प्रतिबद्धता का ग्रह है। जब यह सप्तम भाव या सप्तमेश को प्रभावित करता है, तो अक्सर इसे विवाह के प्रति व्यावहारिक और ज़िम्मेदारी-भरे दृष्टिकोण के रूप में पढ़ा जाता है — समय लेना, परिवार से परामर्श करना और अचानक निर्णय के बजाय सोच-समझकर निर्णय लेना। इसीलिए अरेंज मैरिज की चर्चा में शनि अक्सर आता है। शनि अपने-आप कठिन विवाह या देरी का संकेत नहीं है; शुभ ग्रहों के समर्थन से यह स्थिर और भरोसेमंद संबंध दर्शाता है जो समय के साथ मज़बूत होता है। भारी पीड़न शुरुआत में धीमी खोज या अधिक औपचारिकता का संकेत दे सकता है।',
          },
          {
            id:       'moon',
            label:    'Moon — Emotional Comfort With Family',
            label_hi: 'चंद्रमा — परिवार के साथ भावनात्मक सहजता',
            body:     'The Moon shows the emotional mind and the comfort a person feels within the family. A steady, well-placed Moon tends to describe someone who is at ease with family involvement and adjusts well to a new household after marriage. An afflicted Moon may suggest that family-led decisions feel emotionally heavier, so the person needs more time and reassurance. The Moon’s wider role in long-term marital happiness belongs to the Married Life guide.',
            body_hi:  'चंद्रमा भावनात्मक मन और परिवार के बीच व्यक्ति की सहजता को दर्शाता है। स्थिर और अच्छी स्थिति वाला चंद्रमा ऐसे व्यक्ति को दिखाता है जो परिवार की भागीदारी में सहज रहता है और विवाह के बाद नए घर में अच्छी तरह ढल जाता है। पीड़ित चंद्रमा संकेत दे सकता है कि परिवार द्वारा लिए गए निर्णय भावनात्मक रूप से भारी लगें, इसलिए व्यक्ति को अधिक समय और भरोसे की ज़रूरत हो। दीर्घकालिक वैवाहिक सुख में चंद्रमा की व्यापक भूमिका वैवाहिक जीवन मार्गदर्शिका का विषय है।',
          },
          {
            id:       'sun',
            label:    'Sun — Father and Family Authority',
            label_hi: 'सूर्य — पिता और पारिवारिक अधिकार',
            body:     'The Sun represents the father, family authority and self-respect. A well-placed Sun tends to describe a person who respects family authority and sees a family-guided marriage as a dignified choice rather than a compromise. An afflicted Sun, or the Sun under Rahu’s influence, may suggest friction between personal identity and the expectations of the father or elders during the marriage decision.',
            body_hi:  'सूर्य पिता, पारिवारिक अधिकार और आत्मसम्मान का प्रतिनिधि है। अच्छी स्थिति वाला सूर्य ऐसे व्यक्ति को दर्शाता है जो परिवार के अधिकार का सम्मान करता है और परिवार द्वारा निर्देशित विवाह को समझौता नहीं, बल्कि गरिमापूर्ण चुनाव मानता है। पीड़ित सूर्य, या राहु से प्रभावित सूर्य, विवाह के निर्णय के समय व्यक्तिगत पहचान और पिता या बड़ों की अपेक्षाओं के बीच टकराव का संकेत दे सकता है।',
          },
          {
            id:       'mercury',
            label:    'Mercury — Communication and Negotiation',
            label_hi: 'बुध — संवाद और बातचीत',
            body:     'Mercury governs communication, discussion and negotiation — skills that matter in an arranged process, where expectations are discussed between two people and two families. A strong Mercury tends to support clear conversations with prospective partners and their families; an afflicted Mercury may suggest misunderstandings that are best handled by discussing expectations openly and early.',
            body_hi:  'बुध संवाद, चर्चा और बातचीत का ग्रह है — ये कौशल अरेंज प्रक्रिया में महत्वपूर्ण हैं, जहाँ अपेक्षाओं पर दो व्यक्तियों और दो परिवारों के बीच बात होती है। मज़बूत बुध संभावित साथी और उनके परिवार के साथ स्पष्ट बातचीत का समर्थन करता है; पीड़ित बुध ग़लतफ़हमियों का संकेत दे सकता है, जिन्हें अपेक्षाओं पर जल्दी और खुलकर बात करके संभालना बेहतर है।',
          },
          {
            id:       'mars',
            label:    'Mars — Initiative and Drive',
            label_hi: 'मंगल — पहल और उत्साह',
            body:     'Mars represents initiative and drive. In an arranged-marriage context it describes how actively a person takes part in the process rather than leaving everything to the family. A balanced Mars supports decisiveness; a heavily afflicted Mars on the 7th house may suggest impatience or friction during discussions, which Jupiter’s influence tends to soften.',
            body_hi:  'मंगल पहल और उत्साह का ग्रह है। अरेंज मैरिज के संदर्भ में यह बताता है कि व्यक्ति सब कुछ परिवार पर छोड़ने के बजाय प्रक्रिया में कितनी सक्रिय भूमिका निभाता है। संतुलित मंगल निर्णय-क्षमता का समर्थन करता है; सप्तम भाव पर भारी पीड़ित मंगल बातचीत के दौरान अधीरता या टकराव का संकेत दे सकता है, जिसे गुरु का प्रभाव नरम कर सकता है।',
          },
          {
            id:       'rahu',
            label:    'Rahu — The Unconventional Pull',
            label_hi: 'राहु — परंपरा से हटकर खिंचाव',
            body:     'Rahu represents the unconventional and the pull toward what lies outside familiar boundaries. Strong Rahu influence on the 7th house, the 7th lord or Venus tends to work against a purely traditional match — it can bring a partner from an unexpected background or a modern twist to a family-arranged process. It does not rule out an arranged marriage, but it often shifts the balance toward personal choice. Unions across caste or religion are covered in the Intercaste Marriage guide.',
            body_hi:  'राहु अपरंपरागत और परिचित सीमाओं से बाहर की ओर खिंचाव का प्रतीक है। सप्तम भाव, सप्तमेश या शुक्र पर राहु का मज़बूत प्रभाव पूरी तरह पारंपरिक रिश्ते के विपरीत काम कर सकता है — यह अनपेक्षित पृष्ठभूमि वाला साथी या परिवार द्वारा तय प्रक्रिया में आधुनिक मोड़ ला सकता है। यह अरेंज मैरिज को नकारता नहीं, पर अक्सर संतुलन को व्यक्तिगत पसंद की ओर ले जाता है। जाति या धर्म से अलग विवाह अंतरजातीय विवाह मार्गदर्शिका में समझाए गए हैं।',
          },
          {
            id:       'ketu',
            label:    'Ketu — Detachment',
            label_hi: 'केतु — विरक्ति',
            body:     'Ketu represents detachment and inward focus. Ketu on the 7th house may describe a person who is less invested in the search itself and comfortable letting the family take the lead — or, at times, someone who feels distant from the process. With benefic support it can describe a calm, spiritually minded partnership; without it, the bond may need conscious effort to grow warm.',
            body_hi:  'केतु विरक्ति और अंतर्मुखता का प्रतीक है। सप्तम भाव में केतु ऐसे व्यक्ति को दर्शा सकता है जो स्वयं खोज में कम रुचि रखता है और परिवार को आगे बढ़ने देने में सहज है — या कभी-कभी ऐसा व्यक्ति जो इस प्रक्रिया से दूरी महसूस करता है। शुभ ग्रहों के समर्थन से यह शांत और आध्यात्मिक साझेदारी दर्शा सकता है; इसके बिना संबंध में गर्माहट लाने के लिए सचेत प्रयास की ज़रूरत हो सकती है।',
          },
        ],
      },

      {
        id:       'navamsa-supporting',
        title:    'Navamsa and Supporting Indicators',
        title_hi: 'नवांश और सहायक संकेतक',
        layout:   'list',
        items: [
          {
            id:       'navamsa',
            label:    'Navamsa (D9) — A Supporting Check',
            label_hi: 'नवांश (D9) — एक सहायक जाँच',
            body:     'The Navamsa (D9) is the divisional chart traditionally used to examine marriage in depth. For this question it acts as a supporting check rather than a verdict: if the D9 7th lord and the D9 placements repeat the family-oriented themes seen in the birth chart — links with the 2nd, 9th or 11th, or Jupiter’s influence — the arranged-marriage indication is considered stronger. If the D9 points in a different direction, the reading stays mixed.',
            body_hi:  'नवांश (D9) वह वर्ग कुंडली है जिससे परंपरागत रूप से विवाह का गहराई से विश्लेषण किया जाता है। इस प्रश्न में यह अंतिम निर्णय नहीं, बल्कि सहायक जाँच है: यदि नवांश का सप्तमेश और नवांश की स्थितियाँ जन्मकुंडली के परिवार-केंद्रित विषयों को दोहराएँ — द्वितीय, नवम या एकादश से संबंध, या गुरु का प्रभाव — तो अरेंज मैरिज का संकेत अधिक मज़बूत माना जाता है। यदि नवांश किसी अन्य दिशा में संकेत करे, तो निष्कर्ष मिश्रित रहता है।',
          },
          {
            id:       'darakaraka',
            label:    'Darakaraka (DK)',
            label_hi: 'दाराकारक (DK)',
            body:     'In the Jaimini system, the Darakaraka — the planet with the lowest degree in the chart — is a significator of the spouse. It is mainly used to describe the partner’s nature, which is covered in the Spouse Nature guide; for the love-or-arranged question it is only a minor supporting factor.',
            body_hi:  'जैमिनी पद्धति में दाराकारक — कुंडली में सबसे कम अंश वाला ग्रह — जीवनसाथी का कारक माना जाता है। इसका मुख्य उपयोग जीवनसाथी के स्वभाव को समझने में होता है, जिसे जीवनसाथी के स्वभाव वाली मार्गदर्शिका में बताया गया है; लव या अरेंज के प्रश्न में यह केवल एक छोटा सहायक कारक है।',
          },
          {
            id:       'upapada',
            label:    'Upapada Lagna (UL)',
            label_hi: 'उपपद लग्न (UL)',
            body:     'The Upapada Lagna (UL) is a Jaimini point used to judge the marriage itself and how well it is sustained. Its connection with the 2nd house or Jupiter is sometimes read as support for a family-sanctioned union, but its main role concerns the stability of married life rather than how the marriage is arranged.',
            body_hi:  'उपपद लग्न (UL) जैमिनी पद्धति का एक बिंदु है, जिससे विवाह और उसकी स्थिरता का विचार किया जाता है। द्वितीय भाव या गुरु से इसका संबंध कभी-कभी परिवार द्वारा स्वीकृत विवाह का समर्थन माना जाता है, पर इसकी मुख्य भूमिका विवाह कैसे तय होता है, इससे अधिक वैवाहिक जीवन की स्थिरता से जुड़ी है।',
          },
        ],
      },

      {
        id:       'love-or-arranged',
        title:    'Love or Arranged? How Astrologers Weigh It',
        title_hi: 'लव या अरेंज? ज्योतिषी इसे कैसे तौलते हैं',
        layout:   'list',
        items: [
          {
            id:       'reading-both-sides',
            label:    'Reading Both Sides of the Chart',
            label_hi: 'कुंडली के दोनों पक्षों को पढ़ना',
            body:     'When people ask “will my marriage be love or arranged?”, astrologers compare two sets of indications. A strong 5th–7th emphasis — romance connected with marriage — may support a self-chosen, romantic path. A stronger 2nd, 9th or 11th emphasis on the 7th house — family, tradition and community — may support a family-assisted path. Many charts contain both, and in real life the result is often a blend: a couple who meet on their own and then seek family approval, or a family introduction that turns into genuine romance. That is why the whole chart is read together, along with personal choice and circumstances. The love-marriage side of this comparison is explained in the Love Marriage guide linked below.',
            body_hi:  'जब लोग पूछते हैं "मेरा विवाह लव होगा या अरेंज?", तो ज्योतिषी संकेतों के दो समूहों की तुलना करते हैं। पंचम–सप्तम पर अधिक बल — प्रेम का विवाह से जुड़ना — स्वयं चुने गए, प्रेम-आधारित मार्ग का समर्थन कर सकता है। सप्तम भाव पर द्वितीय, नवम या एकादश भाव का अधिक बल — परिवार, परंपरा और समाज — परिवार की सहायता वाले मार्ग का समर्थन कर सकता है। कई कुंडलियों में दोनों प्रकार के संकेत होते हैं, और वास्तविक जीवन में परिणाम अक्सर मिला-जुला होता है: युगल स्वयं मिलते हैं और फिर परिवार की स्वीकृति लेते हैं, या परिवार द्वारा कराया गया परिचय सच्चे प्रेम में बदल जाता है। इसीलिए पूरी कुंडली को व्यक्तिगत पसंद और परिस्थितियों के साथ मिलाकर पढ़ा जाता है। इस तुलना का प्रेम विवाह वाला पक्ष नीचे दी गई प्रेम विवाह मार्गदर्शिका में समझाया गया है।',
          },
        ],
      },

      {
        id:       'family-introductions-matching',
        title:    'Family, Introductions and Kundli Matching',
        title_hi: 'परिवार, रिश्ते और कुंडली मिलान',
        layout:   'list',
        items: [
          {
            id:       'how-introductions-arrive',
            label:    'How Introductions Usually Arrive',
            label_hi: 'रिश्ते आमतौर पर कैसे आते हैं',
            body:     'In a family-assisted marriage, proposals usually come through relatives, family friends, community networks or matrimonial platforms, and the families meet before the couple decides. Astrologically, these channels are described by the 2nd house (family), the 9th house (elders) and the 11th house (social network). The couple’s own consent remains central — an arranged process is an introduction and a shared decision, not a decision taken without the people who will marry.',
            body_hi:  'परिवार की सहायता से होने वाले विवाह में रिश्ते आमतौर पर रिश्तेदारों, पारिवारिक मित्रों, सामाजिक दायरे या वैवाहिक मंचों के माध्यम से आते हैं, और युगल के निर्णय से पहले परिवार मिलते हैं। ज्योतिष में इन माध्यमों को द्वितीय भाव (परिवार), नवम भाव (बड़े-बुज़ुर्ग) और एकादश भाव (सामाजिक दायरा) से देखा जाता है। युगल की अपनी सहमति केंद्र में रहती है — अरेंज प्रक्रिया एक परिचय और साझा निर्णय है, विवाह करने वाले व्यक्तियों के बिना लिया गया निर्णय नहीं।',
          },
          {
            id:       'specific-proposal-matching',
            label:    'When a Specific Proposal Arrives',
            label_hi: 'जब कोई विशेष रिश्ता सामने हो',
            body:     'Reading one person’s chart for an arranged-marriage tendency is a different task from comparing two charts. Once a specific proposal or partner is being considered, families traditionally use kundli matching — Guna Milan, a Manglik assessment and a wider comparison of both charts. That process is explained in the Compatibility guide linked below.',
            body_hi:  'किसी एक व्यक्ति की कुंडली में अरेंज मैरिज की प्रवृत्ति देखना, दो कुंडलियों की तुलना से अलग काम है। जब कोई विशेष रिश्ता या साथी विचार में हो, तो परिवार परंपरागत रूप से कुंडली मिलान करते हैं — गुण मिलान, मांगलिक विचार और दोनों कुंडलियों की व्यापक तुलना। यह प्रक्रिया नीचे दी गई अनुकूलता मार्गदर्शिका में समझाई गई है।',
          },
        ],
      },

      {
        id:       'dasha-activation',
        title:    'Dasha: Are Arranged-Marriage Indications Active?',
        title_hi: 'दशा: क्या अरेंज मैरिज के योग सक्रिय हैं?',
        layout:   'checklist',
        items: [
          {
            id:       'dasha-activates-promise',
            label:    'A Dasha activates what the birth chart already shows',
            label_hi: 'दशा वही सक्रिय करती है जो जन्मकुंडली में पहले से है',
            body:     'A Mahadasha or Antardasha cannot create an arranged-marriage tendency that the birth chart does not show; it brings existing combinations into focus. When the running period belongs to the 7th lord, Venus, Jupiter, or the lords of the 2nd, 9th or 11th houses, marriage and family involvement tend to become more prominent themes — for example, family members actively looking for proposals.',
            body_hi:  'महादशा या अंतर्दशा ऐसी अरेंज मैरिज प्रवृत्ति नहीं बना सकती जो जन्मकुंडली में न हो; यह पहले से मौजूद संयोजनों को सक्रिय करती है। जब चल रही अवधि सप्तमेश, शुक्र, गुरु या द्वितीय, नवम अथवा एकादश भाव के स्वामी की हो, तो विवाह और उसमें परिवार की भागीदारी जीवन के अधिक प्रमुख विषय बन सकते हैं — जैसे परिवार का सक्रिय रूप से रिश्ते देखना।',
          },
          {
            id:       'dasha-not-a-date',
            label:    'Activation is not a marriage date',
            label_hi: 'सक्रियता का अर्थ विवाह की तारीख नहीं',
            body:     'An active period suggests that marriage-related indications are relevant now. It does not decide whether the marriage will be arranged, and it does not fix when it will happen. Estimating timing combines Dasha with the Navamsa and the transits of Jupiter and Saturn — that method is explained in the Marriage Timing guide linked below.',
            body_hi:  'सक्रिय अवधि यह संकेत देती है कि विवाह से जुड़े योग अभी प्रासंगिक हैं। यह न तो तय करती है कि विवाह अरेंज होगा, न ही यह कि विवाह कब होगा। समय का अनुमान दशा, नवांश और गुरु-शनि के गोचर को मिलाकर लगाया जाता है — यह विधि नीचे दी गई विवाह के समय की मार्गदर्शिका में समझाई गई है।',
          },
        ],
      },

      {
        id:       'common-misconceptions',
        title:    'Common Misconceptions',
        title_hi: 'सामान्य भ्रांतियाँ',
        layout:   'checklist',
        items: [
          {
            id:       'no-choice',
            label:    'Myth: An arranged marriage means no choice',
            label_hi: 'भ्रम: अरेंज मैरिज में अपनी कोई पसंद नहीं होती',
            body:     'Even when the chart favors a family-assisted path, the person keeps the choice to accept or decline a proposal. An arranged process is meant to be a collaboration between the individual and the family.',
            body_hi:  'जब कुंडली परिवार की सहायता वाले मार्ग का समर्थन करती है, तब भी व्यक्ति के पास किसी रिश्ते को स्वीकार या अस्वीकार करने का विकल्प रहता है। अरेंज प्रक्रिया व्यक्ति और परिवार के बीच सहयोग के रूप में होती है।',
          },
          {
            id:       'joyless',
            label:    'Myth: Arranged marriages are joyless',
            label_hi: 'भ्रम: अरेंज मैरिज में सुख नहीं होता',
            body:     'The chart describes how a marriage is likely to begin, not how happy it will be. The quality of married life is read from other factors, covered in the Married Life guide.',
            body_hi:  'कुंडली बताती है कि विवाह की शुरुआत कैसे होने की संभावना है, यह नहीं कि वह कितना सुखी होगा। वैवाहिक जीवन की गुणवत्ता अन्य कारकों से देखी जाती है, जिन पर वैवाहिक जीवन मार्गदर्शिका में बताया गया है।',
          },
          {
            id:       'one-planet-decides',
            label:    'Myth: One planet decides love or arranged',
            label_hi: 'भ्रम: एक ग्रह तय करता है कि विवाह लव होगा या अरेंज',
            body:     'Jupiter, Venus or Saturn alone cannot settle the question. The answer depends on how the 7th lord, the family houses and the 5th house combine across the whole chart.',
            body_hi:  'अकेले गुरु, शुक्र या शनि इस प्रश्न का उत्तर नहीं दे सकते। उत्तर इस पर निर्भर करता है कि पूरी कुंडली में सप्तमेश, परिवार से जुड़े भाव और पंचम भाव कैसे मिलकर काम करते हैं।',
          },
          {
            id:       'love-against-chart',
            label:    'Myth: Choosing a love marriage goes “against” the chart',
            label_hi: 'भ्रम: लव मैरिज चुनना कुंडली के "विरुद्ध" है',
            body:     'Astrology describes tendencies and relative ease, not moral correctness. Neither path is better; either can be fulfilling when both partners put in the effort.',
            body_hi:  'ज्योतिष प्रवृत्तियों और सहजता का वर्णन करता है, नैतिक सही-ग़लत का नहीं। कोई भी मार्ग दूसरे से बेहतर नहीं है; दोनों में से कोई भी तब सुखद हो सकता है जब दोनों साथी प्रयास करें।',
          },
        ],
      },

      {
        id:       'practical-remedies',
        title:    'Balanced, Optional Remedies',
        title_hi: 'संतुलित और वैकल्पिक उपाय',
        layout:   'checklist',
        items: [
          {
            id:       'seva',
            label:    'Selfless Service (Seva)',
            label_hi: 'निस्वार्थ सेवा',
            body:     'Serving family and community is traditionally linked with the 2nd and 4th houses and supports patience and goodwill during a family-led search.',
            body_hi:  'परिवार और समाज की सेवा को परंपरागत रूप से द्वितीय और चतुर्थ भाव से जोड़ा जाता है; यह परिवार द्वारा चल रही खोज के दौरान धैर्य और सद्भाव बनाए रखने में सहायक है।',
          },
          {
            id:       'mantras',
            label:    'Mantra Japa',
            label_hi: 'मंत्र जप',
            body:     'Chanting mantras for Jupiter or Venus is a traditional practice for cultivating wisdom and warmth. Treat it as optional support for your own state of mind, not a way to compel a proposal or an outcome.',
            body_hi:  'गुरु या शुक्र के मंत्रों का जप ज्ञान और आत्मीयता बढ़ाने का पारंपरिक अभ्यास है। इसे अपनी मानसिक स्थिति के लिए वैकल्पिक सहायता मानें, किसी रिश्ते या परिणाम को बाध्य करने का साधन नहीं।',
          },
          {
            id:       'open-conversation',
            label:    'Open Conversation',
            label_hi: 'खुली बातचीत',
            body:     'Discussing expectations early — with your family and with prospective partners — is one of the most practical steps in any arranged process.',
            body_hi:  'अपनी अपेक्षाओं पर जल्दी बात करना — अपने परिवार से भी और संभावित साथी से भी — किसी भी अरेंज प्रक्रिया का सबसे व्यावहारिक कदम है।',
          },
          {
            id:       'patience',
            label:    'Patience',
            label_hi: 'धैर्य',
            body:     'Introductions take time. Patience and clarity about your own priorities help more than any single remedy.',
            body_hi:  'रिश्ते आने में समय लगता है। धैर्य और अपनी प्राथमिकताओं की स्पष्टता किसी एक उपाय से अधिक सहायक होती है।',
          },
        ],
      },

      {
        id:       'faq-section',
        title:    'Frequently Asked Questions',
        title_hi: 'अक्सर पूछे जाने वाले प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-kundli-indicate',
            label:    'Can a kundli indicate an arranged marriage?',
            label_hi: 'क्या कुंडली से अरेंज मैरिज का संकेत मिल सकता है?',
            body:     'A kundli can indicate a tendency toward a family-assisted marriage, not a certainty. Astrologers look for the 7th lord connecting with the 2nd, 9th or 11th house lords, Jupiter’s influence on the 7th, a relatively weak 5th–7th link and supporting confirmation in the Navamsa. When several of these appear together, the chart tends to support an arranged path; personal choice and circumstances still shape the outcome.',
            body_hi:  'कुंडली परिवार की सहायता वाले विवाह की ओर प्रवृत्ति का संकेत दे सकती है, निश्चितता का नहीं। ज्योतिषी देखते हैं कि सप्तमेश द्वितीय, नवम या एकादश भाव के स्वामियों से जुड़ा है या नहीं, सप्तम भाव पर गुरु का प्रभाव है या नहीं, पंचम–सप्तम संबंध अपेक्षाकृत कमज़ोर है या नहीं, और नवांश से इसकी पुष्टि होती है या नहीं। जब इनमें से कई संकेत एक साथ हों, तो कुंडली अरेंज मार्ग का समर्थन करती है; फिर भी व्यक्तिगत पसंद और परिस्थितियाँ परिणाम को आकार देती हैं।',
          },
          {
            id:       'faq-which-houses',
            label:    'Which houses are considered for arranged marriage?',
            label_hi: 'अरेंज मैरिज के लिए कौन-से भाव देखे जाते हैं?',
            body:     'The 7th house and its lord are central. They are read together with the 2nd house (family), the 9th house (tradition and elders) and the 11th house (social and community network). The 5th house is checked as the counterweight for romance, and the 4th and 10th houses add supporting context about home and social standing.',
            body_hi:  'सप्तम भाव और सप्तमेश केंद्रीय हैं। इन्हें द्वितीय भाव (परिवार), नवम भाव (परंपरा और बड़े-बुज़ुर्ग) और एकादश भाव (सामाजिक और सामुदायिक दायरा) के साथ पढ़ा जाता है। प्रेम के संतुलन के रूप में पंचम भाव देखा जाता है, और चतुर्थ व दशम भाव घर और सामाजिक प्रतिष्ठा के बारे में सहायक संदर्भ देते हैं।',
          },
          {
            id:       'faq-jupiter-venus-alone',
            label:    'Does Jupiter or Venus alone indicate an arranged marriage?',
            label_hi: 'क्या अकेले गुरु या शुक्र अरेंज मैरिज का संकेत देते हैं?',
            body:     'No. Jupiter’s influence on the 7th house supports a traditional, family-blessed path, and Venus supports marriage in general, but neither decides the question alone. Venus in particular can lean either way depending on its connections. Both are read alongside the 7th lord and the family houses.',
            body_hi:  'नहीं। सप्तम भाव पर गुरु का प्रभाव पारंपरिक, परिवार के आशीर्वाद वाले मार्ग का समर्थन करता है, और शुक्र सामान्य रूप से विवाह का समर्थन करता है, पर दोनों में से कोई भी अकेले यह प्रश्न तय नहीं करता। विशेषकर शुक्र अपने संबंधों के अनुसार किसी भी ओर झुक सकता है। दोनों को सप्तमेश और परिवार से जुड़े भावों के साथ पढ़ा जाता है।',
          },
          {
            id:       'faq-no-say',
            label:    'Does an arranged marriage mean I have no say?',
            label_hi: 'क्या अरेंज मैरिज का अर्थ है कि मेरी कोई राय नहीं होगी?',
            body:     'No. A chart that favors a family-assisted path describes how introductions are likely to come about, not who makes the final decision. In practice, an arranged process works best as a collaboration: the family helps find and introduce, and the couple decides. Your consent and judgment remain central.',
            body_hi:  'नहीं। परिवार की सहायता वाले मार्ग का समर्थन करने वाली कुंडली यह बताती है कि परिचय कैसे होने की संभावना है, यह नहीं कि अंतिम निर्णय कौन लेगा। व्यवहार में अरेंज प्रक्रिया सहयोग के रूप में सबसे अच्छी चलती है: परिवार खोजने और मिलवाने में मदद करता है, और निर्णय युगल लेता है। आपकी सहमति और समझ केंद्र में रहती है।',
          },
          {
            id:       'faq-love-develop',
            label:    'Can love develop before or within an arranged marriage?',
            label_hi: 'क्या अरेंज मैरिज से पहले या उसके भीतर प्रेम विकसित हो सकता है?',
            body:     'Yes. Many arranged marriages include a period of getting to know each other, and affection often grows after the wedding. Astrologically, a well-placed Venus or a supportive 5th lord can suggest warmth developing within a family-arranged match. How the relationship grows over the years is covered in the Married Life guide.',
            body_hi:  'हाँ। कई अरेंज मैरिज में एक-दूसरे को जानने का समय होता है, और विवाह के बाद भी स्नेह अक्सर बढ़ता है। ज्योतिष में अच्छी स्थिति वाला शुक्र या सहायक पंचमेश परिवार द्वारा तय रिश्ते में भी आत्मीयता विकसित होने का संकेत दे सकता है। वर्षों में संबंध कैसे बढ़ता है, यह वैवाहिक जीवन मार्गदर्शिका में बताया गया है।',
          },
          {
            id:       'faq-saturn-seventh',
            label:    'Does Saturn on the 7th mean a difficult arranged marriage?',
            label_hi: 'क्या सप्तम भाव में शनि का अर्थ कठिन अरेंज मैरिज है?',
            body:     'Not necessarily. Saturn on the 7th house is often read as a serious, duty-minded approach to marriage and a preference for a considered, family-consulted decision. It may bring formality or a slower start, but with benefic support it tends to describe a stable bond that strengthens over time.',
            body_hi:  'ज़रूरी नहीं। सप्तम भाव में शनि को अक्सर विवाह के प्रति गंभीर और कर्तव्य-प्रधान दृष्टिकोण, तथा परिवार से परामर्श करके सोच-समझकर निर्णय लेने की पसंद के रूप में पढ़ा जाता है। इससे औपचारिकता या धीमी शुरुआत हो सकती है, पर शुभ ग्रहों के समर्थन से यह स्थिर संबंध दर्शाता है जो समय के साथ मज़बूत होता है।',
          },
          {
            id:       'faq-dasha-decide',
            label:    'Does the Dasha decide whether my marriage will be arranged?',
            label_hi: 'क्या दशा तय करती है कि मेरा विवाह अरेंज होगा?',
            body:     'No. The Dasha shows when the marriage indications already present in the birth chart become active — for example, a period when family members begin looking for proposals. It does not turn a romance-leaning chart into an arranged one. When marriage itself may happen is explained in the Marriage Timing guide.',
            body_hi:  'नहीं। दशा बताती है कि जन्मकुंडली में पहले से मौजूद विवाह के योग कब सक्रिय होते हैं — जैसे वह अवधि जब परिवार रिश्ते देखना शुरू करता है। यह प्रेम की ओर झुकी कुंडली को अरेंज वाली कुंडली नहीं बनाती। विवाह कब हो सकता है, यह विवाह के समय की मार्गदर्शिका में समझाया गया है।',
          },
          {
            id:       'faq-guarantee',
            label:    'Can astrology guarantee whether my marriage will be love or arranged?',
            label_hi: 'क्या ज्योतिष गारंटी दे सकता है कि मेरा विवाह लव होगा या अरेंज?',
            body:     'No. Astrology shows tendencies and relative ease — which path the chart supports more naturally. Many charts carry both love and arranged indications, and personal choice, family and circumstances shape the result. For the love-marriage side of the question, see the Love Marriage guide.',
            body_hi:  'नहीं। ज्योतिष प्रवृत्तियाँ और सहजता दिखाता है — कि कुंडली किस मार्ग का अधिक स्वाभाविक समर्थन करती है। कई कुंडलियों में लव और अरेंज दोनों के संकेत होते हैं, और व्यक्तिगत पसंद, परिवार और परिस्थितियाँ परिणाम तय करती हैं। प्रश्न के प्रेम विवाह वाले पक्ष के लिए प्रेम विवाह मार्गदर्शिका देखें।',
          },
        ],
      },

    ],
    ctas: [
      {
        id:             'cta-marriage-path',
        type:           'tool',
        slug:           'marriage-path',
        label:          'Explore Your Marriage Path',
        label_hi:       'अपना विवाह मार्ग देखें',
        description:    'A free, general 7th-house marriage check based on your birth details.',
        description_hi: 'आपके जन्म विवरण पर आधारित सप्तम भाव की निःशुल्क, सामान्य विवाह जांच।',
        variant:        'primary',
      },
      {
        id:             'cta-marriage-report',
        type:           'report',
        slug:           'marriage_report',
        label:          'Get a Personalised Marriage Report',
        label_hi:       'व्यक्तिगत विवाह रिपोर्ट प्राप्त करें',
        description:    'A personalised PDF report based on your birth chart.',
        description_hi: 'आपकी जन्म कुंडली पर आधारित व्यक्तिगत PDF रिपोर्ट।',
        variant:        'secondary',
      },
    ],
  },
  aiMetadata: {
    searchIntent:   'informational',
    difficulty:     'intermediate',
    authorityLevel: 'standard',
  },
  schemaSignals: {
    expertise:     'Authored by Vedic astrologers specializing in arranged-marriage indications, 7th house analysis and the family houses (2nd, 9th, 11th).',
    // First authored in commit 7cd8637 (2026-07-20, "marriage hub").
    datePublished: '2026-07-20',
  },
  authority: {
    reviewStatus:   'not-reviewed',
    contentVersion: 2,
    // AM-2 restructure (direct answer, arranged-marriage indications, SSR houses/planets + FAQ).
    lastUpdated:    '2026-10-05',
  },
  publishing: {
    isIndexable:     false,
    isSearchEnabled: false,
    visibility:      'private',
  },
}
