import React, {Component} from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export class App extends Component {
 
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  };

  addFeedback = e => {
    const name = e.currentTarget.name;
    this.setState(prevState => (
      { [name]: prevState[name] + 1, }
    ));
  };
  
  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };
  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    return Math.round(this.countTotalFeedback() && good / this.countTotalFeedback() * 100);
  };
  
  optionsKeys = Object.keys(this.state);
  render() {
    const { good, neutral, bad } = this.state;
    const showFeedback = good > 0 || neutral > 0 || bad > 0;

    return (
      <>
      <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.optionsKeys}
            onLeaveFeedback={this.addFeedback} />
        </Section>
        <Section title="Statistics"> 
          {showFeedback ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()} />) : (
            <Notification message="There is no feedback" />)}
      </Section>
        </>
        );
  }
};
