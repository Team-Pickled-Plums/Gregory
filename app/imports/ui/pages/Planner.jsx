import React from 'react';
import { Grid, Image, Form, Segment, Divider } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField, RadioField } from 'uniforms-semantic';
import swal from 'sweetalert';
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
  summary: String,
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
  inviteList: String, //make this into an array where you can add multiple people
  //also make this send actual emails?
  lat: { //make this optional
    type: Number,
    min: -90,
    max: 90,
  },
  lon: {
    type: Number,
    min: -180,
    max: 180,
  },

  /**
   condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
   */
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
    let month = "00";
    if (monthString.includes("Jan")) {
      month = '01';
    } else
      if (monthString.includes("Feb")) {
        month = '02';
      } else
        if (monthString.includes("Mar")) {
          month = '03';
        } else
          if (monthString.includes("Apr")) {
            month = '04';
          } else
            if (monthString.includes("May")) {
              month = '05';
            } else
              if (monthString.includes("Jun")) {
                month = '06';
              } else
                if (monthString.includes("Jul")) {
                  month = '07';
                } else
                  if (monthString.includes("Aug")) {
                    month = '08';
                  } else
                    if (monthString.includes("Sep")) {
                      month = '09';
                    } else
                      if (monthString.includes("Oct")) {
                        month = '10';
                      } else
                        if (monthString.includes("Nov")) {
                          month = '11';
                        } else
                          if (monthString.includes("Dec")) {
                            month = '12';
                          }
    return month;
  }

  /**
   //dont need this
   submit(data, formRef) {
    // const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.insert({ name, quantity, fromDate, condition, classification, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }
   */

  downloadTxtFile(data) {
    const { eventName, fromDate, toDate, summary, location, classification, priority, inviteList, lat, lon } = data;

    //display message if from date is after to
    if (fromDate > toDate) {
      console.log("from is greater than to");
      alert("Invalid date! To date cannot be before from.");
      return;
    }

    //Mon Mar 09 2020 19:29:03 GMT-1000
    //20200313T200000Z
    //20200309T231546Z
    //let arrayTStamp = new Array(40);

    /**
     * convert from date into proper format
     * @type {string}
     */
    let stringArrayFrom = Array.from(fromDate.toString());
    let fromDateString = '';
    fromDateString += this.returnStringFromArray(stringArrayFrom, 11, 14);
    fromDateString += this.extractMonth(fromDate);
    fromDateString += this.returnStringFromArray(stringArrayFrom, 8, 9);
    fromDateString += "T";
    fromDateString += this.returnStringFromArray(stringArrayFrom, 16, 17);
    fromDateString += this.returnStringFromArray(stringArrayFrom, 19, 20);
    fromDateString += this.returnStringFromArray(stringArrayFrom, 22, 23);
    fromDateString += "Z";
    console.log(fromDateString);

    /**
     * convert to date into propper format
     * @type {string}
     */
    let stringArrayTo = Array.from(toDate.toString());
    let toDateString = '';
    toDateString += this.returnStringFromArray(stringArrayTo, 11, 14);
    toDateString += this.extractMonth(toDate);
    toDateString += this.returnStringFromArray(stringArrayTo, 8, 9);
    toDateString += "T";
    toDateString += this.returnStringFromArray(stringArrayTo, 16, 17);
    toDateString += this.returnStringFromArray(stringArrayTo, 19, 20);
    toDateString += this.returnStringFromArray(stringArrayTo, 22, 23);
    toDateString += "Z";
    console.log(toDateString);

    //fromDateString += this.returnStringFromArray( stringArray,  );

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

    this.testPrint = `Event name is ${eventName}\n` +
        `fromDate: ${fromDateString}\n` +
        `toDate: ${toDateString}\n`;
    //add summary
    //add location

    this.testString = `BEGIN:VCALENDAR\n` +
        `PRODID:-//Google Inc//Google Calendar 70.9054//EN\n` +
        `VERSION:2.0\n` +
        `CALSCALE:GREGORIAN\n` +
        `METHOD:PUBLISH\n` +
        `BEGIN:VEVENT\n` +
        `CLASS:${classification}\n` +
        `PRIORITY:${priority}\n` +
        `DTSTART:${fromDateString}\n` +
        `DTEND:${toDateString}\n` +
        `DTSTAMP:20200228T080951Z\n` +
        `UID:395pif51b0q48m9l92usaagpqq@google.com\n` +
        `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=TENTATIVE;RSVP=TRU
 E;CN=${inviteList};X-NUM-GUESTS=0:mailto:${inviteList}\n` +
        `DESCRIPTION:\n` +
        `LAST-MODIFIED:20200228T080945Z\n` +
        `LOCATION:${location}\n` +
        `SEQUENCE:0\n` +
        `STATUS:CONFIRMED\n` +
        `SUMMARY:${summary}\n` +
        `TRANSP:OPAQUE\n` +
        `END:VEVENT\n` +
        `END:VCALENDAR`;
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
        <Grid verticalAlign='middle' textAlign='center' container>
          <Grid.Column width={8}>
            <h1 style={{ color: 'white' }}>Lets make an event!</h1>


            <AutoForm schema={icsSchema} onSubmit={data => this.downloadTxtFile(data)}>
              <Segment>
                <TextField name='eventName' placeholder={'Event name'} label={false}/>
                <Form.Group>
                  <SelectField name='classification'/>
                  <SelectField name='priority' label={'Priority - 0 being lowest'}/>
                </Form.Group>
                <Form.Group>
                  <NumField name={'lat'}/>
                  <NumField name={'lon'}/>
                </Form.Group>




                <Form.Group>
                  <DateField name='fromDate' label={'From'} />
                  <DateField name='toDate' label={'To'} />
                </Form.Group>
                <br/>
                <TextField name='summary' placeholder={'Event summary'} label={false}/>
                <br/>
                <TextField name='location' placeholder={'Location'} label={false}/>
                <br/>
                <TextField name='inviteList'
                           placeholder={'Emails of Recipients (currently configured for one email only)'}/>

                <SubmitField value='Submit' label='Generate .ics file'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>

          </Grid.Column>

        </Grid>
    );
  }
}

export default Planner;
