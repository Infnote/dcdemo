import React, { Component } from 'react'
import { Grid, Typography, withStyles, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import ImgRender from './ImgRender'

const styles = theme => ({
    content: {
        width: 0,
        flex: '1 1 auto',
        height: '100%',
        wordBreak: 'break-word',
        padding: theme.spacing.unit * 2,
        overflow: 'scroll',
    },
    value: {
        fontFamily: 'Roboto Mono',
    },
    space: {
        height: theme.spacing.unit * 3,
    },
})

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

class DCContent extends Component {
    render() {
        const { block, classes } = this.props
        if (!block) {
            return <Grid item></Grid>
        }
        
        var payload = ''
        try {
            payload = JSON.parse(b64DecodeUnicode(block.payload))
        } catch (e) {
            return <Grid item></Grid>
        }

        

        if (!payload.title || !payload.content || !payload.date) {
            return <Grid item></Grid>
        }
        
        return (
            <Grid item className={classes.content}>
                <Typography variant="title">{payload.title}</Typography>
                <Typography variant="subheading">{payload.date}</Typography>
                <Divider />
                <Markdown source={payload.content} renderers={{image: ImgRender}}/>
            </Grid>
        )
    }
}

DCContent.propTypes = {
    block: PropTypes.object
}

export default withStyles(styles)(DCContent)
