import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

// Informational guide: what Dhan Yoga is and how it is read. Checking a chart is the free Dhan Yog tool's job
// (/tools/dhan-yog), so this page explains and links to it rather than repeating the tool page.
//
// Every statement about Jyotishasha's free checks describes their implementation (backend, origin/main):
//  - services/dhan_yog.py: lords of the 2nd, 5th, 9th and 11th houses from the Ascendant; two DIFFERENT lords
//    linked by conjunction (same house), mutual aspect (7th for all; Mars 4/8, Jupiter 5/9, Saturn 3/10) or
//    sign exchange; strength High/Moderate/Low from the average Shadbala of the linked planets. No dasha or
//    transit input. Rahu and Ketu own no sign there, so they are never counted as lords.
//  - services/lakshmi_yog.py: 9th lord in its own sign AND in a kendra (1/4/7/10) or trikona (1/5/9), AND the
//    Ascendant lord's Shadbala >= 70. (Exaltation is not tested, so it is not claimed.)
//  - services/kuber_rajyog.py: Jupiter, Venus, Mercury or the Moon in the 2nd, 5th, 9th or 11th house with
//    Shadbala >= 70.
// Definitions of these yogas differ between texts and astrologers; the page says so and never presents the
// tool's check as the only one. Review status stays 'not-reviewed' until an astrologer has reviewed the copy.

