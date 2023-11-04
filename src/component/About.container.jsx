import React from 'react';
import { connect } from 'react-redux';

import MarkdownPagePresent from './markdown/MarkdownPage';
import { MarkdownPageWrapper, mapStateToProps, mapDispatchToProps } from './markdown';

// Date Formatting
import * as d3time from 'd3-time-format';
const monthFormatter = d3time.timeFormat("%B");
const yearFormatter = d3time.timeFormat("%Y");


class AboutWrapper extends MarkdownPageWrapper {
  endMonth() {
    const latestEntry = this.props.latestEntry;
    return (latestEntry == null) ?
      "" :
      monthFormatter(latestEntry.releaseDate);
  }
  endYear() {
    const latestEntry = this.props.latestEntry;
    return (latestEntry == null) ?
      "" :
      yearFormatter(latestEntry.releaseDate);
  }
  render() {
    let content = this.props.content;
    if (null != content) {
      content = content.replace(/\{this.props.endmonth\}/, this.endMonth());
      content = content.replace(/\{this.props.endyear\}/, this.endYear());
    }
    return <MarkdownPagePresent content={content} />
  }
}

const About = connect(mapStateToProps, mapDispatchToProps)(AboutWrapper)

export default About;
