![MIT License](https://img.shields.io/github/license/mashape/apistatus.svg)
[![Build Status](https://travis-ci.org/andela-jngatia/Picture-This.svg?branch=develop)](https://travis-ci.org/andela-jngatia/Picture-This)
[![Coverage Status](https://coveralls.io/repos/github/andela-jngatia/Picture-This/badge.svg?branch=develop)](https://coveralls.io/github/andela-jngatia/Picture-This?branch=develop)
[![Code Health](https://landscape.io/github/andela-jngatia/Picture-This/develop/landscape.svg?style=flat)](https://landscape.io/github/andela-jngatia/Picture-This/develop)

# Picture-This
Django powered photo editing application.Work those filters!!!

### Features
- Sign in using Facebook or Twitter.
- Upload images and view the images as well as the images' details.
- Apply filters to images and save filtered images.
- Categorize your images into folders.
- Share your images on Facebook.

### Development
##### Back-End Development
- Language: Python
- Framework: Django, Django Rest Framework
- Database: PostgreSQL
- Social Authentication: Python Social Auth
- Image Edition: Pillow
- Testing: Django-nose

##### API Documentation
The API has been documented using DRF Docs and can be accessed [here](https://picture-this2.herokuapp.com/docs/)

##### Front-End Development
- Frontend Framework: React, Flux
- CSS Styling: Materialize CSS
- Frontend Dependencies Manage: Bower
- Asynchronous Server calls: Superagent

### Running the App
##### On the Web
The app can be accessed [here](https://picture-this2.herokuapp.com/)

##### On your local machine
1. Simply clone the repo by running git clone
      `https://github.com/andela-jngatia/Picture-This.git`.
2. Install backend dependencies as per the requirements.txt file within your virtual environment.
      `pip install -r requirements.txt`.
3. Install frontend dependencies as described in the package.json file.
      `npm install`.
4. Create a `.env.yml` file to hold your secret keys.(sample below)
4. Initialize the database skeleton by running `python manage.py makemigrations` and `python manage.py migrate`.
5. Run `python manage.py collectstatic` to copy all static files onto the staticfiles directory.
6. Run `python manage.py runserver` and open [http://localhost:8000/home/]() on your browser.

###### Sample .env.yml
```
SECRET_KEY:
  {my secret key}
```

### Running Tests
Run  `python manage.py test` to run the test and check on coverage.
