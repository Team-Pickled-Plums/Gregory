import React from 'react';
import { Grid, Image, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';


const icsSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
});


/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  submit(data, formRef) {
    // const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.insert({ name, quantity, condition, owner },
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
    const { name, quantity, condition } = data;
    console.log(data);

    /**

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
    const file = new Blob([this.testString], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'myFile.ics';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
     */
  }

  constructor(props) {
    super(props);
    // string startDate = "";

  }

  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Image size='small' circular src="/images/meteor-logo.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>Welcome to this template</h1>
            <p>Now get to work and modify this app!</p>

            <AutoForm schema={icsSchema} onSubmit={data => this.downloadTxtFile(data)} >
              <Segment>
                <TextField name='name'/>
                <NumField name='quantity' decimal={false}/>
                <SelectField name='condition'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>


            <button onClick={this.downloadTxtFile}>Download txt</button>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
