import { sendEmailVerification, sendPasswordResetEmail, updatePassword  } from "firebase/auth"

export const sendVerifyEmail = (user) => {
    sendEmailVerification(user).then(() => {
            console.log('Verification Email sent!')
        }).catch((e) => {
        console.log(e)
    })
}

export const updateUserPassword = (auth, password) => {
    updatePassword(auth.currentUser, password).then( () => {
        console.log('Password updated')
    }).catch( (e) => {
        console.log(e)
    })
}

export const sendUserPasswordResetEmail = (auth, email) => {
    sendPasswordResetEmail(auth, email).then( () => {
        console.log('Password reset eamil sent')
    }).catch( (e) => {
        console.log(e)
    })
}