export const dhanYoga: DomainTopic = {

  identity: {
    id:        'astrology:dhan-yoga',
    slug:      'dhan-yoga',
    title:     'Dhan Yoga in Vedic Astrology: Wealth Yogas Explained',
    title_hi:  'वैदिक ज्योतिष में धन योग: धन के योग और उनका असर',
    domain:    'astrology',
    subdomain: 'financial-astrology',
    category:  'wealth',
    entityType: 'concept',
    status:    'published',
  },

  routing: {
    canonicalPath: '/financial-astrology/dhan-yoga',
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',             href: '/' },
      { label: 'Financial Astrology', label_hi: 'वित्तीय ज्योतिष', href: '/financial-astrology' },
      { label: 'Dhan Yoga',           label_hi: 'धन योग',          href: '/financial-astrology/dhan-yoga' },
    ],
  },

  seo: {
    metaTitle:          'Dhan Yoga in Vedic Astrology: Wealth Yogas Explained',
    metaDescription:    'What Dhan Yoga is, how links between the 2nd, 5th, 9th and 11th house lords form it, how it differs from Lakshmi and Kuber yoga, and what it can show.',
    metaDescription_hi: 'धन योग क्या है, दूसरे, पाँचवें, नौवें और ग्यारहवें भाव के स्वामियों के संबंध से यह कैसे बनता है, लक्ष्मी और कुबेर योग से कैसे अलग है, और यह क्या बताता है।',
    robots: 'index,follow',
  },

  hero: {
    headline:    'Dhan Yoga in Vedic Astrology: What It Is and How It Is Read',
    headline_hi: 'वैदिक ज्योतिष में धन योग: यह क्या है और इसे कैसे पढ़ा जाता है',
    subtext:     'Dhan Yoga is the name given to chart combinations that link the houses of money and fortune. This guide explains which houses are involved, how the link is read, how it differs from Lakshmi Yog and Kuber Rajyog, and what a Dhan Yoga can and cannot tell you. To check your own chart, use the free Dhan Yog tool.',
    subtext_hi:  'धन योग उन ग्रह-संयोगों का नाम है जो कुंडली में धन और भाग्य के भावों को आपस में जोड़ते हैं। यह गाइड बताती है कि इसमें कौन-से भाव शामिल होते हैं, उनके संबंध को कैसे पढ़ा जाता है, यह लक्ष्मी योग और कुबेर राजयोग से कैसे अलग है, और धन योग क्या बता सकता है और क्या नहीं। अपनी कुंडली जाँचने के लिए मुफ़्त धन योग टूल का उपयोग करें।',
  },

  taxonomy: {
    // Provisional SEO assumptions (no Search Console data): informational "what is Dhan Yoga" intent; the tool
    // page keeps the "check my chart" intent. 'wealth-yoga' is the one tag shared with salary-growth.
    tags:        ['dhan-yoga', 'wealth-yoga', 'lakshmi-yoga', 'kuber-rajyoga', 'house-lords', 'trikona-lords'],
    keywords:    ['dhan yoga', 'dhan yoga in kundli', 'dhan yoga meaning', 'how dhan yoga is formed', 'dhan yoga vs lakshmi yoga'],
    keywords_hi: ['धन योग', 'कुंडली में धन योग', 'धन योग क्या है', 'धन योग कैसे बनता है', 'धन योग और लक्ष्मी योग'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'wealth-houses',
        title:    'The Four Houses Behind Dhan Yoga',
        title_hi: 'धन योग के चार भाव',
        layout:   'cards',
        items: [
          {
            id:       'card-2nd-house',
            icon:     '🏦',
            label:    'The 2nd House — Money You Hold',
            label_hi: 'दूसरा भाव — संचित धन',
            body:     'The 2nd house is read for accumulated money: savings, family resources and what stays with you after income arrives. It is also the house of speech and of the immediate family.',
            body_hi:  'दूसरा भाव संचित धन के लिए पढ़ा जाता है: बचत, परिवार के संसाधन, और वह धन जो आय आने के बाद आपके पास टिकता है। यह वाणी और निकट परिवार का भाव भी है।',
            badge:    'Wealth house',
            badge_hi: 'धन भाव',
            badgeVariant: 'neutral',
          },
          {
            id:       'card-11th-house',
            icon:     '📥',
            label:    'The 11th House — Income and Gains',
            label_hi: 'ग्यारहवाँ भाव — आय और लाभ',
            body:     'The 11th house is read for gains: the money that comes in, the fulfilment of ambitions, and the networks and friendships through which opportunities arrive.',
            body_hi:  'ग्यारहवाँ भाव लाभ के लिए पढ़ा जाता है: आने वाला धन, इच्छाओं और महत्वाकांक्षाओं की पूर्ति, और वे संपर्क व मित्रताएँ जिनके ज़रिए अवसर मिलते हैं।',
            badge:    'Wealth house',
            badge_hi: 'धन भाव',
            badgeVariant: 'neutral',
          },
          {
            id:       'card-5th-house',
            icon:     '💡',
            label:    'The 5th House — Judgement and Merit',
            label_hi: 'पाँचवाँ भाव — बुद्धि और पूर्व पुण्य',
            body:     'The 5th house is read for intelligence, creativity, children and purva punya, the merit carried from past actions. In money matters it is linked with judgement and with gains from speculation.',
            body_hi:  'पाँचवाँ भाव बुद्धि, रचनात्मकता, संतान और पूर्व पुण्य (पिछले कर्मों से मिला पुण्य) के लिए पढ़ा जाता है। धन के मामलों में इसे समझ-बूझ और सट्टे या जोखिम वाले लाभ से जोड़ा जाता है।',
            badge:    'Trikona house',
            badge_hi: 'त्रिकोण भाव',
            badgeVariant: 'neutral',
          },
          {
            id:       'card-9th-house',
            icon:     '🍀',
            label:    'The 9th House — Fortune',
            label_hi: 'नौवाँ भाव — भाग्य',
            body:     'The 9th house is read for fortune (bhagya), dharma, teachers and higher learning. Its support is read as luck and help that arrive beyond your own direct effort.',
            body_hi:  'नौवाँ भाव भाग्य, धर्म, गुरु और उच्च शिक्षा के लिए पढ़ा जाता है। इसके सहयोग को ऐसे भाग्य और सहायता के रूप में देखा जाता है जो आपके सीधे प्रयास से आगे बढ़कर मिलती है।',
            badge:    'Trikona house',
            badge_hi: 'त्रिकोण भाव',
            badgeVariant: 'neutral',
          },
        ],
      },

      {
        id:       'tool-check',
        title:    'How the Free Dhan Yog Tool Checks Your Chart',
        title_hi: 'मुफ़्त धन योग टूल आपकी कुंडली कैसे जाँचता है',
        layout:   'checklist',
        items: [
          {
            id:       'check-lords',
            label:    'It finds the lords of your 2nd, 5th, 9th and 11th houses',
            label_hi: 'यह आपके दूसरे, पाँचवें, नौवें और ग्यारहवें भाव के स्वामी पहचानता है',
            body:     'From your Ascendant (Lagna), the tool works out which planet rules the sign on each of these four houses. Rahu and Ketu do not rule a sign in this check, so they are never counted as house lords.',
            body_hi:  'आपके लग्न से टूल यह निकालता है कि इन चारों भावों की राशि का स्वामी कौन-सा ग्रह है। इस जाँच में राहु और केतु किसी राशि के स्वामी नहीं माने जाते, इसलिए उन्हें भाव-स्वामी के रूप में नहीं गिना जाता।',
          },
          {
            id:       'check-conjunction',
            label:    'Conjunction: two of these lords sit in the same house',
            label_hi: 'युति: इनमें से दो स्वामी एक ही भाव में बैठे हों',
            body:     'If two different lords from this group occupy the same house of your birth chart, the tool counts it as a link.',
            body_hi:  'अगर इस समूह के दो अलग-अलग स्वामी आपकी जन्म कुंडली के एक ही भाव में हों, तो टूल इसे एक संबंध मानता है।',
          },
          {
            id:       'check-mutual-aspect',
            label:    'Mutual aspect: each lord aspects the other',
            label_hi: 'परस्पर दृष्टि: दोनों स्वामी एक-दूसरे को देखते हों',
            body:     'Every planet aspects the 7th house from itself. Mars also aspects the 4th and 8th, Jupiter the 5th and 9th, and Saturn the 3rd and 10th. A mutual aspect means both lords aspect each other’s house.',
            body_hi:  'हर ग्रह अपने से सातवें भाव को देखता है। इसके अलावा मंगल चौथे और आठवें, गुरु पाँचवें और नौवें, और शनि तीसरे और दसवें भाव को भी देखता है। परस्पर दृष्टि का अर्थ है कि दोनों स्वामी एक-दूसरे के भाव को देखते हैं।',
          },
          {
            id:       'check-exchange',
            label:    'Sign exchange (parivartan): each lord sits in a sign the other rules',
            label_hi: 'राशि परिवर्तन: दोनों स्वामी एक-दूसरे की राशि में बैठे हों',
            body:     'When two of these lords each occupy a sign ruled by the other, the tool counts the exchange as a link between their houses.',
            body_hi:  'जब इनमें से दो स्वामी एक-दूसरे की राशि में बैठे हों, तो टूल इस राशि परिवर्तन को उनके भावों के बीच का संबंध मानता है।',
          },
          {
            id:       'check-single-lord',
            label:    'One planet ruling two of these houses is not counted on its own',
            label_hi: 'एक ही ग्रह का दो भावों का स्वामी होना अपने-आप में नहीं गिना जाता',
            body:     'For some Ascendants a single planet rules two of the four houses. The tool looks for a link between two different lords, so that ownership alone does not produce a positive result.',
            body_hi:  'कुछ लग्नों में एक ही ग्रह इन चार में से दो भावों का स्वामी होता है। टूल दो अलग-अलग स्वामियों के बीच संबंध खोजता है, इसलिए केवल यह स्वामित्व सकारात्मक परिणाम नहीं देता।',
          },
          {
            id:       'check-strength',
            label:    'A strength grade for any link it finds',
            label_hi: 'मिले हुए संबंध के लिए बल का स्तर',
            body:     'When a link is found, the result also shows a strength grade (High, Moderate or Low), based on the average Shadbala of the planets involved. Shadbala is the classical six-fold measure of planetary strength.',
            body_hi:  'संबंध मिलने पर परिणाम में बल का स्तर (उच्च, मध्यम या कम) भी दिखता है, जो संबंधित ग्रहों के औसत षड्बल पर आधारित होता है। षड्बल ग्रहों के बल को छह तरह से मापने की शास्त्रीय पद्धति है।',
          },
          {
            id:       'check-scope',
            label:    'It reads your birth chart only',
            label_hi: 'यह केवल आपकी जन्म कुंडली पढ़ता है',
            body:     'The check looks at the placements in your birth chart. It does not look at dasha periods or transits, and it does not estimate income or savings.',
            body_hi:  'यह जाँच आपकी जन्म कुंडली की ग्रह-स्थितियों को देखती है। यह दशा या गोचर नहीं देखती, और आय या बचत का कोई अनुमान नहीं लगाती।',
          },
        ],
      },

      {
        id:       'related-yogas',
        title:    'Dhan Yog, Lakshmi Yog and Kuber Rajyog: What Each Free Check Looks For',
        title_hi: 'धन योग, लक्ष्मी योग और कुबेर राजयोग: हर मुफ़्त जाँच क्या देखती है',
        layout:   'cards',
        items: [
          {
            id:       'card-dhan-yog',
            icon:     '🪙',
            label:    'Dhan Yog — links among the wealth-house lords',
            label_hi: 'धन योग — धन भावों के स्वामियों का आपसी संबंध',
            body:     'Looks for a conjunction, mutual aspect or sign exchange between two different lords of the 2nd, 5th, 9th and 11th houses. It answers whether the houses of money and fortune are tied together in your chart.',
            body_hi:  'दूसरे, पाँचवें, नौवें और ग्यारहवें भाव के दो अलग-अलग स्वामियों के बीच युति, परस्पर दृष्टि या राशि परिवर्तन खोजता है। यह बताता है कि आपकी कुंडली में धन और भाग्य के भाव आपस में जुड़े हैं या नहीं।',
            badge:    'House lords',
            badge_hi: 'भाव-स्वामी',
            badgeVariant: 'info',
          },
          {
            id:       'card-lakshmi-yog',
            icon:     '🌸',
            label:    'Lakshmi Yog — a strong 9th lord with a strong Ascendant lord',
            label_hi: 'लक्ष्मी योग — बलवान नवमेश और बलवान लग्नेश',
            body:     'Checks whether the 9th lord sits in its own sign in a kendra (1st, 4th, 7th or 10th) or trikona (1st, 5th or 9th) house, and whether the Ascendant lord is strong by Shadbala. Its focus is fortune and the strength of the chart as a whole.',
            body_hi:  'यह देखता है कि नवमेश अपनी राशि में होकर किसी केंद्र (पहला, चौथा, सातवाँ या दसवाँ) या त्रिकोण (पहला, पाँचवाँ या नौवाँ) भाव में है या नहीं, और लग्नेश षड्बल में बलवान है या नहीं। इसका ध्यान भाग्य और पूरी कुंडली के बल पर है।',
            badge:    '9th lord',
            badge_hi: 'नवमेश',
            badgeVariant: 'info',
          },
          {
            id:       'card-kuber-rajyog',
            icon:     '👑',
            label:    'Kuber Rajyog — strong benefic planets in the wealth houses',
            label_hi: 'कुबेर राजयोग — धन भावों में बलवान शुभ ग्रह',
            body:     'Checks whether Jupiter, Venus, Mercury or the Moon sits in the 2nd, 5th, 9th or 11th house with good Shadbala strength. It looks at the planets placed in these houses, not at their lords.',
            body_hi:  'यह देखता है कि गुरु, शुक्र, बुध या चंद्रमा अच्छे षड्बल के साथ दूसरे, पाँचवें, नौवें या ग्यारहवें भाव में बैठे हैं या नहीं। यह इन भावों में बैठे ग्रहों को देखता है, उनके स्वामियों को नहीं।',
            badge:    'Placed planets',
            badge_hi: 'स्थित ग्रह',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'definitions',
        title:    'Other Ways Dhan Yoga Is Defined',
        title_hi: 'धन योग की अन्य परिभाषाएँ',
        layout:   'alert',
        items: [
          {
            id:       'alert-definitions',
            label:    'The free checks follow one clear version of each yoga',
            label_hi: 'मुफ़्त जाँचें हर योग के एक स्पष्ट रूप का पालन करती हैं',
            body:     'Classical texts and practising astrologers describe Dhan Yoga, Lakshmi Yoga and Kuber Yoga in more than one way, and some versions weigh further factors. The descriptions above are the checks Jyotishasha’s free tools run. An astrologer reading your whole chart may consider other combinations as well.',
            body_hi:  'शास्त्रीय ग्रंथ और अनुभवी ज्योतिषी धन योग, लक्ष्मी योग और कुबेर योग को एक से अधिक तरीकों से बताते हैं, और कुछ परिभाषाओं में अतिरिक्त कारक भी देखे जाते हैं। ऊपर दिए गए विवरण वही जाँचें हैं जो ज्योतिष आशा के मुफ़्त टूल करते हैं। आपकी पूरी कुंडली पढ़ने वाला ज्योतिषी दूसरे योगों पर भी विचार कर सकता है।',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'reading-without-hype',
        title:    'Reading a Dhan Yoga Without Hype',
        title_hi: 'धन योग को बिना बढ़ा-चढ़ाकर कैसे पढ़ें',
        layout:   'alert',
        items: [
          {
            id:       'alert-potential',
            label:    'A Dhan Yoga describes potential, not an amount',
            label_hi: 'धन योग संभावना बताता है, कोई राशि नहीं',
            body:     'A positive result means the houses of money and fortune are linked in your chart. It does not predict an income, a level of savings or a date. How that potential shows up depends on the strength of the planets involved, the rest of the chart, and your own choices and circumstances.',
            body_hi:  'सकारात्मक परिणाम का अर्थ है कि आपकी कुंडली में धन और भाग्य के भाव आपस में जुड़े हैं। यह किसी आय, बचत के स्तर या तारीख की भविष्यवाणी नहीं करता। यह संभावना कैसे सामने आती है, यह संबंधित ग्रहों के बल, बाकी कुंडली, और आपके अपने निर्णयों व परिस्थितियों पर निर्भर करता है।',
            badgeVariant: 'info',
          },
          {
            id:       'alert-no-yoga',
            label:    'No Dhan Yoga in the check does not mean no money',
            label_hi: 'जाँच में धन योग न मिलने का अर्थ धन का अभाव नहीं',
            body:     'The tool looks for one kind of combination. Income and savings are also read from the 2nd and 11th houses themselves, their lords, the planets that influence them, and the rest of the chart.',
            body_hi:  'टूल एक खास तरह के संयोग को खोजता है। आय और बचत को दूसरे और ग्यारहवें भाव, उनके स्वामियों, उन्हें प्रभावित करने वाले ग्रहों और बाकी कुंडली से भी पढ़ा जाता है।',
            badgeVariant: 'warning',
          },
          {
            id:       'alert-dasha',
            label:    'Yogas and dasha periods are read together',
            label_hi: 'योग और दशा को साथ में पढ़ा जाता है',
            body:     'In traditional reading, a yoga is said to show its results most clearly during the dasha periods of the planets that form it. This is an interpretive principle, not a forecast, and the free Dhan Yog tool does not check dashas. The free Grah Dasha Finder shows which Mahadasha and Antardasha you are running now.',
            body_hi:  'पारंपरिक पद्धति में माना जाता है कि कोई योग अपने परिणाम सबसे स्पष्ट रूप से उन ग्रहों की दशा में दिखाता है जो उसे बनाते हैं। यह व्याख्या का एक सिद्धांत है, भविष्यवाणी नहीं, और मुफ़्त धन योग टूल दशा की जाँच नहीं करता। मुफ़्त ग्रह दशा कैलकुलेटर बताता है कि अभी आपकी कौन-सी महादशा और अंतर्दशा चल रही है।',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Common Questions About Dhan Yoga',
        title_hi: 'धन योग के बारे में सामान्य प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-houses',
            label:    'Which houses are involved in Dhan Yoga?',
            label_hi: 'धन योग में कौन-से भाव शामिल होते हैं?',
            body:     'The version used by Jyotishasha’s free tool looks at the lords of the 2nd house (accumulated money), the 11th house (income and gains), and the 5th and 9th houses, the trikona houses of merit and fortune. Other definitions of Dhan Yoga can weigh further factors.',
            body_hi:  'ज्योतिष आशा के मुफ़्त टूल में उपयोग होने वाला रूप दूसरे भाव (संचित धन), ग्यारहवें भाव (आय और लाभ), और पाँचवें व नौवें भाव — यानी पुण्य और भाग्य के त्रिकोण भावों — के स्वामियों को देखता है। धन योग की दूसरी परिभाषाओं में अतिरिक्त कारक भी देखे जा सकते हैं।',
          },
          {
            id:       'faq-lakshmi-kuber',
            label:    'How is Dhan Yoga different from Lakshmi Yog and Kuber Rajyog?',
            label_hi: 'धन योग, लक्ष्मी योग और कुबेर राजयोग से कैसे अलग है?',
            body:     'As Jyotishasha’s free tools check them, Dhan Yog looks at links between the lords of the 2nd, 5th, 9th and 11th houses; Lakshmi Yog at a 9th lord in its own sign in a kendra or trikona together with a strong Ascendant lord; and Kuber Rajyog at strong Jupiter, Venus, Mercury or the Moon placed in the 2nd, 5th, 9th or 11th house. A chart can show one, several or none of them.',
            body_hi:  'ज्योतिष आशा के मुफ़्त टूल के अनुसार धन योग दूसरे, पाँचवें, नौवें और ग्यारहवें भाव के स्वामियों के आपसी संबंध को देखता है; लक्ष्मी योग यह देखता है कि नवमेश अपनी राशि में होकर केंद्र या त्रिकोण में है और लग्नेश बलवान है; और कुबेर राजयोग दूसरे, पाँचवें, नौवें या ग्यारहवें भाव में बलवान गुरु, शुक्र, बुध या चंद्रमा को देखता है। किसी कुंडली में इनमें से एक, कई या कोई भी योग न हो, यह संभव है।',
          },
          {
            id:       'faq-raj-yoga',
            label:    'Is Dhan Yoga the same as a Raj Yoga?',
            label_hi: 'क्या धन योग और राजयोग एक ही हैं?',
            body:     'No. Raj Yoga is read for status, authority and recognition, while Dhan Yoga is read for wealth. They are separate combinations, so a chart can have one, both or neither, and astrologers often read them together.',
            body_hi:  'नहीं। राजयोग को पद, अधिकार और प्रतिष्ठा के लिए पढ़ा जाता है, जबकि धन योग को धन के लिए। ये अलग-अलग संयोग हैं, इसलिए किसी कुंडली में एक, दोनों या कोई भी न हो सकता है, और ज्योतिषी अक्सर इन्हें साथ में पढ़ते हैं।',
          },
          {
            id:       'faq-guarantee',
            label:    'Does a Dhan Yoga mean I will become wealthy?',
            label_hi: 'क्या धन योग होने से धनवान बनना तय है?',
            body:     'No. A Dhan Yoga describes a supportive link in the chart, not a guaranteed result. Its strength, the rest of the chart and your own effort, decisions and circumstances all shape how money matters actually unfold.',
            body_hi:  'नहीं। धन योग कुंडली में एक सहायक संबंध बताता है, कोई निश्चित परिणाम नहीं। उसका बल, बाकी कुंडली, और आपके अपने प्रयास, निर्णय व परिस्थितियाँ — ये सब मिलकर तय करते हैं कि धन से जुड़े मामले वास्तव में कैसे आगे बढ़ते हैं।',
          },
          {
            id:       'faq-strength',
            label:    'What does the strength grade in the Dhan Yog tool mean?',
            label_hi: 'धन योग टूल में बल का स्तर क्या बताता है?',
            body:     'When the tool finds a link, it grades it High, Moderate or Low from the average Shadbala of the planets that form the link. A higher grade means those planets are stronger by this classical measure; it is not a score for income or wealth.',
            body_hi:  'जब टूल कोई संबंध पाता है, तो वह संबंध बनाने वाले ग्रहों के औसत षड्बल के आधार पर उसे उच्च, मध्यम या कम श्रेणी देता है। ऊँची श्रेणी का अर्थ है कि इस शास्त्रीय माप के अनुसार वे ग्रह अधिक बलवान हैं; यह आय या धन का कोई अंक नहीं है।',
          },
        ],
      },

      {
        id:       'disclaimer',
        title:    'About This Content',
        title_hi: 'इस सामग्री के बारे में',
        layout:   'alert',
        items: [
          {
            id:       'disclaimer-text',
            label:    'For Educational Purposes Only',
            label_hi: 'केवल शैक्षिक उद्देश्यों के लिए',
            body:     'Astrological analysis describes tendencies observed across birth charts — it does not predict fixed outcomes. Financial results depend on personal effort, decisions and individual circumstances. This content is educational and should not replace professional financial, investment or tax advice.',
            body_hi:  'ज्योतिषीय विश्लेषण जन्म कुंडलियों में देखी गई प्रवृत्तियों का वर्णन करता है — यह निश्चित परिणामों की भविष्यवाणी नहीं करता। वित्तीय परिणाम व्यक्तिगत प्रयास, निर्णयों और परिस्थितियों पर निर्भर करते हैं। यह सामग्री शैक्षिक है और पेशेवर वित्तीय, निवेश या कर सलाह की जगह नहीं लेनी चाहिए।',
            badgeVariant: 'info',
          },
        ],
      },
    ],

    ctas: [
      {
        id:             'cta-tool-dhan-yog',
        type:           'tool',
        slug:           'dhan-yog',
        label:          'Check for Dhan Yog in your chart for free',
        label_hi:       'अपनी कुंडली में धन योग मुफ़्त जाँचें',
        description:    'Enter your birth details to check whether the lords of your 2nd, 5th, 9th and 11th houses are linked by conjunction, mutual aspect or sign exchange, with a strength grade for any link found.',
        description_hi: 'अपना जन्म विवरण डालकर जाँचें कि आपके दूसरे, पाँचवें, नौवें और ग्यारहवें भाव के स्वामियों में युति, परस्पर दृष्टि या राशि परिवर्तन का संबंध है या नहीं, और मिले हुए संबंध का बल भी देखें।',
        variant:        'primary',
      },
      {
        id:             'cta-financial-report',
        type:           'report',
        slug:           'financial_report',
        label:          'Want a full reading of your wealth chart?',
        label_hi:       'अपनी धन कुंडली का पूरा विश्लेषण चाहते हैं?',
        description:    'Your income and wealth houses (2nd, 5th, 8th and 11th), wealth yogas such as Dhan Yog, and your wealth-building strengths and constraints, read with your current dasha period. Delivered as a PDF to your email.',
        description_hi: 'आपके आय और धन के भाव (दूसरा, पाँचवाँ, आठवाँ और ग्यारहवाँ), धन योग सहित धन से जुड़े योग, और धन बढ़ाने की ताकतें व बाधाएँ — आपकी वर्तमान दशा अवधि के साथ। PDF आपके ईमेल पर भेजी जाती है।',
        variant:        'secondary',
      },
    ],
  },

  aiMetadata: {
    difficulty:      'beginner',
    searchIntent:    'informational',
    authorityLevel:  'introductory',
    topicGoal:       'Explain what Dhan Yoga is, which houses and lords it involves, exactly what Jyotishasha’s free Dhan Yog, Lakshmi Yog and Kuber Rajyog checks look for, and why a Dhan Yoga describes potential rather than a guaranteed result.',
    targetAudience:  ['people who heard they have Dhan Yoga and want to understand it', 'people comparing wealth yogas before using the free tool', 'astrology students learning wealth combinations'],
    primaryQuestion: 'What is Dhan Yoga, and what does it mean if my chart has one?',
    contentAngle:    'Informational companion to the free Dhan Yog tool: explains the combination and the exact check, separates it from Lakshmi Yog and Kuber Rajyog, and is clear that definitions vary and no result is guaranteed',
    relatedConcepts: ['dhana yoga', '2nd house wealth', '11th house gains', 'trikona lords', 'lakshmi yoga', 'kuber yoga', 'shadbala'],
  },

  schemaSignals: {
    expertise:     'Vedic Jyotish explanation of Dhan Yoga: the 2nd, 5th, 9th and 11th house lords, how conjunction, mutual aspect and sign exchange link them, and how Dhan Yog differs from Lakshmi Yog and Kuber Rajyog',
    datePublished: '2026-11-17',
  },

  authority: {
    // Not yet reviewed by an astrologer; see the Checkpoint 5B report for the claims awaiting review.
    reviewStatus:   'not-reviewed',
    lastUpdated:    '2026-11-17T00:00:00Z',
    contentVersion: 1,
  },

  publishing: {
    isIndexable:     true,
    isSearchEnabled: true,
    visibility:      'public',
  },

  lineage: {
    firstAuthoredAt: '2026-11-17',
  },
}
