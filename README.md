# Assessment

Create a simple app where users can sign up and sign in from a landing page into a simple dashboard. The landing page can be blank with only two separate links to “Sign Up” and “Sign In”. The simple dashboard can only be accessed after the user signs up or signs in.

## API

- signup [50 points] - The Sign Up page should allow users 2 options to create an account:

      - (1) Email and user defined password

      - (2) Google OAuth

      - You can use any third party tool, library, or API for this. In fact, to save time, it is highly recommended that you use a third party auth API. Create your own guest or trial accounts with third party tools. We only need a live demo app to test for 1 or 2 weeks.

- The user defined password must be entered twice and match. In addition, the password must be validated by the following conditions. - contains at least one lower case, one upper case, one digit, one special character, 8 characters.
- Send OTP code through email and only verified accounts can access to dashboard.
- Login : email or oauth
- User Profile: can update
- Reset Password: password be strong, old password, new password, re-enter
- Cookies and Logout: store cookies in browser and when logout clear the cookie. if user has cookie then redirect to the dashboard.
- Statistics: - total number of users who have signed up - total number of users with active session today. - average number of active users in last 7 days rolling.
