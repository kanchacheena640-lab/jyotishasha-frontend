// lib/domains/marriage-astrology/spouseLagnaTool.ts
// MC-04 -- data for the free "Lagna -> 7th-house sign" spouse-nature mini-tool.
//
// Source of truth: Jyotishasha_Backend modules/payments/spouse_sign_table.py
// (SIGN_ORDER, seventh_sign_for_lagna, SEVENTH_SIGN_TABLE). The paid Spouse
// Nature Report reads that same table, so this card must never contradict it:
//   * the 7th sign is derived with the backend's whole-sign rule (index + 6) over
//     the site's existing ASCENDANTS order (identical to the backend SIGN_ORDER);
//   * each sign's element / modality / trait votes are a FROZEN copy of the
//     backend table, and the descriptions are written to stay inside those votes.
// lib/spouseLagnaTool.test.ts pins all 12 pairs and votes, and re-derives them
// from the sibling backend checkout whenever it is present (drift detection).
//
// Data only: no React, no network, no chart calculation.

import { ASCENDANTS } from '../../../components/transit/ascendants'

/** The 12 Lagna (Ascendant) signs, in zodiac order, using the backend's exact names. */
export const LAGNA_ORDER: readonly string[] = ASCENDANTS

/** Whole-sign 7th house: the sign six places after the Lagna. Unknown input -> null (never guesses). */
export function seventhSignForLagna(lagna: string): string | null {
  const i = LAGNA_ORDER.indexOf(lagna)
  return i < 0 ? null : LAGNA_ORDER[(i + 6) % 12]
}

export const SIGN_NAME_HI: Readonly<Record<string, string>> = {
  Aries: 'मेष', Taurus: 'वृषभ', Gemini: 'मिथुन', Cancer: 'कर्क', Leo: 'सिंह', Virgo: 'कन्या',
  Libra: 'तुला', Scorpio: 'वृश्चिक', Sagittarius: 'धनु', Capricorn: 'मकर', Aquarius: 'कुंभ', Pisces: 'मीन',
}

export interface SeventhSignCard {
  /** Backend SEVENTH_SIGN_TABLE[sign].sign_card_id */
  cardId: string
  element: 'fire' | 'earth' | 'air' | 'water'
  modality: 'movable' | 'fixed' | 'dual'
  /** Frozen copy of backend SEVENTH_SIGN_TABLE[sign].votes ({dimension: pole}). */
  votes: Readonly<Record<string, string>>
  /** Informational tendency of the 7th-house SIGN (not a prediction about a person). */
  en: string
  hi: string
}

