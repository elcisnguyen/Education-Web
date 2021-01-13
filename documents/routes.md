**Home:** /

**Search:** /search (don't need this view)
* **Search by category:** /search/cat/:id?page={}&rate={asc, desc}&price={asc, desc}
* **Search by search bar:** /search/name?name={}
  * **Search by name:** /search/name/:name?page={}&rate={asc, desc}&price={asc, desc}

**View course detail:** /course/single/:id
* **Add to watch list**: POST /course/single/:id/watchlist
* **Buy course**: POST /course/single/:id/buy
* **Rate course:** POST /course/single/:id/rate

**Account:** /account (don't need this view)
* **Register view:** /account/register
* **Register send data:** POST /account/register
* **Login view:** /account/login
* **Login send data:** POST /account/login
* **Show profile:** /account/profile
  * **Change profile view**: /account/profile/edit
  * **Send new profile:** POST /account/profile/edit
  * **Show watchlist:** /account/profile/watchlist
  * **Remove from watchlist:** DELETE /course/single/:id/watchlist
  * **Show bought courses (student) or show owned course (teacher):** /account/profile/course

**Teacher add new course view:** /course/new
* **Send new course data:** POST /course/new
* **Edit course view:** /course/single/:id/edit
  * **Send edited data:** POST /course/single/:id/edit
* **Delete course:** DELETE /course/single/:id











