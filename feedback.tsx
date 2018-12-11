import React = require("react");

export interface FeedBackProps {
    userName: string;
    email: string;
    feedBackText: string;
    whenSubmitedFeedBack: (feedback: {} ) => void;
}
export interface FeedBackState {
    userNameEntered: string;
    emailEntered: string;
    feedBackTextEntered: string;
}
export class FeedBack extends React.Component<FeedBackProps, FeedBackState> {
    state =  {
        userNameEntered: this.props.userName,
        emailEntered: this.props.email,
        feedBackTextEntered: this.props.feedBackText
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
            <textarea value={this.state.feedBackTextEntered} 
                onChange={(e) => {
                this.setState({ feedBackTextEntered: e.currentTarget.value });
            }}>Your comment</textarea>
            <button onClick={() => {
                const feedback = {
                    userName: this.state.userNameEntered,
                    email: this.state.emailEntered,
                    feedBackText: this.state.feedBackTextEntered,
                }
                this.props.whenSubmitedFeedBack(feedback);
            }}>Send feedback</button>
        </div>;
    }
}
