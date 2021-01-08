**Home:** /

**Search:** /search (don't need this view)

* **Search by category:** /search/cat?id=​{ id }​&rate=​{ asc, desc }​&price={ asc, desc }
* **Search by name:** /search/name?name={ name }&rate={ asc, desc }&price={ asc, desc }

**View course detail:** /course?id={ id }

* **Add/remove from watch list**: POST /course?id={ id }/watchlist
* **Buy course**: POST /course?id={ id }/buy
* **Rate course view:** /course?id={ id }/rate
  * **Send rate:** POST /course?id={ id }/rate

**Register view:** /register

* **Register send data:** POST /register

**Login view:** /login

* **Login send data:** POST /login

**Show profile:** /profile

* **Change profile view**: /profile/edit
  * **Send new profile:** POST /profile/edit
* **Show watchlist:** /profile/watchlist
  * (Duplicate) **Remove from watchlist:** POST /course?id={ id }/watchlist
* **Show bought courses (student) or show owned course (teacher):** /profile/course

**Teacher add new course view:** /course/new

* **Send new course data:** POST /course/new

* **Edit course view:** /course?id={ id }/edit
  * **Send edited data:** POST /course?id={ id }/edit
* **Delete course:** /course?id={ id }/delete











