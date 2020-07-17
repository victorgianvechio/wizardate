/* eslint-disable default-case */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */

import axios from 'axios';
import fs from 'fs';

const Locale = {
  PT_BR: 'pt_BR',
  EN: 'en',
  FR: 'fr',
  ES: 'es',
  DE: 'de',
  IT: 'it',
};

const DateFormat = {
  LITTLE_ENDIAN: 'L', // => dd/mm/yyyy | 22/4/2006 or 22 April 2006
  MIDDLE_ENDIAN: 'M', // => mm/dd/yyyy | 04/22/2006 or April 22, 2006
  BIG_ENDIAN: 'B', // => yyyy/mm/dd | 2006/04/22 or 2006 April 22
};

class Wizardate {
  constructor(language) {
    // Date and Time variables
    this.day = 0;
    this.strDay = '';
    this.monthNumber = 0;
    this.strMonthNumber = '';
    this.month = '';
    this.year = 0;
    this.weekdayNumber = 0;
    this.strWeekdayNumber = '';
    this.weekday = '';
    this.hour = 0;
    this.strHour = '';
    this.minute = 0;
    this.strMinute = '';
    this.second = 0;
    this.strSecond = '';
    this.descHour = '';
    this.descMinute = '';
    this.descSecond = '';
    this.descDay = '';
    this.descWeek = '';
    this.descMonth = '';
    this.descYear = '';
    this.date = new Date();
    this.formattedDate = '';

    // Locale variables
    this.city = '';
    this.region = '';
    this.regionCode = '';
    this.country = '';
    this.countryCode = '';
    this.timezone = '';
    this.zipcode = '';

    // Date validations variables
    this.isValidDate = true;
    this.invalidDate = 'Invalid Date';

    // Config variables
    this.sepDate = '';
    this.sepTime = '';

    // Translated variables
    this.weekday1 = '';
    this.weekday2 = '';
    this.weekday3 = '';
    this.weekday4 = '';
    this.weekday5 = '';
    this.weekday6 = '';
    this.weekday7 = '';

    this.month1 = '';
    this.month2 = '';
    this.month3 = '';
    this.month4 = '';
    this.month5 = '';
    this.month6 = '';
    this.month7 = '';
    this.month8 = '';
    this.month9 = '';
    this.month10 = '';
    this.month11 = '';
    this.month12 = '';

    this.hourSingular = '';
    this.hourPlural = '';
    this.minuteSingular = '';
    this.minutePlural = '';
    this.secondSingular = '';
    this.secondPlural = '';
    this.daySingular = '';
    this.dayPlural = '';
    this.weekSingular = '';
    this.weekPlural = '';
    this.monthSingular = '';
    this.monthPlural = '';
    this.yearSingular = '';
    this.yearPlural = '';

    // User Functions
    this.funcs = {};

    // Language
    this.language = language;
    this.dateFormat = '';

    // Set config variables
    this.setDefaultConfig(language);

    // Translate
    this.translate(language);
  }

  translate(language) {
    // const file = fs.readFileSync(`./languages/${language}.json`, {
    //   encoding: 'utf8',
    //   flag: 'r',
    // });
    const file = fs.readFileSync(
      `${process.env.INIT_CWD}/node_modules/wizardate/languages/${language}.json`,
      {
        encoding: 'utf8',
        flag: 'r',
      }
    );
    // const decodedFile = decoder.decode(file);
    const data = JSON.parse(file);

    this.weekday1 = data.week.weekDay[0];
    this.weekday2 = data.week.weekDay[1];
    this.weekday3 = data.week.weekDay[2];
    this.weekday4 = data.week.weekDay[3];
    this.weekday5 = data.week.weekDay[4];
    this.weekday6 = data.week.weekDay[5];
    this.weekday7 = data.week.weekDay[6];

    this.month1 = data.month.months[0];
    this.month2 = data.month.months[1];
    this.month3 = data.month.months[2];
    this.month4 = data.month.months[3];
    this.month5 = data.month.months[4];
    this.month6 = data.month.months[5];
    this.month7 = data.month.months[6];
    this.month8 = data.month.months[7];
    this.month9 = data.month.months[8];
    this.month10 = data.month.months[9];
    this.month11 = data.month.months[10];
    this.month12 = data.month.months[11];

    this.hourSingular = data.hour.singular;
    this.hourPlural = data.hour.plural;
    this.minuteSingular = data.minute.singular;
    this.minutePlural = data.minute.plural;
    this.secondSingular = data.second.singular;
    this.secondPlural = data.second.plural;
    this.daySingular = data.day.singular;
    this.dayPlural = data.day.plural;
    this.weekSingular = data.week.singular;
    this.weekPlural = data.week.plural;
    this.monthSingular = data.month.singular;
    this.monthPlural = data.month.plural;
    this.yearSingular = data.year.singular;
    this.yearPlural = data.year.plural;
  }

