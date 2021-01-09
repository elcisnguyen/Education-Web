**Home:** /

**Search:** /search (don't need this view)
* **Search by category:** /search/cat/:id?rate={ asc, desc }&price={ asc, desc }
* **Search by name:** /search/name/:name?rate={ asc, desc }&price={ asc, desc }

**View course detail:** /course/:id
* **Add to watch list**: POST /course/:id/watchlist
* **Buy course**: POST /course/:id/buy
* **Rate course:** POST /course/:id/rate

**Account:** /account
* **Register view:** /account/register
* **Register send data:** POST /account/register
* **Login view:** /account/login
* **Login send data:** POST /account/login
* **Show profile:** /account/profile
  * **Change profile view**: /account/profile/edit
  * **Send new profile:** POST /account/profile/edit
  * **Show watchlist:** /account/profile/watchlist
  * **Remove from watchlist:** DELETE /course/:id/watchlist
  * **Show bought courses (student) or show owned course (teacher):** /account/profile/course

**Teacher add new course view:** /course/new
* **Send new course data:** POST /course/new
* **Edit course view:** /course/:id/edit
  * **Send edited data:** POST /course/:id/edit
* **Delete course:** DELETE /course/:id











