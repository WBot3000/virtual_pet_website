System requirements:
    MongoDB - ensure it is configured to accept: mongodb://localhost:27017/
                it will create a database named "554-final" when the application successfully connects

    
    imagemagick - install imagemagick (i.e. sudo apt update && sudo apt install imagemagick)
    
    wkhtmltopdf - install  wkhtmltopdf (i.e. sudo apt update && sudo apt install wkhtmltopdf)
            then had to run: sudo strip --remove-section=.note.ABI-tag /usr/lib/x86_64-linux-gnu/libQt5Core.so.5.12.8
            to get rid of an error saying: wkhtmltopdf: error while loading shared libraries: libQt5Core.so.5

    redis - install redis (i.e. sudo apt update && sudo apt install redis)