  // Set default config variables
  setDefaultConfig(language) {
    if (language === pt_BR) {
      this.sepDate = '/';
      this.sepTime = ':';
      this.dateFormat = DateFormat.LITTLE_ENDIAN;
    }

    if (language === en) {
      this.sepDate = '-';
      this.sepTime = ':';
      this.dateFormat = DateFormat.MIDDLE_ENDIAN;
    }

    if (language === de) {
      this.sepDate = '/';
      this.sepTime = ':';
      this.dateFormat = DateFormat.LITTLE_ENDIAN;
    }

    if (language === es) {
      this.sepDate = '/';
      this.sepTime = ':';
      this.dateFormat = DateFormat.LITTLE_ENDIAN;
    }

    if (language === fr) {
      this.sepDate = '/';
      this.sepTime = ':';
      this.dateFormat = DateFormat.LITTLE_ENDIAN;
    }

    if (language === it) {
      this.sepDate = '/';
      this.sepTime = ':';
      this.dateFormat = DateFormat.LITTLE_ENDIAN;
    }
  }

  // Set new config
  setConfig(cfg) {
    this.sepDate = cfg.sepDate;
    this.sepTime = cfg.sepTime;
  }

  // Set date format
  setDateFormat(dateFormat) {
    this.dateFormat = dateFormat;
  }

  // Registry your own function
  registry(funcName, func) {
    this.funcs[funcName.trim()] = func;
  }

