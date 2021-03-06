const gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    //sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    //uncss = require('gulp-uncss'),
    smartgrid = require('smart-grid'),
    less = require('gulp-less'),
    cleancss = require('gulp-clean-css'),
    sourceMaps = require('gulp-sourcemaps'),
    gcmq = require('gulp-group-css-media-queries');
    // rsync = require('gulp-rsync');

/*gulp.task('deploy', function () {
    return gulp.src('build/!**')
        .pipe(rsync({
            root: 'build/',
            hostname: 'cyprus.kl.com.ua',
            destination: '/cyprus.kl.com.ua',
            username: "vladimir0x29a"
        }));
});*/

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
                width: '1100px',
                offset: '15px'
            },
            md: {
                width: '960px',
                offset: '30px'
            },
            sm: {
                width: '767px',
                fields: '15px'
                // offset: '15px'
            },
            xs: {
                width: '560px'
            }
        }
    });
});

gulp.task('connect', function () {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('reload', function () {
    gulp.src('build/index.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('scripts-source/script.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // .pipe(uglify())
        .pipe(gulp.dest('build/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    return gulp.src('style-source/main.less')
        // .pipe(sourceMaps.init())
        .pipe(less())
        //.pipe(sass({indentedSyntax: true}).on('error', sass.logError))
        //.pipe(uncss({
        //    html: ['index.html']
        //}))
        .pipe(gcmq())
        .pipe(cleancss({
            level: 2
        }))
        .pipe(autoprefixer({
           browsers: ['last 15 versions'],
           cascade: false
        }))
        // .pipe(sourceMaps.write())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('style-source/*.less', ['css']);
    gulp.watch('build/index.html', ['reload']);
    gulp.watch('scripts-source/*.js', ['js']);
    gulp.watch('build/img/*.*', ['reload']);
    gulp.watch('build/fonts/*.*', ['reload']);
});

gulp.task('default', ['connect', 'css', 'js', 'watch']);