/** Keyed by the 7th-house sign. */
export const SEVENTH_SIGN_CARDS: Readonly<Record<string, SeventhSignCard>> = {
  Aries: {
    cardId: 'seventh_sign_aries', element: 'fire', modality: 'movable',
    votes: { temperament: 'dynamic', communication: 'expressive', independence: 'independent' },
    en: 'Aries on the 7th house is often associated with an energetic, direct and independent partner who likes to take the initiative. It can indicate enthusiasm and frankness, while patience may be an area that needs attention in the relationship.',
    hi: 'सप्तम भाव में मेष राशि अक्सर ऊर्जावान, स्पष्ट बोलने वाले और स्वतंत्र स्वभाव के जीवनसाथी से जुड़ी मानी जाती है, जो पहल करना पसंद करता हो। यह उत्साह और साफ़गोई का संकेत दे सकती है, जबकि धैर्य रिश्ते में ध्यान देने वाला पहलू हो सकता है।',
  },
  Taurus: {
    cardId: 'seventh_sign_taurus', element: 'earth', modality: 'fixed',
    votes: { temperament: 'steady', approach_to_life: 'practical', responsibility: 'dutiful' },
    en: 'Taurus on the 7th house may point to a calm, steady and practical partner who values security, comfort and commitment. It is often associated with patience and dependability, and with a preference for stability over sudden change.',
    hi: 'सप्तम भाव में वृषभ राशि शांत, स्थिर और व्यावहारिक जीवनसाथी की ओर संकेत कर सकती है, जो सुरक्षा, सुख-सुविधा और निभाने की भावना को महत्व देता हो। इसे अक्सर धैर्य, भरोसेमंद स्वभाव और अचानक बदलाव की बजाय स्थिरता की पसंद से जोड़ा जाता है।',
  },
  Gemini: {
    cardId: 'seventh_sign_gemini', element: 'air', modality: 'dual',
    votes: { communication: 'expressive', sociability: 'outgoing', responsibility: 'flexible' },
    en: 'Gemini on the 7th house is often associated with a talkative, curious and sociable partner who enjoys ideas and conversation. It can indicate an adaptable, light-hearted nature and a need for mental connection in the relationship.',
    hi: 'सप्तम भाव में मिथुन राशि अक्सर बातूनी, जिज्ञासु और मिलनसार जीवनसाथी से जुड़ी मानी जाती है, जिसे विचारों और बातचीत में आनंद आता हो। यह लचीले, हल्के-फुल्के स्वभाव और रिश्ते में मानसिक जुड़ाव की ज़रूरत का संकेत दे सकती है।',
  },
  Cancer: {
    cardId: 'seventh_sign_cancer', element: 'water', modality: 'movable',
    votes: { temperament: 'dynamic', emotional_style: 'open', sociability: 'home_centred', independence: 'independent' },
    en: 'Cancer on the 7th house can indicate a caring, emotionally open partner for whom home and family matter deeply. It is often associated with an active, protective nature and a wish to look after loved ones in their own way.',
    hi: 'सप्तम भाव में कर्क राशि देखभाल करने वाले, भावनाओं को खुलकर व्यक्त करने वाले जीवनसाथी का संकेत दे सकती है, जिसके लिए घर और परिवार बहुत मायने रखते हों। इसे अक्सर सक्रिय, रक्षा करने वाले स्वभाव और अपने तरीके से अपनों का ध्यान रखने से जोड़ा जाता है।',
  },
  Leo: {
    cardId: 'seventh_sign_leo', element: 'fire', modality: 'fixed',
    votes: { communication: 'expressive', responsibility: 'dutiful' },
    en: 'Leo on the 7th house may point to a warm, expressive and dignified partner with a generous heart. It is often associated with pride, loyalty and a strong sense of responsibility toward loved ones.',
    hi: 'सप्तम भाव में सिंह राशि गर्मजोशी भरे, खुलकर अभिव्यक्त करने वाले और गरिमामय जीवनसाथी की ओर संकेत कर सकती है, जिसका दिल उदार हो। इसे अक्सर आत्मसम्मान, वफ़ादारी और अपनों के प्रति ज़िम्मेदारी की मज़बूत भावना से जोड़ा जाता है।',
  },
  Virgo: {
    cardId: 'seventh_sign_virgo', element: 'earth', modality: 'dual',
    votes: { temperament: 'steady', communication: 'expressive', approach_to_life: 'practical', responsibility: 'flexible' },
    en: 'Virgo on the 7th house is often associated with a sensible, observant and helpful partner who notices the details. It can indicate a calm, practical and communicative nature, with a willingness to adapt and improve things in everyday life.',
    hi: 'सप्तम भाव में कन्या राशि अक्सर समझदार, बारीकी से देखने वाले और मददगार जीवनसाथी से जुड़ी मानी जाती है। यह शांत, व्यावहारिक और बातचीत में सहज स्वभाव का संकेत दे सकती है, जो रोज़मर्रा के जीवन में तालमेल बिठाने और चीज़ों को बेहतर बनाने को तैयार रहता हो।',
  },
  Libra: {
    cardId: 'seventh_sign_libra', element: 'air', modality: 'movable',
    votes: { temperament: 'dynamic', communication: 'expressive', sociability: 'outgoing', independence: 'independent' },
    en: 'Libra on the 7th house is often associated with a partner who values balance, fairness and good conversation. It can indicate a sociable, expressive and active nature, with clear views of their own — the relationship tends to work best on equal give-and-take.',
    hi: 'सप्तम भाव में तुला राशि अक्सर ऐसे जीवनसाथी से जुड़ी मानी जाती है जो संतुलन, न्याय और अच्छी बातचीत को महत्व देता हो। यह मिलनसार, खुलकर बात करने वाले और सक्रिय स्वभाव का संकेत दे सकती है, जिसकी अपनी स्पष्ट राय हो — ऐसा रिश्ता बराबरी के लेन-देन पर बेहतर चलता है।',
  },
  Scorpio: {
    cardId: 'seventh_sign_scorpio', element: 'water', modality: 'fixed',
    votes: { temperament: 'steady', emotional_style: 'open', sociability: 'home_centred', responsibility: 'dutiful' },
    en: 'Scorpio on the 7th house can indicate a partner with deep, steady feelings who takes commitment seriously. It is often associated with emotional intensity, loyalty and a preference for a close family life over a wide social circle.',
    hi: 'सप्तम भाव में वृश्चिक राशि गहरी और स्थिर भावनाओं वाले जीवनसाथी का संकेत दे सकती है, जो प्रतिबद्धता को गंभीरता से लेता हो। इसे अक्सर भावनात्मक गहराई, वफ़ादारी और बड़े सामाजिक दायरे की बजाय करीबी पारिवारिक जीवन की पसंद से जोड़ा जाता है।',
  },
  Sagittarius: {
    cardId: 'seventh_sign_sagittarius', element: 'fire', modality: 'dual',
    votes: { temperament: 'dynamic', communication: 'expressive', responsibility: 'flexible' },
    en: 'Sagittarius on the 7th house may point to an energetic, outspoken partner who enjoys learning, travel and new ideas. It is often associated with optimism, frankness and an easygoing, adaptable approach rather than rigid routines.',
    hi: 'सप्तम भाव में धनु राशि ऊर्जावान, स्पष्टवादी जीवनसाथी की ओर संकेत कर सकती है, जिसे ज्ञान, यात्रा और नए विचारों में रुचि हो। इसे अक्सर आशावाद, सीधी बात और कठोर दिनचर्या की बजाय सहज, लचीले स्वभाव से जोड़ा जाता है।',
  },
  Capricorn: {
    cardId: 'seventh_sign_capricorn', element: 'earth', modality: 'movable',
    votes: { approach_to_life: 'practical', independence: 'independent' },
    en: 'Capricorn on the 7th house is often associated with a practical, goal-minded and self-reliant partner who values effort and planning ahead. It can indicate someone who tends to show care through dependable action more than words.',
    hi: 'सप्तम भाव में मकर राशि अक्सर व्यावहारिक, लक्ष्य पर ध्यान रखने वाले और आत्मनिर्भर जीवनसाथी से जुड़ी मानी जाती है, जो मेहनत और आगे की योजना को महत्व देता हो। यह ऐसे स्वभाव का संकेत दे सकती है जो अपनापन शब्दों से ज़्यादा भरोसेमंद काम से दिखाता हो।',
  },
  Aquarius: {
    cardId: 'seventh_sign_aquarius', element: 'air', modality: 'fixed',
    votes: { temperament: 'steady', communication: 'expressive', sociability: 'outgoing', responsibility: 'dutiful' },
    en: 'Aquarius on the 7th house may indicate a friendly, communicative partner with a wide social circle and firm principles. It is often associated with steady loyalty to people and causes, fresh ideas and a sense of duty toward the wider community.',
    hi: 'सप्तम भाव में कुंभ राशि मिलनसार, खुलकर बात करने वाले और बड़े सामाजिक दायरे वाले जीवनसाथी का संकेत दे सकती है, जिसके अपने पक्के सिद्धांत हों। इसे अक्सर लोगों और उद्देश्यों के प्रति स्थिर निष्ठा, नए विचारों और समाज के प्रति कर्तव्य-भाव से जोड़ा जाता है।',
  },
  Pisces: {
    cardId: 'seventh_sign_pisces', element: 'water', modality: 'dual',
    votes: { communication: 'expressive', emotional_style: 'open', sociability: 'home_centred', responsibility: 'flexible' },
    en: 'Pisces on the 7th house can indicate a gentle, sensitive and emotionally open partner who values a caring home life. It is often associated with imagination, compassion and an adaptable, accommodating nature.',
    hi: 'सप्तम भाव में मीन राशि कोमल, संवेदनशील और भावनाओं को खुलकर व्यक्त करने वाले जीवनसाथी का संकेत दे सकती है, जिसके लिए स्नेह भरा घरेलू जीवन मायने रखता हो। इसे अक्सर कल्पनाशीलता, करुणा और सहज, लचीले स्वभाव से जोड़ा जाता है।',
  },
}