  dateNow(date) {
    try {
      this.isValidDate = true;
      this.date = new Date(date);

      if (this.date.toString() === 'Invalid Date') {
        throw new Error(`${date} is not a valid date`);
      }

      this.day = this.date.getDate();
      this.monthNumber = this.date.getMonth() + 1;
      this.year = this.date.getFullYear();
      this.weekdayNumber = this.date.getDay() + 1;
      this.hour = this.date.getHours();
      this.minute = this.date.getMinutes();
      this.second = this.date.getSeconds();

      /// /////////////////// String number with 0 //////////////////////
      if (this.day.toString().length === 1) {
        this.strDay = `0${this.day.toString()}`;
      } else this.strDay = this.day.toString();

      if (this.weekdayNumber.toString().length === 1) {
        this.strWeekdayNumber = `0${this.weekdayNumber.toString()}`;
      } else this.strWeekdayNumber = this.weekdayNumber.toString();

      if (this.monthNumber.toString().length === 1) {
        this.strMonthNumber = `0${this.monthNumber.toString()}`;
      } else this.strMonthNumber = this.monthNumber.toString();

      if (this.hour.toString().length === 1) {
        this.strHour = `0${this.hour.toString()}`;
      } else this.strHour = this.hour.toString();

      if (this.minute.toString().length === 1) {
        this.strMinute = `0${this.minute.toString()}`;
      } else this.strMinute = this.minute.toString();

      if (this.second.toString().length === 1) {
        this.strSecond = `0${this.second.toString()}`;
      } else this.strSecond = this.second.toString();

      /// /////////////////// Singular or Plural //////////////////////
      if (this.hour !== 1) this.descHour = this.hourPlural;
      else this.descHour = this.hourSingular;

      if (this.minute !== 1) this.descMinute = this.minutePlural;
      else this.descMinute = this.minuteSingular;

      if (this.second !== 1) this.descSecond = this.secondPlural;
      else this.descSecond = this.secondSingular;

      if (this.day !== 1) this.descDay = this.dayPlural;
      else this.descDay = this.daySingular;

      if (this.weekdayNumber !== 1) this.descWeek = this.weekPlural;
      else this.descWeek = this.weekSingular;

      if (this.monthNumber !== 1) this.descMonth = this.monthPlural;
      else this.descMonth = this.monthSingular;

      if (this.year !== 1) this.descYear = this.yearPlural;
      else this.descYear = this.yearSingular;

      /// //////////////////////// Weekday ///////////////////////////
      switch (this.weekdayNumber) {
        case 1:
          this.weekday = this.weekday1;
          break;
        case 2:
          this.weekday = this.weekday2;
          break;
        case 3:
          this.weekday = this.weekday3;
          break;
        case 4:
          this.weekday = this.weekday4;
          break;
        case 5:
          this.weekday = this.weekday5;
          break;
        case 6:
          this.weekday = this.weekday6;
          break;
        case 7:
          this.weekday = this.weekday7;
          break;
      }

      /// //////////////////////// Month ///////////////////////////
      switch (this.monthNumber) {
        case 1:
          this.month = this.month1;
          break;
        case 2:
          this.month = this.month2;
          break;
        case 3:
          this.month = this.month3;
          break;
        case 4:
          this.month = this.month4;
          break;
        case 5:
          this.month = this.month5;
          break;
        case 6:
          this.month = this.month6;
          break;
        case 7:
          this.month = this.month7;
          break;
        case 8:
          this.month = this.month8;
          break;
        case 9:
          this.month = this.month9;
          break;
        case 10:
          this.month = this.month10;
          break;
        case 11:
          this.month = this.month11;
          break;
        case 12:
          this.month = this.month12;
          break;
      }

      /// //////////////////////// Date Format ///////////////////////////
      if (this.dateFormat === DateFormat.LITTLE_ENDIAN) {
        this.formattedDate = `${this.strDay}${this.sepDate}${this.strMonthNumber}${this.sepDate}${this.year}`;
      }

      if (this.dateFormat === DateFormat.MIDDLE_ENDIAN) {
        this.formattedDate = `${this.strMonthNumber}${this.sepDate}${this.strDay}${this.sepDate}${this.year}`;
      }

      if (this.dateFormat === DateFormat.BIG_ENDIAN) {
        this.formattedDate = `${this.year}${this.sepDate}${this.strMonthNumber}${this.sepDate}${this.strDay}`;
      }
    } catch (err) {
      this.isValidDate = false;
    }
  }

  // Date Functions
  getDay(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate ? this.day : this.invalidDate;
  }

  getMonthNumber(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate ? this.monthNumber : this.invalidDate;
  }

  getMonth(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate ? this.month : this.invalidDate;
  }

  getShortMonth(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate ? this.month.substr(0, 3) : this.invalidDate;
  }

  getYear(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate ? this.year : this.invalidDate;
  }

  getShortYear(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? Number(this.year.toString().substr(2, 2))
      : this.invalidDate;
  }

  getWeekdayNumber(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate ? this.weekdayNumber : this.invalidDate;
  }

  getWeekday(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate ? this.weekday : this.invalidDate;
  }

  getShortWeekday(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate ? this.weekday.substr(0, 3) : this.invalidDate;
  }

  getDate(date = new Date()) {
    this.dateNow(date);

    return this.isValidDate ? `${this.formattedDate}` : this.invalidDate;
  }

