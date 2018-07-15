import React, { Component } from 'react';
import Quagga from 'quagga';

class Scanner extends Component {

  componentDidMount() {
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facing: "environment" // or user
                }
            },
            decoder: {
                readers : [ "ean_reader"]
            },
numOfWorkers: 4,
            debug: {
               drawBoundingBox: true,
               showFrequency: true,
               drawScanline: true,
               showPattern: true
            },
            locate: true
        }, function(err) {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
        });
        Quagga.onDetected(this._onDetected.bind(this));
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }

    _onDetected(result) {
        this.props.onDetected(result);
    }

  render() {
return (
            <div id="interactive" className="viewport"/>
        );
  }
}

export default Scanner;
