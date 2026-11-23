# Sous-Chef Ratchet — Stage 4 Functional Prototype

An interaction prototype for NOVA FCT's Human-Computer Interaction course (2026/27).

## Run Locally

No installation or backend is required. Open `index.html` in a browser, or simply access the site https://ipm-group-2.github.io/kitchen-assistant-prototype/.

## Evaluated Scenarios

### 1. Adding Products to the Pantry:

You share an apartment with two other people and often find that you buy ingredients you already have at home. Sometimes, you also discover that products have expired before you get a chance to use them.
You have recently bought milk, eggs, and rice, and you want to keep track of what is available in your kitchen, including quantities and expiration dates where possible.
Using the kitchen assistant app, add these products to your pantry and check that they have been recorded correctly.

### 2. Finding a Recipe with Available Ingredients:

It is a weekday evening, and you have about 30 minutes to prepare dinner. You would prefer not to go shopping, as you already have several ingredients at home. Some vegetables in your refrigerator are approaching their expiration dates, and you would like to use them before they go to waste.
You are not sure what to cook, so you decide to use the kitchen assistant app to find a suitable meal. You want to choose something that fits your available ingredients, the time you have, and your cooking preferences.
Find a recipe you could realistically prepare tonight, taking into account any ingredients you may be missing.

### 3. Following a recipe while cooking:

You have chosen a recipe in the kitchen assistant app and are ready to prepare dinner. You do not cook very often, so you need to refer to the instructions as you work.
Your phone is on the kitchen counter, and you are preparing food with your hands. You want to follow the recipe without repeatedly stopping to clean your hands or losing track of your progress. During cooking, you need to check the next instruction, revisit an earlier step, repeat the explanation for a step, and set a timer for one of the cooking stages.
Using the app, prepare the recipe while referring to the information you need throughout the cooking process.

## Prototype Limitations

- Shopping list tab is incomplete, but no scenario involves it directly.
- Barcode scanning is simulated.
- The cooking guide videos are placeholders rather than functional cooking footage.
- Cooking guide supports hands-free voice commands (via Web Speech API or built-in voice simulator) with audible speech feedback from RatChef.
- Recipe ingredient requirements are not accurate, they are hard coded to always have everything available or a few missing ingredients regardless of what the inventory actually contains.
- Recipes and mascot use real stored images. Ingredients and video placeholders use emojis.
- "Other" tab is used only to mention these limitations, in a real app it would be used to access app settings.
- Data is stored only for the current browser session and resets on refresh.