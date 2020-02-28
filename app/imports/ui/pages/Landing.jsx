import React from 'react';
import { Grid, Image } from 'semantic-ui-react';



/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  downloadTxtFile = () => {
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
  }

  constructor(props) {
    super(props);



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
            <button onClick={this.downloadTxtFile}>Download txt</button>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
