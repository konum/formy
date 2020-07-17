

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

Dynamic forms for angular with a GUI editor. 
Live demo: https://stackblitz.com/edit/formy


### Built With

* Angular 8
* Bootstrap



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Add Formy package to your project.
```sh
npm install @konum/formy
```

### Project installation 

1. Clone the repo
```sh
git clone https://github.com/github_username/repo.git
npm install
ng serve 
```


<!-- USAGE EXAMPLES -->
## Usage

Import Formy module
```
import  {FormyModule} from 'formy';

@NgModule({
  declarations: [....],
  imports: [....
    FormyModule
  ],
  providers: [.....]

})
```


Form Editor:

```
<lib-formy-editor [questions]="questions"  (onSave)="save($event)"></lib-formy-editor>
```
lib-formy-editor has to optiona inputs:
- questions: array of FormyInputBase objects
- questionsJson: string with  array of FormyInputBase objects

onSave event will return and array of FormyInputBase object.

Form for filling:

```
<lib-formy [questions]="questions"  (onSave)="save($event)"></lib-formy>
```
lib-formy has to optiona inputs:
- questions: array of FormyInputBase objects
- questionsJson: string with  array of FormyInputBase objects

onSave event will return and array of FormyInputBase object.

<!-- ROADMAP -->
## Roadmap

- Language support for editor


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License.



<!-- CONTACT -->
## Contact

Guillermo Gefaell - [@twitter_handle](https://twitter.com/gallego_patagon) - email

Project Link: [https://github.com/konum/formy](https://github.com/konum/formy)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=flat-square
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=flat-square
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ggefaell
