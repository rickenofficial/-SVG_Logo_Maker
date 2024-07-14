// Required processes defined here.
const fs = require("fs");
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./lib/shapes.js");
const SVG = require("./lib/svg");

// create prompts for user for options they wat to use on their logo. Then call a function to render logo.
inquirer
  .prompt([
    {
      message: "please enter up to three characters for the text on your logo",
      name: "logoText",

      validate: function (logoText) {
        if (logoText.length < 4) {
          return true;
        } else {
          console.log(
            `\n\n the maximun allowance for characters is three, please enter up to three characters\n`
          );
        }
      },
    },
    {
      type: "input",
      message:
        "please enter a color keyword or a hexadecimal number for the text color.",
      name: "textColor",
    },
    {
      type: "list",
      message: "please choose a shape for your logo.",
      name: "logoShape",
      choices: ["circle", "square", "triangle"],
    },
    {
      type: "input",
      message:
        "please enter a color keyword or a hexadecimal number for the color of the shape.",
      name: "shapeColor",
    },
  ])

  .then((res) => {
    let shape;
    let shapeName;
    if (res.logoShape === "circle") {
      shape = new Circle();
      shapeName = "circle";
    } else if (res.logoShape === "square") {
      shape = new Square();
      shapeName = "square";
    } else {
      shape = new Triangle();
      shapeName = "triangle";
    }

    shape.setColor(res.shapeColor);
    const svg = new SVG();
    svg.setText(res.logoText, res.textColor);
    svg.setShape(shape);

    const fileName = `examples/logo_${shapeName}.svg`;
    writeToFile(fileName, svg.render());
  });

// This function writes the svg information to a file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err
      ? console.error("An error has occurred.", err)
      : console.log(`Generated ${fileName}`)
  );
}

//This function writes the svg information to a file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err
      ? console.error("An error has occurred.", err)
      : console.log(`Generated logo.svg`)
  );
}
