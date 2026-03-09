const { src, dest, watch, series, parallel } = require('gulp');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const stylus = require('gulp-stylus');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const jeet = require('jeet');
const rupture = require('rupture');
const koutoSwiss = require('kouto-swiss');
const prefixer = require('autoprefixer-stylus');
const cp = require('child_process');

const jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';

function jekyllBuild(done) {
	browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');
	cp.spawn(jekyllCommand, ['build'], { stdio: 'inherit' })
		.on('close', done);
}

function browserSyncServe(done) {
	browserSync.init({
		server: {
			baseDir: '_site'
		}
	});
	done();
}

function browserSyncReload(done) {
	browserSync.reload();
	done();
}

function styles() {
	return src('src/styl/main.styl')
		.pipe(plumber())
		.pipe(stylus({
			use: [koutoSwiss(), prefixer(), jeet(), rupture()],
			compress: true
		}))
		.pipe(dest('_site/assets/css/'))
		.pipe(browserSync.stream())
		.pipe(dest('assets/css'));
}

function scripts() {
	return src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(terser())
		.pipe(dest('assets/js/'));
}

function images() {
	return src('src/img/**/*.{jpg,png,gif,svg,webp}')
		.pipe(plumber())
		.pipe(dest('assets/img/'));
}

function watchFiles() {
	watch('src/styl/**/*.styl', styles);
	watch('src/js/**/*.js', scripts);
	watch('src/img/**/*.{jpg,png,gif,svg,webp}', images);
	watch(['*.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], series(jekyllBuild, browserSyncReload));
}

const assets = parallel(scripts, styles, images);
const build = series(assets, jekyllBuild);
const dev = series(build, browserSyncServe, watchFiles);

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.assets = assets;
exports.build = build;
exports.default = dev;
