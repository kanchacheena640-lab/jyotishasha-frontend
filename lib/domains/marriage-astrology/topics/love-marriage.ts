import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const loveMarriage: DomainTopic = {

  identity: {
    id:         'marriage-astrology:love-marriage',
    slug:       'love-marriage',
    title:      'Love Marriage in Vedic Astrology: Will I Have a Love Marriage?',
    title_hi:   'वैदिक ज्योतिष में प्रेम विवाह: क्या मेरा प्रेम विवाह होगा?',
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
    metaTitle:          'Love Marriage in Vedic Astrology: Planets, Yogas & Signs',
    metaDescription:    'Will I have a love marriage? See how Vedic astrology reads love-marriage indications in a kundli: the 5th–7th house link, Venus, Rahu, Mars, yogas and Dasha.',
    metaDescription_hi: 'क्या मेरा प्रेम विवाह होगा? जानें वैदिक ज्योतिष कुंडली में प्रेम विवाह के संकेत कैसे देखता है — पंचम–सप्तम भाव संबंध, शुक्र, राहु, मंगल, योग और दशा।',
    robots:             'noindex,follow',
  },

  hero: {
    headline:    'Love Marriage in Vedic Astrology: What Your Chart Reveals',
    headline_hi: 'वैदिक ज्योतिष में प्रेम विवाह: आपकी कुंडली क्या बताती है',
    subtext:     'How a kundli is read for love marriage — the 5th and 7th houses, Venus, Rahu and Mars, key yogas and the running Dasha — and what kind of answer it can realistically give.',
    subtext_hi:  'कुंडली में प्रेम विवाह कैसे देखा जाता है — पंचम और सप्तम भाव, शुक्र, राहु और मंगल, प्रमुख योग और चल रही दशा — और इससे किस तरह का उत्तर मिल सकता है।',
  },

  taxonomy: {
    tags:        ['love-marriage', 'vedic-astrology', 'marriage-yogas', '5th-house', '7th-house', 'venus', 'rahu'],
    keywords:    ['love marriage astrology', 'love marriage in vedic astrology', 'will i have a love marriage', 'love marriage yoga', '5th house 7th house connection', 'venus rahu love marriage', 'gandharva vivah'],
    keywords_hi: ['प्रेम विवाह ज्योतिष', 'वैदिक ज्योतिष में प्रेम विवाह', 'क्या मेरा प्रेम विवाह होगा', 'प्रेम विवाह योग', 'शुक्र राहु प्रेम विवाह'],
    hubPriority: 'featured',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'intro',
        title:    'What Love Marriage Means in a Birth Chart',
        title_hi: 'कुंडली में प्रेम विवाह का अर्थ',
        layout:   'list',
        items: [
          {
            id:       'intro-romance-to-marriage',
            label:    'Romance That Develops Into Marriage',
            label_hi: 'प्रेम जो विवाह में बदलता है',
            body:     'In astrology, a love marriage means a relationship that begins with personal attraction and choice and then develops into marriage. Classical texts call a union based on the mutual consent of the couple Gandharva Vivah. A chart is read for how strongly it supports romance turning into a committed partnership — not for whether such a choice is right or wrong.',
            body_hi:  'ज्योतिष में प्रेम विवाह का अर्थ है ऐसा संबंध जो व्यक्तिगत आकर्षण और पसंद से शुरू होकर विवाह तक पहुँचे। शास्त्रीय ग्रंथ युगल की आपसी सहमति पर आधारित विवाह को गंधर्व विवाह कहते हैं। कुंडली से यह देखा जाता है कि वह प्रेम के प्रतिबद्ध साझेदारी में बदलने का कितना समर्थन करती है — यह नहीं कि ऐसा चुनाव सही है या गलत।',
          },
          {
            id:       'intro-love-vs-family-guided',
            label:    'How It Differs From a Family-Guided Pattern',
            label_hi: 'परिवार-निर्देशित विवाह से यह कैसे अलग है',
            body:     'Traditionally, the 9th house (family tradition, elders) and the 10th house (social standing, duty) are associated with family-guided alliances, while the 5th house (romance, emotional attraction) is associated with self-chosen relationships. When the 5th house and its lord connect more strongly with the 7th house of marriage, the chart tends to support a partner chosen through personal connection. Many charts show both patterns, and many marriages combine the two.',
            body_hi:  'परंपरागत रूप से 9वाँ भाव (पारिवारिक परंपरा, बड़े-बुज़ुर्ग) और 10वाँ भाव (सामाजिक प्रतिष्ठा, कर्तव्य) परिवार द्वारा तय विवाह से जुड़े माने जाते हैं, जबकि पंचम भाव (प्रेम, भावनात्मक आकर्षण) स्वयं चुने गए संबंधों से। जब पंचम भाव और पंचमेश विवाह के सप्तम भाव से अधिक मज़बूती से जुड़ते हैं, तो कुंडली व्यक्तिगत जुड़ाव से चुने गए साथी का समर्थन करती है। कई कुंडलियों में दोनों प्रवृत्तियाँ दिखती हैं, और कई विवाहों में दोनों का मेल होता है।',
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
            body:     'The 5th house is the house of Purva Punya — traditionally linked with merit carried from past lives. It governs attraction, emotional fervor and the "falling in love" phase. A strong 5th lord in a favorable position is one of the first factors astrologers check for a love-marriage tendency.',
            body_hi:  'पंचम भाव पूर्व पुण्य का भाव है — परंपरा में इसे पिछले जन्मों के पुण्य से जोड़ा जाता है। यह आकर्षण, भावनात्मक उत्साह और "प्यार में पड़ने" का भाव है। प्रेम विवाह की प्रवृत्ति देखने में ज्योतिषी सबसे पहले जिन बातों को जाँचते हैं, उनमें अच्छी स्थिति वाला मज़बूत पंचमेश प्रमुख है।',
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
            label:    'The Key 5th-7th Link',
            label_hi: 'प्रमुख पंचम-सप्तम संबंध',
            body:     'A link between the 5th and 7th houses is one of the strongest supporting factors for a love-based union. It usually appears in three forms: Parivartana Yoga — the 5th lord sits in the 7th and the 7th lord in the 5th (an exchange that strongly supports a self-chosen marriage); Conjunction — the 5th and 7th lords sit together, fusing passion with commitment; Mutual Aspect — the lords aspect each other, bridging romance and partnership. A link is weighed together with Venus, the strength of both lords and the rest of the chart; on its own it is not a verdict.',
            body_hi:  'पंचम और सप्तम भाव के बीच संबंध प्रेम-आधारित विवाह के सबसे मज़बूत सहायक कारकों में से एक है। यह आमतौर पर तीन रूपों में दिखता है: परिवर्तन योग (पंचमेश सप्तम में और सप्तमेश पंचम में — यह स्वयं चुने गए विवाह का मज़बूत समर्थन करता है), युति (दोनों स्वामी एक साथ), या परस्पर दृष्टि। इस संबंध को शुक्र, दोनों स्वामियों की शक्ति और बाकी कुंडली के साथ मिलाकर देखा जाता है; अकेले यह कोई अंतिम निर्णय नहीं है।',
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
            body:     'Venus is the natural significator of beauty, love, and intimacy. In love marriages, Venus often sits in an angular house or is connected to the 5th or 7th lord. When Venus is associated with Rahu, attraction tends to become intense and unconventional — sometimes drawing the person toward a partner outside family or social expectations.',
            body_hi:  'शुक्र प्रेम और आकर्षण का प्राकृतिक कारक है। प्रेम विवाह में, शुक्र प्रायः एक कोणीय भाव में या 5वें/7वें स्वामी से जुड़ा होता है। शुक्र-राहु का संबंध आकर्षण को तीव्र और अपरंपरागत बना सकता है।',
          },
          {
            id:       'planet-mars',
            icon:     '🔴',
            label:    'Mars — The Passionate Driver',
            label_hi: 'मंगल — जुनून का चालक',
            body:     'Mars brings the heat. Attraction without Mars is often lukewarm. A connection between Venus and Mars is a classic signature for active romance — it gives the courage to pursue the desired person regardless of hurdles. Charts where the individual "fought" for their union often show a Venus-Mars connection.',
            body_hi:  'मंगल गर्मी लाता है। शुक्र-मंगल का संबंध सक्रिय रोमांस की क्लासिक पहचान है — यह बाधाओं के बावजूद चाहे गए व्यक्ति का पीछा करने का साहस देता है।',
          },
          {
            id:       'planet-rahu',
            icon:     '🌑',
            label:    'Rahu — The Boundary Breaker',
            label_hi: 'राहु — सीमाओं का तोड़ने वाला',
            body:     'Rahu is often prominent in the charts of love marriages. When Rahu influences the 7th house, the 5th house or Venus, it tends to push the person beyond conventional expectations in relationships and toward choices driven by intensity rather than family convention. It is one influence among several — many love marriages show little Rahu involvement.',
            body_hi:  'प्रेम विवाह की कुंडलियों में राहु अक्सर प्रमुख दिखता है। जब राहु 7वें भाव, 5वें भाव या शुक्र पर प्रभाव डालता है, तो यह संबंधों में व्यक्ति को परंपरागत अपेक्षाओं से आगे बढ़ने की ओर प्रेरित कर सकता है। यह कई प्रभावों में से एक है — कई प्रेम विवाहों में राहु की भूमिका बहुत कम होती है।',
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
            body:     'The Moon rules the mind and emotions, so it shows how steady the attraction is. A well-placed Moon tends to support feelings that mature into commitment; a poorly placed or afflicted Moon may make attraction intense but changeable, so a relationship needs more time before it settles into a decision about marriage.',
            body_hi:  'चंद्रमा मन और भावनाओं का स्वामी है, इसलिए यह दिखाता है कि आकर्षण कितना स्थिर है। अच्छी स्थिति वाला चंद्रमा भावनाओं को प्रतिबद्धता तक पहुँचाने में सहायक होता है; पीड़ित चंद्रमा आकर्षण को तीव्र पर बदलने वाला बना सकता है, जिससे विवाह के निर्णय तक पहुँचने में अधिक समय लग सकता है।',
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
            body:     'When the 5th lord and 7th lord are both strong and placed in a Kendra (angular house: 1st, 4th, 7th, 10th) or Trikona (trine: 1st, 5th, 9th) with benefic influence, this combination is traditionally read as support for a love marriage that can also win acceptance from family and society.',
            body_hi:  'जब पंचमेश और सप्तमेश दोनों मजबूत हों और शुभ प्रभाव के साथ केंद्र या त्रिकोण भाव में स्थित हों, तो परंपरागत रूप से इसे ऐसे प्रेम विवाह का समर्थन माना जाता है जिसे परिवार और समाज की स्वीकृति भी मिल सकती है।',
          },
          {
            id:       'yoga-venus-rahu-mars',
            label:    'Venus-Rahu and Venus-Mars Conjunctions',
            label_hi: 'शुक्र-राहु और शुक्र-मंगल युति',
            body:     'These are among the strongest indicators of actively pursuing a love marriage. Venus-Rahu is the magnetic-pull combination — unconventional, boundary-crossing attraction. Venus-Mars is the pursuit combination — the drive and courage to act on romantic desire. One or both are frequently seen when a love marriage was a deliberate, active choice, though neither is required.',
            body_hi:  'ये सक्रिय रूप से प्रेम विवाह की ओर बढ़ने के सबसे मजबूत संकेतों में से हैं। शुक्र-राहु चुंबकीय खिंचाव का संयोजन है। शुक्र-मंगल पहल और साहस का संयोजन है। जब प्रेम विवाह एक सोचा-समझा, सक्रिय चुनाव होता है, तो इनमें से एक या दोनों अक्सर दिखते हैं — हालाँकि कोई भी अनिवार्य नहीं है।',
          },
          {
            id:       'yoga-navamsa',
            label:    '5th/7th Lord Connection in the Navamsa (D9)',
            label_hi: 'नवांश (D9) में पंचमेश/सप्तमेश संबंध',
            body:     'The Rashi (D1) chart shows the potential; the Navamsa (D9) is used to see how that potential matures in marriage. A 5th-7th link that is weak in the Rashi chart but present in the Navamsa may still support a love-based union, sometimes later in life. Astrologers treat the Navamsa as an important supporting check, not a stand-alone verdict.',
            body_hi:  'राशि (D1) कुंडली संभावना दिखाती है; नवांश (D9) से देखा जाता है कि यह संभावना विवाह में कैसे परिपक्व होती है। यदि राशि कुंडली में पंचम-सप्तम संबंध कमजोर हो पर नवांश में मौजूद हो, तो भी प्रेम-आधारित विवाह का समर्थन मिल सकता है, कभी-कभी जीवन में कुछ देर से। ज्योतिषी नवांश को एक महत्वपूर्ण सहायक जाँच मानते हैं, अकेला निर्णय नहीं।',
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
            body:     'Opposition to a love marriage usually stems from conflict with the 9th house (father, religion) or 10th house (society, status). If Saturn or Ketu severely afflicts the 9th lord or 10th lord, it may indicate that family acceptance of the chosen partner takes more time or effort — the classic "family opposition" pattern.',
            body_hi:  'प्रेम विवाह के विरोध की उत्पत्ति सामान्यतः 9वें भाव (पिता, धर्म) या 10वें भाव (समाज, प्रतिष्ठा) से होती है। यदि शनि या केतु इन भावों को गंभीर रूप से पीड़ित करे, तो चुने गए साथी को परिवार की स्वीकृति मिलने में अधिक समय या प्रयास लग सकता है।',
          },
          {
            id:       'obstacle-sun-rahu',
            label:    'The Sun-Rahu Affliction',
            label_hi: 'सूर्य-राहु पीड़न',
            body:     'The Sun represents the father and authority. If Rahu sits with or aspects the Sun or the 9th lord, there may be tension with the father or elders over the marriage choice. The combination suggests a pull between personal choice and paternal authority that usually needs patience and open conversation to resolve.',
            body_hi:  'सूर्य पिता और अधिकार का प्रतिनिधित्व करता है। यदि राहु सूर्य या 9वें स्वामी के साथ बैठे या उन्हें देखे, तो विवाह के चुनाव को लेकर पिता या बड़ों के साथ तनाव हो सकता है। यह व्यक्तिगत पसंद और पारिवारिक अधिकार के बीच खिंचाव का संकेत है, जिसे सुलझाने में अक्सर धैर्य और खुली बातचीत की ज़रूरत होती है।',
          },
          {
            id:       'obstacle-different-background',
            label:    'A Partner From a Different Background',
            label_hi: 'अलग पृष्ठभूमि का साथी',
            body:     'When Rahu is linked with the 7th house, the 7th lord or Venus, the partner may come from a different background or culture, which can add to family hesitation. Unions across caste or religion are covered in detail in the Intercaste Marriage guide.',
            body_hi:  'जब राहु 7वें भाव, सप्तमेश या शुक्र से जुड़ा हो, तो साथी अलग पृष्ठभूमि या संस्कृति से हो सकता है, जिससे परिवार की हिचक बढ़ सकती है। जाति या धर्म से अलग विवाह पर अंतरजातीय विवाह मार्गदर्शिका में विस्तार से बताया गया है।',
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
            body:     "Where is Rahu placed, and does it aspect your Venus, 5th lord, or 7th lord? Rahu's involvement often indicates a pull away from social conventions in marriage. Note which house it occupies and which planets it influences.",
            body_hi:  'राहु कहाँ स्थित है, और क्या वह शुक्र, पंचमेश या सप्तमेश को देखता है? राहु की भूमिका अक्सर विवाह में सामाजिक परंपराओं से हटकर चलने की प्रवृत्ति का संकेत देती है।',
          },
          {
            id:       'guidance-strength',
            label:    "Step 3: Check the 5th Lord's Strength",
            label_hi: 'चरण 3: पंचमेश की शक्ति जाँचें',
            body:     'Is the 5th lord powerful? A weak 5th lord may produce intense attractions that never actualize into marriage. The attraction exists but lacks the structural energy to reach the 7th house and become a formal union. A combust, debilitated or heavily afflicted 5th lord may indicate this pattern.',
            body_hi:  'क्या पंचमेश शक्तिशाली है? कमजोर पंचमेश ऐसा तीव्र आकर्षण दे सकता है जो विवाह तक न पहुँचे। अस्त, नीच या अत्यधिक पीड़ित पंचमेश इस प्रवृत्ति का संकेत दे सकता है।',
          },
          {
            id:       'guidance-benefic',
            label:    'Step 4: Look for Benefic Support',
            label_hi: 'चरण 4: शुभ ग्रह समर्थन खोजें',
            body:     'Are benefic planets (Jupiter or Venus) supporting the love-marriage combinations? Benefic support tends to make the path to a love marriage smoother. Malefic-heavy combinations often indicate more opposition or a longer road to family acceptance.',
            body_hi:  'क्या शुभ ग्रह (गुरु या शुक्र) प्रेम विवाह के संयोजनों का समर्थन कर रहे हैं? शुभ ग्रहों का समर्थन प्रेम विवाह के मार्ग को अपेक्षाकृत सहज बनाता है। पाप ग्रहों से भरे संयोजन अक्सर अधिक विरोध या परिवार की स्वीकृति में अधिक समय का संकेत देते हैं।',
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
            body:     'Astrology does not rank one path above the other. A love marriage can be just as difficult, or as fulfilling, as an arranged one. The love-marriage combinations describe how a union is likely to begin; the quality of married life is read from other factors, covered in the Married Life guide.',
            body_hi:  'ज्योतिष किसी एक मार्ग को दूसरे से बेहतर नहीं मानता। प्रेम विवाह भी अरेंज्ड विवाह जितना कठिन या सुखद हो सकता है। प्रेम विवाह के योग बताते हैं कि संबंध की शुरुआत कैसे होने की संभावना है; वैवाहिक जीवन की गुणवत्ता अन्य कारकों से देखी जाती है, जिन पर वैवाहिक जीवन मार्गदर्शिका में बताया गया है।',
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
        id:       'dasha-activation',
        title:    'Dasha: Are Love-Marriage Indications Active?',
        title_hi: 'दशा: क्या प्रेम विवाह के योग सक्रिय हैं?',
        layout:   'checklist',
        items: [
          {
            id:       'dasha-activates-promise',
            label:    'A Dasha activates what the birth chart already shows',
            label_hi: 'दशा वही सक्रिय करती है जो जन्मकुंडली में पहले से है',
            body:     'A Mahadasha or Antardasha cannot create a love-marriage tendency that the birth chart does not show; it brings existing combinations into focus. When the running period belongs to the 5th lord, the 7th lord, Venus, or a planet linking them (Rahu included), romance and commitment tend to become more prominent themes in life.',
            body_hi:  'महादशा या अंतर्दशा ऐसी प्रेम विवाह प्रवृत्ति नहीं बना सकती जो जन्मकुंडली में न हो; यह पहले से मौजूद संयोजनों को सक्रिय करती है। जब चल रही अवधि पंचमेश, सप्तमेश, शुक्र या इन्हें जोड़ने वाले ग्रह (राहु सहित) की हो, तो जीवन में प्रेम और प्रतिबद्धता के विषय अधिक प्रमुख हो सकते हैं।',
          },
          {
            id:       'dasha-not-a-date',
            label:    'Activation is not a marriage date',
            label_hi: 'सक्रियता का अर्थ विवाह की तारीख नहीं',
            body:     'An active period suggests that love-marriage indications are relevant now — for example, a serious relationship or a decision about one. It does not fix when a marriage will take place. That question is assessed separately, by combining Dasha with the Navamsa and transits, and is explained in the Marriage Timing guide linked below.',
            body_hi:  'सक्रिय अवधि यह संकेत देती है कि प्रेम विवाह के योग अभी प्रासंगिक हैं — जैसे कोई गंभीर संबंध या उससे जुड़ा निर्णय। यह तय नहीं करती कि विवाह कब होगा। यह प्रश्न दशा, नवांश और गोचर को मिलाकर अलग से देखा जाता है, जिसे नीचे दी गई विवाह के समय की मार्गदर्शिका में समझाया गया है।',
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
            body:     'Yes. Astrology describes tendencies and relative ease, not fixed outcomes. A person whose chart leans toward a family-guided marriage can still choose a partner themselves — they may simply face more hurdles, or find that the path to that union is less conventional.',
            body_hi:  'हाँ। ज्योतिष प्रवृत्तियों और सहजता का वर्णन करता है, निश्चित परिणामों का नहीं। जिसकी कुंडली परिवार-निर्देशित विवाह की ओर झुकती है, वह भी स्वयं साथी चुन सकता है — बस उसे अधिक बाधाओं का सामना करना पड़ सकता है, या उसका मार्ग कुछ कम पारंपरिक हो सकता है।',
          },
          {
            id:       'faq-rahu-necessary',
            label:    'Is Rahu necessary for a love marriage?',
            label_hi: 'क्या प्रेम विवाह के लिए राहु आवश्यक है?',
            body:     'No. Rahu is common in love-marriage charts because it pushes against convention, but a clear 5th-7th link, Venus or a Venus-Mars connection can support a love marriage without it. Without Rahu, a love marriage tends to be more traditional in form — often with family involvement and approval.',
            body_hi:  'नहीं। राहु प्रेम विवाह की कुंडलियों में आम है क्योंकि यह परंपरा से हटकर चलने की प्रेरणा देता है, पर स्पष्ट पंचम-सप्तम संबंध, शुक्र या शुक्र-मंगल का संबंध भी राहु के बिना प्रेम विवाह का समर्थन कर सकता है। राहु के बिना प्रेम विवाह अक्सर अधिक पारंपरिक रूप में होता है — प्रायः परिवार की भागीदारी और स्वीकृति के साथ।',
          },
          {
            id:       'faq-no-5th-7th-link',
            label:    'What if my 5th and 7th houses have no connection?',
            label_hi: 'क्या होगा यदि मेरे पंचम और सप्तम भाव का कोई संबंध नहीं है?',
            body:     'Then the love-marriage tendency is weaker, not absent. Venus, the Navamsa or other supporting factors may still point toward a self-chosen partner. Often the result is a blend of love and arranged marriage — an emotional connection exists, but family plays a larger part in how the marriage comes about.',
            body_hi:  'तब प्रेम विवाह की प्रवृत्ति कमजोर होती है, समाप्त नहीं। शुक्र, नवांश या अन्य सहायक कारक फिर भी स्वयं चुने गए साथी की ओर संकेत कर सकते हैं। अक्सर परिणाम प्रेम और अरेंज्ड विवाह का मेल होता है — भावनात्मक जुड़ाव होता है, पर विवाह कैसे होगा इसमें परिवार की भूमिका बड़ी होती है।',
          },
          {
            id:       'faq-remedies',
            label:    'Can remedies guarantee a love marriage?',
            label_hi: 'क्या उपाय प्रेम विवाह की गारंटी दे सकते हैं?',
            body:     'No. Remedies cannot make another person love you or compel your family to agree. Traditionally they are used to bring clarity, patience and balance to your own decisions. Treat them as optional support for your inner state, not as a way to change other people or fix an outcome.',
            body_hi:  'नहीं। उपाय किसी को आपसे प्रेम करने के लिए या आपके परिवार को सहमत होने के लिए बाध्य नहीं कर सकते। परंपरागत रूप से इनका उपयोग अपने निर्णयों में स्पष्टता, धैर्य और संतुलन के लिए किया जाता है। इन्हें अपनी आंतरिक स्थिति के लिए वैकल्पिक सहायता मानें, दूसरों को बदलने या परिणाम तय करने का साधन नहीं।',
          },
          {
            id:       'faq-infatuation-vs-love',
            label:    'How does astrology tell infatuation from a relationship that leads to marriage?',
            label_hi: 'ज्योतिष क्षणिक आकर्षण और विवाह तक पहुँचने वाले संबंध में अंतर कैसे करता है?',
            body:     'Infatuation tends to show as a short-lived activation of the 5th house — often during a passing transit — without a lasting link to the 7th house or the Navamsa. A relationship more likely to lead to marriage usually shows 5th-house energy connected firmly to the 7th, so that romance has a committed direction.',
            body_hi:  'क्षणिक आकर्षण प्रायः पंचम भाव की अल्पकालिक सक्रियता के रूप में दिखता है — अक्सर किसी गुजरते गोचर के दौरान — जिसका सप्तम भाव या नवांश से स्थायी संबंध नहीं होता। विवाह तक पहुँचने की अधिक संभावना वाले संबंध में पंचम भाव की ऊर्जा सप्तम भाव से मज़बूती से जुड़ी होती है, जिससे प्रेम को प्रतिबद्धता की दिशा मिलती है।',
          },
          {
            id:       'faq-family-opposition',
            label:    'Why does my family oppose my love marriage?',
            label_hi: 'मेरा परिवार मेरे प्रेम विवाह का विरोध क्यों करता है?',
            body:     'Astrologers look at the 9th house (father, tradition, religion) and 10th house (social status, duty), the traditional guardians of marriage alliances. When they are afflicted or conflict with your 5th and 7th house energy, family hesitation is a common pattern — not a personal failure, and not a sign that acceptance is impossible.',
            body_hi:  'ज्योतिषी 9वें भाव (पिता, परंपरा, धर्म) और 10वें भाव (सामाजिक प्रतिष्ठा, कर्तव्य) को देखते हैं, जो परंपरागत रूप से विवाह संबंधों के संरक्षक हैं। जब ये पीड़ित हों या आपके पंचम-सप्तम भाव की ऊर्जा से टकराएँ, तो परिवार की हिचक एक आम प्रवृत्ति है — यह व्यक्तिगत विफलता नहीं, और न ही इसका अर्थ है कि स्वीकृति असंभव है।',
          },
          {
            id:       'faq-dasha-love-marriage',
            label:    'Does the Dasha matter for love marriage?',
            label_hi: 'क्या प्रेम विवाह के लिए दशा मायने रखती है?',
            body:     'Yes, but in a specific way. The Dasha shows when the love-marriage indications already present in the birth chart become active; it cannot turn a family-guided chart into a love-marriage chart. Estimating when marriage itself may happen combines Dasha with the Navamsa and transits — see the Marriage Timing guide.',
            body_hi:  'हाँ, पर एक विशेष तरीके से। दशा बताती है कि जन्मकुंडली में पहले से मौजूद प्रेम विवाह के योग कब सक्रिय होते हैं; यह परिवार-निर्देशित कुंडली को प्रेम विवाह की कुंडली नहीं बना सकती। विवाह कब हो सकता है, इसका अनुमान दशा, नवांश और गोचर को मिलाकर लगाया जाता है — इसके लिए विवाह के समय की मार्गदर्शिका देखें।',
          },
          {
            id:       'faq-gandharva-vivah',
            label:    'What is Gandharva Vivah?',
            label_hi: 'गंधर्व विवाह क्या है?',
            body:     'Gandharva Vivah is one of the eight forms of marriage described in classical Hindu texts — a union based on the mutual love and consent of the couple. In astrology the term is often used for love marriage, and the Gandharva Vivah yoga described above refers to strong, well-supported 5th and 7th lords. It describes a tendency in the chart, not a guarantee.',
            body_hi:  'गंधर्व विवाह शास्त्रीय हिंदू ग्रंथों में वर्णित विवाह के आठ प्रकारों में से एक है — युगल के आपसी प्रेम और सहमति पर आधारित विवाह। ज्योतिष में यह शब्द अक्सर प्रेम विवाह के लिए प्रयोग होता है, और ऊपर बताया गया गंधर्व विवाह योग मज़बूत और शुभ प्रभाव वाले पंचमेश व सप्तमेश को दर्शाता है। यह कुंडली की एक प्रवृत्ति है, गारंटी नहीं।',
          },
        ],
      },

    ],
    ctas: [
      {
        id:             'cta-love-life',
        type:           'tool',
        slug:           'love-life',
        label:          'Check Your Love-Life Indicators',
        label_hi:       'अपने प्रेम जीवन के संकेत देखें',
        description:    'A free check based on your birth details.',
        description_hi: 'आपके जन्म विवरण पर आधारित निःशुल्क जांच।',
        variant:        'primary',
      },
      {
        id:             'cta-love-marriage-report',
        type:           'report',
        slug:           'love_marriage_report',
        label:          'Get Love Marriage Report',
        label_hi:       'प्रेम विवाह रिपोर्ट प्राप्त करें',
        description:    'A personalised PDF report based on your birth chart.',
        description_hi: 'आपकी जन्म कुंडली पर आधारित व्यक्तिगत PDF रिपोर्ट।',
        variant:        'secondary',
      },
    ],
  },

  aiMetadata: {
    searchIntent:   'informational',
    difficulty:     'beginner',
    authorityLevel: 'standard',
  },

  schemaSignals: {
    expertise:     'Authored by experienced Vedic astrologers specializing in love marriage indicators, the 5th-7th house dynamic, Venus-Rahu-Mars combinations, and Gandharva Vivah yogas.',
    // First authored in commit 7cd8637 (2026-07-20, "marriage hub").
    datePublished: '2026-07-20',
  },

  authority: {
    reviewStatus:   'not-reviewed',
    contentVersion: 2,
    // LM-2 restructure (direct answer, balanced wording, Dasha section, SSR FAQ).
    lastUpdated:    '2026-10-04',
  },

  publishing: {
    isIndexable:     false,
    isSearchEnabled: false,
    visibility:      'private',
  },

}
