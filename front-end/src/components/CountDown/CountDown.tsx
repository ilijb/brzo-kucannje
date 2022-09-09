import {useState, useEffect} from 'react';

export const Timer = () => {
    // initialize timeLeft with the seconds prop
    const [timeLeft, setTimeLeft] = useState(60);
  
    useEffect(() => {
      // exit early when we reach 0
      if (!timeLeft) return;
  
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
  
      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }, [timeLeft]);
  
    return (
      <div>
        <h1>Preostalo {timeLeft} sekundi</h1>
      </div>
    );
  };