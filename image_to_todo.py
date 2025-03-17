import pytesseract
from PIL import Image
import re
from datetime import datetime
from typing import Tuple, List, Dict

def extract_text_from_image(image_path: str) -> str:
    """Extracts text from an image using OCR."""
    try:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        raise Exception(f"Error processing image: {str(e)}")

def classify_item(text: str) -> str:
    """Classify text as event, reminder, or todo based on content."""
    # Event indicators
    event_keywords = {'meeting', 'appointment', 'conference', 'party', 'celebration',
                     'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
                     'january', 'february', 'march', 'april', 'may', 'june', 'july',
                     'august', 'september', 'october', 'november', 'december'}
    
    # Reminder indicators
    reminder_keywords = {'remember', 'remind', 'don\'t forget', 'reminder', 'recall'}
    
    # Time indicators that suggest events
    time_indicators = {'today', 'tomorrow', 'am', 'pm', ':'}

    text_lower = text.lower()
    words = set(text_lower.split())
    
    # Check for event patterns
    if (any(keyword in text_lower for keyword in event_keywords) or
        any(keyword in text_lower for keyword in time_indicators) or
        re.search(r'\d{1,2}[:]\d{2}', text_lower) or  # Time pattern HH:MM
        re.search(r'\d{1,2}[/]\d{1,2}([/]\d{2,4})?', text_lower)):  # Date pattern MM/DD or MM/DD/YYYY
        return 'event'
    
    # Check for reminder patterns
    if any(keyword in text_lower for keyword in reminder_keywords):
        return 'reminder'
    
    # Default to todo
    return 'todo'

def analyze_text(text: str) -> Tuple[List[str], List[str], List[str]]:
    """Analyze the extracted text to identify events, reminders, and todo items."""
    events, reminders, todos = [], [], []
    
    # Split text into individual items
    items = [item.strip() for item in re.split(r'[\n•]+', text) if item.strip()]
    
    for item in items:
        if len(item) < 3:  # Skip very short items
            continue
            
        item_type = classify_item(item)
        if item_type == 'event':
            events.append(item)
        elif item_type == 'reminder':
            reminders.append(item)
        else:
            todos.append(item)
    
    return events, reminders, todos

def format_output(events: List[str], reminders: List[str], todos: List[str]) -> str:
    """Format the output in a friendly and readable way."""
    output = "✨ Here's what I found in your image! ✨\n\n"
    
    if events:
        output += "📅 Events:\n" + '\n'.join(f"  • {event}" for event in events) + "\n\n"
    if reminders:
        output += "⏰ Reminders:\n" + '\n'.join(f"  • {reminder}" for reminder in reminders) + "\n\n"
    if todos:
        output += "✓ Todo Items:\n" + '\n'.join(f"  • {todo}" for todo in todos) + "\n\n"
    
    if not any([events, reminders, todos]):
        output += "I couldn't find any specific items in the image. Maybe try another image?\n\n"
    
    motivational_messages = [
        "You're doing great at staying organized! 🌟",
        "One step at a time - you've got this! 💪",
        "Keep up the amazing work! 🎯",
        "You're on top of things! 🚀"
    ]
    from random import choice
    output += f"\n{choice(motivational_messages)}"
    return output

def main(image_path: str) -> None:
    """Main function to process image and display results."""
    try:
        extracted_text = extract_text_from_image(image_path)
        events, reminders, todos = analyze_text(extracted_text)
        output = format_output(events, reminders, todos)
        print(output)
    except Exception as e:
        print(f"❌ Oops! Something went wrong: {str(e)}\n")
        print("Please make sure you have a valid image file and try again!")

if __name__ == "__main__":
    main('test_image.png')
