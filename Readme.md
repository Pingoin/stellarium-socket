<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A Small Converter for the Stellarium Telescope control to a websocket-Server

### Built With

* [WS](https://github.com/websockets/ws)




<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Pingoin/stellarium-socket.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. compile Source
   ```sh
   npm run build
   ```
#### Server Linux

1. modify paths in ``` stellarium-socket.service ```

2. copy File to folder
   ```sh
   sudo cp stellarium-socket.service /lib/systemd/system
   ```

3. Refresh Service List
   ```sh
    sudo systemctl daemon-reload
   ```
4. enable service

    ```sh
    sudo systemctl enable stellarium-socket
    ```

5. Start service

    ```sh
    sudo systemctl start stellarium-socket
    ```


<!-- USAGE EXAMPLES -->
## Usage

Connect the Stellarium-Telescope Plugin to port 10001.
Connect the Websocket Client to port 4444.

in websocket the Target from Stellarium comes like:

``` JSON
{"type":"target","payload":{"rightAscension":0.5100825726985931,"declination":-2.441045818850398}}
```

A Position is sent to the socket like:


``` JSON
{"type":"position","payload":{"rightAscension":0.5100825726985931,"declination":-2.441045818850398}}
```


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/Pingoin/stellarium-socket/issues) for a list of proposed features (and known issues).



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

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/Pingoin/stellarium-socket](https://github.com/Pingoin/stellarium-socket)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Pingoin/stellarium-socket.svg?style=for-the-badge
[contributors-url]: https://github.com/Pingoin/stellarium-socket/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Pingoin/stellarium-socket.svg?style=for-the-badge
[forks-url]: https://github.com/Pingoin/stellarium-socket/network/members
[stars-shield]: https://img.shields.io/github/stars/Pingoin/stellarium-socket.svg?style=for-the-badge
[stars-url]: https://github.com/Pingoin/stellarium-socket/stargazers
[issues-shield]: https://img.shields.io/github/issues/Pingoin/stellarium-socket.svg?style=for-the-badge
[issues-url]: https://github.com/Pingoin/stellarium-socket/issues
[license-shield]: https://img.shields.io/github/license/Pingoin/stellarium-socket?style=for-the-badge
[license-url]: https://github.com/Pingoin/stellarium-socket/blob/master/LICENSE.txt