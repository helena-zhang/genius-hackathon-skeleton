
# Image to Todo List Converter

This program extracts events, reminders, and todo items from images using OCR (Optical Character Recognition). It automatically classifies text into different categories and presents them in a friendly, organized format.

## Features
- Extract text from images using OCR
- Automatically classify items as events, reminders, or todos
- Smart detection of dates, times, and keywords
- Friendly output formatting with emojis
- Helpful error messages and motivational feedback

## Requirements
- Python 3.x
- Tesseract OCR
- Python packages (install via `pip install -r requirements.txt`):
  - pytesseract
  - Pillow

## Installation
1. Install Tesseract OCR:
   ```bash
   brew install tesseract
   ```
2. Install Python dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

## Usage
```python
from image_to_todo import main

# Process an image
main('path_to_your_image.jpg')
```

The program will analyze the image and output:
- 📅 Events (meetings, appointments, etc.)
- ⏰ Reminders
- ✓ Todo Items

