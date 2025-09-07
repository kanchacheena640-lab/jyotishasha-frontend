const rashiMapping = {
  rashi_mapping: {
    aries: {
      name: "मेष",
      english: "Aries",
      syllables: {
        hindi: ["चू", "चु", "चे", "चै", "चो", "चौ", "ल", "ला", "ली", "लि", "लू", "लु", "ले", "लै", "लो", "लौ", "अ", "आ"],
        english: ["Chu", "Choo", "Che", "Chai", "Cho", "Chau", "La", "Laa", "Li", "Lee", "Lu", "Loo", "Le", "Lai", "Lo", "Lau", "A", "Aa"]
      }
    },
    taurus: {
      name: "वृषभ",
      english: "Taurus",
      syllables: {
        hindi: ["इ", "ई", "ऊ", "उ", "ए", "ऐ", "औ", "ओ", "व", "वा", "वी", "वि", "वू", "वु", "वे", "वै", "वो", "वौ"],
        english: ["E", "Ee", "Oo", "u", "Ae", "Ai", "Au", "O", "Va", "Vi", "Vu", "Ve", "Vo"]
      }
    },
    gemini: {
      name: "मिथुन",
      english: "Gemini",
      syllables: {
        hindi: ["क", "का", "की", "कि", "कू", "कु", "के", "कै", "को", "कौ", "घ", "घा", "ङ", "ङा", "छ", "छा", "ह", "हा", "ही", "हि"],
        english: ["Ka", "Kaa", "Ki", "Kee", "Ku", "Koo", "Gha", "Ghaa", "Nga", "Ngaa", "Chha", "Chhaa", "Ke", "Kai", "Ko", "Kau", "Ha", "Haa"]
      }
    },
    cancer: {
      name: "कर्क",
      english: "Cancer",
      syllables: {
        hindi: ["ही", "हि", "हू", "हु", "हे", "है", "हो", "हौ"],
        english: ["Hi", "Hee", "Hu", "Hoo", "He", "Hai", "Ho", "Hau"]
      }
    },
    leo: {
      name: "सिंह",
      english: "Leo",
      syllables: {
        hindi: ["म", "मा", "मी", "मि", "मू", "मु", "मे", "मै", "मो", "मौ", "ट", "टा", "टी", "टि", "टू", "टु", "टे", "टै"],
        english: ["Ma", "Maa", "Mi", "Mee", "Mu", "Moo", "Me", "Mai", "Mo", "Mau", "Ta", "Taa", "Ti", "Tee", "Tu", "Too", "Te", "Tai"]
      }
    },
    virgo: {
      name: "कन्या",
      english: "Virgo",
      syllables: {
        hindi: ["ढो", "ढौ", "प", "पा", "पी", "पि", "पू", "पु", "ष", "षा", "ण", "णा", "ठ", "ठा", "पे", "pai", "पो", "पौ", "श्र", "श्रा"],
        english: ["Dho", "Dhau", "Pa", "Paa", "Pi", "Pee", "Pu", "Poo", "Sha", "Shaa", "Na", "Naa", "Tha", "Thaa", "Pe", "Pai", "Po", "Pau", "Shr", "Shra"]
      }
    },
    libra: {
      name: "तुला",
      english: "Libra",
      syllables: {
        hindi: ["र", "रा", "री", "रि", "रू", "रु", "रे", "रै", "रो", "रौ", "त", "ता", "ती", "ति", "तू", "तु", "ते", "तै", "त्र", "त्रा"],
        english: ["Ra", "Raa", "Ri", "Ree", "Ru", "Roo", "Re", "Rai", "Ro", "Rau", "Ta", "Taa", "Ti", "Tee", "Tu", "Too", "Te", "Tai", "Tr", "Tra"]
      }
    },
    scorpio: {
      name: "वृश्चिक",
      english: "Scorpio",
      syllables: {
        hindi: ["तो", "त", "न", "ना", "नी", "नि", "नू", "नु", "ने", "नै", "नो", "नौ", "य", "या", "यी", "यि", "यू", "यु"],
        english: ["To", "Ta", "Na", "N", "Ni", "Nee", "Nu", "Noo", "Ne", "Nai", "No", "Nau", "Ya", "Yaa", "Yi", "Ye", "Yu", "Yoo"]
      }
    },
    sagittarius: {
      name: "धनु",
      english: "Sagittarius",
      syllables: {
        hindi: ["ये", "यि", "यो", "यौ", "भा", "भ", "भी", "भि", "भू", "भु", "धा", "ध", "फा", "फ", "ढा", "ढ", "भे", "भै", "ध्र", "ध्रा"],
        english: ["Ye", "Yi", "Yo", "Yau", "Bha", "Bh", "Bhi", "Bhi", "Bhu", "Bhu", "Dha", "Dh", "F", "Fi", "Pha", "Ph", "Dha", "Dhaa", "Bhe", "Bhai", "dhr", "dhra"]
      }
    },
    capricorn: {
      name: "मकर",
      english: "Capricorn",
      syllables: {
        hindi: ["भो", "भो", "जा", "ज", "जी", "जि", "खी", "खि", "खू", "खु", "खे", "खै", "खो", "खौ", "गा", "ग", "गी", "गि", "ज्ञ", "ज्ञा"],
        english: ["Bho", "Bhau", "Ja", "J", "Ji", "Je", "Khi", "Khi", "Khu", "Khoo", "Khe", "Kai", "Kho", "Kau", "Ga", "G", "Gi", "Ge", "Gya", "Gyaa"]
      }
    },
    aquarius: {
      name: "कुंभ",
      english: "Aquarius",
      syllables: {
        hindi: ["गू", "गु", "गे", "गै", "गो", "गौ", "सा", "स", "सी", "सि", "सू", "सु", "से", "सै", "सो", "सौ", "द", "दा"],
        english: ["Gu", "Goo", "Ge", "Gai", "Go", "Gau", "Sa", "S", "Si", "See", "Su", "Soo", "Se", "Sai", "So", "Sau", "Da", "Daa"]
      }
    },
    pisces: {
      name: "मीन",
      english: "Pisces",
      syllables: {
        hindi: ["दी", "दि", "दू", "दु", "थ", "था", "झ", "झा", "ञ", "ञा", "दे", "दै", "दो", "दौ", "चा", "च", "ची", "चि"],
        english: ["Di", "De", "Du", "Doo", "Tha", "Thaa", "Jha", "Jhaa", "Gna", "Gnaa", "Dee", "Dai", "Do", "Dau", "Cha", "Ch", "Chi", "Chi"]
      }
    }
  }
};

export default rashiMapping;
