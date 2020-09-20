# Mobile Demo Application

[Demo](https://anirbannath.github.io/mobile-demo/)

This application is created to demostrate a basic mobile application with basic voice navigation capibilities and theming.

The source code suggests best practices which should be followed while developing an Angular application and is mainly designed targeting mobile platforms (like Android/iOS).

It doesn't use any server-side API for fetching or saving data. It uses some static JSON files for retrieving data and uses IndexedDB for saving data.

Under the hood, this application uses NgRx for state management and webkitSpeechRecognition for voice navigation.

Some of its features may only work properly on Google Chrome (yet a few features may not work for iOS even with Google Chrome).

## Voice assistant commands

To activate voice assistant go to the settings page and activate Voice Assistant.

Here are some commands which can be used to navigate between the pages:

- Go to home
- Go to contact
- Go to client
- Take me to my homepage
- Take me to contacts page
- Take me to clients page
- Create note
- Create a note
- Discard (For going to the previous page)
- Cancel (For going to the previous page)
