import React = require("react");

export interface FeedbackProps {
    userName: string;
    email: string;
    feedbackText: string;
    whenSubmitedFeedback: (feedback: {} ) => void;
}
export interface FeedbackState {
    userNameEntered: string;
    emailEntered: string;
    feedbackTextEntered: string;
}
export class Feedback extends React.Component<FeedbackProps, FeedbackState> {
    state =  {
        userNameEntered: this.props.userName,
        emailEntered: this.props.email,
        feedbackTextEntered: this.props.feedbackText
    };
    render() {
        return <div className='feed-back'>
            <input type='text' value={this.state.userNameEntered} 
                onChange={(e) => {
                this.setState({ userNameEntered: e.currentTarget.value });
            }}/>
            <input type='text' value={this.state.emailEntered} 
                onChange={(e) => {
                this.setState({ emailEntered: e.currentTarget.value });
            }}/>
            <textarea value={this.state.feedbackTextEntered} 
                onChange={(e) => {
                this.setState({ feedbackTextEntered: e.currentTarget.value });
            }}>Your comment</textarea>
            <button onClick={() => {
                const feedback = {
                    userName: this.state.userNameEntered,
                    email: this.state.emailEntered,
                    feedBackText: this.state.feedbackTextEntered,
                }
                this.props.whenSubmitedFeedback(feedback);
            }}>Send feedback</button>
        </div>;
    }
}
