import React from 'react'
import authService from '../../services/auth.service';

const home = () => {

    const currentUser = authService.getCurrentUser();
  return (
    <div>
        { currentUser ? ("Welcome " + currentUser.full_name) : "You are not logged in"}
        <div>
            { currentUser.access_token}
        </div>
    </div>
  )
}

export default home