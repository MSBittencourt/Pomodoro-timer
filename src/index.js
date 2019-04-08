import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Pomodoro extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        timerStarted : false,
        timerStopped: true,
        minutes: 20,
        seconds: 0
      }
      this.increment = this.increment.bind(this); 
      this.decrement = this.decrement.bind(this);
      this.handleTimerStart = this.handleTimerStart.bind(this)
    }

    increment(){
      if(this.state.timerStopped){
      this.setState({minutes: this.state.minutes + 1})

    } else {
      document.getElementById('inc').disabled = true; 
    }

  }
    decrement(){this.setState({minutes: this.state.minutes - 1})}

    handleReset() {
      this.setState({ timerStarted: false, timerStopped: true, seconds: 0, minutes: 20 });
      clearInterval(this.timer);
    }
    handleTimerStop() {
      this.setState({ timerStarted: false, timerStopped: true });
      clearInterval(this.timer);
    }
    
    handleTimerStart(e) {
      e.preventDefault();
      if (this.state.timerStopped) {
        //start button only works if not counting down
        this.timer = setInterval(() => {
          this.setState({ timerStarted: true, timerStopped: false });
          if (this.state.timerStarted) {
            //count down when press start button
            if (this.state.seconds === 0) {
              this.setState((prevState) => ({
                minutes: prevState.minutes - 1,
                seconds: 60,
                timerStopped : false
              }));
            }
            this.setState((prevState) => ({
              seconds: prevState.seconds - 1
            }));
            //alert if timer is done
            if (this.state.minutes === 0 && this.state.seconds === 0) {
              alert('Break Time, dude!');
              this.handleReset();
            }
          }
        }, 1000);
      }
  }
  
   
    render() {
      let button;
		  if (this.state.timerStopped) {
			//switch between start and reset button
			button = (
				<button onClick={this.handleTimerStart.bind(this)}>Start</button>
			);
		  } else {
			button = (
				<button onClick={this.handleReset.bind(this)}>Reset</button>
			);
    }
      return (
        <div className = 'container'>
        <h1>Pomodoro Timer</h1>
        <div className = 'timer-container'>
        <button id='dec' onClick={this.decrement}>-</button>
        {this.state.minutes + ":" + this.state.seconds}
        <button id='inc' onClick={this.increment}>+</button>
        </div>
        <div>
						{button}					
        </div>

          
        </div>
      )
    }
  }
  
  
  
ReactDOM.render(<Pomodoro />, document.getElementById('root'));

