import React, { Component } from "react";

import MenuItem from "../menu-item/MenuItem.component";
import sections from "./directory.data";

import "./Directory.styles.scss";

class Directory extends Component {
  constructor() {
    super();
    this.state = {
      sections: sections,
    };
  }

  render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map(({ id, ...sectionProps }) => (
          <MenuItem key={id} {...sectionProps} />
        ))}
      </div>
    );
  }
}

export default Directory;
