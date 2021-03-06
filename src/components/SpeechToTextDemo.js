import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {
  Paper,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText, IconButton
} from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import SpeechToText from 'speech-to-text';

import supportedLanguages from './supportedLanguages.js';
import { Card, Container } from 'shards-react';
import TextCell from './RowComponent.js';
import CopyToClipboard from 'react-copy-to-clipboard';

const styles = theme => ({
  root: {
    paddingTop: 65,
    paddingLeft: 11,
    paddingRight: 11
  },
  flex: {
    flex: 1
  },
  grow: {
    flexGrow: 1
  },
  paper: theme.mixins.gutters({
    paddingTop: 22,
    paddingBottom: 22
  })
});

class SpeechToTextDemo extends Component {
  state = {
    error: '',
    interimText: '',
    finalisedText: [],
    listening: false,
    language: 'hi-IN'
  };

  onAnythingSaid = text => {
    this.setState({ interimText: text });
  };

  onEndEvent = () => {
    if (!isWidthUp('sm', this.props.width)) {
      this.setState({ listening: false });
    } else if (this.state.listening) {
      this.startListening();
    }
  };

  onFinalised = text => {
    this.setState({
      finalisedText: [text, ...this.state.finalisedText],
      interimText: ''
    });
  };

  startListening = () => {
    try {
      this.listener = new SpeechToText(
        this.onFinalised,
        this.onEndEvent,
        this.onAnythingSaid,
        this.state.language
      );
      this.listener.startListening();
      this.setState({ listening: true });
    } catch (err) {
      console.log('yoyoy');
      console.log(err);
    }
  };

  stopListening = () => {
    this.listener.stopListening();
    this.setState({ listening: false });
  };

  render() {
    const {
      error,
      interimText,
      finalisedText,
      listening,
      language
    } = this.state;
    const { classes } = this.props;
    let content;
    if (error) {
      content = (
        <Card className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {error}
          </Typography>
        </Card>
      );
    } else {
      let buttonForListening;

      if (listening) {
        buttonForListening = (
          <Button color="primary" onClick={() => this.stopListening()}>
            Stop Listening
          </Button>
        );
      } else {
        buttonForListening = (
          <Button
            color="primary"
            onClick={() => this.startListening()}
            variant="contained"
          >
            Start Listening
          </Button>
        );
      }
      content = (
        <Grid container spacing={8}>
          <Grid item xs={12} md={7}>
            <Card className={this.props.classes.paper}>
              <Grid container spacing={8}>
                <Grid item xs={12} lg={6}>
                  <Typography variant="overline" gutterBottom>
                    Status: {listening ? 'listening...' : 'finished listening'}
                  </Typography>
                  {buttonForListening}
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={language}
                      onChange={evt =>
                        this.setState({ language: evt.target.value })
                      }
                      disabled={listening}
                    >
                      {supportedLanguages.map(language => (
                        <MenuItem key={language[1]} value={language[1]}>
                          {language[0]}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      What language are you going to speak in?
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card className={this.props.classes.paper}>
              <Typography variant="overline" gutterBottom>
                Current utterances
              </Typography>
              <Typography variant="body1" gutterBottom>
                {interimText}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className="text-center" variant="overline" gutterBottom>Finalised Text</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {finalisedText.map((str, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {str}
                            </TableCell>
                        <CopyToClipboard text={str}>
                            <IconButton color="primary" component="span">
                                <FileCopyIcon/>
                            </IconButton>
                        </CopyToClipboard>
                    </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>
      );
    }

    return (
      <Container fluid>
        {content}
      </Container>
    );
  }
}

export default withWidth()(withStyles(styles)(SpeechToTextDemo));
