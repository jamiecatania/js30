class VideoPlayer {
	init() {
		this.container = document.querySelector('.player');
		this.video = this.container.querySelector('.viewer');
		this.progress = this.container.querySelector('.progress');
		this.progressBar = this.container.querySelector('.progress__filled');
		this.toggle = this.container.querySelector('.toggle');
		this.skipButtons = this.container.querySelectorAll('[data-skip]');
		this.ranges = this.container.querySelectorAll('.player__slider');
		this.mouseDown = false;
		this.registerEventListners();
	}

	registerEventListners() {
		this.video.addEventListener('click', () => this.togglePlay());
		this.video.addEventListener('play', () => this.updateButton());
		this.video.addEventListener('pause', () => this.updateButton());
		this.video.addEventListener('timeupdate', () => this.handleProgress());

		this.toggle.addEventListener('click', () => this.togglePlay());

		this.skipButtons.forEach(node => {
			node.addEventListener('click', e => this.skip(e));
		});

		this.ranges.forEach(range => {
			range.addEventListener('change', e => this.handleRangeUpdate(e));
			range.addEventListener('mousemove', e => this.handleRangeUpdate(e));
		});

		this.progress.addEventListener('click', e => this.scrub(e));
		this.progress.addEventListener('mousemove', e => {
			this.mouseDown && this.scrub(e)
		});
		this.progress.addEventListener('mousedown', () => this.mouseDown = true);
		this.progress.addEventListener('mouseup', () => this.mouseDown = false);
	}

	updateButton() {
		const icon = this.video.paused ? '►' : '❚ ❚';
		this.toggle.textContent = icon;
	}

	togglePlay() {
		if (this.video.paused) {
			this.video.play();
		} else {
			this.video.pause();
		}
	}

	skip(e) {
		const secondsToSkip = e.target.dataset.skip;
		this.video.currentTime += parseFloat(secondsToSkip);
	}

	handleRangeUpdate(e) {
		this.video[e.target.name] = e.target.value;
	}

	handleProgress() {
		const percent = (this.video.currentTime / this.video.duration) * 100;
		this.progressBar.style.flexBasis = `${percent}%`;
	}

	scrub(e) {
		this.video.currentTime = (e.offsetX / this.progress.offsetWidth) * this.video.duration;
	}
}

const player = new VideoPlayer();
player.init();