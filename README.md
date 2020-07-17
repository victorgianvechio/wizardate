# *Wizardate*

[![NPM Version](https://badge.fury.io/js/wizardate.svg?style=flat)](https://npmjs.org/package/wizardate)
[![license](https://img.shields.io/npm/l/wizardate.svg)](https://github.com/victorgianvechio/wizardate/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dt/wizardate.svg)](https://www.npmjs.com/package/wizardate)
![monthly npm downloads for wizardate](https://img.shields.io/npm/dm/wizardate.svg)


Wizardate provides a set of date formats for different locations. It allows you to create and register your own date formats and patterns.

**Table of content**

-   [Usage](#usage)
-   [Locales and Formats](#locales-and-formats)
    -   [Date Formats](#date-formats)
    -   [Locales](#locales)
-   [Config Functions](#config-functions)
    -   [config(object)](#configobject)
    -   [setDefaultConfig()](#setdefaultconfig)
    -   [setDateFormat(dateFormat)](#setDateFormatdateFormat)
-   [Registry Function](#registry-function)
    -   [registry(funcName, func)](#registryfuncname-func)
-   [Date Functions](#date-functions)
    -   [getDay(date)](#getdaydate)
    -   [getMonthNumber(date)](#getmonthnumberdate)
    -   [getMonth(date)](#getmonthdate)
    -   [getShortMonth(date)](#getshortmonthdate)
    -   [getYear(date)](#getyeardate)
    -   [getShortYear(date)](#getshortyeardate)
    -   [getWeekdayNumber(date)](#getweekdaynumberdate)
    -   [getWeekday(date)](#getweekdaydate)
    -   [getDate(date)](#getdatedate)
    -   [getExtendedDate(date)](#getextendeddatedate)
    -   [getExtendedWeekdayDate(date)](#getextendedweekdaydatedate)
    -   [getMonthNumberYear(date)](#getmonthnumberyeardate)
    -   [getMonthYear(date)](#getmonthyeardate)
    -   [getShortMonthYear(date)](#getshortmonthyeardate)
    -   [getShortMonthShortYear(date)](#getshortmonthshortyeardate)
    -   [getHour(date)](#gethourdate)
    -   [getExtendedHour(date)](#getextendedhourdate)
    -   [getMinute(date)](#getminutedate)
    -   [getExtendedMinute(date)](#getextendedminutedate)
    -   [getSecond(date)](#getseconddate)
    -   [getExtendedSecond(date)](#getextendedseconddate)
    -   [getTime(date)](#gettimedate)
    -   [getExtendedTime(date)](#getextendedtimedate)
    -   [getHourMinute(date)](#gethourminutedate)
    -   [getExtendedHourMinute(date)](#getextendedhourminutedate)
    -   [getDateTime(date)](#getdatetimedate)
    -   [getExtendedDateTime(date)](#getextendeddatetimedate)
    -   [getExtendedCityDate(date)](#getextendedcitydatedate)
    -   [getExtendedRegionDate(date)](#getextendedregiondatedate)
    -   [getExtendedRegionCodeDate(date)](#getextendedregioncodedatedate)
    -   [getExtendedCountryDate(date)](#getextendedcountrydatedate)
    -   [getExtendedCountryCodeDate(date)](#getextendedcountrycodedatedate)
-   [Current Locale Functions](#current-locale-functions)
    -   [getCity()](#getcity)
    -   [getRegion()](#getregion)
    -   [getRegionCode()](#getregioncode)
    -   [getCountry()](#getcountry)
    -   [getCountryCode()](#getcountrycode)
    -   [getTimezone()](#gettimezone)
    -   [getZipcode()](#getzipcode)
-   [Format Pattern](#format-pattern)
    -   [formatPattern(pattern, date)](#formatPatternpattern-date)
-   [Changelog](#changelog)
-   [License](#license)

---

## Usage

```javascript
import Wizardate, { pt_BR } from 'wizardate';

const wizardate = new Wizardate(pt_BR);
wizardate.getDate(); // => 17/07/2020
```

## Locales and Formats

### Date Formats

-    **LittleEndian** - dd/mm/yyyy or 22 April 2006

-    **MiddleEndian** - mm/dd/yyyy or April 22 2006

-    **BigEndian** - yyyy/mm/dd or 2006 April 22

### Locales

All locales has your own default configuration

-   **pt_BR**
    -   **LittleEndian** format
    -   date separator **/**
    -   time separator **:**
-   **en**
    -   **MiddleEndian** format
    -   date separator **-**
    -   time separator **:**
-   **fr**
    -   **LittleEndian** format
    -   date separator **/**
    -   time separator **:**
-   **es**
    -   **LittleEndian** format
    -   date separator **/**
    -   time separator **:**
-   **de**
    -   **LittleEndian** format
    -   date separator **/**
    -   time separator **:**
-   **it**
    -   **LittleEndian** format
    -   date separator **/**
    -   time separator **:**

## Config Functions

### config(object)

Used to separate date and time

-   {string} **sepDate** - used to separate date

    -   e.g.: 02 **/** 11 **/** 2019

-   {string} **sepTime** - used to separate time

    -   e.g.: 08 **:** 53 **:** 20

```javascript
import Wizardate, { fr } from 'wizardate';

const wizardate = new Wizardate(fr);
wizardate.config({
    sepDate: '-',
    sepTime: ':'
})
```

### setDefaultConfig()

Set default config according to [locale](#locales)

```javascript
import Wizardate, { en } from 'wizardate';

const wizardate = new Wizardate(en);
wizardate.setDefaultConfig()
```

### setDateFormat(dateFormat)

```javascript
import Wizardate, { pt_BR, BigEndian } from 'wizardate';

const wizardate = new Wizardate(pt_BR);
wizardate.setDateFormat(BigEndian);
```

## Registry Function

Wizardate allows you to create and register your own functions. Registered functions are stored in the **funcs** props

### registry(funcName, func)

-   {string} **funcName** - function name
-   {function} **func** - function callback

```javascript
import Wizardate, { pt_BR, en, BigEndian } from 'wizardate';

const wizardateBR = new Wizardate(pt_BR);

wizardateBR.registry('myDate', () => {
  return `Today is ${wizardateBR.getWeekday()}, ${wizardateBR.getDate()}`;
});

console.log(wizardateBR.funcs.myDate()); // => Today is friday, 17/07/2020

const wizardateEN = new Wizardate(en);
wizardateEN.setDateFormat(BigEndian);

// Using Format Pattern
wizardateEN.registry('countryCodeAndDate', () => {
  return wizardateEN.formatPattern("'countryCode', 'date'");
});

console.log(wizardateEN.funcs.countryCodeAndDate()); // => BR, 2020-07-17

```

## Date Functions

All functions below receive an **optional** date as a parameter. If no date is passed the function uses the **current** date.

-   {string} **date** - accepts various formats _(optional)_

**e.g.**:

```javascript
wizardate.getDateTime('2012-01-26T13:51:50.417-07:00') // => 26/01/2012 18:51:50

wizardate.getTime('05/07/2019 08:54:32') // => 08:54:32

wizardate.getDate('October 15, 1996 05: 35: 32') // => 15/10/1996

wizardate.getExtendedWeekdayDate('2017-09-08T15:25:53Z') // => monday, 08 september 2017

wizardate.getMonthNumber('05 October 2011 14:48 UTC') // => 10

wizardate.getDateTime('07/24/2015') // => 24/07/2018 00:00:00

wizardate.getWeekday('05 October 2011 14:48 UTC') // => friday

wizardate.getExtendedTime('Wed Oct 05 2011 16:48:00 GMT+0200 (CEST)' // => 11 hours 48 minutes 00 seconds

wizardate.getShortMonthYear('2011-10-05T14:48:00.000Z') // => out/2011

wizardate.getDay('24HJERH87LK4') // => Invalid Date
```

If the date passed is invalid the functions will return **'Invalid Date'**.

### getDay(date)

-   returns day **(1 ~ 31)**

```javascript
wizardate.getDay() // => 17
```

### getMonthNumber(date)

-   returns month number **(1 ~ 12)**

```javascript
wizardate.getMonthNumber() // => 7
```

### getMonth(date)

```javascript
wizardate.getMonth() // => july
```

| number | month     |
| :----- | :-------- |
| 01     | january   |
| 02     | february  |
| 03     | march     |
| 04     | april     |
| 05     | may       |
| 06     | june      |
| 07     | july      |
| 08     | august    |
| 09     | september |
| 10     | october   |
| 11     | november  |
| 12     | december  |

### getShortMonth(date)

```javascript
wizardate.getShortMonth() // => jul
```

| number | month |
| :----- | :-----|
| 01     | jan   |
| 02     | feb   |
| 03     | mar   |
| 04     | apr   |
| 05     | may   |
| 06     | jun   |
| 07     | jul   |
| 08     | aug   |
| 09     | sep   |
| 10     | oct   |
| 11     | nov   |
| 12     | dec   |

### getYear(date)

```javascript
wizardate.getYear() // => 2020
```

### getShortYear(date)

```javascript
wizardate.getShortYear('07/18/2019') // => 20
```

### getWeekdayNumber(date)

-   returns the number of the week **(1 a 7)**

```javascript
wizardate.getWeekdayNumber() // => 5
```

### getWeekday(date)

```javascript
wizardate.getWeekday() // => friday
```

| number | weekday   |
| :----- | :-------- |
| 1      | sunday    |
| 2      | monday    |
| 3      | tuesday   |
| 4      | wednesday |
| 5      | thursday  |
| 6      | friday    |
| 7      | saturday  |

### getShortWeekday(date)

```javascript
wizardate.getShortWeekday() // => fri
```

| number | weekday |
| :----- | :------ |
| 1      | sun     |
| 2      | mon     |
| 3      | tue     |
| 4      | wed     |
| 5      | thu     |
| 6      | fri     |
| 7      | sat     |

### getDate(date)

```javascript
wizardate.getDate() // => 17/07/2020
```

### getExtendedDate(date)

```javascript
wizardate.getExtendedDate() // => 17 july 2020
```

### getExtendedWeekdayDate(date)

```javascript
wizardate.getExtendedWeekdayDate() // => friday, 17 july 2020
```

### getMonthNumberYear(date)

```javascript
wizardate.getMonthNumberYear() // => 07/2020
```

### getMonthYear(date)

```javascript
wizardate.getMonthYear() // => july/2020
```

### getShortMonthYear(date)

```javascript
wizardate.getShortMonthYear() // => jul/2020
```

### getShortMonthShortYear(date)

```javascript
wizardate.getShortMonthYear() // => jul/20
```

### getHour(date)

-   return hours **(1 a 23)**

```javascript
wizardate.getHour() // => 8
```

### getExtendedHour(date)

```javascript
wizardate.getExtendedHour() // => 08 hours
```

### getMinute(date)

-   return minutes **(1 a 59)**

```javascript
wizardate.getMinute() // => 53
```

### getExtendedMinute(date)

```javascript
wizardate.getExtendedMinute() // => 53 minutes
```

### getSecond(date)

-   returns seconds **(1 a 59)**

```javascript
wizardate.getSecond() // => 32
```

### getExtendedSecond(date)

```javascript
wizardate.getExtendedSecond() // => 32 seconds
```

### getTime(date)

```javascript
wizardate.getTime() // => 08:53:32
```

### getExtendedTime(date)

```javascript
wizardate.getExtendedTime() // => 08 hours 53 minutes 32 seconds
```

### getHourMinute(date)

```javascript
wizardate.getHourMinute() // => 08:53
```

### getExtendedHourMinute(date)

```javascript
wizardate.getExtendedHourMinute() // => 08 hours 53 minutes
```

### getDateTime(date)

```javascript
wizardate.getDateTime() // => 17/06/2020 08:53:32
```

### getExtendedDateTime(date)

```javascript
wizardate.getExtendedDateTime() // => 17 july 2020 08 hours 53 minutes 32 seconds
```

### getExtendedCityDate(date)

_asynchronous function_

```javascript
await wizardate.getExtendedCityDate() // =>  Marília, 17 july 2020
```

### getExtendedRegionDate(date)

_asynchronous function_

```javascript
await wizardate.getExtendedRegionDate() // =>  São Paulo, 17 july 2020
```

### getExtendedRegionCodeDate(date)

_asynchronous function_

```javascript
await wizardate.getExtendedRegionCodeDate() // =>  SP, 17 july 2020
```

### getExtendedCountryDate(date)

_asynchronous function_

```javascript
await wizardate.getExtendedCountryDate() // =>  Brazil, 17 july 2020
```

### getExtendedCountryCodeDate(date)

_asynchronous function_

```javascript
await wizardate.getExtendedCountryCodeDate() // =>  BR, 17 july 2020
```

## Current Locale Functions

All functions bellow are _asynchronous_ and returns current locale informations.

### getCity()

_asynchronous function_

```javascript
await wizardate.getCity() // => Marília
```

### getRegion()

_asynchronous function_

```javascript
await wizardate.getRegion() // => São Paulo
```

### getRegionCode()

_asynchronous function_

```javascript
await wizardate.getRegionCode() // => SP
```

### getCountry()

_asynchronous function_

```javascript
await wizardate.getCountry() // => Brazil
```

### getCountryCode()

_asynchronous function_

```javascript
await wizardate.getCountryCode() // => BR
```

### getTimezone()

_asynchronous function_

```javascript
await wizardate.getTimezone() // => America/Sao_Paulo
```

### getZipcode()

_asynchronous function_

```javascript
await wizardate.getZipcode() // => 17350-000
```

## Format Pattern

Use patterns to create your date format

| pattern       | output      | desc                                    |
| :------------ | :---------- | :-------------------------------------- |
| 'date'        | 17/07/2020  | full date                               |
| 'time'        | 16:09:30    | full time                               |
| 'd'           | 3           | day withou zero                         |
| 'dd'          | 03          | day with zero                           |
| 'm'           | 7           | month without zero                      |
| 'mm'          | 07          | month with zero                         |
| 'mmm'         | jul         | short month                             |
| 'mmmm'        | july        | month                                   |
| 'MMM'         | Jul         | capitalize short month                  |
| 'MMMM'        | July        | capitalize month                        |
| 'yy'          | 20          | short year                              |
| 'yyyy'        | 2020        | year                                    |
| 'w'           | 6           | weekday withou zero                     |
| 'ww'          | 06          | weekday with zero                       |
| 'www'         | fri         | short weekday                           |
| 'wwww'        | friday      | weekday                                 |
| 'WWW'         | Fri         | capitalize short weekday                |
| 'WWWW'        | Friday      | capitalize weekday                      |
| 'h'           | 5           | hour without zero                       |
| 'hh'          | 05          | hour with zero                          |
| 'hhh'         | 5 hour      | hour without zero and desc              |
| 'hhhh'        | 05 hour     | hour with zero and desc                 |
| 'HHH'         | 5 Hour      | hour without zero and capitalize desc   |
| 'HHHH'        | 05 Hour     | hour with zero and capitalize desc      |
| 'i'           | 7           | minute without zero                     |
| 'ii'          | 07          | minute with zero                        |
| 'iii'         | 7 minutes   | minute without zero and desc            |
| 'iiii'        | 07 minutes  | minute with zero and desc               |
| 'III'         | 7 Minutes   | minute without zero and capitalize desc |
| 'IIII'        | 07 Minutes  | minute with zero and capitalize desc    |
| 's'           | 1           | second without zero                     |
| 'ss'          | 01          | second with zero                        |
| 'sss'         | 1 second    | second without zero and desc            |
| 'ssss'        | 01 second   | second with zero and desc               |
| 'SSS'         | 1 Second    | second without zero and capitalize desc |
| 'SSSS'        | 01 Second   | second with zero and capitalize desc    |
| 'city'        | Marília     | city                                    |
| 'region'      | Sao Paulo   | region                                  |
| 'regionCode'  | SP          | region code                             |
| 'country'     | Brazil      | country                                 |
| 'countryCode' | BR          | country code                            |

**Formats available only for pt_BR**

| pattern       | output      | desc                                    |
| :------------ | :---------- | :-------------------------------------- |
| 'wwwww'       | sexta-feira | weekday                                 |
| 'WWWWW'       | Sexta-feira | capitalize weekday                      |

### formatPattern(pattern, date)

-   {string} **pattern** - string patter
-   {string} **date** - accepts various formats _(optional)_

```javascript
const myPattern = "'MMM' 'yyyy' - My Pattern"

wizardate.formatPattern(myPattern); // => Jul 2020 - My Pattern
```

## Changelog

see the update notes at [CHANGELOG](https://github.com/victorgianvechio/wizardate/blob/master/CHANGELOG.md).

## License

MIT License

Copyright ® 2020 Victor Gianvechio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
