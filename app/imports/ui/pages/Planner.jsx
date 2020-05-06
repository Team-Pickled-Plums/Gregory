import React from 'react';
import { Grid, Form, Segment, Divider, Header } from 'semantic-ui-react';
import {
  AutoForm,
  BoolField,
  ErrorsField,
  NumField,
  SelectField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import DateField from 'uniforms-semantic/DateField';

const icsSchema = new SimpleSchema({
  eventName: String,

  fromDate: {
    type: Date,
    defaultValue: new Date(),
  },
  toDate: {
    type: Date,
    defaultValue: new Date(),
  },
  summary: {
    type: String,
    optional: true,
  },
  resource: {
    type: String,
    optional: true,
  },
  location: String,
  classification: {
    type: String,
    defaultValue: 'PUBLIC',
    allowedValues: ['PUBLIC', 'PRIVATE', 'CONFIDENTIAL'],
  },
  priority: {
    type: Number,
    defaultValue: 0,
    allowedValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  inviteList: {
    type: String,
    optional: true,
  },
  lat: {
    type: Number,
    min: -90,
    max: 90,
    optional: true,
  },
  lon: {
    type: Number,
    min: -180,
    max: 180,
    optional: true,
  },
  seeMoreOptions: {
    type: Boolean,
    optional: true,
  },
  isRecurring: {
    type: Boolean,
    defaultValue: false,
  },
  frequency: {
    type: String,
    allowedValues: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'],
    optional: true,
  },
  interval: {
    type: SimpleSchema.Integer,
    min: 1,
    optional: true,
  },
  count: {
    type: SimpleSchema.Integer,
    min: 1,
    optional: true,
  },
  tzid: {
    type: String,
    defaultValue: 'Pacific/Honolulu',
    allowedValues: ['Pacific/Honolulu', 'America/Los_Angeles', 'Canada/Pacific', 'Asia/Tokyo'],
  },
  sen: {
    type: String,
  },
});

/** A simple static component to render some text for the landing page. */
class Planner extends React.Component {
  returnStringFromArray(array, startIndex, endIndex) {
    let returnString = '';
    let index = startIndex;
    const finIndex = endIndex;
    while (index <= finIndex) {
      returnString += array[index];
      index++;
    }
    return returnString;
  }

  extractMonth(string) {
    const monthString = string.toString();
    let month = '00';
    if (monthString.includes('Jan')) {
      month = '01';
    } else if (monthString.includes('Feb')) {
      month = '02';
    } else if (monthString.includes('Mar')) {
      month = '03';
    } else if (monthString.includes('Apr')) {
      month = '04';
    } else if (monthString.includes('May')) {
      month = '05';
    } else if (monthString.includes('Jun')) {
      month = '06';
    } else if (monthString.includes('Jul')) {
      month = '07';
    } else if (monthString.includes('Aug')) {
      month = '08';
    } else if (monthString.includes('Sep')) {
      month = '09';
    } else if (monthString.includes('Oct')) {
      month = '10';
    } else if (monthString.includes('Nov')) {
      month = '11';
    } else if (monthString.includes('Dec')) {
      month = '12';
    }
    return month;
  }

  // return a date with hours added; hours may be a negative number
  // used to help convert UTC Date objects to local dates
  addHoursToDate(date, hours) {
    // convert hours to milliseconds to add to Date object
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
  }

  // get the local timezone offset as a string, to add to a ISO 8601 formatted date string
  // may not work with timezones that are a fraction of an hour (e.g. +03:30, -01:30, etc)
  getLocalTimezoneOffset() {
    const cTime = new Date();
    // since getTimezoneOffset() returns minutes, multiply by 60 to get hours
    // multiply by -1 to get correct sign
    const timezoneOffset = (cTime.getTimezoneOffset() / 60) * -1;
    let timezoneOffsetString = '';
    // only need to append '+' for positive offsets
    if (timezoneOffset > 0) {
      timezoneOffsetString += '+';
    }
    timezoneOffsetString += timezoneOffset.toString();
    console.log(`timezoneOffsetString:${timezoneOffsetString}`);
    return timezoneOffsetString;
  }

  /**
   * @param string. Takes in the invite list. puts it into array
   * @returns {[]} The array list
   */
  inviteListFunc(string) {
    const inviteArray = [];
    let tempString = '';
    let inviteArrayCounter = 0;
    let i = 0;
    const strLen = string.length;
    for (i; i <= strLen; i++) {
      if (string[i] === ',') {
        inviteArray[inviteArrayCounter] = tempString;
        inviteArrayCounter++;
        tempString = '';
      } else if (string[i] === ' ') {
        // do nothing. this skips the spaces.
      } else if (i === strLen) {
        inviteArray[inviteArrayCounter] = tempString;
        inviteArrayCounter++;
      } else {
        tempString += string[i];
      }
    }

    return inviteArray;
  }

  inviteListStringBuilder(array) {
    let i = 0;
    let fullString = '';
    let baseString = '';
    for (i; i < array.length; i++) {
      baseString = `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=TENTATIVE;RSVP=TRU
 E;CN=${array[i]};X-NUM-GUESTS=0:mailto:${array[i]}\n`; // remember to add a plus at the end
      fullString += baseString;
      console.log(array[i]);
    }

    return fullString;
  }

  downloadTxtFile(data) {
    const {
      eventName,
      fromDate,
      toDate,
      summary,
      resource,
      location,
      classification,
      priority,
      inviteList,
      lat,
      lon,
      isRecurring,
      frequency,
      interval,
      count,
      tzid,
      sen,
    } = data;

    // display message if from date is after to
    if (fromDate > toDate) {
      console.log('from is greater than to');
      alert('Invalid date! To date cannot be before from.');
      return;
    }

    // Mon Mar 09 2020 19:29:03 GMT-1000
    // 20200313T200000Z
    // 20200309T231546Z
    // let arrayTStamp = new Array(40);
    // Date.prototype.getTimezoneOffset() method returns the time zone difference,
    // in minutes, from current locale (host system settings) to UTC
    // divide by 60 to get hours
    const localFromDate = this.addHoursToDate(
      fromDate,
      fromDate.getTimezoneOffset() / 60,
    );
    console.log(this.inviteListFunc(inviteList));

    /**
     * convert from date into proper format
     * @type {string}
     */
    const stringArrayFrom = Array.from(localFromDate.toString());
    let fromDateString = '';
    fromDateString += this.returnStringFromArray(stringArrayFrom, 11, 14);
    fromDateString += this.extractMonth(localFromDate);
    fromDateString += this.returnStringFromArray(stringArrayFrom, 8, 9);
    fromDateString += 'T';
    fromDateString += this.returnStringFromArray(stringArrayFrom, 16, 17);
    fromDateString += this.returnStringFromArray(stringArrayFrom, 19, 20);
    fromDateString += this.returnStringFromArray(stringArrayFrom, 22, 23);
    console.log(fromDateString);

    const localToDate = this.addHoursToDate(
      toDate,
      toDate.getTimezoneOffset() / 60,
    );
    console.log(`this is the classification: ${classification}

    `);

    /**
     * convert to date into proper format
     * @type {string}
     */
    const stringArrayTo = Array.from(localToDate.toString());
    let toDateString = '';
    toDateString += this.returnStringFromArray(stringArrayTo, 11, 14);
    toDateString += this.extractMonth(localToDate);
    toDateString += this.returnStringFromArray(stringArrayTo, 8, 9);
    toDateString += 'T';
    toDateString += this.returnStringFromArray(stringArrayTo, 16, 17);
    toDateString += this.returnStringFromArray(stringArrayTo, 19, 20);
    toDateString += this.returnStringFromArray(stringArrayTo, 22, 23);
    console.log(toDateString);

    // fromDateString += this.returnStringFromArray( stringArray,  );

    /**
     * 0: "M"
     1: "o"
     2: "n"
     3: " "
     4: "M"
     5: "a"
     6: "r"
     7: " "
     8: "0"
     9: "9"
     10: " "
     11: "2"
     12: "0"
     13: "2"
     14: "0"
     15: " "
     16: "2"
     17: "1"
     18: ":"
     19: "0"
     20: "9"
     21: ":"
     22: "1"
     23: "4"
     24: " "
     25: "G"
     26: "M"
     27: "T"
     28: "-"
     29: "1"
     30: "0"
     31: "0"
     32: "0"
     33: " "
     34: "("
     35: "H"
     36: "a"
     37: "w"
     38: "a"
     39: "i"
     40: "i"
     41: "-"
     42: "A"
     43: "l"
     44: "e"
     45: "u"
     46: "t"
     47: "i"
     48: "a"
     49: "n"
     50: " "
     51: "S"
     52: "t"
     53: "a"
     54: "n"
     55: "d"
     56: "a"
     57: "r"
     58: "d"
     59: " "
     60: "T"
     61: "i"
     62: "m"
     63: "e"
     64: ")"
     * @type {string}
     */

    this.testPrint =
      `Event name is ${eventName}\n` +
      `fromDate: ${fromDateString}\n` +
      `toDate: ${toDateString}\n`;
    // add summary
    // add location

    //check if lat and lon are set before building string for GEO property
    let geoString = '';
    if (lat!=undefined && lon!=undefined) {
      geoString+=`GEO:${lat};${lon}\n`;
    }

    //set RRULE property for recurring events if fields are filled out properly
    let intervalString = '';
    if (isRecurring == true && (frequency != undefined && interval != undefined && count != undefined)) {
      intervalString += `RRULE:FREQ=${frequency};INTERVAL=${interval};COUNT=${count}\n`;
      // console.log(intervalString);
    } else if(isRecurring != true){
      alert('Invalid recurring event! Please make sure Frequency, Interval and Occurrences are properly set.');
      return;
    }

    this.testString =
      `${'BEGIN:VCALENDAR\n' +
      'VERSION:2.0\n' +
      'PRODID:-//Google Inc//Google Calendar 70.9054//EN\n' +
      'CALSCALE:GREGORIAN\n' +
      'METHOD:PUBLISH\n' +
      'BEGIN:VEVENT\n' +
      `CLASS:${classification}\n` +
      `PRIORITY:${priority}\n` +
      `DTSTART;TZID=${tzid}:${fromDateString}\n` +
      intervalString +
      `DTEND;TZID=${tzid}:${toDateString}\n` +
      'DTSTAMP:20200228T080951Z\n' +
      'UID:395pif51b0q48m9l92usaagpqq@google.com\n'}${
      this.inviteListStringBuilder(this.inviteListFunc(inviteList))
      }DESCRIPTION:\n` +
      'LAST-MODIFIED:20200228T080945Z\n' +
      `ORGANIZER:mailto:${sen}\n` +
      `LOCATION:${location}\n` +
        geoString +
      'SEQUENCE:0\n' +
      'STATUS:CONFIRMED\n' +
      `SUMMARY:${summary}\n` +
      `RESOURCES:${resource}\n` +
      'TRANSP:OPAQUE\n' +
      'END:VEVENT\n' +
      'END:VCALENDAR';
    const element = document.createElement('a');
    const file = new Blob([this.testString], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'myFile.ics';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  constructor(props) {
    super(props);
    // string startDate = "";
  }

  render() {
    return (
      <Grid verticalAlign="middle" textAlign="center" container>
        <Grid.Column width={11}>
          <h1 style={{ color: 'white' }}>Let&apos;s make an event!</h1>

          <AutoForm
            schema={icsSchema}
            onSubmit={data => this.downloadTxtFile(data)}
          >
            <Segment>
              <TextField
                name="eventName"
                placeholder={'Event name'}
                label={false}
              />
              <br />
              <TextField
                  name="sen"
                  placeholder={'Sender email'}
                  label={false}
              />
              <br />

              <Form.Group widths="equal">
                <DateField name="fromDate" label={'From'} />
                <DateField name="toDate" label={'To'} />
              </Form.Group>
              <br />
              <TextField
                name="summary"
                placeholder={'Event summary'}
                label={false}
              />
              <br />
              <TextField
                name="resource"
                placeholder={'Resources'}
                label={false}
              />
              <br />
              <TextField
                name="location"
                placeholder={'Location'}
                label={false}
              />
              <br />
              <TextField
                name="inviteList"
                placeholder={'Emails of Recipients (separate by commas)'}
              />
              <br/>
              <SelectField name="tzid" label={'Time Zone'} />
              <br />
              <br />
              <br />
              <Header as="h3">MORE OPTIONS</Header>

              <Divider />
              <Form.Group widths="equal">
                <SelectField name="classification" />
                <SelectField
                  name="priority"
                  label={'Priority - 0 being lowest'}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <NumField name={'lat'} label={'Latitude'} />
                <NumField name={'lon'} label={'Longitude'} />
              </Form.Group>
              <Form.Group widths="equal">
                <BoolField appearance="checkbox" name="isRecurring" labelBefore="recurring" />
              </Form.Group>
              <Form.Group widths="equal">
                <SelectField name="frequency" />
                <NumField name={'interval'} label={'Interval'} />
                <NumField name={'count'} label={'Occurences'} />
              </Form.Group>

              <SubmitField value="Submit" label="Generate .ics file" />
              <ErrorsField />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Planner;
