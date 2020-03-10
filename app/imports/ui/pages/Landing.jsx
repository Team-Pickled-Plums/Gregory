import React from 'react';
import { Grid, Image, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import DateField from 'uniforms-semantic/DateField';


const icsSchema = new SimpleSchema({
  eventName: String,

  fromDate: {
    type: Date,
    defaultValue: new Date(),
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
class Landing extends React.Component {

  returnStringFromArray(array, startIndex, endIndex) {
    let returnString = '';
    let index = startIndex;
    for (index, index < endIndex; index++;) {
      returnString += array[startIndex].toString();
    }
    return returnString;

  }

  extractMonth(string) {

    const monthString = string.toString();
    let month = "00";
    if (monthString.includes("Jan")){
      month = '01';
    } else if (monthString.includes("Feb")){
      month = '02';
    } else if (monthString.includes("Mar")){
      month = '03';
    } else if (monthString.includes("Apr")){
      month = '04';
    } else if (monthString.includes("May")){
      month = '05';
    } else if (monthString.includes("Jun")){
      month = '06';
    } else if (monthString.includes("Jul")){
      month = '07';
    } else if (monthString.includes("Aug")){
      month = '08';
    } else if (monthString.includes("Sep")){
      month = '09';
    } else if (monthString.includes("Oct")){
      month = '10';
    } else if (monthString.includes("Nov")){
      month = '11';
    } else if (monthString.includes("Dec")){
      month = '12';
    }
    return month;
  }

  //dont need this
  submit(data, formRef) {
    // const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.insert({ name, quantity, fromDate, condition, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  downloadTxtFile(data) {
    const { eventName, fromDate } = data;
    //console.log(data);

    this.testPrint = `Event name is ${eventName}\n` +
    `fromDate: ${fromDate}`;

    let stringArray = Array.from(fromDate.toString());


    //Mon Mar 09 2020 19:29:03 GMT-1000
    //20200313T200000Z
    //let arrayTStamp = new Array(40);
    let fromDateString = 'test fromDateString';
    console.log(fromDateString);
    /**
    fromDateString += this.returnStringFromArray( stringArray, 11, 14 );
    fromDateString += this.extractMonth(fromDate);
    fromDateString += this.returnStringFromArray( stringArray, 8,9 );
    fromDateString += "T";
    fromDateString += this.returnStringFromArray( stringArray, 16,17 );
    fromDateString += this.returnStringFromArray( stringArray, 19,20  );
    fromDateString += this.returnStringFromArray( stringArray, 22,23 );
    fromDateString += "Z";
    console.log(fromDateString);
     */
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









    this.testString = 'BEGIN:VCALENDAR\n' +
        'PRODID:-//Google Inc//Google Calendar 70.9054//EN\n' +
        'VERSION:2.0\n' +
        'CALSCALE:GREGORIAN\n' +
        'METHOD:PUBLISH\n' +
        'BEGIN:VEVENT\n' +
        'DTSTART:20200313T200000Z\n' +
        'DTEND:20200313T230000Z\n' +
        'DTSTAMP:20200228T080951Z\n' +
        'UID:395pif51b0q48m9l92usaagpqq@google.com\n' +
        'DESCRIPTION:\n' +
        'LAST-MODIFIED:20200228T080945Z\n' +
        'LOCATION:Hamilton Library\n' +
        'SEQUENCE:0\n' +
        'STATUS:CONFIRMED\n' +
        'SUMMARY:Study for exam\n' +
        'TRANSP:OPAQUE\n' +
        'END:VEVENT\n' +
        'END:VCALENDAR';
    const element = document.createElement('a');
    const file = new Blob([this.testPrint], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'myFile.txt';
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
            <h1>Lets make an event!</h1>


            <AutoForm schema={icsSchema} onSubmit={data => this.downloadTxtFile(data)} >
              <Segment>
                <TextField name='eventName' placeholder={'Event name'} label={false}/>

                <DateField name='fromDate'/>

                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>


            <button onClick={data => this.downloadTxtFile(data)}>Download txt</button>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
