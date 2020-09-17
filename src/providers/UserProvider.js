//Cretaing a cotext API so that the data in this component can be accessed by other components easily .
//  We need not to decaler all in other components again //

import React, { Component , createContext } from 'react' ;
import {auth , createOrGetUserProfileDocuments } from '../firebase';

const initialUserState = {user : null , loading : false};
export const UserContext = createContext(initialUserState);

class UserProvider extends Component {
state = initialUserState ;

  async componentDidMount () {
      // This will be fired when you go from logged in to logged out state and vice cersa //
    auth.onAuthStateChanged(async (userAuth) => {
        console.log('UserProvider -> componentDidMount -> userAuth' , userAuth);
        
        if(userAuth)
        {
            const userRef = await createOrGetUserProfileDocuments(userAuth);

            console.log('userRef',userRef);

            userRef.onSnapshot(snapshot => {
               console.log('snapshot',snapshot);
               console.log('snapshot data',snapshot.data());
                this.setState({
                    user : {uid : snapshot.id , ...snapshot.data()},
                    loading : false, 
                })
            })
        }
    });
  }

    render() {
        return (
            
                <UserContext.Provider value = {this.state}>
                {this.props.children}
                </UserContext.Provider>
                
            
        );
    }
}

export default UserProvider ;
