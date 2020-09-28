import React, { Component } from 'react'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {
    IconButton,
    TableCell,
    TableRow,
  } from '@material-ui/core';

class TextCell extends Component {
    constructor(props){
        super();
        this.state = {
            data:props.text,key:props.index,
            copied: false
        }
    }
    render() {
        return (
            <TableRow key={this.state.key}>
                <TableCell component="th" scope="row">
                    {this.state.data}
                    </TableCell>
                <CopyToClipboard text={this.state.data}
                onCopy={() => this.setState({copied: true})}>
                    <IconButton color="primary" component="span">
                        <FileCopyIcon/>
                    </IconButton>
                </CopyToClipboard>
            </TableRow>
        )
    }
}

export default TextCell
