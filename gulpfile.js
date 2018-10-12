const gulp = require('gulp'),
    // autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    //sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    //uncss = require('gulp-uncss'),
     smartgrid = require('smart-grid'),
     less = require('gulp-less'),
     cleancss = require('gulp-clean-css'),
     gcmq = require('gulp-group-css-media-queries');

gulp.task('grid', function () {
    smartgrid('style-source', {
        outputStyle: 'less',
        columns: 12,
        offset: '30px',
        mobileFirst: false,
        container: {
            maxWidth: '1170px',
            // maxWidth: '949px',
            fields: '30px'
        },
        breakPoints: {
            lg: {
                width: '1100px'
            },
            md: {
                width: '960px'
            },
            sm: {
                width: '767px',
                fields: '15px'
            },
            xs: {
                width: '560px'
            }
        }
    });
});

gulp.task('connect', function () {
    connect.server({
        root: '',
        livereload: true
    });
});

gulp.task('reload', function () {
    gulp.src('index.html')
        .pipe(connect.reload());
});

gulp.task('css', function () {
    return gulp.src('style-source/main.less')
        .pipe(less())
        //.pipe(sass({indentedSyntax: true}).on('error', sass.logError))
        //.pipe(uncss({
        //    html: ['index.html']
        //}))
        .pipe(gcmq())
        .pipe(cleancss({
            level: 2
        }))
        //.pipe(autoprefixer({
        //    browsers: ['last 15 versions'],
        //    cascade: false
        //}))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('style'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('style-source/*.less', ['css']);
    gulp.watch('index.html', ['reload']);
    // gulp.watch('js/!*.js', ['reload']);
    gulp.watch('img/!*.*', ['reload']);
    gulp.watch('fonts/!*.*', ['reload']);
});

gulp.task('default', ['connect', 'css', 'watch']);