/** UI copy (EN + HI). The scope note keeps the free result honest about what it leaves out. */
export const SPOUSE_LAGNA_TOOL_COPY = {
  eyebrow: { en: 'Free quick check', hi: 'फ्री त्वरित जाँच' },
  heading: { en: 'Spouse Nature from Your Lagna', hi: 'अपने लग्न से जानें जीवनसाथी का स्वभाव' },
  intro: {
    en: 'Select your Lagna to see which sign falls on your 7th house — the first, basic layer astrologers look at for a partner’s nature.',
    hi: 'अपना लग्न चुनें और देखें कि आपके सप्तम भाव में कौन-सी राशि है — जीवनसाथी के स्वभाव को समझने की यह पहली, बुनियादी परत है।',
  },
  label: { en: 'Select your Lagna (Ascendant)', hi: 'अपना लग्न चुनें' },
  placeholder: { en: 'Choose a sign', hi: 'राशि चुनें' },
  unknownLagna: { en: 'Don’t know your Lagna? Find it with the free Lagna Finder', hi: 'अपना लग्न नहीं पता? फ्री लग्न फ़ाइंडर से जानें' },
  yourLagna: { en: 'Your Lagna', hi: 'आपका लग्न' },
  seventhSign: { en: '7th-house sign', hi: 'सप्तम भाव की राशि' },
  scopeNote: {
    en: 'This is a basic indication from the 7th-house sign alone. A full reading also weighs the 7th lord, planets in or aspecting the 7th house, Venus and Jupiter, the Navamsa (D9) and the Darakaraka — so your own chart may show a different overall picture.',
    hi: 'यह केवल सप्तम भाव की राशि पर आधारित एक बुनियादी संकेत है। पूरे विश्लेषण में सप्तमेश, सप्तम भाव में बैठे या उस पर दृष्टि डालने वाले ग्रह, शुक्र और गुरु, नवांश (D9) और दारकारक भी देखे जाते हैं — इसलिए आपकी अपनी कुंडली की समग्र तस्वीर अलग हो सकती है।',
  },
  ctaLead: { en: 'Want the complete birth-chart analysis?', hi: 'पूरी कुंडली पर आधारित विश्लेषण चाहते हैं?' },
  ctaBody: {
    en: 'The personalised report reads your 7th house and its lord, the Navamsa (D9) and supporting indicators from your full birth details.',
    hi: 'व्यक्तिगत रिपोर्ट आपके पूरे जन्म विवरण से सप्तम भाव और सप्तमेश, नवांश (D9) और सहायक संकेतकों को पढ़ती है।',
  },
  ctaLabel: { en: 'Spouse Nature Report – ₹{price}', hi: 'जीवनसाथी स्वभाव रिपोर्ट – ₹{price}' },
} as const

/**
 * Tool-use analytics dedupe (MC-04A): returns a callback that calls `emit` only for the FIRST valid
 * Lagna in one tool session; later sign changes (exploring other Lagnas) emit nothing. The tool
 * creates one tracker per mounted instance -- no cross-session storage.
 */
export function createFirstResultTracker(emit: () => void): (lagna: string) => void {
  let tracked = false
  return (lagna: string) => {
    if (tracked || seventhSignForLagna(lagna) === null) return
    tracked = true
    emit()
  }
}

/** Stable analytics identifiers (existing WebsiteEvents conventions). */
export const SPOUSE_LAGNA_TOOL_EVENTS = {
  resultFeature: 'spouse_lagna_tool_result',
  reportCtaId: 'spouse_lagna_tool_report_cta',
  screenName: 'spouse_nature_topic',
} as const
