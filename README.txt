System requirements:
    MongoDB - ensure it is configured to accept: mongodb://localhost:27017/
                it will create a database named "554-final" when the application successfully connects

    
    imagemagick - install imagemagick (i.e. sudo apt update && sudo apt install imagemagick)
    
    wkhtmltopdf - install  wkhtmltopdf (i.e. sudo apt update && sudo apt install wkhtmltopdf)
            then had to run: sudo strip --remove-section=.note.ABI-tag /usr/lib/x86_64-linux-gnu/libQt5Core.so.5.12.8
            to get rid of an error saying: wkhtmltopdf: error while loading shared libraries: libQt5Core.so.5

    redis - install redis (i.e. sudo apt update && sudo apt install redis)

    npm/node (tested with node v16.14.0)

Launching the applications:
        -Have one terminal open and run: redis-server

        -Have one terminal open at <PATH_TO_PROJECT_ROOT>/redis_server
                run: npm install
                run: node ./tasks/seed.js
                run: npm start

        -Have one terminal open at <PATH_TO_PROJECT_ROOT>/client
                run: npm install
                run: npm start