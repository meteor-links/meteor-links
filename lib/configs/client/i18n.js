// import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Tracker } from "meteor/tracker";
const getLang = function () {
  console.log("deneme");
  let lang = navigator.languages && navigator.languages[0] ||
    navigator.language ||
    navigator.browserLanguage ||
    navigator.userLanguage ||
    'en-US';

    //navigator dili 'en'gibi 2 harfli veriyor, bizim dil sistemimizde dili seçerken 'en-US' olması gerek bu yüzden aşağıdaki kontrol yapıldı
  if(lang == 'en'){
    lang = 'en-US';
  }else if(lang == 'tr'){
    lang = 'tr-TR';
  }else if(lang == 'ar'){
    lang = 'ar-SA';
  }else if(lang == 'nl'){
    lang = 'nl-NL';
  }else if(lang == 'hu'){
    lang = 'hu-HU';
  }else{
    lang = 'en-US';
  }

  return lang
};

i18n.setLocale(getLang());
console.log(i18n.getLocale());
export let CurrentLocale = new ReactiveVar(i18n.getLocale());
let LocaleShort = new ReactiveVar('en');
let Translate = i18n.createReactiveTranslator();
export function _(...datas){
  let result = Translate(...datas, { _purify: true });
  console.log("bak bak resulta bak vaay vayy:", result);
  return result;
}
localStorage.setItem('language', i18n.getLocale());
console.log("bağa bak:",i18n.getLocale());

Tracker.autorun(function () {
  
  const language = localStorage.getItem('language');
  console.log("localstrorage değişti!");
  if (!language) {
    return;
  }

  console.log("localstrorage değişti! buda yeni değeri:", language);
  CurrentLocale.set(language);
});

Tracker.autorun(function () {
  
  const language = CurrentLocale.get();
  console.log("current locale setlendi!");
  if (!language) {
    return;
  }
  console.log("current locale setlendi! buda yeni değeri:", language);
  const lang = language.slice(0, 2);

  localStorage.setItem('language', language);
  
  i18n.setLocale(language);
  console.log("i18nlocale by:",i18n.getLocale());
  document.documentElement.setAttribute('lang', lang);
  LocaleShort.set(lang);
  console.log(LocaleShort.get());
});

// Template.registerHelper('currentLocale', function () {
//   return CurrentLocale;
// });

// Template.registerHelper('_lang', function () {
//   return LocaleShort;
// });

// Template.registerHelper('_', function (...datas) {
//   return Translate(...datas, { _purify: true });
// });