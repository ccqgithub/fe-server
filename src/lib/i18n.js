const fs = require('fs');
const path = require('path');
const I18n = require('i18n-s');

const i18nDir = path.resolve(__dirname, '../data/i18n/');

module.exports = function getI18nMiddleware(opts = {}) {
  let conf = {
    // where to detect language
    detects: ['header', 'query'],
    // suport languages
    languages: ['zh-CN', 'en-US'],
    // language map
    map: {
      en: 'en-US',
      zh: 'zh-CN',
    },
    // default language
    def: 'zh-CN',
    // header key to detect language
    headerKey: 'Lang',
    // query key to detect language
    queryKey: 'lang',
    // options
    ...opts,
  };

  return async (ctx, next) => {
    // language
    const langs = {
      header: ctx.get(conf.headerKey.toLowerCase()),
      query: ctx.request.query[conf.queryKey],
    };

    let lang = conf.def;
    let type = 'default';
    conf.detects.forEach((key) => {
      let detectLang = langs[key];
      if (!detectLang) return;

      if (conf.languages[detectLang] || conf.map[detectLang]) {
        lang = conf.languages[detectLang] ? detectLang : conf.map[detectLang];
        type = key;
      }
    });

    ctx.state.language = lang;
    ctx.state.languageType = type;

    // i18n
    let i18nData = {};
    try {
      let str = fs.readFileSync(path.resolve(i18nDir, `${lang}.json`), 'utf-8');
      i18nData = JSON.parse(str.trim());
    } catch (err) {
      console.log(err);
    }

    let i18n = new I18n();
    i18n.setLocaleData(lang, i18nData);
    i18n.setLocale(lang);

    ctx.state.__ = i18n.__.bind(i18n);
    ctx.state.i18nData = i18nData;
    ctx.state.i18n = i18n;

    // next
    return next();
  };
};
