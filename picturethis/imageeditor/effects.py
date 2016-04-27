from PIL import Image, ImageFilter, ImageOps, ImageEnhance
from models import EditedPhoto


class ImageEffects:
    """Handle image effects and filters."""

    def __init__(self, image, effect):
        """Initialize image effects class."""
        self.image = Image.open(image)
        self.effect = effect

    def enhancements(self, enhancement_type):
        """Handle enhancements on images.

        Take in a float value to effect the enhancement.
        """
        enhancer = ImageEnhance.Sharpness(self.image)
        self.image = enhancer.enhance(enhancement_type['sharp'])

        enhancer = ImageEnhance.Contrast(self.image)
        self.image = enhancer.enhance(enhancement_type['contrast'])

        enhancer = ImageEnhance.Brightness(self.image)
        self.image = enhancer.enhance(enhancement_type['bright'])

        self.image = EditedPhoto()
        self.image.save()

    def filters(self):
        """Handle Filters on images."""
        if self.effect == 'blur':
            to_save = self.image.filter(ImageFilter.BLUR)
        if self.effect == 'contour':
            to_save = self.image.filter(ImageFilter.CONTOUR)
        if self.effect == 'emboss':
            to_save = self.image.filter(ImageFilter.EMBOSS)
        if self.effect == 'detail':
            to_save = self.image.filter(ImageFilter.DETAIL)
        if self.effect == 'smooth':
            to_save = self.image.filter(ImageFilter.SMOOTH)
        to_save = EditedPhoto()
        to_save.save()

    def operations(self):
        """Handle other simple image operations."""
        if self.effect == 'flip':
            to_save = ImageOps.flip(self.image)
        if self.effect == ' mirror':
            to_save = ImageOps.mirror(self.image)
        if self.effect == 'invert':
            to_save = ImageOps.invert(self.image)
        if self.effect == 'grayscale':
            to_save = ImageOps.grayscale(self.image)
        to_save = EditedPhoto()
        to_save.save()
