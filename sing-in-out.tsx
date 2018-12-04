import * as React from "react";

export interface SignInOutButtonsProps {
    isSignedIn: boolean;
    whenToSignIn: () => void;
    whenToSignOut: () => void;
}

export class SignInOutButtons extends React.Component<SignInOutButtonsProps> {
    render() {
        return <div>
            {
                this.props.isSignedIn
                    ? <button onClick={() => {
                        this.props.whenToSignOut();
                    }}>Sign out</button>
                    : <button onClick={() => {
                        this.props.whenToSignIn();
                    }}>Sign in with Google</button>
            }
        </div>
    }
}