  getExtendedDate(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.strDay} ${this.month} ${this.year}`
      : this.invalidDate;
  }

  getExtendedWeekdayDate(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.weekday}, ${this.strDay} ${this.month} ${this.year}`
      : this.invalidDate;
  }

  getMonthNumberYear(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.strMonthNumber}${this.sepDate}${this.year}`
      : this.invalidDate;
  }

  getMonthYear(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.month}${this.sepDate}${this.year}`
      : this.invalidDate;
  }

  getShortMonthYear(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.month.substr(0, 3)}${this.sepDate}${this.year}`
      : this.invalidDate;
  }

  getShortMonthShortYear(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.month.substr(0, 3)}${this.sepDate}${this.year
          .toString()
          .substr(2, 4)}`
      : this.invalidDate;
  }

  getHour(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate ? this.hour : this.invalidDate;
  }

  getExtendedHour(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.strHour} ${this.descHour}`
      : this.invalidDate;
  }

  getMinute(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate ? this.minute : this.invalidDate;
  }

  getExtendedMinute(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.strMinute} ${this.descMinute}`
      : this.invalidDate;
  }

  getSecond(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate ? this.second : this.invalidDate;
  }

  getExtendedSecond(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.strSecond} ${this.descSecond}`
      : this.invalidDate;
  }

  getTime(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.strHour}${this.sepTime}${this.strMinute}${this.sepTime}${this.strSecond}`
      : this.invalidDate;
  }

  getExtendedTime(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.strHour} ${this.descHour} ${this.strMinute} ${this.descMinute} ${this.strSecond} ${this.descSecond}`
      : this.invalidDate;
  }

  getHourMinute(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.strHour}${this.sepTime}${this.strMinute}`
      : this.invalidDate;
  }

  getExtendedHourMinute(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.strHour} ${this.descHour} ${this.strMinute} ${this.descMinute}`
      : this.invalidDate;
  }

  getDateTime(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.strDay}${this.sepDate}${this.strMonthNumber}${this.sepDate}${this.year} ${this.strHour}${this.sepTime}${this.strMinute}${this.sepTime}${this.strSecond}`
      : this.invalidDate;
  }

  getExtendedDateTime(date = new Date()) {
    this.dateNow(date);
    return this.isValidDate
      ? `${this.strDay} ${this.month} ${this.year} ${this.strHour} ${this.descHour} ${this.strMinute} ${this.descMinute} ${this.strSecond} ${this.descSecond}`
      : this.invalidDate;
  }

  async getExtendedCityDate(date = new Date()) {
    this.dateNow(date);
    await this.getCity();
    return this.isValidDate
      ? `${this.city}, ${this.strDay} ${this.month} ${this.year}`
      : this.invalidDate;
  }

  async getExtendedRegionDate(date = new Date()) {
    this.dateNow(date);
    await this.getRegion();
    return this.isValidDate
      ? `${this.region}, ${this.strDay} ${this.month} ${this.year}`
      : this.invalidDate;
  }

  async getExtendedRegionCodeDate(date = new Date()) {
    this.dateNow(date);
    await this.getRegionCode();
    return this.isValidDate
      ? `${this.regionCode}, ${this.strDay} ${this.month} ${this.year}`
      : this.invalidDate;
  }

  async getExtendedCountryDate(date = new Date()) {
    this.dateNow(date);
    await this.getCountry();
    return this.isValidDate
      ? `${this.country}, ${this.strDay} ${this.month} ${this.year}`
      : this.invalidDate;
  }

  async getExtendedCountryCodeDate(date = new Date()) {
    this.dateNow(date);
    await this.getCountryCode();
    return this.isValidDate
      ? `${this.countryCode}, ${this.strDay} ${this.month} ${this.year}`
      : this.invalidDate;
  }

  async getCity() {
    if (this.city === '') await this.getLocaleInfo();
    return this.city;
  }

  async getRegion() {
    if (this.region === '') await this.getLocaleInfo();
    return this.region;
  }

  async getRegionCode() {
    if (this.regionCode === '') await this.getLocaleInfo();
    return this.regionCode;
  }

  async getCountry() {
    if (this.country === '') await this.getLocaleInfo();
    return this.country;
  }

  async getCountryCode() {
    if (this.countryCode === '') await this.getLocaleInfo();
    return this.countryCode;
  }

  async getTimezone() {
    if (this.timezone === '') await this.getLocaleInfo();
    return this.timezone;
  }

  async getZipcode() {
    if (this.zipcode === '') await this.getLocaleInfo();
    return this.zipcode;
  }

  // Set first letter upper
  capitalize(text) {
    return text[0].toUpperCase() + text.slice(1);
  }

  // Get actual locale info
  async getLocaleInfo() {
    await axios
      .get('http://ip-api.com/json')
      .then(response => {
        const { data } = response;

        this.city = data.city;
        this.region = data.regionName;
        this.regionCode = data.region;
        this.country = data.country;
        this.countryCode = data.countryCode;
        this.timezone = data.timezone;
        this.zipcode = data.zip;
      })
      .catch(error => console.log(error));
  }

  // Create your own format pattern
  async formatPattern(pattern, date = new Date()) {
    this.dateNow(date);
    await this.getLocaleInfo();
    let formattedDate = pattern;

    /// //////////////////////// Full Date ///////////////////////////
    formattedDate = formattedDate.replace(/'date'/g, this.getDate()); // => 25/02/2020

    /// //////////////////////// Full time ///////////////////////////
    formattedDate = formattedDate.replace(/'time'/g, this.getTime()); // => 15:21:03

    /// //////////////////////// Day ///////////////////////////
    formattedDate = formattedDate.replace(/'d'/g, this.day.toString()); // => 1, 2
    formattedDate = formattedDate.replace(/'dd'/g, this.strDay); // => 01, 02

    /// //////////////////////// Month ///////////////////////////
    formattedDate = formattedDate.replace(/'m'/g, this.monthNumber.toString()); // => 1, 2

    formattedDate = formattedDate.replace(/'mm'/g, this.strMonthNumber); // => 01, 02
    formattedDate = formattedDate.replace(/'mmm'/g, this.getShortMonth()); // => jan
    formattedDate = formattedDate.replace(/'mmmm'/g, this.month); // => janeiro

    formattedDate = formattedDate.replace(
      /'MMM'/g,
      this.capitalize(this.getShortMonth())
    ); // => Jan

    formattedDate = formattedDate.replace(
      /'MMMM'/g,
      this.capitalize(this.month)
    ); // => Janeiro

    /// //////////////////////// Year ///////////////////////////
    formattedDate = formattedDate.replace(
      /'yy'/g,
      this.getShortYear.toString()
    ); // => 20
    formattedDate = formattedDate.replace(/'yyyy'/g, this.year.toString()); // => 2020

    /// //////////////////////// Week ///////////////////////////
    formattedDate = formattedDate.replace(
      /'w'/g,
      this.weekdayNumber.toString()
    ); // => 1,2,3

    formattedDate = formattedDate.replace(/'ww'/g, this.strWeekdayNumber); // => 01, 02, 03
    formattedDate = formattedDate.replace(/'www'/g, this.getShortWeekday()); // => seg, ter, qua
    formattedDate = formattedDate.replace(/'wwww'/g, this.weekday); // => segunda, terça, quarta

    if (this.language === 'pt_BR') {
      formattedDate = formattedDate.replace(
        /'wwwww'/g,
        `${this.weekday}-feira`
      ); // only br => segunda-feira, terça-feira, quarta-feira

      formattedDate = formattedDate.replace(
        /'WWWWW'/g,
        `${this.capitalize(this.weekday)}-feira`
      ); // => Segunda-feira, Terça-feira, Quarta-feira
    }

    formattedDate = formattedDate.replace(
      /'WWW'/g,
      this.capitalize(this.getShortWeekday())
    ); // => Seg, Ter, Qua

    formattedDate = formattedDate.replace(
      /'WWWW'/g,
      this.capitalize(this.weekday)
    ); // => Segunda, Terça, Quarta

    /// //////////////////////// Hour ///////////////////////////
    formattedDate = formattedDate.replace(/'h'/g, this.hour.toString()); // => 1,2,3
    formattedDate = formattedDate.replace(/'hh'/g, this.strHour); // => 01,02,03

    formattedDate = formattedDate.replace(
      /'hhh'/g,
      this.hour.toString() + this.descHour
    ); // => 1 hour, 10 hours

    formattedDate = formattedDate.replace(
      /'hhhh'/g,
      this.strHour + this.descHour
    ); // => 01 hour, 10 hours

    formattedDate = formattedDate.replace(
      /'HHH'/g,
      this.hour.toString() + this.capitalize(this.descHour)
    ); // => 1 Hour, 10 Hours

    formattedDate = formattedDate.replace(
      /'HHHH'/g,
      this.strHour + this.capitalize(this.descHour)
    ); // => 01 Hour, 10 Hours

    /// //////////////////////// Minute ///////////////////////////
    formattedDate = formattedDate.replace(/'i'/g, this.minute.toString()); // => 1,2,3
    formattedDate = formattedDate.replace(/'ii'/g, this.strMinute); // => 01,02,03

    formattedDate = formattedDate.replace(
      /'iii'/g,
      this.minute.toString() + this.descMinute
    ); // => 1 minute, 10 minutes

    formattedDate = formattedDate.replace(
      /'iiii'/g,
      this.strMinute + this.descMinute
    ); // => 01 minute, 10 minutes

    formattedDate = formattedDate.replace(
      /'III'/g,
      this.minute.toString() + this.capitalize(this.descMinute)
    ); // => 1 Minute, 10 Minutes

    formattedDate = formattedDate.replace(
      /'IIII'/g,
      this.strMinute + this.capitalize(this.descMinute)
    ); // => 01 Minute, 10 Minutes

    /// //////////////////////// Second ///////////////////////////
    formattedDate = formattedDate.replace(/'s'/g, this.second.toString()); // => 1,2,3
    formattedDate = formattedDate.replace(/'ss'/g, this.strSecond); // => 01,02,03

    formattedDate = formattedDate.replace(
      /'sss'/g,
      this.second.toString() + this.descSecond
    ); // => 1 second, 10 seconds

    formattedDate = formattedDate.replace(
      /'ssss'/g,
      this.strSecond + this.descSecond
    ); // => 01 second, 10 seconds

    formattedDate = formattedDate.replace(
      /'SSS'/g,
      this.second.toString() + this.capitalize(this.descSecond)
    ); // => 1 Second, 10 Seconds

    formattedDate = formattedDate.replace(
      /'SSSS'/g,
      this.strSecond + this.capitalize(this.descSecond)
    ); // => 01 Second, 10 Seconds

    /// //////////////////////// City ///////////////////////////
    formattedDate = formattedDate.replace(/'city'/g, this.city); // => Marília

    /// //////////////////////// Region ///////////////////////////
    formattedDate = formattedDate.replace(/'region'/g, this.region); // => São Paulo
    formattedDate = formattedDate.replace(/'regionCode'/g, this.regionCode); // => SP

    /// //////////////////////// Country ///////////////////////////
    formattedDate = formattedDate.replace(/'country'/g, this.country); // => Brazil
    formattedDate = formattedDate.replace(/'countryCode'/g, this.countryCode); // => BR

    return formattedDate;
  }
}

export const pt_BR = Locale.PT_BR;
export const en = Locale.EN;
export const fr = Locale.FR;
export const es = Locale.ES;
export const de = Locale.DE;
export const it = Locale.IT;

export const LittleEndian = DateFormat.LITTLE_ENDIAN;
export const MiddleEndian = DateFormat.MIDDLE_ENDIAN;
export const BigEndian = DateFormat.BIG_ENDIAN;

export default Wizardate;
