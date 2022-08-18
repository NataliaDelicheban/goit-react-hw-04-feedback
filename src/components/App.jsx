import { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const optionsKey = ['Good', 'Neutral', 'Bad'];
 
  const addFeedback = e => {
    const name = e.target.name;

    switch (name) {
      case 'Good':
        setGood(prevState => prevState + 1);
        break;

      case 'Neutral':
        setNeutral(prevState => prevState + 1);
        break;
      
      case 'Bad':
        setBad(prevState => prevState + 1);
        break;
      
      default:
        return;
    }
  };
  
  const countTotalFeedback = () => good + neutral + bad;
  
  const countPositiveFeedbackPercentage = () => {
    const result = countTotalFeedback() && good / countTotalFeedback();
    return Math.round(result * 100);
  };
  
  const showFeedback = good > 0 || neutral > 0 || bad > 0;

    return (
      <>
      <Section title="Please leave feedback">
          <FeedbackOptions
            options={optionsKey}
            onLeaveFeedback={addFeedback} />
        </Section>
        <Section title="Statistics"> 
          {showFeedback ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()} />
          ) : (
            <Notification message="There is no feedback" />)}
      </Section>
        </>
        );
};