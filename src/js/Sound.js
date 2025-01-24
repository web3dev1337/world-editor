// Create singleton instances
const backgroundMusic = new Audio('sounds/theme.mp3');
backgroundMusic.volume = 0.2;
backgroundMusic.loop = true;

const uiClickSound = new Audio('sounds/uiclick.ogg');
uiClickSound.volume = 0.3;

class SoundManager {
    constructor() {
        this.backgroundMusic = new Audio('sounds/theme.mp3');
        this.backgroundMusic.volume = 0.2;
        this.backgroundMusic.loop = true;

        this.uiClickSound = new Audio('sounds/uiclick.ogg');
        this.uiClickSound.volume = 0.3;
        
        this.isMuted = localStorage.getItem('isMuted') === 'true';
        this.clickTimeout = null;
        this.placeSound = new Audio('/sounds/place.wav');
        this.placeSound.volume = 0.1;
        this.lastPlayTime = 0;
        
        // Initialize mute state
        this.backgroundMusic.muted = this.isMuted;
        this.uiClickSound.muted = this.isMuted;
        this.placeSound.muted = this.isMuted;

        // Add click handler
        document.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        if (event.target.closest('button') && !this.isMuted) {
            // Clear any existing timeout
            if (this.clickTimeout) {
                clearTimeout(this.clickTimeout);
            }
            
            // Reset and play sound
            this.uiClickSound.currentTime = 0;
            this.uiClickSound.play().catch(err => console.log('UI sound playback error:', err));
            
            // Set a timeout to prevent rapid-fire sound playing
            this.clickTimeout = setTimeout(() => {
                this.clickTimeout = null;
            }, 50);
        }
    }

    playPlaceSound() {
        const now = Date.now();
        const timeSinceLastPlay = now - this.lastPlayTime;
        
        // Only play if enough time has passed (100ms debounce) and not muted
        if (timeSinceLastPlay > 100 && !this.isMuted && this.placeSound) {
            try {
                this.placeSound.currentTime = 0;
                this.placeSound.play().catch(error => {
                    console.error('Error playing sound:', error);
                });
                this.lastPlayTime = now;
            } catch (error) {
                console.error('Error playing sound:', error);
            }
        }
    }

    setMuted(muted) {
        this.isMuted = muted;
        this.backgroundMusic.muted = muted;
        this.uiClickSound.muted = muted;
        this.placeSound.muted = muted;
        localStorage.setItem('isMuted', muted);
    }

    cleanup() {
        document.removeEventListener('click', this.handleClick);
        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout);
        }
        if (this.placeSound) {
            this.placeSound.pause();
        }
    }

    playUIClick() {
        if (!this.isMuted) {
            this.uiClickSound.currentTime = 0;
            this.uiClickSound.play().catch(err => console.log('UI sound playback error:', err));
        }
    }
}

export const soundManager = new SoundManager();
