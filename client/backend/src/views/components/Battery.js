import React, { Component } from "react";
import CountUp from "react-countup";
import "./../../scss/battery.scss";

import { Card, CardBody } from "reactstrap";

class Battery extends Component {
  constructor(props) {
    super(props);
    this.fill = React.createRef();
    this.state = {
      level: 0,
      background: "",
      fill: "",
      display: "none"
    };
  }

  refreshLevel = level => {
    if (level < 25) {
      this.setState({ background: "#f86c6b" });
    } else if (level < 50) {
      this.setState({ background: "#ffc107" });
    } else {
      this.setState({ background: "#4dbd74" });
    }
  };

  chargingChangeHandler = e => {
    if (e.target.charging) {
      this.setState({ display: "initial" });
    } else {
      this.setState({ display: "none" });
    }
  };

  levelChangeHandler = e => {
    const batteryFill = this.fill.current;
    this.setState({ level: e.target.level * 100 });
    this.setState({ fill: e.target.level * batteryFill.clientHeight + "px" });
    this.refreshLevel(e.target.level * 100);
  };

  componentDidMount() {
    const batteryFill = this.fill.current;
    try {
      navigator.getBattery().then(battery => {
        this.setState({ level: battery.level * 100 });
        this.setState({ fill: battery.level * batteryFill.clientHeight + "px" });
        this.refreshLevel(battery.level * 100);

        if (battery.charging) {
          this.setState({ display: "initial" });
        } else {
          this.setState({ display: "none" });
        }
        battery.addEventListener(
          "chargingchange",
          this.chargingChangeHandler,
          battery
        );
        battery.addEventListener("levelchange", this.levelChangeHandler, battery);
        });

    } catch (error) {
    }
  }

  componentWillUnmount() {
    try {
      navigator.getBattery().then(battery => {
        battery.removeEventListener(
          "chargingchange",
          this.chargingChangeHandler,
          battery
        );
        battery.removeEventListener(
          "levelchange",
          this.levelChangeHandler,
          battery
        );
      });
    } catch (error) {

    }
  }

  render() {
    return (
      <Card
        className="text-white"
        style={{ backgroundColor: this.state.background }}
      >
        <CardBody className="pt-4 pb-0">
          <div className="cell">
            <div ref={this.fill} className="battery">
              <div className="acid-container">
                <div className="acid">
                  <div
                    style={{ "--acid-height": this.state.fill }}
                    className="fill"
                  />
                  <svg
                    className="waves"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
                      />
                    </defs>
                    <g className="parallax">
                      <use
                        xlinkHref="#gentle-wave"
                        x={50}
                        y={0}
                        fill="#4579e2"
                      />
                      <use
                        xlinkHref="#gentle-wave"
                        x={50}
                        y={3}
                        fill="#3461c1"
                      />
                      <use
                        xlinkHref="#gentle-wave"
                        x={50}
                        y={6}
                        fill="#2d55aa"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="percentage">
              <i
                className="fa fa-plug fa-lg"
                style={{ display: this.state.display }}
              />
              <CountUp
                start={0}
                end={this.state.level}
                duration={2.75}
                suffix=" %"
              >
                {({ countUpRef }) => <span ref={countUpRef} />}
              </CountUp>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Battery;
