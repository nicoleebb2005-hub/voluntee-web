document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = lightbox?.querySelector('.lightbox__image');
    const caption = lightbox?.querySelector('.lightbox__caption');
    if (!lightbox || !lightboxImage || !caption) return;
    const blankImage = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

    const close = () => {
        lightbox.hidden = true;
        lightboxImage.src = blankImage;
        document.body.classList.remove('lightbox-open');
    };

    document.querySelectorAll('[data-lightbox]').forEach((button) => {
        button.addEventListener('click', () => {
            const image = button.querySelector('img');
            if (!image) return;
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            caption.textContent = image.alt;
            lightbox.hidden = false;
            document.body.classList.add('lightbox-open');
            lightbox.querySelector('.lightbox__close')?.focus();
        });
    });

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox || event.target.closest('.lightbox__close')) close();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !lightbox.hidden) close();
    });
});
