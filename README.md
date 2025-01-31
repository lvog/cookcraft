# CookCraft

CookCraft is a one-page website designed to help you explore, save, and plan meals effortlessly. You can search for a variety of recipes using multiple filters, such as dietary preferences, cuisine type, and calorie count. Save your favorite dishes and get personalized meal plans by calculating your daily calorie intake.
<br>
<p align="center">
  <img src="https://raw.githubusercontent.com/lvog/lvog.github.io/refs/heads/main/images/cookcraft-img-01.jpg" alt="CookCraft" width="800"/>
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/lvog/lvog.github.io/refs/heads/main/images/cookcraft-img-02.jpg" alt="CookCraft" width="800"/>
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/lvog/lvog.github.io/refs/heads/main/images/cookcraft.jpg" alt="CookCraft" width="800"/>
</p>
CookCraft is built using the **MVC (Model-View-Controller)** architecture and integrates with the [Spoonacular API](https://spoonacular.com/food-api) for recipe data and the [Daily Calorie Intake Calculator](https://www.calories.info/calorie-intake-calculator) to provide accurate, personalized meal plans.

The main inspiration for this project came after completing [The Complete JavaScript Course 2025: From Zero to Expert! by Jonas Schmedtmann](https://www.udemy.com/course/the-complete-javascript-course/).

## Technologies 👨🏻‍💻

- **HTML5**
- **SASS**
- **Vanilla JavaScript** – Including ES6 features like modules, arrow functions, and async/await.
- **JavaScript Plugins:**
  - [Headroom.js](https://wicky.nillia.ms/headroom.js/)
  - [AOS](https://michalsnik.github.io/aos/)
- **Vite**

## Demo 🌐

CookCraft is published on [Netlify](https://cookcraft-recipe.netlify.app/). You can try the website directly by visiting the link!

## Getting Started 🚀

To get a local copy of the project running on your computer, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/lvog/cookcraft.git
```

### 2. Navigate to the Project Directory

```bash
cd cookcraft
```

### 3. Install Dependencies
Ensure that **Node.js** is installed on your machine. If you haven't installed it yet, you can [download and install Node.js](https://nodejs.org/).

Once Node.js is installed, run the following command to install the necessary dependencies:

```bash
npm install
```

For stable operation with this build, it's recommended to use **Node.js version 14.18.0 or above**.
To check the current version of Node.js on your machine, run the following command:

```bash
node -v
```

### 4. Launch the Project

Start the development server with:

```bash
npm run dev
```

This will start the server in development mode. You can access the project at [http://localhost:3000](http://localhost:3000).

### 5. Build the Project for Production

To create a production-ready version of the project, run:

```bash
npm run build
``` 

----------

❗❗ **IMPORTANT:** Before starting, make sure to register on [Spoonacular API](https://spoonacular.com/food-api) and get your own API key. You need to add it to the ``config.js`` file. In this project, I use the free plan, so please note that the number of requests is limited.

## License 📄
Distributed under the MIT License. See  `LICENSE`  for more information.

## Contact 📱

Feel free to contact me via email at levchuk.oleg21@gmail.com.
You can also visit my [website](https://lvog.github.io/) to see more of my works or [LinkedIn](https://www.linkedin.com/in/oleg-levchuk-2098b2b7/).
