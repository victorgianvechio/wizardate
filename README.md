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
    -   [registry(funcName, func)](#registryfuncNamefunc)
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
    -   [getExtendedShortRegionDate(date)](#getextendedshortregiondatedate)
    -   [getExtendedCountryDate(date)](#getextendedcountrydatedate)
    -   [getExtendedShortCountryDate(date)](#getextendedshortcountrydatedate)
-   [Current Locale Functions](#current-locale-functions)
    -   [getCity()](#getcity)
    -   [getRegion()](#getregion)
    -   [getShortRegion()](#getshortregion)
    -   [getCountry()](#getcountry)
    -   [getShortCountry()](#getshortcountry)
    -   [getTimezone()](#gettimezone)
    -   [getZipcode()](#getzipcode)
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
  return date.formatPattern("'countryCode', 'date'");
});

console.log(wizardateEN.funcs.countryCodeAndDate()); // => BR, 2020-07-17

```

## Date Functions

All functions below receive an **optional** date as a parameter. If no date is passed the function uses the **current** date.

-   {string} **date** - accepts various formats _(optional)_

**e.g.**:

```javascript
date.getDateTime('2012-01-26T13:51:50.417-07:00') // => 26/01/2012 18:51:50

date.getTime('05/07/2019 08:54:32') // => 08:54:32

date.getDate('October 15, 1996 05: 35: 32') // => 15/10/1996

date.getExtendedWeekdayDate('2017-09-08T15:25:53Z') // => monday, 08 september 2017

date.getMonthNumber('05 October 2011 14:48 UTC') // => 10

date.getDateTime('07/24/2015') // => 24/07/2018 00:00:00

date.getWeekday('05 October 2011 14:48 UTC') // => friday

date.getExtendedTime('Wed Oct 05 2011 16:48:00 GMT+0200 (CEST)' // => 11 hours 48 minutes 00 seconds

date.getShortMonthYear('2011-10-05T14:48:00.000Z') // => out/2011

date.getDay('24HJERH87LK4') // => Invalid Date
```

If the date passed is invalid the functions will return **'Invalid Date'**.

### getDay(date)

-   returns day **(1 ~ 31)**

```javascript
let val = date.getDay() // => 17
```

### getMonthNumber(date)

-   returns month number **(1 ~ 12)**

```javascript
let val = date.getMonthNumber() // => 7
```

### getMonth(date)

```javascript
let val = date.getMonth() // => july
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
let val = date.getShortMonth() // => jul
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
let val = date.getYear() // => 2020
```

### getShortYear(date)

```javascript
let val = date.getShortYear('07/18/2019') // => 20
```

### getWeekdayNumber(date)

-   returns the number of the week **(1 a 7)**

```javascript
let val = date.getWeekdayNumber() // => 5
```

### getWeekday(date)

```javascript
let val = date.getWeekday() // => friday
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
let val = date.getShortWeekday() // => fri
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
let val = date.getDate() // => 17/07/2020
```

### getExtendedDate(date)

```javascript
let val = date.getExtendedDate() // => 17 july 2020
```

### getExtendedWeekdayDate(date)

```javascript
let val = date.getExtendedWeekdayDate() // => friday, 17 july 2020
```

### getMonthNumberYear(date)

```javascript
let val = date.getMonthNumberYear() // => 07/2020
```

### getMonthYear(date)

```javascript
let val = date.getMonthYear() // => july/2020
```

### getShortMonthYear(date)

```javascript
let val = date.getShortMonthYear() // => jul/2020
```

### getShortMonthShortYear(date)

```javascript
let val = date.getShortMonthYear() // => jul/20
```

### getHour(date)

-   return hours **(1 a 23)**

```javascript
let val = date.getHour() // => 8
```

### getExtendedHour(date)

```javascript
let val = date.getExtendedHour() // => 08 hours
```

### getMinute(date)

-   return minutes **(1 a 59)**

```javascript
let val = date.getMinute() // => 53
```

### getExtendedMinute(date)

```javascript
let val = date.getExtendedMinute() // => 53 minutes
```

### getSecond(date)

-   returns seconds **(1 a 59)**

```javascript
let val = date.getSecond() // => 32
```

### getExtendedSecond(date)

```javascript
let val = date.getExtendedSecond() // => 32 seconds
```

### getTime(date)

```javascript
let val = date.getTime() // => 08:53:32
```

### getExtendedTime(date)

```javascript
let val = date.getExtendedTime() // => 08 hours 53 minutes 32 seconds
```

### getHourMinute(date)

```javascript
let val = date.getHourMinute() // => 08:53
```

### getExtendedHourMinute(date)

```javascript
let val = date.getExtendedHourMinute() // => 08 hours 53 minutes
```

### getDateTime(date)

```javascript
let val = date.getDateTime() // => 17/06/2020 08:53:32
```

### getExtendedDateTime(date)

```javascript
let val = date.getExtendedDateTime() // => 17 july 2020 08 hours 53 minutes 32 seconds
```

### getExtendedCityDate(date)

_asynchronous function_

```javascript
let val = await date.getExtendedCityDate() // =>  Marília, 17 july 2020
```

### getExtendedRegionDate(date)

_asynchronous function_

```javascript
let val = await date.getExtendedRegionDate() // =>  São Paulo, 17 july 2020
```

### getExtendedRegionCodeDate(date)

_asynchronous function_

```javascript
let val = await date.getExtendedRegionCodeDate() // =>  SP, 17 july 2020
```

### getExtendedCountryDate(date)

_asynchronous function_

```javascript
let val = await date.getExtendedCountryDate() // =>  Brazil, 17 july 2020
```

### getExtendedCountryCodeDate(date)

_asynchronous function_

```javascript
let val = await date.getExtendedCountryCodeDate() // =>  BR, 17 july 2020
```

## Current Locale Functions

All functions bellow are _asynchronous_ and returns current locale informations.

### getCity()

_asynchronous function_

```javascript
let val = await date.getCity() // => Marília
```

### getRegion()

_asynchronous function_

```javascript
let val = await date.getRegion() // => São Paulo
```

### getRegionCode()

_asynchronous function_

```javascript
let val = await date.getRegionCode() // => SP
```

### getCountry()

_asynchronous function_

```javascript
let val = await date.getCountry() // => Brazil
```

### getCountryCode()

_asynchronous function_

```javascript
let val = await date.getCountryCode() // => BR
```

### getTimezone()

_asynchronous function_

```javascript
let val = await date.getTimezone() // => America/Sao_Paulo
```

### getZipcode()

_asynchronous function_

```javascript
let val = await date.getZipcode() // => 17350-000
```

## Format Pattern

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
