export interface ReportSeoContent {
  seoTitle: {
    en: string;
    hi: string;
  };

  seoDescription: {
    en: string;
    hi: string;
  };

  whyImportant: {
    en: string;
    hi: string;
  };

  reportSections: {
    en: string[];
    hi: string[];
  };

  targetKeywords: string[];

  benefits?: {
    en: string[];
    hi: string[];
  };

  faqs?: {
    en: {
      question: string;
      answer: string;
    }[];

    hi: {
      question: string;
      answer: string;
    }[];
  };

  whoShouldBuy?: {
    en: string[];
    hi: string[];
  };
}

export const reportSeoContent: Record<string, ReportSeoContent> = {
    government_job_report: {
  seoTitle: {
    en: "Government Job Prediction Report | Will I Get a Government Job?",
    hi: "सरकारी नौकरी भविष्यवाणी रिपोर्ट | क्या मुझे सरकारी नौकरी मिलेगी?"
  },

  seoDescription: {
    en: "Personalized Government Job Astrology Report to analyze your chances of securing a government job, suitable departments, success periods, challenges, and remedies based on your birth chart.",
    hi: "व्यक्तिगत सरकारी नौकरी ज्योतिष रिपोर्ट जो आपकी कुंडली के आधार पर सरकारी नौकरी की संभावना, उपयुक्त विभाग, सफलता का समय, चुनौतियाँ और उपायों का विश्लेषण करती है।"
  },

  whyImportant: {
    en: "Government jobs offer stability, prestige, financial security, and long-term career growth. However, success often depends on the right combination of effort, timing, and planetary support. This report helps identify whether government service is strongly indicated in your horoscope, which departments suit you best, favorable periods for exams and selection, and the obstacles that may be delaying success.",
    hi: "सरकारी नौकरी स्थिरता, सम्मान, आर्थिक सुरक्षा और दीर्घकालिक करियर विकास प्रदान करती है। लेकिन सफलता केवल मेहनत पर नहीं बल्कि सही समय और ग्रहों के सहयोग पर भी निर्भर करती है। यह रिपोर्ट बताती है कि आपकी कुंडली में सरकारी सेवा के कितने प्रबल योग हैं, कौन से विभाग आपके लिए उपयुक्त हैं, परीक्षा और चयन के लिए कौन से समय सबसे अनुकूल हैं तथा सफलता में कौन सी बाधाएँ आ रही हैं।"
  },

  reportSections: {
    en: [
      "Government Job Potential Analysis",
      "Suitable Government Departments",
      "Competitive Exam Success Indicators",
      "Dasha & Transit Impact",
      "Best Time Periods for Success",
      "Challenges & Delays",
      "Personalized Remedies",
      "Final Career Verdict"
    ],
    hi: [
      "सरकारी नौकरी योग विश्लेषण",
      "उपयुक्त सरकारी विभाग",
      "प्रतियोगी परीक्षा सफलता संकेत",
      "दशा एवं गोचर प्रभाव",
      "सफलता के सर्वोत्तम समय",
      "बाधाएँ और देरी के कारण",
      "व्यक्तिगत उपाय",
      "अंतिम करियर निष्कर्ष"
    ]
  },

  targetKeywords: [
    "will i get government job",
    "government job prediction",
    "government job astrology",
    "government exam success prediction",
    "government service horoscope",
    "best career government job astrology",
    "government job report",
    "govt job chances astrology"
  ],

  benefits: {
    en: [
      "Understand whether government service is strongly supported in your horoscope.",
      "Identify the most suitable government departments and career paths.",
      "Know favorable periods for exams, interviews, and final selection.",
      "Discover planetary obstacles causing delays or repeated failures.",
      "Receive personalized remedies and practical guidance for success."
    ],
    hi: [
      "जानें कि आपकी कुंडली में सरकारी सेवा के कितने मजबूत योग हैं।",
      "अपने लिए सबसे उपयुक्त सरकारी विभाग और करियर क्षेत्र की पहचान करें।",
      "परीक्षा, इंटरव्यू और अंतिम चयन के लिए अनुकूल समय जानें।",
      "देरी और बार-बार असफलता के पीछे के ग्रहों के प्रभाव को समझें।",
      "सफलता के लिए व्यक्तिगत उपाय और व्यावहारिक मार्गदर्शन प्राप्त करें।"
    ]
  },

  faqs: {
    en: [
      {
        question: "Will I get a government job?",
        answer: "This report analyzes your horoscope to determine the strength of government service combinations and the likelihood of success."
      },
      {
        question: "Does the report include timing predictions?",
        answer: "Yes. Dasha and transit analysis are used to identify favorable periods for preparation, exams, interviews, and selection."
      },
      {
        question: "Can this report suggest suitable departments?",
        answer: "Yes. The report highlights government sectors and career paths that align with your horoscope."
      },
      {
        question: "Are remedies included in the report?",
        answer: "Yes. Personalized astrological remedies are provided wherever necessary."
      },
      {
        question: "How will I receive the report?",
        answer: "The report is delivered as a PDF to your registered email address, usually within five minutes of successful payment."
      }
    ],

    hi: [
      {
        question: "क्या मुझे सरकारी नौकरी मिलेगी?",
        answer: "यह रिपोर्ट आपकी कुंडली का विश्लेषण करके सरकारी नौकरी के योग और सफलता की संभावना का मूल्यांकन करती है।"
      },
      {
        question: "क्या रिपोर्ट में समय संबंधी भविष्यवाणी भी शामिल है?",
        answer: "हाँ। दशा और गोचर विश्लेषण के माध्यम से परीक्षा, इंटरव्यू और चयन के लिए अनुकूल समय बताए जाते हैं।"
      },
      {
        question: "क्या यह रिपोर्ट उपयुक्त विभाग भी बताएगी?",
        answer: "हाँ। रिपोर्ट आपकी कुंडली के अनुसार सबसे उपयुक्त सरकारी विभाग और करियर क्षेत्र सुझाती है।"
      },
      {
        question: "क्या रिपोर्ट में उपाय भी शामिल हैं?",
        answer: "हाँ। आवश्यक होने पर व्यक्तिगत ज्योतिषीय उपाय भी प्रदान किए जाते हैं।"
      },
      {
        question: "रिपोर्ट मुझे कैसे प्राप्त होगी?",
        answer: "भुगतान सफल होने के कुछ मिनटों के भीतर रिपोर्ट PDF के रूप में आपके ईमेल पर भेज दी जाएगी।"
      }
    ]
  },

  whoShouldBuy: {
    en: [
      "Students preparing for government examinations.",
      "Candidates facing repeated failures in competitive exams.",
      "People confused between private and government career paths.",
      "Candidates waiting for interview or final selection results.",
      "Individuals seeking long-term career stability through government service."
    ],

    hi: [
      "सरकारी परीक्षाओं की तैयारी कर रहे विद्यार्थी।",
      "प्रतियोगी परीक्षाओं में बार-बार असफल हो रहे उम्मीदवार।",
      "निजी और सरकारी करियर के बीच भ्रमित लोग।",
      "इंटरव्यू या अंतिम चयन के परिणाम की प्रतीक्षा कर रहे उम्मीदवार।",
      "दीर्घकालिक करियर स्थिरता चाहने वाले व्यक्ति।"
    ]
  }
},


marriage_report: {
  seoTitle: {
    en: "Marriage Prediction Report | When Will I Get Married?",
    hi: "विवाह भविष्यवाणी रिपोर्ट | मेरा विवाह कब होगा?"
  },

  seoDescription: {
    en: "Personalized Marriage Astrology Report to analyze marriage timing, spouse characteristics, compatibility, delays, challenges, and favorable periods based on your birth chart.",
    hi: "व्यक्तिगत विवाह ज्योतिष रिपोर्ट जो आपकी कुंडली के आधार पर विवाह का समय, जीवनसाथी के गुण, अनुकूलता, देरी के कारण, चुनौतियाँ और शुभ समय का विश्लेषण करती है।"
  },

  whyImportant: {
    en: "Marriage is one of the most significant milestones of life. The timing of marriage, quality of relationship, compatibility with spouse, and planetary influences can shape long-term happiness and stability. This report helps identify marriage prospects, possible delays, spouse characteristics, relationship strengths, and favorable periods for marriage.",
    hi: "विवाह जीवन के सबसे महत्वपूर्ण पड़ावों में से एक है। विवाह का समय, वैवाहिक जीवन की गुणवत्ता, जीवनसाथी के साथ अनुकूलता और ग्रहों का प्रभाव दीर्घकालिक सुख और स्थिरता को प्रभावित करते हैं। यह रिपोर्ट विवाह की संभावना, संभावित देरी, जीवनसाथी के गुण, संबंधों की मजबूती और विवाह के अनुकूल समय की जानकारी देती है।"
  },

  reportSections: {
    en: [
      "Marriage Potential Analysis",
      "Marriage Timing Prediction",
      "Spouse Characteristics",
      "Compatibility Indicators",
      "Marriage Delays & Obstacles",
      "Dasha & Transit Impact",
      "Personalized Remedies",
      "Final Marriage Verdict"
    ],
    hi: [
      "विवाह योग विश्लेषण",
      "विवाह समय भविष्यवाणी",
      "जीवनसाथी के गुण",
      "अनुकूलता संकेत",
      "विवाह में देरी और बाधाएँ",
      "दशा एवं गोचर प्रभाव",
      "व्यक्तिगत उपाय",
      "अंतिम विवाह निष्कर्ष"
    ]
  },

  targetKeywords: [
    "when will i get married",
    "marriage prediction",
    "marriage astrology",
    "marriage timing prediction",
    "marriage horoscope analysis",
    "marriage report",
    "future spouse prediction",
    "marriage chances astrology",
    "late marriage prediction",
    "marriage compatibility astrology"
  ],

  benefits: {
    en: [
      "Understand the strength of marriage combinations in your horoscope.",
      "Know the most favorable period for marriage.",
      "Learn about the likely nature and qualities of your future spouse.",
      "Identify delays, obstacles, or doshas affecting marriage.",
      "Receive personalized remedies and practical guidance."
    ],
    hi: [
      "अपनी कुंडली में विवाह योगों की मजबूती को समझें।",
      "विवाह के लिए सबसे अनुकूल समय जानें।",
      "भावी जीवनसाथी के स्वभाव और गुणों के बारे में जानकारी प्राप्त करें।",
      "विवाह में देरी, बाधाओं या दोषों की पहचान करें।",
      "व्यक्तिगत उपाय और व्यावहारिक मार्गदर्शन प्राप्त करें।"
    ]
  },

  faqs: {
    en: [
      {
        question: "When will I get married?",
        answer: "This report analyzes your horoscope, dasha periods, and transits to identify the most favorable marriage timing."
      },
      {
        question: "Can the report predict my future spouse?",
        answer: "The report provides insights into likely personality traits, qualities, and characteristics of your future spouse."
      },
      {
        question: "Does it explain marriage delays?",
        answer: "Yes. The report identifies planetary combinations and influences that may be causing delays or obstacles."
      },
      {
        question: "Are remedies included?",
        answer: "Yes. Personalized remedies are included wherever necessary."
      },
      {
        question: "How will I receive the report?",
        answer: "The report is delivered as a PDF to your registered email address shortly after successful payment."
      }
    ],

    hi: [
      {
        question: "मेरा विवाह कब होगा?",
        answer: "यह रिपोर्ट आपकी कुंडली, दशा और गोचर का विश्लेषण करके विवाह के सबसे अनुकूल समय की जानकारी देती है।"
      },
      {
        question: "क्या रिपोर्ट मेरे भावी जीवनसाथी के बारे में बताएगी?",
        answer: "हाँ। रिपोर्ट जीवनसाथी के संभावित स्वभाव, गुणों और व्यक्तित्व के बारे में जानकारी देती है।"
      },
      {
        question: "क्या विवाह में देरी के कारण बताए जाते हैं?",
        answer: "हाँ। रिपोर्ट उन ग्रहों और योगों की पहचान करती है जो विवाह में देरी या बाधा उत्पन्न कर रहे हैं।"
      },
      {
        question: "क्या इसमें उपाय भी शामिल हैं?",
        answer: "हाँ। आवश्यकता अनुसार व्यक्तिगत ज्योतिषीय उपाय दिए जाते हैं।"
      },
      {
        question: "रिपोर्ट मुझे कैसे मिलेगी?",
        answer: "भुगतान सफल होने के बाद रिपोर्ट PDF के रूप में आपके ईमेल पर भेज दी जाएगी।"
      }
    ]
  },

  whoShouldBuy: {
    en: [
      "Individuals waiting for marriage.",
      "People facing delays in marriage.",
      "Those curious about future spouse characteristics.",
      "Individuals seeking clarity about marriage timing.",
      "Anyone wanting astrological guidance regarding marriage."
    ],

    hi: [
      "विवाह की प्रतीक्षा कर रहे व्यक्ति।",
      "विवाह में देरी का सामना कर रहे लोग।",
      "भावी जीवनसाथी के बारे में जानना चाहने वाले व्यक्ति।",
      "विवाह के समय को लेकर स्पष्टता चाहने वाले लोग।",
      "विवाह संबंधी ज्योतिषीय मार्गदर्शन चाहने वाले सभी व्यक्ति।"
    ]
  }
},

career_report: {
  seoTitle: {
    en: "Career Astrology Report | Best Career Path & Success Timing",
    hi: "करियर ज्योतिष रिपोर्ट | आपके लिए सबसे अच्छा करियर और सफलता का समय"
  },

  seoDescription: {
    en: "Personalized Career Astrology Report to identify the best career path, job opportunities, professional strengths, growth potential, career challenges, and favorable success periods based on your birth chart.",
    hi: "व्यक्तिगत करियर ज्योतिष रिपोर्ट जो आपकी कुंडली के आधार पर सर्वश्रेष्ठ करियर विकल्प, नौकरी के अवसर, पेशेवर ताकत, उन्नति की संभावना, चुनौतियाँ और सफलता के अनुकूल समय का विश्लेषण करती है।"
  },

  whyImportant: {
    en: "Career decisions directly impact income, lifestyle, personal satisfaction, and long-term success. Many people struggle with choosing the right profession, switching jobs, or understanding why career growth is delayed. This report helps identify your strongest career potential, suitable industries, leadership abilities, job stability, growth opportunities, and favorable periods for professional success.",
    hi: "करियर के निर्णय आय, जीवनशैली, संतुष्टि और दीर्घकालिक सफलता को सीधे प्रभावित करते हैं। बहुत से लोग सही पेशा चुनने, नौकरी बदलने या करियर में रुकावट के कारणों को समझने में कठिनाई का सामना करते हैं। यह रिपोर्ट आपके सबसे मजबूत करियर योग, उपयुक्त उद्योग, नेतृत्व क्षमता, नौकरी की स्थिरता, उन्नति के अवसर और सफलता के अनुकूल समय की पहचान करती है।"
  },

  reportSections: {
    en: [
      "Career Potential Analysis",
      "Best Career Fields",
      "Professional Strengths",
      "Leadership & Growth Indicators",
      "Job Change & Promotion Timing",
      "Career Challenges & Obstacles",
      "Dasha & Transit Impact",
      "Final Career Verdict"
    ],

    hi: [
      "करियर योग विश्लेषण",
      "सर्वश्रेष्ठ करियर क्षेत्र",
      "पेशेवर ताकत",
      "नेतृत्व और उन्नति संकेत",
      "नौकरी परिवर्तन एवं प्रमोशन का समय",
      "करियर चुनौतियाँ और बाधाएँ",
      "दशा एवं गोचर प्रभाव",
      "अंतिम करियर निष्कर्ष"
    ]
  },

  targetKeywords: [
    "career prediction",
    "career astrology report",
    "best career according to horoscope",
    "career growth prediction",
    "career guidance astrology",
    "which career is best for me",
    "job success astrology",
    "career horoscope analysis",
    "promotion prediction astrology",
    "career report"
  ],

  benefits: {
    en: [
      "Discover the career path best suited to your horoscope.",
      "Understand your professional strengths and natural talents.",
      "Know favorable periods for job changes, promotions, and growth.",
      "Identify obstacles causing career stagnation or instability.",
      "Receive personalized remedies and practical career guidance."
    ],

    hi: [
      "अपनी कुंडली के अनुसार सबसे उपयुक्त करियर मार्ग जानें।",
      "अपनी पेशेवर ताकत और प्राकृतिक प्रतिभा को समझें।",
      "नौकरी परिवर्तन, प्रमोशन और उन्नति के लिए अनुकूल समय जानें।",
      "करियर में रुकावट या अस्थिरता पैदा करने वाली बाधाओं की पहचान करें।",
      "व्यक्तिगत उपाय और व्यावहारिक करियर मार्गदर्शन प्राप्त करें।"
    ]
  },

  faqs: {
    en: [
      {
        question: "Which career is best for me?",
        answer: "This report analyzes your horoscope to identify career fields and professions that align with your strengths and planetary combinations."
      },
      {
        question: "Can the report predict promotions and growth?",
        answer: "Yes. Dasha and transit analysis help identify favorable periods for promotions, recognition, and career advancement."
      },
      {
        question: "Does the report help with job changes?",
        answer: "Yes. The report highlights suitable periods for changing jobs or pursuing new professional opportunities."
      },
      {
        question: "Are remedies included?",
        answer: "Yes. Personalized astrological remedies are included wherever necessary."
      },
      {
        question: "How will I receive the report?",
        answer: "The report is delivered as a PDF to your registered email address shortly after successful payment."
      }
    ],

    hi: [
      {
        question: "मेरे लिए कौन सा करियर सबसे अच्छा है?",
        answer: "यह रिपोर्ट आपकी कुंडली का विश्लेषण करके उन करियर क्षेत्रों की पहचान करती है जो आपकी क्षमता और ग्रहों के योगों के अनुरूप हैं।"
      },
      {
        question: "क्या रिपोर्ट प्रमोशन और उन्नति का समय बताएगी?",
        answer: "हाँ। दशा और गोचर विश्लेषण के माध्यम से प्रमोशन, पहचान और करियर प्रगति के अनुकूल समय बताए जाते हैं।"
      },
      {
        question: "क्या यह नौकरी बदलने में मदद करती है?",
        answer: "हाँ। रिपोर्ट नौकरी परिवर्तन और नए अवसरों के लिए उपयुक्त समय की जानकारी देती है।"
      },
      {
        question: "क्या इसमें उपाय भी शामिल हैं?",
        answer: "हाँ। आवश्यकता अनुसार व्यक्तिगत ज्योतिषीय उपाय दिए जाते हैं।"
      },
      {
        question: "रिपोर्ट मुझे कैसे प्राप्त होगी?",
        answer: "भुगतान सफल होने के बाद रिपोर्ट PDF के रूप में आपके ईमेल पर भेज दी जाएगी।"
      }
    ]
  },

  whoShouldBuy: {
    en: [
      "Students confused about career selection.",
      "Working professionals seeking career growth.",
      "People planning job changes.",
      "Individuals facing repeated career setbacks.",
      "Anyone seeking clarity about long-term professional success."
    ],

    hi: [
      "करियर चयन को लेकर भ्रमित विद्यार्थी।",
      "करियर उन्नति चाहने वाले नौकरीपेशा व्यक्ति।",
      "नौकरी बदलने की योजना बना रहे लोग।",
      "बार-बार करियर में असफलता या रुकावट झेल रहे व्यक्ति।",
      "दीर्घकालिक पेशेवर सफलता को लेकर स्पष्टता चाहने वाले लोग।"
    ]
  }
},

foreign_travel_report: {
  seoTitle: {
    en: "Foreign Travel & Settlement Report | Will I Go Abroad?",
    hi: "विदेश यात्रा एवं सेटलमेंट रिपोर्ट | क्या मैं विदेश जाऊँगा?"
  },

  seoDescription: {
    en: "Personalized Foreign Travel Astrology Report to analyze chances of foreign travel, overseas education, work opportunities, immigration, permanent settlement, and favorable timing based on your birth chart.",
    hi: "व्यक्तिगत विदेश यात्रा ज्योतिष रिपोर्ट जो आपकी कुंडली के आधार पर विदेश यात्रा, उच्च शिक्षा, नौकरी, इमिग्रेशन, स्थायी सेटलमेंट और अनुकूल समय का विश्लेषण करती है।"
  },

  whyImportant: {
    en: "Many people dream of studying, working, traveling, or permanently settling abroad. However, foreign opportunities often depend on specific planetary combinations, dasha periods, and transit support. This report helps identify whether foreign travel or settlement is strongly indicated in your horoscope, the most favorable countries and opportunities, potential obstacles, and the best timing for international success.",
    hi: "बहुत से लोग विदेश में पढ़ाई, नौकरी, यात्रा या स्थायी रूप से बसने का सपना देखते हैं। लेकिन ऐसे अवसर अक्सर विशेष ग्रह योगों, दशाओं और गोचर के समर्थन पर निर्भर करते हैं। यह रिपोर्ट बताती है कि आपकी कुंडली में विदेश यात्रा या विदेश में बसने के कितने प्रबल योग हैं, कौन से अवसर सबसे अधिक अनुकूल हैं, कौन सी बाधाएँ सामने आ सकती हैं और सफलता का सर्वोत्तम समय क्या है।"
  },

  reportSections: {
    en: [
      "Foreign Travel Potential Analysis",
      "Overseas Education Opportunities",
      "Work Abroad Possibilities",
      "Permanent Settlement Indicators",
      "Immigration & Visa Success Factors",
      "Dasha & Transit Impact",
      "Challenges & Delays",
      "Final Foreign Settlement Verdict"
    ],

    hi: [
      "विदेश यात्रा योग विश्लेषण",
      "विदेशी शिक्षा के अवसर",
      "विदेश में नौकरी की संभावनाएँ",
      "स्थायी सेटलमेंट संकेत",
      "इमिग्रेशन एवं वीज़ा सफलता कारक",
      "दशा एवं गोचर प्रभाव",
      "बाधाएँ और देरी के कारण",
      "अंतिम विदेश सेटलमेंट निष्कर्ष"
    ]
  },

  targetKeywords: [
    "will i go abroad",
    "foreign travel prediction",
    "foreign settlement astrology",
    "abroad settlement horoscope",
    "immigration astrology",
    "foreign travel report",
    "foreign job prediction",
    "study abroad astrology",
    "settlement abroad prediction",
    "foreign travel horoscope"
  ],

  benefits: {
    en: [
      "Understand whether foreign travel is strongly supported in your horoscope.",
      "Identify opportunities for overseas education and employment.",
      "Know the chances of permanent settlement abroad.",
      "Understand delays, visa issues, and immigration obstacles.",
      "Receive personalized remedies and guidance for international success."
    ],

    hi: [
      "जानें कि आपकी कुंडली में विदेश यात्रा के कितने मजबूत योग हैं।",
      "विदेशी शिक्षा और नौकरी के अवसरों की पहचान करें।",
      "विदेश में स्थायी रूप से बसने की संभावना जानें।",
      "वीज़ा, इमिग्रेशन और देरी के कारणों को समझें।",
      "अंतरराष्ट्रीय सफलता के लिए व्यक्तिगत उपाय और मार्गदर्शन प्राप्त करें।"
    ]
  },

  faqs: {
    en: [
      {
        question: "Will I go abroad?",
        answer: "This report analyzes your horoscope to determine the strength of foreign travel and overseas opportunities."
      },
      {
        question: "Can the report predict foreign settlement?",
        answer: "Yes. The report evaluates planetary combinations related to long-term residence and settlement abroad."
      },
      {
        question: "Does it cover overseas education and jobs?",
        answer: "Yes. The report analyzes both education and career opportunities in foreign countries."
      },
      {
        question: "Are remedies included?",
        answer: "Yes. Personalized astrological remedies are provided wherever necessary."
      },
      {
        question: "How will I receive the report?",
        answer: "The report is delivered as a PDF to your registered email address shortly after successful payment."
      }
    ],

    hi: [
      {
        question: "क्या मैं विदेश जाऊँगा?",
        answer: "यह रिपोर्ट आपकी कुंडली का विश्लेषण करके विदेश यात्रा और विदेशी अवसरों की संभावना का मूल्यांकन करती है।"
      },
      {
        question: "क्या रिपोर्ट विदेश में सेटलमेंट के बारे में बताएगी?",
        answer: "हाँ। रिपोर्ट विदेश में लंबे समय तक रहने और स्थायी सेटलमेंट के योगों का विश्लेषण करती है।"
      },
      {
        question: "क्या इसमें विदेशी शिक्षा और नौकरी भी शामिल है?",
        answer: "हाँ। रिपोर्ट विदेश में पढ़ाई और करियर के अवसरों का भी विश्लेषण करती है।"
      },
      {
        question: "क्या इसमें उपाय भी शामिल हैं?",
        answer: "हाँ। आवश्यकता अनुसार व्यक्तिगत ज्योतिषीय उपाय दिए जाते हैं।"
      },
      {
        question: "रिपोर्ट मुझे कैसे प्राप्त होगी?",
        answer: "भुगतान सफल होने के बाद रिपोर्ट PDF के रूप में आपके ईमेल पर भेज दी जाएगी।"
      }
    ]
  },

  whoShouldBuy: {
    en: [
      "Students planning higher education abroad.",
      "Professionals seeking international job opportunities.",
      "Individuals planning immigration or permanent settlement.",
      "People facing repeated visa or travel delays.",
      "Anyone seeking clarity about foreign opportunities."
    ],

    hi: [
      "विदेश में उच्च शिक्षा की योजना बना रहे विद्यार्थी।",
      "अंतरराष्ट्रीय नौकरी के अवसर तलाश रहे पेशेवर।",
      "इमिग्रेशन या स्थायी सेटलमेंट की योजना बना रहे व्यक्ति।",
      "बार-बार वीज़ा या यात्रा में देरी का सामना कर रहे लोग।",
      "विदेशी अवसरों को लेकर स्पष्टता चाहने वाले सभी व्यक्ति।"
    ]
  }
},

love_relationship_report: {
  seoTitle: {
    en: "Love & Relationship Report | Love Life Prediction & Compatibility",
    hi: "प्रेम एवं रिलेशनशिप रिपोर्ट | प्रेम जीवन और अनुकूलता भविष्यवाणी"
  },

  seoDescription: {
    en: "Personalized Love & Relationship Astrology Report to analyze love life, relationship compatibility, emotional patterns, future possibilities, challenges, and long-term relationship potential.",
    hi: "व्यक्तिगत प्रेम एवं रिलेशनशिप ज्योतिष रिपोर्ट जो प्रेम जीवन, अनुकूलता, भावनात्मक पैटर्न, भविष्य की संभावनाएँ, चुनौतियाँ और दीर्घकालिक संबंधों की क्षमता का विश्लेषण करती है।"
  },

  whyImportant: {
    en: "Relationships have a major impact on emotional well-being, happiness, and life satisfaction. Understanding relationship patterns, compatibility, emotional needs, and future possibilities can help avoid disappointment and build stronger connections. This report reveals your love potential, relationship strengths, compatibility factors, emotional tendencies, and future romantic opportunities.",
    hi: "रिश्ते व्यक्ति के भावनात्मक स्वास्थ्य, खुशी और जीवन संतुष्टि पर गहरा प्रभाव डालते हैं। संबंधों के पैटर्न, अनुकूलता, भावनात्मक आवश्यकताओं और भविष्य की संभावनाओं को समझना बेहतर निर्णय लेने में मदद करता है। यह रिपोर्ट आपके प्रेम जीवन की संभावनाएँ, संबंधों की मजबूती, अनुकूलता के संकेत, भावनात्मक प्रवृत्तियाँ और भविष्य के रोमांटिक अवसरों का विश्लेषण करती है।"
  },

  reportSections: {
    en: [
      "Love Life Potential Analysis",
      "Relationship Compatibility Factors",
      "Emotional Strengths & Weaknesses",
      "Relationship Challenges",
      "Future Relationship Opportunities",
      "Dasha & Transit Impact",
      "Personalized Remedies",
      "Final Relationship Verdict"
    ],

    hi: [
      "प्रेम जीवन योग विश्लेषण",
      "रिलेशनशिप अनुकूलता कारक",
      "भावनात्मक ताकत और कमजोरियाँ",
      "संबंधों की चुनौतियाँ",
      "भविष्य के प्रेम अवसर",
      "दशा एवं गोचर प्रभाव",
      "व्यक्तिगत उपाय",
      "अंतिम रिलेशनशिप निष्कर्ष"
    ]
  },

  targetKeywords: [
    "love prediction astrology",
    "relationship astrology",
    "love life prediction",
    "relationship future prediction",
    "love compatibility report",
    "future relationship astrology",
    "relationship horoscope analysis",
    "love horoscope prediction",
    "relationship compatibility astrology",
    "love report"
  ],

  benefits: {
    en: [
      "Understand your love life potential and relationship patterns.",
      "Discover compatibility strengths and relationship challenges.",
      "Learn about emotional needs and romantic behavior.",
      "Identify future relationship opportunities and timing.",
      "Receive personalized remedies and relationship guidance."
    ],

    hi: [
      "अपने प्रेम जीवन की संभावनाओं और संबंध पैटर्न को समझें।",
      "अनुकूलता की मजबूती और संबंधों की चुनौतियों को जानें।",
      "भावनात्मक आवश्यकताओं और प्रेम व्यवहार को समझें।",
      "भविष्य के प्रेम अवसरों और अनुकूल समय की जानकारी प्राप्त करें।",
      "व्यक्तिगत उपाय और संबंध मार्गदर्शन प्राप्त करें।"
    ]
  },

  faqs: {
    en: [
      {
        question: "Will I find true love?",
        answer: "This report analyzes your horoscope to understand your love potential, emotional compatibility, and future romantic opportunities."
      },
      {
        question: "Does the report check compatibility?",
        answer: "Yes. It evaluates relationship compatibility indicators and emotional harmony factors."
      },
      {
        question: "Can it predict future relationships?",
        answer: "Yes. Dasha and transit analysis help identify important relationship opportunities and phases."
      },
      {
        question: "Are remedies included?",
        answer: "Yes. Personalized astrological remedies are included wherever necessary."
      },
      {
        question: "How will I receive the report?",
        answer: "The report is delivered as a PDF to your registered email address shortly after successful payment."
      }
    ],

    hi: [
      {
        question: "क्या मुझे सच्चा प्यार मिलेगा?",
        answer: "यह रिपोर्ट आपकी कुंडली का विश्लेषण करके प्रेम की संभावनाओं, भावनात्मक अनुकूलता और भविष्य के प्रेम अवसरों का मूल्यांकन करती है।"
      },
      {
        question: "क्या रिपोर्ट अनुकूलता की जाँच करती है?",
        answer: "हाँ। यह संबंधों की अनुकूलता और भावनात्मक सामंजस्य के संकेतों का विश्लेषण करती है।"
      },
      {
        question: "क्या यह भविष्य के रिश्तों की भविष्यवाणी कर सकती है?",
        answer: "हाँ। दशा और गोचर विश्लेषण के माध्यम से महत्वपूर्ण प्रेम अवसरों और संबंधों के चरणों की पहचान की जाती है।"
      },
      {
        question: "क्या इसमें उपाय भी शामिल हैं?",
        answer: "हाँ। आवश्यकता अनुसार व्यक्तिगत ज्योतिषीय उपाय दिए जाते हैं।"
      },
      {
        question: "रिपोर्ट मुझे कैसे प्राप्त होगी?",
        answer: "भुगतान सफल होने के बाद रिपोर्ट PDF के रूप में आपके ईमेल पर भेज दी जाएगी।"
      }
    ]
  },

  whoShouldBuy: {
    en: [
      "Individuals seeking clarity in their love life.",
      "People facing relationship challenges.",
      "Those curious about compatibility with a partner.",
      "Individuals recovering from relationship disappointments.",
      "Anyone seeking long-term relationship guidance."
    ],

    hi: [
      "अपने प्रेम जीवन को लेकर स्पष्टता चाहने वाले व्यक्ति।",
      "रिश्तों में चुनौतियों का सामना कर रहे लोग।",
      "अपने साथी के साथ अनुकूलता जानने के इच्छुक व्यक्ति।",
      "रिश्तों में निराशा का अनुभव कर चुके लोग।",
      "दीर्घकालिक संबंध मार्गदर्शन चाहने वाले सभी व्यक्ति।"
    ]
  }
},

financial_report: {
  seoTitle: {
    en: "Financial Astrology Report | Wealth, Income & Financial Stability Analysis",
    hi: "फाइनेंशियल एस्ट्रोलॉजी रिपोर्ट | धन, आय और आर्थिक स्थिरता विश्लेषण",
  },

  seoDescription: {
    en: "Discover your wealth potential, income patterns, savings habits, investment opportunities, financial strengths, challenges, and long-term prosperity through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से अपनी धन क्षमता, आय के स्रोत, बचत की प्रवृत्ति, निवेश के अवसर, आर्थिक चुनौतियाँ और दीर्घकालिक वित्तीय स्थिरता को समझें।",
  },

  whyImportant: {
    en: "Financial success is not determined by luck alone. Your birth chart reveals how money flows into your life, how you manage resources, periods of financial growth, and potential obstacles. This report helps you understand your financial strengths, identify wealth-building opportunities, and make more confident decisions about income, investments, business, and long-term stability.",
    hi: "आर्थिक सफलता केवल भाग्य पर निर्भर नहीं होती। आपकी जन्म कुंडली यह दर्शाती है कि धन आपके जीवन में कैसे आता है, आप संसाधनों का प्रबंधन कैसे करते हैं, कब आर्थिक वृद्धि के अवसर मिलते हैं और किन चुनौतियों का सामना करना पड़ सकता है। यह रिपोर्ट आपकी आर्थिक क्षमताओं और धन वृद्धि के अवसरों को समझने में मदद करती है।",
  },

  reportSections: {
    en: [
      "Overall Wealth Potential Analysis",
      "Income Sources & Earning Capacity",
      "Financial Strengths and Weaknesses",
      "Savings and Spending Patterns",
      "Investment Potential",
      "Business vs Job Wealth Analysis",
      "Property and Asset Growth Possibilities",
      "Major Financial Growth Periods",
      "Financial Challenges and Risks",
      "Planetary Impact on Wealth",
      "Dasha-Based Money Trends",
      "Personalized Financial Remedies",
    ],
    hi: [
      "समग्र धन क्षमता विश्लेषण",
      "आय के स्रोत और कमाई की क्षमता",
      "आर्थिक शक्तियाँ और कमजोरियाँ",
      "बचत और खर्च की प्रवृत्ति",
      "निवेश की संभावनाएँ",
      "नौकरी बनाम व्यवसाय से धन योग",
      "संपत्ति और एसेट वृद्धि संभावनाएँ",
      "प्रमुख आर्थिक वृद्धि के समय",
      "वित्तीय चुनौतियाँ और जोखिम",
      "धन पर ग्रहों का प्रभाव",
      "दशा आधारित आर्थिक रुझान",
      "व्यक्तिगत वित्तीय उपाय",
    ],
  },

  targetKeywords: [
    "financial astrology report",
    "wealth astrology report",
    "money prediction astrology",
    "financial stability astrology",
    "wealth horoscope report",
    "income prediction astrology",
    "financial growth astrology",
    "vedic wealth analysis",
    "money horoscope",
    "wealth and finance report",
  ],

  benefits: {
    en: [
      "Understand your natural wealth-building potential",
      "Identify strong income-generating opportunities",
      "Recognize financial risks before they grow",
      "Plan investments with better awareness",
      "Discover favorable periods for financial growth",
      "Improve long-term financial decision-making",
    ],
    hi: [
      "अपनी धन अर्जित करने की प्राकृतिक क्षमता को समझें",
      "आय बढ़ाने के अवसरों की पहचान करें",
      "आर्थिक जोखिमों को पहले से समझें",
      "निवेश निर्णयों में बेहतर स्पष्टता प्राप्त करें",
      "आर्थिक वृद्धि के अनुकूल समय जानें",
      "दीर्घकालिक वित्तीय योजना को मजबूत बनाएं",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can astrology predict financial success?",
        answer: "Astrology can indicate wealth potential, earning patterns, financial strengths, and favorable periods, helping you make informed decisions.",
      },
      {
        question: "Will this report tell me if I will become rich?",
        answer: "The report analyzes wealth potential, growth opportunities, and challenges rather than making unrealistic promises.",
      },
      {
        question: "Does the report cover investments and savings?",
        answer: "Yes. The report evaluates savings habits, investment tendencies, and financial management patterns visible in your chart.",
      },
      {
        question: "Can this report help business owners?",
        answer: "Yes. The report examines financial prospects for both salaried professionals and business owners.",
      },
    ],
    hi: [
      {
        question: "क्या ज्योतिष आर्थिक सफलता बता सकता है?",
        answer: "ज्योतिष धन क्षमता, आय के पैटर्न और आर्थिक अवसरों के बारे में संकेत दे सकता है, जिससे बेहतर निर्णय लेने में सहायता मिलती है।",
      },
      {
        question: "क्या यह रिपोर्ट बताएगी कि मैं अमीर बनूँगा या नहीं?",
        answer: "रिपोर्ट धन क्षमता, अवसरों और चुनौतियों का विश्लेषण करती है, अवास्तविक वादे नहीं करती।",
      },
      {
        question: "क्या रिपोर्ट निवेश और बचत को भी कवर करती है?",
        answer: "हाँ, रिपोर्ट बचत, निवेश प्रवृत्ति और वित्तीय प्रबंधन के पैटर्न का विश्लेषण करती है।",
      },
      {
        question: "क्या यह रिपोर्ट व्यवसाय करने वालों के लिए उपयोगी है?",
        answer: "हाँ, यह रिपोर्ट नौकरी और व्यवसाय दोनों के आर्थिक पक्ष का विश्लेषण करती है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People seeking financial stability",
      "Professionals planning wealth growth",
      "Business owners and entrepreneurs",
      "Individuals facing recurring money problems",
      "Investors seeking better timing awareness",
      "Anyone interested in long-term prosperity planning",
    ],
    hi: [
      "आर्थिक स्थिरता चाहने वाले लोग",
      "धन वृद्धि की योजना बनाने वाले प्रोफेशनल्स",
      "व्यवसायी और उद्यमी",
      "बार-बार आर्थिक समस्याओं का सामना करने वाले लोग",
      "निवेश करने वाले व्यक्ति",
      "दीर्घकालिक समृद्धि की योजना बनाने वाले लोग",
    ],
  },
},

business_report: {
  seoTitle: {
    en: "Business Astrology Report | Business Success, Growth & Profitability Analysis",
    hi: "बिजनेस एस्ट्रोलॉजी रिपोर्ट | व्यवसाय सफलता, विकास और लाभ विश्लेषण",
  },

  seoDescription: {
    en: "Discover your business potential, entrepreneurial strengths, profit opportunities, growth periods, partnership suitability, and long-term business success through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से अपनी व्यवसायिक क्षमता, उद्यमिता योग, लाभ के अवसर, विकास के समय, साझेदारी की उपयुक्तता और दीर्घकालिक व्यापारिक सफलता को समझें।",
  },

  whyImportant: {
    en: "Not everyone succeeds through the same path. Some charts favor entrepreneurship, while others perform better in structured careers. This report identifies your business potential, leadership ability, decision-making patterns, risk tolerance, and periods that can significantly influence business growth and profitability.",
    hi: "हर व्यक्ति की सफलता का मार्ग अलग होता है। कुछ कुंडलियाँ व्यवसाय के लिए अधिक अनुकूल होती हैं जबकि कुछ नौकरी में बेहतर प्रदर्शन करती हैं। यह रिपोर्ट आपकी व्यवसायिक क्षमता, नेतृत्व कौशल, निर्णय लेने की शैली, जोखिम उठाने की प्रवृत्ति और व्यापारिक विकास के महत्वपूर्ण समयों का विश्लेषण करती है।",
  },

  reportSections: {
    en: [
      "Business Potential Analysis",
      "Entrepreneurial Strength Assessment",
      "Leadership & Decision-Making Style",
      "Profit and Revenue Indicators",
      "Business Expansion Possibilities",
      "Partnership Suitability Analysis",
      "Risk Management Tendencies",
      "Industry and Business Type Suitability",
      "Financial Growth Opportunities",
      "Major Business Growth Periods",
      "Planetary Influence on Business Success",
      "Personalized Remedies for Growth",
    ],
    hi: [
      "व्यवसायिक क्षमता विश्लेषण",
      "उद्यमिता योग का मूल्यांकन",
      "नेतृत्व और निर्णय लेने की शैली",
      "लाभ और राजस्व संकेतक",
      "व्यवसाय विस्तार की संभावनाएँ",
      "साझेदारी उपयुक्तता विश्लेषण",
      "जोखिम प्रबंधन की प्रवृत्ति",
      "उपयुक्त उद्योग और व्यापार क्षेत्र",
      "आर्थिक वृद्धि के अवसर",
      "प्रमुख व्यापारिक विकास काल",
      "व्यवसाय पर ग्रहों का प्रभाव",
      "व्यक्तिगत सफलता उपाय",
    ],
  },

  targetKeywords: [
    "business astrology report",
    "business success astrology",
    "entrepreneurship astrology",
    "business prediction report",
    "business growth astrology",
    "business horoscope report",
    "business profitability astrology",
    "business analysis astrology",
    "entrepreneur report astrology",
    "vedic business report",
  ],

  benefits: {
    en: [
      "Understand your true business potential",
      "Identify strengths as an entrepreneur",
      "Recognize favorable business growth periods",
      "Evaluate partnership suitability",
      "Reduce major business risks through awareness",
      "Make better strategic decisions",
    ],
    hi: [
      "अपनी वास्तविक व्यवसायिक क्षमता को समझें",
      "उद्यमी के रूप में अपनी शक्तियों की पहचान करें",
      "व्यापार वृद्धि के अनुकूल समय जानें",
      "साझेदारी की उपयुक्तता समझें",
      "व्यवसायिक जोखिमों को बेहतर ढंग से पहचानें",
      "रणनीतिक निर्णय लेने में स्पष्टता प्राप्त करें",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can astrology indicate business success?",
        answer: "Astrology can reveal entrepreneurial potential, leadership qualities, and favorable periods that support business growth.",
      },
      {
        question: "Does this report suggest suitable business sectors?",
        answer: "Yes. The report identifies industries and business types that align with your planetary strengths.",
      },
      {
        question: "Can this report help existing business owners?",
        answer: "Yes. It provides insights into growth opportunities, challenges, and strategic timing.",
      },
      {
        question: "Does the report cover business partnerships?",
        answer: "Yes. Partnership potential and collaboration suitability are included in the analysis.",
      },
    ],
    hi: [
      {
        question: "क्या ज्योतिष व्यवसायिक सफलता के संकेत दे सकता है?",
        answer: "हाँ, ज्योतिष उद्यमिता क्षमता, नेतृत्व गुण और व्यापारिक विकास के अनुकूल समयों का संकेत दे सकता है।",
      },
      {
        question: "क्या यह रिपोर्ट उपयुक्त व्यवसाय क्षेत्र बताती है?",
        answer: "हाँ, रिपोर्ट आपके ग्रहों के अनुसार उपयुक्त उद्योग और व्यापार क्षेत्रों का विश्लेषण करती है।",
      },
      {
        question: "क्या यह रिपोर्ट मौजूदा व्यवसायियों के लिए भी उपयोगी है?",
        answer: "हाँ, यह विकास के अवसरों, चुनौतियों और समय निर्धारण पर उपयोगी जानकारी देती है।",
      },
      {
        question: "क्या रिपोर्ट साझेदारी का विश्लेषण करती है?",
        answer: "हाँ, साझेदारी की सफलता और सहयोग की संभावनाओं का भी मूल्यांकन किया जाता है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "Business owners",
      "Entrepreneurs and startup founders",
      "Professionals planning to start a business",
      "People considering business partnerships",
      "Individuals seeking business expansion",
      "Anyone wanting clarity about business success potential",
    ],
    hi: [
      "व्यवसायी",
      "उद्यमी और स्टार्टअप संस्थापक",
      "व्यवसाय शुरू करने की योजना बनाने वाले लोग",
      "साझेदारी पर विचार कर रहे व्यक्ति",
      "व्यवसाय विस्तार चाहने वाले लोग",
      "व्यापारिक सफलता की संभावना जानने वाले व्यक्ति",
    ],
  },
},

property_report: {
  seoTitle: {
    en: "Property Astrology Report | Home, Land & Real Estate Analysis",
    hi: "प्रॉपर्टी एस्ट्रोलॉजी रिपोर्ट | घर, भूमि और रियल एस्टेट विश्लेषण",
  },

  seoDescription: {
    en: "Discover your potential for property ownership, land acquisition, home purchase, real estate investments, property-related challenges, and favorable periods through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से घर, भूमि, रियल एस्टेट निवेश, संपत्ति प्राप्ति के योग, प्रॉपर्टी से जुड़े अवसरों और चुनौतियों का विस्तृत विश्लेषण प्राप्त करें।",
  },

  whyImportant: {
    en: "Buying a home, acquiring land, or building long-term assets is one of the most important financial decisions in life. Your birth chart can reveal your property potential, timing for acquisitions, inheritance possibilities, real estate gains, and obstacles that may affect ownership or investments.",
    hi: "घर, जमीन या संपत्ति खरीदना जीवन के सबसे महत्वपूर्ण आर्थिक निर्णयों में से एक है। आपकी कुंडली यह संकेत देती है कि संपत्ति प्राप्ति के कितने योग हैं, कब निवेश लाभदायक हो सकता है, विरासत से क्या लाभ मिल सकता है और किन बाधाओं का सामना करना पड़ सकता है।",
  },

  reportSections: {
    en: [
      "Property Ownership Potential",
      "Home Purchase Possibilities",
      "Land Acquisition Analysis",
      "Real Estate Investment Prospects",
      "Inheritance and Family Property Indications",
      "Property-Related Financial Gains",
      "Risks and Legal Property Concerns",
      "Property Growth and Asset Building",
      "Best Periods for Property Transactions",
      "Planetary Influence on Real Estate",
      "Dasha-Based Property Opportunities",
      "Personalized Remedies for Property Success",
    ],
    hi: [
      "संपत्ति प्राप्ति की क्षमता",
      "घर खरीदने की संभावनाएँ",
      "भूमि प्राप्ति विश्लेषण",
      "रियल एस्टेट निवेश के अवसर",
      "विरासत और पैतृक संपत्ति संकेत",
      "संपत्ति से आर्थिक लाभ",
      "कानूनी और संपत्ति संबंधी जोखिम",
      "एसेट और प्रॉपर्टी वृद्धि",
      "संपत्ति खरीद-बिक्री के अनुकूल समय",
      "रियल एस्टेट पर ग्रहों का प्रभाव",
      "दशा आधारित प्रॉपर्टी अवसर",
      "संपत्ति सफलता के उपाय",
    ],
  },

  targetKeywords: [
    "property astrology report",
    "real estate astrology",
    "property prediction astrology",
    "home purchase astrology",
    "land ownership astrology",
    "real estate horoscope",
    "property investment astrology",
    "house ownership report",
    "property analysis astrology",
    "vedic property report",
  ],

  benefits: {
    en: [
      "Understand your property ownership potential",
      "Identify favorable periods for property purchase",
      "Recognize inheritance and family asset possibilities",
      "Evaluate real estate investment opportunities",
      "Avoid major property-related risks",
      "Build long-term assets with greater awareness",
    ],
    hi: [
      "संपत्ति प्राप्ति की क्षमता को समझें",
      "घर या जमीन खरीदने के अनुकूल समय जानें",
      "विरासत और पैतृक संपत्ति के संकेत समझें",
      "रियल एस्टेट निवेश के अवसर पहचानें",
      "प्रॉपर्टी से जुड़े जोखिमों को पहले से समझें",
      "दीर्घकालिक एसेट निर्माण की बेहतर योजना बनाएं",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can astrology indicate property ownership?",
        answer: "Yes. The birth chart can reveal property-related potential, ownership tendencies, and favorable acquisition periods.",
      },
      {
        question: "Will this report tell me when to buy property?",
        answer: "The report identifies favorable periods and planetary influences that support property transactions.",
      },
      {
        question: "Does the report cover inherited property?",
        answer: "Yes. It includes analysis of inheritance, family assets, and ancestral property indications.",
      },
      {
        question: "Can this report help real estate investors?",
        answer: "Yes. It highlights investment opportunities, strengths, and potential challenges related to property investments.",
      },
    ],
    hi: [
      {
        question: "क्या ज्योतिष संपत्ति प्राप्ति के योग बता सकता है?",
        answer: "हाँ, कुंडली में संपत्ति, भूमि और घर से जुड़े योगों का विश्लेषण किया जा सकता है।",
      },
      {
        question: "क्या यह रिपोर्ट घर खरीदने का समय बताएगी?",
        answer: "रिपोर्ट उन अनुकूल समयों और ग्रहों के प्रभावों की पहचान करती है जो संपत्ति लेनदेन को समर्थन देते हैं।",
      },
      {
        question: "क्या रिपोर्ट विरासत की संपत्ति को भी कवर करती है?",
        answer: "हाँ, इसमें पैतृक और विरासत में मिलने वाली संपत्ति का विश्लेषण शामिल है।",
      },
      {
        question: "क्या यह रिपोर्ट रियल एस्टेट निवेशकों के लिए उपयोगी है?",
        answer: "हाँ, यह निवेश अवसरों और संभावित जोखिमों के बारे में उपयोगी जानकारी प्रदान करती है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People planning to buy a home",
      "Real estate investors",
      "Individuals interested in land acquisition",
      "Those facing property-related challenges",
      "People wanting to build long-term assets",
      "Anyone seeking clarity about property ownership potential",
    ],
    hi: [
      "घर खरीदने की योजना बनाने वाले लोग",
      "रियल एस्टेट निवेशक",
      "भूमि खरीदने में रुचि रखने वाले व्यक्ति",
      "संपत्ति संबंधी समस्याओं का सामना कर रहे लोग",
      "दीर्घकालिक एसेट बनाने वाले लोग",
      "संपत्ति प्राप्ति की संभावनाएँ जानने वाले व्यक्ति",
    ],
  },
},

financial_stability_report: {
  seoTitle: {
    en: "Financial Stability Report | Long-Term Wealth Security & Money Management Analysis",
    hi: "फाइनेंशियल स्टेबिलिटी रिपोर्ट | दीर्घकालिक आर्थिक सुरक्षा और धन प्रबंधन विश्लेषण",
  },

  seoDescription: {
    en: "Understand your long-term financial stability, money management habits, wealth retention ability, savings potential, financial risks, and future security through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से अपनी दीर्घकालिक आर्थिक स्थिरता, धन प्रबंधन क्षमता, बचत योग, वित्तीय जोखिम और भविष्य की आर्थिक सुरक्षा को समझें।",
  },

  whyImportant: {
    en: "Earning money and retaining wealth are two different abilities. Many people experience financial ups and downs despite good income. This report helps identify your financial stability potential, spending tendencies, savings capacity, debt risks, and the factors that influence long-term financial security.",
    hi: "धन कमाना और धन को लंबे समय तक सुरक्षित रखना दो अलग-अलग क्षमताएँ हैं। कई लोग अच्छी आय के बावजूद आर्थिक अस्थिरता का सामना करते हैं। यह रिपोर्ट आपकी वित्तीय स्थिरता, बचत क्षमता, ऋण जोखिम और दीर्घकालिक आर्थिक सुरक्षा को प्रभावित करने वाले कारकों का विश्लेषण करती है।",
  },

  reportSections: {
    en: [
      "Long-Term Financial Stability Analysis",
      "Money Retention Capacity",
      "Savings Potential Assessment",
      "Spending and Financial Habits",
      "Debt and Financial Risk Indicators",
      "Income Consistency Analysis",
      "Emergency Financial Security",
      "Wealth Preservation Potential",
      "Future Financial Security Outlook",
      "Planetary Influence on Stability",
      "Dasha-Based Financial Trends",
      "Personalized Stability Remedies",
    ],
    hi: [
      "दीर्घकालिक आर्थिक स्थिरता विश्लेषण",
      "धन सुरक्षित रखने की क्षमता",
      "बचत क्षमता का मूल्यांकन",
      "खर्च और वित्तीय आदतें",
      "ऋण और आर्थिक जोखिम संकेतक",
      "आय की स्थिरता विश्लेषण",
      "आपातकालीन आर्थिक सुरक्षा",
      "धन संरक्षण की संभावना",
      "भविष्य की आर्थिक सुरक्षा",
      "स्थिरता पर ग्रहों का प्रभाव",
      "दशा आधारित आर्थिक रुझान",
      "व्यक्तिगत स्थिरता उपाय",
    ],
  },

  targetKeywords: [
    "financial stability report",
    "financial security astrology",
    "money management astrology",
    "wealth retention astrology",
    "financial future report",
    "financial stability prediction",
    "wealth security astrology",
    "money stability horoscope",
    "financial planning astrology",
    "vedic financial stability report",
  ],

  benefits: {
    en: [
      "Understand your long-term financial security potential",
      "Identify money retention strengths and weaknesses",
      "Recognize savings and wealth-building opportunities",
      "Avoid common financial instability patterns",
      "Prepare for future financial challenges",
      "Build a stronger financial foundation",
    ],
    hi: [
      "दीर्घकालिक आर्थिक सुरक्षा को समझें",
      "धन संरक्षण की शक्तियों और कमजोरियों की पहचान करें",
      "बचत और धन निर्माण के अवसर जानें",
      "आर्थिक अस्थिरता के कारणों को समझें",
      "भविष्य की वित्तीय चुनौतियों के लिए तैयार रहें",
      "मजबूत आर्थिक आधार विकसित करें",
    ],
  },

  faqs: {
    en: [
      {
        question: "How is financial stability different from financial success?",
        answer: "Financial success focuses on earning potential, while financial stability focuses on retaining wealth, managing money, and maintaining long-term security.",
      },
      {
        question: "Can this report identify financial risks?",
        answer: "Yes. The report highlights patterns that may contribute to debt, instability, or financial setbacks.",
      },
      {
        question: "Does the report analyze savings habits?",
        answer: "Yes. It evaluates saving tendencies, money management patterns, and wealth preservation potential.",
      },
      {
        question: "Can astrology help improve financial planning?",
        answer: "Astrology can provide awareness of strengths, weaknesses, and timing factors that support better financial decisions.",
      },
    ],
    hi: [
      {
        question: "फाइनेंशियल स्टेबिलिटी और फाइनेंशियल सफलता में क्या अंतर है?",
        answer: "फाइनेंशियल सफलता आय अर्जित करने की क्षमता से जुड़ी होती है, जबकि फाइनेंशियल स्टेबिलिटी धन को सुरक्षित रखने और दीर्घकालिक सुरक्षा से संबंधित होती है।",
      },
      {
        question: "क्या यह रिपोर्ट आर्थिक जोखिमों की पहचान कर सकती है?",
        answer: "हाँ, यह रिपोर्ट उन पैटर्नों को पहचानती है जो ऋण, अस्थिरता या आर्थिक समस्याओं का कारण बन सकते हैं।",
      },
      {
        question: "क्या रिपोर्ट बचत की आदतों का विश्लेषण करती है?",
        answer: "हाँ, इसमें बचत क्षमता, धन प्रबंधन और वित्तीय अनुशासन का मूल्यांकन शामिल है।",
      },
      {
        question: "क्या ज्योतिष वित्तीय योजना में सहायता कर सकता है?",
        answer: "हाँ, ज्योतिष आपकी आर्थिक शक्तियों, कमजोरियों और महत्वपूर्ण समयों के बारे में जागरूकता प्रदान कर सकता है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People seeking long-term financial security",
      "Individuals struggling with money retention",
      "Professionals planning future wealth",
      "Families focused on financial stability",
      "People wanting stronger savings habits",
      "Anyone seeking financial peace of mind",
    ],
    hi: [
      "दीर्घकालिक आर्थिक सुरक्षा चाहने वाले लोग",
      "धन सुरक्षित रखने में कठिनाई महसूस करने वाले व्यक्ति",
      "भविष्य की आर्थिक योजना बनाने वाले प्रोफेशनल्स",
      "आर्थिक स्थिरता पर ध्यान देने वाले परिवार",
      "बचत क्षमता मजबूत करना चाहने वाले लोग",
      "आर्थिक मानसिक शांति चाहने वाले व्यक्ति",
    ],
  },
},

startup_suggestion_report: {
  seoTitle: {
    en: "Startup Suggestion Report | Best Startup Ideas & Entrepreneurial Potential Analysis",
    hi: "स्टार्टअप सजेशन रिपोर्ट | उपयुक्त स्टार्टअप आइडिया और उद्यमिता क्षमता विश्लेषण",
  },

  seoDescription: {
    en: "Discover the startup ideas, industries, business models, entrepreneurial strengths, leadership abilities, and growth opportunities most aligned with your birth chart through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से अपने लिए सबसे उपयुक्त स्टार्टअप आइडिया, उद्योग, बिजनेस मॉडल, उद्यमिता क्षमता, नेतृत्व गुण और विकास के अवसरों को जानें।",
  },

  whyImportant: {
    en: "Many startups fail not because of a lack of effort but because founders choose industries or business models that do not align with their natural strengths. This report helps identify sectors, startup types, leadership patterns, and entrepreneurial opportunities that match your birth chart and increase your chances of sustainable success.",
    hi: "कई स्टार्टअप मेहनत की कमी से नहीं बल्कि गलत क्षेत्र चुनने के कारण असफल होते हैं। यह रिपोर्ट आपकी कुंडली के अनुसार ऐसे स्टार्टअप क्षेत्र, बिजनेस मॉडल और उद्यमिता अवसरों की पहचान करती है जो आपकी प्राकृतिक क्षमताओं के अनुकूल हों।",
  },

  reportSections: {
    en: [
      "Entrepreneurial Potential Analysis",
      "Startup Founder Strength Assessment",
      "Best Startup Industry Suggestions",
      "Technology vs Traditional Business Suitability",
      "Service vs Product-Based Business Analysis",
      "Leadership and Team Building Ability",
      "Risk-Taking and Innovation Capacity",
      "Funding and Growth Potential",
      "Major Startup Growth Periods",
      "Business Scaling Possibilities",
      "Planetary Influence on Entrepreneurship",
      "Personalized Startup Success Remedies",
    ],
    hi: [
      "उद्यमिता क्षमता विश्लेषण",
      "स्टार्टअप संस्थापक योग मूल्यांकन",
      "उपयुक्त स्टार्टअप उद्योग सुझाव",
      "टेक्नोलॉजी बनाम पारंपरिक व्यवसाय उपयुक्तता",
      "सर्विस और प्रोडक्ट आधारित बिजनेस विश्लेषण",
      "नेतृत्व और टीम निर्माण क्षमता",
      "जोखिम और नवाचार की प्रवृत्ति",
      "फंडिंग और विकास संभावनाएँ",
      "स्टार्टअप वृद्धि के प्रमुख समय",
      "व्यवसाय विस्तार की संभावनाएँ",
      "उद्यमिता पर ग्रहों का प्रभाव",
      "स्टार्टअप सफलता के व्यक्तिगत उपाय",
    ],
  },

  targetKeywords: [
    "startup astrology report",
    "startup idea astrology",
    "business idea astrology",
    "entrepreneurship report",
    "startup success astrology",
    "startup prediction report",
    "best business according horoscope",
    "startup suggestion astrology",
    "business suitability report",
    "vedic startup analysis",
  ],

  benefits: {
    en: [
      "Discover startup sectors aligned with your strengths",
      "Understand your entrepreneurial potential",
      "Identify business models best suited to you",
      "Improve decision-making before launching a startup",
      "Recognize growth opportunities and risks",
      "Build a business around your natural abilities",
    ],
    hi: [
      "अपनी क्षमताओं के अनुरूप स्टार्टअप क्षेत्र खोजें",
      "उद्यमिता क्षमता को समझें",
      "अपने लिए उपयुक्त बिजनेस मॉडल जानें",
      "स्टार्टअप शुरू करने से पहले बेहतर निर्णय लें",
      "विकास के अवसरों और जोखिमों को पहचानें",
      "अपनी प्राकृतिक शक्तियों पर आधारित व्यवसाय बनाएं",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can astrology suggest startup ideas?",
        answer: "Astrology can identify industries, business models, and entrepreneurial strengths that are naturally supported by your birth chart.",
      },
      {
        question: "Will this report tell me exactly which startup to start?",
        answer: "The report highlights the most suitable business sectors and startup directions rather than recommending a single fixed business.",
      },
      {
        question: "Is this useful for first-time founders?",
        answer: "Yes. The report helps first-time founders understand their strengths, risks, and business suitability.",
      },
      {
        question: "Does the report cover startup growth potential?",
        answer: "Yes. It analyzes expansion opportunities, leadership qualities, and long-term growth indicators.",
      },
    ],
    hi: [
      {
        question: "क्या ज्योतिष स्टार्टअप आइडिया सुझा सकता है?",
        answer: "हाँ, ज्योतिष आपकी कुंडली के अनुसार उपयुक्त उद्योग, बिजनेस मॉडल और उद्यमिता क्षमताओं का संकेत दे सकता है।",
      },
      {
        question: "क्या यह रिपोर्ट बताएगी कि मुझे कौन सा स्टार्टअप शुरू करना चाहिए?",
        answer: "रिपोर्ट आपके लिए सबसे उपयुक्त व्यापारिक क्षेत्रों और दिशाओं की पहचान करती है, किसी एक निश्चित व्यवसाय तक सीमित नहीं रहती।",
      },
      {
        question: "क्या यह पहली बार व्यवसाय शुरू करने वालों के लिए उपयोगी है?",
        answer: "हाँ, यह रिपोर्ट नए उद्यमियों को अपनी शक्तियों और संभावित जोखिमों को समझने में मदद करती है।",
      },
      {
        question: "क्या रिपोर्ट स्टार्टअप की वृद्धि क्षमता भी बताती है?",
        answer: "हाँ, इसमें विस्तार, नेतृत्व और विकास की संभावनाओं का विश्लेषण शामिल है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "Aspiring entrepreneurs",
      "Startup founders",
      "Professionals planning a business venture",
      "People confused about startup ideas",
      "Individuals seeking business direction",
      "Anyone wanting clarity before launching a startup",
    ],
    hi: [
      "उद्यमी बनने की इच्छा रखने वाले लोग",
      "स्टार्टअप संस्थापक",
      "व्यवसाय शुरू करने की योजना बनाने वाले प्रोफेशनल्स",
      "स्टार्टअप आइडिया को लेकर भ्रमित व्यक्ति",
      "व्यवसायिक दिशा खोज रहे लोग",
      "स्टार्टअप शुरू करने से पहले स्पष्टता चाहने वाले व्यक्ति",
    ],
  },
},

love_marriage_report: {
  seoTitle: {
    en: "Love Marriage Astrology Report | Relationship Compatibility & Marriage Success Analysis",
    hi: "लव मैरिज एस्ट्रोलॉजी रिपोर्ट | प्रेम विवाह और वैवाहिक सफलता विश्लेषण",
  },

  seoDescription: {
    en: "Discover your potential for love marriage, relationship compatibility, family acceptance, marriage timing, challenges, and long-term relationship success through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से प्रेम विवाह की संभावना, रिश्ते की अनुकूलता, पारिवारिक स्वीकृति, विवाह का समय, चुनौतियाँ और वैवाहिक सफलता का विश्लेषण प्राप्त करें।",
  },

  whyImportant: {
    en: "Love and marriage are not always influenced by the same planetary factors. Some people experience strong romantic relationships but face obstacles in marriage, while others receive family support and smooth transitions. This report helps you understand your love marriage potential, relationship strengths, emotional compatibility, and the factors that may support or challenge your journey toward marriage.",
    hi: "प्रेम और विवाह हमेशा एक जैसे ग्रहों से प्रभावित नहीं होते। कुछ लोगों को प्रेम संबंधों में सफलता मिलती है लेकिन विवाह में बाधाएँ आती हैं, जबकि कुछ को परिवार का पूरा सहयोग मिलता है। यह रिपोर्ट प्रेम विवाह की संभावना, संबंधों की मजबूती, भावनात्मक अनुकूलता और विवाह तक की यात्रा को प्रभावित करने वाले कारकों का विश्लेषण करती है।",
  },

  reportSections: {
    en: [
      "Love Marriage Potential Analysis",
      "Relationship Compatibility Indicators",
      "Romantic Nature and Emotional Patterns",
      "Family Acceptance Possibilities",
      "Obstacles to Love Marriage",
      "Inter-Caste or Long-Distance Relationship Indicators",
      "Relationship Stability Assessment",
      "Marriage Timing Analysis",
      "Planetary Influence on Love and Marriage",
      "Dasha-Based Relationship Trends",
      "Major Relationship Challenges",
      "Personalized Remedies for Love Marriage Success",
    ],
    hi: [
      "प्रेम विवाह की संभावना विश्लेषण",
      "रिश्ते की अनुकूलता संकेतक",
      "रोमांटिक स्वभाव और भावनात्मक पैटर्न",
      "परिवार की स्वीकृति की संभावनाएँ",
      "प्रेम विवाह में बाधाएँ",
      "अंतरजातीय या लंबी दूरी के संबंध संकेत",
      "रिश्ते की स्थिरता का मूल्यांकन",
      "विवाह समय विश्लेषण",
      "प्रेम और विवाह पर ग्रहों का प्रभाव",
      "दशा आधारित संबंध रुझान",
      "प्रमुख संबंध चुनौतियाँ",
      "प्रेम विवाह सफलता के व्यक्तिगत उपाय",
    ],
  },

  targetKeywords: [
    "love marriage astrology report",
    "love marriage prediction",
    "relationship astrology report",
    "marriage compatibility astrology",
    "love relationship prediction",
    "love marriage horoscope",
    "relationship analysis astrology",
    "marriage success astrology",
    "love compatibility report",
    "vedic love marriage report",
  ],

  benefits: {
    en: [
      "Understand your love marriage potential",
      "Identify relationship strengths and weaknesses",
      "Recognize obstacles before they create problems",
      "Understand family acceptance possibilities",
      "Gain clarity about marriage timing",
      "Improve relationship awareness and decision-making",
    ],
    hi: [
      "प्रेम विवाह की संभावना को समझें",
      "रिश्ते की शक्तियों और कमजोरियों की पहचान करें",
      "संभावित बाधाओं को पहले से समझें",
      "परिवार की स्वीकृति की संभावनाएँ जानें",
      "विवाह के समय के बारे में स्पष्टता प्राप्त करें",
      "रिश्तों से जुड़े निर्णय बेहतर बनाएं",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can astrology predict love marriage?",
        answer: "Astrology can indicate the likelihood of love marriage, relationship patterns, and factors that support or challenge such unions.",
      },
      {
        question: "Does this report analyze family acceptance?",
        answer: "Yes. The report evaluates planetary influences related to family support, approval, and resistance.",
      },
      {
        question: "Will this report tell me when I will get married?",
        answer: "The report identifies favorable marriage periods and timing indicators visible in your chart.",
      },
      {
        question: "Can this report help if I am already in a relationship?",
        answer: "Yes. It provides insights into compatibility, stability, future challenges, and relationship growth.",
      },
    ],
    hi: [
      {
        question: "क्या ज्योतिष प्रेम विवाह की संभावना बता सकता है?",
        answer: "हाँ, ज्योतिष प्रेम विवाह के योग, संबंधों के पैटर्न और संभावित चुनौतियों का संकेत दे सकता है।",
      },
      {
        question: "क्या यह रिपोर्ट परिवार की स्वीकृति का विश्लेषण करती है?",
        answer: "हाँ, रिपोर्ट परिवार के सहयोग, स्वीकृति और विरोध से जुड़े ग्रहों का अध्ययन करती है।",
      },
      {
        question: "क्या यह रिपोर्ट विवाह का समय बताएगी?",
        answer: "रिपोर्ट आपकी कुंडली में दिखाई देने वाले अनुकूल विवाह काल और समय संकेतों का विश्लेषण करती है।",
      },
      {
        question: "क्या यह रिपोर्ट पहले से रिश्ते में मौजूद लोगों के लिए उपयोगी है?",
        answer: "हाँ, यह अनुकूलता, स्थिरता और भविष्य की चुनौतियों के बारे में महत्वपूर्ण जानकारी प्रदान करती है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People in a committed relationship",
      "Couples planning marriage",
      "Individuals considering love marriage",
      "People facing family opposition",
      "Those seeking marriage timing insights",
      "Anyone wanting clarity about relationship future",
    ],
    hi: [
      "गंभीर रिश्ते में रहने वाले लोग",
      "विवाह की योजना बना रहे कपल्स",
      "प्रेम विवाह पर विचार कर रहे व्यक्ति",
      "परिवार के विरोध का सामना कर रहे लोग",
      "विवाह समय जानने के इच्छुक व्यक्ति",
      "रिश्ते के भविष्य को समझना चाहने वाले लोग",
    ],
  },
},

delay_in_marriage_report: {
  seoTitle: {
    en: "Delay in Marriage Report | Marriage Obstacles & Timing Analysis",
    hi: "विवाह में देरी रिपोर्ट | विवाह बाधाएँ और समय विश्लेषण",
  },

  seoDescription: {
    en: "Understand the astrological reasons behind delayed marriage, relationship obstacles, marriage timing, family influences, and practical remedies through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से विवाह में देरी के कारण, संबंधों की बाधाएँ, विवाह का सही समय, पारिवारिक प्रभाव और प्रभावी उपायों का विश्लेषण प्राप्त करें।",
  },

  whyImportant: {
    en: "Marriage delays can occur for many reasons including planetary influences, personal priorities, family circumstances, career focus, or relationship challenges. This report helps identify the root causes of marriage delays, favorable marriage periods, and practical guidance to navigate this important phase of life with greater clarity.",
    hi: "विवाह में देरी कई कारणों से हो सकती है जैसे ग्रहों का प्रभाव, व्यक्तिगत प्राथमिकताएँ, पारिवारिक परिस्थितियाँ, करियर पर ध्यान या संबंधों की चुनौतियाँ। यह रिपोर्ट विवाह में देरी के वास्तविक कारणों, अनुकूल विवाह समय और आगे की दिशा को स्पष्ट करने में सहायता करती है।",
  },

  reportSections: {
    en: [
      "Marriage Delay Analysis",
      "Major Obstacles to Marriage",
      "Relationship and Compatibility Factors",
      "Family and Social Influences",
      "Career Impact on Marriage Timing",
      "Emotional and Personal Readiness Indicators",
      "Planetary Causes of Marriage Delays",
      "Marriage Timing Assessment",
      "Future Marriage Possibilities",
      "Dasha-Based Marriage Trends",
      "Risk Factors Affecting Marriage",
      "Personalized Remedies for Marriage Progress",
    ],
    hi: [
      "विवाह में देरी का विश्लेषण",
      "विवाह की प्रमुख बाधाएँ",
      "रिश्ते और अनुकूलता कारक",
      "पारिवारिक और सामाजिक प्रभाव",
      "करियर का विवाह पर प्रभाव",
      "भावनात्मक और व्यक्तिगत तैयारी संकेत",
      "विवाह में देरी के ग्रह योग",
      "विवाह समय विश्लेषण",
      "भविष्य के विवाह अवसर",
      "दशा आधारित विवाह रुझान",
      "विवाह को प्रभावित करने वाले जोखिम",
      "विवाह प्रगति के व्यक्तिगत उपाय",
    ],
  },

  targetKeywords: [
    "delay in marriage report",
    "late marriage astrology",
    "marriage delay prediction",
    "marriage obstacles astrology",
    "late marriage horoscope",
    "marriage timing astrology",
    "marriage problem astrology",
    "marriage delay analysis",
    "vedic marriage delay report",
    "marriage remedies astrology",
  ],

  benefits: {
    en: [
      "Understand the true reasons behind marriage delays",
      "Identify major obstacles affecting marriage",
      "Gain clarity about marriage timing",
      "Recognize relationship and family influences",
      "Reduce uncertainty regarding future marriage prospects",
      "Receive personalized astrological guidance",
    ],
    hi: [
      "विवाह में देरी के वास्तविक कारणों को समझें",
      "विवाह में आने वाली प्रमुख बाधाओं की पहचान करें",
      "विवाह के समय के बारे में स्पष्टता प्राप्त करें",
      "रिश्तों और परिवार के प्रभाव को समझें",
      "भविष्य के विवाह अवसरों को लेकर अनिश्चितता कम करें",
      "व्यक्तिगत ज्योतिषीय मार्गदर्शन प्राप्त करें",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can astrology explain why marriage is delayed?",
        answer: "Yes. Astrology can identify planetary combinations, life circumstances, and timing factors that may contribute to marriage delays.",
      },
      {
        question: "Will this report tell me when I may get married?",
        answer: "The report analyzes favorable marriage periods and timing indicators visible in your birth chart.",
      },
      {
        question: "Does the report cover family-related obstacles?",
        answer: "Yes. Family influences, social factors, and compatibility issues are included in the analysis.",
      },
      {
        question: "Can marriage delays always be solved through remedies?",
        answer: "Remedies are intended to improve awareness and support positive actions, but practical decisions and circumstances also play an important role.",
      },
    ],
    hi: [
      {
        question: "क्या ज्योतिष विवाह में देरी का कारण बता सकता है?",
        answer: "हाँ, ज्योतिष ग्रह योग, जीवन परिस्थितियों और समय कारकों का विश्लेषण कर विवाह में देरी के कारणों की पहचान कर सकता है।",
      },
      {
        question: "क्या यह रिपोर्ट विवाह का समय बताएगी?",
        answer: "रिपोर्ट आपकी कुंडली में दिखाई देने वाले अनुकूल विवाह काल और समय संकेतों का विश्लेषण करती है।",
      },
      {
        question: "क्या रिपोर्ट पारिवारिक बाधाओं को भी कवर करती है?",
        answer: "हाँ, इसमें परिवार, सामाजिक परिस्थितियों और अनुकूलता से जुड़ी बाधाओं का भी विश्लेषण शामिल है।",
      },
      {
        question: "क्या उपाय करने से विवाह में देरी हमेशा समाप्त हो जाती है?",
        answer: "उपाय जागरूकता और सकारात्मक दिशा प्रदान करते हैं, लेकिन व्यावहारिक परिस्थितियाँ और निर्णय भी महत्वपूर्ण भूमिका निभाते हैं।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People experiencing delayed marriage",
      "Individuals concerned about marriage timing",
      "Those facing repeated relationship setbacks",
      "People encountering family-related marriage obstacles",
      "Individuals seeking clarity about future marriage prospects",
      "Anyone wanting a deeper understanding of marriage-related challenges",
    ],
    hi: [
      "विवाह में देरी का सामना कर रहे लोग",
      "विवाह के समय को लेकर चिंतित व्यक्ति",
      "बार-बार रिश्तों में असफलता का अनुभव करने वाले लोग",
      "पारिवारिक बाधाओं का सामना कर रहे व्यक्ति",
      "भविष्य के विवाह अवसरों को समझना चाहने वाले लोग",
      "विवाह संबंधी चुनौतियों को गहराई से समझना चाहने वाले व्यक्ति",
    ],
  },
},

children_parenting_report: {
  seoTitle: {
    en: "Children & Parenting Astrology Report | Child Potential, Parenting Style & Family Growth Analysis",
    hi: "चिल्ड्रेन एंड पेरेंटिंग रिपोर्ट | संतान योग, पालन-पोषण और पारिवारिक विकास विश्लेषण",
  },

  seoDescription: {
    en: "Discover your child-related astrological indicators, parenting strengths, family growth potential, relationship with children, and guidance for raising children through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से संतान योग, पालन-पोषण की क्षमता, बच्चों के साथ संबंध, पारिवारिक विकास और माता-पिता के रूप में आपकी भूमिका का विस्तृत विश्लेषण प्राप्त करें।",
  },

  whyImportant: {
    en: "Parenthood is one of the most meaningful journeys in life. Your birth chart can reveal your connection with children, parenting strengths, family responsibilities, and the lessons that come through raising a child. This report helps you understand your role as a parent and build stronger family relationships with greater awareness and confidence.",
    hi: "माता-पिता बनना जीवन के सबसे महत्वपूर्ण अनुभवों में से एक है। आपकी कुंडली बच्चों से जुड़ाव, पालन-पोषण की शैली, पारिवारिक जिम्मेदारियों और संतान से मिलने वाले जीवन के महत्वपूर्ण सबकों का संकेत देती है। यह रिपोर्ट आपको एक बेहतर अभिभावक बनने में सहायता करती है।",
  },

  reportSections: {
    en: [
      "Children Potential Analysis",
      "Parenthood Indicators",
      "Parenting Strength Assessment",
      "Relationship with Children",
      "Family Growth Possibilities",
      "Emotional Bonding Patterns",
      "Challenges in Parenting",
      "Children's Influence on Life",
      "Planetary Influence on Parenthood",
      "Dasha-Based Family Trends",
      "Long-Term Family Development",
      "Personalized Parenting Remedies",
    ],
    hi: [
      "संतान योग विश्लेषण",
      "माता-पिता बनने के संकेत",
      "पालन-पोषण क्षमता मूल्यांकन",
      "बच्चों के साथ संबंध",
      "पारिवारिक विकास की संभावनाएँ",
      "भावनात्मक जुड़ाव के पैटर्न",
      "पालन-पोषण की चुनौतियाँ",
      "जीवन पर बच्चों का प्रभाव",
      "संतान पर ग्रहों का प्रभाव",
      "दशा आधारित पारिवारिक रुझान",
      "दीर्घकालिक पारिवारिक विकास",
      "व्यक्तिगत पालन-पोषण उपाय",
    ],
  },

  targetKeywords: [
    "children astrology report",
    "parenting astrology report",
    "child prediction astrology",
    "parenthood astrology",
    "children horoscope report",
    "family astrology report",
    "child potential astrology",
    "parenting analysis astrology",
    "children and family report",
    "vedic parenting report",
  ],

  benefits: {
    en: [
      "Understand your parenting strengths",
      "Build stronger relationships with children",
      "Recognize family growth opportunities",
      "Prepare for parenting challenges with awareness",
      "Understand emotional bonding patterns",
      "Gain clarity about family responsibilities",
    ],
    hi: [
      "अपनी पालन-पोषण क्षमता को समझें",
      "बच्चों के साथ बेहतर संबंध बनाएं",
      "पारिवारिक विकास के अवसरों को पहचानें",
      "पालन-पोषण की चुनौतियों के लिए तैयार रहें",
      "भावनात्मक जुड़ाव के पैटर्न समझें",
      "पारिवारिक जिम्मेदारियों के बारे में स्पष्टता प्राप्त करें",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can astrology provide insights about children?",
        answer: "Yes. Astrology can reveal child-related indicators, parenting tendencies, and family dynamics visible in the birth chart.",
      },
      {
        question: "Does this report predict the future of my child?",
        answer: "No. The report focuses on your parenting potential, family dynamics, and child-related influences in your chart.",
      },
      {
        question: "Can this report help parents of young children?",
        answer: "Yes. It provides insights into emotional bonding, parenting strengths, and family development.",
      },
      {
        question: "Does the report cover parenting challenges?",
        answer: "Yes. It highlights common parenting challenges and areas requiring greater awareness.",
      },
    ],
    hi: [
      {
        question: "क्या ज्योतिष संतान से जुड़ी जानकारी दे सकता है?",
        answer: "हाँ, ज्योतिष संतान योग, पालन-पोषण की प्रवृत्तियों और पारिवारिक संबंधों के संकेत दे सकता है।",
      },
      {
        question: "क्या यह रिपोर्ट मेरे बच्चे का भविष्य बताएगी?",
        answer: "नहीं, यह रिपोर्ट आपके पालन-पोषण, परिवार और संतान से जुड़े संकेतों पर केंद्रित है।",
      },
      {
        question: "क्या यह रिपोर्ट छोटे बच्चों के माता-पिता के लिए उपयोगी है?",
        answer: "हाँ, यह भावनात्मक जुड़ाव, पालन-पोषण क्षमता और पारिवारिक विकास के बारे में उपयोगी जानकारी देती है।",
      },
      {
        question: "क्या रिपोर्ट पालन-पोषण की चुनौतियों को भी कवर करती है?",
        answer: "हाँ, रिपोर्ट संभावित चुनौतियों और सुधार के क्षेत्रों की पहचान करती है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "Parents of young children",
      "Couples planning a family",
      "Individuals interested in parenthood",
      "Parents seeking stronger family relationships",
      "People wanting insights into parenting style",
      "Anyone interested in family growth and development",
    ],
    hi: [
      "छोटे बच्चों के माता-पिता",
      "परिवार शुरू करने की योजना बना रहे दंपत्ति",
      "माता-पिता बनने की इच्छा रखने वाले लोग",
      "बेहतर पारिवारिक संबंध चाहने वाले अभिभावक",
      "अपनी पालन-पोषण शैली समझना चाहने वाले लोग",
      "पारिवारिक विकास में रुचि रखने वाले व्यक्ति",
    ],
  },
},

divorce_possibility_report: {
  seoTitle: {
    en: "Divorce Possibility Report | Relationship Risks & Marriage Stability Analysis",
    hi: "डिवोर्स पॉसिबिलिटी रिपोर्ट | वैवाहिक जोखिम और संबंध स्थिरता विश्लेषण",
  },

  seoDescription: {
    en: "Understand relationship challenges, marriage stability factors, separation risks, conflict patterns, and long-term relationship prospects through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से वैवाहिक स्थिरता, संबंधों की चुनौतियाँ, अलगाव के संकेत, विवादों के पैटर्न और रिश्ते के भविष्य का विश्लेषण प्राप्त करें।",
  },

  whyImportant: {
    en: "Every relationship experiences challenges, but not every challenge leads to separation. This report helps identify relationship stress factors, communication issues, emotional disconnect patterns, and planetary influences that may affect marital stability. The purpose is not to create fear but to provide awareness and guidance for building stronger relationships.",
    hi: "हर विवाह और संबंध में चुनौतियाँ आती हैं, लेकिन हर चुनौती अलगाव तक नहीं पहुँचती। यह रिपोर्ट वैवाहिक तनाव, संवाद की समस्याओं, भावनात्मक दूरी और वैवाहिक स्थिरता को प्रभावित करने वाले ग्रहों का विश्लेषण करती है। इसका उद्देश्य डर पैदा करना नहीं बल्कि जागरूकता और सुधार का मार्ग दिखाना है।",
  },

  reportSections: {
    en: [
      "Marriage Stability Analysis",
      "Relationship Strength Assessment",
      "Conflict and Communication Patterns",
      "Emotional Compatibility Factors",
      "Separation Risk Indicators",
      "Family and External Influences",
      "Trust and Commitment Analysis",
      "Long-Term Relationship Prospects",
      "Planetary Impact on Marriage",
      "Dasha-Based Relationship Trends",
      "Major Relationship Risk Factors",
      "Personalized Remedies for Relationship Harmony",
    ],
    hi: [
      "वैवाहिक स्थिरता विश्लेषण",
      "रिश्ते की मजबूती का मूल्यांकन",
      "विवाद और संवाद के पैटर्न",
      "भावनात्मक अनुकूलता कारक",
      "अलगाव जोखिम संकेतक",
      "पारिवारिक और बाहरी प्रभाव",
      "विश्वास और प्रतिबद्धता विश्लेषण",
      "दीर्घकालिक संबंध संभावनाएँ",
      "विवाह पर ग्रहों का प्रभाव",
      "दशा आधारित संबंध रुझान",
      "प्रमुख वैवाहिक जोखिम कारक",
      "संबंध सुधार के व्यक्तिगत उपाय",
    ],
  },

  targetKeywords: [
    "divorce possibility report",
    "marriage stability astrology",
    "relationship risk astrology",
    "divorce prediction astrology",
    "marriage problem report",
    "relationship compatibility analysis",
    "marital stability astrology",
    "separation astrology report",
    "relationship future astrology",
    "vedic marriage analysis",
  ],

  benefits: {
    en: [
      "Understand relationship strengths and weaknesses",
      "Identify recurring conflict patterns",
      "Recognize risk factors affecting marriage",
      "Improve communication and emotional awareness",
      "Gain clarity about relationship stability",
      "Receive constructive guidance for stronger relationships",
    ],
    hi: [
      "रिश्ते की शक्तियों और कमजोरियों को समझें",
      "बार-बार होने वाले विवादों के कारण पहचानें",
      "वैवाहिक जोखिम कारकों को समझें",
      "संवाद और भावनात्मक जागरूकता में सुधार करें",
      "रिश्ते की स्थिरता के बारे में स्पष्टता प्राप्त करें",
      "संबंध सुधार हेतु रचनात्मक मार्गदर्शन प्राप्त करें",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can astrology predict divorce with certainty?",
        answer: "No. Astrology can identify relationship challenges and risk factors, but human choices, communication, and circumstances play a major role.",
      },
      {
        question: "Does this report focus only on negative outcomes?",
        answer: "No. The report analyzes both strengths and challenges, helping you understand how to strengthen the relationship.",
      },
      {
        question: "Can this report help married couples?",
        answer: "Yes. It provides insights into relationship dynamics, communication patterns, and potential improvement areas.",
      },
      {
        question: "Does the report suggest remedies?",
        answer: "Yes. Personalized remedies and guidance are included to support relationship harmony and awareness.",
      },
    ],
    hi: [
      {
        question: "क्या ज्योतिष निश्चित रूप से तलाक की भविष्यवाणी कर सकता है?",
        answer: "नहीं। ज्योतिष केवल चुनौतियों और जोखिम कारकों का संकेत देता है। अंतिम परिणाम मानवीय निर्णयों और परिस्थितियों पर निर्भर करता है।",
      },
      {
        question: "क्या यह रिपोर्ट केवल नकारात्मक परिणामों पर केंद्रित है?",
        answer: "नहीं। यह रिपोर्ट रिश्ते की मजबूती और चुनौतियों दोनों का संतुलित विश्लेषण करती है।",
      },
      {
        question: "क्या यह रिपोर्ट विवाहित दंपत्तियों के लिए उपयोगी है?",
        answer: "हाँ, यह वैवाहिक संबंधों, संवाद और सुधार की संभावनाओं के बारे में उपयोगी जानकारी प्रदान करती है।",
      },
      {
        question: "क्या रिपोर्ट में उपाय भी शामिल हैं?",
        answer: "हाँ, संबंधों में सामंजस्य और जागरूकता बढ़ाने के लिए व्यक्तिगत उपाय शामिल हैं।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "Married couples facing relationship challenges",
      "Individuals concerned about marriage stability",
      "People experiencing recurring conflicts",
      "Couples seeking relationship clarity",
      "Individuals wanting to improve marital understanding",
      "Anyone interested in long-term relationship success",
    ],
    hi: [
      "वैवाहिक चुनौतियों का सामना कर रहे दंपत्ति",
      "विवाह की स्थिरता को लेकर चिंतित व्यक्ति",
      "बार-बार विवादों का सामना करने वाले लोग",
      "रिश्ते को बेहतर समझना चाहने वाले दंपत्ति",
      "वैवाहिक जीवन में सुधार चाहने वाले व्यक्ति",
      "दीर्घकालिक संबंध सफलता में रुचि रखने वाले लोग",
    ],
  },
},

jupiter_transit_report: {
  seoTitle: {
    en: "Jupiter Transit Report | Growth, Opportunities & Future Potential Analysis",
    hi: "जुपिटर ट्रांजिट रिपोर्ट | विकास, अवसर और भविष्य की संभावनाओं का विश्लेषण",
  },

  seoDescription: {
    en: "Understand how Jupiter's current transit may influence career, finances, relationships, family, education, spirituality, and long-term growth opportunities through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से जानें कि वर्तमान गुरु गोचर आपके करियर, धन, संबंधों, परिवार, शिक्षा, आध्यात्मिकता और भविष्य की प्रगति को कैसे प्रभावित कर सकता है।",
  },

  whyImportant: {
    en: "Jupiter is considered one of the most influential planets for growth, wisdom, prosperity, and expansion. Its transit can bring opportunities, learning experiences, financial improvements, relationship developments, and major life changes. This report helps you understand how Jupiter's movement interacts with your birth chart and which life areas are most likely to experience growth during this transit period.",
    hi: "गुरु को ज्योतिष में विकास, ज्ञान, समृद्धि और विस्तार का ग्रह माना जाता है। इसका गोचर नए अवसर, आर्थिक सुधार, संबंधों में प्रगति, शिक्षा और जीवन के महत्वपूर्ण परिवर्तनों को प्रभावित कर सकता है। यह रिपोर्ट बताती है कि वर्तमान गुरु गोचर आपकी कुंडली के किन क्षेत्रों को सबसे अधिक प्रभावित कर रहा है।",
  },

  reportSections: {
    en: [
      "Current Jupiter Transit Overview",
      "Personal Growth Opportunities",
      "Career and Professional Impact",
      "Financial and Wealth Influence",
      "Love and Relationship Effects",
      "Marriage and Family Prospects",
      "Education and Learning Potential",
      "Spiritual Development Indicators",
      "Health and Well-Being Trends",
      "Transit Timeline and Key Phases",
      "Transit Challenges and Cautions",
      "Personalized Jupiter Remedies",
    ],
    hi: [
      "वर्तमान गुरु गोचर का अवलोकन",
      "व्यक्तिगत विकास के अवसर",
      "करियर और पेशेवर प्रभाव",
      "धन और आर्थिक प्रभाव",
      "प्रेम और संबंधों पर प्रभाव",
      "विवाह और पारिवारिक संभावनाएँ",
      "शिक्षा और सीखने की क्षमता",
      "आध्यात्मिक विकास संकेत",
      "स्वास्थ्य और जीवनशैली रुझान",
      "गोचर की समयरेखा और प्रमुख चरण",
      "चुनौतियाँ और सावधानियाँ",
      "व्यक्तिगत गुरु उपाय",
    ],
  },

  targetKeywords: [
    "jupiter transit report",
    "guru transit astrology",
    "jupiter transit prediction",
    "jupiter gochar report",
    "jupiter horoscope analysis",
    "guru transit effects",
    "jupiter astrology report",
    "vedic jupiter transit",
    "jupiter future prediction",
    "guru gochar analysis",
  ],

  benefits: {
    en: [
      "Understand how Jupiter affects your chart",
      "Identify major growth opportunities",
      "Recognize favorable periods for progress",
      "Prepare for important life transitions",
      "Improve long-term planning and decision making",
      "Gain clarity about the next phase of life",
    ],
    hi: [
      "समझें कि गुरु आपकी कुंडली को कैसे प्रभावित कर रहा है",
      "विकास के महत्वपूर्ण अवसरों की पहचान करें",
      "प्रगति के अनुकूल समय जानें",
      "महत्वपूर्ण जीवन परिवर्तनों के लिए तैयार रहें",
      "दीर्घकालिक योजना और निर्णय बेहतर बनाएं",
      "जीवन के अगले चरण को लेकर स्पष्टता प्राप्त करें",
    ],
  },

  faqs: {
    en: [
      {
        question: "What is a Jupiter transit?",
        answer: "A Jupiter transit occurs when Jupiter moves from one zodiac sign to another, influencing different areas of life depending on your birth chart.",
      },
      {
        question: "Does Jupiter affect everyone in the same way?",
        answer: "No. The impact depends on your ascendant, planetary placements, current dasha, and the house Jupiter is transiting in your chart.",
      },
      {
        question: "Can Jupiter bring financial growth?",
        answer: "Jupiter is often associated with opportunities, expansion, and prosperity, though the exact impact depends on your personal chart.",
      },
      {
        question: "How long does a Jupiter transit remain effective?",
        answer: "Jupiter typically spends about a year in one sign, making its effects relatively long-lasting compared to fast-moving planets.",
      },
    ],
    hi: [
      {
        question: "गुरु गोचर क्या होता है?",
        answer: "जब गुरु एक राशि से दूसरी राशि में प्रवेश करता है तो उसे गुरु गोचर कहा जाता है, जो कुंडली के विभिन्न क्षेत्रों को प्रभावित करता है।",
      },
      {
        question: "क्या गुरु सभी लोगों को एक जैसा प्रभावित करता है?",
        answer: "नहीं। इसका प्रभाव लग्न, ग्रह स्थिति, दशा और गोचर भाव के अनुसार अलग-अलग होता है।",
      },
      {
        question: "क्या गुरु आर्थिक वृद्धि ला सकता है?",
        answer: "गुरु को अवसर, विस्तार और समृद्धि का ग्रह माना जाता है, लेकिन वास्तविक प्रभाव व्यक्तिगत कुंडली पर निर्भर करता है।",
      },
      {
        question: "गुरु गोचर का प्रभाव कितने समय तक रहता है?",
        answer: "गुरु सामान्यतः लगभग एक वर्ष तक एक राशि में रहता है, इसलिए इसका प्रभाव अपेक्षाकृत लंबे समय तक रहता है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People seeking personal growth",
      "Professionals planning future opportunities",
      "Individuals interested in transit astrology",
      "People facing major life decisions",
      "Those wanting clarity about upcoming trends",
      "Anyone interested in Jupiter's impact on their chart",
    ],
    hi: [
      "व्यक्तिगत विकास चाहने वाले लोग",
      "भविष्य की योजना बनाने वाले प्रोफेशनल्स",
      "गोचर ज्योतिष में रुचि रखने वाले व्यक्ति",
      "महत्वपूर्ण जीवन निर्णय लेने वाले लोग",
      "आने वाले समय को समझना चाहने वाले लोग",
      "अपनी कुंडली पर गुरु के प्रभाव को जानने वाले व्यक्ति",
    ],
  },
},

legal_disputes_report: {
  seoTitle: {
    en: "Legal Disputes Astrology Report | Court Cases, Litigation & Conflict Analysis",
    hi: "लीगल डिस्प्यूट्स रिपोर्ट | कोर्ट केस, मुकदमे और कानूनी विवाद विश्लेषण",
  },

  seoDescription: {
    en: "Understand legal challenges, litigation risks, court case potential, conflict patterns, dispute resolution opportunities, and legal timing through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से कानूनी विवाद, कोर्ट केस की संभावनाएँ, मुकदमेबाजी के जोखिम, विवाद समाधान के अवसर और महत्वपूर्ण समय का विश्लेषण प्राप्त करें।",
  },

  whyImportant: {
    en: "Legal disputes can affect finances, relationships, business, and peace of mind. Whether the issue involves property, family matters, business conflicts, contracts, or litigation, understanding the astrological factors behind disputes can help you prepare better and make informed decisions. This report identifies risk factors, strengths, and favorable periods related to legal matters.",
    hi: "कानूनी विवाद आर्थिक स्थिति, रिश्तों, व्यवसाय और मानसिक शांति को प्रभावित कर सकते हैं। चाहे मामला संपत्ति, परिवार, व्यवसाय, अनुबंध या मुकदमेबाजी से जुड़ा हो, ज्योतिषीय संकेत आपको बेहतर तैयारी और समझदारीपूर्ण निर्णय लेने में सहायता कर सकते हैं। यह रिपोर्ट कानूनी मामलों से जुड़े जोखिमों और अवसरों का विश्लेषण करती है।",
  },

  reportSections: {
    en: [
      "Legal Dispute Potential Analysis",
      "Court Case and Litigation Indicators",
      "Property and Asset Dispute Factors",
      "Business and Contract Conflict Analysis",
      "Family and Relationship Disputes",
      "Financial Impact of Legal Matters",
      "Opposition and Hidden Challenges",
      "Strengths in Legal Situations",
      "Favorable Periods for Resolution",
      "Planetary Influence on Legal Matters",
      "Dasha-Based Legal Trends",
      "Personalized Remedies for Legal Harmony",
    ],
    hi: [
      "कानूनी विवाद संभावना विश्लेषण",
      "कोर्ट केस और मुकदमेबाजी संकेत",
      "संपत्ति और एसेट विवाद कारक",
      "व्यवसाय और अनुबंध विवाद विश्लेषण",
      "पारिवारिक और संबंध विवाद",
      "कानूनी मामलों का आर्थिक प्रभाव",
      "विरोध और छिपी चुनौतियाँ",
      "कानूनी परिस्थितियों में आपकी शक्तियाँ",
      "समाधान के अनुकूल समय",
      "कानूनी मामलों पर ग्रहों का प्रभाव",
      "दशा आधारित कानूनी रुझान",
      "कानूनी शांति हेतु व्यक्तिगत उपाय",
    ],
  },

  targetKeywords: [
    "legal disputes astrology report",
    "court case astrology",
    "litigation astrology report",
    "legal problem astrology",
    "court case prediction",
    "property dispute astrology",
    "legal horoscope report",
    "litigation analysis astrology",
    "court case remedies astrology",
    "vedic legal dispute report",
  ],

  benefits: {
    en: [
      "Understand legal risk factors",
      "Identify dispute-prone areas of life",
      "Recognize favorable periods for resolution",
      "Prepare for potential legal challenges",
      "Gain awareness before major legal decisions",
      "Receive personalized guidance and remedies",
    ],
    hi: [
      "कानूनी जोखिमों को समझें",
      "विवाद संभावित क्षेत्रों की पहचान करें",
      "समाधान के अनुकूल समय जानें",
      "कानूनी चुनौतियों के लिए बेहतर तैयारी करें",
      "महत्वपूर्ण निर्णयों से पहले स्पष्टता प्राप्त करें",
      "व्यक्तिगत मार्गदर्शन और उपाय प्राप्त करें",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can astrology predict court case outcomes?",
        answer: "Astrology can indicate strengths, challenges, and favorable periods related to legal matters, but final outcomes depend on many real-world factors.",
      },
      {
        question: "Does this report cover property disputes?",
        answer: "Yes. Property, inheritance, and asset-related dispute indicators are included in the analysis.",
      },
      {
        question: "Can this report help business owners facing legal issues?",
        answer: "Yes. Business conflicts, contracts, and litigation-related factors are examined in the report.",
      },
      {
        question: "Will the report suggest remedies?",
        answer: "Yes. Personalized remedies and practical guidance are included to improve awareness and preparedness.",
      },
    ],
    hi: [
      {
        question: "क्या ज्योतिष कोर्ट केस का परिणाम बता सकता है?",
        answer: "ज्योतिष कानूनी मामलों से जुड़े अवसरों और चुनौतियों का संकेत दे सकता है, लेकिन अंतिम परिणाम कई व्यावहारिक कारकों पर निर्भर करता है।",
      },
      {
        question: "क्या यह रिपोर्ट संपत्ति विवादों को भी कवर करती है?",
        answer: "हाँ, संपत्ति, विरासत और एसेट से जुड़े विवादों का विश्लेषण इसमें शामिल है।",
      },
      {
        question: "क्या यह रिपोर्ट व्यवसायिक कानूनी समस्याओं के लिए उपयोगी है?",
        answer: "हाँ, व्यवसाय, अनुबंध और मुकदमेबाजी से जुड़े संकेतों का भी विश्लेषण किया जाता है।",
      },
      {
        question: "क्या रिपोर्ट में उपाय भी दिए जाते हैं?",
        answer: "हाँ, जागरूकता और बेहतर निर्णय लेने के लिए व्यक्तिगत उपाय और सुझाव शामिल हैं।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People involved in legal disputes",
      "Individuals facing court cases",
      "Property owners dealing with conflicts",
      "Business owners handling legal challenges",
      "People seeking clarity before legal action",
      "Anyone concerned about litigation risks",
    ],
    hi: [
      "कानूनी विवादों का सामना कर रहे लोग",
      "कोर्ट केस में शामिल व्यक्ति",
      "संपत्ति विवादों से जूझ रहे लोग",
      "कानूनी चुनौतियों का सामना कर रहे व्यवसायी",
      "कानूनी कार्रवाई से पहले स्पष्टता चाहने वाले लोग",
      "मुकदमेबाजी जोखिम को समझना चाहने वाले व्यक्ति",
    ],
  },
},

lifestyle_analysis_report: {
  seoTitle: {
    en: "Lifestyle Analysis Report | Habits, Well-Being & Life Pattern Assessment",
    hi: "लाइफस्टाइल एनालिसिस रिपोर्ट | आदतें, जीवनशैली और व्यक्तिगत विकास विश्लेषण",
  },

  seoDescription: {
    en: "Understand your natural lifestyle tendencies, daily habits, work-life balance, emotional patterns, productivity strengths, and overall well-being through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से अपनी जीवनशैली, दैनिक आदतों, कार्य-जीवन संतुलन, भावनात्मक पैटर्न, उत्पादकता क्षमता और समग्र कल्याण को समझें।",
  },

  whyImportant: {
    en: "Lifestyle choices influence health, relationships, productivity, happiness, and long-term success. Your birth chart can reveal natural behavioral patterns, personal strengths, lifestyle preferences, and areas where small improvements can create meaningful positive changes. This report helps you understand yourself better and build a lifestyle aligned with your natural strengths.",
    hi: "जीवनशैली की आदतें स्वास्थ्य, रिश्तों, उत्पादकता, खुशी और दीर्घकालिक सफलता को प्रभावित करती हैं। आपकी कुंडली आपके स्वाभाविक व्यवहार, जीवनशैली की प्राथमिकताओं और उन क्षेत्रों का संकेत देती है जहाँ छोटे सुधार बड़े सकारात्मक परिणाम ला सकते हैं।",
  },

  reportSections: {
    en: [
      "Lifestyle Pattern Analysis",
      "Daily Habits Assessment",
      "Work-Life Balance Indicators",
      "Productivity and Motivation Style",
      "Stress Management Tendencies",
      "Emotional and Behavioral Patterns",
      "Social and Relationship Lifestyle",
      "Personal Growth Opportunities",
      "Health and Wellness Habits",
      "Planetary Influence on Lifestyle",
      "Dasha-Based Lifestyle Changes",
      "Personalized Lifestyle Improvement Guidance",
    ],
    hi: [
      "जीवनशैली पैटर्न विश्लेषण",
      "दैनिक आदतों का मूल्यांकन",
      "कार्य-जीवन संतुलन संकेतक",
      "उत्पादकता और प्रेरणा शैली",
      "तनाव प्रबंधन की प्रवृत्ति",
      "भावनात्मक और व्यवहारिक पैटर्न",
      "सामाजिक और संबंध जीवनशैली",
      "व्यक्तिगत विकास के अवसर",
      "स्वास्थ्य और वेलनेस आदतें",
      "जीवनशैली पर ग्रहों का प्रभाव",
      "दशा आधारित जीवनशैली परिवर्तन",
      "व्यक्तिगत सुधार मार्गदर्शन",
    ],
  },

  targetKeywords: [
    "lifestyle analysis report",
    "lifestyle astrology report",
    "personality and lifestyle analysis",
    "life pattern astrology",
    "well being astrology report",
    "daily habits astrology",
    "lifestyle horoscope report",
    "self improvement astrology",
    "behavior analysis astrology",
    "vedic lifestyle report",
  ],

  benefits: {
    en: [
      "Understand your natural lifestyle tendencies",
      "Identify habits supporting long-term success",
      "Improve productivity and motivation",
      "Recognize stress and burnout patterns",
      "Strengthen emotional awareness",
      "Create a more balanced and fulfilling lifestyle",
    ],
    hi: [
      "अपनी प्राकृतिक जीवनशैली को समझें",
      "सफलता में सहायक आदतों की पहचान करें",
      "उत्पादकता और प्रेरणा में सुधार करें",
      "तनाव और थकान के पैटर्न पहचानें",
      "भावनात्मक जागरूकता बढ़ाएं",
      "अधिक संतुलित और संतोषजनक जीवनशैली बनाएं",
    ],
  },

  faqs: {
    en: [
      {
        question: "What does a lifestyle analysis report reveal?",
        answer: "It examines habits, behavior patterns, emotional tendencies, productivity style, and lifestyle factors visible in your birth chart.",
      },
      {
        question: "Is this report related to health?",
        answer: "The report includes lifestyle and wellness tendencies but is not a medical diagnosis or health report.",
      },
      {
        question: "Can astrology help improve daily life?",
        answer: "Astrology can provide awareness about strengths, weaknesses, and behavioral patterns that influence everyday life.",
      },
      {
        question: "Who benefits most from this report?",
        answer: "Anyone interested in self-awareness, personal development, and creating a more balanced lifestyle.",
      },
    ],
    hi: [
      {
        question: "लाइफस्टाइल एनालिसिस रिपोर्ट क्या बताती है?",
        answer: "यह आपकी आदतों, व्यवहार, भावनात्मक प्रवृत्तियों, उत्पादकता शैली और जीवनशैली पैटर्न का विश्लेषण करती है।",
      },
      {
        question: "क्या यह स्वास्थ्य रिपोर्ट है?",
        answer: "नहीं। यह जीवनशैली और वेलनेस प्रवृत्तियों का विश्लेषण करती है, चिकित्सा निदान नहीं।",
      },
      {
        question: "क्या ज्योतिष दैनिक जीवन सुधारने में मदद कर सकता है?",
        answer: "हाँ, यह आपकी शक्तियों, कमजोरियों और व्यवहारिक पैटर्न के बारे में जागरूकता प्रदान कर सकता है।",
      },
      {
        question: "यह रिपोर्ट किन लोगों के लिए सबसे उपयोगी है?",
        answer: "जो लोग आत्म-जागरूकता, व्यक्तिगत विकास और बेहतर जीवनशैली चाहते हैं, उनके लिए यह रिपोर्ट उपयोगी है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People interested in self-development",
      "Professionals seeking better work-life balance",
      "Individuals wanting productivity improvement",
      "People looking for lifestyle optimization",
      "Those interested in behavioral patterns",
      "Anyone seeking greater self-awareness",
    ],
    hi: [
      "व्यक्तिगत विकास में रुचि रखने वाले लोग",
      "बेहतर कार्य-जीवन संतुलन चाहने वाले प्रोफेशनल्स",
      "उत्पादकता बढ़ाना चाहने वाले व्यक्ति",
      "जीवनशैली सुधारने के इच्छुक लोग",
      "व्यवहारिक पैटर्न समझना चाहने वाले लोग",
      "अधिक आत्म-जागरूकता प्राप्त करना चाहने वाले व्यक्ति",
    ],
  },
},

love_disappointment_report: {
  seoTitle: {
    en: "Love Disappointment Report | Heartbreak, Emotional Healing & Relationship Analysis",
    hi: "लव डिसअपॉइंटमेंट रिपोर्ट | दिल टूटने, भावनात्मक उपचार और संबंध विश्लेषण",
  },

  seoDescription: {
    en: "Understand the astrological factors behind heartbreak, emotional setbacks, failed relationships, healing opportunities, and future relationship growth through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से प्रेम में निराशा, असफल रिश्तों, भावनात्मक दर्द, उपचार के अवसरों और भविष्य के संबंधों की संभावनाओं को समझें।",
  },

  whyImportant: {
    en: "Heartbreak and emotional disappointment can leave a lasting impact on confidence, trust, and future relationships. Astrology cannot erase the past, but it can help you understand why certain relationship patterns occurred, what lessons they carry, and how to move forward with greater emotional awareness and strength.",
    hi: "प्रेम में निराशा और भावनात्मक आघात व्यक्ति के आत्मविश्वास, विश्वास और भविष्य के रिश्तों को प्रभावित कर सकता है। ज्योतिष अतीत को नहीं बदल सकता, लेकिन यह समझने में मदद कर सकता है कि कुछ संबंध क्यों टूटे, उनसे क्या सीख मिली और आगे कैसे बढ़ा जाए।",
  },

  reportSections: {
    en: [
      "Relationship Disappointment Analysis",
      "Emotional Healing Indicators",
      "Past Relationship Patterns",
      "Trust and Attachment Tendencies",
      "Reasons Behind Emotional Setbacks",
      "Lessons from Past Relationships",
      "Self-Worth and Confidence Factors",
      "Future Love Opportunities",
      "Planetary Influence on Relationships",
      "Dasha-Based Emotional Trends",
      "Relationship Recovery Timeline",
      "Personalized Healing Remedies",
    ],
    hi: [
      "प्रेम में निराशा का विश्लेषण",
      "भावनात्मक उपचार संकेत",
      "पिछले रिश्तों के पैटर्न",
      "विश्वास और लगाव की प्रवृत्तियाँ",
      "भावनात्मक आघात के कारण",
      "रिश्तों से मिलने वाले जीवन पाठ",
      "आत्मविश्वास और आत्म-मूल्य कारक",
      "भविष्य के प्रेम अवसर",
      "रिश्तों पर ग्रहों का प्रभाव",
      "दशा आधारित भावनात्मक रुझान",
      "उपचार और आगे बढ़ने की समयरेखा",
      "व्यक्तिगत उपचार उपाय",
    ],
  },

  targetKeywords: [
    "love disappointment report",
    "heartbreak astrology",
    "relationship failure astrology",
    "love breakup astrology",
    "emotional healing astrology",
    "love life analysis report",
    "relationship recovery astrology",
    "heartbreak horoscope",
    "love setback astrology",
    "vedic relationship healing report",
  ],

  benefits: {
    en: [
      "Understand the reasons behind past heartbreaks",
      "Identify unhealthy relationship patterns",
      "Gain emotional clarity and self-awareness",
      "Improve confidence for future relationships",
      "Recognize future opportunities for love",
      "Support emotional healing and growth",
    ],
    hi: [
      "पिछले दिल टूटने के कारणों को समझें",
      "अस्वस्थ संबंध पैटर्न की पहचान करें",
      "भावनात्मक स्पष्टता और आत्म-जागरूकता प्राप्त करें",
      "भविष्य के रिश्तों के लिए आत्मविश्वास बढ़ाएं",
      "प्रेम के नए अवसरों को पहचानें",
      "भावनात्मक उपचार और विकास में सहायता प्राप्त करें",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can astrology explain why a relationship failed?",
        answer: "Astrology can reveal compatibility challenges, emotional patterns, and timing factors that may have contributed to relationship difficulties.",
      },
      {
        question: "Will this report help me move on from heartbreak?",
        answer: "The report provides insights into emotional healing, personal growth, and future relationship opportunities.",
      },
      {
        question: "Does the report predict a new relationship?",
        answer: "It identifies future opportunities and favorable periods for relationships but does not guarantee specific outcomes.",
      },
      {
        question: "Is this report only for people who recently experienced a breakup?",
        answer: "No. Anyone seeking emotional clarity about past relationships can benefit from the report.",
      },
    ],
    hi: [
      {
        question: "क्या ज्योतिष बता सकता है कि रिश्ता क्यों टूटा?",
        answer: "हाँ, ज्योतिष अनुकूलता, भावनात्मक पैटर्न और समय कारकों का विश्लेषण कर सकता है जिन्होंने रिश्ते को प्रभावित किया हो।",
      },
      {
        question: "क्या यह रिपोर्ट दिल टूटने के बाद आगे बढ़ने में मदद करेगी?",
        answer: "हाँ, यह भावनात्मक उपचार, आत्म-विकास और भविष्य के अवसरों के बारे में उपयोगी जानकारी प्रदान करती है।",
      },
      {
        question: "क्या रिपोर्ट नए रिश्ते की भविष्यवाणी करती है?",
        answer: "यह भविष्य के अवसरों और अनुकूल समयों की पहचान करती है, लेकिन निश्चित परिणाम का दावा नहीं करती।",
      },
      {
        question: "क्या यह रिपोर्ट केवल हाल ही में ब्रेकअप झेल चुके लोगों के लिए है?",
        answer: "नहीं, कोई भी व्यक्ति जो अपने पिछले रिश्तों को बेहतर समझना चाहता है, इससे लाभ उठा सकता है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People recovering from heartbreak",
      "Individuals dealing with relationship disappointment",
      "Those seeking emotional healing",
      "People wanting to understand past relationships",
      "Individuals preparing for future love opportunities",
      "Anyone seeking emotional clarity and growth",
    ],
    hi: [
      "दिल टूटने से उबर रहे लोग",
      "प्रेम में निराशा का सामना कर रहे व्यक्ति",
      "भावनात्मक उपचार चाहने वाले लोग",
      "अपने पिछले रिश्तों को समझना चाहने वाले व्यक्ति",
      "भविष्य के प्रेम अवसरों की तैयारी करने वाले लोग",
      "भावनात्मक स्पष्टता और विकास चाहने वाले व्यक्ति",
    ],
  },
},

mood_mental_health_report: {
  seoTitle: {
    en: "Mood & Mental Health Report | Emotional Well-Being & Mind Pattern Analysis",
    hi: "मूड एवं मानसिक स्वास्थ्य रिपोर्ट | भावनात्मक संतुलन और मानसिक पैटर्न विश्लेषण",
  },

  seoDescription: {
    en: "Understand emotional patterns, stress tendencies, mental well-being indicators, mood fluctuations, resilience factors, and self-awareness opportunities through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से भावनात्मक पैटर्न, तनाव की प्रवृत्ति, मानसिक संतुलन, मूड में उतार-चढ़ाव, मानसिक दृढ़ता और आत्म-जागरूकता के अवसरों को समझें।",
  },

  whyImportant: {
    en: "Mental and emotional well-being influence every area of life including relationships, career, decision-making, and personal happiness. This report helps you understand your emotional nature, stress triggers, coping mechanisms, and behavioral tendencies. The purpose is not medical diagnosis but greater self-awareness and emotional balance.",
    hi: "मानसिक और भावनात्मक संतुलन जीवन के हर क्षेत्र को प्रभावित करता है, चाहे वह रिश्ते हों, करियर हो या व्यक्तिगत खुशी। यह रिपोर्ट आपकी भावनात्मक प्रकृति, तनाव के कारणों, प्रतिक्रिया शैली और मानसिक संतुलन को समझने में सहायता करती है। यह चिकित्सा निदान नहीं बल्कि आत्म-जागरूकता और संतुलन का मार्गदर्शन है।",
  },

  reportSections: {
    en: [
      "Emotional Pattern Analysis",
      "Mood Stability Indicators",
      "Stress and Pressure Response",
      "Mental Resilience Assessment",
      "Overthinking and Anxiety Tendencies",
      "Emotional Strengths and Weaknesses",
      "Behavioral and Reaction Patterns",
      "Self-Awareness and Personal Growth",
      "Relationship Impact on Mental Well-Being",
      "Planetary Influence on Emotional Health",
      "Dasha-Based Emotional Trends",
      "Personalized Remedies for Emotional Balance",
    ],
    hi: [
      "भावनात्मक पैटर्न विश्लेषण",
      "मूड स्थिरता संकेतक",
      "तनाव और दबाव में प्रतिक्रिया",
      "मानसिक दृढ़ता का मूल्यांकन",
      "अधिक सोच और चिंता की प्रवृत्ति",
      "भावनात्मक शक्तियाँ और कमजोरियाँ",
      "व्यवहार और प्रतिक्रिया पैटर्न",
      "आत्म-जागरूकता और व्यक्तिगत विकास",
      "मानसिक संतुलन पर रिश्तों का प्रभाव",
      "भावनात्मक स्वास्थ्य पर ग्रहों का प्रभाव",
      "दशा आधारित भावनात्मक रुझान",
      "भावनात्मक संतुलन हेतु व्यक्तिगत उपाय",
    ],
  },

  targetKeywords: [
    "mental health astrology report",
    "mood analysis astrology",
    "emotional wellness astrology",
    "mind astrology report",
    "stress astrology analysis",
    "mental wellbeing report",
    "emotional balance astrology",
    "psychological astrology report",
    "mood horoscope report",
    "vedic emotional analysis",
  ],

  benefits: {
    en: [
      "Understand emotional strengths and weaknesses",
      "Recognize stress and pressure triggers",
      "Improve self-awareness and emotional intelligence",
      "Identify recurring mood patterns",
      "Develop healthier coping mechanisms",
      "Build greater emotional resilience",
    ],
    hi: [
      "भावनात्मक शक्तियों और कमजोरियों को समझें",
      "तनाव और दबाव के कारणों की पहचान करें",
      "आत्म-जागरूकता और भावनात्मक समझ बढ़ाएं",
      "बार-बार आने वाले मूड पैटर्न पहचानें",
      "बेहतर मानसिक संतुलन विकसित करें",
      "भावनात्मक दृढ़ता को मजबूत बनाएं",
    ],
  },

  faqs: {
    en: [
      {
        question: "Is this a medical mental health report?",
        answer: "No. This report is based on astrological indicators and is intended for self-awareness, not medical diagnosis or treatment.",
      },
      {
        question: "Can astrology reveal emotional tendencies?",
        answer: "Yes. Astrology can provide insights into emotional patterns, stress responses, and behavioral tendencies visible in the birth chart.",
      },
      {
        question: "Does this report help with stress management?",
        answer: "The report identifies stress triggers and emotional tendencies, helping you understand yourself better.",
      },
      {
        question: "Should this report replace professional mental health support?",
        answer: "No. Professional medical or psychological support should always be sought when needed.",
      },
    ],
    hi: [
      {
        question: "क्या यह मेडिकल मानसिक स्वास्थ्य रिपोर्ट है?",
        answer: "नहीं। यह रिपोर्ट ज्योतिषीय संकेतों पर आधारित है और आत्म-जागरूकता के लिए बनाई गई है, चिकित्सा निदान के लिए नहीं।",
      },
      {
        question: "क्या ज्योतिष भावनात्मक प्रवृत्तियों को समझने में मदद कर सकता है?",
        answer: "हाँ, ज्योतिष भावनात्मक पैटर्न, तनाव प्रतिक्रिया और व्यवहारिक प्रवृत्तियों के बारे में जानकारी दे सकता है।",
      },
      {
        question: "क्या यह रिपोर्ट तनाव प्रबंधन में मदद करती है?",
        answer: "यह रिपोर्ट तनाव के कारणों और भावनात्मक पैटर्न को समझने में सहायता करती है।",
      },
      {
        question: "क्या यह रिपोर्ट पेशेवर मानसिक स्वास्थ्य सहायता का विकल्प है?",
        answer: "नहीं। आवश्यकता होने पर हमेशा योग्य चिकित्सा या मानसिक स्वास्थ्य विशेषज्ञ की सलाह लेनी चाहिए।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People seeking emotional self-awareness",
      "Individuals dealing with stress and pressure",
      "Those interested in personal growth",
      "People wanting to understand emotional patterns",
      "Professionals facing high-pressure environments",
      "Anyone interested in emotional well-being",
    ],
    hi: [
      "भावनात्मक आत्म-जागरूकता चाहने वाले लोग",
      "तनाव और दबाव का सामना कर रहे व्यक्ति",
      "व्यक्तिगत विकास में रुचि रखने वाले लोग",
      "अपने भावनात्मक पैटर्न को समझना चाहने वाले व्यक्ति",
      "अधिक दबाव वाले वातावरण में काम करने वाले प्रोफेशनल्स",
      "मानसिक और भावनात्मक संतुलन में रुचि रखने वाले लोग",
    ],
  },
},

problem_in_marriage_report: {
  seoTitle: {
    en: "Marriage Problems Report | Relationship Challenges & Marital Harmony Analysis",
    hi: "मैरिज प्रॉब्लम्स रिपोर्ट | वैवाहिक चुनौतियाँ और संबंध सामंजस्य विश्लेषण",
  },

  seoDescription: {
    en: "Understand relationship conflicts, communication issues, emotional disconnect, marital stress, compatibility concerns, and solutions through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से वैवाहिक विवाद, संवाद समस्याएँ, भावनात्मक दूरी, वैवाहिक तनाव, अनुकूलता चुनौतियाँ और समाधान को समझें।",
  },

  whyImportant: {
    en: "Every marriage faces challenges at different stages of life. Misunderstandings, communication gaps, emotional distance, family pressures, financial concerns, and changing expectations can all impact marital harmony. This report helps identify the root causes of recurring marriage problems and provides guidance for creating healthier and more stable relationships.",
    hi: "हर विवाह जीवन के विभिन्न चरणों में चुनौतियों का सामना करता है। गलतफहमियाँ, संवाद की कमी, भावनात्मक दूरी, पारिवारिक दबाव, आर्थिक चिंताएँ और बदलती अपेक्षाएँ वैवाहिक जीवन को प्रभावित कर सकती हैं। यह रिपोर्ट वैवाहिक समस्याओं के मूल कारणों को समझने और संबंधों को बेहतर बनाने में सहायता करती है।",
  },

  reportSections: {
    en: [
      "Marriage Problem Analysis",
      "Communication and Conflict Patterns",
      "Emotional Compatibility Assessment",
      "Trust and Understanding Factors",
      "Family Influence on Marriage",
      "Financial and Lifestyle Stress Indicators",
      "Recurring Relationship Challenges",
      "Strengths Supporting Marriage",
      "Long-Term Marital Stability Analysis",
      "Planetary Influence on Marriage Problems",
      "Dasha-Based Relationship Trends",
      "Personalized Remedies for Marital Harmony",
    ],
    hi: [
      "वैवाहिक समस्याओं का विश्लेषण",
      "संवाद और विवाद के पैटर्न",
      "भावनात्मक अनुकूलता मूल्यांकन",
      "विश्वास और समझ के कारक",
      "विवाह पर परिवार का प्रभाव",
      "आर्थिक और जीवनशैली तनाव संकेतक",
      "बार-बार आने वाली संबंध चुनौतियाँ",
      "विवाह को मजबूत बनाने वाली शक्तियाँ",
      "दीर्घकालिक वैवाहिक स्थिरता विश्लेषण",
      "वैवाहिक समस्याओं पर ग्रहों का प्रभाव",
      "दशा आधारित संबंध रुझान",
      "वैवाहिक सामंजस्य हेतु व्यक्तिगत उपाय",
    ],
  },

  targetKeywords: [
    "marriage problems report",
    "marital issues astrology",
    "relationship conflict astrology",
    "marriage compatibility report",
    "marital harmony astrology",
    "relationship problems astrology",
    "marriage analysis report",
    "marital stress astrology",
    "marriage remedies astrology",
    "vedic marriage problems report",
  ],

  benefits: {
    en: [
      "Identify the root causes of relationship conflicts",
      "Improve communication and understanding",
      "Recognize recurring marital challenges",
      "Strengthen emotional connection",
      "Gain clarity about long-term relationship stability",
      "Receive practical and personalized guidance",
    ],
    hi: [
      "रिश्तों में विवाद के मूल कारणों को पहचानें",
      "संवाद और समझ में सुधार करें",
      "बार-बार आने वाली चुनौतियों को समझें",
      "भावनात्मक जुड़ाव को मजबूत करें",
      "दीर्घकालिक वैवाहिक स्थिरता को लेकर स्पष्टता प्राप्त करें",
      "व्यक्तिगत और व्यावहारिक मार्गदर्शन प्राप्त करें",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can astrology identify the causes of marriage problems?",
        answer: "Yes. Astrology can reveal compatibility issues, communication patterns, emotional tendencies, and stress factors influencing marriage.",
      },
      {
        question: "Does this report only focus on negative aspects?",
        answer: "No. The report highlights both strengths and challenges to provide a balanced understanding of the relationship.",
      },
      {
        question: "Can this report help improve an existing marriage?",
        answer: "Yes. It provides insights that can help improve communication, awareness, and relationship dynamics.",
      },
      {
        question: "Will the report provide remedies?",
        answer: "Yes. Personalized remedies and practical guidance are included to support marital harmony.",
      },
    ],
    hi: [
      {
        question: "क्या ज्योतिष विवाह समस्याओं के कारण बता सकता है?",
        answer: "हाँ, ज्योतिष अनुकूलता, संवाद, भावनात्मक प्रवृत्तियों और तनाव कारकों का विश्लेषण कर सकता है।",
      },
      {
        question: "क्या यह रिपोर्ट केवल नकारात्मक पक्षों पर केंद्रित है?",
        answer: "नहीं। यह रिपोर्ट संबंधों की शक्तियों और चुनौतियों दोनों का संतुलित विश्लेषण करती है।",
      },
      {
        question: "क्या यह रिपोर्ट मौजूदा विवाह को बेहतर बनाने में मदद कर सकती है?",
        answer: "हाँ, यह संवाद, समझ और संबंधों की गुणवत्ता सुधारने हेतु उपयोगी जानकारी प्रदान करती है।",
      },
      {
        question: "क्या रिपोर्ट में उपाय भी दिए जाते हैं?",
        answer: "हाँ, वैवाहिक सामंजस्य के लिए व्यक्तिगत उपाय और मार्गदर्शन शामिल हैं।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "Married couples facing relationship challenges",
      "Individuals experiencing communication issues",
      "People dealing with recurring marital conflicts",
      "Couples seeking relationship improvement",
      "Individuals wanting greater marital understanding",
      "Anyone seeking long-term relationship harmony",
    ],
    hi: [
      "वैवाहिक चुनौतियों का सामना कर रहे दंपत्ति",
      "संवाद समस्याओं से जूझ रहे लोग",
      "बार-बार वैवाहिक विवादों का सामना करने वाले व्यक्ति",
      "रिश्तों में सुधार चाहने वाले दंपत्ति",
      "वैवाहिक जीवन को बेहतर समझना चाहने वाले लोग",
      "दीर्घकालिक वैवाहिक सामंजस्य चाहने वाले व्यक्ति",
    ],
  },
},

relationship_future_report: {
  seoTitle: {
    en: "Relationship Future Report | Love, Commitment & Long-Term Compatibility Analysis",
    hi: "रिलेशनशिप फ्यूचर रिपोर्ट | प्रेम, प्रतिबद्धता और दीर्घकालिक अनुकूलता विश्लेषण",
  },

  seoDescription: {
    en: "Discover the future potential of your relationships, emotional compatibility, commitment patterns, long-term prospects, challenges, and opportunities through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से अपने रिश्तों की भविष्य संभावनाएँ, भावनात्मक अनुकूलता, प्रतिबद्धता, दीर्घकालिक स्थिरता, चुनौतियाँ और अवसरों को समझें।",
  },

  whyImportant: {
    en: "Relationships evolve over time, and understanding their long-term potential can help you make better decisions. This report analyzes emotional compatibility, commitment tendencies, relationship stability, future opportunities, and challenges that may influence your love life and personal relationships in the years ahead.",
    hi: "रिश्ते समय के साथ बदलते और विकसित होते हैं। उनके भविष्य को समझना बेहतर निर्णय लेने में मदद कर सकता है। यह रिपोर्ट भावनात्मक अनुकूलता, प्रतिबद्धता, संबंध स्थिरता, भविष्य के अवसरों और चुनौतियों का विश्लेषण करती है जो आपके प्रेम जीवन को प्रभावित कर सकते हैं।",
  },

  reportSections: {
    en: [
      "Relationship Future Analysis",
      "Long-Term Compatibility Assessment",
      "Commitment and Loyalty Indicators",
      "Emotional Connection Patterns",
      "Future Love Opportunities",
      "Relationship Stability Factors",
      "Communication and Understanding Trends",
      "Potential Challenges Ahead",
      "Marriage and Partnership Prospects",
      "Planetary Influence on Relationships",
      "Dasha-Based Relationship Trends",
      "Personalized Guidance for Relationship Growth",
    ],
    hi: [
      "रिश्ते के भविष्य का विश्लेषण",
      "दीर्घकालिक अनुकूलता मूल्यांकन",
      "प्रतिबद्धता और निष्ठा संकेतक",
      "भावनात्मक जुड़ाव के पैटर्न",
      "भविष्य के प्रेम अवसर",
      "संबंध स्थिरता कारक",
      "संवाद और समझ के रुझान",
      "आने वाली संभावित चुनौतियाँ",
      "विवाह और साझेदारी संभावनाएँ",
      "रिश्तों पर ग्रहों का प्रभाव",
      "दशा आधारित संबंध रुझान",
      "संबंध विकास हेतु व्यक्तिगत मार्गदर्शन",
    ],
  },

  targetKeywords: [
    "relationship future report",
    "love future astrology",
    "relationship prediction report",
    "future relationship astrology",
    "love compatibility future",
    "relationship horoscope report",
    "future marriage astrology",
    "relationship analysis astrology",
    "love life prediction report",
    "vedic relationship future report",
  ],

  benefits: {
    en: [
      "Understand the long-term potential of relationships",
      "Identify strengths supporting relationship growth",
      "Recognize future challenges before they arise",
      "Gain clarity about commitment and compatibility",
      "Improve relationship decision-making",
      "Develop stronger emotional awareness",
    ],
    hi: [
      "रिश्तों की दीर्घकालिक संभावनाओं को समझें",
      "संबंधों को मजबूत बनाने वाली शक्तियों की पहचान करें",
      "भविष्य की चुनौतियों को पहले से समझें",
      "प्रतिबद्धता और अनुकूलता को लेकर स्पष्टता प्राप्त करें",
      "रिश्तों से जुड़े निर्णय बेहतर बनाएं",
      "भावनात्मक जागरूकता विकसित करें",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can astrology predict the future of a relationship?",
        answer: "Astrology can identify relationship trends, strengths, challenges, and future possibilities, but personal choices always remain important.",
      },
      {
        question: "Does this report guarantee relationship success?",
        answer: "No. The report provides insights and guidance rather than guarantees about future outcomes.",
      },
      {
        question: "Can this report help people already in a relationship?",
        answer: "Yes. It offers valuable insights into compatibility, growth opportunities, and future challenges.",
      },
      {
        question: "Does the report cover marriage potential?",
        answer: "Yes. Marriage and long-term commitment indicators are included where relevant.",
      },
    ],
    hi: [
      {
        question: "क्या ज्योतिष रिश्ते का भविष्य बता सकता है?",
        answer: "ज्योतिष संबंधों के रुझान, अवसरों और चुनौतियों का संकेत दे सकता है, लेकिन व्यक्तिगत निर्णय हमेशा महत्वपूर्ण रहते हैं।",
      },
      {
        question: "क्या यह रिपोर्ट रिश्ते की सफलता की गारंटी देती है?",
        answer: "नहीं। यह रिपोर्ट मार्गदर्शन और विश्लेषण प्रदान करती है, निश्चित परिणाम नहीं।",
      },
      {
        question: "क्या यह रिपोर्ट पहले से रिश्ते में मौजूद लोगों के लिए उपयोगी है?",
        answer: "हाँ, यह अनुकूलता, विकास के अवसरों और भविष्य की चुनौतियों को समझने में मदद करती है।",
      },
      {
        question: "क्या रिपोर्ट विवाह की संभावना को भी कवर करती है?",
        answer: "हाँ, जहाँ लागू हो वहाँ विवाह और दीर्घकालिक प्रतिबद्धता के संकेतों का विश्लेषण शामिल है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People in a committed relationship",
      "Couples planning a future together",
      "Individuals seeking relationship clarity",
      "People evaluating long-term compatibility",
      "Those interested in marriage prospects",
      "Anyone wanting insight into relationship growth",
    ],
    hi: [
      "गंभीर रिश्ते में रहने वाले लोग",
      "साथ में भविष्य की योजना बना रहे दंपत्ति",
      "रिश्ते को लेकर स्पष्टता चाहने वाले व्यक्ति",
      "दीर्घकालिक अनुकूलता समझना चाहने वाले लोग",
      "विवाह संभावनाएँ जानने के इच्छुक व्यक्ति",
      "रिश्ते के विकास को समझना चाहने वाले लोग",
    ],
  },
},

sadhesati_report: {
  seoTitle: {
    en: "Sade Sati Report | Saturn's Influence, Challenges & Growth Analysis",
    hi: "साढ़ेसाती रिपोर्ट | शनि का प्रभाव, चुनौतियाँ और विकास विश्लेषण",
  },

  seoDescription: {
    en: "Understand how Sade Sati may influence your career, finances, relationships, mental well-being, responsibilities, and personal growth through detailed Vedic astrology analysis.",
    hi: "विस्तृत वैदिक ज्योतिष विश्लेषण के माध्यम से जानें कि साढ़ेसाती आपके करियर, धन, रिश्तों, मानसिक स्थिति, जिम्मेदारियों और जीवन विकास को कैसे प्रभावित कर सकती है।",
  },

  whyImportant: {
    en: "Sade Sati is one of the most discussed periods in Vedic astrology, often associated with responsibility, discipline, transformation, and important life lessons. While many people fear Sade Sati, its effects vary significantly from chart to chart. This report helps you understand the specific opportunities, challenges, and growth areas that Saturn may activate during this period.",
    hi: "साढ़ेसाती वैदिक ज्योतिष का सबसे चर्चित समय माना जाता है, जो जिम्मेदारी, अनुशासन, परिवर्तन और महत्वपूर्ण जीवन पाठों से जुड़ा होता है। हालांकि लोग अक्सर इससे डरते हैं, लेकिन इसका प्रभाव हर व्यक्ति की कुंडली में अलग होता है। यह रिपोर्ट बताती है कि शनि आपकी कुंडली में किन क्षेत्रों को सक्रिय कर सकता है।",
  },

  reportSections: {
    en: [
      "Current Sade Sati Phase Analysis",
      "Saturn's Overall Influence",
      "Career and Professional Impact",
      "Financial Challenges and Opportunities",
      "Relationships and Family Dynamics",
      "Mental and Emotional Effects",
      "Responsibilities and Life Lessons",
      "Health and Lifestyle Considerations",
      "Major Growth Opportunities",
      "Transit Timeline and Important Periods",
      "Saturn's Hidden Benefits",
      "Personalized Sade Sati Remedies",
    ],
    hi: [
      "वर्तमान साढ़ेसाती चरण विश्लेषण",
      "शनि का समग्र प्रभाव",
      "करियर और पेशेवर प्रभाव",
      "आर्थिक चुनौतियाँ और अवसर",
      "रिश्ते और पारिवारिक प्रभाव",
      "मानसिक और भावनात्मक प्रभाव",
      "जिम्मेदारियाँ और जीवन पाठ",
      "स्वास्थ्य और जीवनशैली संकेत",
      "महत्वपूर्ण विकास अवसर",
      "गोचर समयरेखा और प्रमुख चरण",
      "शनि के छिपे हुए लाभ",
      "व्यक्तिगत साढ़ेसाती उपाय",
    ],
  },

  targetKeywords: [
    "sade sati report",
    "sade sati astrology report",
    "saturn sade sati analysis",
    "sade sati prediction",
    "sade sati effects report",
    "saturn transit report",
    "sade sati horoscope",
    "shani sade sati analysis",
    "vedic sade sati report",
    "sade sati remedies",
  ],

  benefits: {
    en: [
      "Understand your personal Sade Sati impact",
      "Identify growth opportunities hidden within challenges",
      "Prepare for important life transitions",
      "Reduce uncertainty and fear around Saturn",
      "Recognize favorable and difficult periods",
      "Receive personalized guidance and remedies",
    ],
    hi: [
      "अपनी व्यक्तिगत साढ़ेसाती का प्रभाव समझें",
      "चुनौतियों में छिपे विकास अवसरों को पहचानें",
      "महत्वपूर्ण जीवन परिवर्तनों के लिए तैयार रहें",
      "शनि से जुड़े डर और भ्रम को कम करें",
      "अनुकूल और चुनौतीपूर्ण समय की पहचान करें",
      "व्यक्तिगत मार्गदर्शन और उपाय प्राप्त करें",
    ],
  },

  faqs: {
    en: [
      {
        question: "Is Sade Sati always negative?",
        answer: "No. Sade Sati can bring both challenges and significant personal growth depending on the birth chart and current planetary influences.",
      },
      {
        question: "How long does Sade Sati last?",
        answer: "Sade Sati generally lasts about seven and a half years as Saturn transits the sign before the Moon sign, the Moon sign itself, and the sign after it.",
      },
      {
        question: "Does everyone experience Sade Sati the same way?",
        answer: "No. The impact varies depending on planetary placements, Saturn's strength, current dasha, and overall chart structure.",
      },
      {
        question: "Can remedies reduce Sade Sati difficulties?",
        answer: "Remedies are intended to improve awareness, discipline, and positive action while supporting personal growth during Saturn's influence.",
      },
    ],
    hi: [
      {
        question: "क्या साढ़ेसाती हमेशा बुरी होती है?",
        answer: "नहीं। साढ़ेसाती चुनौतियों के साथ-साथ महत्वपूर्ण विकास और परिपक्वता भी ला सकती है।",
      },
      {
        question: "साढ़ेसाती कितने समय तक रहती है?",
        answer: "सामान्यतः साढ़ेसाती लगभग साढ़े सात वर्ष तक चलती है।",
      },
      {
        question: "क्या सभी लोगों पर साढ़ेसाती का प्रभाव समान होता है?",
        answer: "नहीं। इसका प्रभाव कुंडली, शनि की स्थिति, दशा और अन्य ग्रहों के अनुसार अलग-अलग होता है।",
      },
      {
        question: "क्या उपाय साढ़ेसाती की कठिनाइयों को कम कर सकते हैं?",
        answer: "उपाय जागरूकता, अनुशासन और सकारात्मक कार्यों को बढ़ावा देने में सहायक हो सकते हैं।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People currently going through Sade Sati",
      "Individuals concerned about Saturn's influence",
      "Those facing major life changes",
      "People seeking clarity about challenges",
      "Individuals interested in Saturn transit analysis",
      "Anyone wanting a deeper understanding of Sade Sati",
    ],
    hi: [
      "वर्तमान में साढ़ेसाती से गुजर रहे लोग",
      "शनि के प्रभाव को लेकर चिंतित व्यक्ति",
      "बड़े जीवन परिवर्तनों का सामना कर रहे लोग",
      "चुनौतियों को समझना चाहने वाले व्यक्ति",
      "शनि गोचर में रुचि रखने वाले लोग",
      "साढ़ेसाती को गहराई से समझना चाहने वाले व्यक्ति",
    ],
  },
},

saturn_transit_report: {
  seoTitle: {
    en: "Saturn Transit Report | Discipline, Karma & Long-Term Transformation Analysis",
    hi: "शनि गोचर रिपोर्ट | कर्म, अनुशासन और दीर्घकालिक परिवर्तन विश्लेषण",
  },

  seoDescription: {
    en: "Understand how Saturn's current transit may influence your career, finances, responsibilities, relationships, life lessons, and long-term growth through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से जानें कि वर्तमान शनि गोचर आपके करियर, धन, जिम्मेदारियों, रिश्तों, जीवन के सबक और दीर्घकालिक विकास को कैसे प्रभावित कर सकता है।",
  },

  whyImportant: {
    en: "Saturn is the planet of discipline, responsibility, karma, patience, and long-term results. Unlike fast-moving planets, Saturn creates gradual but meaningful changes that shape the direction of life. This report helps you understand where Saturn is demanding maturity, what lessons it is teaching, and how you can work with its energy to achieve lasting success.",
    hi: "शनि को अनुशासन, जिम्मेदारी, कर्म, धैर्य और दीर्घकालिक परिणामों का ग्रह माना जाता है। यह तेज ग्रहों की तरह अचानक परिणाम नहीं देता, बल्कि धीरे-धीरे जीवन की दिशा को बदलता है। यह रिपोर्ट बताती है कि शनि आपके जीवन के किन क्षेत्रों में परिपक्वता और जिम्मेदारी की मांग कर रहा है।",
  },

  reportSections: {
    en: [
      "Current Saturn Transit Overview",
      "Career and Professional Responsibilities",
      "Financial Discipline and Stability",
      "Relationships and Commitments",
      "Life Lessons and Personal Growth",
      "Challenges and Delays Analysis",
      "Karmic Influences and Responsibilities",
      "Health and Lifestyle Impact",
      "Long-Term Opportunities",
      "Transit Timeline and Key Phases",
      "Hidden Benefits of Saturn",
      "Personalized Saturn Remedies",
    ],
    hi: [
      "वर्तमान शनि गोचर का अवलोकन",
      "करियर और पेशेवर जिम्मेदारियाँ",
      "आर्थिक अनुशासन और स्थिरता",
      "रिश्ते और प्रतिबद्धताएँ",
      "जीवन के सबक और व्यक्तिगत विकास",
      "चुनौतियाँ और विलंब विश्लेषण",
      "कर्म और जिम्मेदारी संकेत",
      "स्वास्थ्य और जीवनशैली प्रभाव",
      "दीर्घकालिक अवसर",
      "गोचर समयरेखा और प्रमुख चरण",
      "शनि के छिपे लाभ",
      "व्यक्तिगत शनि उपाय",
    ],
  },

  targetKeywords: [
    "saturn transit report",
    "saturn gochar report",
    "shani transit analysis",
    "saturn astrology report",
    "saturn prediction report",
    "shani gochar effects",
    "saturn horoscope report",
    "vedic saturn transit",
    "saturn future prediction",
    "shani transit remedies",
  ],

  benefits: {
    en: [
      "Understand Saturn's impact on your chart",
      "Identify areas requiring discipline and focus",
      "Prepare for long-term changes and responsibilities",
      "Recognize growth opportunities hidden within challenges",
      "Improve decision-making during Saturn periods",
      "Gain clarity about your karmic lessons",
    ],
    hi: [
      "समझें कि शनि आपकी कुंडली को कैसे प्रभावित कर रहा है",
      "अनुशासन और ध्यान की आवश्यकता वाले क्षेत्रों की पहचान करें",
      "दीर्घकालिक परिवर्तनों और जिम्मेदारियों के लिए तैयार रहें",
      "चुनौतियों में छिपे अवसरों को पहचानें",
      "शनि काल में बेहतर निर्णय लें",
      "अपने कर्म और जीवन पाठों को समझें",
    ],
  },

  faqs: {
    en: [
      {
        question: "Is Saturn always a negative planet?",
        answer: "No. Saturn is often misunderstood. While it may bring delays and responsibilities, it also rewards discipline, patience, and hard work with lasting results.",
      },
      {
        question: "How long does Saturn remain in one sign?",
        answer: "Saturn generally spends around two and a half years in a zodiac sign, making its influence long-term and significant.",
      },
      {
        question: "Does Saturn affect career and finances?",
        answer: "Yes. Saturn frequently influences career growth, professional responsibilities, financial discipline, and long-term stability.",
      },
      {
        question: "Can Saturn transits bring positive results?",
        answer: "Yes. Saturn often rewards consistent effort, responsibility, and maturity with sustainable success and stability.",
      },
    ],
    hi: [
      {
        question: "क्या शनि हमेशा नकारात्मक परिणाम देता है?",
        answer: "नहीं। शनि को अक्सर गलत समझा जाता है। यह चुनौतियों के साथ-साथ अनुशासन, धैर्य और मेहनत का स्थायी फल भी देता है।",
      },
      {
        question: "शनि एक राशि में कितने समय तक रहता है?",
        answer: "शनि सामान्यतः लगभग ढाई वर्ष तक एक राशि में रहता है।",
      },
      {
        question: "क्या शनि करियर और धन को प्रभावित करता है?",
        answer: "हाँ, शनि करियर, पेशेवर जिम्मेदारियों, आर्थिक अनुशासन और दीर्घकालिक स्थिरता को प्रभावित करता है।",
      },
      {
        question: "क्या शनि गोचर सकारात्मक परिणाम भी दे सकता है?",
        answer: "हाँ, शनि निरंतर प्रयास, जिम्मेदारी और परिपक्वता का स्थायी पुरस्कार देता है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People experiencing major life changes",
      "Individuals interested in Saturn's influence",
      "Professionals seeking long-term career clarity",
      "People facing delays and responsibilities",
      "Those interested in karmic growth",
      "Anyone wanting a deeper understanding of Saturn transit",
    ],
    hi: [
      "बड़े जीवन परिवर्तनों का सामना कर रहे लोग",
      "शनि के प्रभाव को समझना चाहने वाले व्यक्ति",
      "करियर को लेकर स्पष्टता चाहने वाले प्रोफेशनल्स",
      "विलंब और जिम्मेदारियों का सामना कर रहे लोग",
      "कर्म और विकास में रुचि रखने वाले व्यक्ति",
      "शनि गोचर को गहराई से समझना चाहने वाले लोग",
    ],
  },
},

second_marriage_report: {
  seoTitle: {
    en: "Second Marriage Report | Future Marriage Potential & Relationship Renewal Analysis",
    hi: "सेकंड मैरिज रिपोर्ट | पुनर्विवाह योग और भविष्य के संबंधों का विश्लेषण",
  },

  seoDescription: {
    en: "Understand the astrological indicators for a second marriage, future relationship opportunities, emotional readiness, compatibility factors, and long-term partnership potential through Vedic astrology.",
    hi: "वैदिक ज्योतिष के माध्यम से पुनर्विवाह के योग, भविष्य के संबंधों के अवसर, भावनात्मक तैयारी, अनुकूलता कारक और दीर्घकालिक वैवाहिक संभावनाओं का विश्लेषण प्राप्त करें।",
  },

  whyImportant: {
    en: "Life does not always follow a single path. Some individuals experience separation, divorce, widowhood, or significant relationship changes before entering a new chapter. This report helps you understand the astrological factors related to second marriage, future relationship possibilities, emotional growth, and long-term partnership stability.",
    hi: "जीवन हमेशा एक ही दिशा में नहीं चलता। कुछ लोगों को अलगाव, तलाक, जीवनसाथी की हानि या बड़े संबंध परिवर्तनों के बाद नया अध्याय शुरू करना पड़ता है। यह रिपोर्ट पुनर्विवाह के योग, भविष्य के संबंधों की संभावनाओं और वैवाहिक स्थिरता को समझने में सहायता करती है।",
  },

  reportSections: {
    en: [
      "Second Marriage Potential Analysis",
      "Future Relationship Opportunities",
      "Emotional Readiness Assessment",
      "Lessons from Past Relationships",
      "Compatibility Indicators for Future Marriage",
      "Commitment and Trust Patterns",
      "Long-Term Partnership Stability",
      "Family and Social Influences",
      "Marriage Timing Indicators",
      "Planetary Influence on Future Relationships",
      "Dasha-Based Marriage Trends",
      "Personalized Remedies for Relationship Success",
    ],
    hi: [
      "पुनर्विवाह संभावना विश्लेषण",
      "भविष्य के संबंध अवसर",
      "भावनात्मक तैयारी का मूल्यांकन",
      "पिछले रिश्तों से मिले जीवन पाठ",
      "भविष्य के विवाह हेतु अनुकूलता संकेत",
      "विश्वास और प्रतिबद्धता पैटर्न",
      "दीर्घकालिक संबंध स्थिरता",
      "पारिवारिक और सामाजिक प्रभाव",
      "विवाह समय संकेतक",
      "भविष्य के संबंधों पर ग्रहों का प्रभाव",
      "दशा आधारित विवाह रुझान",
      "संबंध सफलता हेतु व्यक्तिगत उपाय",
    ],
  },

  targetKeywords: [
    "second marriage report",
    "second marriage astrology",
    "remarriage astrology report",
    "future marriage prediction",
    "second marriage horoscope",
    "remarriage analysis astrology",
    "future relationship astrology",
    "marriage after divorce astrology",
    "second marriage compatibility",
    "vedic second marriage report",
  ],

  benefits: {
    en: [
      "Understand the potential for a second marriage",
      "Gain clarity about future relationship opportunities",
      "Recognize emotional patterns affecting relationships",
      "Learn from past relationship experiences",
      "Identify favorable periods for future commitment",
      "Build greater confidence about future relationships",
    ],
    hi: [
      "पुनर्विवाह की संभावनाओं को समझें",
      "भविष्य के संबंध अवसरों को लेकर स्पष्टता प्राप्त करें",
      "रिश्तों को प्रभावित करने वाले भावनात्मक पैटर्न पहचानें",
      "पिछले अनुभवों से सीख प्राप्त करें",
      "भविष्य की प्रतिबद्धता के अनुकूल समय जानें",
      "भविष्य के रिश्तों को लेकर आत्मविश्वास बढ़ाएं",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can astrology indicate the possibility of a second marriage?",
        answer: "Yes. Astrology can reveal relationship patterns, remarriage indicators, and future partnership possibilities visible in the birth chart.",
      },
      {
        question: "Is this report only for divorced individuals?",
        answer: "No. It may also be relevant for widowed individuals or those who have experienced major relationship transitions.",
      },
      {
        question: "Will this report predict the exact person I will marry?",
        answer: "No. The report analyzes relationship patterns, compatibility tendencies, and marriage opportunities rather than identifying a specific individual.",
      },
      {
        question: "Does the report include marriage timing?",
        answer: "Yes. Favorable periods for future commitment and marriage are analyzed where relevant.",
      },
    ],
    hi: [
      {
        question: "क्या ज्योतिष पुनर्विवाह की संभावना बता सकता है?",
        answer: "हाँ, ज्योतिष पुनर्विवाह के संकेत, संबंध पैटर्न और भविष्य के वैवाहिक अवसरों का विश्लेषण कर सकता है।",
      },
      {
        question: "क्या यह रिपोर्ट केवल तलाकशुदा लोगों के लिए है?",
        answer: "नहीं। यह उन लोगों के लिए भी उपयोगी हो सकती है जिन्होंने जीवन में बड़े संबंध परिवर्तन देखे हों।",
      },
      {
        question: "क्या यह रिपोर्ट बताएगी कि मैं किससे विवाह करूँगा?",
        answer: "नहीं। यह रिपोर्ट संबंध पैटर्न, अनुकूलता और विवाह अवसरों का विश्लेषण करती है, किसी विशेष व्यक्ति की पहचान नहीं।",
      },
      {
        question: "क्या रिपोर्ट विवाह के समय को भी कवर करती है?",
        answer: "हाँ, जहाँ लागू हो वहाँ भविष्य के विवाह और प्रतिबद्धता के अनुकूल समय का विश्लेषण शामिल है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "Divorced individuals",
      "People considering remarriage",
      "Individuals seeking future relationship clarity",
      "People recovering from major relationship transitions",
      "Those interested in long-term partnership prospects",
      "Anyone wanting insight into future marriage opportunities",
    ],
    hi: [
      "तलाकशुदा व्यक्ति",
      "पुनर्विवाह पर विचार कर रहे लोग",
      "भविष्य के संबंधों को लेकर स्पष्टता चाहने वाले व्यक्ति",
      "बड़े संबंध परिवर्तनों से गुजर चुके लोग",
      "दीर्घकालिक साझेदारी संभावनाएँ समझना चाहने वाले लोग",
      "भविष्य के विवाह अवसरों में रुचि रखने वाले व्यक्ति",
    ],
  },
},

gemstone_consultation: {
  seoTitle: {
    en: "Gemstone Consultation Report | Personalized Gemstone Recommendation Analysis",
    hi: "रत्न परामर्श रिपोर्ट | व्यक्तिगत रत्न सुझाव और ज्योतिषीय विश्लेषण",
  },

  seoDescription: {
    en: "Receive personalized gemstone recommendations based on your birth chart, planetary strengths, weaknesses, life goals, and astrological requirements through Vedic astrology.",
    hi: "वैदिक ज्योतिष के आधार पर अपनी कुंडली, ग्रहों की स्थिति, जीवन लक्ष्यों और ज्योतिषीय आवश्यकताओं के अनुसार व्यक्तिगत रत्न सुझाव प्राप्त करें।",
  },

  whyImportant: {
    en: "Gemstones are traditionally used in Vedic astrology to strengthen supportive planetary energies. However, not every gemstone is suitable for every individual. Wearing the wrong gemstone may be ineffective or counterproductive. This consultation helps identify gemstones that align with your birth chart and life objectives while avoiding unsuitable recommendations.",
    hi: "वैदिक ज्योतिष में रत्नों का उपयोग ग्रहों की सकारात्मक ऊर्जा को मजबूत करने के लिए किया जाता है। लेकिन हर रत्न हर व्यक्ति के लिए उपयुक्त नहीं होता। गलत रत्न पहनना लाभकारी न होकर हानिकारक भी हो सकता है। यह रिपोर्ट आपकी कुंडली के अनुसार उपयुक्त रत्नों की पहचान करने में सहायता करती है।",
  },

  reportSections: {
    en: [
      "Birth Chart Gemstone Analysis",
      "Beneficial Planet Identification",
      "Planetary Strength and Weakness Assessment",
      "Primary Gemstone Recommendation",
      "Alternative Gemstone Suggestions",
      "Career and Wealth Gemstones",
      "Relationship and Marriage Gemstones",
      "Health and Emotional Balance Gemstones",
      "Gemstone Wearing Guidelines",
      "Gemstone Compatibility Analysis",
      "Precautions and Unsuitable Gemstones",
      "Personalized Gemstone Consultation Summary",
    ],
    hi: [
      "कुंडली आधारित रत्न विश्लेषण",
      "लाभकारी ग्रहों की पहचान",
      "ग्रह शक्ति और कमजोरी मूल्यांकन",
      "मुख्य रत्न सुझाव",
      "वैकल्पिक रत्न सुझाव",
      "करियर और धन हेतु रत्न",
      "रिश्तों और विवाह हेतु रत्न",
      "स्वास्थ्य और मानसिक संतुलन हेतु रत्न",
      "रत्न धारण करने की विधि",
      "रत्न अनुकूलता विश्लेषण",
      "सावधानियाँ और अनुपयुक्त रत्न",
      "व्यक्तिगत रत्न परामर्श सारांश",
    ],
  },

  targetKeywords: [
    "gemstone consultation",
    "gemstone recommendation report",
    "astrology gemstone report",
    "which gemstone should I wear",
    "personalized gemstone astrology",
    "gemstone analysis report",
    "vedic gemstone consultation",
    "birth chart gemstone recommendation",
    "lucky gemstone report",
    "astrological gemstone guidance",
  ],

  benefits: {
    en: [
      "Receive gemstone recommendations tailored to your birth chart",
      "Understand which planets should be strengthened",
      "Avoid wearing unsuitable gemstones",
      "Gain clarity about gemstone selection",
      "Learn proper gemstone wearing practices",
      "Align gemstone choices with life goals",
    ],
    hi: [
      "अपनी कुंडली के अनुसार उपयुक्त रत्न सुझाव प्राप्त करें",
      "समझें किन ग्रहों को मजबूत करने की आवश्यकता है",
      "अनुपयुक्त रत्न पहनने से बचें",
      "रत्न चयन को लेकर स्पष्टता प्राप्त करें",
      "रत्न धारण करने की सही विधि जानें",
      "जीवन लक्ष्यों के अनुसार रत्न चुनें",
    ],
  },

  faqs: {
    en: [
      {
        question: "Can everyone wear the same gemstone?",
        answer: "No. Gemstone recommendations depend on individual planetary placements, strengths, weaknesses, and overall chart structure.",
      },
      {
        question: "Will this report recommend only one gemstone?",
        answer: "The report may recommend a primary gemstone along with suitable alternatives where appropriate.",
      },
      {
        question: "Can gemstones change my destiny?",
        answer: "Gemstones are traditionally believed to support favorable planetary energies, but they should not be viewed as a substitute for effort, decisions, or personal responsibility.",
      },
      {
        question: "Does the report explain how to wear gemstones?",
        answer: "Yes. Wearing guidelines, precautions, and gemstone suitability considerations are included.",
      },
    ],
    hi: [
      {
        question: "क्या हर व्यक्ति एक ही रत्न पहन सकता है?",
        answer: "नहीं। रत्न का चयन ग्रह स्थिति, ग्रह बल और कुंडली की संरचना के अनुसार अलग-अलग होता है।",
      },
      {
        question: "क्या यह रिपोर्ट केवल एक रत्न सुझाएगी?",
        answer: "रिपोर्ट मुख्य रत्न के साथ उपयुक्त वैकल्पिक रत्न भी सुझा सकती है।",
      },
      {
        question: "क्या रत्न भाग्य बदल सकते हैं?",
        answer: "रत्नों को ग्रहों की सकारात्मक ऊर्जा को समर्थन देने वाला माना जाता है, लेकिन वे प्रयास और सही निर्णयों का विकल्प नहीं हैं।",
      },
      {
        question: "क्या रिपोर्ट रत्न पहनने की विधि भी बताएगी?",
        answer: "हाँ, रिपोर्ट में रत्न धारण करने की प्रक्रिया, सावधानियाँ और उपयुक्तता की जानकारी शामिल है।",
      },
    ],
  },

  whoShouldBuy: {
    en: [
      "People seeking gemstone guidance",
      "Individuals confused about gemstone selection",
      "Those interested in Vedic astrology remedies",
      "People wanting personalized gemstone recommendations",
      "Individuals exploring planetary strengthening methods",
      "Anyone considering wearing a gemstone for astrological reasons",
    ],
    hi: [
      "रत्न संबंधी मार्गदर्शन चाहने वाले लोग",
      "रत्न चयन को लेकर भ्रमित व्यक्ति",
      "वैदिक ज्योतिषीय उपायों में रुचि रखने वाले लोग",
      "व्यक्तिगत रत्न सुझाव चाहने वाले व्यक्ति",
      "ग्रहों को मजबूत करने के उपाय खोज रहे लोग",
      "ज्योतिषीय कारणों से रत्न धारण करने पर विचार कर रहे व्यक्ति",
    ],
  },
},

};