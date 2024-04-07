const languages = [
	{ code: "aa", name: "Afar", value: "Afar", label: "Afar" },
	{ code: "ab", name: "Abkhazian", value: "Abkhazian", label: "Abkhazian" },
	{ code: "ae", name: "Avestan", value: "Avestan", label: "Avestan" },
	{ code: "af", name: "Afrikaans", value: "Afrikaans", label: "Afrikaans" },
	{ code: "ak", name: "Akan", value: "Akan", label: "Akan" },
	{ code: "am", name: "Amharic", value: "Amharic", label: "Amharic" },
	{ code: "an", name: "Aragonese", value: "Aragonese", label: "Aragonese" },
	{ code: "ar", name: "Arabic", value: "Arabic", label: "Arabic" },
	{ code: "as", name: "Assamese", value: "Assamese", label: "Assamese" },
	{ code: "av", name: "Avaric", value: "Avaric", label: "Avaric" },
	{ code: "ay", name: "Aymara", value: "Aymara", label: "Aymara" },
	{ code: "az", name: "Azerbaijani", value: "Azerbaijani", label: "Azerbaijani" },
	{ code: "ba", name: "Bashkir", value: "Bashkir", label: "Bashkir" },
	{ code: "be", name: "Belarusian", value: "Belarusian", label: "Belarusian" },
	{ code: "bg", name: "Bulgarian", value: "Bulgarian", label: "Bulgarian" },
	{ code: "bh", name: "Bihari languages", value: "Bihari languages", label: "Bihari languages" },
	{ code: "bi", name: "Bislama", value: "Bislama", label: "Bislama" },
	{ code: "bm", name: "Bambara", value: "Bambara", label: "Bambara" },
	{ code: "bn", name: "Bengali", value: "Bengali", label: "Bengali" },
	{ code: "bo", name: "Tibetan", value: "Tibetan", label: "Tibetan" },
	{ code: "br", name: "Breton", value: "Breton", label: "Breton" },
	{ code: "bs", name: "Bosnian", value: "Bosnian", label: "Bosnian" },
	{ code: "ca", name: "Catalan", value: "Catalan", label: "Catalan" },
	{ code: "ce", name: "Chechen", value: "Chechen", label: "Chechen" },
	{ code: "ch", name: "Chamorro", value: "Chamorro", label: "Chamorro" },
	{ code: "co", name: "Corsican", value: "Corsican", label: "Corsican" },
	{ code: "cr", name: "Cree", value: "Cree", label: "Cree" },
	{ code: "cs", name: "Czech", value: "Czech", label: "Czech" },
	{ code: "cu", name: "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic", value: "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic", label: "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic" },
	{ code: "cv", name: "Chuvash", value: "Chuvash", label: "Chuvash" },
	{ code: "cy", name: "Welsh", value: "Welsh", label: "Welsh" },
	{ code: "da", name: "Danish", value: "Danish", label: "Danish" },
	{ code: "de", name: "German", value: "German", label: "German" },
	{ code: "dv", name: "Divehi; Dhivehi; Maldivian", value: "Divehi; Dhivehi; Maldivian", label: "Divehi; Dhivehi; Maldivian" },
	{ code: "dz", name: "Dzongkha", value: "Dzongkha", label: "Dzongkha" },
	{ code: "ee", name: "Ewe", value: "Ewe", label: "Ewe" },
	{ code: "el", name: "Greek, Modern (1453-)", value: "Greek, Modern (1453-)", label: "Greek, Modern (1453-)" },
	{ code: "en", name: "English", value: "English", label: "English" },
	{ code: "eo", name: "Esperanto", value: "Esperanto", label: "Esperanto" },
	{ code: "es", name: "Spanish", value: "Spanish", label: "Spanish" },
	{ code: "et", name: "Estonian", value: "Estonian", label: "Estonian" },
	{ code: "eu", name: "Basque", value: "Basque", label: "Basque" },
	{ code: "fa", name: "Persian", value: "Persian", label: "Persian" },
	{ code: "ff", name: "Fulah", value: "Fulah", label: "Fulah" },
	{ code: "fi", name: "Finnish", value: "Finnish", label: "Finnish" },
	{ code: "fj", name: "Fijian", value: "Fijian", label: "Fijian" },
	{ code: "fo", name: "Faroese", value: "Faroese", label: "Faroese" },
	{ code: "fr", name: "French", value: "French", label: "French" },
	{ code: "fy", name: "Western Frisian", value: "Western Frisian", label: "Western Frisian" },
	{ code: "ga", name: "Irish", value: "Irish", label: "Irish" },
	{ code: "gd", name: "Gaelic; Scomttish Gaelic", value: "Gaelic; Scomttish Gaelic", label: "Gaelic; Scomttish Gaelic" },
	{ code: "gl", name: "Galician", value: "Galician", label: "Galician" },
	{ code: "gn", name: "Guarani", value: "Guarani", label: "Guarani" },
	{ code: "gu", name: "Gujarati", value: "Gujarati", label: "Gujarati" },
	{ code: "gv", name: "Manx", value: "Manx", label: "Manx" },
	{ code: "ha", name: "Hausa", value: "Hausa", label: "Hausa" },
	{ code: "he", name: "Hebrew", value: "Hebrew", label: "Hebrew" },
	{ code: "hi", name: "Hindi", value: "Hindi", label: "Hindi" },
	{ code: "ho", name: "Hiri Motu", value: "Hiri Motu", label: "Hiri Motu" },
	{ code: "hr", name: "Croatian", value: "Croatian", label: "Croatian" },
	{ code: "ht", name: "Haitian; Haitian Creole", value: "Haitian; Haitian Creole", label: "Haitian; Haitian Creole" },
	{ code: "hu", name: "Hungarian", value: "Hungarian", label: "Hungarian" },
	{ code: "hy", name: "Armenian", value: "Armenian", label: "Armenian" },
	{ code: "hz", name: "Herero", value: "Herero", label: "Herero" },
	{ code: "ia", name: "Interlingua (International Auxiliary Language Association)", value: "Interlingua (International Auxiliary Language Association)", label: "Interlingua (International Auxiliary Language Association)" },
	{ code: "id", name: "Indonesian", value: "Indonesian", label: "Indonesian" },
	{ code: "ie", name: "Interlingue; Occidental", value: "Interlingue; Occidental", label: "Interlingue; Occidental" },
	{ code: "ig", name: "Igbo", value: "Igbo", label: "Igbo" },
	{ code: "ii", name: "Sichuan Yi; Nuosu", value: "Sichuan Yi; Nuosu", label: "Sichuan Yi; Nuosu" },
	{ code: "ik", name: "Inupiaq", value: "Inupiaq", label: "Inupiaq" },
	{ code: "io", name: "Ido", value: "Ido", label: "Ido" },
	{ code: "is", name: "Icelandic", value: "Icelandic", label: "Icelandic" },
	{ code: "it", name: "Italian", value: "Italian", label: "Italian" },
	{ code: "iu", name: "Inuktitut", value: "Inuktitut", label: "Inuktitut" },
	{ code: "ja", name: "Japanese", value: "Japanese", label: "Japanese" },
	{ code: "jv", name: "Javanese", value: "Javanese", label: "Javanese" },
	{ code: "ka", name: "Georgian", value: "Georgian", label: "Georgian" },
	{ code: "kg", name: "Kongo", value: "Kongo", label: "Kongo" },
	{ code: "ki", name: "Kikuyu; Gikuyu", value: "Kikuyu; Gikuyu", label: "Kikuyu; Gikuyu" },
	{ code: "kj", name: "Kuanyama; Kwanyama", value: "Kuanyama; Kwanyama", label: "Kuanyama; Kwanyama" },
	{ code: "kk", name: "Kazakh", value: "Kazakh", label: "Kazakh" },
	{ code: "kl", name: "Kalaallisut; Greenlandic", value: "Kalaallisut; Greenlandic", label: "Kalaallisut; Greenlandic" },
	{ code: "km", name: "Central Khmer", value: "Central Khmer", label: "Central Khmer" },
	{ code: "kn", name: "Kannada", value: "Kannada", label: "Kannada" },
	{ code: "ko", name: "Korean", value: "Korean", label: "Korean" },
	{ code: "kr", name: "Kanuri", value: "Kanuri", label: "Kanuri" },
	{ code: "ks", name: "Kashmiri", value: "Kashmiri", label: "Kashmiri" },
	{ code: "ku", name: "Kurdish", value: "Kurdish", label: "Kurdish" },
	{ code: "kv", name: "Komi", value: "Komi", label: "Komi" },
	{ code: "kw", name: "Cornish", value: "Cornish", label: "Cornish" },
	{ code: "ky", name: "Kirghiz; Kyrgyz", value: "Kirghiz; Kyrgyz", label: "Kirghiz; Kyrgyz" },
	{ code: "la", name: "Latin", value: "Latin", label: "Latin" },
	{ code: "lb", name: "Luxembourgish; Letzeburgesch", value: "Luxembourgish; Letzeburgesch", label: "Luxembourgish; Letzeburgesch" },
	{ code: "lg", name: "Ganda", value: "Ganda", label: "Ganda" },
	{ code: "li", name: "Limburgan; Limburger; Limburgish", value: "Limburgan; Limburger; Limburgish", label: "Limburgan; Limburger; Limburgish" },
	{ code: "ln", name: "Lingala", value: "Lingala", label: "Lingala" },
	{ code: "lo", name: "Lao", value: "Lao", label: "Lao" },
	{ code: "lt", name: "Lithuanian", value: "Lithuanian", label: "Lithuanian" },
	{ code: "lu", name: "Luba-Katanga", value: "Luba-Katanga", label: "Luba-Katanga" },
	{ code: "lv", name: "Latvian", value: "Latvian", label: "Latvian" },
	{ code: "mg", name: "Malagasy", value: "Malagasy", label: "Malagasy" },
	{ code: "mh", name: "Marshallese", value: "Marshallese", label: "Marshallese" },
	{ code: "mi", name: "Maori", value: "Maori", label: "Maori" },
	{ code: "mk", name: "Macedonian", value: "Macedonian", label: "Macedonian" },
	{ code: "ml", name: "Malayalam", value: "Malayalam", label: "Malayalam" },
	{ code: "mn", name: "Mongolian", value: "Mongolian", label: "Mongolian" },
	{ code: "mr", name: "Marathi", value: "Marathi", label: "Marathi" },
	{ code: "ms", name: "Malay", value: "Malay", label: "Malay" },
	{ code: "mt", name: "Maltese", value: "Maltese", label: "Maltese" },
	{ code: "my", name: "Burmese", value: "Burmese", label: "Burmese" },
	{ code: "na", name: "Nauru", value: "Nauru", label: "Nauru" },
	{ code: "nb", name: "Bokmål, Norwegian; Norwegian Bokmål", value: "Bokmål, Norwegian; Norwegian Bokmål", label: "Bokmål, Norwegian; Norwegian Bokmål" },
	{ code: "nd", name: "Ndebele, North; North Ndebele", value: "Ndebele, North; North Ndebele", label: "Ndebele, North; North Ndebele" },
	{ code: "ne", name: "Nepali", value: "Nepali", label: "Nepali" },
	{ code: "ng", name: "Ndonga", value: "Ndonga", label: "Ndonga" },
	{ code: "nl", name: "Dutch; Flemish", value: "Dutch; Flemish", label: "Dutch; Flemish" },
	{ code: "nn", name: "Norwegian Nynorsk; Nynorsk, Norwegian", value: "Norwegian Nynorsk; Nynorsk, Norwegian", label: "Norwegian Nynorsk; Nynorsk, Norwegian" },
	{ code: "no", name: "Norwegian", value: "Norwegian", label: "Norwegian" },
	{ code: "nr", name: "Ndebele, South; South Ndebele", value: "Ndebele, South; South Ndebele", label: "Ndebele, South; South Ndebele" },
	{ code: "nv", name: "Navajo; Navaho", value: "Navajo; Navaho", label: "Navajo; Navaho" },
	{ code: "ny", name: "Chichewa; Chewa; Nyanja", value: "Chichewa; Chewa; Nyanja", label: "Chichewa; Chewa; Nyanja" },
	{ code: "oc", name: "Occitan (post 1500)", value: "Occitan (post 1500)", label: "Occitan (post 1500)" },
	{ code: "oj", name: "Ojibwa", value: "Ojibwa", label: "Ojibwa" },
	{ code: "om", name: "Oromo", value: "Oromo", label: "Oromo" },
	{ code: "or", name: "Oriya", value: "Oriya", label: "Oriya" },
	{ code: "os", name: "Ossetian; Ossetic", value: "Ossetian; Ossetic", label: "Ossetian; Ossetic" },
	{ code: "pa", name: "Panjabi; Punjabi", value: "Panjabi; Punjabi", label: "Panjabi; Punjabi" },
	{ code: "pi", name: "Pali", value: "Pali", label: "Pali" },
	{ code: "pl", name: "Polish", value: "Polish", label: "Polish" },
	{ code: "ps", name: "Pushto; Pashto", value: "Pushto; Pashto", label: "Pushto; Pashto" },
	{ code: "pt", name: "Portuguese", value: "Portuguese", label: "Portuguese" },
	{ code: "qu", name: "Quechua", value: "Quechua", label: "Quechua" },
	{ code: "rm", name: "Romansh", value: "Romansh", label: "Romansh" },
	{ code: "rn", name: "Rundi", value: "Rundi", label: "Rundi" },
	{ code: "ro", name: "Romanian; Moldavian; Moldovan", value: "Romanian; Moldavian; Moldovan", label: "Romanian; Moldavian; Moldovan" },
	{ code: "ru", name: "Russian", value: "Russian", label: "Russian" },
	{ code: "rw", name: "Kinyarwanda", value: "Kinyarwanda", label: "Kinyarwanda" },
	{ code: "sa", name: "Sanskrit", value: "Sanskrit", label: "Sanskrit" },
	{ code: "sc", name: "Sardinian", value: "Sardinian", label: "Sardinian" },
	{ code: "sd", name: "Sindhi", value: "Sindhi", label: "Sindhi" },
	{ code: "se", name: "Northern Sami", value: "Northern Sami", label: "Northern Sami" },
	{ code: "sg", name: "Sango", value: "Sango", label: "Sango" },
	{ code: "si", name: "Sinhala; Sinhalese", value: "Sinhala; Sinhalese", label: "Sinhala; Sinhalese" },
	{ code: "sk", name: "Slovak", value: "Slovak", label: "Slovak" },
	{ code: "sl", name: "Slovenian", value: "Slovenian", label: "Slovenian" },
	{ code: "sm", name: "Samoan", value: "Samoan", label: "Samoan" },
	{ code: "sn", name: "Shona", value: "Shona", label: "Shona" },
	{ code: "so", name: "Somali", value: "Somali", label: "Somali" },
	{ code: "sq", name: "Albanian", value: "Albanian", label: "Albanian" },
	{ code: "sr", name: "Serbian", value: "Serbian", label: "Serbian" },
	{ code: "ss", name: "Swati", value: "Swati", label: "Swati" },
	{ code: "st", name: "Sotho, Southern", value: "Sotho, Southern", label: "Sotho, Southern" },
	{ code: "su", name: "Sundanese", value: "Sundanese", label: "Sundanese" },
	{ code: "sv", name: "Swedish", value: "Swedish", label: "Swedish" },
	{ code: "sw", name: "Swahili", value: "Swahili", label: "Swahili" },
	{ code: "ta", name: "Tamil", value: "Tamil", label: "Tamil" },
	{ code: "te", name: "Telugu", value: "Telugu", label: "Telugu" },
	{ code: "tg", name: "Tajik", value: "Tajik", label: "Tajik" },
	{ code: "th", name: "Thai", value: "Thai", label: "Thai" },
	{ code: "ti", name: "Tigrinya", value: "Tigrinya", label: "Tigrinya" },
	{ code: "tk", name: "Turkmen", value: "Turkmen", label: "Turkmen" },
	{ code: "tl", name: "Tagalog", value: "Tagalog", label: "Tagalog" },
	{ code: "tn", name: "Tswana", value: "Tswana", label: "Tswana" },
	{ code: "to", name: "Tonga (Tonga Islands)", value: "Tonga (Tonga Islands)", label: "Tonga (Tonga Islands)" },
	{ code: "tr", name: "Turkish", value: "Turkish", label: "Turkish" },
	{ code: "ts", name: "Tsonga", value: "Tsonga", label: "Tsonga" },
	{ code: "tt", name: "Tatar", value: "Tatar", label: "Tatar" },
	{ code: "tw", name: "Twi", value: "Twi", label: "Twi" },
	{ code: "ty", name: "Tahitian", value: "Tahitian", label: "Tahitian" },
	{ code: "ug", name: "Uighur; Uyghur", value: "Uighur; Uyghur", label: "Uighur; Uyghur" },
	{ code: "uk", name: "Ukrainian", value: "Ukrainian", label: "Ukrainian" },
	{ code: "ur", name: "Urdu", value: "Urdu", label: "Urdu" },
	{ code: "uz", name: "Uzbek", value: "Uzbek", label: "Uzbek" },
	{ code: "ve", name: "Venda", value: "Venda", label: "Venda" },
	{ code: "vi", name: "Vietnamese", value: "Vietnamese", label: "Vietnamese" },
	{ code: "vo", name: "Volapük", value: "Volapük", label: "Volapük" },
	{ code: "wa", name: "Walloon", value: "Walloon", label: "Walloon" },
	{ code: "wo", name: "Wolof", value: "Wolof", label: "Wolof" },
	{ code: "xh", name: "Xhosa", value: "Xhosa", label: "Xhosa" },
	{ code: "yi", name: "Yiddish", value: "Yiddish", label: "Yiddish" },
	{ code: "yo", name: "Yoruba", value: "Yoruba", label: "Yoruba" },
	{ code: "za", name: "Zhuang; Chuang", value: "Zhuang; Chuang", label: "Zhuang; Chuang" },
	{ code: "zh", name: "Chinese", value: "Chinese", label: "Chinese" },
	{ code: "zu", name: "Zulu" , value: "Zulu", label: "Zulu"}
	
]

export default languages;