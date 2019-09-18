const { src, dest, watch, series, parallel } = require('gulp');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const gulpSass = require('gulp-sass');
function browser_sync(done){
    browserSync.init({
        server:'./src'
    });
    done();
}
function browser_refresh(done){
    browserSync.reload({stream:true});
    done();
}
function minifyImage(done){
    src('src/assets/img/**/*')
    .pipe(imagemin({
        optimizationLevel: 5,
        progressive:true,
        interlaced:true
    }))
    .pipe(dest('src/img'));
    done();
}
function watchFiles(){
    watch(['src/assets/scss/*.scss'],parallel(buildCss,browser_refresh));
}

function buildCss(){
    return src('src/assets/scss/*.scss')
    .pipe(gulpSass({includePaths:['node_modules/bootstrap/scss/'],outputStyle:'compressed'}))
    .pipe(dest('src/css'))
    .pipe(browserSync.reload({stream:true}));
}
function copyJs(){
return src(['./node_modules/bootstrap/dist/js/*.js','./node_modules/jquery/dist/*.js','src/assets/js/*.js'])
        .pipe(dest('src/js'));
}
    
exports.default = parallel(browser_sync,copyJs,watchFiles,minifyImage,buildCss);
