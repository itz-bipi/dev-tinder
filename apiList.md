#DEVTINDER API lists

##authRouter
-POST /signup
-POST /login
-POST /logout

##profileRouter
-GET /profile/view
-PATCH /profile/password
-PATCH /profile/update

##requestRouter
-POST /requests/send/intrested/:userId
-POST /requests/send/ignored/:userId
-POST /requests/review/accepted/:reqId
-POST /requests/review/rejected/:reqId

##userRouter
-GET /user/feed
-GET /user/requests
-GET /user/connections