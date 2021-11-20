import {I18nManager} from 'react-native';
import i18n from 'i18n-js';
import {memoize} from 'lodash';
import * as RNLocalize from 'react-native-localize';
import * as en from './en'; // English
i18n.missingBehaviour = 'guess';

const translationGetters = {
  en: () => en.default,
};

const strLocale = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const setI18nConfig = (language = null) => {
  // fallback if no available language fits
  const fallback = {languageTag: 'en', isRTL: false};
  let {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;
  if (language) {
    languageTag = language.dbValue;
    isRTL = language.isRTL;
  }
  // clear translation cache
  strLocale.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
};

export {setI18nConfig, strLocale};
