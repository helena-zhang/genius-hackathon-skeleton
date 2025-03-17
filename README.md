# DevCamp Genius Skeleton Client with Image Processing

This repository combines a DevCamp Genius self-learning feed with an image processing capability that can extract events, reminders, and todo items from images.

## Image to Todo List Converter

This program extracts events, reminders, and todo items from images using OCR (Optical Character Recognition). It automatically classifies text into different categories and presents them in a friendly, organized format.

### Features
- Extract text from images using OCR
- Automatically classify items as events, reminders, or todos
- Smart detection of dates, times, and keywords
- Friendly output formatting with emojis
- Helpful error messages and motivational feedback

### Requirements
- Python 3.x
- Tesseract OCR
- Python packages (install via `pip install -r requirements.txt`):
  - pytesseract
  - Pillow

### Installation
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

### Usage
```python
from image_to_todo import main

# Process an image
main('path_to_your_image.jpg')
```

The program will analyze the image and output:
- 📅 Events (meetings, appointments, etc.)
- ⏰ Reminders
- ✓ Todo Items

---

## DevCamp Genius Client Setup

Setting up your DevCamp Genius self-learning feed is a breeze! We've implemented all of the user interaction and event pass-throughs for you, all you need to do is specify the project ID and access token you created.

Make sure to follow [these prerequisite instructions](https://gamalon.github.io/genius-hackathon-documentation/) first.

### Setup

* Install Node
* `npm install`

### Run the client

* To run the local instance: `npm start`
* The configuration for your project can be set under `/dist/index.html`:
```
  const project_name = '######';  // Replace with your hackathon project identifier
  const access_token = '######';  // Replace with your hackathon access token
```
[Type definitions](https://github.com/gamalon/genius-hackathon-skeleton/blob/main/client/src/entities.js#L981-L1122) for the front-end configuration object

### Setting the styling

The styling can be set multiple ways. We can either modify the [AppVariables.scss](https://github.com/gamalon/genius-hackathon-skeleton/blob/main/client/src/AppVariables.scss) file directly to update the styling defaults, or we can use the settings object [`design.settings.global`](https://github.com/gamalon/genius-hackathon-skeleton/blob/main/client/src/entities.js#L1014) where you set the CSS string that will override the defaults defined in the AppVariables.css.

### Building the client bundle
To build the production bundle run: `npm run build:prod`, this will create a `facet-chat.js` in the `/dist` folder.
