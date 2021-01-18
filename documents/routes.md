**Home:** /

**Search:** /search (don't need this view)
* **Search by category:** /search/cat/:id?page={}&sort={rate, price}
* **Search by name:** /search/name/:name?page={}&sort={rate, price}

**View course detail:** /course/single/:id
* **Add to wishlist**: POST /course/single/:id/wishlist
* **Buy course**: POST /course/single/:id/purchase
* **Rate course:** POST /course/single/:id/rate

**Account:** /account (don't need this view)
* **Register view:** /account/register
  * **Is username exist:** POST /account/check/exist/username
  * **Is email exist:** POST /account/check/exist/email
  * **Register send data:** POST /account/register
  * **Confirm register email:** /account/confirm/:username/:secret_key
* **Login view:** /account/login
  * **Is password correct:** POST /account/check/correct/password
  * **Is account verified:** POST /account/check/verify
  * **Login send data:** POST /account/login
* **Logout:** POST /account/logout 

* **Profile:** /account/profile
  * **Is the new username available:** POST /account/profile/check/available/username
  * **Is the new email available:** POST /account/profile/check/available/email
  * **Send new profile:** POST /account/profile
  * **Show wishlist:** /account/profile/wishlist?page={}
  * **Remove from wishlist:** DELETE /course/single/:id/wishlist
  * **Show bought courses (student) or show owned course (teacher):** /account/profile/course?page={}

**Teacher add new course view:** /course/new
* **Send new course data:** POST /course/new
* **Edit course view:** /course/single/:id/edit
  * **Send edited data:** POST /course/single/:id/edit
* **Delete course:** DELETE /course/single/:id

**Admin routes:** /admin
* **List of student:** /admin/student
  * **Block account**: POST /admin/student/:username/block
* **List of teachers:** /admin/teacher
  * **Block account**: POST /admin/teacher/:username/block
  * **Add new teacher view:** /admin/teacher/new
    * **Add a new teacher:** POST /admin/teacher/new
* **Block course:** POST /admin/course/:id/block
* **Category view:** /admin/cat
  * **Add a new category:** POST /admin/cat/new
  * **Edit category:** POST /admin/cat/:id
  * **Delete category:** DELETE /admin/cat/:id